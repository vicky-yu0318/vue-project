(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-333c26e1"],{"057f":function(t,e,c){var n=c("c6b6"),r=c("fc6a"),o=c("241c").f,a=c("4dae"),i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(e){return a(i)}};t.exports.f=function(t){return i&&"Window"==n(t)?s(t):o(r(t))}},1593:function(t,e,c){"use strict";c.r(e);var n=c("7a23"),r={class:"section section-order"},o={class:"container"},a=Object(n["h"])("caption",{class:"theme-title"}," 訂單資料 ",-1),i=Object(n["h"])("tr",null,[Object(n["h"])("th",{scope:"col"},"訂單號碼"),Object(n["h"])("th",{scope:"col"},"購買人email"),Object(n["h"])("th",{scope:"col"},"購買時間"),Object(n["h"])("th",{scope:"col",width:"20%"},"購買商品內容"),Object(n["h"])("th",{scope:"col"},"應收金額"),Object(n["h"])("th",{scope:"col"},"訂單收款狀態"),Object(n["h"])("th",{scope:"col"},"編輯/刪除")],-1),s={key:0},l={style:{"text-align":"left"}},u={key:0},b={key:0},d={key:0},O={key:1},f=["onClick"],h=["onClick"];function p(t,e,c,p,j,g){var m=Object(n["J"])("Pagination"),v=Object(n["J"])("OrderModal");return Object(n["B"])(),Object(n["g"])(n["a"],null,[Object(n["h"])("section",r,[Object(n["h"])("div",o,[Object(n["h"])("button",{type:"button",class:"btn",onClick:e[0]||(e[0]=function(){return g.deleteAllOrder&&g.deleteAllOrder.apply(g,arguments)})},"刪除全部訂單"),Object(n["h"])("table",null,[a,i,(Object(n["B"])(!0),Object(n["g"])(n["a"],null,Object(n["H"])(j.orders,(function(e){return Object(n["B"])(),Object(n["g"])("tr",{key:e.id},[Object(n["h"])("td",null,Object(n["M"])(e.id),1),e.user?(Object(n["B"])(),Object(n["g"])("td",s,Object(n["M"])(e.user.email),1)):Object(n["f"])("",!0),Object(n["h"])("td",null,Object(n["M"])(t.$filters.date(e.create_at)),1),Object(n["h"])("td",l,[(Object(n["B"])(!0),Object(n["g"])(n["a"],null,Object(n["H"])(e.products,(function(t){return Object(n["B"])(),Object(n["g"])("div",{key:t},[Object(n["j"])(Object(n["M"])(t.product.title)+"=> "+Object(n["M"])(t.qty)+"*"+Object(n["M"])(t.product.price)+" ",1),t.coupon?(Object(n["B"])(),Object(n["g"])("span",u,"*"+Object(n["M"])(t.coupon.percent/100),1)):Object(n["f"])("",!0),Object(n["j"])(" = "+Object(n["M"])(t.final_total),1)])})),128)),e.total<850?(Object(n["B"])(),Object(n["g"])("div",b,"運費=> $100")):Object(n["f"])("",!0)]),Object(n["h"])("td",null,[e.total<850?(Object(n["B"])(),Object(n["g"])("span",d,"$"+Object(n["M"])(e.total+100),1)):(Object(n["B"])(),Object(n["g"])("span",O,"$"+Object(n["M"])(e.total),1))]),Object(n["h"])("td",null,Object(n["M"])(e.is_paid?"是":"否"),1),Object(n["h"])("td",null,[Object(n["h"])("button",{type:"button",class:"btn",onClick:function(t){return g.openModal(e)}},"編輯",8,f),Object(n["h"])("button",{type:"button",class:"btn",onClick:function(t){return g.deleteOrder(e)}},"刪除",8,h)])])})),128))])])]),Object(n["k"])(m,{pages:j.pagination,onEmitPage:g.getOrders},null,8,["pages","onEmitPage"]),Object(n["k"])(v,{ref:"orderModal",orders:j.tempOrder,onEmitOrder:g.updateOrder},null,8,["orders","onEmitOrder"])],64)}var j=c("5530"),g=(c("99af"),c("1799")),m={class:"container"},v={class:"orderModal"},y={class:"modal-header"},M=Object(n["h"])("div",{class:"modal-title"},"訂單資料",-1),k={class:"modal-body"},w={class:"row"},P={class:"col"},S=Object(n["h"])("h3",null,"用戶資料",-1),$={class:"table"},B={key:0},_=Object(n["h"])("th",null,"姓名",-1),C=Object(n["h"])("th",null,"email",-1),x=Object(n["h"])("th",null,"電話",-1),E=Object(n["h"])("th",null,"地址",-1),D={class:"col"},J=Object(n["h"])("h3",null,"訂單細節",-1),A={class:"table"},N=Object(n["h"])("th",null,"訂單編號",-1),H=Object(n["h"])("th",null,"下單時間",-1),X=Object(n["h"])("th",null,"付款狀態",-1),F={key:0},T={key:1},W=Object(n["h"])("th",null,"總金額",-1),q={class:"input-field"},I={for:"is_paid"},Q={key:0},U={key:1},V={class:"modal-footer"};function z(t,e,c,r,o,a){return Object(n["B"])(),Object(n["g"])("section",{class:Object(n["s"])(["section section-orderModal",{active:o.isModal}])},[Object(n["h"])("div",m,[Object(n["h"])("div",v,[Object(n["h"])("div",y,[M,Object(n["h"])("div",{class:"fas fa-times",id:"btn-closeModal",onClick:e[0]||(e[0]=function(t){return o.isModal=!1})})]),Object(n["h"])("div",k,[Object(n["h"])("div",w,[Object(n["h"])("div",P,[S,Object(n["h"])("table",$,[o.tempOrder.user?(Object(n["B"])(),Object(n["g"])("tbody",B,[Object(n["h"])("tr",null,[_,Object(n["h"])("td",null,Object(n["M"])(o.tempOrder.id),1)]),Object(n["h"])("tr",null,[C,Object(n["h"])("td",null,Object(n["M"])(o.tempOrder.user.email),1)]),Object(n["h"])("tr",null,[x,Object(n["h"])("td",null,Object(n["M"])(o.tempOrder.user.tel),1)]),Object(n["h"])("tr",null,[E,Object(n["h"])("td",null,Object(n["M"])(o.tempOrder.user.address),1)])])):Object(n["f"])("",!0)])]),Object(n["h"])("div",D,[J,Object(n["h"])("table",A,[Object(n["h"])("tbody",null,[Object(n["h"])("tr",null,[N,Object(n["h"])("td",null,Object(n["M"])(o.tempOrder.id),1)]),Object(n["h"])("tr",null,[H,Object(n["h"])("td",null,Object(n["M"])(t.$filters.date(o.tempOrder.create_at)),1)]),Object(n["h"])("tr",null,[X,Object(n["h"])("td",null,[o.tempOrder.is_paid?(Object(n["B"])(),Object(n["g"])("strong",F,"已付款")):(Object(n["B"])(),Object(n["g"])("span",T,"尚未付款"))])]),Object(n["h"])("tr",null,[W,Object(n["h"])("td",null,"$"+Object(n["M"])(o.tempOrder.total),1)])])]),Object(n["h"])("div",q,[Object(n["W"])(Object(n["h"])("input",{type:"checkbox",id:"is_paid","onUpdate:modelValue":e[1]||(e[1]=function(t){return o.tempOrder.is_paid=t})},null,512),[[n["P"],o.tempOrder.is_paid]]),Object(n["h"])("label",I,[o.tempOrder.is_paid?(Object(n["B"])(),Object(n["g"])("span",Q,"已付款")):(Object(n["B"])(),Object(n["g"])("span",U,"未付款"))])])])])]),Object(n["h"])("div",V,[Object(n["h"])("button",{type:"button",class:"btn",onClick:e[2]||(e[2]=function(){return a.closeModal&&a.closeModal.apply(a,arguments)})},"取消"),Object(n["h"])("button",{type:"button",class:"btn",onClick:e[3]||(e[3]=function(e){return t.$emit("emit-order",o.tempOrder)})},"修改付款狀態")])])])],2)}var G={data:function(){return{isModal:!1,tempOrder:{}}},props:["orders"],methods:{openModal:function(){this.isModal=!0},closeModal:function(){this.isModal=!1}},watch:{orders:function(){this.tempOrder=this.orders}}},K=c("6b0d"),L=c.n(K);const R=L()(G,[["render",z]]);var Y=R,Z={data:function(){return{orders:[],pagination:"",tempOrder:{}}},components:{Pagination:g["a"],OrderModal:Y},mounted:function(){this.getOrders()},methods:{getOrders:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("freedom","/admin/orders?page=").concat(e);this.$http.get(c).then((function(e){e.data.success?(t.orders=e.data.orders,t.pagination=e.data.pagination):t.$httpMessageState(e,"接收訂單清單")})).catch((function(e){t.$httpMessageState(e,"接收訂單清單")}))},openModal:function(t){this.$refs.orderModal.openModal(),this.tempOrder=Object(j["a"])({},t)},updateOrder:function(t){var e=this,c={is_paid:t.is_paid},n="更新訂單內容",r="".concat("https://vue3-course-api.hexschool.io/","api/").concat("freedom","/admin/order/").concat(t.id);this.$http.put(r,{data:c}).then((function(t){t.data.success?(e.$httpMessageState(t,n),e.getOrders(),e.$refs.orderModal.closeModal()):e.$httpMessageState(t,n)})).catch((function(t){e.$httpMessageState(t,n)}))},deleteOrder:function(t){var e=this,c="刪除訂單",n="".concat("https://vue3-course-api.hexschool.io/","api/").concat("freedom","/admin/order/").concat(t.id);this.$http.delete(n).then((function(t){t.data.success?(e.$httpMessageState(t,c),e.getOrders()):e.$httpMessageState(t,c)})).catch((function(t){e.$httpMessageState(t,c)}))},deleteAllOrder:function(){var t=this,e="刪除全部訂單",c="".concat("https://vue3-course-api.hexschool.io/","api/").concat("freedom","/admin/orders/all");this.$http.delete(c).then((function(c){c.data.success?(t.$httpMessageState(c,e),t.getOrders()):t.$httpMessageState(c,e)})).catch((function(c){t.$httpMessageState(c,e)}))}}};const tt=L()(Z,[["render",p]]);e["default"]=tt},1799:function(t,e,c){"use strict";var n=c("7a23"),r={class:"section section-pagination"},o={class:"container"},a={class:"pagination"},i=Object(n["h"])("i",{class:"fas fa-angle-left"},null,-1),s=[i],l={key:0,href:"",class:"page-link"},u=["onClick"],b=Object(n["h"])("i",{class:"fas fa-angle-right"},null,-1),d=[b];function O(t,e,c,i,b,O){return Object(n["B"])(),Object(n["g"])("section",r,[Object(n["h"])("div",o,[Object(n["h"])("ul",a,[Object(n["h"])("li",{class:Object(n["s"])(["page-item",{disabled:1===c.pages.current_page}])},[Object(n["h"])("a",{onClick:e[0]||(e[0]=Object(n["X"])((function(t){return O.emitPage(c.pages.current_page-1)}),["prevent"])),class:"page-link"},s)],2),(Object(n["B"])(!0),Object(n["g"])(n["a"],null,Object(n["H"])(c.pages.total_pages,(function(t){return Object(n["B"])(),Object(n["g"])("li",{class:Object(n["s"])(["page-item",{active:c.pages.current_page===t}]),key:t},[c.pages.current_page===t?(Object(n["B"])(),Object(n["g"])("span",l,Object(n["M"])(t),1)):(Object(n["B"])(),Object(n["g"])("a",{key:1,onClick:Object(n["X"])((function(e){return O.emitPage(t)}),["prevent"]),class:"page-link"},Object(n["M"])(t),9,u))],2)})),128)),Object(n["h"])("li",{class:Object(n["s"])(["page-item",{disabled:c.pages.current_page===c.pages.total_pages}])},[Object(n["h"])("a",{onClick:e[1]||(e[1]=Object(n["X"])((function(t){return O.emitPage(c.pages.current_page+1)}),["prevent"])),class:"page-link"},d)],2)])])])}var f={props:["pages"],mounted:function(){},methods:{emitPage:function(t){this.$emit("emit-page",t)}}},h=c("6b0d"),p=c.n(h);const j=p()(f,[["render",O]]);e["a"]=j},"428f":function(t,e,c){var n=c("da84");t.exports=n},"4de4":function(t,e,c){"use strict";var n=c("23e7"),r=c("b727").filter,o=c("1dde"),a=o("filter");n({target:"Array",proto:!0,forced:!a},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,c){"use strict";c.d(e,"a",(function(){return o}));c("b64b"),c("a4d3"),c("4de4"),c("d3b7"),c("e439"),c("159b"),c("dbb4");function n(t,e,c){return e in t?Object.defineProperty(t,e,{value:c,enumerable:!0,configurable:!0,writable:!0}):t[e]=c,t}function r(t,e){var c=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),c.push.apply(c,n)}return c}function o(t){for(var e=1;e<arguments.length;e++){var c=null!=arguments[e]?arguments[e]:{};e%2?r(Object(c),!0).forEach((function(e){n(t,e,c[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(c)):r(Object(c)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(c,e))}))}return t}},"746f":function(t,e,c){var n=c("428f"),r=c("1a2d"),o=c("e538"),a=c("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});r(e,t)||a(e,t,{value:o.f(t)})}},"99af":function(t,e,c){"use strict";var n=c("23e7"),r=c("da84"),o=c("d039"),a=c("e8b5"),i=c("861d"),s=c("7b0b"),l=c("07fa"),u=c("8418"),b=c("65f0"),d=c("1dde"),O=c("b622"),f=c("2d00"),h=O("isConcatSpreadable"),p=9007199254740991,j="Maximum allowed index exceeded",g=r.TypeError,m=f>=51||!o((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),v=d("concat"),y=function(t){if(!i(t))return!1;var e=t[h];return void 0!==e?!!e:a(t)},M=!m||!v;n({target:"Array",proto:!0,forced:M},{concat:function(t){var e,c,n,r,o,a=s(this),i=b(a,0),d=0;for(e=-1,n=arguments.length;e<n;e++)if(o=-1===e?a:arguments[e],y(o)){if(r=l(o),d+r>p)throw g(j);for(c=0;c<r;c++,d++)c in o&&u(i,d,o[c])}else{if(d>=p)throw g(j);u(i,d++,o)}return i.length=d,i}})},a4d3:function(t,e,c){"use strict";var n=c("23e7"),r=c("da84"),o=c("d066"),a=c("2ba4"),i=c("c65b"),s=c("e330"),l=c("c430"),u=c("83ab"),b=c("4930"),d=c("d039"),O=c("1a2d"),f=c("e8b5"),h=c("1626"),p=c("861d"),j=c("3a9b"),g=c("d9b5"),m=c("825a"),v=c("7b0b"),y=c("fc6a"),M=c("a04b"),k=c("577e"),w=c("5c6c"),P=c("7c73"),S=c("df75"),$=c("241c"),B=c("057f"),_=c("7418"),C=c("06cf"),x=c("9bf2"),E=c("d1e7"),D=c("f36a"),J=c("6eeb"),A=c("5692"),N=c("f772"),H=c("d012"),X=c("90e3"),F=c("b622"),T=c("e538"),W=c("746f"),q=c("d44e"),I=c("69f3"),Q=c("b727").forEach,U=N("hidden"),V="Symbol",z="prototype",G=F("toPrimitive"),K=I.set,L=I.getterFor(V),R=Object[z],Y=r.Symbol,Z=Y&&Y[z],tt=r.TypeError,et=r.QObject,ct=o("JSON","stringify"),nt=C.f,rt=x.f,ot=B.f,at=E.f,it=s([].push),st=A("symbols"),lt=A("op-symbols"),ut=A("string-to-symbol-registry"),bt=A("symbol-to-string-registry"),dt=A("wks"),Ot=!et||!et[z]||!et[z].findChild,ft=u&&d((function(){return 7!=P(rt({},"a",{get:function(){return rt(this,"a",{value:7}).a}})).a}))?function(t,e,c){var n=nt(R,e);n&&delete R[e],rt(t,e,c),n&&t!==R&&rt(R,e,n)}:rt,ht=function(t,e){var c=st[t]=P(Z);return K(c,{type:V,tag:t,description:e}),u||(c.description=e),c},pt=function(t,e,c){t===R&&pt(lt,e,c),m(t);var n=M(e);return m(c),O(st,n)?(c.enumerable?(O(t,U)&&t[U][n]&&(t[U][n]=!1),c=P(c,{enumerable:w(0,!1)})):(O(t,U)||rt(t,U,w(1,{})),t[U][n]=!0),ft(t,n,c)):rt(t,n,c)},jt=function(t,e){m(t);var c=y(e),n=S(c).concat(Mt(c));return Q(n,(function(e){u&&!i(mt,c,e)||pt(t,e,c[e])})),t},gt=function(t,e){return void 0===e?P(t):jt(P(t),e)},mt=function(t){var e=M(t),c=i(at,this,e);return!(this===R&&O(st,e)&&!O(lt,e))&&(!(c||!O(this,e)||!O(st,e)||O(this,U)&&this[U][e])||c)},vt=function(t,e){var c=y(t),n=M(e);if(c!==R||!O(st,n)||O(lt,n)){var r=nt(c,n);return!r||!O(st,n)||O(c,U)&&c[U][n]||(r.enumerable=!0),r}},yt=function(t){var e=ot(y(t)),c=[];return Q(e,(function(t){O(st,t)||O(H,t)||it(c,t)})),c},Mt=function(t){var e=t===R,c=ot(e?lt:y(t)),n=[];return Q(c,(function(t){!O(st,t)||e&&!O(R,t)||it(n,st[t])})),n};if(b||(Y=function(){if(j(Z,this))throw tt("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?k(arguments[0]):void 0,e=X(t),c=function(t){this===R&&i(c,lt,t),O(this,U)&&O(this[U],e)&&(this[U][e]=!1),ft(this,e,w(1,t))};return u&&Ot&&ft(R,e,{configurable:!0,set:c}),ht(e,t)},Z=Y[z],J(Z,"toString",(function(){return L(this).tag})),J(Y,"withoutSetter",(function(t){return ht(X(t),t)})),E.f=mt,x.f=pt,C.f=vt,$.f=B.f=yt,_.f=Mt,T.f=function(t){return ht(F(t),t)},u&&(rt(Z,"description",{configurable:!0,get:function(){return L(this).description}}),l||J(R,"propertyIsEnumerable",mt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!b,sham:!b},{Symbol:Y}),Q(S(dt),(function(t){W(t)})),n({target:V,stat:!0,forced:!b},{for:function(t){var e=k(t);if(O(ut,e))return ut[e];var c=Y(e);return ut[e]=c,bt[c]=e,c},keyFor:function(t){if(!g(t))throw tt(t+" is not a symbol");if(O(bt,t))return bt[t]},useSetter:function(){Ot=!0},useSimple:function(){Ot=!1}}),n({target:"Object",stat:!0,forced:!b,sham:!u},{create:gt,defineProperty:pt,defineProperties:jt,getOwnPropertyDescriptor:vt}),n({target:"Object",stat:!0,forced:!b},{getOwnPropertyNames:yt,getOwnPropertySymbols:Mt}),n({target:"Object",stat:!0,forced:d((function(){_.f(1)}))},{getOwnPropertySymbols:function(t){return _.f(v(t))}}),ct){var kt=!b||d((function(){var t=Y();return"[null]"!=ct([t])||"{}"!=ct({a:t})||"{}"!=ct(Object(t))}));n({target:"JSON",stat:!0,forced:kt},{stringify:function(t,e,c){var n=D(arguments),r=e;if((p(e)||void 0!==t)&&!g(t))return f(e)||(e=function(t,e){if(h(r)&&(e=i(r,this,t,e)),!g(e))return e}),n[1]=e,a(ct,null,n)}})}if(!Z[G]){var wt=Z.valueOf;J(Z,G,(function(t){return i(wt,this)}))}q(Y,V),H[U]=!0},dbb4:function(t,e,c){var n=c("23e7"),r=c("83ab"),o=c("56ef"),a=c("fc6a"),i=c("06cf"),s=c("8418");n({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(t){var e,c,n=a(t),r=i.f,l=o(n),u={},b=0;while(l.length>b)c=r(n,e=l[b++]),void 0!==c&&s(u,e,c);return u}})},e439:function(t,e,c){var n=c("23e7"),r=c("d039"),o=c("fc6a"),a=c("06cf").f,i=c("83ab"),s=r((function(){a(1)})),l=!i||s;n({target:"Object",stat:!0,forced:l,sham:!i},{getOwnPropertyDescriptor:function(t,e){return a(o(t),e)}})},e538:function(t,e,c){var n=c("b622");e.f=n}}]);
//# sourceMappingURL=chunk-333c26e1.e67679ac.js.map