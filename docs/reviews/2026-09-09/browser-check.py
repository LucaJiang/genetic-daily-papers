"""Browser verification for the approved September 9 issue; no site writes.

Requires Playwright and its Chromium browser. Screenshots are test artifacts,
not generated scientific figures. Run against a local production build, or
pass --base-url to verify the published site.
"""
import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--base-url', default='http://127.0.0.1:4173')
parser.add_argument('--output', default='review-output')
args = parser.parse_args()
out = Path(args.output)
out.mkdir(parents=True, exist_ok=True)
ids = ['alphagenome-atlas', 'gpn-star', 'within-family-ancestry', 'iris-signaling', 'generation-scotland-ms-pqtl']
routes = ['/', '/daily/2026-09-09/'] + ['/papers/' + i + '/' for i in ids] + ['/resources/', '/search/?q=GPN-Star']
errors, reports = [], []
try:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for width in [390, 768, 1440]:
            for route in routes:
                page = browser.new_page(viewport={'width': width, 'height': 1000}, device_scale_factor=1)
                page.on('pageerror', lambda error: errors.append(str(error)))
                response = page.goto(args.base_url.rstrip('/') + route, wait_until='networkidle')
                assert response and response.status == 200, (route, response.status if response else None)
                page.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')")
                page.evaluate("Promise.all(Array.from(document.images).map(i=>i.decode().catch(()=>null)))")
                assert page.locator('.katex-error').count() == 0, route + ' math rendering error'
                broken = page.evaluate("Array.from(document.images).filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)")
                assert not broken, (route, broken)
                overflow = page.evaluate('document.documentElement.scrollWidth-innerWidth')
                assert overflow <= 2, (route, width, overflow)
                if route in ['/', '/daily/2026-09-09/']:
                    cards = page.locator('.paper-card').evaluate_all('els=>els.map(e=>e.dataset.paperId)')
                    assert cards == ids, cards
                if route.startswith('/papers/'):
                    assert page.locator('figure.inline-figure').count() == 2, route
                    assert page.locator('h2').count() >= 8, route + ' unexpectedly short review'
                    if width == 1440:
                        for number, figure in enumerate(page.locator('figure.inline-figure').all(), 1):
                            figure.screenshot(path=str(out / (route.strip('/').replace('/', '-') + f'-figure{number}.png')))
                        page.evaluate('scrollTo(0,0)')
                if route == '/resources/':
                    card = page.locator('#generation-scotland-ms-pqtl')
                    assert card.count() == 1
                    page.locator('button[data-ancestry="EUR"]').click()
                    assert card.is_visible()
                    page.locator('button[data-ancestry="EAS"]').click()
                    assert not card.is_visible()
                    page.locator('button[data-ancestry="all"]').click()
                    assert card.is_visible()
                    toggle = page.locator('.qtl-expand-all')
                    toggle.click()
                    assert page.locator('.qtl-record-details:not([open]), .resource-detail-section:not([open])').count() == 0
                    toggle.click()
                    assert page.locator('.qtl-record-details[open], .resource-detail-section[open]').count() == 0
                    card.locator('summary').first.click()
                    card.scroll_into_view_if_needed()
                    card.screenshot(path=str(out / f'resource-card-{width}.png'))
                    assert page.evaluate('document.documentElement.scrollWidth-innerWidth') <= 2
                    page.evaluate('scrollTo(0,0)')
                if route.startswith('/search/'):
                    page.locator('#search-results a[href="/papers/gpn-star/"]').wait_for()
                    page.locator('#search-query').fill('Generation Scotland')
                    page.locator('.search-submit').click()
                    page.locator('#search-results a[href="/resources/#generation-scotland-ms-pqtl"]').wait_for()
                name = ('home' if route == '/' else route.strip('/').split('?')[0].replace('/', '-')) + f'-{width}.png'
                page.screenshot(path=str(out / name), full_page=route in ['/', '/daily/2026-09-09/'])
                reports.append({'route': route, 'width': width, 'status': response.status, 'overflow': overflow, 'images': page.locator('img').count()})
                page.close()
        browser.close()
    assert not errors, errors
    print(f'PASS {len(reports)} page/viewport checks; images, math, catalog filters, expansion and search verified.')
finally:
    (out / 'browser-report.json').write_text(json.dumps({'baseUrl': args.base_url, 'checks': reports, 'pageErrors': errors}, indent=2))
