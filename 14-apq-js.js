(function(){
/* ====== settings ====== */
var APK_URL='app/mcqbook.apk',APK_NAME='MCQBook.apk',APK_SIZE='৬.৯ MB',
    IG_URL='https://www.instagram.com/mcqbook.online/',   /* <- put your real Instagram link here */
    REPEAT_DAYS=7;                                         /* "browser-e continue" dile koto din por abar dekhabe */
var d=document,ua=navigator.userAgent||'',K='mcqb_apppop';
var isAndroid=/Android/i.test(ua),isIOS=/iPhone|iPad|iPod/i.test(ua);
var K0=0,cap=window.Capacitor,inApp=!!(cap&&(cap.isNativePlatform?cap.isNativePlatform():(cap.platform&&cap.platform!=='web')))||/[?&](noapp|app)=1/.test(location.search);var force=/[?&]showapp=1/.test(location.search);if(force){inApp=false;try{localStorage.removeItem(K)}catch(e){}}
if(inApp)return;                                           /* already inside the MCQBook app (Capacitor) / installed PWA. Instagram & Facebook in-app browsers are NOT treated as the app. */
var get=function(){try{return localStorage.getItem(K)}catch(e){return null}},set=function(v){try{localStorage.setItem(K,v)}catch(e){}};
var ev=function(n){try{window.gtag&&gtag('event',n)}catch(e){}};
var inAppBrowser=/FBAN|FBAV|Instagram|Line\/|; wv\)/i.test(ua);
var ico='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14"/></svg>',
    igi='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
var isStandalone=!!(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
var dp=window.__mcqDP||null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=window.__mcqDP=e});
window.addEventListener('appinstalled',function(){dp=null;set('dl');ev('pwa_installed');var o=d.querySelector('.apq-o');if(o)o.remove();var h=d.querySelector('.apq-hm');if(h)h.remove()});
/* register a tiny service worker so Chrome treats the site as an installable app */
try{if('serviceWorker' in navigator&&location.protocol==='https:')window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}catch(e){}
var ico2='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>';
var pwSteps=isIOS
 ?'<b>iPhone-এ:</b><ol><li>Safari-তে সাইট খোলো।</li><li>নিচের <b>Share</b> বাটন চাপো।</li><li><b>Add to Home Screen</b> চাপো, তারপর <b>Add</b>।</li></ol>'
 :(inAppBrowser
   ?'<b>প্রথমে Chrome-এ খোলো:</b><ol><li>ডান উপরের <b>⋮</b> মেনু চাপো।</li><li><b>Open in Chrome</b> / <b>Open in browser</b> চাপো।</li><li>Chrome-এ এসে আবার <b>ইনস্টল</b> বাটন চাপো।</li></ol>'
   :'<b>Chrome-এ ইনস্টল (২ ক্লিক):</b><ol><li>ডান উপরের <b>⋮ মেনু</b> চাপো।</li><li><b>Install app</b> বা <b>Add to Home screen</b> চাপো।</li><li><b>Install</b> চাপো। হোম স্ক্রিনে MCQBook আইকন চলে আসবে।</li></ol>');
function installPwa(o){
  ev('pwa_install_click');
  if(dp){var p=dp;dp=null;window.__mcqDP=null;p.prompt();if(p.userChoice)p.userChoice.then(function(c){if(c&&c.outcome==='accepted'){set('dl');ev('pwa_accepted')}else{dp=p;window.__mcqDP=p}});return}
  var box=(o||d).querySelector('#apq-pws');
  if(box){box.classList.add('on');return}
  show(true);var o2=d.querySelector('.apq-o'),b2=o2&&o2.querySelector('#apq-pws');if(b2)b2.classList.add('on');
}
function show(force){
  if(d.querySelector('.apq-o'))return;
  var o=d.createElement('div');o.className='apq-o';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-labelledby','apq-t');
  o.innerHTML='<div class="apq-c"><button class="apq-x" type="button" aria-label="বন্ধ করো">×</button>'
   +'<div class="apq-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/></svg></div>'
   +'<h3 id="apq-t">MCQBook অ্যাপ নাও</h3><p>এক ক্লিকে ইনস্টল করো, ফোনেই MCQ প্র্যাকটিস করো — ফ্রি, কোনো সতর্কতা ছাড়াই।</p>'
   +(isStandalone?'<p class="apq-note" style="opacity:.85;font-size:.9rem">অ্যাপ ইতিমধ্যে ইনস্টল করা আছে ✓</p>':'<div class="apq-rec">★ সুপারিশকৃত · সবচেয়ে সহজ · কোনো সতর্কতা নেই</div><button class="apq-b apq-dl apq-main" type="button" id="apq-dl">'+ico2+'<span>অ্যাপ ইনস্টল করো <small>১ ক্লিকে হোম স্ক্রিনে</small></span></button><div class="apq-pws'+((inAppBrowser||isIOS)?' on':'')+'" id="apq-pws">'+pwSteps+'</div>')
   +(isIOS?'':'<a class="apq-b apq-apk" id="apq-apk" href="'+APK_URL+'" download="'+APK_NAME+'">'+ico+'<span>বিকল্প: APK ডাউনলোড <small>('+APK_SIZE+')</small></span></a>')
   +'<div class="apq-st"><b>APK ইনস্টল করার নিয়ম:</b><ol><li>Chrome “ফাইলটি ক্ষতিকর হতে পারে” দেখালে <b>Download anyway</b> চাপো।</li><li>ডাউনলোড শেষে <b>MCQBook.apk</b> ওপেন করো। “Install unknown apps” চাইলে <b>Allow</b> দাও।</li><li>Play Protect সতর্কতা এলে <b>More details → Install anyway</b> চাপো।</li><li><b>Install</b> চাপো, তারপর <b>Open</b>।</li></ol><div style="opacity:.75;font-size:.78rem;margin-top:.4rem">অ্যাপটি এখনো Google Play Store-এ নেই, তাই ফোন এই সতর্কতা দেখায়। সতর্কতা এড়াতে উপরের “অ্যাপ ইনস্টল করো” বাটন ব্যবহার করো।</div></div>'
   +'<button class="apq-b apq-br" type="button" id="apq-br">ব্রাউজারেই চালিয়ে যাও</button>'
   +'<a class="apq-b apq-ig" id="apq-ig" href="'+IG_URL+'" target="_blank" rel="noopener">'+igi+'<span>Instagram-এ ফলো করো</span></a>'
   +'</div>';
  function close(remember){if(remember)set(String(Date.now()));o.remove();d.removeEventListener('keydown',esc);try{prev&&prev.focus&&prev.focus()}catch(e){}}
  function esc(e){if(e.key==='Escape')close(true)}
  var prev=d.activeElement;
  o.querySelector('.apq-x').onclick=function(){close(true)};
  o.querySelector('#apq-br').onclick=function(){close(true)};
  o.addEventListener('click',function(e){if(e.target===o)close(true)});
  d.addEventListener('keydown',esc);
  var ak=o.querySelector('#apq-apk');if(ak)ak.addEventListener('click',function(){o.classList.add('dl');ev('apk_download')});
  var b=o.querySelector('#apq-dl');
  if(b)b.addEventListener('click',function(){installPwa(o)});
  o.querySelector('#apq-ig').addEventListener('click',function(){ev('instagram_follow_click')});
  d.body.appendChild(o);
  try{(b||o.querySelector('#apq-br')).focus({preventScroll:true})}catch(e){}
  ev('app_popup_view');
}
window.mcqbShowApp=show;
function ready(f){d.body?f():d.addEventListener('DOMContentLoaded',f)}
/* small download button in the top-right control bar, so people can reopen the popup later */
ready(function(){
  var n=0,t=setInterval(function(){var c=d.querySelector('.ctl');if(c&&!c.querySelector('.apq-ctl')){var x=d.createElement('button');x.type='button';x.className='apq-ctl';x.title=x.ariaLabel='অ্যাপ ইনস্টল';x.innerHTML=ico2+'<span>অ্যাপ</span>';x.onclick=function(){show(true)};c.insertBefore(x,c.firstChild);clearInterval(t)}else if(++n>40)clearInterval(t)},250);
});
/* home-page banner: re-inserted whenever the home screen is rendered */
var phone='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/></svg>';
function heroBtn(){
  if(isStandalone||!d.querySelector('#app .hx'))return;
  var bn=d.querySelector('#app .pm-ban:not(.mini)');if(!bn||bn.querySelector('.hx-app'))return;
  var a=d.createElement('span');a.className='hx-app';a.setAttribute('role','link');a.tabIndex=0;
  a.innerHTML=ico2+'<span>অ্যাপ ইনস্টল করো, স্মার্টফোন জিতে নাও<small>এক ক্লিকে ফ্রি ইনস্টল</small></span>';
  var go=function(e){e.preventDefault();e.stopPropagation();ev('app_install_card');if(dp)installPwa(null);else{show(true);var o=d.querySelector('.apq-o');if(o)installPwa(o)}};
  a.addEventListener('click',go);a.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')go(e)});
  bn.appendChild(a);
}
function homeBanner(){
  heroBtn();
  var hx=d.querySelector('#app .hx');if(!hx||d.querySelector('.apq-hm'))return;
  var s=d.createElement('section');s.className='apq-hm';s.setAttribute('aria-label','MCQBook অ্যাপ');
  if(isStandalone)return;
  s.innerHTML='<div class="i">'+phone+'</div><div class="t"><b>MCQBook অ্যাপ — ফ্রি ইনস্টল</b><span class="s">এক ক্লিকে ইনস্টল করো, ফোনেই MCQ প্র্যাকটিস করো।</span></div><div class="a">'
   +'<button type="button" class="apq-b apq-dl apq-pwb apq-main" style="cursor:pointer;font-family:inherit">'+ico2+'<span>অ্যাপ ইনস্টল করো <small>১ ক্লিক · ফ্রি</small></span></button>'
   +(isIOS?'':'<a class="apq-b apq-apk apq-apkh" href="'+APK_URL+'" download="'+APK_NAME+'">'+ico+'<span>APK <small>('+APK_SIZE+')</small></span></a>')
   +'<a class="apq-b apq-ig" href="'+IG_URL+'" target="_blank" rel="noopener">'+igi+'<span>Instagram ফলো</span></a></div>';
  var ah=s.querySelector('.apq-apkh');if(ah)ah.addEventListener('click',function(){ev('apk_download_home');show(true);var o=d.querySelector('.apq-o');if(o)o.classList.add('dl')});
  s.querySelector('.apq-ig').addEventListener('click',function(){ev('instagram_follow_click')});
  var pw=s.querySelector('.apq-pwb');if(pw)pw.addEventListener('click',function(){if(dp)installPwa(null);else{show(true);var o=d.querySelector('.apq-o');if(o)installPwa(o)}});
  hx.parentNode.insertBefore(s,hx.nextSibling);
}
ready(function(){var q=0;new MutationObserver(function(){if(q)return;q=requestAnimationFrame(function(){q=0;homeBanner()})}).observe(d.documentElement,{childList:true,subtree:true});homeBanner()});
/* first visit (or after REPEAT_DAYS if they chose "continue on browser") */
var last=get();
if(last==='dl')return;                                      /* already downloaded: don't nag */
if(last&&Date.now()-Number(last)<REPEAT_DAYS*864e5)return;
ready(function(){setTimeout(function(){if(!window.__mcqEntry)show()},800)});
})();
