webpackJsonp([1],{"5zde":function(e,t,r){r("zQR9"),r("qyJz"),e.exports=r("FeBl").Array.from},Gu7T:function(e,t,r){"use strict";t.__esModule=!0;var s,a=r("c/Tr"),n=(s=a)&&s.__esModule?s:{default:s};t.default=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return(0,n.default)(e)}},Rrid:function(e,t){},WMDo:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("Gu7T"),a=r.n(s),n=r("Xxa5"),o=r.n(n),i=r("exGp"),l=r.n(i),c={data:function(){return{rolesData:[],isShowAssignPowersDialog:!1,powersTree:[],defaultProps:{children:"children",label:"authName"},curRoleId:-1}},created:function(){this.getRolesData(),this.getPowersTree()},methods:{getRolesData:function(){var e=this;return l()(o.a.mark(function t(){var r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/roles");case 2:200===(r=t.sent).data.meta.status&&(e.rolesData=r.data.data);case 4:case"end":return t.stop()}},t,e)}))()},showAssignPowersDialog:function(e){var t=this;this.isShowAssignPowersDialog=!0,this.curRoleId=e.id;var r=[];e.children.forEach(function(e){e.children.forEach(function(e){e.children.forEach(function(e){r.push(e.id)})})}),this.$nextTick(function(){t.$refs.tree.setCheckedKeys(r)})},getPowersTree:function(){var e=this;return l()(o.a.mark(function t(){var r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/rights/tree");case 2:200===(r=t.sent).data.meta.status&&(e.powersTree=r.data.data);case 4:case"end":return t.stop()}},t,e)}))()},assignPowers:function(){var e=this;return l()(o.a.mark(function t(){var r,s,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("assignPowers"),r=e.$refs.tree.getCheckedKeys(),s=e.$refs.tree.getHalfCheckedKeys(),n=[].concat(a()(r),a()(s)).join(","),t.next=6,e.$http.post("/roles/"+e.curRoleId+"/rights",{rids:n});case 6:200===t.sent.data.meta.status&&(e.isShowAssignPowersDialog=!1,e.getRolesData());case 8:case"end":return t.stop()}},t,e)}))()},deletePowers:function(e,t){var r=this;return l()(o.a.mark(function s(){var a;return o.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,r.$http.delete("roles/"+e+"/rights/"+t);case 2:200===(a=s.sent).data.meta.status?r.$message({type:"success",message:a.data.meta.msg}):r.$message({type:"warning",message:a.data.meta.msg}),r.getRolesData();case 5:case"end":return s.stop()}},s,r)}))()}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"roles"},[r("el-breadcrumb",{staticClass:"breadcrumb",attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),e._v(" "),r("el-breadcrumb-item",[e._v("权限管理")]),e._v(" "),r("el-breadcrumb-item",[e._v("角色列表")])],1),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.rolesData,stripe:""}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-form",{attrs:{"label-position":"left"}},e._l(t.row.children,function(s){return r("el-row",{key:s.id,staticClass:"level1"},[r("el-col",{attrs:{span:4}},[r("el-tag",{attrs:{closable:"",type:"info"},on:{close:function(r){e.deletePowers(t.row.id,s.id)}}},[e._v("\n                  "+e._s(s.authName)+"\n                ")]),e._v(" "),r("i",{staticClass:"el-icon-arrow-right"})],1),e._v(" "),r("el-col",{attrs:{span:20}},e._l(s.children,function(s){return r("el-row",{key:s.id,staticClass:"level2"},[r("el-col",{attrs:{span:4}},[r("el-tag",{attrs:{closable:"",type:"success"},on:{close:function(r){e.deletePowers(t.row.id,s.id)}}},[e._v("\n                      "+e._s(s.authName)+"\n                    ")]),e._v(" "),r("i",{staticClass:"el-icon-arrow-right"})],1),e._v(" "),r("el-col",{attrs:{span:20}},e._l(s.children,function(s){return r("el-tag",{key:s.id,staticClass:"level3",attrs:{closable:"",type:"warning"},on:{close:function(r){e.deletePowers(t.row.id,s.id)}}},[e._v("\n                      "+e._s(s.authName)+"\n                   ")])}),1)],1)}),1)],1)}),1)]}}])}),e._v(" "),r("el-table-column",{attrs:{type:"index"}}),e._v(" "),r("el-table-column",{attrs:{prop:"roleName",label:"角色名称",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{prop:"roleDesc",label:"描述",width:"180"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini",plain:""},on:{click:function(r){e.showUserEditDialog(t.row.id)}}}),e._v(" "),r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini",plain:""},on:{click:function(r){e.deleteUserById(t.row.id)}}}),e._v(" "),r("el-button",{attrs:{type:"success",size:"mini",icon:"el-icon-check",plain:""},on:{click:function(r){e.showAssignPowersDialog(t.row)}}},[e._v("\n            分配权限\n          ")])]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:"角色授权",visible:e.isShowAssignPowersDialog},on:{"update:visible":function(t){e.isShowAssignPowersDialog=t}}},[r("el-tree",{ref:"tree",attrs:{data:e.powersTree,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps}}),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.isShowAssignPowersDialog=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.assignPowers}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=r("VU/8")(c,u,!1,function(e){r("Rrid")},"data-v-0d65e04e",null);t.default=d.exports},"c/Tr":function(e,t,r){e.exports={default:r("5zde"),__esModule:!0}},fBQ2:function(e,t,r){"use strict";var s=r("evD5"),a=r("X8DO");e.exports=function(e,t,r){t in e?s.f(e,t,a(0,r)):e[t]=r}},qyJz:function(e,t,r){"use strict";var s=r("+ZMJ"),a=r("kM2E"),n=r("sB3e"),o=r("msXi"),i=r("Mhyx"),l=r("QRG4"),c=r("fBQ2"),u=r("3fs2");a(a.S+a.F*!r("dY0y")(function(e){Array.from(e)}),"Array",{from:function(e){var t,r,a,d,f=n(e),h="function"==typeof this?this:Array,p=arguments.length,v=p>1?arguments[1]:void 0,w=void 0!==v,g=0,m=u(f);if(w&&(v=s(v,p>2?arguments[2]:void 0,2)),void 0==m||h==Array&&i(m))for(r=new h(t=l(f.length));t>g;g++)c(r,g,w?v(f[g],g):f[g]);else for(d=m.call(f),r=new h;!(a=d.next()).done;g++)c(r,g,w?o(d,v,[a.value,g],!0):a.value);return r.length=g,r}})}});
//# sourceMappingURL=1.3935b5c92efb6827a6ac.js.map