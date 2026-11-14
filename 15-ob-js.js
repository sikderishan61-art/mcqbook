(function(){
var OFF=[
 ['ob-g1','১০ জন শেয়ার','১০ জনকে শেয়ার করো, ৩০ দিন প্রিমিয়াম ফ্রি','তোমার ব্যক্তিগত শেয়ার লিংকটি বন্ধুদের পাঠাও। তোমার লিংক দিয়ে ১০ জন MCQBook-এ জয়েন করলেই ৩০ দিনের প্রিমিয়াম ফ্রিতে খুলে যাবে। এতে পাবে CQ সৃজনশীল প্রশ্ন, স্মার্টফোন পুরস্কারের টোকেন ও গোল্ড প্রিমিয়াম ব্যাজ।','ফ্রিতে নাও','#/premium'],
 ['ob-g2','ফ্রি প্র্যাকটিস','চ্যাপ্টার-ভিত্তিক MCQ, একদম ফ্রি','এসএসসির প্রতিটি বিষয়ের অধ্যায় ধরে ধরে MCQ অনুশীলন করো। বিষয় বেছে নাও, অধ্যায় ঠিক করো, তারপর যত খুশি প্রশ্নের উত্তর দাও। কোনো খরচ নেই, কোনো সীমা নেই — যতবার ইচ্ছা আবার চেষ্টা করতে পারবে।','অনুশীলন শুরু করো','#/learn'],
 ['ob-g3','বোর্ড প্রশ্ন','বোর্ড প্রশ্ন উত্তরসহ','ঢাকা, রাজশাহী, কুমিল্লা, যশোর, চট্টগ্রাম, বরিশাল ও সিলেটসহ বিভিন্ন বোর্ডের আগের বছরের MCQ প্রশ্ন বোর্ড ও সাল অনুযায়ী সাজানো আছে। প্রতিটি প্রশ্নের সঠিক উত্তর দেখে নিজের প্রস্তুতি যাচাই করো।','বোর্ড প্রশ্ন দেখো','#/learn'],
 ['ob-g4','মডেল টেস্ট','মডেল টেস্ট দিয়ে নিজেকে যাচাই করো','আসল পরীক্ষার মতো সময় ধরে মডেল টেস্ট দাও। জমা দেওয়ার পর তোমার স্কোর, সঠিক ও ভুল উত্তর দেখতে পাবে, আর ভুলের রিপোর্ট থেকে বুঝে নিতে পারবে কোন অধ্যায়ে আরও অনুশীলন দরকার।','টেস্ট দাও','#/learn'],
 ['ob-g5','CQ প্রশ্ন','CQ সৃজনশীল প্রশ্ন','প্রিমিয়াম মেম্বাররা বিষয় অনুযায়ী সৃজনশীল (CQ) প্রশ্নের উদ্দীপকসহ সংগ্রহ দেখতে পারবে এবং প্রতিটি প্রশ্নের উত্তর খুলে দেখে নিতে পারবে। MCQ-র পাশাপাশি CQ-র প্রস্তুতিও এক জায়গায়।','দেখো','#/cq'],
 ['ob-g6','অ্যাপ','ফোনে অ্যাপ হিসেবে ইনস্টল করো','Chrome-এ এক ক্লিকে MCQBook অ্যাপ হিসেবে হোম স্ক্রিনে ইনস্টল করো। এরপর সাধারণ অ্যাপের মতো খুলে সরাসরি MCQ প্র্যাকটিস করতে পারবে। ইনস্টল করা সম্পূর্ণ ফ্রি।','ইনস্টল করো','install']
];
var ART='<svg class="ob-art" viewBox="0 0 360 210" aria-hidden="true" focusable="false"><defs><linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e0e7ff"/></linearGradient><linearGradient id="hg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="hg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#6366f1"/></linearGradient><radialGradient id="hgl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><filter id="hsh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#0b1026" flood-opacity=".45"/></filter></defs><circle cx="180" cy="110" r="120" fill="url(#hgl)"/><g stroke="#fff" stroke-opacity=".12" fill="none"><circle cx="180" cy="120" r="70"/><circle cx="180" cy="120" r="100"/><circle cx="180" cy="120" r="130"/></g><g class="ob-f2" filter="url(#hsh)"><rect x="22" y="60" width="118" height="92" rx="16" fill="url(#hg3)" transform="rotate(-9 81 106)"/><g transform="rotate(-9 81 106)" fill="#fff"><rect x="38" y="78" width="70" height="7" rx="3.5" opacity=".9"/><rect x="38" y="94" width="86" height="6" rx="3" opacity=".5"/><rect x="38" y="108" width="60" height="6" rx="3" opacity=".5"/><circle cx="48" cy="132" r="7" opacity=".9"/><circle cx="72" cy="132" r="7" opacity=".4"/><circle cx="96" cy="132" r="7" opacity=".4"/></g></g><g class="ob-f1" filter="url(#hsh)"><rect x="108" y="22" width="148" height="150" rx="20" fill="url(#hg1)"/><rect x="124" y="38" width="64" height="9" rx="4.5" fill="#1e3a8a" opacity=".85"/><rect x="124" y="54" width="112" height="6" rx="3" fill="#94a3b8"/><g font-family="Hind Siliguri,system-ui,sans-serif" font-weight="700" font-size="13"><rect x="124" y="72" width="112" height="22" rx="11" fill="#eef2ff" stroke="#c7d2fe"/><text x="138" y="87" fill="#3730a3">ক</text><rect x="152" y="80" width="64" height="6" rx="3" fill="#a5b4fc"/><rect x="124" y="100" width="112" height="22" rx="11" fill="#dcfce7" stroke="#22c55e"/><text x="138" y="115" fill="#166534">খ</text><rect x="152" y="108" width="52" height="6" rx="3" fill="#4ade80"/><path d="M216 111l5 5 9-10" stroke="#16a34a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="124" y="128" width="112" height="22" rx="11" fill="#eef2ff" stroke="#c7d2fe"/><text x="138" y="143" fill="#3730a3">গ</text><rect x="152" y="136" width="70" height="6" rx="3" fill="#a5b4fc"/></g></g><g class="ob-f3" filter="url(#hsh)"><circle cx="292" cy="92" r="46" fill="url(#hg2)"/><circle cx="292" cy="92" r="36" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><path d="M292 66l7.4 15 16.6 2.4-12 11.7 2.8 16.5-14.8-7.8-14.8 7.8 2.8-16.5-12-11.7 16.6-2.4z" fill="#fff"/></g><g fill="#fff"><path d="M60 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" opacity=".9"/><path d="M330 28l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4z" opacity=".8"/><path d="M318 170l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" opacity=".7"/><circle cx="40" cy="170" r="3" opacity=".6"/><circle cx="270" cy="30" r="2.4" opacity=".6"/></g></svg>';
var ICN={'ob-g1':'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>','ob-g2':'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 9l2 2 3.5-4M8 16h8"/>','ob-g3':'<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>','ob-g4':'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>','ob-g5':'<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 21V5M9 8h6M9 12h4"/>','ob-g6':'<rect x="7" y="2" width="10" height="20" rx="3"/><path d="M11 18h2"/>'};
function ic(k){return ICN[k]?'<svg class="ob-ic" viewBox="0 0 24 24" aria-hidden="true">'+ICN[k]+'</svg>':''}
var timer=0;
function build(){
 var app=document.getElementById('app');if(!app)return;
 var ban=app.querySelector(':scope > a.pm-ban:not(.mini)');
 if(!ban||ban.closest('.ob-car'))return;
 var car=document.createElement('div');car.className='ob-car';car.setAttribute('role','region');car.setAttribute('aria-roledescription','carousel');car.setAttribute('aria-label','অফার');
 var trk=document.createElement('div');trk.className='ob-trk';
 var first=document.createElement('div');first.className='ob-sl';
 ban.parentNode.insertBefore(car,ban);first.appendChild(ban);trk.appendChild(first);
 OFF.forEach(function(o){
  var sl=document.createElement('div');sl.className='ob-sl';
  var a=document.createElement(o[5]==='install'?'button':'a');
  a.className='ob-o '+o[0];
  if(o[5]==='install'){a.type='button';a.addEventListener('click',function(){var h=document.querySelector('#app .hx-app,.apq-main');if(h)h.click()})}else a.href=o[5];
  a.innerHTML=ic(o[0])+'<span class="ob-k">'+o[1]+'</span><b>'+o[2]+'</b><p>'+o[3]+'</p><span class="ob-b">'+o[4]+' →</span>';
  sl.appendChild(a);trk.appendChild(sl)});
 var hs=document.createElement('div');hs.className='ob-sl';
 var ha=document.createElement('a');ha.className='ob-o ob-hero';ha.href='#/learn';
 ha.innerHTML='<span class="ob-k">SSC ২০২৭ প্রস্তুতি</span><b>প্রতিদিন অনুশীলন, পরীক্ষায় আত্মবিশ্বাস</b><p>অধ্যায়ভিত্তিক MCQ, বোর্ড প্রশ্ন ও মডেল টেস্ট — সব এক জায়গায়, ফ্রি। প্রতিদিন একটু একটু অনুশীলন করলেই পরীক্ষার হলে আত্মবিশ্বাস বাড়বে।</p>'+ART+'<span class="ob-b">এখনই শুরু করো →</span>';
 hs.appendChild(ha);trk.insertBefore(hs,trk.children[1]||null);
 car.appendChild(trk);
 var n=OFF.length+2,dots=document.createElement('div');dots.className='ob-dots';dots.setAttribute('aria-hidden','true');
 for(var i=0;i<n;i++)dots.appendChild(document.createElement('i'));
 car.appendChild(dots);
 var cur=0,paused=0,raf=0;
 function mark(){raf=0;var w=trk.clientWidth||1;cur=Math.round(trk.scrollLeft/w);[].forEach.call(dots.children,function(d,i){d.classList.toggle('on',i===cur)})}
 mark();
 trk.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(mark)},{passive:true});
 var rs=0;function hold(){paused=1;clearTimeout(rs);rs=setTimeout(function(){paused=0},9000)}
 ['pointerdown','touchstart','wheel','focusin'].forEach(function(e){car.addEventListener(e,hold,{passive:true})});
 clearInterval(timer);
 timer=setInterval(function(){
  if(!car.isConnected){clearInterval(timer);return}
  if(paused||document.hidden)return;
  var r=car.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  var nx=(cur+1)%n;trk.scrollTo({left:nx*trk.clientWidth,behavior:(nx===0||matchMedia('(prefers-reduced-motion:reduce)').matches)?'auto':'smooth'})
 },4500);
}
var q=0;new MutationObserver(function(){if(q)return;q=requestAnimationFrame(function(){q=0;build()})}).observe(document.getElementById('app')||document.documentElement,{childList:true});
build();
})();
