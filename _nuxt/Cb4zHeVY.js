import{f as y,h as m,o as l,g as N,w as x,r as T,n as A,i as u,j as B,c,F as b,k as M,t as k,a,l as z,m as E,p as V,e as q,q as F,s as H,v as w,x as O,y as R,u as j,b as v,z as D,d as G}from"./BajgsKSb.js";import{_ as C}from"./DlAUqK2U.js";import{_ as U}from"./B8XfkPIW.js";const X=y({name:"EllipsisTypo",__name:"index",props:{as:{default:"p"},numberOfLine:{default:1}},setup(r){const i=r,t=m(()=>({"-webkit-line-clamp":i.numberOfLine,lineClamp:i.numberOfLine}));return(n,g)=>(l(),N(B(n.as),{style:A(u(t)),class:"ellipsis"},{default:x(()=>[T(n.$slots,"default",{},void 0,!0)]),_:3},8,["style"]))}}),Z=C(X,[["__scopeId","data-v-ba89b7d4"]]),J=y({name:"HashTag",__name:"index",props:{hashTags:{}},setup(r){return(i,t)=>(l(),c("ul",null,[(l(!0),c(b,null,M(i.hashTags,n=>(l(),c("li",{key:n},"# "+k(n),1))),128))]))}}),K=C(J,[["__scopeId","data-v-7b0a6292"]]),S=r=>(V("data-v-9702ac8d"),r=r(),q(),r),Q={key:0},W=["disabled"],Y=S(()=>a("i",{class:"fa-solid fa-angles-left"},null,-1)),ee=[Y],te=["disabled"],ne=S(()=>a("i",{class:"fa-solid fa-chevron-left"},null,-1)),se=[ne],ae=["onClick"],oe=["disabled"],le=S(()=>a("i",{class:"fa-solid fa-chevron-right"},null,-1)),re=[le],ie={key:1},ce=["disabled"],ue=S(()=>a("i",{class:"fa-solid fa-angles-right"},null,-1)),_e=[ue],p=5,de=y({name:"Pagination",__name:"index",props:{totalCount:{},pageSize:{},currentPage:{}},emits:["update:currentPage"],setup(r,{emit:i}){const t=r,n=i,g=m(()=>t.currentPage>Math.floor(p/2)+1),P=m(()=>_.value>p&&_.value-t.currentPage>Math.floor(p/2)),_=m(()=>Math.ceil(t.totalCount/t.pageSize)),$=m(()=>{const s=[],o=Math.floor(p/2);let e=Math.max(1,t.currentPage-o);const f=Math.min(_.value,e+p-1);f-e+1<p&&(e=Math.max(1,f-p+1));for(let h=e;h<=f;h+=1)s.push(h);return s}),d=s=>{n("update:currentPage",s)};return(s,o)=>(l(),c("ul",null,[u(g)?(l(),c("li",Q,[a("button",{disabled:s.currentPage===1,onClick:o[0]||(o[0]=e=>d(1))},ee,8,W)])):z("",!0),a("li",null,[a("button",{disabled:s.currentPage===1,onClick:o[1]||(o[1]=e=>d(s.currentPage-1))},se,8,te)]),(l(!0),c(b,null,M(u($),e=>(l(),c("li",{key:e,class:E({active:e===s.currentPage})},[a("button",{onClick:f=>d(e)},k(e),9,ae)],2))),128)),a("li",null,[a("button",{disabled:s.currentPage===u(_),onClick:o[2]||(o[2]=e=>d(s.currentPage+1))},re,8,oe)]),u(P)?(l(),c("li",ie,[a("button",{disabled:s.currentPage===u(_),onClick:o[3]||(o[3]=e=>d(s.totalCount))},_e,8,ce)])):z("",!0)]))}}),pe=C(de,[["__scopeId","data-v-9702ac8d"]]),L=8,me=()=>{const{replace:r}=F(),{query:i}=H(),t=w([]),n=w(Number(i.page)||1),g=m(()=>t.value.slice((n.value-1)*L,n.value*L)),P=m(()=>t.value.length);return O(async()=>{t.value=await $fetch("/articles.json")}),R(n,()=>{r({query:{...i,page:n.value.toString()}})},{immediate:!0}),{currentPage:n,pageSize:L,totalCount:P,articleList:g}},ge={class:"articles"},fe=y({name:"ArticleListPage",__name:"index",setup(r){j({title:"글 목록"});const{articleList:i,currentPage:t,totalCount:n,pageSize:g}=me();return(P,_)=>{const $=Z,d=K,s=U,o=pe;return l(),c(b,null,[a("ul",ge,[(l(!0),c(b,null,M(u(i),({id:e,title:f,description:h,hashTags:I})=>(l(),c("li",{key:e},[v(s,{to:`/articles/${e}`},{default:x(()=>[a("h1",null,k(f),1),v($,{"number-of-line":"3"},{default:x(()=>[G(k(h),1)]),_:2},1024),v(d,{"hash-tags":I},null,8,["hash-tags"])]),_:2},1032,["to"])]))),128))]),v(o,{"current-page":u(t),"onUpdate:currentPage":_[0]||(_[0]=e=>D(t)?t.value=e:null),"total-count":u(n),"page-size":u(g)},null,8,["current-page","total-count","page-size"])],64)}}}),be=C(fe,[["__scopeId","data-v-8095f8b3"]]);export{be as default};
