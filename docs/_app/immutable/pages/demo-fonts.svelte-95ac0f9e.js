import{S as K,i as X,s as Z,e as P,t as A,k as V,c as D,a as k,h as O,d as v,m as z,f as J,b as I,g as F,I as u,N as de,O as W,j as Y,H as pe,E as x,G as ie,v as he,q as H,w as ae,x as le,y as ce,o as U,B as ue,n as fe,p as _e,P as me,Q as ee,R as ye}from"../chunks/index-1d60bd4a.js";import{d as ve}from"../chunks/transform-899ca3c0.js";import{_ as T}from"../chunks/preload-helper-c049ca3e.js";class Ee extends Map{constructor(e,s=Te){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:s}}),e!=null)for(const[o,_]of e)this.set(o,_)}get(e){return super.get(te(this,e))}has(e){return super.has(te(this,e))}set(e,s){return super.set(be(this,e),s)}delete(e){return super.delete(ge(this,e))}}function te({_intern:t,_key:e},s){const o=e(s);return t.has(o)?t.get(o):s}function be({_intern:t,_key:e},s){const o=e(s);return t.has(o)?t.get(o):(t.set(o,s),s)}function ge({_intern:t,_key:e},s){const o=e(s);return t.has(o)&&(s=t.get(o),t.delete(o)),s}function Te(t){return t!==null&&typeof t=="object"?t.valueOf():t}function Pe(t){return t}function De(t,...e){return ke(t,Array.from,Pe,e)}function ke(t,e,s,o){return function _(a,p){if(p>=o.length)return s(a);const E=new Ee,h=o[p++];let n=-1;for(const m of a){const r=h(m,++n,a),c=E.get(r);c?c.push(m):E.set(r,[m])}for(const[m,r]of E)E.set(m,_(r,p));return e(E)}(t,0)}const we=async t=>{if("clipboard"in navigator)await navigator.clipboard.writeText(t);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=t,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}},Ie=(t,e)=>{async function s(){if(e)try{await we(e),t.dispatchEvent(new CustomEvent("svelte-copy",{detail:e}))}catch(o){t.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:o}))}}return t.addEventListener("click",s,!0),{update:o=>e=o,destroy:()=>t.removeEventListener("click",s,!0)}};function Le(t){switch(t){default:return new Promise(function(e,s){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(s.bind(null,new Error("Unknown variable dynamic import: "+t)))})}}function Re(t){switch(t){case"./demo-fonts/atkinson.css":return T(()=>Promise.resolve({}),["assets/atkinson-1281a660.css"]);case"./demo-fonts/atlas.css":return T(()=>Promise.resolve({}),["assets/atlas-cb2ad228.css"]);case"./demo-fonts/baloo-bhai.css":return T(()=>Promise.resolve({}),["assets/baloo-bhai-5e94776b.css"]);case"./demo-fonts/canela.css":return T(()=>Promise.resolve({}),["assets/canela-a7ac49e7.css"]);case"./demo-fonts/computer-modern.css":return T(()=>Promise.resolve({}),["assets/computer-modern-a1a7835d.css"]);case"./demo-fonts/cozette.css":return T(()=>Promise.resolve({}),["assets/cozette-e7916e73.css"]);case"./demo-fonts/digital-7.css":return T(()=>Promise.resolve({}),["assets/digital-7-958ca4da.css"]);case"./demo-fonts/inter.css":return T(()=>Promise.resolve({}),["assets/inter-1d798cd0.css"]);case"./demo-fonts/jamboree.css":return T(()=>Promise.resolve({}),["assets/jamboree-077b278d.css"]);case"./demo-fonts/jersey.css":return T(()=>Promise.resolve({}),["assets/jersey-c96bb8f5.css"]);case"./demo-fonts/lyon.css":return T(()=>Promise.resolve({}),["assets/lyon-8fc18a93.css"]);case"./demo-fonts/metropolis.css":return T(()=>Promise.resolve({}),["assets/metropolis-e6dceb4d.css"]);case"./demo-fonts/national.css":return T(()=>Promise.resolve({}),["assets/national-d2d05662.css"]);case"./demo-fonts/publico.css":return T(()=>Promise.resolve({}),["assets/publico-1157c685.css"]);case"./demo-fonts/recoleta.css":return T(()=>Promise.resolve({}),["assets/recoleta-a3f51060.css"]);case"./demo-fonts/roboto.css":return T(()=>Promise.resolve({}),["assets/roboto-0632145c.css"]);case"./demo-fonts/rubik.css":return T(()=>Promise.resolve({}),["assets/rubik-a45a7c73.css"]);case"./demo-fonts/spacemono.css":return T(()=>Promise.resolve({}),["assets/spacemono-5599b7ae.css"]);case"./demo-fonts/tiempos.css":return T(()=>Promise.resolve({}),["assets/tiempos-3bf20c8a.css"]);default:return new Promise(function(e,s){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(s.bind(null,new Error("Unknown variable dynamic import: "+t)))})}}function Ae(t){let e,s,o,_,a,p,E,h,n,m,r,c,f,w,b,S,L,R,M,N,C;return{c(){e=P("div"),s=P("h3"),o=A(t[0]),_=V(),a=P("p"),p=A("The quick brown fox jumps over the lazy dog."),E=V(),h=P("details"),n=P("summary"),m=A("CSS Snippet"),r=V(),c=P("code"),f=V(),w=P("p"),b=P("button"),S=A("Copy CSS to Clipboard"),R=P("span"),M=A(t[2]),this.h()},l(i){e=D(i,"DIV",{class:!0});var g=k(e);s=D(g,"H3",{});var l=k(s);o=O(l,t[0]),l.forEach(v),_=z(g),a=D(g,"P",{});var y=k(a);p=O(y,"The quick brown fox jumps over the lazy dog."),y.forEach(v),E=z(g),h=D(g,"DETAILS",{class:!0});var d=k(h);n=D(d,"SUMMARY",{class:!0});var j=k(n);m=O(j,"CSS Snippet"),j.forEach(v),r=z(d),c=D(d,"CODE",{class:!0});var G=k(c);G.forEach(v),d.forEach(v),f=z(g),w=D(g,"P",{});var q=k(w);b=D(q,"BUTTON",{class:!0});var B=k(b);S=O(B,"Copy CSS to Clipboard"),B.forEach(v),R=D(q,"SPAN",{class:!0});var $=k(R);M=O($,t[2]),$.forEach(v),q.forEach(v),g.forEach(v),this.h()},h(){J(a,"font-size",t[3],!1),I(n,"class","svelte-wnrdtb"),I(c,"class","svelte-wnrdtb"),I(h,"class","svelte-wnrdtb"),I(b,"class","svelte-wnrdtb"),I(R,"class","svelte-wnrdtb"),I(e,"class","svelte-wnrdtb"),J(e,"font-family",t[0],!1)},m(i,g){F(i,e,g),u(e,s),u(s,o),u(e,_),u(e,a),u(a,p),u(e,E),u(e,h),u(h,n),u(n,m),u(h,r),u(h,c),c.innerHTML=t[1],u(e,f),u(e,w),u(w,b),u(b,S),u(w,R),u(R,M),N||(C=[de(L=Ie.call(null,b,t[1])),W(b,"svelte-copy",t[4])],N=!0)},p(i,[g]){g&1&&Y(o,i[0]),g&8&&J(a,"font-size",i[3],!1),g&2&&(c.innerHTML=i[1]),L&&pe(L.update)&&g&2&&L.update.call(null,i[1]),g&4&&Y(M,i[2]),g&1&&J(e,"font-family",i[0],!1)},i:x,o:x,d(i){i&&v(e),N=!1,ie(C)}}}function Oe(t,e,s){let o,{id:_=""}=e,{family:a=""}=e,{size:p=16}=e,E="",h="";const n=()=>{s(2,h="Copied!"),setTimeout(()=>{s(2,h="")},1e3)};return he(async()=>{await Re(`./demo-fonts/${_}.css`),s(1,E=(await Le(`./demo-fonts/${_}.css?raw`)).default)}),t.$$set=m=>{"id"in m&&s(5,_=m.id),"family"in m&&s(0,a=m.family),"size"in m&&s(6,p=m.size)},t.$$.update=()=>{t.$$.dirty&64&&s(3,o=`${p}px`)},[a,E,h,o,n,_,p]}class Ce extends K{constructor(e){super(),X(this,e,Oe,Ae,Z,{id:5,family:0,size:6})}}var Ve=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"roboto",family:"Roboto",type:"sans-serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];function oe(t,e,s){const o=t.slice();return o[3]=e[s][0],o[4]=e[s][1],o}function se(t,e,s){const o=t.slice();return o[7]=e[s].family,o[8]=e[s].id,o}function ne(t){let e,s;return e=new Ce({props:{id:t[8],family:t[7],size:t[0]}}),{c(){ae(e.$$.fragment)},l(o){le(e.$$.fragment,o)},m(o,_){ce(e,o,_),s=!0},p(o,_){const a={};_&1&&(a.size=o[0]),e.$set(a)},i(o){s||(H(e.$$.fragment,o),s=!0)},o(o){U(e.$$.fragment,o),s=!1},d(o){ue(e,o)}}}function re(t){let e,s=t[3]+"",o,_,a,p,E,h=t[4],n=[];for(let r=0;r<h.length;r+=1)n[r]=ne(se(t,h,r));const m=r=>U(n[r],1,1,()=>{n[r]=null});return{c(){e=P("h2"),o=A(s),_=V(),a=P("section");for(let r=0;r<n.length;r+=1)n[r].c();p=V(),this.h()},l(r){e=D(r,"H2",{});var c=k(e);o=O(c,s),c.forEach(v),_=z(r),a=D(r,"SECTION",{class:!0});var f=k(a);for(let w=0;w<n.length;w+=1)n[w].l(f);p=z(f),f.forEach(v),this.h()},h(){I(a,"class","svelte-1fj5vgb")},m(r,c){F(r,e,c),u(e,o),F(r,_,c),F(r,a,c);for(let f=0;f<n.length;f+=1)n[f].m(a,null);u(a,p),E=!0},p(r,c){if(c&3){h=r[4];let f;for(f=0;f<h.length;f+=1){const w=se(r,h,f);n[f]?(n[f].p(w,c),H(n[f],1)):(n[f]=ne(w),n[f].c(),H(n[f],1),n[f].m(a,p))}for(fe(),f=h.length;f<n.length;f+=1)m(f);_e()}},i(r){if(!E){for(let c=0;c<h.length;c+=1)H(n[c]);E=!0}},o(r){n=n.filter(Boolean);for(let c=0;c<n.length;c+=1)U(n[c]);E=!1},d(r){r&&v(e),r&&v(_),r&&v(a),me(n,r)}}}function ze(t){let e,s,o,_,a,p,E,h,n,m,r,c,f,w,b,S,L,R,M,N,C=t[1],i=[];for(let l=0;l<C.length;l+=1)i[l]=re(oe(t,C,l));const g=l=>U(i[l],1,1,()=>{i[l]=null});return{c(){e=P("div"),s=P("h1"),o=A("Hosted Fonts on The Pudding"),_=V(),a=P("p"),p=P("em"),E=A("Do not use fonts hosted by The Pudding without written permission."),h=V(),n=P("form"),m=P("label"),r=A("font-size: "),c=A(t[0]),f=A("px"),w=V(),b=P("input"),S=V(),L=P("article");for(let l=0;l<i.length;l+=1)i[l].c();this.h()},l(l){e=D(l,"DIV",{id:!0,class:!0});var y=k(e);s=D(y,"H1",{});var d=k(s);o=O(d,"Hosted Fonts on The Pudding"),d.forEach(v),_=z(y),a=D(y,"P",{});var j=k(a);p=D(j,"EM",{});var G=k(p);E=O(G,"Do not use fonts hosted by The Pudding without written permission."),G.forEach(v),j.forEach(v),h=z(y),n=D(y,"FORM",{});var q=k(n);m=D(q,"LABEL",{for:!0,class:!0});var B=k(m);r=O(B,"font-size: "),c=O(B,t[0]),f=O(B,"px"),B.forEach(v),w=z(q),b=D(q,"INPUT",{id:!0,type:!0,min:!0,max:!0}),q.forEach(v),y.forEach(v),S=z(l),L=D(l,"ARTICLE",{class:!0});var $=k(L);for(let Q=0;Q<i.length;Q+=1)i[Q].l($);$.forEach(v),this.h()},h(){I(m,"for","size"),I(m,"class","svelte-1fj5vgb"),I(b,"id","size"),I(b,"type","range"),I(b,"min","12"),I(b,"max","48"),I(e,"id","info"),I(e,"class","svelte-1fj5vgb"),I(L,"class","svelte-1fj5vgb")},m(l,y){F(l,e,y),u(e,s),u(s,o),u(e,_),u(e,a),u(a,p),u(p,E),u(e,h),u(e,n),u(n,m),u(m,r),u(m,c),u(m,f),u(n,w),u(n,b),ee(b,t[0]),F(l,S,y),F(l,L,y);for(let d=0;d<i.length;d+=1)i[d].m(L,null);R=!0,M||(N=[W(b,"change",t[2]),W(b,"input",t[2])],M=!0)},p(l,[y]){if((!R||y&1)&&Y(c,l[0]),y&1&&ee(b,l[0]),y&3){C=l[1];let d;for(d=0;d<C.length;d+=1){const j=oe(l,C,d);i[d]?(i[d].p(j,y),H(i[d],1)):(i[d]=re(j),i[d].c(),H(i[d],1),i[d].m(L,null))}for(fe(),d=C.length;d<i.length;d+=1)g(d);_e()}},i(l){if(!R){for(let y=0;y<C.length;y+=1)H(i[y]);R=!0}},o(l){i=i.filter(Boolean);for(let y=0;y<i.length;y+=1)U(i[y]);R=!1},d(l){l&&v(e),l&&v(S),l&&v(L),me(i,l),M=!1,ie(N)}}}function Se(t,e,s){let o=18;const _=De(Ve,p=>p.type);_.sort((p,E)=>ve(p[1].length,E[1].length));function a(){o=ye(this.value),s(0,o)}return[o,_,a]}class Me extends K{constructor(e){super(),X(this,e,Se,ze,Z,{})}}function je(t){let e,s;return e=new Me({}),{c(){ae(e.$$.fragment)},l(o){le(e.$$.fragment,o)},m(o,_){ce(e,o,_),s=!0},p:x,i(o){s||(H(e.$$.fragment,o),s=!0)},o(o){U(e.$$.fragment,o),s=!1},d(o){ue(e,o)}}}class Fe extends K{constructor(e){super(),X(this,e,null,je,Z,{})}}export{Fe as default};