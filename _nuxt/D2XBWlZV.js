const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CLRBpW9H.js","./CKl8EziB.js","./entry.B77D26ij.css","./CojOqYw3.js","./BYcluvu1.js","./C-v3KzvZ.js","./Cpj98o6Y.js"])))=>i.map(i=>d[i]);
import{q as f,w as m,e as v,s as g,j as d,u as l,a as h}from"./CojOqYw3.js";import{i as _,q as y,j as C,r as w,s as P,v as $,k as N,m as r}from"./CKl8EziB.js";import{h as p,u as j}from"./BYcluvu1.js";import{_ as T}from"./Dvc22Sfo.js";const D=async e=>{const{content:t}=_().public;typeof(e==null?void 0:e.params)!="function"&&(e=f(e));const a=e.params(),s=t.experimental.stripQueryParameters?m(`/navigation/${`${p(a)}.${t.integrity}`}/${v(a)}.json`):m(`/navigation/${p(a)}.${t.integrity}.json`);if(g())return(await y(()=>import("./CLRBpW9H.js"),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url).then(o=>o.generateNavigation))(a);const n=await $fetch(s,{method:"GET",responseType:"json",params:t.experimental.stripQueryParameters?void 0:{_params:d(a),previewToken:j().getPreviewToken()}});if(typeof n=="string"&&n.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return n},E=C({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(e){const{query:t}=w(e),a=P(()=>{var n;return typeof((n=t.value)==null?void 0:n.params)=="function"?t.value.params():t.value});if(!a.value&&$("dd-navigation").value){const{navigation:n}=l();return{navigation:n}}const{data:s}=await h(`content-navigation-${p(a.value)}`,()=>D(a.value));return{navigation:s}},render(e){const t=N(),{navigation:a}=e,s=o=>r(T,{to:o._path},()=>o.title),n=(o,u)=>r("ul",u?{"data-level":u}:null,o.map(i=>i.children?r("li",null,[s(i),n(i.children,u+1)]):r("li",null,s(i)))),c=o=>n(o,0);return t!=null&&t.default?t.default({navigation:a,...this.$attrs}):c(a)}}),Q=E;export{Q as default};
