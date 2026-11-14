/* Answer clicks update the DOM in place: no full re-render, no scroll jump, no replayed animations */
(function(){
 var app=document.getElementById('app');if(!app)return;
 var BNs='0123456789';function bn(s){return String(s).replace(/[0-9]/g,function(d){return BNs.charAt(+d)})}
 function ctx(a){
  if(a==='xans'||a==='xclr'||a==='xfl')return {S:function(){return BX},p:'xq',k:'x'};
  if(a==='mka'||a==='mkclr'||a==='mkf')return {S:function(){return MK},p:'mq',k:'mk'};
  return null}
 function sync(c,S,i){
  var card=document.getElementById(c.p+i);if(!card)return false;
  var opts=card.querySelectorAll('.mopt'),cur=S.ans[i];
  for(var j=0;j<opts.length;j++){var on=cur===j;opts[j].classList.toggle('sel',on);opts[j].setAttribute('aria-pressed',on)}
  var clr=card.querySelector('.clr'),row=clr&&clr.parentNode;
  if(cur!==undefined&&!clr){var d=document.createElement('div');d.className='row';d.style.cssText='justify-content:flex-end;margin-top:.6rem';d.innerHTML="<button class='clr' data-a='"+c.k+(c.k==='x'?'clr':'clr')+"' data-i='"+i+"'>উত্তর মুছে দাও</button>";card.appendChild(d)}
  else if(cur===undefined&&row)row.remove();
  var qn=document.querySelectorAll('.qn button'),b=qn[i];if(b)b.classList.toggle('a',cur!==undefined);
  var n=S.qs?S.qs.length:qn.length,na=Object.keys(S.ans).length,bar=document.querySelector('.mbar');
  if(bar){var u=bar.querySelector('.mu b');if(u)u.textContent=bn(na);var pi=bar.querySelector('.bar i');if(pi)pi.style.width=(100*na/n)+'%'}
  var sub=document.querySelector('.dock .p');if(sub){sub.classList.remove('pulse');if(!S.cf)sub.textContent='জমা দাও'}
  var er=document.querySelector('p.err[role=alert]');if(er)er.textContent='';
  return true}
 document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('[data-a]');if(!t)return;
  var a=t.dataset.a;
  if(a==='qkpick'){e.stopPropagation();var y=scrollY;A.qkpick(t);app.classList.add('nofx');render();scrollTo(0,y);requestAnimationFrame(function(){app.classList.remove('nofx')});return}
  var c=ctx(a);if(!c)return;
  var S=c.S(),i=t.dataset.i!==undefined?+t.dataset.i:S.i;
  if(a==='xans'||a==='mka'){S.cf=0;S.warn='';var j=+t.dataset.j;S.ans[i]=j}
  else if(a==='xclr'||a==='mkclr'){delete S.ans[i];S.cf=0;S.warn=''}
  else{S.fl[i]=!S.fl[i];var card=document.getElementById(c.p+i),f=card&&card.querySelector('.flg');
   if(f){f.classList.toggle('on',!!S.fl[i]);f.setAttribute('aria-pressed',!!S.fl[i]);var tn=null;for(var z=f.childNodes.length-1;z>=0;z--){if(f.childNodes[z].nodeType===3){tn=f.childNodes[z];break}}if(tn)tn.textContent=' '+(S.fl[i]?'চিহ্নিত':'চিহ্নিত করো')}
   var q=document.querySelectorAll('.qn button')[i];if(q)q.classList.toggle('f',!!S.fl[i]);e.stopPropagation();return}
  if(sync(c,S,i)){e.stopPropagation();return}
  var y2=scrollY;app.classList.add('nofx');render();scrollTo(0,y2);requestAnimationFrame(function(){app.classList.remove('nofx')});e.stopPropagation()
 },true);
})();
