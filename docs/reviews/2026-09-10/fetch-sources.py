"""Fetch only the approved papers' public primary sources for human review."""
from pathlib import Path
from urllib.parse import urljoin, urlparse
import concurrent.futures, hashlib, json, re
import requests
from bs4 import BeautifulSoup

out = Path('.source-review'); out.mkdir(exist_ok=True)
records = []
def get(name, url):
    try:
        r = requests.get(url, timeout=90, headers={'User-Agent': 'Mozilla/5.0 academic source review'})
        r.raise_for_status()
        data = r.content
        if len(data) > 60 * 1024**2: raise ValueError('source exceeds review size limit')
        if name.endswith('.pdf') and not data.startswith(b'%PDF'): raise ValueError('not a PDF')
        (out / name).write_bytes(data)
        records.append({'name': name, 'url': url, 'resolvedUrl': r.url, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
        print('OK', name, len(data), flush=True)
        return data
    except Exception as e:
        records.append({'name': name, 'url': url, 'error': str(e)})
        print('FAIL', name, str(e), flush=True)
        return None

plos = 'https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1012126'
nature = 'https://www.nature.com/articles/s41588-026-02741-5'
jobs = [
 ('fm-gpt.html', plos),
 ('fm-gpt.pdf', 'https://journals.plos.org/plosgenetics/article/file?id=10.1371/journal.pgen.1012126&type=print'),
 ('fm-gpt.xml', 'https://journals.plos.org/plosgenetics/article/file?id=10.1371/journal.pgen.1012126&type=manuscript'),
 ('ms-spatiocellular.html', nature),
 ('ms-spatiocellular.pdf', nature + '.pdf'),
 ('scatlaspy.pdf', 'https://www.biorxiv.org/content/10.64898/2026.09.03.748766v1.full.pdf'),
 ('scatlaspy-figshare.json', 'https://api.figshare.com/v2/articles/33144860')
]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
    list(ex.map(lambda x: get(*x), jobs))
extra = {}
for name, base in [('fm-gpt.html', plos), ('ms-spatiocellular.html', nature)]:
    file = out / name
    if not file.exists(): continue
    soup = BeautifulSoup(file.read_bytes(), 'html.parser')
    (out / name.replace('.html', '.txt')).write_text(soup.get_text('\n', strip=True), encoding='utf8')
    for a in soup.select('a[href]'):
        u = urljoin(base, a['href'])
        if 'journal.pgen.1012126.s' in u and '/file' in u:
            sid = re.search(r'1012126\.(s\d+)', u)
            if sid: extra['fm-gpt-' + sid.group(1) + '.bin'] = u
        if '41588_2026_2741_MOESM' in u:
            extra['ms-' + u.rsplit('/',1)[-1]] = u
    if name.startswith('fm'):
        for i in range(1, 8):
            extra[f'fm-gpt-fig{i}.png'] = 'https://journals.plos.org/plosgenetics/article/figure/image?size=large&id=10.1371/journal.pgen.1012126.g' + str(i).zfill(3)
    else:
        for i in [1, 2, 3]:
            extra[f'ms-fig{i}.png'] = 'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41588-026-02741-5/MediaObjects/41588_2026_2741_Fig' + str(i) + '_HTML.png'
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
    list(ex.map(lambda x: get(*x), extra.items()))
for p in out.glob('*.bin'):
    if p.read_bytes().startswith(b'%PDF'):
        p.rename(p.with_suffix('.pdf'))
try:
    import fitz
    for p in out.glob('*.pdf'):
        doc=fitz.open(p)
        (out / (p.stem+'.txt')).write_text('\n\n'.join('=== PAGE '+str(i+1)+' ===\n'+page.get_text() for i,page in enumerate(doc)),encoding='utf8')
except Exception as e:
    print('PDF extraction error',e)
(out / 'manifest.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf8')
