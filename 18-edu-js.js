(function(){
'use strict';
var d=document,H=d.documentElement;
function lsg(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lss(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function hasName(){return !!(S.profile&&S.profile.name)}

/* ================= DASHBOARD ================= */
var ED={p:'all'};
var COL=['#8b5cf6','#4f9cf0','#34b6a4','#f59ac9','#c3c9e6'];
function inRange(a,p){if(p==='all')return true;if(p==='7d')return a.date>=Date.now()-7*864e5;var n=new Date();return a.date>=new Date(n.getFullYear(),n.getMonth(),1).getTime()}
function calc(p){
  var A=S.attempts.filter(function(a){return inRange(a,p)}),R={n:A.length,q:0,ok:0,by:{}};
  A.forEach(function(a){R.q+=a.total;R.ok+=a.score;Object.keys(a.subs||{}).forEach(function(s){if(s==='Sample')return;var z=a.subs[s],r=R.by[s]||(R.by[s]=[0,0]);r[0]+=z[0];r[1]+=z[1]})});
  var subs=Object.keys(R.by).filter(function(s){return R.by[s][1]>0}).map(function(s){var v=R.by[s],pc=100*v[0]/v[1];return{s:s,ok:v[0],n:v[1],pc:pc,gp:gpOf(pc)}}).sort(function(a,b){return b.n-a.n});
  var acc=R.q?100*R.ok/R.q:0,gp=subs.length?subs.reduce(function(t,x){return t+x.gp},0)/subs.length:(R.q?gpOf(acc):0);
  return{A:A,R:R,subs:subs,acc:acc,gp:gp,g:grOf(gp),has:R.q>0};
}
function gcls(gp){return 'g'+(gp>=5?5:gp>=4?4:gp>=3.5?3:gp>=2?2:gp>=1?1:0)}
function f1(n){return n.toFixed(1)}
function chart(A){
  var pts=A.slice(-10).map(function(a){return{v:a.total?100*a.score/a.total:0,d:a.date}}),N=pts.length,W=560,HT=230,L=34,Rr=12,Tp=14,B=28,iw=W-L-Rr,ih=HT-Tp-B;
  function X(i){return L+(N<2?iw/2:iw*i/(N-1))}function Y(v){return Tp+ih*(1-v/100)}
  var g='',i,v;
  for(i=0;i<5;i++){v=i*25;g+='<line class="ed-gl" x1="'+L+'" x2="'+(W-Rr)+'" y1="'+f1(Y(v))+'" y2="'+f1(Y(v))+'" stroke-width="1"/><text class="ed-tx" x="'+(L-8)+'" y="'+f1(Y(v)+4)+'" text-anchor="end">'+bd(v)+'</text>'}
  if(!N)return '<svg viewBox="0 0 '+W+' '+HT+'" role="img" aria-label="স্কোরের গ্রাফ">'+g+'<text class="ed-tx" x="'+(W/2)+'" y="'+(HT/2)+'" text-anchor="middle" style="font-size:17px">প্রথম পরীক্ষা দিলে এখানে তোমার স্কোরের গ্রাফ আঁকা হবে</text></svg>';
  var avg=pts.map(function(p,k){var s=0,c=0,j;for(j=Math.max(0,k-2);j<=k;j++){s+=pts[j].v;c++}return s/c});
  function P(a){if(N<2)return'';var s='M'+f1(X(0))+' '+f1(Y(a[0])),k,x0,x1,cx;for(k=0;k<N-1;k++){x0=X(k);x1=X(k+1);cx=(x0+x1)/2;s+='C'+f1(cx)+' '+f1(Y(a[k]))+' '+f1(cx)+' '+f1(Y(a[k+1]))+' '+f1(x1)+' '+f1(Y(a[k+1]))}return s}
  var raw=pts.map(function(p){return p.v}),step=N>6?2:1,xl='',dots='';
  pts.forEach(function(p,k){
    var dt=new Date(p.d).toLocaleDateString('bn-BD',{day:'numeric',month:'short'});
    if(k%step===0||k===N-1)xl+='<text class="ed-tx" x="'+f1(X(k))+'" y="'+(HT-8)+'" text-anchor="middle">'+dt+'</text>';
    dots+='<circle cx="'+f1(X(k))+'" cy="'+f1(Y(p.v))+'" r="4.5" fill="#8b5cf6" stroke="#fff" stroke-width="2"><title>পরীক্ষা '+bd(k+1)+' · '+bd(Math.round(p.v))+'% · '+dt+'</title></circle>'});
  return '<svg viewBox="0 0 '+W+' '+HT+'" role="img" aria-label="পরীক্ষাভিত্তিক স্কোরের গ্রাফ">'+g+xl+(N>1?'<path class="ed-ln" pathLength="1" d="'+P(avg)+'" stroke="#a3d633" stroke-width="3"/><path class="ed-ln" pathLength="1" d="'+P(raw)+'" stroke="#8b5cf6" stroke-width="3.5"/>':'')+dots+'</svg>';
}
function donut(subs,has,gp){
  var tot=subs.reduce(function(t,x){return t+x.n},0),it=subs.slice(0,4).map(function(x){return{s:x.s,n:x.n}}),rest=subs.slice(4).reduce(function(t,x){return t+x.n},0);
  if(rest)it.push({s:'অন্যান্য',n:rest});
  var seg='',acc=0;
  if(tot)it.forEach(function(x,k){var sh=100*x.n/tot,len=Math.max(sh-(it.length>1?1.2:0),0.3);seg+='<circle cx="18" cy="18" r="15.9155" fill="none" stroke="'+COL[k]+'" stroke-width="4.2" stroke-dasharray="'+len.toFixed(2)+' '+(100-len).toFixed(2)+'" stroke-dashoffset="'+(-acc).toFixed(2)+'"/>';acc+=sh});
  return '<div class="ed-dn"><svg viewBox="0 0 36 36" role="img" aria-label="বিষয়ভিত্তিক অনুশীলনের ভাগ"><circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e3e5f7" stroke-opacity=".7" stroke-width="4.2"/>'+seg+'</svg><div class="ed-dc"><b>'+(has?bd(gp.toFixed(2)):'—')+'</b><small>আনুমানিক GPA</small></div></div>'
   +it.map(function(x,k){var sj=subs.filter(function(y){return y.s===x.s})[0];return '<div class="ed-sm"><i style="background:'+COL[k]+'"></i><span>'+(sj?ed(x.s):'অন্যান্য')+'</span>'+(sj?'<b>'+bd(Math.round(sj.pc))+'%</b>':'')+'</div>'}).join('');
}
var CAP='<svg viewBox="0 0 64 64" fill="none" stroke="#7c4ddb" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 12 4 26l28 14 28-14z"/><path d="M16 33v12c0 4 7 8 16 8s16-4 16-8V33"/><path d="M60 26v16"/></svg>';
function dash(){
  var t=calc(ED.p),pr=S.profile||{},nm=pr.name||'',has=t.has;
  var dt=new Date().toLocaleDateString('bn-BD',{day:'numeric',month:'long',year:'numeric',weekday:'long',timeZone:'Asia/Dhaka'});
  var q=t.R.q,rel=q<30?'কম':q<100?'মাঝারি':'ভালো';
  /* trend + next goal */
  var tr='',pc=t.A.map(function(a){return a.total?100*a.score/a.total:0});
  if(pc.length>=4){var la=pc.slice(-3),pv=pc.slice(Math.max(0,pc.length-6),-3),m=function(a){return a.reduce(function(x,y){return x+y},0)/a.length},dl=Math.round(m(la)-m(pv));tr=dl>0?'▲ '+bd(dl)+'% উন্নতি':dl<0?'▼ '+bd(-dl)+'% কমেছে':'● স্থির'}
  var BN=[[33,'D'],[40,'C'],[50,'B'],[60,'A-'],[70,'A'],[80,'A+']],nx=null,i;
  for(i=0;i<BN.length;i++){if(t.acc<BN[i][0]){nx=BN[i];break}}
  var low=t.subs.filter(function(x){return x.n>=5&&x.pc<33});
  /* left: subjects */
  var subRows=t.subs.slice(0,4).map(function(x){var a=SA[x.s]||SAD;return '<button type="button" class="ed-r" data-a="hsub" data-s="'+esc(x.s)+'"><span class="ed-ti" style="background:linear-gradient(135deg,'+a.g[0]+','+a.g[1]+')">'+esc(bn(x.s).charAt(0))+'</span><span class="ed-rt"><b>'+ed(x.s)+'</b><small>'+bd(x.n)+' প্রশ্ন · '+bd(Math.round(x.pc))+'% সঠিক</small></span><span class="ed-g '+gcls(x.gp)+'">'+grOf(x.gp)+'</span></button>'}).join('')||'<p class="ed-mu">পরীক্ষা দিলে এখানে তোমার বিষয়গুলো ও প্রতিটির আনুমানিক গ্রেড দেখা যাবে।</p>';
  var weak=t.subs.filter(function(x){return x.n>=5&&x.pc<80}).sort(function(a,b){return a.pc-b.pc}).slice(0,3);
  var recRows=weak.map(function(x){var a=SA[x.s]||SAD;return '<div class="ed-r"><span class="ed-ti" style="background:linear-gradient(135deg,'+a.g[0]+','+a.g[1]+')">'+esc(bn(x.s).charAt(0))+'</span><span class="ed-rt"><b>'+ed(x.s)+'</b><small>'+bd(Math.round(x.pc))+'% · আরও অনুশীলন দরকার</small></span><button type="button" class="ed-jn" data-a="hsub" data-s="'+esc(x.s)+'">অনুশীলন</button></div>'}).join('')||'<p class="ed-mu">'+(has?'দারুণ! এখন পর্যন্ত কোনো বিষয় দুর্বল ধরা পড়েনি।':'কয়েকটি পরীক্ষা দিলে দুর্বল বিষয় এখানে সাজেস্ট করা হবে।')+'</p>';
  /* left: goals */
  var goal='';
  if(has)goal+='<div class="ed-goal"><span class="ed-gd">'+(nx?nx[1]:'A+')+'<small>পরবর্তী</small></span><span class="ed-rt"><b>'+(nx?bd(Math.ceil(nx[0]-t.acc))+'% বাড়ালে '+nx[1]:'সর্বোচ্চ গ্রেডে আছো!')+'</b><div class="ed-bar"><i style="width:'+Math.min(100,Math.round(t.acc))+'%"></i></div></span></div>';
  if(pr.exam){var dd=Math.ceil((new Date(pr.exam)-new Date(new Date().toDateString()))/864e5);if(dd>=0)goal+='<div class="ed-goal"><span class="ed-gd">'+bd(dd)+'<small>দিন</small></span><span class="ed-rt"><b>পরীক্ষার আর বাকি</b><small class="ed-mu">'+esc(pr.exam)+'</small></span></div>'}
  var tk=(S.tasks||[]).filter(function(x){return !x.done&&x.date>=iso(new Date())}).sort(function(a,b){return a.date<b.date?-1:1}).slice(0,2);
  tk.forEach(function(x){var dd=new Date(x.date+'T00:00:00');goal+='<div class="ed-goal"><span class="ed-gd">'+bd(dd.getDate())+'<small>'+dd.toLocaleDateString('bn-BD',{month:'short'})+'</small></span><span class="ed-rt"><b>'+esc(x.title)+'</b><small class="ed-mu">'+esc(bn(x.subject||''))+'</small></span></div>'});
  if(!goal)goal='<p class="ed-mu">পরীক্ষা দিলেই তোমার পরবর্তী গ্রেডের লক্ষ্য এখানে দেখা যাবে।</p>';
  var per=ED.p;
  return '<section class="ed" id="ed" aria-label="তোমার ড্যাশবোর্ড"><div class="ed-grid">'
   +'<div class="ed-side"><div class="ed-c"><div class="ed-hd"><b>আমার বিষয়</b><span><a href="#/learn" style="color:inherit;text-decoration:none">সব দেখো</a></span></div>'+subRows+'<a class="ed-new" href="#/learn" style="margin-top:.7rem"><i>+</i>নতুন পরীক্ষা শুরু করো</a></div>'
   +'<div class="ed-c"><div class="ed-hd"><b>দুর্বল বিষয়</b><span>সাজেশন</span></div>'+recRows+'</div>'
   +'<div class="ed-c"><div class="ed-hd"><b>লক্ষ্য ও সময়</b><span>'+bd(t.R.n)+'</span></div>'+goal+'</div></div>'
   +'<div class="ed-main"><div class="ed-top"><div><h2 class="ed-wl">'+(nm?'আবার স্বাগতম, <b>'+esc(nm)+'</b><button type="button" class="ed-nm" data-ed="name">বদলাও</button>':'স্বাগতম, <b>বন্ধু</b><button type="button" class="ed-nm" data-ed="name">+ নাম যোগ করো</button>')+'</h2><p class="ed-dt">আজ '+dt+'</p></div>'
   +'<div class="ed-act"><select class="ed-sel" data-ed="period" aria-label="সময়কাল">'+[['all','সব সময়'],['month','এই মাস'],['7d','শেষ ৭ দিন']].map(function(o){return '<option value="'+o[0]+'"'+(o[0]===per?' selected':'')+'>'+o[1]+'</option>'}).join('')+'</select><button type="button" class="ed-dl" data-ed="dl">রিপোর্ট ডাউনলোড</button></div></div>'
   +'<div class="ed-tiles"><div class="ed-t"><span class="ed-n">'+(has?bd(t.gp.toFixed(2)):'—')+'</span><small>আনুমানিক GPA</small><em>'+bd('5.00')+' এর মধ্যে</em></div>'
   +'<div class="ed-t"><span class="ed-n">'+(has?bd(Math.round(t.acc))+'%':'—')+'</span><small>নির্ভুলতা</small><em>'+(has?bd(t.R.ok)+'/'+bd(q)+' সঠিক':'এখনো অনুশীলন নেই')+'</em></div>'
   +'<div class="ed-t w"><span class="ed-ic">'+CAP+'</span><span class="ed-tb"><em>'+(has?bd(q)+'টি প্রশ্নের ভিত্তিতে · নির্ভরযোগ্যতা: '+rel:'বাংলাদেশ SSC গ্রেডিং')+(tr?' · '+tr:'')+'</em><span class="ed-n">'+(has?t.g:'—')+'</span><small>সম্ভাব্য SSC গ্রেড</small></span></div></div>'
   +(has?'':'<a class="ed-cta" href="#/quick"><span style="font-size:1.6rem;margin:0">🎯</span><div><b>প্রথম পরীক্ষাটা দিয়ে ফেলো</b><small>তোমার নামে GPA ও গ্রেডের ভবিষ্যদ্বাণী তৈরি হবে</small></div><span>→</span></a>')
   +(low.length?'<div class="ed-wn">⚠ '+low.map(function(x){return ed(x.s)}).join(', ')+' বিষয়ে ৩৩%-এর নিচে আছো। SSC-তে পাস করতে প্রতিটি বিষয়ে পাস মার্ক লাগে, তাই এগুলোতে আগে জোর দাও।</div>':'')
   +'<div class="ed-two"><div class="ed-c ed-ch"><div class="ed-hd"><b>স্কোর ওভারভিউ</b></div><div class="ed-lg"><span><i style="background:#8b5cf6"></i>পরীক্ষার স্কোর %</span><span><i style="background:#a3d633"></i>গড় (৩ পরীক্ষা)</span></div>'+chart(t.A)+'</div>'
   +'<div class="ed-c"><div class="ed-hd"><b>বিষয়ভিত্তিক পারফরম্যান্স</b></div>'+donut(t.subs,has,t.gp)+'</div></div>'
   +'<p class="ed-ft">'+(has?'এটি তোমার MCQ ফলাফলের ভিত্তিতে একটি আনুমানিক হিসাব (বিষয়ভিত্তিক সঠিক উত্তরের হার থেকে গ্রেড, তারপর গড়)। আসল SSC ফল ভিন্ন হতে পারে। '+bd(80)+'+ = A+ · '+bd(70)+'+ = A · '+bd(60)+'+ = A- · '+bd(50)+'+ = B · '+bd(40)+'+ = C · '+bd(33)+'+ = D':'একটি কুইজ বা মক টেস্ট দিলেই ড্যাশবোর্ড তোমার নামে সক্রিয় হয়ে যাবে।')+'</p></div></div></section>';
}
window.gpaCardsOld=window.gpaCards;
window.gpaCards=function(){try{return dash()}catch(e){return window.gpaCardsOld?window.gpaCardsOld():''}};
/* put the dashboard at the very top of the home page */
var homeOld=views.home;
views.home=function(){var h=homeOld(),i=h.indexOf('<section class="ed" id="ed"');if(i<0)return h;var j=h.indexOf('</section>',i);if(j<0)return h;j+=10;return h.slice(i,j)+h.slice(0,i)+h.slice(j)};
function redraw(){var el=d.getElementById('ed');if(el){var tmp=d.createElement('div');tmp.innerHTML=dash();el.replaceWith(tmp.firstChild)}}

/* ================= ENTRY / NAME / ISHAN WELCOME ================= */
var pend=0,root=null,isApp=!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform())||(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
var IG='https://www.instagram.com/mcqbook.online/';
/* >>> Paste your Google OAuth Web Client ID here to turn on "Continue with Google" (looks like 1234567890-abc.apps.googleusercontent.com). Empty = button hidden. */
var GID='';
var AVS='<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="egG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#6366f1"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs><circle cx="24" cy="24" r="23" fill="url(#egG)"/><ellipse cx="18" cy="9" rx="20" ry="10" fill="#fff" opacity=".22"/><rect x="11" y="15" width="26" height="20" rx="9" fill="#fff"/><circle cx="19" cy="25" r="3" fill="#4f46e5"/><circle cx="29" cy="25" r="3" fill="#4f46e5"/><path d="M20 31q4 3 8 0" stroke="#ec4899" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M24 15V9" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="8" r="2.6" fill="#fbbf24"/></svg>';
function mount(){if(root)return;root=d.createElement('div');root.className='eg';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label','MCQBook স্বাগতম');root.innerHTML='<div class="eg-c"></div>';d.body.appendChild(root);H.classList.add('eg-lock');requestAnimationFrame(function(){if(root)root.classList.add('on')})}
function closeG(){if(!root)return;var r=root;root=null;r.classList.remove('on');H.classList.remove('eg-lock');setTimeout(function(){r.remove()},260)}
function step(html,focus){mount();var c=root.querySelector('.eg-c');c.innerHTML=html;c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop');root.scrollTop=0;var f=focus&&c.querySelector(focus);if(f){try{f.focus({preventScroll:true})}catch(e){}}}
function bub(h){return '<div class="eg-bub"><span class="eg-av">'+AVS+'</span><div class="eg-tx">'+h+'</div></div>'}
function sEntry(){
  var lg='';try{lg=logoMark()}catch(e){}
  step('<div class="eg-lg">'+lg+'</div><h2>MCQBook-এ স্বাগতম</h2><p><b>MCQBook</b> হলো SSC-র ফ্রি MCQ প্র্যাকটিস প্ল্যাটফর্ম।</p><ul class="eg-ul"><li>সব বিষয়ের বোর্ড প্রশ্ন, উত্তরসহ</li><li>মক টেস্ট ও কুইক প্র্যাকটিস, একদম ফ্রি</li><li>ভুলের রিপোর্ট দেখে দুর্বল জায়গা চেনা যায়</li>'+(isApp?'':'<li><b>অ্যাপ নিলে</b> ফোনের হোম স্ক্রিন থেকেই এক ক্লিকে শুরু, আরও দ্রুত</li>')+'</ul>'
   +(isApp
     ?'<button type="button" class="eg-b dk" data-eg="named" data-f>নাম দিয়ে শুরু করো<small>তোমার নামে ড্যাশবোর্ড তৈরি হবে</small></button><button type="button" class="eg-b gh" data-eg="web">অতিথি হিসেবে চালিয়ে যাও</button>'
     :'<button type="button" class="eg-b gr" data-eg="app" data-f>অ্যাপ ডাউনলোড করো<small>সবচেয়ে সহজ · ফ্রি · এক ক্লিক</small></button><button type="button" class="eg-b dk" data-eg="web">ব্রাউজারে চালিয়ে যাও<small>অতিথি হিসেবে এখনই শুরু</small></button>')
   +(GID?'<div class="eg-or">অথবা</div><div id="eg-gb"></div>':'')
   +'<button type="button" class="eg-b gh" data-eg="login" style="min-height:48px">ইমেইল দিয়ে লগইন / অ্যাকাউন্ট খোলো</button>'
   +'<a class="eg-pm" href="#/premium" data-eg="prem">★ প্রিমিয়াম নিতে চাও?</a><br><a class="eg-ig" href="'+IG+'" target="_blank" rel="noopener">Instagram-এ ফলো করো</a>','[data-f]');
  if(GID)gBtn();
}
/* ---- Google sign-in (Google Identity Services). Needs GID below to be set. ---- */
function jwt(t){try{var p=t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');while(p.length%4)p+='=';return JSON.parse(decodeURIComponent(atob(p).split('').map(function(c){return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join('')))}catch(e){return null}}
function gDone(r){
  var u=r&&r.credential?jwt(r.credential):null;if(!u||!u.email||u.email_verified===false)return;
  var em=String(u.email).toLowerCase(),nm=String(u.name||u.given_name||'').replace(/\s+/g,' ').trim().slice(0,40);
  emailId(em).then(function(id){
    var us=users();if(!us[id])us[id]={e:em,g:1,c:Date.now()};localStorage.setItem('ssh_users',JSON.stringify(us));
    var k='ssh_u_'+id,st=null;try{st=JSON.parse(localStorage.getItem(k)||'null')}catch(e){}
    if(!st||typeof st!=='object')st={profile:null,tasks:[],attempts:[],cards:{},notes:[],bank:[]};
    if(!st.profile)st.profile={country:'BD',board:CUR.BD.boards[0],cls:CUR.BD.classes[0],lang:'Bangla',subjects:CUR.BD.subjects.slice(),exam:'',name:'',school:'',group:'',roll:'',sec:'',goal:''};
    if(!st.profile.name&&nm)st.profile.name=nm;
    localStorage.setItem(k,JSON.stringify(st));
    setSess(id,true);pass();location.hash='#/home';location.reload();
  }).catch(function(){});
}
function gBtn(){
  function draw(){var el=d.getElementById('eg-gb');if(!el||!window.google||!google.accounts)return;google.accounts.id.initialize({client_id:GID,callback:gDone});google.accounts.id.renderButton(el,{theme:'outline',size:'large',shape:'pill',text:'continue_with',locale:'bn',width:Math.min(320,el.clientWidth||320)})}
  if(window.google&&google.accounts){draw();return}
  var sc=d.getElementById('gsi-js');if(!sc){sc=d.createElement('script');sc.id='gsi-js';sc.src='https://accounts.google.com/gsi/client';sc.async=true;d.head.appendChild(sc)}
  sc.addEventListener('load',draw);
}
function sName(edit){
  step(bub('হ্যালো! আমি <b>ইশান অ্যাসিস্ট্যান্ট</b>। তোমার নামটা বলবে? হোমের ড্যাশবোর্ডে তোমার নাম ধরেই স্বাগত জানাব।')
   +'<input class="eg-in" id="eg-nm" type="text" maxlength="40" autocomplete="name" placeholder="তোমার নাম লেখো" value="'+(edit&&hasName()?esc(S.profile.name):'')+'" aria-label="তোমার নাম"><div class="eg-er" id="eg-er" role="alert"></div>'
   +'<button type="button" class="eg-b dk" data-eg="savename">চালিয়ে যাও</button><button type="button" class="eg-sk" data-eg="'+(edit?'cancel':'skipname')+'">'+(edit?'বাতিল':'এখন না')+'</button>','#eg-nm');
}
function sWelcome(n){
  step(bub('স্বাগতম, <b>'+esc(n)+'</b>! 🎉 আমি ইশান। এখানে বোর্ড প্রশ্ন, মক টেস্ট আর কুইক প্র্যাকটিস ফ্রিতে করতে পারবে।')
   +'<ul class="eg-ul"><li>পরীক্ষা দিলেই হোমে তোমার নামে ড্যাশবোর্ড তৈরি হবে</li><li>সম্ভাব্য SSC GPA ও গ্রেড দেখতে পাবে</li><li>দুর্বল বিষয় চিনে নিয়ে আবার অনুশীলন করতে পারবে</li></ul>'
   +'<button type="button" class="eg-b gr" data-eg="first" data-f>প্রথম পরীক্ষা দাও</button><button type="button" class="eg-b gh" data-eg="home">হোমে যাও</button>','[data-f]');
}
function saveName(n){
  n=String(n||'').replace(/\s+/g,' ').trim().slice(0,40);if(n.length<2)return false;
  if(!S.profile)S.profile={country:'BD',board:CUR.BD.boards[0],cls:CUR.BD.classes[0],lang:'Bangla',subjects:CUR.BD.subjects.slice(),exam:'',name:'',school:'',group:'',roll:'',sec:'',goal:''};
  S.profile.name=n;save();lss('mcqb_entry','1');try{render()}catch(e){}return n;
}
function pass(){lss('mcqb_entry','1');if(!lsg('mcqb_apppop'))lss('mcqb_apppop',String(Date.now()))}
d.addEventListener('click',function(e){
  if(pend&&root&&e.target.closest&&e.target.closest('#apq-apk,#apq-dl,.apq-dl,.apq-apkh')){pend=0;setTimeout(function(){pass();sName(false)},500);return}
  var b=e.target.closest&&e.target.closest('[data-eg],[data-ed]');if(!b)return;
  var k=b.getAttribute('data-eg'),z=b.getAttribute('data-ed');
  if(z==='dl'){d.body.classList.add('ed-print');var un=function(){d.body.classList.remove('ed-print');removeEventListener('afterprint',un)};addEventListener('afterprint',un);setTimeout(function(){window.print()},30);return}
  if(z==='name'){sName(true);return}
  if(k==='login'){pass();closeG();location.hash='#/login';return}
  if(k==='app'){pend=1;if(typeof window.mcqbShowApp==='function')window.mcqbShowApp(true);else{location.href='app/mcqbook.apk';setTimeout(function(){if(pend){pend=0;pass();sName(false)}},900)}return}
  if(k==='named'){pass();sName(false);return}
  if(k==='prem'){pass();closeG();return}
  if(k==='web'){pass();closeG();return}
  if(k==='savename'){var inp=d.getElementById('eg-nm'),r=saveName(inp&&inp.value);if(!r){var er=d.getElementById('eg-er');if(er)er.textContent='নামটি অন্তত ২ অক্ষরের লেখো।';if(inp)inp.focus();return}sWelcome(r);return}
  if(k==='skipname'){pass();lss('mcqb_nameskip',String(Date.now()));closeG();return}
  if(k==='cancel'||k==='home'){closeG();return}
  if(k==='first'){closeG();location.hash='#/learn';return}
});
d.addEventListener('change',function(e){var s=e.target;if(s&&s.getAttribute&&s.getAttribute('data-ed')==='period'){ED.p=s.value;redraw()}});
d.addEventListener('keydown',function(e){
  if(!root)return;
  if(e.key==='Enter'&&e.target&&e.target.id==='eg-nm'){e.preventDefault();var b=root.querySelector('[data-eg=savename]');if(b)b.click()}
  if(e.key==='Escape'&&root.querySelector('[data-eg=skipname],[data-eg=cancel]')){var s=root.querySelector('[data-eg=skipname],[data-eg=cancel]');s.click()}
});
/* decide what to show on load */
var bot=/bot|crawl|spider|lighthouse|pagespeed|headless|gtmetrix|facebookexternalhit/i.test(navigator.userAgent||'');
if(!bot&&location.hash!=='#/login'){
  if(ME==='_guest'&&!lsg('mcqb_entry')&&!S.attempts.length&&!hasName()){window.__mcqEntry=1;sEntry()}
  else if(!hasName()&&ME!=='_guest'&&Date.now()-Number(lsg('mcqb_nameskip')||0)>3*864e5){window.__mcqEntry=1;sName(false)}
}
/* re-render home so the new dashboard replaces the old card */
try{render()}catch(e){}
})();
