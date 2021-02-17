YUI.add("aui-scheduler-view-table-dd",function(e,t){var n=e.Lang,r=n.isObject,i=e.DataType.DateMath,s=i.WEEK_LENGTH,o=e.getClassName,u=o("scheduler-event"),a=o("scheduler-event","disabled"),f=o("scheduler-view","table","colgrid"),l=o("scheduler-view","table","dragging"),c=o("scheduler-view","table","lasso"),h=o("scheduler-view","table","proxy","node"),p=o("scheduler-view","table","data","col"),d='<div class="'+c+'"></div>',v='<div class="'+h+'"></div>';e.SchedulerTableViewDD=function(){},e.SchedulerTableViewDD.ATTRS={delegateConfig:{value:{},setter:function(t){var n=this;return e.merge({dragConfig:{offsetNode:!1,useShim:!1},bubbleTargets:n,container:n.get("boundingBox"),nodes:"."+u,invalid:"input, select, button, a, textarea, ."+a},t||{})},validator:r}},e.mix(e.SchedulerTableViewDD.prototype,{initializer:function(){var t=this;t.proxyNode=e.Node.create(v),t.after(t.viewDDBindUI,t,"bindUI"),t.after(t.viewDDRenderUI,t,"renderUI"),t.after(t.viewDDSyncUI,t,"syncUI")},viewDDBindUI:function(){var t=this,n=t.get("scheduler").get("eventRecorder");n&&n.on({cancel:e.bind(t.removeLasso,t),save:e.bind(t.removeLasso,t)}),t.rowsContainerNode.on({mousedown:e.bind(t._onMouseDownGrid,t),mousemove:e.bind(t._onMouseMoveGrid,t),mouseup:e.bind(t._onMouseUpGrid,t)}),t.after("drag:align",t._afterDragAlign),t.on("drag:end",t._onEventDragEnd),t.on("drag:start",t._onEventDragStart)},viewDDRenderUI:function(){},viewDDSyncUI:function(){var e=this;e._setupDragDrop()},removeLasso:function(){var e=this;e.lasso&&e.lasso.remove()},removeProxy:function(){var e=this;e.proxyNode&&e.proxyNode.remove()},renderLasso:function(t,n){var r=this,i=t,o=n;t[1]>n[1]&&(i=n,o=t);var u=i[0],a=i[1],f=o[0],l=o[1],c;r.removeLasso(),r.lasso=e.NodeList.create();for(c=a;c<=l;c++){var h=r.gridCellHeight,p=r.gridCellWidth,v=0,m=h*c;c===a?a===l?(v+=Math.min(u,f)*p,p*=Math.abs(f-u)+1):(v+=u*p,p*=s-u):c===l?p*=f+1:p*=s;var g=e.Node.create(d);r.lasso.push(g),r.rowsContainerNode.append(g),g.sizeTo(p,h),g.setXY(r._offsetXY([v,m],1))}},_afterDragAlign:function(t){var n=this,r=n.bodyNode.get("region"),s={bottom:t.pageY,left:t.pageX,right:t.pageX,top:t.pageY};if(!e.DOM.inRegion(null,r,!0,s))return;var o=n.draggingEvent,u=[t.pageX,t.pageY],a=n._findPosition(n._offsetXY(u,-1));if(o&&n._hasLassoChanged(a)){n.lassoLastPosition=a;var f=i.add(n._getPositionDate(a),i.MINUTES,o.getMinutesDuration());n.renderLasso(a,n._getDatePosition(f))}},_findPosition:function(e){var t=this,n=Math.floor(e[0]/t.gridCellWidth),r=Math.floor(e[1]/t.gridCellHeight);return[n,r]},_getDatePosition:function(e){var t=this,n=t._findCurrentIntervalStart(),r=i.getDayOffset(e,n),o=[];return o[1]=Math.floor(r/s),o[0]=r%s,o},_getPositionDate:function(e){var t=this,n=t._findCurrentIntervalStart(),r=i.add(n,i.DAY,t._getCellIndex(e));return r.setHours(0,0,0,0),r},_hasLassoChanged:function(e){var t=this,n=t.lassoLastPosition||t.lassoStartPosition;return n&&(e[0]!==n[0]||e[1]!==n[1])},_offsetXY:function(e,t){var n=this,r=n.rowsContainerNode.getXY();return[e[0]+r[0]*t,e[1]+r[1]*t]},_onEventDragEnd:function(e){var t=this,n=t.draggingEvent;if(n){var r=t._getPositionDate(t.lassoLastPosition);i.copyHours(r,n.get("startDate")),n.move(r),n.set("visible",!0,{silent:!0}),t.rowsContainerNode.removeClass(l).unselectable(),e.target.set("dragNode",t.originalDragNode),t.removeLasso(),t.removeProxy(),t.get("scheduler").syncEventsUI()}t.draggingEvent=null},_onEventDragStart:function(e){var t=this,n=t.draggingEvent=t.delegate.dd.get("node").getData("scheduler-event");if(n){t._syncCellDimensions();var r=[e.pageX,e.pageY],s=t._findPosition(t._offsetXY(r,-1)),o=i.add(t._getPositionDate(s),i.MINUTES,n.getMinutesDuration());t.renderLasso(s,t._getDatePosition(o)),t._syncProxyNodeUI(n),n.set("visible",!1,{silent:!0}),t.lassoStartPosition=t.lassoLastPosition=s,t.rowsContainerNode.addClass(l).unselectable(),t.originalDragNode=e.target.get("dragNode"),e.target.set("dragNode",t.proxyNode)}},_onMouseDownGrid:function(e){var t=this,n=t.get("scheduler"),r=n.get("eventRecorder"),i=e.target;if(r&&!n.get("disabled")&&i.test(["."+f,"."+p].join())){t._recording=!0,t._syncCellDimensions();var s=t._offsetXY([e.pageX,e.pageY],-1);t.lassoStartPosition=t.lassoLastPosition=t._findPosition(s),t.renderLasso(t.lassoStartPosition,t.lassoLastPosition),t.rowsContainerNode.unselectable()}},_onMouseMoveGrid:function(e){var t=this,n=[e.pageX,e.pageY],r=t._findPosition(t._offsetXY(n,-1));t._recording&&t._hasLassoChanged(r)&&(t.lassoLastPosition=r,t.renderLasso(t.lassoStartPosition,r))},_onMouseUpGrid:function(){var e=this,t=e.get("scheduler"),n=t.get("eventRecorder");if(n&&e._recording&&!t.get("disabled")){var r=e._getPositionDate(e.lassoStartPosition),i=e._getPositionDate(e.lassoLastPosition),s=new Date(Math.min(r,i));s.setHours(0,0,0);var o=new Date(Math.max(r,i));o.setHours(23,59,59),n.hidePopover(),n.setAttrs({allDay:!0,endDate:o,startDate:s},{silent:!0}),n.showPopover(e.lasso),e._recording=!1}},_setupDragDrop:function(){var t=this;t.delegate||(t.delegate=new e.DD.Delegate(t.get("delegateConfig")));var n=t.delegate.dd;n.unplug(e.Plugin.DDNodeScroll),n.unplug(e.Plugin.DDProxy),n.plug(e.Plugin.DDNodeScroll,{node:t.bodyNode,scrollDelay:150}),n.plug(e.Plugin.DDProxy,{moveOnEnd:!1,positionProxy:!1})},_syncCellDimensions:function(){var e=this,t=e.get("displayDaysInterval"),n=Math.ceil(t/s),r=Math.min(t,s);e.gridCellHeight=e.rowsContainerNode.get("offsetHeight")/n,e.gridCellWidth=e.rowsContainerNode.get("offsetWidth")/r},_syncProxyNodeUI:function(e){var t=this,n=e.get("node").item(0),r=e.get("node").item(1);t.proxyNode.setStyles({backgroundColor:n.getStyle("backgroundColor"),color:n.getStyle("color"),display:"block"});if(!r||!r.test(":visible")){var i=n.get("offsetWidth");t.proxyNode.set("offsetWidth",i)}t.proxyNode.appendTo(t.rowsContainerNode),t.proxyNode.setContent(e.get("content"))}}),e.Base.mix(e.SchedulerTableView,[e.SchedulerTableViewDD])},"3.1.0-deprecated.79",{requires:["dd-drag","dd-delegate","dd-drop","aui-scheduler-view-table"]});
