"""Verify the built or published September 10 issue in Chromium; no site writes."""
import argparse
import json
from pathlib import Path
from urllib.parse import unquote
from playwright.sync_api import sync_playwright

parser=argparse.ArgumentParser()
parser.add_argument('--base-url',default='http://127.0.0.1:4173')
parser.add_argument('--output',default='review-output')
args=parser.parse_args()
out=Path(args.output);out.mkdir(parents=True,exist_ok=True)
ids=['fm-gpt-phenome-twas','ms-spatiocellular-genetics','scatlaspy-disk-resident']
counts=dict(zip(ids,[3,2,4]))
old=['alphagenome-atlas','gpn-star','within-family-ancestry','iris-signaling','generation-scotland-ms-pqtl']
routes=['/','/daily/2026-09-10/']+['/papers/'+i+'/' for i in ids]+['/daily/2026-09-09/','/archive/','/resources/','/search/?q=FM-GPT','/topics/fine-mapping/']
reports=[];errors=[];failure=None
try:
    with sync_playwright() as p:
        browser=p.chromium.launch()
        for width in [1440,1024,768,390,320]:
            for route in routes:
                page=browser.new_page(viewport={'width':width,'height':1000},device_scale_factor=1)
                page.on('pageerror',lambda e:errors.append(str(e)))
                response=page.goto(args.base_url.rstrip('/')+route,wait_until='networkidle',timeout=60000)
                assert response and response.status==200,(route,response.status if response else None)
                page.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')")
                page.evaluate("Promise.all(Array.from(document.images).map(i=>i.decode().catch(()=>null)))")
                broken=page.evaluate("Array.from(document.images).filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)")
                assert not broken,(route,broken)
                assert page.locator('.katex-error').count()==0,route+' math error'
                overflow=page.evaluate('document.documentElement.scrollWidth-innerWidth')
                assert overflow<=2,(route,width,overflow)
                if route in ['/','/daily/2026-09-10/','/daily/2026-09-09/']:
                    cards=page.locator('.paper-card').evaluate_all('es=>es.map(e=>e.dataset.paperId)')
                    assert cards==(old if '09-09' in route else ids),(route,cards)
                if route.startswith('/papers/'):
                    pid=route.split('/')[2]
                    figures=page.locator('figure.inline-figure')
                    assert figures.count()==counts[pid],(route,figures.count())
                    assert page.locator('.prose h2').count()>=8,route+' short review'
                    missing=page.evaluate("Array.from(document.querySelectorAll('.toc a,.mobile-toc a')).map(a=>a.getAttribute('href')).filter(h=>!document.getElementById(decodeURIComponent(h.slice(1))))")
                    assert not missing,(route,missing)
                    if pid==ids[0]:assert page.locator('.katex').count()>=10,'FM-GPT math absent'
                    if width==1440:
                        for f in figures.all():f.screenshot(path=str(out/(pid+'-'+f.get_attribute('id')+'.png')))
                        if pid==ids[0]:page.locator('.katex-display').first.screenshot(path=str(out/'fm-gpt-math.png'))
                    # Exercise the visible table of contents, not only href existence.
                    mobile=page.locator('.mobile-toc')
                    if mobile.is_visible():
                        if mobile.get_attribute('open') is None:mobile.locator('summary').click()
                        link=mobile.locator('nav a').first
                    else:link=page.locator('.toc nav a').first
                    target=unquote(link.get_attribute('href')[1:]);link.click()
                    assert page.evaluate('(id)=>!!document.getElementById(id)',target)
                    if mobile.is_visible() and mobile.get_attribute('open') is not None:mobile.locator('summary').click()
                    if width==390:
                        with page.expect_popup() as info:figures.first.locator('a').first.click()
                        image=info.value;image.wait_for_load_state('load')
                        assert image.locator('img').count()==1
                        assert image.locator('img').evaluate('i=>i.naturalWidth')>=400
                        image.close()
                    page.evaluate('scrollTo(0,0)')
                if route=='/archive/':
                    assert page.locator('a[href="/daily/2026-09-10/"]').count()==1
                    assert page.locator('a[href="/daily/2026-09-09/"]').count()==1
                if route=='/resources/':
                    card=page.locator('#generation-scotland-ms-pqtl');assert card.count()==1
                    page.locator('button[data-ancestry="EUR"]').click();assert card.is_visible()
                    page.locator('button[data-ancestry="EAS"]').click();assert not card.is_visible()
                    page.locator('button[data-ancestry="all"]').click();assert card.is_visible()
                    toggle=page.locator('.qtl-expand-all');toggle.click()
                    assert page.locator('.qtl-record-details:not([open]),.resource-detail-section:not([open])').count()==0
                    toggle.click()
                    assert page.locator('.qtl-record-details[open],.resource-detail-section[open]').count()==0
                if route.startswith('/search/'):
                    page.locator('#search-results a[href="/papers/fm-gpt-phenome-twas/"]').wait_for()
                    page.locator('#search-query').fill('scAtlasPy');page.locator('.search-submit').click()
                    page.locator('#search-results a[href="/papers/scatlaspy-disk-resident/"]').wait_for()
                if route=='/topics/fine-mapping/':
                    assert page.locator('a[href="/papers/fm-gpt-phenome-twas/"]').count()>0
                    assert page.locator('a[href="/papers/ms-spatiocellular-genetics/"]').count()>0
                assert page.evaluate('document.documentElement.scrollWidth-innerWidth')<=2
                name=('home' if route=='/' else route.strip('/').split('?')[0].replace('/','-'))+f'-{width}.png'
                page.screenshot(path=str(out/name),full_page=route in ['/','/daily/2026-09-10/'])
                reports.append({'route':route,'width':width,'status':response.status,'overflow':overflow,'images':page.locator('img').count(),'math':page.locator('.katex').count()})
                page.close()
        browser.close()
    assert not errors,errors
    print(f'PASS {len(reports)} page/viewport checks; exact issue scope, nine figures, math, anchors, zoom, history, search and resource controls verified.')
except Exception as exc:
    failure=str(exc);raise
finally:
    (out/'browser-report.json').write_text(json.dumps({'baseUrl':args.base_url,'success':failure is None and len(reports)==50 and not errors,'checks':reports,'pageErrors':errors,'failure':failure},ensure_ascii=False,indent=2)+'\n')
