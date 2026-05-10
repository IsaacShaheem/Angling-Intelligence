import{c as i}from"./Navbar-5yrZcz61.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],H=i("arrow-left",f);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}],["path",{d:"M15.947 12.65a4 4 0 0 0-5.925-4.128",key:"dpwdj0"}],["path",{d:"M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z",key:"s09mg5"}]],U=i("cloud-sun",l);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",key:"15baut"}],["path",{d:"M18 12v.5",key:"18hhni"}],["path",{d:"M16 17.93a9.77 9.77 0 0 1 0-11.86",key:"16dt7o"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",key:"l9di03"}],["path",{d:"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",key:"1kjonw"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",key:"1zlm23"}]],E=i("fish",g);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]],I=i("gauge",h);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",key:"nnexq3"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",key:"mt58a7"}]],O=i("leaf",$);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],R=i("loader-circle",k);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]],K=i("navigation",A);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",key:"17jzev"}]],Z=i("thermometer",C);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]],q=i("wind",M),_="";async function B(t){const n=await m("/api/nearby-waters",{method:"POST",body:JSON.stringify({location:(t==null?void 0:t.trim())||"Guelph, ON"})});return b(n,t)}async function D(t){const n=await m(`/api/water/${encodeURIComponent(t)}`);return N(n)}async function m(t,n={}){const e=await fetch(`${_}${t}`,{...n,headers:{"Content-Type":"application/json",...n.headers}});let r=null;try{r=await e.json()}catch{r=null}if(!e.ok){const o=(r==null?void 0:r.error)||(r==null?void 0:r.details)||"Unable to reach fishing intelligence right now.";throw new Error(o)}return r}function b(t,n){const e=p(t==null?void 0:t.weather);return{...t,location:v(t==null?void 0:t.location,n),weather:e,waters:Array.isArray(t==null?void 0:t.waters)?t.waters.map(r=>y(r)):[]}}function N(t){const n=y(t==null?void 0:t.water);return{...t,water:n,weather:p(t==null?void 0:t.weather),speciesScores:Array.isArray(t==null?void 0:t.speciesScores)?t.speciesScores.map(e=>W(e)):[]}}function y(t={}){var n;return{...t,id:t.id||"",name:t.name||"Unknown water",type:t.type||"Water",region:t.region||"Ontario",distanceKm:typeof t.distanceKm=="number"?t.distanceKm:null,pressureLevel:t.pressureLevel||"medium",accessibility:t.accessibility||"medium",speciesCount:t.speciesCount??((n=t.species)==null?void 0:n.length)??0,bestWindow:t.bestWindow||x(),shoreline:t.shoreline||S(t)}}function W(t={}){const n=Array.isArray(t.reasons)?t.reasons:[],e=Array.isArray(t.methods)?t.methods:[],r=t.species||"This species",o=typeof t.score=="number"?t.score:0,c=t.difficulty||"Unknown";return{...t,species:r,score:o,difficulty:c,reasons:n,methods:e,shortExplanation:t.shortExplanation||`${r} is rated ${o}/100 today. ${n[0]||"Use current conditions and local structure to choose your presentation."}`,aiTip:t.aiTip||`Start with the strongest nearby structure and adjust speed based on the ${c.toLowerCase()} difficulty rating.`}}function p(t={}){var c,s,a;const n=d((c=t==null?void 0:t.temperature)==null?void 0:c.value),e=d((a=(s=t==null?void 0:t.wind)==null?void 0:s.speed)==null?void 0:a.value),r=(t==null?void 0:t.description)||"Current conditions",o=z((t==null?void 0:t.season)||L(t==null?void 0:t.time));return{...t,condition:r,tempC:n??"--",windKph:e??"--",season:o,insight:(t==null?void 0:t.insight)||T({condition:r,tempC:n,windKph:e,weather:t})}}function v(t,n){if(typeof t=="string")return t;const e=t==null?void 0:t.name,r=t==null?void 0:t.region;return e&&r?`${e}, ${r}`:e||(n==null?void 0:n.trim())||(t==null?void 0:t.search)||"Ontario"}function S(t={}){const e=(Array.isArray(t.tags)?t.tags:[]).slice(0,3).map(r=>r.replaceAll("-"," ")).join(", ");return e?`${t.type||"Water"} structure with ${e}.`:`${t.type||"Water"} structure near ${t.region||"this region"}.`}function T({condition:t,tempC:n,windKph:e,weather:r}){var u;const o=(u=r==null?void 0:r.cloudCover)==null?void 0:u.value,c=typeof n=="number"?`${n}C`:"current temperatures",s=typeof e=="number"?`${e} km/h wind`:"the current wind",a=typeof o=="number"?` and ${o}% cloud cover`:"";return`${t}, ${c}, ${s}${a} should help shape lure speed, depth, and shoreline choice today.`}function x(){const t=new Date().getHours();return t<11?"Morning":t<17?"Afternoon":t<21?"Evening":"Tomorrow morning"}function L(t){const e=(t?new Date(t):new Date).getMonth()+1;return e===12||e<=2?"winter":e<=5?"spring":e<=8?"summer":"fall"}function d(t){return typeof t=="number"?Math.round(t):null}function z(t){return t?t.charAt(0).toUpperCase()+t.slice(1):"Current"}export{H as A,U as C,E as F,I as G,O as L,K as N,Z as T,q as W,R as a,D as b,B as f};
