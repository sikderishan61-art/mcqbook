(function(){
 if(typeof IC==='undefined')return;
 var F='fill="currentColor" fill-opacity=".16" stroke="none"';
 var HOME='M4 10.8 12 4l8 6.8V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z';
 var CROWN='M4 8.5 8 12l4-6.5 4 6.5 4-3.5-1.6 9.5H5.6z';
 var SHIELD='M12 3.5 19 6v5.5c0 4.2-2.9 7.3-7 9-4.1-1.7-7-4.8-7-9V6z';
 IC.home='<path d="'+HOME+'" '+F+'/><path d="'+HOME+'"/><path d="m8.8 13.4 2.2 2.3 4.2-4.6"/>';
 IC.learn='<rect x="3.5" y="3.5" width="13.5" height="17" rx="2.4" '+F+'/><rect x="3.5" y="3.5" width="13.5" height="17" rx="2.4"/><circle cx="7.8" cy="8" r="1.3"/><path d="M11 8h3.2"/><circle class="ac" cx="7.8" cy="12.3" r="1.3"/><path d="M11 12.3h3.2"/><circle cx="7.8" cy="16.6" r="1.3"/><path d="M11 16.6h2"/><path d="m15.2 20.3.7-2.8 4.5-4.5 2.1 2.1-4.5 4.5z"/>';
 IC.report='<circle cx="12" cy="12" r="8.5" '+F+'/><path d="M20.5 12A8.5 8.5 0 1 1 12 3.5"/><path d="m8.4 13.4 2.6-2.8 2 2 3.4-4"/>';
 IC.premium='<path d="'+CROWN+'" '+F+'/><path d="'+CROWN+'"/><path d="M6.2 21h11.6"/><circle class="ac" cx="12" cy="13" r="1.1"/>';
 IC.founder='<path d="'+SHIELD+'" '+F+'/><path d="'+SHIELD+'"/><circle cx="12" cy="10" r="2.3"/><path d="M7.9 16.3c.8-1.7 2.2-2.5 4.1-2.5s3.3.8 4.1 2.5"/>';
 IC.setup='<path d="M6 4v16M12 4v16M18 4v16"/><circle class="ac" cx="6" cy="14" r="2.1"/><circle class="ac" cx="12" cy="8" r="2.1"/><circle class="ac" cx="18" cy="15.5" r="2.1"/>';
 try{render()}catch(e){}
})();
