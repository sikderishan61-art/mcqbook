/* Show numbers as 0-9 everywhere (also inside question text); skip scripts/styles/inputs */
(function(){
 var M={'\u09E6':'0','\u09E7':'1','\u09E8':'2','\u09E9':'3','\u09EA':'4','\u09EB':'5','\u09EC':'6','\u09ED':'7','\u09EE':'8','\u09EF':'9'},R=/[\u09E6-\u09EF]/g;
 function f(c){return M[c]}
 function conv(root){
  if(!root||root.nodeType===8)return;
  if(root.nodeType===3){if(R.test(root.data)){R.lastIndex=0;root.data=root.data.replace(R,f)}R.lastIndex=0;return}
  if(root.nodeType!==1)return;var t=root.tagName;if(t==='SCRIPT'||t==='STYLE'||t==='TEXTAREA'||t==='INPUT')return;
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode&&n.parentNode.tagName;return(p==='SCRIPT'||p==='STYLE'||p==='TEXTAREA')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),n,L=[];
  while(n=w.nextNode()){R.lastIndex=0;if(R.test(n.data))L.push(n)}R.lastIndex=0;
  for(var i=0;i<L.length;i++)L[i].data=L[i].data.replace(R,f);
  if(root.title&&R.test(root.title)){R.lastIndex=0;root.title=root.title.replace(R,f)}R.lastIndex=0;
 }
 var q=[],raf=0;
 function flush(){raf=0;var a=q;q=[];for(var i=0;i<a.length;i++)if(a[i].isConnected!==false)conv(a[i])}
 new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.type==='characterData'){q.push(m.target)}else for(var j=0;j<m.addedNodes.length;j++)q.push(m.addedNodes[j])}
  if(!raf)raf=requestAnimationFrame(flush)}).observe(document.body,{childList:true,subtree:true,characterData:true});
 conv(document.body);
})();
