(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();let l=0,I;const p=new Date;p.getMonth()+1,`${p.getDate()}${p.getHours()}${p.getMinutes()}${p.getSeconds()}`;const L=.002,Y=.011,M=.003,Q=.015,T=.02,_=.03,S=.04,v=.05,D=[{idx:1,lat:52.5215231,lng:13.4106509,mapType:"roadmap"},{idx:2,lat:49.9859891,lng:7.0935337,mapType:"hybrid"},{idx:3,lat:50.940571,lng:6.9624213,mapType:"roadmap"},{idx:4,lat:53.5421631,lng:9.993536,mapType:"hybrid"},{idx:5,lat:52.0284624,lng:13.8943828,mapType:"roadmap"},{idx:6,lat:54.3167353,lng:13.0911634,mapType:"hybrid"},{idx:7,lat:51.1301398,lng:11.4160058,mapType:"roadmap"},{idx:8,lat:50.1018994,lng:7.139526,mapType:"hybrid"},{idx:9,lat:52.8258756,lng:7.6419842,mapType:"roadmap"},{idx:10,lat:51.5604541,lng:14.0600081,mapType:"hybrid"}];function Z(){const e=Math.random()<.5,t=Math.random()*(Q-M)+M;return e?-t:t}function ee(){const e=Math.random()<.5,t=Math.random()*(Y-L)+L;return e?-t:t}function te(){return f.map(e=>({north:e.lat+S,south:e.lat-S,west:e.lng-v,east:e.lng+v}))}function ne(){return f.map(e=>({north:e.lat+T,south:e.lat-T,west:e.lng-_,east:e.lng+_}))}function oe(e){return[{lat:e.north,lng:e.west},{lat:e.north,lng:e.east},{lat:e.south,lng:e.east},{lat:e.south,lng:e.west},{lat:e.north,lng:e.west}]}function ae(e){for(let t=e.length-1;t>0;t--){const o=Math.floor(Math.random()*(t+1));[e[t],e[o]]=[e[o],e[t]]}return e}const P=D.slice(0,2),C=D.slice(2);ae(C);let c=P.concat(C);const f=c.map(e=>({lat:e.lat+ee(),lng:e.lng+Z()}));function le(e){return e==="roadmap"?"hybrid":"roadmap"}I=Math.random()<.5?"A":"B";c=I==="A"?c:c.map(e=>({...e,mapType:le(e.mapType)}));let y,u,m=null,E,b=[];function se(e,t,o,a,n,s,r,d){const k={ts_pano_loaded:e,ts_marker_set:t,index:o,lat:a,lng:n,distance:s,areaknowledge:r,landmark:d};b.push(k)}function de(e,t,o){const a=b.find(n=>n.index===e);a?(a.areaknowledge=t,a.landmark=o):console.error(`Marker with index ${e} not found.`)}function w(e){const{lat:t,lng:o}=c[l];y=new google.maps.StreetViewPanorama(document.getElementById("map"),{position:{lat:t,lng:o},addressControlOptions:{position:google.maps.ControlPosition.BOTTOM_CENTER},showRoadLabels:!1,scrollwheel:!0,disableDefaultUI:!0,linksControl:!1,clickToGo:!1,keyboardShortcuts:!1}),y.setPov({heading:30,zoom:0,pitch:0}),E=new Date().toISOString(),y.addListener("pano_changed",()=>{E=new Date().toISOString()}),e()}function B(){let e;l<=1?{mapType:e}=P[l]:{mapType:e}=c[l],u=new google.maps.Map(document.getElementById("google-map"),{center:f[l],restriction:{latLngBounds:te()[l],strictBounds:!1},zoom:15,disableDefaultUI:!0,clickableIcons:!1,mapTypeId:e}),u.addListener("click",n=>{ce(n.latLng)}),u.setOptions({gestureHandling:"greedy",zoomControl:!0});const t=ne()[l],o=oe(t);new google.maps.Polyline({path:o,geodesic:!0,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2}).setMap(u)}function ce(e){const t=new Date().toISOString(),{idx:o}=c[l],a=google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(c[l]),e);m&&m.setMap(null),m=new google.maps.Marker({position:e,map:u,title:`Index: ${o}, Time: ${t}`}),l>=2&&se(E,t,o,e.lat(),e.lng(),a," "," ")}function re(){l=(l+1)%c.length,y.setPosition(c[l]),B(),l==1&&(document.getElementById("tutorial-step-4").style.display="none",document.getElementById("tutorial-step-5").style.display="block",document.getElementById("reload-panorama").style.display="block"),l==2&&(document.getElementById("panorama-message").style.display="block",setTimeout(function(){document.getElementById("panorama-message").style.display="none"},4e3),console.log("Message should appear now")),m&&(m.setMap(null),m=null),document.getElementById("reload-panorama").addEventListener("click",()=>{w(()=>{B()})})}function q(){if(!m){console.log("No marker set.");return}ie()}function A(){const e=document.getElementById("map-container"),t=document.getElementById("expand-map-button");e.classList.toggle("expanded"),e.classList.contains("expanded")?(t.innerHTML="&#8600;",document.getElementById("google-map").style.opacity="1.0"):(t.innerHTML="&#8598;",document.getElementById("google-map").style.opacity="0.75"),google.maps.event.trigger(u,"resize")}function F(){document.getElementById("start-message").style.display="none",document.getElementById("map").style.display="block",w(()=>{B()})}function ie(){const e=document.getElementById("area-knowledge-modal");e.style.display="block";const t=document.getElementById("modal-ok-button"),o=document.getElementById("modal-exit-button");t.disabled=!0;const a=document.getElementById("checkbox-yes"),n=document.getElementById("checkbox-no");a.addEventListener("change",()=>O(a,n)),n.addEventListener("change",()=>O(n,a)),o.addEventListener("click",()=>{e.style.display="none",a.checked=!1,n.checked=!1})}function O(e,t){e.checked&&(t.checked=!1);const o=document.getElementById("modal-ok-button");o.disabled=!e.checked&&!t.checked}function N(){const e=document.getElementById("checkbox-yes"),t=document.getElementById("checkbox-no"),o=document.getElementById("landmark-input");if(!e.checked&&!t.checked){alert("Please select an option before proceeding.");return}const a=document.getElementById("area-knowledge-modal");a.style.display="none";const n=e.checked?"yes":"no",s=o.value.trim();let r=c[l].idx;if(l>=2&&de(r,n,s),e.checked=!1,t.checked=!1,o.value="",l===f.length-1){document.getElementById("map").style.display="none",document.getElementById("map-container").style.display="none",document.getElementById("submit-button").style.display="none",document.getElementById("reload-panorama").style.display="none";const d=i=>{const h=document.querySelector(i);return h?h.value:null},k=i=>Array.from(document.querySelectorAll(i)).map(X=>X.value),$=d("#key-input"),V=d("#age-input"),K=d('input[name="select-gender"]:checked'),R=k('input[name="checkboxes-state"]:checked'),z=d('input[name="question-urban-rural"]:checked'),G=d('input[name="question-study-progamme"]:checked'),H=d('input[name="question-study-degree"]:checked'),j=d('input[name="question-gmaps1"]:checked'),U=d('input[name="question-gmaps2"]:checked'),J=d('input[name="question-other-maps"]:checked'),W=d('input[name="question-geoguessr"]:checked'),x={userGroup:I,test_key:$,age:V,gender:K,states:R,urbanRural:z,geoStudy:G,studyDegree:H,gmapsFrequency:j,mapType:U,otherMaps:J,geoGuessr:W,markersData:b};console.log("Form data:",x),fetch("https://your_dns_here.com:3000/saveSurveyData",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(x)}).then(i=>{i.ok?alert("Data saved successfully!"):alert("Failed to save data.")}).catch(i=>{console.error("Error:",i),alert("Error saving data.")}),document.getElementById("finished-message").style.display="block"}else re()}function g(e){document.querySelectorAll(".tutorial-popup").forEach((o,a)=>{o.style.display=a===e?"block":"none"})}function me(){let e=0;g(e),document.getElementById("tutorial-next-1").onclick=()=>{e=1,document.getElementById("map-container").style.display="block",g(e)},document.getElementById("tutorial-next-2").onclick=()=>{e=2,document.getElementById("submit-button").style.display="block",g(e)},document.getElementById("tutorial-next-3").onclick=()=>{e=3,document.getElementById("modal-ok-button").style.display="block",g(e)},document.getElementById("tutorial-finish").onclick=()=>{console.log("Finish clicked"),document.getElementById("tutorial").style.display="none"}}document.getElementById("start-button").onclick=()=>{document.getElementById("start-message").style.display="none",document.getElementById("end-form").style.display="block"};document.getElementById("bt-finish").onclick=()=>{document.getElementById("end-form").style.display="none",document.getElementById("tutorial").style.display="block",F(),me()};document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("submit-button");e?e.addEventListener("click",q):console.error("Submit button not found");const t=document.getElementById("expand-map-button");t?t.addEventListener("click",A):console.error("Expand map button not found");const o=document.getElementById("start-button");o?o.addEventListener("click"):console.error("Start button not found");const a=document.getElementById("bt-finish");a?a.addEventListener("click",F):console.error("Finish button not found");const n=document.getElementById("modal-ok-button");n?n.addEventListener("click",N):console.error("Modal OK button not found")});window.initPano=w;window.addEventListener("keydown",e=>{(e.key==="ArrowUp"||e.key==="ArrowDown"||e.key==="ArrowLeft"||e.key==="ArrowRight"||e.key==="+"||e.key==="="||e.key==="_"||e.key==="-")&&!e.metaKey&&!e.altKey&&!e.ctrlKey&&e.stopPropagation()},{capture:!0});window.addEventListener("load",()=>{document.getElementById("submit-button").addEventListener("click",q),document.getElementById("expand-map-button").addEventListener("click",A),document.getElementById("modal-ok-button").addEventListener("click",N)});