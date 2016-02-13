YUI.add("aui-radio-group-data-editor",function(e,t){var n=e.getClassName("radio","group","data","editor"),r=e.getClassName("radio","group","data","editor","button"),i=e.getClassName("radio","group","data","editor","content"),s=e.getClassName("radio","group","data","editor","element"),o=e.getClassName("radio","group","data","editor","elements","inline"),u=e.getClassName("radio","group","data","editor","inline");e.RadioGroupDataEditor=e.Base.create("radio-group-data-editor",e.DataEditor,[],{TPL_EDITOR_CONTENT:'<div class="'+n+'">'+'<div class="'+i+'"></div>'+"</div>",TPL_EDITOR_RADIO:'<div class="'+s+' radio">'+'<label><input class="'+r+'" type="radio">{label}</label>'+"</div>",initializer:function(){this._uiSetRadioLabels(this.get("radioLabels")),this._uiSetEditedValue(this.get("editedValue")),this._uiSetInline(this.get("inline")),this.after("editedValueChange",this._afterEditedValueChange),this.after("inlineChange",this._afterInlineChange),this.after("radioLabelsChange",this._afterRadioLabelsChange),this.get("node").delegate("click",e.bind(this._onClickRadioButton,this),"."+r)},_afterEditedValueChange:function(){this._uiSetEditedValue(this.get("editedValue"))},_afterInlineChange:function(){this._uiSetInline(this.get("inline"))},_afterRadioLabelsChange:function(){this._uiSetRadioLabels(this.get("radioLabels"))},_createRadioGroup:function(t){var n=e.Node.create(e.Lang.sub(this.TPL_EDITOR_RADIO,{label:t}));return n},_onClickRadioButton:function(e){this.set("editedValue",this.get("node").one("."+i).all("input").indexOf(e.target))},_uiSetEditedValue:function(e){var t=this.get("node").one("."+i).all("input");t.each(function(e){e.set("checked",!1)}),t.item(e).set("checked",!0)},_uiSetInline:function(e){var t=this.get("node");e?(t.one("."+i).addClass(o),t.all("."+s).addClass(u)):(t.one("."+i).removeClass(o),t.all("."+s).removeClass(u))},_uiSetRadioLabels:function(t){var n=this,r=this.get("node").one("."+i);r.empty(),e.Array.each(t,function(e){r.append(n._createRadioGroup(e))}),this._uiSetEditedValue(this.get("editedValue"))}},{ATTRS:{editedValue:{validator:function(e){return e>=0&&e<this.get("radioLabels").length},value:0},inline:{value:!1},originalValue:{validator:function(e){return e>=0&&e<this.get("radioLabels").length},value:0},radioLabels:{validator:e.Lang.isArray,value:[]}}})},"3.0.3-deprecated.16",{requires:["aui-data-editor","node-event-delegate"],skinnable:!0});
