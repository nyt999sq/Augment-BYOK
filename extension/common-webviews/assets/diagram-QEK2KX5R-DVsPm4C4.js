import{_ as l,s as O,g as S,t as D,q as E,a as F,b as z,K as _,z as P,F as v,G as C,H as R,l as G,a1 as B}from"./mermaid-Bezvo2Lx.js";import{p as V}from"./chunk-4BX2VUAB-BCJTk5zn.js";import{p as j}from"./treemap-KMMF4GRG-D7je9732.js";import"./Icon-CaBYD5oO.js";import"./index-DF_yYUtg.js";import"./_commonjsHelpers-CwkBNZ52.js";import"./_baseUniq-Tva45woW.js";import"./noop-CVINQ7cR.js";import"./_basePickBy-CQZwVAZ9.js";import"./clone-D-VQvJBH.js";try{m=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},(w=new m.Error().stack)&&(m._sentryDebugIds=m._sentryDebugIds||{},m._sentryDebugIds[w]="9925eef6-a0a8-4cbf-aa47-2aa0f3443919",m._sentryDebugIdIdentifier="sentry-dbid-9925eef6-a0a8-4cbf-aa47-2aa0f3443919")}catch{}var m,w,x={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},M={axes:[],curves:[],options:x},u=structuredClone(M),H=R.radar,W=l(()=>v({...H,...C().radar}),"getConfig"),L=l(()=>u.axes,"getAxes"),q=l(()=>u.curves,"getCurves"),K=l(()=>u.options,"getOptions"),Z=l(a=>{u.axes=a.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),J=l(a=>{u.curves=a.map(t=>({name:t.name,label:t.label??t.name,entries:N(t.entries)}))},"setCurves"),N=l(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=L();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(n=>n.axis?.$refText===e.name);if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),$={getAxes:L,getCurves:q,getOptions:K,setAxes:Z,setCurves:J,setOptions:l(a=>{const t=a.reduce((e,r)=>(e[r.name]=r,e),{});u.options={showLegend:t.showLegend?.value??x.showLegend,ticks:t.ticks?.value??x.ticks,max:t.max?.value??x.max,min:t.min?.value??x.min,graticule:t.graticule?.value??x.graticule}},"setOptions"),getConfig:W,clear:l(()=>{P(),u=structuredClone(M)},"clear"),setAccTitle:z,getAccTitle:F,setDiagramTitle:E,getDiagramTitle:D,getAccDescription:S,setAccDescription:O},Q=l(a=>{V(a,$);const{axes:t,curves:e,options:r}=a;$.setAxes(t),$.setCurves(e),$.setOptions(r)},"populate"),U={parse:l(async a=>{const t=await j("radar",a);G.debug(t),Q(t)},"parse")},X=l((a,t,e,r)=>{const n=r.db,i=n.getAxes(),o=n.getCurves(),s=n.getOptions(),c=n.getConfig(),p=n.getDiagramTitle(),g=_(t),d=Y(g,c),h=s.max??Math.max(...o.map(y=>Math.max(...y.entries))),b=s.min,f=Math.min(c.width,c.height)/2;tt(d,i,f,s.ticks,s.graticule),et(d,i,f,c),T(d,i,o,b,h,s.graticule,c),I(d,o,s.showLegend,c),d.append("text").attr("class","radarTitle").text(p).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),Y=l((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,n=t.marginLeft+t.width/2,i=t.marginTop+t.height/2;return a.attr("viewbox",`0 0 ${e} ${r}`).attr("width",e).attr("height",r),a.append("g").attr("transform",`translate(${n}, ${i})`)},"drawFrame"),tt=l((a,t,e,r,n)=>{if(n==="circle")for(let i=0;i<r;i++){const o=e*(i+1)/r;a.append("circle").attr("r",o).attr("class","radarGraticule")}else if(n==="polygon"){const i=t.length;for(let o=0;o<r;o++){const s=e*(o+1)/r,c=t.map((p,g)=>{const d=2*g*Math.PI/i-Math.PI/2;return`${s*Math.cos(d)},${s*Math.sin(d)}`}).join(" ");a.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),et=l((a,t,e,r)=>{const n=t.length;for(let i=0;i<n;i++){const o=t[i].label,s=2*i*Math.PI/n-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(s)).attr("y2",e*r.axisScaleFactor*Math.sin(s)).attr("class","radarAxisLine"),a.append("text").text(o).attr("x",e*r.axisLabelFactor*Math.cos(s)).attr("y",e*r.axisLabelFactor*Math.sin(s)).attr("class","radarAxisLabel")}},"drawAxes");function T(a,t,e,r,n,i,o){const s=t.length,c=Math.min(o.width,o.height)/2;e.forEach((p,g)=>{if(p.entries.length!==s)return;const d=p.entries.map((h,b)=>{const f=2*Math.PI*b/s-Math.PI/2,y=k(h,r,n,c);return{x:y*Math.cos(f),y:y*Math.sin(f)}});i==="circle"?a.append("path").attr("d",A(d,o.curveTension)).attr("class",`radarCurve-${g}`):i==="polygon"&&a.append("polygon").attr("points",d.map(h=>`${h.x},${h.y}`).join(" ")).attr("class",`radarCurve-${g}`)})}function k(a,t,e,r){return r*(Math.min(Math.max(a,t),e)-t)/(e-t)}function A(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let n=0;n<e;n++){const i=a[(n-1+e)%e],o=a[n],s=a[(n+1)%e],c=a[(n+2)%e],p={x:o.x+(s.x-i.x)*t,y:o.y+(s.y-i.y)*t},g={x:s.x-(c.x-o.x)*t,y:s.y-(c.y-o.y)*t};r+=` C${p.x},${p.y} ${g.x},${g.y} ${s.x},${s.y}`}return`${r} Z`}function I(a,t,e,r){if(!e)return;const n=3*(r.width/2+r.marginRight)/4,i=3*-(r.height/2+r.marginTop)/4;t.forEach((o,s)=>{const c=a.append("g").attr("transform",`translate(${n}, ${i+20*s})`);c.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${s}`),c.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(o.label)})}l(T,"drawCurves"),l(k,"relativeRadius"),l(A,"closedRoundCurve"),l(I,"drawLegend");var at={draw:X},rt=l((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const n=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${n};
			fill: ${n};
			fill-opacity: ${t.curveOpacity};
			stroke: ${n};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${n};
			fill-opacity: ${t.curveOpacity};
			stroke: ${n};
		}
		`}return e},"genIndexStyles"),nt=l(a=>{const t=B(),e=C(),r=v(t,e.themeVariables);return{themeVariables:r,radarOptions:v(r.radar,a)}},"buildRadarStyleOptions"),mt={parser:U,db:$,renderer:at,styles:l(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=nt(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${rt(t,e)}
	`},"styles")};export{mt as diagram};
//# sourceMappingURL=diagram-QEK2KX5R-DVsPm4C4.js.map
