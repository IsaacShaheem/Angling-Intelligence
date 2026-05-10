import{r as c,j as a}from"./index-77H4peEF.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),f=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,s)=>s?s.toUpperCase():r.toLowerCase()),l=t=>{const e=f(t);return e.charAt(0).toUpperCase()+e.slice(1)},d=(...t)=>t.filter((e,r,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===r).join(" ").trim(),b=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=c.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:n="",children:o,iconNode:p,...i},h)=>c.createElement("svg",{ref:h,...g,width:e,height:e,stroke:t,strokeWidth:s?Number(r)*24/Number(e):r,className:d("lucide",n),...!o&&!b(i)&&{"aria-hidden":"true"},...i},[...p.map(([x,u])=>c.createElement(x,u)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(t,e)=>{const r=c.forwardRef(({className:s,...n},o)=>c.createElement(C,{ref:o,iconNode:e,className:d(`lucide-${w(l(t))}`,`lucide-${t}`,s),...n}));return r.displayName=l(t),r};/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],A=m("map-pin",N);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]],y=m("waves",k);function j(){return a.jsx("header",{className:"fixed left-0 right-0 top-0 z-40",children:a.jsxs("nav",{className:"mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8",children:[a.jsxs("a",{href:"#top",className:"flex items-center gap-3 text-mist",children:[a.jsx("span",{className:"grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 shadow-sm backdrop-blur-sm",children:a.jsx(y,{className:"h-5 w-5 text-cyan-200"})}),a.jsx("span",{className:"text-sm font-semibold tracking-[0.22em] text-white/80",children:"ANGLING AI"})]}),a.jsx("div",{className:"hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-white/70 shadow-sm backdrop-blur-sm sm:flex",children:"Ontario waters"})]})})}const L=c.memo(j);export{A as M,L as N,y as W,m as c};
