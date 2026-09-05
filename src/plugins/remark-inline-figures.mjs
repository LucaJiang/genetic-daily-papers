import {createHash} from 'node:crypto';
const escape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export default function inlineFigures(){
  return (tree,file)=>{
    const data=file.data?.astro?.frontmatter??{};
    const figures=data.figures??[];
    for(let i=0;i<tree.children.length;i++){
      const node=tree.children[i];
      if(node.type!=='paragraph')continue;
      const text=(node.children??[]).map(n=>n.value??'').join('').trim();
      const match=text.match(/^\[figure:(\d+)\]$/);
      if(!match)continue;
      const number=Number(match[1]);const f=figures[number-1];
      if(!f)throw new Error(`Missing inline figure ${number}: ${file.path}`);
      const url=new URL(f.url);if(!['https:','http:'].includes(url.protocol))throw new Error('Invalid figure protocol');
      const ext=(url.pathname.match(/\.(png|jpe?g|webp)$/i)?.[1]??'png').toLowerCase().replace('jpeg','jpg');
      const src='/figures/'+createHash('sha256').update(f.url).digest('hex').slice(0,24)+'.'+ext;
      const kind={'real-data':'实证分析','workflow':'方法流程','simulation':'模拟研究','validation':'实验验证','resource':'数据资源'}[f.kind]??'论文原图';
      const license=f.licenseUrl?`<a href="${escape(f.licenseUrl)}">${escape(f.license)}</a>`:escape(f.license??'');
      tree.children[i]={type:'html',value:`<figure class="paper-figure" id="figure-${number}"><a href="${src}" data-zoom><img src="${src}" alt="${escape(f.alt)}" loading="lazy" decoding="async"/></a><figcaption><span class="figure-label">${kind}</span><strong>${escape(f.label)}</strong><p>${escape(f.caption)}</p><small>${escape(f.credit)} · ${license} · <a href="${escape(f.sourceUrl)}" target="_blank" rel="noreferrer">原图与图注</a></small></figcaption></figure>`};
    }
  };
}
