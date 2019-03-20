webpackJsonp([1],{NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),s=n("NYxO"),a=n("M4fF"),i=n.n(a),c=n("Dd8w"),r=n.n(c),l=n("mvHQ"),d=n.n(l),u=n("/ocq"),g={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"d-flex justify-content-center align-items-center"},[t("div",[this._v("HomePage")])])}]},m=n("VU/8")({name:"PageHome",data:function(){return{}},mounted:function(){}},g,!1,null,null,null).exports,p={name:"PageColor",mounted:function(){this.$store.commit("setFeedback",{c:"feedback",p:{type:"color_set",message:"Color is set: "+this.message.p.color}})},data:function(){return{}},computed:r()({background_color:function(){return this.message.p.color}},Object(s.b)({message:function(e){return e.message}}))},f={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"app-page",style:"background-color: "+this.background_color})},staticRenderFns:[]},_=n("VU/8")(p,f,!1,null,null,null).exports,v={name:"PageImage",mounted:function(){void 0!=this.message.p&&this.$store.commit("setFeedback",{c:"feedback",p:{type:"image_set",message:"Image set: "+this.message.p.image}})},data:function(){return{}},computed:r()({background_image:function(){return"./media/"+this.message.p.image}},Object(s.b)({message:function(e){return e.message}}))},h={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"app-page page-image",style:"background-image: url("+this.background_image})},staticRenderFns:[]},b=n("VU/8")(v,h,!1,null,null,null).exports,C={name:"PageVideo",mounted:function(){this.setVideo()},data:function(){return{}},computed:r()({video_action:function(){return"setVideo"==this.message.c?"load":"playVideo"==this.message.c?"play":"stopVideo"==this.message.c?"stop":null}},Object(s.b)({message:function(e){return e.message}})),watch:{video_action:function(e){if("load"==e)this.setVideo();else if("play"==e){document.getElementById("video").play()}else if("stop"==e){document.getElementById("video").pause()}}},methods:{setVideo:function(){var e=this,t=document.getElementById("video");t.src="./media/"+this.message.p.video,t.addEventListener("canplaythrough",function(){console.log("Ready to Play"),e.$store.commit("setFeedback",{c:"feedback",p:{type:"video_ready",message:"Video is ready: "+e.message.p.video}})},!1)}}},y={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"app-page page-video d-flex align-items-center"},[t("video",{staticClass:"w-100",attrs:{src:"",id:"video",preload:"auto"}})])}]},k=n("VU/8")(C,y,!1,null,null,null).exports,w={name:"PageText",data:function(){return{}},mounted:function(){this.$store.commit("setFeedback",{c:"feedback",p:{type:"text_set",message:"Text set: "+this.message.p.text}})},computed:r()({text_content:function(){return void 0!=this.message?this.message.p.text:""},font_size:function(){return void 0!=this.message&&void 0!=this.message.p.font_size?this.message.p.font_size:64}},Object(s.b)({message:function(e){return e.message}}))},x={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"app-page page-text d-flex justify-content-center align-items-center"},[t("div",{style:"font-size: "+this.font_size+"px",domProps:{innerHTML:this._s(this.text_content)}})])},staticRenderFns:[]},E=n("VU/8")(w,x,!1,null,null,null).exports;o.a.use(u.a);var P=new u.a({routes:[{path:"/:endpoint?",name:"PageHome",component:m},{path:"/color",name:"PageColor",component:_},{path:"/image",name:"PageImage",component:b},{path:"/video",name:"PageVideo",component:k},{path:"/text",name:"PageText",component:E}]}),T={name:"App",router:P,data:function(){return{connection:null,toolbar_visible:!1,toolbar_command:"",tmp_config:{},current_page:"",is_connected:!1}},mounted:function(){this.loadConfig()},methods:{initConnection:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];console.log("Opening connection to "+this.config.endpoint),this.connection=new WebSocket("ws://"+this.config.endpoint),1==t&&(this.connection.onopen=function(){e.current_page="PageHome",P.push({name:"PageHome"}),e.is_connected=!0},this.connection.onclose=function(){e.current_page="PageHome",P.push({name:"PageHome"}),e.is_connected=!1},this.connection.onmessage=function(t){e.toolbar_command=t.data;var n=JSON.parse(t.data);switch(e.$store.commit("setMessage",n),n.c){case"setColor":e.current_page="PageColor",P.push({name:e.current_page});break;case"setImage":e.current_page="PageImage",P.push({name:e.current_page});break;case"setVideo":e.current_page="PageVideo",P.push({name:e.current_page});break;case"setText":e.current_page="PageText",P.push({name:e.current_page})}})},closeConnection:function(){console.log("Closing connection"),this.connection=null,this.is_connected=!1},toggleToolbar:function(){console.log("toggleToolbar"),this.toolbar_visible=!this.toolbar_visible},toggleConfig:function(){this.tmp_config=i.a.clone(this.config,!0),$("#modal_config").modal()},loadConfig:function(){console.log("loadConfig from "+(this.has_native_storage?"NATIVE STORAGE":"LOCAL STORAGE"));var e={};if(this.has_native_storage)"NATIVE STORAGE",NativeStorage.getItem("connect4_config",function(t){e.id=t.id,e.endpoint=t.endpoint}),console.log(e);else{"LOCAL STORAGE";var t=window.localStorage.getItem("connect4_config");e=JSON.parse(t)}void 0!=e.id&&void 0!=e.endpoint||(console.log("loadConfig: configurazione salvata NON TROVATA"),e={endpoint:"192.168.1.6:9999",id:"Tablet1"}),void 0!=this.$route.params.endpoint&&(e.endpoint=this.$route.params.endpoint),this.$store.commit("setConfig",e)},saveConfig:function(){var e=i.a.clone(this.tmp_config,!0);if(this.$store.commit("setConfig",e),this.has_native_storage)console.log("saveConfig: salvo la configurazione in NATIVE STORAGE"),NativeStorage.setItem("connect4_config",e);else{console.log("saveConfig: salvo la configurazione in LOCAL STORAGE");var t=d()(e);window.localStorage.setItem("connect4_config",t)}$("#modal_config").modal("hide")}},computed:r()({toolbar_class:function(){return this.toolbar_visible?"expanded":""}},Object(s.b)({config:function(e){return e.config},feedback:function(e){return e.feedback}}),{endpoint:function(){return this.config.endpoint},id:function(){return this.config.id},has_native_storage:function(){return"undefined"!=typeof NativeStorage}}),watch:{endpoint:function(e){this.is_connected&&this.closeConnection(),this.initConnection()},feedback:function(e){this.connection.send(d()(e))}}},A={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view"),e._v(" "),n("div",{class:"row toolbar  no-gutters "+e.toolbar_class},[e.toolbar_visible?n("div",{staticClass:"col-sm-6"},[n("div",{staticClass:"toolbar-log"},[n("span",{staticClass:"badge badge-primary"},[e._v(e._s(e.config.id))]),e._v(" "),n("span",{staticClass:"badge badge-secondary"},[e._v(e._s(e.current_page))]),e._v(" "),n("span",{class:e.is_connected?"badge badge-success":"badge badge-danger"},[e._v(e._s(e.is_connected?"Connected":"Disconnected"))]),e._v(" "),n("span",{class:e.has_native_storage?"badge badge-success":"badge badge-warning"},[e._v(e._s(e.has_native_storage?"Native Storage":"Local Storage"))])]),e._v(" "),n("div",{staticClass:"toolbar-log"},[n("pre",{staticClass:"d-inline",domProps:{innerHTML:e._s(e.toolbar_command)}})])]):e._e(),e._v(" "),n("div",{staticClass:"col-sm-6 text-right"},[e.toolbar_visible?n("span",[n("a",{staticClass:"toolbar-btn",attrs:{href:"#"},on:{click:function(t){return e.toggleConfig()}}},[n("i",{staticClass:"fa fa-cog"})])]):e._e(),e._v(" "),e.toolbar_visible?n("a",{staticClass:"toolbar-btn btn-minus",attrs:{href:"#"},on:{click:function(t){return e.toggleToolbar()}}},[n("i",{staticClass:"fa fa-minus"})]):n("a",{staticClass:"toolbar-btn btn-plus",attrs:{href:"#"},on:{click:function(t){return e.toggleToolbar()}}},[n("i",{staticClass:"fa fa-plus"})])])]),e._v(" "),n("div",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog",id:"modal_config"}},[n("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[n("div",{staticClass:"modal-content"},[e._m(0),e._v(" "),n("div",{staticClass:"modal-body"},[n("div",{staticClass:"row mb-2"},[e._m(1),e._v(" "),n("div",{staticClass:"col-sm-8"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.tmp_config.id,expression:"tmp_config.id"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.tmp_config.id},on:{input:function(t){t.target.composing||e.$set(e.tmp_config,"id",t.target.value)}}})])]),e._v(" "),n("div",{staticClass:"row mb-2"},[e._m(2),e._v(" "),n("div",{staticClass:"col-sm-8"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.tmp_config.endpoint,expression:"tmp_config.endpoint"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.tmp_config.endpoint},on:{input:function(t){t.target.composing||e.$set(e.tmp_config,"endpoint",t.target.value)}}})])])]),e._v(" "),n("div",{staticClass:"modal-footer"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.saveConfig}},[e._v("Salva")]),e._v(" "),n("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Chiudi")])])])])])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"modal-header"},[t("h5",{staticClass:"modal-title"},[this._v("Configurazione")]),this._v(" "),t("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[t("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col-sm-4"},[t("label",[this._v("Id dispositivo")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col-sm-4"},[t("label",[this._v("Websocket Endpoint")])])}]},O=n("VU/8")(T,A,!1,null,null,null).exports,V=(n("lwAK"),n("K3J8"),n("h5AK"),n("C/JF")),S=n("chEw"),N=n("p2fn"),I=n("08EX");window.$=window.jQuery=n("7t+N"),V.b.add(S.faPlus),V.b.add(N.faMinus),V.b.add(I.faCog),V.a.watch(),o.a.use(s.a),o.a.config.productionTip=!1,new o.a({el:"#app",store:new s.a.Store({state:{config:{id:null,endpoint:null},message:{},feedback:{}},mutations:{setConfig:function(e,t){e.config=t},setMessage:function(e,t){e.message=t},setFeedback:function(e,t){e.feedback=t}},getters:{getCommand:function(e){return e.message.c},getParams:function(e){return e.message.p}}}),components:{App:O},template:"<App/>"})},h5AK:function(e,t){},lwAK:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.6d23837bf4ace7c2cb56.js.map