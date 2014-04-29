AUI.add("aui-editor-tools-plugin",function(C){var F=C.Lang,G=C.UA,H="justify",J={div:true,h1:true,h2:true,h3:true,h4:true,h5:true,h6:true,p:true},L={br:true},D={li:true},E='<div style="text-align: {0};">{1}</div>';function K(A){var N=null;var O=A.get("childNodes");O.some(function(Q,P,R){if(Q.get("innerHTML")=="{0}"){Q.html("");N=Q;return true;}return K(Q);});return N;}function M(N,O,A){var Q=C.Node.create(A);N.insert(Q,O);if(Q.html()!=""){if(Q.html()=="{0}"){Q.html("");}else{var P=K(Q);if(P){Q=P;}}}return Q;}function I(O,N){var A=(G.ie?"innerText":"textContent");return(O.get(A)==N.get(A));}var B={};C.mix(C.Plugin.ExecCommand.COMMANDS,{justify:function(P,O){var T=this;var U=T.get("host");var N=U.getInstance();var S=new N.Selection();var R=S.getSelected();var Q=false;if(S.isCollapsed||!R.size()){var A=S.anchorTextNode;R=[A];Q=true;}C.each(R,function(Y,V,a){var W=Y.get("tagName");if(W){W=W.toLowerCase();}if(L[W]){return;}if(W=="font"){var Z=Y.get("parentNode");if(!Z.test("body")){Y=Z;W=Y.get("tagName").toLowerCase();}}if(!Y.test("body")&&Y.getComputedStyle("textAlign")==O){return;}var X=Y.get("parentNode");var b;if(J[W]||Y.getComputedStyle("display")=="block"){b=Y;}else{if(!X.get("childNodes").item(1)||D[W]){W=X.get("tagName").toLowerCase();if(J[W]||X.getComputedStyle("display")=="block"){b=X;}}else{if(Q){U.execCommand("inserthtml",F.sub(E,[O,N.Selection.CURSOR]));S.focusCursor(true,true);return;}else{b=C.Node.create(F.sub(E,[O,""]));X.insert(b,Y);b.append(Y);}}}if(b){b.setStyle("textAlign",O);}});},justifycenter:function(){var A=this;return A.get("host").execCommand(H,"center");},justifyleft:function(){var A=this;return A.get("host").execCommand(H,"left");},justifyright:function(){var A=this;return A.get("host").execCommand(H,"right");},subscript:function(){var A=this;return A.get("host").execCommand("wrap","sub");},superscript:function(){var A=this;return A.get("host").execCommand("wrap","sup");},wraphtml:function(Y,g){var d=this;var U=d.get("host");var S=U.getInstance();var f=new S.Selection();var V=f.getSelected();if(!f.isCollapsed&&V.size()){var X;var b;var Q;var R;var A;if(V.size()>1){var e;var T;V.each(function(l,h,m){var i=l;var k=0;var j;while((i=i.ancestor())&&!i.test("body")){k++;j=i;}if(T==null||k<T){e=h;T=k;}});var c=V.item(e);var P=(c.test("font")?c.ancestor().ancestor():c.ancestor());var W=[];A=P.get("childNodes");V.each(function(j,h,k){var i=j;var l=-1;if(j.ancestor().test("body")){l=h;}else{while((i=i.ancestor())!=null){A.some(function(m,o,n){if(m==i){l=o;return true;}});if(l!=-1){break;}}}W[h]=l;});if(W.length>1){var N;var a;for(var Z=0;Z<W.length;Z++){if(W[Z]!=-1){if(W[Z]<N||N==null){N=W[Z];X=V.item(Z);b=A.item(N);}if(W[Z]>a||a==null){a=W[Z];Q=V.item(Z);R=A.item(a);}}else{b=null;break;}}}}if(b!=null&&((b==R)||(I(X,b)&&I(Q,R)))){var P=b.ancestor();var O=M(P,b,g);for(var Z=N;Z<=a;Z++){O.append(A.item(Z));}}else{V.each(function(k,h,l){var i=k.get("tagName").toLowerCase();if(!L[i]){var j=k.ancestor();var m=M(j,k,g);m.append(k);}});}}else{U.execCommand("inserthtml",F.sub(g,[S.Selection.CURSOR]));if(g.indexOf("{0}")!=-1){f.focusCursor(true,true);}}}});C.Plugin.EditorTools=B;},"@VERSION@",{requires:["aui-base","editor-base"]});