import{_ as g,F as m,K as P,e as z,l as x,b as D,a as F,q as S,t as T,g as E,s as W,G as I,H as _,z as A}from"./mermaid-Bezvo2Lx.js";import{p as H}from"./chunk-4BX2VUAB-BCJTk5zn.js";import{p as R}from"./treemap-KMMF4GRG-D7je9732.js";import"./Icon-CaBYD5oO.js";import"./index-DF_yYUtg.js";import"./_commonjsHelpers-CwkBNZ52.js";import"./_baseUniq-Tva45woW.js";import"./noop-CVINQ7cR.js";import"./_basePickBy-CQZwVAZ9.js";import"./clone-D-VQvJBH.js";try{u=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},(y=new u.Error().stack)&&(u._sentryDebugIds=u._sentryDebugIds||{},u._sentryDebugIds[y]="7f37fcc8-2798-4cb2-81f3-81e5cdce9f73",u._sentryDebugIdIdentifier="sentry-dbid-7f37fcc8-2798-4cb2-81f3-81e5cdce9f73")}catch{}var u,y,Y=_.packet,w,$=(w=class{constructor(){this.packet=[],this.setAccTitle=D,this.getAccTitle=F,this.setDiagramTitle=S,this.getDiagramTitle=T,this.getAccDescription=E,this.setAccDescription=W}getConfig(){const t=m({...Y,...I().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){A(),this.packet=[]}},g(w,"PacketDB"),w),j=g((e,t)=>{H(e,t);let r=-1,s=[],n=1;const{bitsPerRow:l}=t.getConfig();for(let{start:a,end:i,bits:c,label:d}of e.blocks){if(a!==void 0&&i!==void 0&&i<a)throw new Error(`Packet block ${a} - ${i} is invalid. End must be greater than start.`);if(a??=r+1,a!==r+1)throw new Error(`Packet block ${a} - ${i??a} is not contiguous. It should start from ${r+1}.`);if(c===0)throw new Error(`Packet block ${a} is invalid. Cannot have a zero bit field.`);for(i??=a+(c??1)-1,c??=i-a+1,r=i,x.debug(`Packet block ${a} - ${r} with label ${d}`);s.length<=l+1&&t.getPacket().length<1e4;){const[p,o]=L({start:a,end:i,bits:c,label:d},n,l);if(s.push(p),p.end+1===n*l&&(t.pushWord(s),s=[],n++),!o)break;({start:a,end:i,bits:c,label:d}=o)}}t.pushWord(s)},"populate"),L=g((e,t,r)=>{if(e.start===void 0)throw new Error("start should have been set during first phase");if(e.end===void 0)throw new Error("end should have been set during first phase");if(e.start>e.end)throw new Error(`Block start ${e.start} is greater than block end ${e.end}.`);if(e.end+1<=t*r)return[e,void 0];const s=t*r-1,n=t*r;return[{start:e.start,end:s,label:e.label,bits:s-e.start},{start:n,end:e.end,label:e.label,bits:e.end-n}]},"getNextFittingBlock"),B={parser:{yy:void 0},parse:g(async e=>{const t=await R("packet",e),r=B.parser?.yy;if(!(r instanceof $))throw new Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");x.debug(t),j(t,r)},"parse")},M=g((e,t,r,s)=>{const n=s.db,l=n.getConfig(),{rowHeight:a,paddingY:i,bitWidth:c,bitsPerRow:d}=l,p=n.getPacket(),o=n.getDiagramTitle(),h=a+i,b=h*(p.length+1)-(o?0:a),f=c*d+2,k=P(t);k.attr("viewbox",`0 0 ${f} ${b}`),z(k,b,f,l.useMaxWidth);for(const[C,v]of p.entries())q(k,v,C,l);k.append("text").text(o).attr("x",f/2).attr("y",b-h/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),q=g((e,t,r,{rowHeight:s,paddingX:n,paddingY:l,bitWidth:a,bitsPerRow:i,showBits:c})=>{const d=e.append("g"),p=r*(s+l)+l;for(const o of t){const h=o.start%i*a+1,b=(o.end-o.start+1)*a-n;if(d.append("rect").attr("x",h).attr("y",p).attr("width",b).attr("height",s).attr("class","packetBlock"),d.append("text").attr("x",h+b/2).attr("y",p+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(o.label),!c)continue;const f=o.end===o.start,k=p-2;d.append("text").attr("x",h+(f?b/2:0)).attr("y",k).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",f?"middle":"start").text(o.start),f||d.append("text").attr("x",h+b).attr("y",k).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(o.end)}},"drawWord"),G={draw:M},K={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},N=g(({packet:e}={})=>{const t=m(K,e);return`
	.packetByte {
		font-size: ${t.byteFontSize};
	}
	.packetByte.start {
		fill: ${t.startByteColor};
	}
	.packetByte.end {
		fill: ${t.endByteColor};
	}
	.packetLabel {
		fill: ${t.labelColor};
		font-size: ${t.labelFontSize};
	}
	.packetTitle {
		fill: ${t.titleColor};
		font-size: ${t.titleFontSize};
	}
	.packetBlock {
		stroke: ${t.blockStrokeColor};
		stroke-width: ${t.blockStrokeWidth};
		fill: ${t.blockFillColor};
	}
	`},"styles"),rt={parser:B,get db(){return new $},renderer:G,styles:N};export{rt as diagram};
//# sourceMappingURL=diagram-S2PKOQOG-NHKQ3-vz.js.map
