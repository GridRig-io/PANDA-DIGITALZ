(()=>{
const $=s=>document.querySelector(s),rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches,pg=document.body.dataset.page;
const nav=[['works.html','Work'],['about.html','About'],['services.html','Services']];
document.body.insertAdjacentHTML('afterbegin',`<header><div class="w"><a href="index.html" aria-label="PANDA digitalz home"><img src="assets/logo.png" alt="PANDA digitalz, UI/UX design and digital experiences"></a><nav aria-label="Main">${nav.map(n=>`<a href="${n[0]}" ${n[0]==pg+'.html'?'aria-current="page"':''}>${n[1]}</a>`).join('')}<a class="pill" href="contact.html">Contact</a></nav></div></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="w">&copy; ${new Date().getFullYear()} Victor Chukwuebuka Mbamalu · PANDA digitalz</div></footer><div id="pv" aria-hidden="true"><span></span></div><div id="cur" aria-hidden="true"></div>`);
const pv=$('#pv'),cur=$('#cur');
/* work list */
const W=[['Spotted','UI/UX, Mobile app, Figma','A mobile app concept for finding verified apartments and guest houses in Abuja, with list and map views.','SP','sp-2.jpg','case-spotted.html'],
['GridRig','Website, WordPress, Elementor','Website for a custom PC-building business in Abuja, built around two openly disclosed build paths.','GR','gr-1.jpg','case-gridrig.html'],
['JOVAL Contractors','WordPress theme, Elementor plugin','Construction company website, built as a theme plus a companion plugin for Elementor Pro and Blocksy.','JC'],
['WooCommerce stores','Payments, Checkout','End-to-end online stores with catalogues, payment integrations and custom checkout flows, then tracked conversions to improve sales.','WC'],
['SEO growth','Analytics, Reporting',"Keyword research, metadata and internal linking that lifted clients' organic traffic by 70%+.",'SEO'],
['Website audits','Visual reports','Design, hosting, domain, SEO and forms reviewed, then turned into reports clients can act on.','AU'],
['Brand identity','Logo, Print','Logos, business cards, letterheads and banners for SMEs, delivered on tight deadlines.','BR']];
const L=$('#list');if(L){const n=+L.dataset.n||W.length;
L.innerHTML=W.slice(0,n).map((w,i)=>`<div class="row" data-i="${i}"><button aria-expanded="false"><h3>${w[0]}</h3><small>${w[1]}</small></button><div class="d"><div><p>${w[2]}</p>${w[5]?`<a href="${w[5]}">View case study</a>`:''}</div></div></div>`).join('');
L.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const r=b.parentNode,o=!r.classList.contains('open');
L.querySelectorAll('.row').forEach(x=>{x.classList.remove('open');x.firstChild.setAttribute('aria-expanded',false)});if(o){r.classList.add('open');b.setAttribute('aria-expanded',true)}});
L.addEventListener('pointerover',e=>{const r=e.target.closest('.row');if(r&&fine){const w=W[r.dataset.i];pv.firstChild.textContent=w[4]?'':w[3];pv.style.backgroundImage=w[4]?`url(assets/${w[4]})`:'';pv.classList.toggle('im',!!w[4]);pv.classList.add('on')}});
L.addEventListener('pointerleave',()=>pv.classList.remove('on'))}
/* cursor */
let mx=innerWidth/2,my=innerHeight/2,px=mx,py=my,cx=mx,cy=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;if(fine)cur.style.opacity=1;cur.classList.toggle('big',!!e.target.closest('a,button'))});
/* logo mark */
const svg=$('#mark'),nodes=[],R=[{a:[64,72],b:[309,53],T:407},{a:[67,243],b:[176,63],T:340},{a:[129,150],b:[262,150],T:306}],ns='http://www.w3.org/2000/svg';
if(svg)R.forEach(r=>{const p=document.createElementNS(ns,'path');$('#paths').appendChild(p);r.p=p;
['a','b'].forEach(k=>{const c=document.createElementNS(ns,'circle');c.setAttribute('r',30);$('#nodes').appendChild(c);nodes.push({c,r,k,x:r[k][0],y:r[k][1]-(rm?0:420),bx:r[k][0],by:r[k][1]})})});
(function draw(){if(svg){const s=svg.getBoundingClientRect(),k=400/s.width,tx=(mx-s.left)*k,ty=(my-s.top)*k;
nodes.forEach(n=>{const dx=tx-n.bx,dy=ty-n.by,d=Math.hypot(dx,dy)||1,pull=rm?0:Math.min(26,2600/d);n.x+=(n.bx+dx/d*pull-n.x)*.1;n.y+=(n.by+dy/d*pull-n.y)*.1;n.c.setAttribute('cx',n.x);n.c.setAttribute('cy',n.y)});
R.forEach(r=>{const a=nodes.find(n=>n.r==r&&n.k=='a'),b=nodes.find(n=>n.r==r&&n.k=='b'),B=(r.T-.125*(a.y+b.y))/.75;r.p.setAttribute('d',`M${a.x} ${a.y}C${a.x} ${B} ${b.x} ${B} ${b.x} ${b.y}`)})}
px+=(mx-px)*.15;py+=(my-py)*.15;cx+=(mx-cx)*.35;cy+=(my-cy)*.35;
pv.style.transform=`translate(${px+24}px,${py-90}px)${pv.classList.contains('on')?'':' scale(.7)'}`;cur.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(draw)})();
/* contact form -> email via FormSubmit, mailto as fallback */
const f=$('#cf');if(f)f.onsubmit=async e=>{e.preventDefault();const m=$('#msg'),btn=f.querySelector('button'),d=Object.fromEntries(new FormData(f));m.className='';
if(d.company)return;
if(!d.name.trim()||!/^\S+@\S+\.\S+$/.test(d.email.trim())||d.message.trim().length<10){m.className='err';m.textContent='Add your name, a valid email and a message of at least 10 characters.';return}
btn.disabled=true;m.textContent='Sending...';
try{const r=await fetch('https://formsubmit.co/ajax/mbamaluvictor1@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
body:JSON.stringify({name:d.name,email:d.email,topic:d.topic,message:d.message,_subject:`${d.topic} enquiry from ${d.name}`,_replyto:d.email,_captcha:'false',_template:'table'})});
const j=await r.json();if(!r.ok||j.success==='false')throw 0;f.reset();m.textContent='Message sent. I will reply to your email soon.'}
catch(x){m.className='err';m.innerHTML=`Could not send from this page. <a href="mailto:mbamaluvictor1@gmail.com?subject=${encodeURIComponent(d.topic+' enquiry from '+d.name)}&body=${encodeURIComponent(d.message)}">Send it from your email app</a> instead.`}
btn.disabled=false}
})();