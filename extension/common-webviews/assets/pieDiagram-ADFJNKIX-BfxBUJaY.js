import{V as x,P as F,aG as V,_ as o,g as j,s as B,a as L,b as q,t as G,q as H,l as O,c as K,F as J,K as Q,a4 as U,e as X,z as Y,H as Z}from"./mermaid-Bezvo2Lx.js";import{p as tt}from"./chunk-4BX2VUAB-BCJTk5zn.js";import{p as et}from"./treemap-KMMF4GRG-D7je9732.js";import{d as N}from"./arc-DWsrh887.js";import{o as at}from"./ordinal-CJtZUbpr.js";import"./Icon-CaBYD5oO.js";import"./index-DF_yYUtg.js";import"./_commonjsHelpers-CwkBNZ52.js";import"./_baseUniq-Tva45woW.js";import"./noop-CVINQ7cR.js";import"./_basePickBy-CQZwVAZ9.js";import"./clone-D-VQvJBH.js";import"./init-CpIN3PJq.js";try{T=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},(E=new T.Error().stack)&&(T._sentryDebugIds=T._sentryDebugIds||{},T._sentryDebugIds[E]="2233e604-6f5b-456e-8ca4-926a74e7cc05",T._sentryDebugIdIdentifier="sentry-dbid-2233e604-6f5b-456e-8ca4-926a74e7cc05")}catch{}var T,E;function nt(t,r){return r<t?-1:r>t?1:r>=t?0:NaN}function rt(t){return t}var it=Z.pie,_={sections:new Map,showData:!1},M=_.sections,I=_.showData,lt=structuredClone(it),P={getConfig:o(()=>structuredClone(lt),"getConfig"),clear:o(()=>{M=new Map,I=_.showData,Y()},"clear"),setDiagramTitle:H,getDiagramTitle:G,setAccTitle:q,getAccTitle:L,setAccDescription:B,getAccDescription:j,addSection:o(({label:t,value:r})=>{if(r<0)throw new Error(`"${t}" has invalid value: ${r}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);M.has(t)||(M.set(t,r),O.debug(`added new section: ${t}, with value: ${r}`))},"addSection"),getSections:o(()=>M,"getSections"),setShowData:o(t=>{I=t},"setShowData"),getShowData:o(()=>I,"getShowData")},st=o((t,r)=>{tt(t,r),r.setShowData(t.showData),t.sections.map(r.addSection)},"populateDb"),ot={parse:o(async t=>{const r=await et("pie",t);O.debug(r),st(r,P)},"parse")},pt=o(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),ct=o(t=>{const r=[...t.values()].reduce((i,s)=>i+s,0),R=[...t.entries()].map(([i,s])=>({label:i,value:s})).filter(i=>i.value/r*100>=1).sort((i,s)=>s.value-i.value);return function(){var i=rt,s=nt,p=null,b=x(0),g=x(F),A=x(0);function l(e){var a,m,C,c,h,u=(e=V(e)).length,y=0,v=new Array(u),d=new Array(u),f=+b.apply(this,arguments),S=Math.min(F,Math.max(-F,g.apply(this,arguments)-f)),D=Math.min(Math.abs(S)/u,A.apply(this,arguments)),k=D*(S<0?-1:1);for(a=0;a<u;++a)(h=d[v[a]=a]=+i(e[a],a,e))>0&&(y+=h);for(s!=null?v.sort(function(w,$){return s(d[w],d[$])}):p!=null&&v.sort(function(w,$){return p(e[w],e[$])}),a=0,C=y?(S-u*k)/y:0;a<u;++a,f=c)m=v[a],c=f+((h=d[m])>0?h*C:0)+k,d[m]={data:e[m],index:a,value:h,startAngle:f,endAngle:c,padAngle:D};return d}return l.value=function(e){return arguments.length?(i=typeof e=="function"?e:x(+e),l):i},l.sortValues=function(e){return arguments.length?(s=e,p=null,l):s},l.sort=function(e){return arguments.length?(p=e,s=null,l):p},l.startAngle=function(e){return arguments.length?(b=typeof e=="function"?e:x(+e),l):b},l.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:x(+e),l):g},l.padAngle=function(e){return arguments.length?(A=typeof e=="function"?e:x(+e),l):A},l}().value(i=>i.value)(R)},"createPieArcs"),$t={parser:ot,db:P,renderer:{draw:o((t,r,R,W)=>{O.debug(`rendering pie chart
`+t);const i=W.db,s=K(),p=J(i.getConfig(),s.pie),b=18,g=450,A=g,l=Q(r),e=l.append("g");e.attr("transform","translate(225,225)");const{themeVariables:a}=s;let[m]=U(a.pieOuterStrokeWidth);m??=2;const C=p.textPosition,c=Math.min(A,g)/2-40,h=N().innerRadius(0).outerRadius(c),u=N().innerRadius(c*C).outerRadius(c*C);e.append("circle").attr("cx",0).attr("cy",0).attr("r",c+m/2).attr("class","pieOuterCircle");const y=i.getSections(),v=ct(y),d=[a.pie1,a.pie2,a.pie3,a.pie4,a.pie5,a.pie6,a.pie7,a.pie8,a.pie9,a.pie10,a.pie11,a.pie12];let f=0;y.forEach(n=>{f+=n});const S=v.filter(n=>(n.data.value/f*100).toFixed(0)!=="0"),D=at(d);e.selectAll("mySlices").data(S).enter().append("path").attr("d",h).attr("fill",n=>D(n.data.label)).attr("class","pieCircle"),e.selectAll("mySlices").data(S).enter().append("text").text(n=>(n.data.value/f*100).toFixed(0)+"%").attr("transform",n=>"translate("+u.centroid(n)+")").style("text-anchor","middle").attr("class","slice"),e.append("text").text(i.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");const k=[...y.entries()].map(([n,z])=>({label:n,value:z})),w=e.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(n,z)=>"translate(216,"+(22*z-22*k.length/2)+")");w.append("rect").attr("width",b).attr("height",b).style("fill",n=>D(n.label)).style("stroke",n=>D(n.label)),w.append("text").attr("x",22).attr("y",14).text(n=>i.getShowData()?`${n.label} [${n.value}]`:n.label);const $=512+Math.max(...w.selectAll("text").nodes().map(n=>n?.getBoundingClientRect().width??0));l.attr("viewBox",`0 0 ${$} 450`),X(l,g,$,p.useMaxWidth)},"draw")},styles:pt};export{$t as diagram};
//# sourceMappingURL=pieDiagram-ADFJNKIX-BfxBUJaY.js.map
