import{g as te}from"./chunk-55IACEB6-DwXKfw8q.js";import{s as ee}from"./chunk-QN33PNHL-Cz5Lnu9C.js";import{_ as h,l as T,c as N,r as se,u as ie,a as ne,b as re,g as ae,s as oe,q as ce,t as le,ab as he,k as z,z as de}from"./mermaid-Bezvo2Lx.js";try{X=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},(It=new X.Error().stack)&&(X._sentryDebugIds=X._sentryDebugIds||{},X._sentryDebugIds[It]="14c7fc1e-db43-451b-bf7c-11d1a9e8690d",X._sentryDebugIdIdentifier="sentry-dbid-14c7fc1e-db43-451b-bf7c-11d1a9e8690d")}catch{}var X,It,Tt=function(){var t=h(function(w,a,o,f){for(o=o||{},f=w.length;f--;o[w[f]]=a);return o},"o"),e=[1,2],s=[1,3],r=[1,4],n=[2,4],d=[1,9],u=[1,11],g=[1,16],p=[1,17],m=[1,18],S=[1,19],E=[1,33],L=[1,20],D=[1,21],l=[1,22],_=[1,23],A=[1,24],$=[1,26],B=[1,27],F=[1,28],P=[1,29],Z=[1,30],tt=[1,31],et=[1,32],st=[1,35],it=[1,36],nt=[1,37],rt=[1,38],U=[1,34],y=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],at=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,39,40,41,45,48,51,52,53,54,57],Dt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],gt={trace:h(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,CLICK:38,STRING:39,HREF:40,classDef:41,CLASSDEF_ID:42,CLASSDEF_STYLEOPTS:43,DEFAULT:44,style:45,STYLE_IDS:46,STYLEDEF_STYLEOPTS:47,class:48,CLASSENTITY_IDS:49,STYLECLASS:50,direction_tb:51,direction_bt:52,direction_rl:53,direction_lr:54,eol:55,";":56,EDGE_STATE:57,STYLE_SEPARATOR:58,left_of:59,right_of:60,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"CLICK",39:"STRING",40:"HREF",41:"classDef",42:"CLASSDEF_ID",43:"CLASSDEF_STYLEOPTS",44:"DEFAULT",45:"style",46:"STYLE_IDS",47:"STYLEDEF_STYLEOPTS",48:"class",49:"CLASSENTITY_IDS",50:"STYLECLASS",51:"direction_tb",52:"direction_bt",53:"direction_rl",54:"direction_lr",56:";",57:"EDGE_STATE",58:"STYLE_SEPARATOR",59:"left_of",60:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[9,5],[9,5],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[55,1],[55,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:h(function(w,a,o,f,b,i,C){var c=i.length-1;switch(b){case 3:return f.setRootDoc(i[c]),i[c];case 4:this.$=[];break;case 5:i[c]!="nl"&&(i[c-1].push(i[c]),this.$=i[c-1]);break;case 6:case 7:case 12:this.$=i[c];break;case 8:this.$="nl";break;case 13:const k=i[c-1];k.description=f.trimColon(i[c]),this.$=k;break;case 14:this.$={stmt:"relation",state1:i[c-2],state2:i[c]};break;case 15:const O=f.trimColon(i[c]);this.$={stmt:"relation",state1:i[c-3],state2:i[c-1],description:O};break;case 19:this.$={stmt:"state",id:i[c-3],type:"default",description:"",doc:i[c-1]};break;case 20:var G=i[c],W=i[c-2].trim();if(i[c].match(":")){var ct=i[c].split(":");G=ct[0],W=[W,ct[1]]}this.$={stmt:"state",id:G,type:"default",description:W};break;case 21:this.$={stmt:"state",id:i[c-3],type:"default",description:i[c-5],doc:i[c-1]};break;case 22:this.$={stmt:"state",id:i[c],type:"fork"};break;case 23:this.$={stmt:"state",id:i[c],type:"join"};break;case 24:this.$={stmt:"state",id:i[c],type:"choice"};break;case 25:this.$={stmt:"state",id:f.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:i[c-1].trim(),note:{position:i[c-2].trim(),text:i[c].trim()}};break;case 29:this.$=i[c].trim(),f.setAccTitle(this.$);break;case 30:case 31:this.$=i[c].trim(),f.setAccDescription(this.$);break;case 32:this.$={stmt:"click",id:i[c-3],url:i[c-2],tooltip:i[c-1]};break;case 33:this.$={stmt:"click",id:i[c-3],url:i[c-1],tooltip:""};break;case 34:case 35:this.$={stmt:"classDef",id:i[c-1].trim(),classes:i[c].trim()};break;case 36:this.$={stmt:"style",id:i[c-1].trim(),styleClass:i[c].trim()};break;case 37:this.$={stmt:"applyClass",id:i[c-1].trim(),styleClass:i[c].trim()};break;case 38:f.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:f.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:f.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:f.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:i[c].trim(),type:"default",description:""};break;case 46:case 47:this.$={stmt:"state",id:i[c-2].trim(),classes:[i[c].trim()],type:"default",description:""}}},"anonymous"),table:[{3:1,4:e,5:s,6:r},{1:[3]},{3:5,4:e,5:s,6:r},{3:6,4:e,5:s,6:r},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,41,45,48,51,52,53,54,57],n,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:d,5:u,8:8,9:10,10:12,11:13,12:14,13:15,16:g,17:p,19:m,22:S,24:E,25:L,26:D,27:l,28:_,29:A,32:25,33:$,35:B,37:F,38:P,41:Z,45:tt,48:et,51:st,52:it,53:nt,54:rt,57:U},t(y,[2,5]),{9:39,10:12,11:13,12:14,13:15,16:g,17:p,19:m,22:S,24:E,25:L,26:D,27:l,28:_,29:A,32:25,33:$,35:B,37:F,38:P,41:Z,45:tt,48:et,51:st,52:it,53:nt,54:rt,57:U},t(y,[2,7]),t(y,[2,8]),t(y,[2,9]),t(y,[2,10]),t(y,[2,11]),t(y,[2,12],{14:[1,40],15:[1,41]}),t(y,[2,16]),{18:[1,42]},t(y,[2,18],{20:[1,43]}),{23:[1,44]},t(y,[2,22]),t(y,[2,23]),t(y,[2,24]),t(y,[2,25]),{30:45,31:[1,46],59:[1,47],60:[1,48]},t(y,[2,28]),{34:[1,49]},{36:[1,50]},t(y,[2,31]),{13:51,24:E,57:U},{42:[1,52],44:[1,53]},{46:[1,54]},{49:[1,55]},t(at,[2,44],{58:[1,56]}),t(at,[2,45],{58:[1,57]}),t(y,[2,38]),t(y,[2,39]),t(y,[2,40]),t(y,[2,41]),t(y,[2,6]),t(y,[2,13]),{13:58,24:E,57:U},t(y,[2,17]),t(Dt,n,{7:59}),{24:[1,60]},{24:[1,61]},{23:[1,62]},{24:[2,48]},{24:[2,49]},t(y,[2,29]),t(y,[2,30]),{39:[1,63],40:[1,64]},{43:[1,65]},{43:[1,66]},{47:[1,67]},{50:[1,68]},{24:[1,69]},{24:[1,70]},t(y,[2,14],{14:[1,71]}),{4:d,5:u,8:8,9:10,10:12,11:13,12:14,13:15,16:g,17:p,19:m,21:[1,72],22:S,24:E,25:L,26:D,27:l,28:_,29:A,32:25,33:$,35:B,37:F,38:P,41:Z,45:tt,48:et,51:st,52:it,53:nt,54:rt,57:U},t(y,[2,20],{20:[1,73]}),{31:[1,74]},{24:[1,75]},{39:[1,76]},{39:[1,77]},t(y,[2,34]),t(y,[2,35]),t(y,[2,36]),t(y,[2,37]),t(at,[2,46]),t(at,[2,47]),t(y,[2,15]),t(y,[2,19]),t(Dt,n,{7:78}),t(y,[2,26]),t(y,[2,27]),{5:[1,79]},{5:[1,80]},{4:d,5:u,8:8,9:10,10:12,11:13,12:14,13:15,16:g,17:p,19:m,21:[1,81],22:S,24:E,25:L,26:D,27:l,28:_,29:A,32:25,33:$,35:B,37:F,38:P,41:Z,45:tt,48:et,51:st,52:it,53:nt,54:rt,57:U},t(y,[2,32]),t(y,[2,33]),t(y,[2,21])],defaultActions:{5:[2,1],6:[2,2],47:[2,48],48:[2,49]},parseError:h(function(w,a){if(!a.recoverable){var o=new Error(w);throw o.hash=a,o}this.trace(w)},"parseError"),parse:h(function(w){var a=this,o=[0],f=[],b=[null],i=[],C=this.table,c="",G=0,W=0,ct=i.slice.call(arguments,1),k=Object.create(this.lexer),O={yy:{}};for(var ft in this.yy)Object.prototype.hasOwnProperty.call(this.yy,ft)&&(O.yy[ft]=this.yy[ft]);k.setInput(w,O.yy),O.yy.lexer=k,O.yy.parser=this,k.yylloc===void 0&&(k.yylloc={});var mt=k.yylloc;i.push(mt);var Zt=k.options&&k.options.ranges;function Ct(){var I;return typeof(I=f.pop()||k.lex()||1)!="number"&&(I instanceof Array&&(I=(f=I).pop()),I=a.symbols_[I]||I),I}typeof O.yy.parseError=="function"?this.parseError=O.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError,h(function(I){o.length=o.length-2*I,b.length=b.length-I,i.length=i.length-I},"popStack"),h(Ct,"lex");for(var x,j,v,xt,lt,R,$t,ht,H={};;){if(j=o[o.length-1],this.defaultActions[j]?v=this.defaultActions[j]:(x==null&&(x=Ct()),v=C[j]&&C[j][x]),v===void 0||!v.length||!v[0]){var vt="";for(lt in ht=[],C[j])this.terminals_[lt]&&lt>2&&ht.push("'"+this.terminals_[lt]+"'");vt=k.showPosition?"Parse error on line "+(G+1)+`:
`+k.showPosition()+`
Expecting `+ht.join(", ")+", got '"+(this.terminals_[x]||x)+"'":"Parse error on line "+(G+1)+": Unexpected "+(x==1?"end of input":"'"+(this.terminals_[x]||x)+"'"),this.parseError(vt,{text:k.match,token:this.terminals_[x]||x,line:k.yylineno,loc:mt,expected:ht})}if(v[0]instanceof Array&&v.length>1)throw new Error("Parse Error: multiple actions possible at state: "+j+", token: "+x);switch(v[0]){case 1:o.push(x),b.push(k.yytext),i.push(k.yylloc),o.push(v[1]),x=null,W=k.yyleng,c=k.yytext,G=k.yylineno,mt=k.yylloc;break;case 2:if(R=this.productions_[v[1]][1],H.$=b[b.length-R],H._$={first_line:i[i.length-(R||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(R||1)].first_column,last_column:i[i.length-1].last_column},Zt&&(H._$.range=[i[i.length-(R||1)].range[0],i[i.length-1].range[1]]),(xt=this.performAction.apply(H,[c,W,G,O.yy,v[1],b,i].concat(ct)))!==void 0)return xt;R&&(o=o.slice(0,-1*R*2),b=b.slice(0,-1*R),i=i.slice(0,-1*R)),o.push(this.productions_[v[1]][0]),b.push(H.$),i.push(H._$),$t=C[o[o.length-2]][o[o.length-1]],o.push($t);break;case 3:return!0}}return!0},"parse")},Qt=function(){var w={EOF:1,parseError:h(function(a,o){if(!this.yy.parser)throw new Error(a);this.yy.parser.parseError(a,o)},"parseError"),setInput:h(function(a,o){return this.yy=o||this.yy||{},this._input=a,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:h(function(){var a=this._input[0];return this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a,a.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},"input"),unput:h(function(a){var o=a.length,f=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-o),this.offset-=o;var b=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===b.length?this.yylloc.first_column:0)+b[b.length-f.length].length-f[0].length:this.yylloc.first_column-o},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-o]),this.yyleng=this.yytext.length,this},"unput"),more:h(function(){return this._more=!0,this},"more"),reject:h(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:h(function(a){this.unput(this.match.slice(a))},"less"),pastInput:h(function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:h(function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:h(function(){var a=this.pastInput(),o=new Array(a.length+1).join("-");return a+this.upcomingInput()+`
`+o+"^"},"showPosition"),test_match:h(function(a,o){var f,b,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),(b=a[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=b.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:b?b[b.length-1].length-b[b.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+a[0].length},this.yytext+=a[0],this.match+=a[0],this.matches=a,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(a[0].length),this.matched+=a[0],f=this.performAction.call(this,this.yy,this,o,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var C in i)this[C]=i[C];return!1}return!1},"test_match"),next:h(function(){if(this.done)return this.EOF;var a,o,f,b;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),C=0;C<i.length;C++)if((f=this._input.match(this.rules[i[C]]))&&(!o||f[0].length>o[0].length)){if(o=f,b=C,this.options.backtrack_lexer){if((a=this.test_match(f,i[C]))!==!1)return a;if(this._backtrack){o=!1;continue}return!1}if(!this.options.flex)break}return o?(a=this.test_match(o,i[b]))!==!1&&a:this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:h(function(){var a=this.next();return a||this.lex()},"lex"),begin:h(function(a){this.conditionStack.push(a)},"begin"),popState:h(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:h(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:h(function(a){return(a=this.conditionStack.length-1-Math.abs(a||0))>=0?this.conditionStack[a]:"INITIAL"},"topState"),pushState:h(function(a){this.begin(a)},"pushState"),stateStackSize:h(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:h(function(a,o,f,b){switch(f){case 0:return 38;case 1:return 40;case 2:return 39;case 3:return 44;case 4:case 45:return 51;case 5:case 46:return 52;case 6:case 47:return 53;case 7:case 48:return 54;case 8:case 9:case 11:case 12:case 13:case 14:case 57:case 59:case 65:break;case 10:case 80:return 5;case 15:case 35:return this.pushState("SCALE"),17;case 16:case 36:return 18;case 17:case 23:case 37:case 52:case 55:this.popState();break;case 18:return this.begin("acc_title"),33;case 19:return this.popState(),"acc_title_value";case 20:return this.begin("acc_descr"),35;case 21:return this.popState(),"acc_descr_value";case 22:this.begin("acc_descr_multiline");break;case 24:return"acc_descr_multiline_value";case 25:return this.pushState("CLASSDEF"),41;case 26:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 27:return this.popState(),this.pushState("CLASSDEFID"),42;case 28:return this.popState(),43;case 29:return this.pushState("CLASS"),48;case 30:return this.popState(),this.pushState("CLASS_STYLE"),49;case 31:return this.popState(),50;case 32:return this.pushState("STYLE"),45;case 33:return this.popState(),this.pushState("STYLEDEF_STYLES"),46;case 34:return this.popState(),47;case 38:this.pushState("STATE");break;case 39:case 42:return this.popState(),o.yytext=o.yytext.slice(0,-8).trim(),25;case 40:case 43:return this.popState(),o.yytext=o.yytext.slice(0,-8).trim(),26;case 41:case 44:return this.popState(),o.yytext=o.yytext.slice(0,-10).trim(),27;case 49:this.pushState("STATE_STRING");break;case 50:return this.pushState("STATE_ID"),"AS";case 51:case 67:return this.popState(),"ID";case 53:return"STATE_DESCR";case 54:return 19;case 56:return this.popState(),this.pushState("struct"),20;case 58:return this.popState(),21;case 60:return this.begin("NOTE"),29;case 61:return this.popState(),this.pushState("NOTE_ID"),59;case 62:return this.popState(),this.pushState("NOTE_ID"),60;case 63:this.popState(),this.pushState("FLOATING_NOTE");break;case 64:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 66:return"NOTE_TEXT";case 68:return this.popState(),this.pushState("NOTE_TEXT"),24;case 69:return this.popState(),o.yytext=o.yytext.substr(2).trim(),31;case 70:return this.popState(),o.yytext=o.yytext.slice(0,-8).trim(),31;case 71:case 72:return 6;case 73:return 16;case 74:return 57;case 75:return 24;case 76:return o.yytext=o.yytext.trim(),14;case 77:return 15;case 78:return 28;case 79:return 58;case 81:return"INVALID"}},"anonymous"),rules:[/^(?:click\b)/i,/^(?:href\b)/i,/^(?:"[^"]*")/i,/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[12,13],inclusive:!1},struct:{rules:[12,13,25,29,32,38,45,46,47,48,57,58,59,60,74,75,76,77,78],inclusive:!1},FLOATING_NOTE_ID:{rules:[67],inclusive:!1},FLOATING_NOTE:{rules:[64,65,66],inclusive:!1},NOTE_TEXT:{rules:[69,70],inclusive:!1},NOTE_ID:{rules:[68],inclusive:!1},NOTE:{rules:[61,62,63],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[34],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[33],inclusive:!1},CLASS_STYLE:{rules:[31],inclusive:!1},CLASS:{rules:[30],inclusive:!1},CLASSDEFID:{rules:[28],inclusive:!1},CLASSDEF:{rules:[26,27],inclusive:!1},acc_descr_multiline:{rules:[23,24],inclusive:!1},acc_descr:{rules:[21],inclusive:!1},acc_title:{rules:[19],inclusive:!1},SCALE:{rules:[16,17,36,37],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[51],inclusive:!1},STATE_STRING:{rules:[52,53],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[12,13,39,40,41,42,43,44,49,50,54,55,56],inclusive:!1},ID:{rules:[12,13],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,18,20,22,25,29,32,35,38,56,60,71,72,73,74,75,76,77,79,80,81],inclusive:!0}}};return w}();function ot(){this.yy={}}return gt.lexer=Qt,h(ot,"Parser"),ot.prototype=gt,gt.Parser=ot,new ot}();Tt.parser=Tt;var Ce=Tt,J="state",V="root",_t="relation",q="default",jt="divider",zt="fill:none",Mt="fill: #333",Ut="text",Wt="normal",St="rect",bt="rectWithTitle",At="divider",Lt="roundedWithTitle",Q="statediagram",ue=`${Q}-state`,Ht="transition",pe=`${Ht} note-edge`,ye=`${Q}-note`,ge=`${Q}-cluster`,fe=`${Q}-cluster-alt`,Xt="parent",Vt="note",Et="----",me=`${Et}${Vt}`,wt=`${Et}${Xt}`,Jt=h((t,e="TB")=>{if(!t.doc)return e;let s=e;for(const r of t.doc)r.stmt==="dir"&&(s=r.value);return s},"getDir"),xe={getClasses:h(function(t,e){return e.db.getClasses()},"getClasses"),draw:h(async function(t,e,s,r){T.info("REF0:"),T.info("Drawing state diagram (v2)",e);const{securityLevel:n,state:d,layout:u}=N();r.db.extract(r.db.getRootDocV2());const g=r.db.getData(),p=te(e,n);g.type=r.type,g.layoutAlgorithm=u,g.nodeSpacing=d?.nodeSpacing||50,g.rankSpacing=d?.rankSpacing||50,g.markers=["barb"],g.diagramId=e,await se(g,p);try{(typeof r.db.getLinks=="function"?r.db.getLinks():new Map).forEach((m,S)=>{const E=typeof S=="string"?S:typeof S?.id=="string"?S.id:"";if(!E)return void T.warn("⚠️ Invalid or missing stateId from key:",JSON.stringify(S));const L=p.node()?.querySelectorAll("g");let D;if(L?.forEach($=>{$.textContent?.trim()===E&&(D=$)}),!D)return void T.warn("⚠️ Could not find node matching text:",E);const l=D.parentNode;if(!l)return void T.warn("⚠️ Node has no parent, cannot wrap:",E);const _=document.createElementNS("http://www.w3.org/2000/svg","a"),A=m.url.replace(/^"+|"+$/g,"");if(_.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",A),_.setAttribute("target","_blank"),m.tooltip){const $=m.tooltip.replace(/^"+|"+$/g,"");_.setAttribute("title",$)}l.replaceChild(_,D),_.appendChild(D),T.info("🔗 Wrapped node in <a> tag for:",E,m.url)})}catch(m){T.error("❌ Error injecting clickable links:",m)}ie.insertTitle(p,"statediagramTitleText",d?.titleTopMargin??25,r.db.getDiagramTitle()),ee(p,8,Q,d?.useMaxWidth??!0)},"draw"),getDir:Jt},ut=new Map,Y=0;function pt(t="",e=0,s="",r=Et){return`state-${t}${s!==null&&s.length>0?`${r}${s}`:""}-${e}`}h(pt,"stateDomId");var Se=h((t,e,s,r,n,d,u,g)=>{T.trace("items",e),e.forEach(p=>{switch(p.stmt){case J:case q:yt(t,p,s,r,n,d,u,g);break;case _t:{yt(t,p.state1,s,r,n,d,u,g),yt(t,p.state2,s,r,n,d,u,g);const m={id:"edge"+Y,start:p.state1.id,end:p.state2.id,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:zt,labelStyle:"",label:z.sanitizeText(p.description??"",N()),arrowheadStyle:Mt,labelpos:"c",labelType:Ut,thickness:Wt,classes:Ht,look:u};n.push(m),Y++}}})},"setupDoc"),Nt=h((t,e="TB")=>{let s=e;if(t.doc)for(const r of t.doc)r.stmt==="dir"&&(s=r.value);return s},"getDir");function K(t,e,s){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(n=>{const d=s.get(n);d&&(e.cssCompiledStyles=[...e.cssCompiledStyles??[],...d.styles])}));const r=t.find(n=>n.id===e.id);r?Object.assign(r,e):t.push(e)}function Kt(t){return t?.classes?.join(" ")??""}function qt(t){return t?.styles??[]}h(K,"insertOrUpdateNode"),h(Kt,"getClassesFromDbInfo"),h(qt,"getStylesFromDbInfo");var yt=h((t,e,s,r,n,d,u,g)=>{const p=e.id,m=s.get(p),S=Kt(m),E=qt(m),L=N();if(T.info("dataFetcher parsedItem",e,m,E),p!=="root"){let D=St;e.start===!0?D="stateStart":e.start===!1&&(D="stateEnd"),e.type!==q&&(D=e.type),ut.get(p)||ut.set(p,{id:p,shape:D,description:z.sanitizeText(p,L),cssClasses:`${S} ${ue}`,cssStyles:E});const l=ut.get(p);e.description&&(Array.isArray(l.description)?(l.shape=bt,l.description.push(e.description)):l.description?.length&&l.description.length>0?(l.shape=bt,l.description===p?l.description=[e.description]:l.description=[l.description,e.description]):(l.shape=St,l.description=e.description),l.description=z.sanitizeTextOrArray(l.description,L)),l.description?.length===1&&l.shape===bt&&(l.type==="group"?l.shape=Lt:l.shape=St),!l.type&&e.doc&&(T.info("Setting cluster for XCX",p,Nt(e)),l.type="group",l.isGroup=!0,l.dir=Nt(e),l.shape=e.type===jt?At:Lt,l.cssClasses=`${l.cssClasses} ${ge} ${d?fe:""}`);const _={labelStyle:"",shape:l.shape,label:l.description,cssClasses:l.cssClasses,cssCompiledStyles:[],cssStyles:l.cssStyles,id:p,dir:l.dir,domId:pt(p,Y),type:l.type,isGroup:l.type==="group",padding:8,rx:10,ry:10,look:u};if(_.shape===At&&(_.label=""),t&&t.id!=="root"&&(T.trace("Setting node ",p," to be child of its parent ",t.id),_.parentId=t.id),_.centerLabel=!0,e.note){const A={labelStyle:"",shape:"note",label:e.note.text,cssClasses:ye,cssStyles:[],cssCompiledStyles:[],id:p+me+"-"+Y,domId:pt(p,Y,Vt),type:l.type,isGroup:l.type==="group",padding:L.flowchart?.padding,look:u,position:e.note.position},$=p+wt,B={labelStyle:"",shape:"noteGroup",label:e.note.text,cssClasses:l.cssClasses,cssStyles:[],id:p+wt,domId:pt(p,Y,Xt),type:"group",isGroup:!0,padding:16,look:u,position:e.note.position};Y++,B.id=$,A.parentId=$,K(r,B,g),K(r,A,g),K(r,_,g);let F=p,P=A.id;e.note.position==="left of"&&(F=A.id,P=p),n.push({id:F+"-"+P,start:F,end:P,arrowhead:"none",arrowTypeEnd:"",style:zt,labelStyle:"",classes:pe,arrowheadStyle:Mt,labelpos:"c",labelType:Ut,thickness:Wt,look:u})}else K(r,_,g)}e.doc&&(T.trace("Adding nodes children "),Se(e,e.doc,s,r,n,!d,u,g))},"dataFetcher"),be=h(()=>{ut.clear(),Y=0},"reset"),kt="[*]",Ot="start",Rt="[*]",Bt="end",Ft="color",Pt="fill",ke="bgFill",Te=",",Yt=h(()=>new Map,"newClassesList"),Gt=h(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),dt=h(t=>JSON.parse(JSON.stringify(t)),"clone"),M,$e=(M=class{constructor(e){this.version=e,this.nodes=[],this.edges=[],this.rootDoc=[],this.classes=Yt(),this.documents={root:Gt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.dividerCnt=0,this.links=new Map,this.getAccTitle=ne,this.setAccTitle=re,this.getAccDescription=ae,this.setAccDescription=oe,this.setDiagramTitle=ce,this.getDiagramTitle=le,this.clear(),this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this)}extract(e){this.clear(!0);for(const n of Array.isArray(e)?e:e.doc)switch(n.stmt){case J:this.addState(n.id.trim(),n.type,n.doc,n.description,n.note);break;case _t:this.addRelation(n.state1,n.state2,n.description);break;case"classDef":this.addStyleClass(n.id.trim(),n.classes);break;case"style":this.handleStyleDef(n);break;case"applyClass":this.setCssClass(n.id.trim(),n.styleClass);break;case"click":this.addLink(n.id,n.url,n.tooltip)}const s=this.getStates(),r=N();be(),yt(void 0,this.getRootDocV2(),s,this.nodes,this.edges,!0,r.look,this.classes);for(const n of this.nodes)if(Array.isArray(n.label)){if(n.description=n.label.slice(1),n.isGroup&&n.description.length>0)throw new Error(`Group nodes can only have label. Remove the additional description for node [${n.id}]`);n.label=n.label[0]}}handleStyleDef(e){const s=e.id.trim().split(","),r=e.styleClass.split(",");for(const n of s){let d=this.getState(n);if(!d){const u=n.trim();this.addState(u),d=this.getState(u)}d&&(d.styles=r.map(u=>u.replace(/;/g,"")?.trim()))}}setRootDoc(e){T.info("Setting root doc",e),this.rootDoc=e,this.version===1?this.extract(e):this.extract(this.getRootDocV2())}docTranslator(e,s,r){if(s.stmt===_t)return this.docTranslator(e,s.state1,!0),void this.docTranslator(e,s.state2,!1);if(s.stmt===J&&(s.id===kt?(s.id=e.id+(r?"_start":"_end"),s.start=r):s.id=s.id.trim()),s.stmt!==V&&s.stmt!==J||!s.doc)return;const n=[];let d=[];for(const u of s.doc)if(u.type===jt){const g=dt(u);g.doc=dt(d),n.push(g),d=[]}else d.push(u);if(n.length>0&&d.length>0){const u={stmt:J,id:he(),type:"divider",doc:dt(d)};n.push(dt(u)),s.doc=n}s.doc.forEach(u=>this.docTranslator(s,u,!0))}getRootDocV2(){return this.docTranslator({id:V,stmt:V},{id:V,stmt:V,doc:this.rootDoc},!0),{id:V,doc:this.rootDoc}}addState(e,s=q,r=void 0,n=void 0,d=void 0,u=void 0,g=void 0,p=void 0){const m=e?.trim();if(this.currentDocument.states.has(m)){const S=this.currentDocument.states.get(m);if(!S)throw new Error(`State not found: ${m}`);S.doc||(S.doc=r),S.type||(S.type=s)}else T.info("Adding state ",m,n),this.currentDocument.states.set(m,{stmt:J,id:m,descriptions:[],type:s,doc:r,note:d,classes:[],styles:[],textStyles:[]});if(n&&(T.info("Setting state description",m,n),(Array.isArray(n)?n:[n]).forEach(S=>this.addDescription(m,S.trim()))),d){const S=this.currentDocument.states.get(m);if(!S)throw new Error(`State not found: ${m}`);S.note=d,S.note.text=z.sanitizeText(S.note.text,N())}u&&(T.info("Setting state classes",m,u),(Array.isArray(u)?u:[u]).forEach(S=>this.setCssClass(m,S.trim()))),g&&(T.info("Setting state styles",m,g),(Array.isArray(g)?g:[g]).forEach(S=>this.setStyle(m,S.trim()))),p&&(T.info("Setting state styles",m,g),(Array.isArray(p)?p:[p]).forEach(S=>this.setTextStyle(m,S.trim())))}clear(e){this.nodes=[],this.edges=[],this.documents={root:Gt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=Yt(),e||(this.links=new Map,de())}getState(e){return this.currentDocument.states.get(e)}getStates(){return this.currentDocument.states}logDocuments(){T.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}addLink(e,s,r){this.links.set(e,{url:s,tooltip:r}),T.warn("Adding link",e,s,r)}getLinks(){return this.links}startIdIfNeeded(e=""){return e===kt?(this.startEndCount++,`${Ot}${this.startEndCount}`):e}startTypeIfNeeded(e="",s=q){return e===kt?Ot:s}endIdIfNeeded(e=""){return e===Rt?(this.startEndCount++,`${Bt}${this.startEndCount}`):e}endTypeIfNeeded(e="",s=q){return e===Rt?Bt:s}addRelationObjs(e,s,r=""){const n=this.startIdIfNeeded(e.id.trim()),d=this.startTypeIfNeeded(e.id.trim(),e.type),u=this.startIdIfNeeded(s.id.trim()),g=this.startTypeIfNeeded(s.id.trim(),s.type);this.addState(n,d,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.addState(u,g,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),this.currentDocument.relations.push({id1:n,id2:u,relationTitle:z.sanitizeText(r,N())})}addRelation(e,s,r){if(typeof e=="object"&&typeof s=="object")this.addRelationObjs(e,s,r);else if(typeof e=="string"&&typeof s=="string"){const n=this.startIdIfNeeded(e.trim()),d=this.startTypeIfNeeded(e),u=this.endIdIfNeeded(s.trim()),g=this.endTypeIfNeeded(s);this.addState(n,d),this.addState(u,g),this.currentDocument.relations.push({id1:n,id2:u,relationTitle:r?z.sanitizeText(r,N()):void 0})}}addDescription(e,s){const r=this.currentDocument.states.get(e),n=s.startsWith(":")?s.replace(":","").trim():s;r?.descriptions?.push(z.sanitizeText(n,N()))}cleanupLabel(e){return e.startsWith(":")?e.slice(2).trim():e.trim()}getDividerId(){return this.dividerCnt++,`divider-id-${this.dividerCnt}`}addStyleClass(e,s=""){this.classes.has(e)||this.classes.set(e,{id:e,styles:[],textStyles:[]});const r=this.classes.get(e);s&&r&&s.split(Te).forEach(n=>{const d=n.replace(/([^;]*);/,"$1").trim();if(RegExp(Ft).exec(n)){const u=d.replace(Pt,ke).replace(Ft,Pt);r.textStyles.push(u)}r.styles.push(d)})}getClasses(){return this.classes}setCssClass(e,s){e.split(",").forEach(r=>{let n=this.getState(r);if(!n){const d=r.trim();this.addState(d),n=this.getState(d)}n?.classes?.push(s)})}setStyle(e,s){this.getState(e)?.styles?.push(s)}setTextStyle(e,s){this.getState(e)?.textStyles?.push(s)}getDirectionStatement(){return this.rootDoc.find(e=>e.stmt==="dir")}getDirection(){return this.getDirectionStatement()?.value??"TB"}setDirection(e){const s=this.getDirectionStatement();s?s.value=e:this.rootDoc.unshift({stmt:"dir",value:e})}trimColon(e){return e.startsWith(":")?e.slice(1).trim():e.trim()}getData(){const e=N();return{nodes:this.nodes,edges:this.edges,other:{},config:e,direction:Jt(this.getRootDocV2())}}getConfig(){return N().state}},h(M,"StateDB"),M.relationType={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},M),ve=h(t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${t.edgeLabelBackground};
  p {
    background-color: ${t.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${t.edgeLabelBackground};
    fill: ${t.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`,"getStyles");export{$e as S,Ce as a,xe as b,ve as s};
//# sourceMappingURL=chunk-DI55MBZ5-CMYfBtFY.js.map
