YUI.add("aui-form-select-deprecated",function(e,t){var n=e.Lang,r=n.isArray,i=n.isObject,s=e.getClassName,t="select",o=s(t),u='<select {multiple} class="{cssClass}" id="{id}" name="{name}"></select>',a=e.Component.create({NAME:t,ATTRS:{multiple:{value:!1},options:{value:[],setter:"_setOptions"},selectedIndex:{value:-1}},UI_ATTRS:["multiple","options","selectedIndex"],EXTENDS:e.Field,HTML_PARSER:{node:"select"},prototype:{FIELD_TEMPLATE:u,FIELD_TYPE:t,_setOptions:function(e){var t=this;return r(e)||(e=[e]),e},_uiSetMultiple:function(e){var t=this;t.get("node").attr("multiple",e)},_uiSetOptions:function(e){var t=this,n=[],r,i,s,o=0;for(var u=0;u<e.length;u++)r=e[u],i=r.labelText||r,s=r.value||r,r.selected&&(o=u),n.push('<option value="'+s+'">'+i+"</option>");var a=t.get("node");a.all("option").remove(!0),a.append(n.join("")),t.set("selectedIndex",o)},_uiSetSelectedIndex:function(e){var t=this;e>-1&&t.get("node").attr("selectedIndex",e)}}});e.Select=a},"3.1.0-deprecated.79",{requires:["aui-form-field-deprecated"]});
