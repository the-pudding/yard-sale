function v(){}function K(t,e){for(const n in e)t[n]=e[n];return t}function W(t){return t()}function z(){return Object.create(null)}function p(t){t.forEach(W)}function B(t){return typeof t=="function"}function ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let g;function dt(t,e){return g||(g=document.createElement("a")),g.href=e,t===g.href}function Q(t){return Object.keys(t).length===0}function R(t,...e){if(t==null)return v;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function _t(t,e,n){t.$$.on_destroy.push(R(e,n))}function ht(t,e,n,i){if(t){const r=O(t,e,n,i);return t[0](r)}}function O(t,e,n,i){return t[1]&&i?K(n.ctx.slice(),t[1](i(e))):n.ctx}function mt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],o=Math.max(e.dirty.length,r.length);for(let u=0;u<o;u+=1)l[u]=e.dirty[u]|r[u];return l}return e.dirty|r}return e.dirty}function pt(t,e,n,i,r,l){if(r){const o=O(e,n,i,l);t.p(o,r)}}function yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function gt(t,e,n){return t.set(n),e}function bt(t){return t&&B(t.destroy)?t.destroy:v}let E=!1;function U(){E=!0}function V(){E=!1}function X(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Y(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let c=0;c<e.length;c++){const f=e[c];f.claim_order!==void 0&&s.push(f)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let s=0;s<e.length;s++){const c=e[s].claim_order,f=(r>0&&e[n[r]].claim_order<=c?r+1:X(1,r,y=>e[n[y]].claim_order,c))-1;i[s]=n[f]+1;const a=f+1;n[a]=s,r=Math.max(a,r)}const l=[],o=[];let u=e.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(l.push(e[s-1]);u>=s;u--)o.push(e[u]);u--}for(;u>=0;u--)o.push(e[u]);l.reverse(),o.sort((s,c)=>s.claim_order-c.claim_order);for(let s=0,c=0;s<o.length;s++){for(;c<l.length&&o[s].claim_order>=l[c].claim_order;)c++;const f=c<l.length?l[c]:null;t.insertBefore(o[s],f)}}function Z(t,e){t.appendChild(e)}function tt(t,e){if(E){for(Y(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function xt(t,e,n){E&&!n?tt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function P(t){t.parentNode.removeChild(t)}function wt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function I(t){return document.createElement(t)}function et(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function $t(){return k(" ")}function vt(){return k("")}function L(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Et(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function At(t){return t===""?null:+t}function nt(t){return Array.from(t.childNodes)}function it(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,i,r=!1){it(t);const l=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const u=t[o];if(e(u)){const s=n(u);return s===void 0?t.splice(o,1):t[o]=s,r||(t.claim_info.last_index=o),u}}for(let o=t.claim_info.last_index-1;o>=0;o--){const u=t[o];if(e(u)){const s=n(u);return s===void 0?t.splice(o,1):t[o]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=o,u}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function F(t,e,n,i){return D(t,r=>r.nodeName===e,r=>{const l=[];for(let o=0;o<r.attributes.length;o++){const u=r.attributes[o];n[u.name]||l.push(u.name)}l.forEach(o=>r.removeAttribute(o))},()=>i(e))}function St(t,e,n){return F(t,e,n,I)}function Nt(t,e,n){return F(t,e,n,et)}function rt(t,e){return D(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>k(e),!0)}function Ct(t){return rt(t," ")}function jt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function kt(t,e){t.value=e==null?"":e}function Mt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let b;function ot(){if(b===void 0){b=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{b=!0}}return b}function qt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=I("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=ot();let l;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",l=L(window,"message",o=>{o.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{l=L(i.contentWindow,"resize",e)}),Z(t,i),()=>{(r||l&&i.contentWindow)&&l(),P(i)}}function zt(t,e,n){t.classList[n?"add":"remove"](e)}function Lt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let m;function h(t){m=t}function A(){if(!m)throw new Error("Function called outside component initialization");return m}function Tt(t){A().$$.on_mount.push(t)}function Wt(t){A().$$.after_update.push(t)}function Bt(t,e){return A().$$.context.set(t,e),e}function Ot(t){return A().$$.context.get(t)}const _=[],T=[],w=[],N=[],H=Promise.resolve();let C=!1;function G(){C||(C=!0,H.then(J))}function Pt(){return G(),H}function j(t){w.push(t)}function It(t){N.push(t)}const S=new Set;let x=0;function J(){const t=m;do{for(;x<_.length;){const e=_[x];x++,h(e),st(e.$$)}for(h(null),_.length=0,x=0;T.length;)T.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];S.has(n)||(S.add(n),n())}w.length=0}while(_.length);for(;N.length;)N.pop()();C=!1,S.clear(),h(t)}function st(t){if(t.fragment!==null){t.update(),p(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(j)}}const $=new Set;let d;function Dt(){d={r:0,c:[],p:d}}function Ft(){d.r||p(d.c),d=d.p}function ct(t,e){t&&t.i&&($.delete(t),t.i(e))}function Ht(t,e,n,i){if(t&&t.o){if($.has(t))return;$.add(t),d.c.push(()=>{$.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Gt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Jt(t){t&&t.c()}function Kt(t,e){t&&t.l(e)}function ut(t,e,n,i){const{fragment:r,on_mount:l,on_destroy:o,after_update:u}=t.$$;r&&r.m(e,n),i||j(()=>{const s=l.map(W).filter(B);o?o.push(...s):p(s),t.$$.on_mount=[]}),u.forEach(j)}function lt(t,e){const n=t.$$;n.fragment!==null&&(p(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function at(t,e){t.$$.dirty[0]===-1&&(_.push(t),G(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Qt(t,e,n,i,r,l,o,u=[-1]){const s=m;h(t);const c=t.$$={fragment:null,ctx:null,props:l,update:v,not_equal:r,bound:z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:z(),dirty:u,skip_bound:!1,root:e.target||s.$$.root};o&&o(c.root);let f=!1;if(c.ctx=n?n(t,e.props||{},(a,y,...M)=>{const q=M.length?M[0]:y;return c.ctx&&r(c.ctx[a],c.ctx[a]=q)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](q),f&&at(t,a)),y}):[],c.update(),f=!0,p(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){U();const a=nt(e.target);c.fragment&&c.fragment.l(a),a.forEach(P)}else c.fragment&&c.fragment.c();e.intro&&ct(t.$$.fragment),ut(t,e.target,e.anchor,e.customElement),V(),J()}h(s)}class Rt{$destroy(){lt(this,1),this.$destroy=v}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!Q(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{At as $,Pt as A,v as B,R as C,p as D,B as E,tt as F,ht as G,pt as H,yt as I,mt as J,Ot as K,_t as L,Lt as M,wt as N,dt as O,T as P,Gt as Q,It as R,Rt as S,zt as T,gt as U,j as V,qt as W,et as X,Nt as Y,kt as Z,L as _,$t as a,bt as a0,xt as b,Ct as c,Ft as d,vt as e,ct as f,Dt as g,P as h,Qt as i,Bt as j,Wt as k,I as l,St as m,nt as n,Tt as o,Et as p,Mt as q,k as r,ft as s,Ht as t,rt as u,jt as v,Jt as w,Kt as x,ut as y,lt as z};
