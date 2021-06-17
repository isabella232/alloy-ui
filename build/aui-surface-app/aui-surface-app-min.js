YUI.add("aui-surface-app",function(e,t){var n=e.config.doc,r=e.config.win;e.SurfaceApp=e.Base.create("surface-app",e.Base,[],{activeScreen:null,activePath:null,lockPageXOffset:0,lockPageYOffset:0,pageXOffset:0,pageYOffset:0,pendingNavigate:null,routes:null,screens:null,scrollHandle:null,skipLoadPopstate:!1,surfaces:null,initializer:function(){this.routes=[],this.surfaces={},this.screens={},this.publish({startNavigate:{defaultFn:this._defStartNavigateFn,preventedFn:this._preventNavigateFn},failNavigate:{},successNavigate:{},endNavigate:{}}),e.once("load",this._onLoad,r,this),e.on("scroll",e.debounce(this._onScroll,50,this)),e.on("popstate",this._onPopState,r,this),e.delegate("click",this._onDocClick,n,this.get("linkSelector"),this)},addScreenRoutes:function(t){return this._registerRoutes(e.Array(t)),this},addSurfaces:function(t){var n=this;return t=e.Array(t),e.Array.each(t,function(t){e.Lang.isString(t)&&(t=new e.Surface({id:t})),n.surfaces[t]=t}),this},dispatch:function(){return this.navigate(r.location.pathname+r.location.search+r.location.hash,!0)},matchesPath:function(t){var n=this.get("basePath"),i;i=t.lastIndexOf("#");if(i>-1){t=t.substr(0,i);if(t===r.location.pathname+r.location.search)return null}return t=t.substr(n.length),e.Array.find(this.routes,function(e){return e.matchesPath(t)})},navigate:function(e,t){return this._stopPending(),this.fire("startNavigate",{path:e,replaceHistory:!!t}),this.pendingNavigate},prefetch:function(t){var n,r,i=this.matchesPath(t),s=this;return i?(e.log("Prefetching ["+t+"]","info"),n=this._getScreenInstance(t,i),r=e.CancellablePromise.resolve().then(function(){return n.load(t)}).then(function(){s.screens[t]=n},function(e){throw s._removeScreen(t,n),e}),r):e.CancellablePromise.reject(new e.CancellablePromise.Error("No screen for "+t))},_defStartNavigateFn:function(t){var n=this,r={path:t.path};this.pendingNavigate=this._doNavigate(t.path,t.replaceHistory).thenCatch(function(t){throw e.log(t.message,"info"),r.error=t,n._stopPending(),t}).thenAlways(function(){n.fire("endNavigate",r)})},_doNavigate:function(t,n){var r=this,i,s,o=r.activeScreen;return this.activeScreen&&this.activeScreen.beforeDeactivate()?(this.pendingNavigate=e.CancellablePromise.reject(new e.CancellablePromise.Error("Cancelled by active screen")),this.pendingNavigate):(i=this.matchesPath(t),i?(e.log("Navigate to ["+t+"]","info"),t===this.activePath&&(n=!0),s=this._getScreenInstance(t,i),this.pendingNavigate=e.CancellablePromise.resolve(s.load(t)).then(function(t){var n=s.get("id");return e.Object.each(r.surfaces,function(e,r){e.addContent(n,s.getSurfaceContent(r,t))}),o&&o.deactivate(),s.flip(r.surfaces)}).then(function(){r._finalizeNavigate(t,s,n)},function(e){r._handleNavigateError(t,s,e)}),this.pendingNavigate):(this.pendingNavigate=e.CancellablePromise.reject(new e.CancellablePromise.Error("No screen for "+t)),this.pendingNavigate))},_finalizeNavigate:function(t,r,i){var s=this.activeScreen,o=r.get("title")||this.get("defaultTitle");this._updateHistory(o,t,i),this._syncScrollPosition(i),n.title=o,r.activate(),s&&!s.get("cacheable")&&this._removeScreen(this.activePath,s),this.activePath=t,this.activeScreen=r,this.screens[t]=r,this.pendingNavigate=null,e.log("Navigation done","info")},_handleNavigateError:function(t,n,r){e.log("Navigation error for ["+n+"] ("+r+")","info"),this._removeScreen(t,n),this.pendingNavigate=null},_isLinkSameOrigin:function(e){return e===r.location.hostname},_isSameBasePath:function(e){return e.indexOf(this.get("basePath"))===0},_lockScroll:function(){var t=this,n=t.lockPageXOffset,i=t.lockPageYOffset;t.pageXOffset=r.pageXOffset,t.pageYOffset=r.pageYOffset,n===t.pageXOffset&&i===t.pageYOffset?e.soon(function(){t.pageXOffset=r.pageXOffset,t.pageYOffset=r.pageYOffset,r.scrollTo(n,i)}):e.once("scroll",function(){t.pageXOffset=r.pageXOffset,t.pageYOffset=r.pageYOffset,r.scrollTo(n,i)})},_getScreenInstance:function(t,n){var r,i;return t===this.activePath&&(e.log("Already at destination, refresh navigation","info"),i=this.screens[t],delete this.screens[t]),r=this.screens[t],r||(e.log("Create screen for ["+t+"]","info"),r=new(n.get("screen")),i&&r.addCache(i.getCache())),r},_onDocClick:function(t){var n=t.currentTarget,r=n.get("hostname"),i=n.get("pathname")+n.get("search")+n.get("hash"),s=!1;if(t.altKey||t.ctrlKey||t.metaKey||t.shiftKey){e.log("Stop the SPA navigation when a modifier key is pressed");return}if(!this._isLinkSameOrigin(r)){e.log("Offsite link clicked","info");return}if(!this._isSameBasePath(i)){e.log("Link clicked outside app's base path","info");return}if(!this.matchesPath(i)){e.log("No screen for "+i,"info");return}this.navigate(i).thenCatch(function(){s=!0}),s||t.preventDefault()},_onLoad:function(){var e=this;this.skipLoadPopstate=!0,setTimeout(function(){e.skipLoadPopstate=!1},0)},_onPopState:function(t){var n=t._event.state;if(n===null){if(this.skipLoadPopstate)return;if(!r.location.hash){r.location.reload();return}}n&&n.surface&&(e.log("History navigation to ["+n.path+"]","info"),this._lockScroll(),this.navigate(n.path,!0))},_onScroll:function(){this.lockPageXOffset=r.pageXOffset,this.lockPageYOffset=r.pageYOffset},_preventNavigateFn:function(){this.pendingNavigate=e.CancellablePromise.reject(new e.CancellablePromise.Error("Navigation has been prevented"))},_removeScreen:function(t,n){var r=n.get("id");e.Object.each(this.surfaces,function(e){e.remove(r)}),n.destroy(),delete this.screens[t]},_registerRoutes:function(t){var n=this;e.Array.each(t,function(t){e.instanceOf(t,e.ScreenRoute)||(t=new e.ScreenRoute({path:t.path,screen:t.screen})),n.routes.push(t)})},_syncScrollPosition:function(t){var n=r.location.hash,i,s=[0,0];if(t){r.scrollTo(this.pageXOffset,this.pageYOffset);return}n&&(i=e.one(n)),i&&(s=i.getXY()),r.scrollTo(s[0],s[1])},_stopPending:function(){this.pendingNavigate&&(this.pendingNavigate.cancel("Cancel pending navigation"),this.pendingNavigate=null)},_updateHistory:function(e,t,n){var i={path:t,surface:!0};n?r.history.replaceState
(i,e,t):r.history.pushState(i,e,t)}},{ATTRS:{defaultTitle:{validator:e.Lang.isString||e.Lang.isNull,value:null},linkSelector:{value:"a",writeOnce:"initOnly"},basePath:{value:""}}})},"3.1.0-deprecated.80",{requires:["event-delegate","node-event-html5","aui-surface-base","aui-surface-screen","aui-surface-screen-route"]});
