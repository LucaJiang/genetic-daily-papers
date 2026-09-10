"""Materialize reviewed figures from an authenticated source artifact, not placeholders.

Run from repository root after extracting sep10-primary-sources to .source-review.
This script neither modifies experimental panels nor publishes to any branch.
"""
import argparse
import hashlib
import json
from pathlib import Path
import fitz

parser=argparse.ArgumentParser()
parser.add_argument('--source-dir',default='.source-review')
args=parser.parse_args()
root=Path('docs/reviews/2026-09-10')
manifest=json.loads((root/'assets.json').read_text())
sources=Path(args.source_dir)
dest=Path('public/figures');dest.mkdir(parents=True,exist_ok=True)
report=[]
def checked(name,sha):
    data=(sources/name).read_bytes()
    if hashlib.sha256(data).hexdigest()!=sha:
        raise ValueError('Primary source hash mismatch: '+name)
    return data

def record(path,source,**extra):
    data=path.read_bytes();pix=fitz.Pixmap(str(path))
    assert pix.width>=400 and pix.height>=400
    report.append({'asset':path.name,'sourceUrl':source,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data),'width':pix.width,'height':pix.height,**extra})

for f in manifest['nativeFigures']:
    path=dest/f['asset'];path.write_bytes(checked(f['sourceFile'],f['sha256']))
    record(path,f['url'],mode='byte-identical native PNG')
for item in manifest['pdfFigures']:
    data=checked(item['sourceFile'],item['sha256'])
    doc=fitz.open(stream=data,filetype='pdf')
    for f in item['figures']:
        page=doc[f['pageIndex']]
        assert all(abs(a-b)<0.001 for a,b in zip(page.rect,f['rect'])),f
        path=dest/f['asset']
        page.get_pixmap(matrix=fitz.Matrix(item['scale'],item['scale']),alpha=False).save(path)
        record(path,item['url'],mode='complete appendix figure-page rasterization',pageIndex=f['pageIndex'],sourceSha256=item['sha256'],scale=item['scale'])

# These URL/anchor corrections were checked against the downloaded publisher HTML.
fixes={
 'src/content/papers/fm-gpt-phenome-twas.md': [
  ('journal.pgen.1012126#sec005','journal.pgen.1012126#sec009')
 ],
 'src/content/papers/ms-spatiocellular-genetics.md': [
  ('https://humandbs.dbcls.jp/hum0197','https://humandbs.biosciencedbc.jp/en/hum0197-latest'),
  ('s41588-026-02741-5#Sec12','s41588-026-02741-5#Sec16'),
  ('s41588-026-02741-5#MOESM1','s41588-026-02741-5#Fig12')
 ]
}
for filename,pairs in fixes.items():
    p=Path(filename);text=p.read_text()
    for old,new in pairs:
        assert old in text or new in text,(filename,old)
        text=text.replace(old,new)
    p.write_text(text,encoding='utf8')
(root/'materialized-assets.json').write_text(json.dumps({'issue':'2026-09-10','pymupdf':fitz.VersionBind,'images':report},ensure_ascii=False,indent=2)+'\n')
print('Verified and materialized',len(report),'original figures.')
