YUI.add("aui-datepicker-native",function(e,t){function r(){}var n=e.Lang;r.ATTRS={nativeMask:{validator:n.isString,value:"%Y-%m-%d"},nativeType:{validator:n.isString,value:"date"}},r.prototype={initializer:function(){var e=this;e.bindNativeUI()},bindNativeUI:function(){var t=this,n=t.get("container"),r=t.get("trigger");t._eventHandles.push(n.delegate("touchstart",e.bind("_onceUserInteraction",t),r),n.delegate("change",e.bind("_afterNativeSelectionChange",t),r))},clearSelection:function(){var e=this,t=e.get("activeInput");t&&t.val("")},deselectDates:function(){var e=this;e.clearSelection()},hide:function(){var e=this,t=e.get("activeInput");t&&t.blur()},show:function(){var e=this,t=e.get("activeInput");t&&t.focus()},selectDates:function(e){var t=this,r=t.get("activeInput");n.isArray(e)&&(e=e[0]),r&&n.isDate(e)&&r.val(t._formatDate(e))},useInputNode:function(e){var t=this,n=t.get("nativeType"),r=e.attr("type"),i;t.set("activeInput",e),t._isTypeSupported(r)||(i=t.getParsedDatesFromInputValue(),i&&e.val(t._formatDate(i[0]))),e.getAttribute("type")!==n&&e.setAttribute("type",n),t._fireSelectionChange()},_addFourDigitsYearPadding:function(t){return e.Lang.String.repeat("0",4-t.indexOf("-"))+t},_afterNativeSelectionChange:function(e){var t=this,n=e.currentTarget.attr("type");t._isTypeSupported(n)&&t._fireSelectionChange()},_fireSelectionChange:function(){var e=this,t=e.get("activeInput"),n;t&&(n=e._parseDateFromString(t.val())),e.fire("selectionChange",{newSelection:n?[n]:[]})},_formatDate:function(t){var n=this,r=n.get("nativeMask"),i=n.get("nativeType"),s=e.Date.format(t,{format:r});return i==="date"&&(s=n._addFourDigitsYearPadding(s)),s},_isTypeSupported:function(e){switch(e.toLowerCase()){case"date":case"time":return!0;default:return!1}},_parseDateFromString:function(t){var n=this,r=n.get("nativeMask");return t?e.Date.parse(r,t):!1}},e.DatePickerNativeBase=r,e.DatePickerNative=e.Base.create("datepicker-native",e.Base,[e.DatePickerDelegate,e.DatePickerNativeBase])},"3.1.0-deprecated.79",{requires:["aui-datepicker-delegate","aui-node-base","base","base-build"]});
