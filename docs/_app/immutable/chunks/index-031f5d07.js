function b(){}const V=t=>t;function mt(t,e){for(const n in e)t[n]=e[n];return t}function X(t){return t()}function K(){return Object.create(null)}function x(t){t.forEach(X)}function F(t){return typeof t=="function"}function Lt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let C;function Tt(t,e){return C||(C=document.createElement("a")),C.href=e,t===C.href}function ht(t){return Object.keys(t).length===0}function pt(t,...e){if(t==null)return b;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Wt(t,e,n){t.$$.on_destroy.push(pt(e,n))}function Bt(t,e,n,i){if(t){const r=Y(t,e,n,i);return t[0](r)}}function Y(t,e,n,i){return t[1]&&i?mt(n.ctx.slice(),t[1](i(e))):n.ctx}function Ft(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)c[u]=e.dirty[u]|r[u];return c}return e.dirty|r}return e.dirty}function It(t,e,n,i,r,c){if(r){const s=Y(e,n,i,c);t.p(s,r)}}function Ht(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Gt(t){return t==null?"":t}function Jt(t,e,n){return t.set(n),e}const Z=typeof window<"u";let tt=Z?()=>window.performance.now():()=>Date.now(),I=Z?t=>requestAnimationFrame(t):b;const g=new Set;function et(t){g.forEach(e=>{e.c(t)||(g.delete(e),e.f())}),g.size!==0&&I(et)}function nt(t){let e;return g.size===0&&I(et),{promise:new Promise(n=>{g.add(e={c:t,f:n})}),abort(){g.delete(e)}}}let O=!1;function yt(){O=!0}function gt(){O=!1}function bt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function xt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const l=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=l?r+1:bt(1,r,d=>e[n[d]].claim_order,l))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,r=Math.max(a,r)}const c=[],s=[];let u=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);u>=o;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);c.reverse(),s.sort((o,l)=>o.claim_order-l.claim_order);for(let o=0,l=0;o<s.length;o++){for(;l<c.length&&s[o].claim_order>=c[l].claim_order;)l++;const f=l<c.length?c[l]:null;t.insertBefore(s[o],f)}}function it(t,e){t.appendChild(e)}function rt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function wt(t){const e=H("style");return $t(rt(t),e),e.sheet}function $t(t,e){it(t.head||t,e)}function vt(t,e){if(O){for(xt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Kt(t,e,n){O&&!n?vt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function st(t){t.parentNode.removeChild(t)}function Qt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function H(t){return document.createElement(t)}function Et(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function G(t){return document.createTextNode(t)}function Ut(){return G(" ")}function Vt(){return G("")}function Q(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Xt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Yt(t){return t===""?null:+t}function kt(t){return Array.from(t.childNodes)}function At(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ot(t,e,n,i,r=!1){At(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const o=n(u);return o===void 0?t.splice(s,1):t[s]=o,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const o=n(u);return o===void 0?t.splice(s,1):t[s]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function ct(t,e,n,i){return ot(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||c.push(u.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Zt(t,e,n){return ct(t,e,n,H)}function te(t,e,n){return ct(t,e,n,Et)}function Ct(t,e){return ot(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>G(e),!0)}function ee(t){return Ct(t," ")}function ne(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ie(t,e){t.value=e==null?"":e}function re(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let N;function Nt(){if(N===void 0){N=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{N=!0}}return N}function se(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=H("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=Nt();let c;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=Q(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=Q(i.contentWindow,"resize",e)}),it(t,i),()=>{(r||c&&i.contentWindow)&&c(),st(i)}}function oe(t,e,n){t.classList[n?"add":"remove"](e)}function St(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function ce(t,e=document.body){return Array.from(e.querySelectorAll(t))}const M=new Map;let q=0;function jt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function zt(t,e){const n={stylesheet:wt(e),rules:{}};return M.set(t,n),n}function lt(t,e,n,i,r,c,s,u=0){const o=16.666/i;let l=`{
`;for(let h=0;h<=1;h+=o){const A=e+(n-e)*c(h);l+=h*100+`%{${s(A,1-A)}}
`}const f=l+`100% {${s(n,1-n)}}
}`,a=`__svelte_${jt(f)}_${u}`,d=rt(t),{stylesheet:_,rules:m}=M.get(d)||zt(d,t);m[a]||(m[a]=!0,_.insertRule(`@keyframes ${a} ${f}`,_.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${a} ${i}ms linear ${r}ms 1 both`,q+=1,a}function T(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),q-=r,q||Mt())}function Mt(){I(()=>{q||(M.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),M.clear())})}let E;function v(t){E=t}function P(){if(!E)throw new Error("Function called outside component initialization");return E}function le(t){P().$$.on_mount.push(t)}function ue(t){P().$$.after_update.push(t)}function ae(t,e){return P().$$.context.set(t,e),e}function fe(t){return P().$$.context.get(t)}const $=[],U=[],j=[],W=[],ut=Promise.resolve();let B=!1;function at(){B||(B=!0,ut.then(ft))}function de(){return at(),ut}function k(t){j.push(t)}function _e(t){W.push(t)}const L=new Set;let S=0;function ft(){const t=E;do{for(;S<$.length;){const e=$[S];S++,v(e),qt(e.$$)}for(v(null),$.length=0,S=0;U.length;)U.pop()();for(let e=0;e<j.length;e+=1){const n=j[e];L.has(n)||(L.add(n),n())}j.length=0}while($.length);for(;W.length;)W.pop()();B=!1,L.clear(),v(t)}function qt(t){if(t.fragment!==null){t.update(),x(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}let w;function dt(){return w||(w=Promise.resolve(),w.then(()=>{w=null})),w}function R(t,e,n){t.dispatchEvent(St(`${e?"intro":"outro"}${n}`))}const z=new Set;let y;function me(){y={r:0,c:[],p:y}}function he(){y.r||x(y.c),y=y.p}function Rt(t,e){t&&t.i&&(z.delete(t),t.i(e))}function pe(t,e,n,i){if(t&&t.o){if(z.has(t))return;z.add(t),y.c.push(()=>{z.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const _t={duration:0};function ye(t,e,n){let i=e(t,n),r=!1,c,s,u=0;function o(){c&&T(t,c)}function l(){const{delay:a=0,duration:d=300,easing:_=V,tick:m=b,css:p}=i||_t;p&&(c=lt(t,0,1,d,a,_,p,u++)),m(0,1);const h=tt()+a,A=h+d;s&&s.abort(),r=!0,k(()=>R(t,!0,"start")),s=nt(D=>{if(r){if(D>=A)return m(1,0),R(t,!0,"end"),o(),r=!1;if(D>=h){const J=_((D-h)/d);m(J,1-J)}}return r})}let f=!1;return{start(){f||(f=!0,T(t),F(i)?(i=i(),dt().then(l)):l())},invalidate(){f=!1},end(){r&&(o(),r=!1)}}}function ge(t,e,n){let i=e(t,n),r=!0,c;const s=y;s.r+=1;function u(){const{delay:o=0,duration:l=300,easing:f=V,tick:a=b,css:d}=i||_t;d&&(c=lt(t,1,0,l,o,f,d));const _=tt()+o,m=_+l;k(()=>R(t,!1,"start")),nt(p=>{if(r){if(p>=m)return a(0,1),R(t,!1,"end"),--s.r||x(s.c),!1;if(p>=_){const h=f((p-_)/l);a(1-h,h)}}return r})}return F(i)?dt().then(()=>{i=i(),u()}):u(),{end(o){o&&i.tick&&i.tick(1,0),r&&(c&&T(t,c),r=!1)}}}function be(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function xe(t){t&&t.c()}function we(t,e){t&&t.l(e)}function Ot(t,e,n,i){const{fragment:r,on_mount:c,on_destroy:s,after_update:u}=t.$$;r&&r.m(e,n),i||k(()=>{const o=c.map(X).filter(F);s?s.push(...o):x(o),t.$$.on_mount=[]}),u.forEach(k)}function Pt(t,e){const n=t.$$;n.fragment!==null&&(x(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Dt(t,e){t.$$.dirty[0]===-1&&($.push(t),at(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function $e(t,e,n,i,r,c,s,u=[-1]){const o=E;v(t);const l=t.$$={fragment:null,ctx:null,props:c,update:b,not_equal:r,bound:K(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:K(),dirty:u,skip_bound:!1,root:e.target||o.$$.root};s&&s(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(a,d,..._)=>{const m=_.length?_[0]:d;return l.ctx&&r(l.ctx[a],l.ctx[a]=m)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](m),f&&Dt(t,a)),d}):[],l.update(),f=!0,x(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){yt();const a=kt(e.target);l.fragment&&l.fragment.l(a),a.forEach(st)}else l.fragment&&l.fragment.c();e.intro&&Rt(t.$$.fragment),Ot(t,e.target,e.anchor,e.customElement),gt(),ft()}v(o)}class ve{$destroy(){Pt(this,1),this.$destroy=b}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!ht(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{oe as $,de as A,b as B,pt as C,x as D,F as E,vt as F,Bt as G,It as H,Ht as I,Ft as J,fe as K,Wt as L,ce as M,Qt as N,Tt as O,Et as P,te as Q,k as R,ve as S,se as T,U,V,be as W,_e as X,ye as Y,ge as Z,Gt as _,Ut as a,Jt as a0,Q as a1,ie as a2,Yt as a3,Kt as b,ee as c,he as d,Vt as e,Rt as f,me as g,st as h,$e as i,ae as j,ue as k,H as l,Zt as m,kt as n,le as o,Xt as p,re as q,G as r,Lt as s,pe as t,Ct as u,ne as v,xe as w,we as x,Ot as y,Pt as z};
