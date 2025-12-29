import{a as dt,g as ot,f as ft,d as gt}from"./chunk-TZMSLE5B-B839wmwz.js";import{g as mt}from"./chunk-FMBD7UC4-CQkqyW6z.js";import{_ as s,g as xt,s as kt,a as bt,b as _t,t as wt,q as vt,c as B,d as tt,e as $t,z as Tt}from"./mermaid-Bezvo2Lx.js";import{d as nt}from"./arc-DWsrh887.js";import"./Icon-CaBYD5oO.js";import"./index-DF_yYUtg.js";import"./_commonjsHelpers-CwkBNZ52.js";try{F=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},(Q=new F.Error().stack)&&(F._sentryDebugIds=F._sentryDebugIds||{},F._sentryDebugIds[Q]="c000e33d-2ed3-4d2d-97b4-f144d1669018",F._sentryDebugIdIdentifier="sentry-dbid-c000e33d-2ed3-4d2d-97b4-f144d1669018")}catch{}var F,Q,X=function(){var t=s(function(l,e,a,y){for(a=a||{},y=l.length;y--;a[l[y]]=e);return a},"o"),n=[6,8,10,11,12,14,16,17,18],o=[1,9],h=[1,10],i=[1,11],c=[1,12],p=[1,13],u=[1,14],f={trace:s(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:s(function(l,e,a,y,d,r,k){var x=r.length-1;switch(d){case 1:return r[x-1];case 2:case 6:case 7:this.$=[];break;case 3:r[x-1].push(r[x]),this.$=r[x-1];break;case 4:case 5:this.$=r[x];break;case 8:y.setDiagramTitle(r[x].substr(6)),this.$=r[x].substr(6);break;case 9:this.$=r[x].trim(),y.setAccTitle(this.$);break;case 10:case 11:this.$=r[x].trim(),y.setAccDescription(this.$);break;case 12:y.addSection(r[x].substr(8)),this.$=r[x].substr(8);break;case 13:y.addTask(r[x-1],r[x]),this.$="task"}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(n,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:o,12:h,14:i,16:c,17:p,18:u},t(n,[2,7],{1:[2,1]}),t(n,[2,3]),{9:15,11:o,12:h,14:i,16:c,17:p,18:u},t(n,[2,5]),t(n,[2,6]),t(n,[2,8]),{13:[1,16]},{15:[1,17]},t(n,[2,11]),t(n,[2,12]),{19:[1,18]},t(n,[2,4]),t(n,[2,9]),t(n,[2,10]),t(n,[2,13])],defaultActions:{},parseError:s(function(l,e){if(!e.recoverable){var a=new Error(l);throw a.hash=e,a}this.trace(l)},"parseError"),parse:s(function(l){var e=this,a=[0],y=[],d=[null],r=[],k=this.table,x="",E=0,P=0,yt=r.slice.call(arguments,1),b=Object.create(this.lexer),C={yy:{}};for(var Y in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Y)&&(C.yy[Y]=this.yy[Y]);b.setInput(l,C.yy),C.yy.lexer=b,C.yy.parser=this,b.yylloc===void 0&&(b.yylloc={});var q=b.yylloc;r.push(q);var pt=b.options&&b.options.ranges;function H(){var v;return typeof(v=y.pop()||b.lex()||1)!="number"&&(v instanceof Array&&(v=(y=v).pop()),v=e.symbols_[v]||v),v}typeof C.yy.parseError=="function"?this.parseError=C.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError,s(function(v){a.length=a.length-2*v,d.length=d.length-v,r.length=r.length-v},"popStack"),s(H,"lex");for(var _,A,w,Z,O,M,J,N,j={};;){if(A=a[a.length-1],this.defaultActions[A]?w=this.defaultActions[A]:(_==null&&(_=H()),w=k[A]&&k[A][_]),w===void 0||!w.length||!w[0]){var K="";for(O in N=[],k[A])this.terminals_[O]&&O>2&&N.push("'"+this.terminals_[O]+"'");K=b.showPosition?"Parse error on line "+(E+1)+`:
`+b.showPosition()+`
Expecting `+N.join(", ")+", got '"+(this.terminals_[_]||_)+"'":"Parse error on line "+(E+1)+": Unexpected "+(_==1?"end of input":"'"+(this.terminals_[_]||_)+"'"),this.parseError(K,{text:b.match,token:this.terminals_[_]||_,line:b.yylineno,loc:q,expected:N})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+A+", token: "+_);switch(w[0]){case 1:a.push(_),d.push(b.yytext),r.push(b.yylloc),a.push(w[1]),_=null,P=b.yyleng,x=b.yytext,E=b.yylineno,q=b.yylloc;break;case 2:if(M=this.productions_[w[1]][1],j.$=d[d.length-M],j._$={first_line:r[r.length-(M||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(M||1)].first_column,last_column:r[r.length-1].last_column},pt&&(j._$.range=[r[r.length-(M||1)].range[0],r[r.length-1].range[1]]),(Z=this.performAction.apply(j,[x,P,E,C.yy,w[1],d,r].concat(yt)))!==void 0)return Z;M&&(a=a.slice(0,-1*M*2),d=d.slice(0,-1*M),r=r.slice(0,-1*M)),a.push(this.productions_[w[1]][0]),d.push(j.$),r.push(j._$),J=k[a[a.length-2]][a[a.length-1]],a.push(J);break;case 3:return!0}}return!0},"parse")},g=function(){var l={EOF:1,parseError:s(function(e,a){if(!this.yy.parser)throw new Error(e);this.yy.parser.parseError(e,a)},"parseError"),setInput:s(function(e,a){return this.yy=a||this.yy||{},this._input=e,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:s(function(){var e=this._input[0];return this.yytext+=e,this.yyleng++,this.offset++,this.match+=e,this.matched+=e,e.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),e},"input"),unput:s(function(e){var a=e.length,y=e.split(/(?:\r\n?|\n)/g);this._input=e+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),y.length-1&&(this.yylineno-=y.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:y?(y.length===d.length?this.yylloc.first_column:0)+d[d.length-y.length].length-y[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},"unput"),more:s(function(){return this._more=!0,this},"more"),reject:s(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:s(function(e){this.unput(this.match.slice(e))},"less"),pastInput:s(function(){var e=this.matched.substr(0,this.matched.length-this.match.length);return(e.length>20?"...":"")+e.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:s(function(){var e=this.match;return e.length<20&&(e+=this._input.substr(0,20-e.length)),(e.substr(0,20)+(e.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:s(function(){var e=this.pastInput(),a=new Array(e.length+1).join("-");return e+this.upcomingInput()+`
`+a+"^"},"showPosition"),test_match:s(function(e,a){var y,d,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(d=e[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],y=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),y)return y;if(this._backtrack){for(var k in r)this[k]=r[k];return!1}return!1},"test_match"),next:s(function(){if(this.done)return this.EOF;var e,a,y,d;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var r=this._currentRules(),k=0;k<r.length;k++)if((y=this._input.match(this.rules[r[k]]))&&(!a||y[0].length>a[0].length)){if(a=y,d=k,this.options.backtrack_lexer){if((e=this.test_match(y,r[k]))!==!1)return e;if(this._backtrack){a=!1;continue}return!1}if(!this.options.flex)break}return a?(e=this.test_match(a,r[d]))!==!1&&e:this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:s(function(){var e=this.next();return e||this.lex()},"lex"),begin:s(function(e){this.conditionStack.push(e)},"begin"),popState:s(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:s(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:s(function(e){return(e=this.conditionStack.length-1-Math.abs(e||0))>=0?this.conditionStack[e]:"INITIAL"},"topState"),pushState:s(function(e){this.begin(e)},"pushState"),stateStackSize:s(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:s(function(e,a,y,d){switch(y){case 0:case 1:case 3:case 4:break;case 2:return 10;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return l}();function m(){this.yy={}}return f.lexer=g,s(m,"Parser"),m.prototype=f,f.Parser=m,new m}();X.parser=X;var Mt=X,V="",G=[],D=[],L=[],St=s(function(){G.length=0,D.length=0,V="",L.length=0,Tt()},"clear"),It=s(function(t){V=t,G.push(t)},"addSection"),Et=s(function(){return G},"getSections"),Ct=s(function(){let t=et(),n=0;for(;!t&&n<100;)t=et(),n++;return D.push(...L),D},"getTasks"),At=s(function(){const t=[];return D.forEach(n=>{n.people&&t.push(...n.people)}),[...new Set(t)].sort()},"updateActors"),Pt=s(function(t,n){const o=n.substr(1).split(":");let h=0,i=[];o.length===1?(h=Number(o[0]),i=[]):(h=Number(o[0]),i=o[1].split(","));const c=i.map(u=>u.trim()),p={section:V,type:V,people:c,task:t,score:h};L.push(p)},"addTask"),jt=s(function(t){const n={section:V,type:V,description:t,task:t,classes:[]};D.push(n)},"addTaskOrg"),et=s(function(){const t=s(function(o){return L[o].processed},"compileTask");let n=!0;for(const[o,h]of L.entries())t(o),n=n&&h.processed;return n},"compileTasks"),Ft=s(function(){return At()},"getActors"),it={getConfig:s(()=>B().journey,"getConfig"),clear:St,setDiagramTitle:vt,getDiagramTitle:wt,setAccTitle:_t,getAccTitle:bt,setAccDescription:kt,getAccDescription:xt,addSection:It,getSections:Et,getTasks:Ct,addTask:Pt,addTaskOrg:jt,getActors:Ft},Vt=s(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
  ${mt()}
`,"getStyles"),U=s(function(t,n){return gt(t,n)},"drawRect"),Bt=s(function(t,n){const h=t.append("circle").attr("cx",n.cx).attr("cy",n.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),i=t.append("g");function c(f){const g=nt().startAngle(Math.PI/2).endAngle(Math.PI/2*3).innerRadius(7.5).outerRadius(6.8181818181818175);f.append("path").attr("class","mouth").attr("d",g).attr("transform","translate("+n.cx+","+(n.cy+2)+")")}function p(f){const g=nt().startAngle(3*Math.PI/2).endAngle(Math.PI/2*5).innerRadius(7.5).outerRadius(6.8181818181818175);f.append("path").attr("class","mouth").attr("d",g).attr("transform","translate("+n.cx+","+(n.cy+7)+")")}function u(f){f.append("line").attr("class","mouth").attr("stroke",2).attr("x1",n.cx-5).attr("y1",n.cy+7).attr("x2",n.cx+5).attr("y2",n.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return i.append("circle").attr("cx",n.cx-5).attr("cy",n.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),i.append("circle").attr("cx",n.cx+5).attr("cy",n.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),s(c,"smile"),s(p,"sad"),s(u,"ambivalent"),n.score>3?c(i):n.score<3?p(i):u(i),h},"drawFace"),lt=s(function(t,n){const o=t.append("circle");return o.attr("cx",n.cx),o.attr("cy",n.cy),o.attr("class","actor-"+n.pos),o.attr("fill",n.fill),o.attr("stroke",n.stroke),o.attr("r",n.r),o.class!==void 0&&o.attr("class",o.class),n.title!==void 0&&o.append("title").text(n.title),o},"drawCircle"),ct=s(function(t,n){return ft(t,n)},"drawText"),Dt=s(function(t,n){function o(i,c,p,u,f){return i+","+c+" "+(i+p)+","+c+" "+(i+p)+","+(c+u-f)+" "+(i+p-1.2*f)+","+(c+u)+" "+i+","+(c+u)}s(o,"genPoints");const h=t.append("polygon");h.attr("points",o(n.x,n.y,50,20,7)),h.attr("class","labelBox"),n.y=n.y+n.labelMargin,n.x=n.x+.5*n.labelMargin,ct(t,n)},"drawLabel"),Lt=s(function(t,n,o){const h=t.append("g"),i=ot();i.x=n.x,i.y=n.y,i.fill=n.fill,i.width=o.width*n.taskCount+o.diagramMarginX*(n.taskCount-1),i.height=o.height,i.class="journey-section section-type-"+n.num,i.rx=3,i.ry=3,U(h,i),ht(o)(n.text,h,i.x,i.y,i.width,i.height,{class:"journey-section section-type-"+n.num},o,n.colour)},"drawSection"),st=-1,Rt=s(function(t,n,o){const h=n.x+o.width/2,i=t.append("g");st++,i.append("line").attr("id","task"+st).attr("x1",h).attr("y1",n.y).attr("x2",h).attr("y2",450).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Bt(i,{cx:h,cy:300+30*(5-n.score),score:n.score});const c=ot();c.x=n.x,c.y=n.y,c.fill=n.fill,c.width=o.width,c.height=o.height,c.class="task task-type-"+n.num,c.rx=3,c.ry=3,U(i,c);let p=n.x+14;n.people.forEach(u=>{const f=n.actors[u].color,g={cx:p,cy:n.y,r:7,fill:f,stroke:"#000",title:u,pos:n.actors[u].position};lt(i,g),p+=10}),ht(o)(n.task,i,c.x,c.y,c.width,c.height,{class:"task"},o,n.colour)},"drawTask"),Ot=s(function(t,n){dt(t,n)},"drawBackgroundRect"),ht=function(){function t(i,c,p,u,f,g,m,l){h(c.append("text").attr("x",p+f/2).attr("y",u+g/2+5).style("font-color",l).style("text-anchor","middle").text(i),m)}function n(i,c,p,u,f,g,m,l,e){const{taskFontSize:a,taskFontFamily:y}=l,d=i.split(/<br\s*\/?>/gi);for(let r=0;r<d.length;r++){const k=r*a-a*(d.length-1)/2,x=c.append("text").attr("x",p+f/2).attr("y",u).attr("fill",e).style("text-anchor","middle").style("font-size",a).style("font-family",y);x.append("tspan").attr("x",p+f/2).attr("dy",k).text(d[r]),x.attr("y",u+g/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),h(x,m)}}function o(i,c,p,u,f,g,m,l){const e=c.append("switch"),a=e.append("foreignObject").attr("x",p).attr("y",u).attr("width",f).attr("height",g).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");a.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(i),n(i,e,p,u,f,g,m,l),h(a,m)}function h(i,c){for(const p in c)p in c&&i.attr(p,c[p])}return s(t,"byText"),s(n,"byTspan"),s(o,"byFo"),s(h,"_setTextAttrs"),function(i){return i.textPlacement==="fo"?o:i.textPlacement==="old"?t:n}}(),R={drawRect:U,drawCircle:lt,drawSection:Lt,drawText:ct,drawLabel:Dt,drawTask:Rt,drawBackgroundRect:Ot,initGraphics:s(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics")},Nt=s(function(t){Object.keys(t).forEach(function(n){T[n]=t[n]})},"setConf"),S={},z=0;function ut(t){const n=B().journey,o=n.maxLabelWidth;z=0;let h=60;Object.keys(S).forEach(i=>{const c=S[i].color,p={cx:20,cy:h,r:7,fill:c,stroke:"#000",pos:S[i].position};R.drawCircle(t,p);let u=t.append("text").attr("visibility","hidden").text(i);const f=u.node().getBoundingClientRect().width;u.remove();let g=[];if(f<=o)g=[i];else{const m=i.split(" ");let l="";u=t.append("text").attr("visibility","hidden"),m.forEach(e=>{const a=l?`${l} ${e}`:e;if(u.text(a),u.node().getBoundingClientRect().width>o){if(l&&g.push(l),l=e,u.text(e),u.node().getBoundingClientRect().width>o){let y="";for(const d of e)y+=d,u.text(y+"-"),u.node().getBoundingClientRect().width>o&&(g.push(y.slice(0,-1)+"-"),y=d);l=y}}else l=a}),l&&g.push(l),u.remove()}g.forEach((m,l)=>{const e={x:40,y:h+7+20*l,fill:"#666",text:m,textMargin:n.boxTextMargin??5},a=R.drawText(t,e).node().getBoundingClientRect().width;a>z&&a>n.leftMargin-a&&(z=a)}),h+=Math.max(20,20*g.length)})}s(ut,"drawActorLegend");var T=B().journey,I=0,zt=s(function(t,n,o,h){const i=B(),c=i.journey.titleColor,p=i.journey.titleFontSize,u=i.journey.titleFontFamily,f=i.securityLevel;let g;f==="sandbox"&&(g=tt("#i"+n));const m=tt(f==="sandbox"?g.nodes()[0].contentDocument.body:"body");$.init();const l=m.select("#"+n);R.initGraphics(l);const e=h.db.getTasks(),a=h.db.getDiagramTitle(),y=h.db.getActors();for(const P in S)delete S[P];let d=0;y.forEach(P=>{S[P]={color:T.actorColours[d%T.actorColours.length],position:d},d++}),ut(l),I=T.leftMargin+z,$.insert(0,0,I,50*Object.keys(S).length),Yt(l,e,0);const r=$.getBounds();a&&l.append("text").text(a).attr("x",I).attr("font-size",p).attr("font-weight","bold").attr("y",25).attr("fill",c).attr("font-family",u);const k=r.stopy-r.starty+2*T.diagramMarginY,x=I+r.stopx+2*T.diagramMarginX;$t(l,k,x,T.useMaxWidth),l.append("line").attr("x1",I).attr("y1",4*T.height).attr("x2",x-I-4).attr("y2",4*T.height).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const E=a?70:0;l.attr("viewBox",`${r.startx} -25 ${x} ${k+E}`),l.attr("preserveAspectRatio","xMinYMin meet"),l.attr("height",k+E+25)},"draw"),$={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:s(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:s(function(t,n,o,h){t[n]===void 0?t[n]=o:t[n]=h(o,t[n])},"updateVal"),updateBounds:s(function(t,n,o,h){const i=B().journey,c=this;let p=0;function u(f){return s(function(g){p++;const m=c.sequenceItems.length-p+1;c.updateVal(g,"starty",n-m*i.boxMargin,Math.min),c.updateVal(g,"stopy",h+m*i.boxMargin,Math.max),c.updateVal($.data,"startx",t-m*i.boxMargin,Math.min),c.updateVal($.data,"stopx",o+m*i.boxMargin,Math.max),f!=="activation"&&(c.updateVal(g,"startx",t-m*i.boxMargin,Math.min),c.updateVal(g,"stopx",o+m*i.boxMargin,Math.max),c.updateVal($.data,"starty",n-m*i.boxMargin,Math.min),c.updateVal($.data,"stopy",h+m*i.boxMargin,Math.max))},"updateItemBounds")}s(u,"updateFn"),this.sequenceItems.forEach(u())},"updateBounds"),insert:s(function(t,n,o,h){const i=Math.min(t,o),c=Math.max(t,o),p=Math.min(n,h),u=Math.max(n,h);this.updateVal($.data,"startx",i,Math.min),this.updateVal($.data,"starty",p,Math.min),this.updateVal($.data,"stopx",c,Math.max),this.updateVal($.data,"stopy",u,Math.max),this.updateBounds(i,p,c,u)},"insert"),bumpVerticalPos:s(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:s(function(){return this.verticalPos},"getVerticalPos"),getBounds:s(function(){return this.data},"getBounds")},W=T.sectionFills,at=T.sectionColours,Yt=s(function(t,n,o){const h=B().journey;let i="";const c=o+(2*h.height+h.diagramMarginY);let p=0,u="#CCC",f="black",g=0;for(const[m,l]of n.entries()){if(i!==l.section){u=W[p%W.length],g=p%W.length,f=at[p%at.length];let a=0;const y=l.section;for(let r=m;r<n.length&&n[r].section==y;r++)a+=1;const d={x:m*h.taskMargin+m*h.width+I,y:50,text:l.section,fill:u,num:g,colour:f,taskCount:a};R.drawSection(t,d,h),i=l.section,p++}const e=l.people.reduce((a,y)=>(S[y]&&(a[y]=S[y]),a),{});l.x=m*h.taskMargin+m*h.width+I,l.y=c,l.width=h.diagramMarginX,l.height=h.diagramMarginY,l.colour=f,l.fill=u,l.num=g,l.actors=e,R.drawTask(t,l,h),$.insert(l.x,l.y,l.x+l.width+h.taskMargin,450)}},"drawTasks"),rt={setConf:Nt,draw:zt},Jt={parser:Mt,db:it,renderer:rt,styles:Vt,init:s(t=>{rt.setConf(t.journey),it.clear()},"init")};export{Jt as diagram};
//# sourceMappingURL=journeyDiagram-XKPGCS4Q-D0ybw7xb.js.map
