/* Ishan Assistant — in-site guide (offline, rule-based). Opens screens for the user. */
(function(){
  if(window.__ishanAsst)return;window.__ishanAsst=1;
  var d=document,SUBJ=[
    ['Higher Mathematics',/উচ্চতর|higher\s*math|hm\b/i,'উচ্চতর গণিত'],
    ['General Mathematics',/সাধারণ গণিত|general\s*math|গণিত|math/i,'সাধারণ গণিত'],
    ['Bangla 1st Paper',/বাংলা\s*(১|1|প্রথম)|bangla\s*(1|first)|বাংলা ১ম/i,'বাংলা প্রথম পত্র'],
    ['Bangla 2nd Paper',/বাংলা\s*(২|2|দ্বিতীয়)|bangla\s*(2|second)|ব্যাকরণ|বাংলা ২য়/i,'বাংলা দ্বিতীয় পত্র'],
    ['Physics',/পদার্থ|physics|ফিজিক্স/i,'পদার্থবিজ্ঞান'],
    ['Chemistry',/রসায়ন|chem/i,'রসায়ন'],
    ['Biology',/জীব|bio/i,'জীববিজ্ঞান'],
    ['ICT',/আইসিটি|\bict\b|তথ্য ও যোগাযোগ/i,'আইসিটি'],
    ['Bangladesh & Global Studies',/বাংলাদেশ ও বিশ্ব|bgs|bangladesh\s*(&|and)?\s*global|বিশ্বপরিচয়/i,'বাংলাদেশ ও বিশ্বপরিচয়'],
    ['Islam & Moral Education',/ইসলাম|islam|ধর্ম|নৈতিক/i,'ইসলাম ও নৈতিক শিক্ষা'],
    ['Accounting',/হিসাব|account/i,'হিসাববিজ্ঞান'],
    ['Finance & Banking',/ফিন্যান্স|ব্যাংকিং|finance|bank/i,'ফিন্যান্স ও ব্যাংকিং'],
    ['Geography & Environment',/ভূগোল|geograph/i,'ভূগোল ও পরিবেশ'],
    ['Economics',/অর্থনীতি|economics/i,'অর্থনীতি'],
    ['General Science',/সাধারণ বিজ্ঞান|general\s*science/i,'সাধারণ বিজ্ঞান']
  ];
  var MODES=[['board',/বোর্ড|board|আগের বছর|previous|past paper/i,'বোর্ড প্রশ্ন'],
    ['topic',/টপিক|topic/i,'টপিক মক'],
    ['mock',/মক|mock|মডেল টেস্ট|model test/i,'মক টেস্ট'],
    ['quick',/কুইক|quick|দ্রুত/i,'কুইক প্র্যাকটিস'],
    ['chap',/অধ্যায়|chapter|\bchap\b|চ্যাপ্টার/i,'অধ্যায়ভিত্তিক সেট']];

  /* ---------- actions ---------- */
  function waitFor(f,cb,n){n=n||0;var r=f();if(r)return cb(r);if(n>40)return;setTimeout(function(){waitFor(f,cb,n+1)},100)}
  function openLearn(subj,mode){
    if(location.hash!=='#/learn')location.hash='#/learn';
    var tries=0;(function reset(){var b=d.querySelector('.sj');if(!b&&tries++<4){var back=d.querySelector('.back');if(back)back.click();return setTimeout(reset,160)}})();
    if(!subj)return;
    var n=0;(function pick(){
      var el=d.querySelector('.sj[data-s="'+subj+'"]');
      if(el){el.click();
        setTimeout(function(){
          var m=d.querySelector('.md');
          if(!m){if(n++<6)return pick();return}
          if(mode){var t=d.querySelector('.md[data-m="'+mode+'"]');if(t)t.click()}
        },420);
      }else if(n++<30)setTimeout(pick,150);
    })();
  }
  function go(h){return function(){location.hash=h}}
  function installApp(){var b=d.querySelector('#topline .ins')||d.querySelector('.hx-app');if(b)b.click();else location.hash='#/home'}
  var A={
    learn:['📚 বিষয় বেছে নাও',function(){openLearn()}],
    report:['📊 আমার রিপোর্ট',go('#/report')],
    premium:['⭐ প্রিমিয়াম',go('#/premium')],
    login:['🔑 লগইন / সাইন আপ',go('#/login')],
    founder:['👤 প্রতিষ্ঠাতা',go('#/founder')],
    cq:['✍️ CQ সৃজনশীল',go('#/cq')],
    topper:['🏆 লেজেন্ড পোর্টাল',go('#/topper')],
    install:['📲 অ্যাপ ইনস্টল',installApp],
    settings:['⚙️ সেটিংস',go('#/setup')],
    phyBoard:['⚡ পদার্থবিজ্ঞান বোর্ড প্রশ্ন',function(){openLearn('Physics','board')}],
    phyChap:['⚡ পদার্থ অধ্যায়ভিত্তিক',function(){openLearn('Physics','chap')}],
    home:['🏠 হোম',go('#/home')]
  };
  function act(k){return {label:A[k][0],fn:A[k][1]}}

  /* ---------- knowledge ---------- */
  var KB=[
   {id:'board',kw:/বোর্ড|board|আগের বছর|previous|past paper|ঢাকা|রাজশাহী|কুমিল্লা|যশোর|চট্টগ্রাম/i,
    bn:'<b>বোর্ড প্রশ্ন</b> মানে আগের বছরের আসল বোর্ড পরীক্ষার MCQ। ধাপগুলো:<ol><li><b>বিষয় বেছে নাও</b> (যেমন পদার্থবিজ্ঞান)</li><li><b>“১ · বোর্ড প্রশ্ন”</b> ধরনটি চাপো</li><li>বোর্ড বেছে নাও (ঢাকা, রাজশাহী, কুমিল্লা, যশোর…)</li><li>বছর বেছে নাও</li><li>প্রশ্ন সংখ্যা ও সময় ঠিক করে <b>শুরু</b> চাপো</li></ol>শেষে <b>উত্তর ও ব্যাখ্যাসহ</b> ফলাফল দেখতে পাবে।',
    en:'<b>Board questions</b> are real past board MCQs. Pick a subject → “Board questions” → board → year → set count/time → Start. You get answers with explanations at the end.',
    acts:['phyBoard','learn']},
   {id:'chap',kw:/অধ্যায়|chapter|চ্যাপ্টার|chapter.?wise|সেট|\bset\b/i,
    bn:'<b>অধ্যায়ভিত্তিক সেট</b>: একটি অধ্যায় বেছে সেই অধ্যায়ের পুরো প্রস্তুতি নাও। যেমন পদার্থবিজ্ঞানে <b>১৩টি অধ্যায়</b> আছে, প্রতিটিতে আনলিমিটেড প্রশ্ন। কমপক্ষে ৩০টি প্রশ্নে <b>৮০%+</b> পেলে অধ্যায়টি <b>“সম্পন্ন”</b> হয়ে যায়। প্রশ্ন সংখ্যা ও সময় তুমি নিজেই ঠিক করতে পারবে।',
    en:'<b>Chapter-wise sets</b>: choose a chapter and practise it fully (e.g. Physics has 13 chapters, unlimited questions each). Score 80%+ on at least 30 questions to mark a chapter complete.',
    acts:['phyChap','learn']},
   {id:'topic',kw:/টপিক|topic/i,
    bn:'<b>টপিক অনুযায়ী মক</b>: অধ্যায় বেছে নাও, শুধু সেই অধ্যায়ের প্রশ্ন নিয়ে মক টেস্ট দাও। দুর্বল অধ্যায় ঝালাই করার জন্য দারুণ।',
    en:'<b>Topic-wise mock</b>: pick a chapter and take a mock made only of that chapter’s questions.',acts:['learn']},
   {id:'mock',kw:/মক|mock|মডেল টেস্ট|model test|পরীক্ষা দিতে|exam|টাইমার|timer|সময়/i,
    bn:'<b>মক টেস্ট</b>: প্রশ্নের সংখ্যা ও সময় নিজে ঠিক করো, সব বোর্ডের প্রশ্ন মিশিয়ে আসল পরীক্ষার মতো টাইমারসহ পরীক্ষা দাও। শেষে ফল ও ভুলগুলো দেখে নাও।',
    en:'<b>Mock test</b>: choose question count and time; questions from all boards are mixed with a live timer, like a real exam.',acts:['learn','report']},
   {id:'quick',kw:/কুইক|quick|দ্রুত|একটা একটা|instant/i,
    bn:'<b>কুইক প্র্যাকটিস</b>: একটা একটা করে প্রশ্ন, উত্তর সাথে সাথে দেখাবে। সময়ের চাপ নেই, যত খুশি অনুশীলন করো।',
    en:'<b>Quick practice</b>: one question at a time with instant answers and no time pressure.',acts:['learn']},
   {id:'report',kw:/রিপোর্ট|report|ভুল|mistake|progress|অগ্রগতি|ফলাফল|result/i,
    bn:'<b>আমার রিপোর্ট</b>-এ তোমার পরীক্ষার ফল, ভুল উত্তর ও দুর্বল অধ্যায় একসাথে দেখা যায়। ভুলগুলো ধরে আবার প্র্যাকটিস করলে দ্রুত উন্নতি হয়।',
    en:'<b>My Report</b> shows your results, mistakes and weak chapters so you can practise them again.',acts:['report']},
   {id:'explain',kw:/ব্যাখ্যা|explanation|solve|সমাধান|কেন|why/i,
    bn:'পরীক্ষা শেষে প্রতিটি প্রশ্নের <b>সঠিক উত্তর ও ব্যাখ্যা</b> দেখা যায় (যেসব প্রশ্নে ব্যাখ্যা যোগ করা আছে)। ভুল উত্তরগুলো রিপোর্টেও জমা থাকে।',
    en:'After a test you see the correct answer with an explanation for each question (where available).',acts:['report']},
   {id:'flag',kw:/চিহ্নিত|flag|mark|মনে রাখ|bookmark/i,
    bn:'কঠিন প্রশ্নে <b>“চিহ্নিত করো”</b> বাটন চাপলে প্রশ্নটি মার্ক হয়ে থাকে, পরে সহজে ফিরে এসে দেখতে পারবে।',
    en:'Tap <b>“Mark”</b> on a tough question to flag it and come back to it later.'},
   {id:'premium',kw:/প্রিমিয়াম|premium|ফ্রিতে|share|শেয়ার|১০ জন|স্মার্টফোন|পুরস্কার|prize|reward|জিতে/i,
    bn:'<b>MCQBook Premium</b>: ১০ জন বন্ধুকে শেয়ার করে তারা জয়েন করলে <b>৩০ দিন ফ্রি প্রিমিয়াম</b> পাবে। প্রিমিয়াম নিতে আগে লগইন/সাইন আপ করতে হয় (কোড তোমার ইমেইলের সাথে যুক্ত থাকে)। প্রিমিয়ামে <b>CQ প্রশ্ন</b> ও <b>লেজেন্ড পুরস্কার পোর্টাল</b> আনলক হয়।',
    en:'<b>Premium</b>: share with 10 friends and when they join you get <b>30 days free</b>. Log in first (the code is tied to your email). Premium unlocks CQ and the Legend prize portal.',acts:['premium','login']},
   {id:'cq',kw:/\bcq\b|সৃজনশীল|creative/i,
    bn:'<b>CQ সৃজনশীল প্রশ্ন</b> শুধু প্রিমিয়াম মেম্বারদের জন্য। ১০ জন বন্ধুকে শেয়ার করে ফ্রিতে আনলক করা যায়।',
    en:'<b>CQ</b> (creative questions) are for Premium members; unlock free by sharing with 10 friends.',acts:['cq','premium']},
   {id:'legend',kw:/লেজেন্ড|legend|topper|পোর্টাল|portal|টোকেন|token/i,
    bn:'<b>লেজেন্ড পুরস্কার পোর্টাল</b> প্রিমিয়াম মেম্বারদের জন্য। MCQ-তে ভালো করলে পুরস্কারের সুযোগ আছে।',
    en:'The <b>Legend prize portal</b> is for Premium members.',acts:['topper','premium']},
   {id:'install',kw:/অ্যাপ|app|ইনস্টল|install|apk|ডাউনলোড|download|ফোনে|android|ios|iphone/i,
    bn:'<b>অ্যাপ নেওয়ার নিয়ম</b>:<ul><li>উপরের <b>“অ্যাপ ইনস্টল”</b> বাটন চাপো → Install</li><li>বিকল্প: <b>APK ডাউনলোড</b> (প্রায় ৬.৯ MB), Android-এ</li><li>iPhone-এ Safari-র Share → <b>Add to Home Screen</b></li></ul>',
    en:'<b>Get the app</b>: tap “Install app” at the top, or download the APK (~6.9 MB) on Android. On iPhone use Safari → Share → Add to Home Screen.',acts:['install']},
   {id:'subjects',kw:/বিষয়|subject|কোন কোন|কী কী আছে|what.*(have|available)|সিলেবাস|syllabus/i,
    bn:'এখন যেসব বিষয় আছে: বাংলা ১ম ও দ্বিতীয় পত্র, সাধারণ গণিত, উচ্চতর গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, আইসিটি, বাংলাদেশ ও বিশ্বপরিচয়, ইসলাম ও নৈতিক শিক্ষা, হিসাববিজ্ঞান, ফিন্যান্স ও ব্যাংকিং। <b>ব্যবসায় উদ্যোগ</b> শীঘ্রই আসছে।',
    en:'Subjects: Bangla 1st & 2nd, General & Higher Maths, Physics, Chemistry, Biology, ICT, BGS, Islam & Moral Education, Accounting, Finance & Banking, Geography & Environment, General Science, Economics. Business Entrepreneurship is coming soon.',acts:['learn']},
   {id:'free',kw:/ফ্রি কি|free|টাকা|price|মূল্য|cost|পেইড|paid/i,
    bn:'MCQBook-এ বোর্ড প্রশ্ন, অধ্যায়ভিত্তিক সেট, মক টেস্ট ও কুইক প্র্যাকটিস <b>সম্পূর্ণ ফ্রি</b>। শুধু CQ ও লেজেন্ড পোর্টালের জন্য প্রিমিয়াম লাগে, যা শেয়ার করে ফ্রিতেও পাওয়া যায়।',
    en:'Board questions, chapter sets, mock tests and quick practice are <b>completely free</b>. Only CQ and the Legend portal need Premium (also free via sharing).',acts:['premium']},
   {id:'login',kw:/লগইন|login|সাইন আপ|sign ?up|অ্যাকাউন্ট|account|পাসওয়ার্ড|password/i,
    bn:'লগইন ছাড়াই প্র্যাকটিস করা যায় (অতিথি মোড)। অ্যাকাউন্ট খুললে প্রিমিয়াম ও রিপোর্ট নিরাপদে তোমার ইমেইলের সাথে সেভ থাকে।',
    en:'You can practise without logging in (guest mode). An account keeps Premium and your report safely tied to your email.',acts:['login']},
   {id:'theme',kw:/ডার্ক|dark|থিম|theme|সাউন্ড|sound|আওয়াজ|mute|লাইট/i,
    bn:'উপরের ডানদিকে <b>চাঁদ/সূর্য</b> বাটনে ডার্ক ও লাইট থিম বদলানো যায়। পাশের <b>স্পিকার</b> বাটনে ক্লিক সাউন্ড অন/অফ করা যায়।',
    en:'Use the moon/sun button (top right) for dark/light theme and the speaker button to turn click sounds on/off.'},
   {id:'founder',kw:/ইশান|ishan|প্রতিষ্ঠাতা|founder|কে বানিয়েছে|কান্ডারি|kallaiya|কল্লাইয়া|যোগাযোগ|contact|instagram|ইনস্টাগ্রাম|ফলো/i,
    bn:'MCQBook-এর প্রতিষ্ঠাতা <b>Md. Masnur Islam Ishan</b>, Software Engineer ও Kallaiya-র CEO। আমি তাঁর নামে তৈরি ইশান অ্যাসিস্ট্যান্ট, সাইটের গাইড বট। যোগাযোগ ও আপডেটের জন্য Instagram-এ ফলো করতে পারো।',
    en:'MCQBook was founded by <b>Md. Masnur Islam Ishan</b>. I’m the Ishan Assistant, the site’s guide bot. Follow on Instagram for updates.',acts:['founder','install']},
   {id:'start',kw:/কীভাবে শুরু|how to start|শুরু করব|start|কোথা থেকে|প্রথমে|beginner|নতুন/i,
    bn:'শুরু করার সহজ পথ:<ol><li><b>বিষয় বেছে নাও</b></li><li>প্রথমে <b>অধ্যায়ভিত্তিক সেট</b>-এ অনুশীলন করো</li><li>তারপর <b>বোর্ড প্রশ্ন</b> সমাধান করো</li><li>শেষে <b>মক টেস্ট</b> দিয়ে নিজেকে যাচাই করো</li><li><b>রিপোর্ট</b> দেখে দুর্বল জায়গা ঠিক করো</li></ol>',
    en:'Easy path: pick a subject → chapter sets → board questions → mock test → check your report and fix weak spots.',acts:['learn','phyChap']}
  ];
  var CHIPS=[['বোর্ড প্রশ্ন কীভাবে দেব?','board'],['অধ্যায়ভিত্তিক প্র্যাকটিস','chap'],['মক টেস্ট কী?','mock'],['কীভাবে শুরু করব?','start'],['প্রিমিয়াম ফ্রিতে কীভাবে?','premium'],['অ্যাপ ইনস্টল','install'],['কোন কোন বিষয় আছে?','subjects']];

  /* ---------- UI ---------- */
  var AV='<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="iaG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#6366f1"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs><circle cx="24" cy="24" r="23" fill="url(#iaG)"/><ellipse cx="18" cy="9" rx="20" ry="10" fill="#fff" opacity=".22"/><rect x="11" y="15" width="26" height="20" rx="9" fill="#fff"/><circle cx="19" cy="25" r="3" fill="#4f46e5"/><circle cx="29" cy="25" r="3" fill="#4f46e5"/><path d="M20 31q4 3 8 0" stroke="#ec4899" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M24 15V9" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="8" r="2.6" fill="#fbbf24"/></svg>';
  var root=d.createElement('div');root.id='ia';
  root.innerHTML='<button class="ia-fab" type="button" aria-label="ইশান অ্যাসিস্ট্যান্ট খোলো"><span class="ia-av">'+AV+'</span><span class="ia-dot"></span></button>'+
   '<div class="ia-tip" role="status">👋 কোনো সাহায্য লাগবে? <b>ইশান অ্যাসিস্ট্যান্ট</b></div>'+
   '<section class="ia-pn" role="dialog" aria-label="ইশান অ্যাসিস্ট্যান্ট" aria-hidden="true">'+
   '<header><span class="ia-av ia-av2">'+AV+'</span><div><b>ইশান অ্যাসিস্ট্যান্ট</b><small><i></i> অনলাইন · MCQBook গাইড</small></div><button class="ia-x" type="button" aria-label="বন্ধ করো">×</button></header>'+
   '<div class="ia-log" aria-live="polite"></div><div class="ia-chips"></div>'+
   '<form class="ia-f"><input type="text" placeholder="যেমন: পদার্থবিজ্ঞান বোর্ড প্রশ্ন…" aria-label="প্রশ্ন লেখো" autocomplete="off"><button type="submit" aria-label="পাঠাও"><svg viewBox="0 0 24 24"><path d="M3 11.5 21 3l-8.5 18-2-7.5z" fill="currentColor"/></svg></button></form></section>';
  d.body.appendChild(root);
  var fab=root.querySelector('.ia-fab'),pn=root.querySelector('.ia-pn'),log=root.querySelector('.ia-log'),chips=root.querySelector('.ia-chips'),
      form=root.querySelector('.ia-f'),inp=form.querySelector('input'),tip=root.querySelector('.ia-tip');
  var opened=false,seen=false;try{seen=localStorage.getItem('mcqb_ia')==='1'}catch(e){}
  function snd(n){try{window.mcqSound&&window.mcqSound(n)}catch(e){}}
  function scroll(){log.scrollTop=log.scrollHeight}
  function isMobile(){return window.innerWidth<860}
  function open(){
    pn.classList.add('on');pn.setAttribute('aria-hidden','false');root.classList.add('open');tip.classList.remove('show');
    try{localStorage.setItem('mcqb_ia','1')}catch(e){}
    if(!opened){opened=true;greet()}setTimeout(function(){if(!isMobile())inp.focus()},250);
  }
  function close(){pn.classList.remove('on');pn.setAttribute('aria-hidden','true');root.classList.remove('open')}
  fab.onclick=function(){pn.classList.contains('on')?close():open()};
  root.querySelector('.ia-x').onclick=close;
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&pn.classList.contains('on'))close()});

  function bubble(html,me){
    var m=d.createElement('div');m.className='ia-m '+(me?'me':'bot');
    if(me)m.textContent=html;else m.innerHTML=html;log.appendChild(m);scroll();return m;
  }
  function addActs(msg,keys,extra){
    var box=d.createElement('div');box.className='ia-acts';
    (extra||[]).concat((keys||[]).map(act)).forEach(function(a){
      var b=d.createElement('button');b.type='button';b.textContent=a.label;
      b.onclick=function(){a.fn();bubble('ঠিক আছে, খুলে দিচ্ছি ✅');if(isMobile())setTimeout(close,500)};box.appendChild(b)});
    if(box.children.length){msg.appendChild(box);scroll()}
  }
  function typing(cb){
    var t=d.createElement('div');t.className='ia-m bot ia-t';t.innerHTML='<i></i><i></i><i></i>';log.appendChild(t);scroll();
    setTimeout(function(){t.remove();cb()},420+Math.random()*320);
  }
  function renderChips(list){
    chips.innerHTML='';
    list.forEach(function(c){var b=d.createElement('button');b.type='button';b.textContent=c[0];b.onclick=function(){ask(c[0],c[1])};chips.appendChild(b)});
  }
  function greet(){
    typing(function(){
      var m=bubble('আসসালামু আলাইকুম! আমি <b>ইশান অ্যাসিস্ট্যান্ট</b> 👋<br>MCQBook-এর সব ফিচার, বোর্ড প্রশ্ন, অধ্যায়ভিত্তিক সেট, মক টেস্ট সবকিছু বুঝিয়ে দেব, আর দরকারে সরাসরি পেজটাও খুলে দেব। নিচ থেকে বেছে নাও বা নিজের প্রশ্ন লেখো।');
      renderChips(CHIPS);
    });
  }
  function detect(q){
    var s=null,m=null;
    SUBJ.forEach(function(x){if(!s&&x[1].test(q))s=x});
    MODES.forEach(function(x){if(!m&&x[1].test(q))m=x});
    return {s:s,m:m};
  }
  function ask(q,forcedId){
    bubble(q,true);inp.value='';snd('tick');
    var en=!/[ঀ-৿]/.test(q)&&/[a-z]/i.test(q);
    typing(function(){
      var det=detect(q),kb=null;
      if(forcedId)kb=KB.filter(function(k){return k.id===forcedId})[0];
      /* subject + mode => offer to open directly */
      if(!kb&&det.s&&det.m){
        var s=det.s,m=det.m;
        var msg=bubble(en?('Want to open <b>'+s[0]+'</b> → <b>'+m[2]+'</b>? Tap below.'):('<b>'+s[2]+'</b> এর <b>'+m[2]+'</b> খুলতে চাও? নিচের বাটন চাপো, আমি সরাসরি খুলে দিচ্ছি।'));
        addActs(msg,[],[{label:'🚀 '+s[2]+' · '+m[2]+' খোলো',fn:function(){openLearn(s[0],m[0])}}]);
        var base=KB.filter(function(k){return k.id===(m[0]==='board'?'board':m[0]==='chap'?'chap':m[0])})[0];
        if(base)bubble(en?base.en:base.bn);return;
      }
      if(!kb){var best=0;KB.forEach(function(k){var sc=(q.match(new RegExp(k.kw.source,'gi'))||[]).length;if(sc>best){best=sc;kb=k}})}
      if(!kb&&det.s){
        var s2=det.s;var m2=bubble(en?('<b>'+s2[0]+'</b> is available. Which type of practice do you want?'):('<b>'+s2[2]+'</b> আছে ✅ কোন ধরনের প্র্যাকটিস চাও?'));
        addActs(m2,[],MODES.map(function(x){return {label:x[2],fn:function(){openLearn(s2[0],x[0])}}}));return;
      }
      if(!kb){
        var f=bubble(en?'That’s outside what I can answer here. For <b>explanations</b> and answers to <b>any other question</b>, unlock <b>Premium</b> ⭐':'এই প্রশ্নটা আমার ফ্রি গাইডের বাইরে 🙏 <b>ব্যাখ্যা</b> এবং <b>অন্য যেকোনো প্রশ্নের উত্তর</b> পেতে <b>প্রিমিয়াম আনলক</b> করো ⭐');
        addActs(f,['premium']);
        renderChips(CHIPS);return;
      }
      var bm=bubble(en?kb.en:kb.bn);
      if(det.s&&(kb.id==='board'||kb.id==='chap'||kb.id==='mock'||kb.id==='quick'||kb.id==='topic')){
        var md=kb.id,sj=det.s;addActs(bm,[],[{label:'🚀 '+sj[2]+' · '+MODES.filter(function(x){return x[0]===md})[0][2]+' খোলো',fn:function(){openLearn(sj[0],md)}}]);
      }else addActs(bm,kb.acts);
      snd('card');
    });
  }
  form.addEventListener('submit',function(e){e.preventDefault();var q=inp.value.trim();if(q)ask(q)});

  /* hello / thanks small talk */
  var rawAsk=ask;ask=function(q,id){
    if(!id&&/^(hi|hello|hey|হাই|হ্যালো|সালাম|assalam|আসসালামু)/i.test(q.trim())){bubble(q,true);inp.value='';return typing(function(){bubble('ওয়ালাইকুম আসসালাম! 😊 আজ কী শিখতে চাও? বোর্ড প্রশ্ন, অধ্যায়ভিত্তিক সেট বা মক টেস্ট, বলো কোনটা খুলে দিই।');renderChips(CHIPS)})}
    if(!id&&/ধন্যবাদ|thank|thanks|শুকরিয়া|জাযাক/i.test(q)){bubble(q,true);inp.value='';return typing(function(){bubble('আপনাকেও ধন্যবাদ! 💜 ভালো করে পড়ো, পরীক্ষায় আত্মবিশ্বাস নিয়ে যাও। আরও কিছু জানতে চাইলে লেখো।')})}
    return rawAsk(q,id);
  };

  /* hide the floating button on the quiz screen (it would cover the submit bar) */
  function sync(){var q=!!d.querySelector('.mopts');root.classList.toggle('quiz',q)}
  new MutationObserver(sync).observe(d.getElementById('app')||d.body,{childList:true,subtree:true});window.addEventListener('hashchange',sync);sync();
  if(!seen)setTimeout(function(){if(!pn.classList.contains('on'))tip.classList.add('show');setTimeout(function(){tip.classList.remove('show')},7000)},4500);
})();
