(function(){
/* hand-drawn doodles: white/currentColor lines, wobbled by an SVG turbulence filter */
var S='fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"';
function T(x,y,s,txt,a){return '<text x="'+x+'" y="'+y+'" font-size="'+s+'" fill="currentColor" stroke="none" text-anchor="'+(a||'middle')+'" font-family="Caveat,Kalam,cursive" font-weight="700">'+txt+'</text>'}
var D={
real:'<path d="M10 78H110M104 72L111 78 104 84M16 72L9 78 16 84"/><path d="M30 71V85M50 71V85M70 71V85M90 71V85"/><circle cx="70" cy="78" r="5"/>'+T(60,50,46,'ℝ'),
sets:'<circle cx="42" cy="60" r="30"/><circle cx="80" cy="60" r="30"/>'+T(30,66,24,'A')+T(92,66,24,'B')+T(61,66,22,'∪'),
sq:'<rect x="18" y="18" width="84" height="84"/><path d="M64 18V102M18 64H102"/>'+T(41,50,22,'a²')+T(83,92,22,'b²')+T(83,50,20,'ab')+T(41,92,20,'ab'),
log:'<path d="M14 14V104H108"/><path d="M22 100C30 50 55 34 108 26"/>'+T(80,86,34,'log'),
par:'<path d="M14 14V104M14 90H108"/><path d="M28 18C36 130 82 130 100 18" transform="translate(0,-4)"/>'+T(88,100,30,'x²'),
ang:'<path d="M16 98H106M16 98L98 34"/><path d="M52 98A36 36 0 0 0 44 76"/>'+T(62,88,28,'θ'),
tri:'<path d="M60 18L106 100H14Z"/><path d="M60 18V100" stroke-dasharray="3 7"/><path d="M52 100V92H60"/>'+T(78,78,22,'h'),
circ:'<circle cx="60" cy="60" r="40"/><path d="M60 60L92 36"/><circle cx="60" cy="60" r="3.5"/>'+T(80,60,26,'r'),
sin:'<path d="M10 60H110M14 14V106"/><path d="M14 60C28 6 46 6 60 60S92 114 108 60"/>'+T(28,100,28,'sin'),
vec:'<path d="M14 14V104H108"/><path d="M24 92L92 30"/><path d="M80 28L94 28 92 42"/><circle cx="24" cy="92" r="5"/><circle cx="92" cy="30" r="5"/>',
ratio:'<rect x="14" y="30" width="38" height="20"/><rect x="14" y="62" width="82" height="20"/>'+T(33,46,20,'a')+T(55,78,20,'b')+T(86,44,34,':'),
lines:'<path d="M14 14V104H108"/><path d="M22 34L100 90M22 92L100 34"/><circle cx="61" cy="62" r="6"/>'+T(94,28,22,'x+y'),
sigma:'<path d="M86 22H36L66 60 36 98H88"/><path d="M92 22V32M92 98V88"/>',
simil:'<path d="M12 100H46L29 66Z"/><path d="M58 100H108L83 44Z"/><path d="M12 100H46" stroke-dasharray="1 7" transform="translate(0,6)"/>',
root:'<path d="M14 66L26 58 42 98 66 20H106"/>'+T(86,66,32,'s'),
pir:'<circle cx="60" cy="60" r="40"/>'+T(60,70,38,'πr²'),
bars:'<path d="M12 104H108"/><rect x="20" y="62" width="16" height="42"/><rect x="42" y="36" width="16" height="68"/><rect x="64" y="52" width="16" height="52"/><rect x="86" y="24" width="16" height="80"/><path d="M12 64H108" stroke-dasharray="2 8"/>',
atom:'<ellipse cx="60" cy="60" rx="46" ry="17"/><ellipse cx="60" cy="60" rx="46" ry="17" transform="rotate(60 60 60)"/><ellipse cx="60" cy="60" rx="46" ry="17" transform="rotate(120 60 60)"/><circle cx="60" cy="60" r="6" fill="currentColor"/>',
pi:'<path d="M18 38H102M42 38C40 62 38 82 30 98M80 38C80 62 82 82 92 98"/>'
};
var MAP={'ℝ':'real','∪':'sets','(a+b)²':'sq','log':'log','x²':'par','∠':'ang','△':'tri','○':'circ','sin':'sin','↗':'vec','a:b':'ratio','x+y':'lines','Σ':'sigma','∼':'simil','√s':'root','πr²':'pir','x̄':'bars'};
function svg(k,rough){return '<svg viewBox="0 0 120 120" aria-hidden="true" '+S+(rough===false?'':' filter="url(#fxr)"')+'>'+D[k]+'</svg>'}
function hero(){return '<svg viewBox="0 0 260 120" aria-hidden="true" '+S+' filter="url(#fxr)"><text x="6" y="58" font-size="46" fill="currentColor" stroke="none" font-family="Caveat,Kalam,cursive" font-weight="700">a² + b² = c²</text><path d="M6 76C40 68 70 86 110 76S180 70 250 78"/><path d="M196 110L246 96 254 104 204 118Z"/><path d="M246 96L254 104"/></svg>'}
function deco(){
 document.querySelectorAll('.mf-g:not([data-fx])').forEach(function(e){var k=MAP[e.textContent.trim()];e.setAttribute('data-fx','1');if(k)e.innerHTML=svg(k)});
 document.querySelectorAll('.fm-sig:not([data-fx])').forEach(function(e){e.setAttribute('data-fx','1');e.innerHTML=hero()});
 document.querySelectorAll('.fm-hs:not([data-fx])').forEach(function(e){e.setAttribute('data-fx','1');e.innerHTML=svg('sigma')});
 document.querySelectorAll('.fx-ic:not([data-fx]),.fs-i[data-ic]:not([data-fx])').forEach(function(e){var k=e.getAttribute('data-ic');e.setAttribute('data-fx','1');if(D[k])e.innerHTML=svg(k)});
}
if(!document.getElementById('fxr-def'))document.body.insertAdjacentHTML('beforeend','<svg id="fxr-def" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><filter id="fxr" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.2"/></filter></svg>');
var q=0;new MutationObserver(function(){if(q)return;q=requestAnimationFrame(function(){q=0;deco()})}).observe(document.body,{childList:true,subtree:true});
deco();
})();
