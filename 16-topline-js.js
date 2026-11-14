(function(){
function I(p){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>'}
var L=[['#/learn','বোর্ড প্রশ্ন',''],['#/learn','মডেল টেস্ট',''],['#/founder','প্রতিষ্ঠাতা','']];
var bar=document.createElement('nav');bar.id='topline';bar.setAttribute('aria-label','দ্রুত মেনু');
var sc=document.createElement('div');sc.className='tl-s';
L.forEach(function(x){var a=document.createElement('a');a.href=x[0];a.innerHTML=x[2]+'<span>'+x[1]+'</span>';if(x[0]==='#/premium')a.className='pro';sc.appendChild(a)});
var b=document.createElement('button');b.type='button';b.className='ins';b.innerHTML=I('<path d="M12 3v12M7 11l5 5 5-5M5 21h14"/>')+'<span>অ্যাপ ইনস্টল</span>';
b.onclick=function(){var t=document.querySelector('.apq-ctl,#app .hx-app,.apq-main');if(t)t.click()};
sc.insertBefore(b,sc.firstChild);bar.appendChild(sc);
function mark(){var h=(location.hash||'#/home').split('?')[0];[].forEach.call(sc.querySelectorAll('a'),function(a){var hr=a.getAttribute('href'),on=hr===h&&hr!=='#/learn';a.classList.toggle('on',on&&!a.classList.contains('pro'));if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
function go(){var app=document.querySelector('.app');if(!app||document.getElementById('topline'))return;app.parentNode.insertBefore(bar,app);mark()}
addEventListener('hashchange',mark);
if(document.body)go();else addEventListener('DOMContentLoaded',go);
})();
