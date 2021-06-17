YUI.add("aui-form-base-deprecated",function(e,t){var n=e.Lang,r=e.getClassName,i=e.IO.prototype._serialize,t="form",s=r(t),o=r("field","labels"),u=r("field","labels","inline"),a={left:[o,"left"].join("-"),right:[o,"right"].join("-"),top:[o,"top"].join("-")},f=e.Component.create({NAME:t,ATTRS:{action:{value:location.href,getter:"_attributeGetter",setter:"_attributeSetter"},id:{},method:{value:"POST",getter:"_attributeGetter",setter:"_attributeSetter"},monitorChanges:{value:!1},nativeSubmit:{value:!1},values:{getter:function(t){var n=this,r=i(n.get("contentBox").getDOM());return e.QueryString.parse(r)},setter:function(t){var r=this,i=r._setFieldsObject,s=r.get("monitorChanges");return n.isArray(t)&&(i=r._setFieldsArray),e.each(t,e.rbind(i,r,s)),e.Attribute.INVALID_VALUE}},fieldValues:{getter:function(e){var t=this,n={};return t.fields.each(function(e,t,r){n[e.get("name")]=e.get("value")}),n}},labelAlign:{value:""}},HTML_PARSER:{action:function(e){var t=this;return t._attributeGetter(null,"action")},method:function(e){var t=this;return t._attributeGetter(null,"method")}},prototype:{CONTENT_TEMPLATE:"<form></form>",initializer:function(){var t=this;t.fields=new e.DataSet({getKey:t._getNodeId})},renderUI:function(){var e=this;e._renderForm()},bindUI:function(){var e=this,t=e.get("nativeSubmit");t||e.get("contentBox").on("submit",e._onSubmit),e.after("disabledChange",e._afterDisabledChange),e.after("labelAlignChange",e._afterLabelAlignChange),e.after("nativeSubmitChange",e._afterNativeSubmitChange)},syncUI:function(){var e=this,t=e.get("contentBox");e.set("id",t.guid()),e._uiSetLabelAlign(e.get("labelAlign"))},add:function(t,n){var r=this,i=e.Array(t),s=i.length,o,t=r.fields,u=r.get("contentBox");for(var a=0;a<i.length;a++){o=i[a],o=e.Field.getField(o);if(o&&t.indexOf(o)==-1){t.add(o);if(n&&!o.get("rendered")){var f=o.get("node"),l=null;f.inDoc()||(l=u),o.render(l)}}}},clearInvalid:function(){var e=this;e.fields.each(function(e,t,n){e.clearInvalid()})},getField:function(e){var t=this,r;if(e){var i=t.fields;r=i.item(e),n.isObject(r)||i.each(function(t,n,i){if(t.get("id")==e||t.get("name")==e)return r=t,!1})}return r},invoke:function(e,t){var n=this;return n.fields.invoke(e,t)},isDirty:function(){var e=this,t=!1;return e.fields.each(function(e,n,r){if(e.isDirty())return t=!0,!1}),t},isValid:function(){var e=this,t=!0;return e.fields.each(function(e,n,r){if(!e.isValid())return t=!1,!1}),t},markInvalid:function(t){var r=this,i=r._markInvalidObject;return n.isArray(t)&&(i=r._markInvalidArray),e.each(t,i,r),r},remove:function(e,t){var n=this;return n.fields.remove(e),t&&(e=n.getField(e),e&&e.destroy()),n},resetValues:function(){var e=this;e.fields.each(function(e,t,n){e.resetValue()})},submit:function(t){var n=this,r=n.isValid();return r&&(n.get("nativeSubmit")?n.get("contentBox").submit():(t=t||{},e.mix(t,{id:n.get("id")}),e.io(n.get("action"),{form:t,method:n.get("method"),on:{complete:e.bind(n._onSubmitComplete,n),end:e.bind(n._onSubmitEnd,n),failure:e.bind(n._onSubmitFailure,n),start:e.bind(n._onSubmitStart,n),success:e.bind(n._onSubmitSuccess,n)}}))),r},_afterDisabledChange:function(e){var t=this,n="disable";e.newVal&&(n="enable"),t.fields.each(function(e,t,r){e[n]})},_afterLabelAlignChange:function(e){var t=this;t._uiSetLabelAlign(e.newVal,e.prevVal)},_afterNativeSubmitChange:function(e){var t=this,n=t.get("contentBox"),r="on";e.newVal&&(r="detach"),n[r]("submit",t._onSubmit)},_attributeGetter:function(e,t){var n=this;return n.get("contentBox").attr(t)},_attributeSetter:function(e,t){var n=this;return n.get("contentBox").attr(t,e),e},_getNodeId:function(t){var n;t instanceof e.Field?n=t.get("node"):n=e.one(t);var r=n&&n.guid();return r},_onSubmit:function(e){e.halt()},_onSubmitComplete:function(e){var t=this;t.fire("complete",{ioEvent:e})},_onSubmitEnd:function(e){var t=this;t.fire("end",{ioEvent:e})},_onSubmitFailure:function(e){var t=this;t.fire("failure",{ioEvent:e})},_onSubmitStart:function(e){var t=this;t.fire("start",{ioEvent:e})},_onSubmitSuccess:function(e){var t=this;t.fire("success",{ioEvent:e})},_renderForm:function(){var e=this;e.get("contentBox").removeClass(s)},_markInvalidArray:function(e,t,n){var r=this,i=r.getField(e.id);i&&i.markInvalid(e.message)},_markInvalidObject:function(e,t,r){var i=this,s=!n.isFunction(e)&&i.getField(t);s&&s.markInvalid(e)},_setFieldsArray:function(e,t,n,r){var i=this,s=i.getField(e.id);s&&(s.set("value",e.value),r&&s.set("prevVal",s.get("value")))},_setFieldsObject:function(e,t,r,i){var s=this,o=!n.isFunction(e)&&s.getField(t);o&&(o.set("value",e),i&&o.set("prevVal",o.get("value")))},_uiSetLabelAlign:function(e,t){var n=this,r=n.get("contentBox");r.replaceClass(a[t],a[e]);var i="removeClass";/right|left/.test(e)&&(i="addClass"),r[i](u)}}});e.Form=f},"3.1.0-deprecated.80",{requires:["io-form","querystring-parse","aui-base-deprecated","aui-data-set-deprecated","aui-form-field-deprecated"]});
