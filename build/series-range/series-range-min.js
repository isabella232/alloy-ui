YUI.add("series-range",function(e,t){function s(){s.superclass.constructor.apply(this,arguments)}s.NAME="rangeSeries",s.ATTRS={type:{value:"range"},ohlckeys:{valueFn:function(){return{open:"open",high:"high",low:"low",close:"close"}}}},e.extend(s,e.CartesianSeries,{_calculateMarkerWidth:function(e,t,s){for(var r=0;r<3&&s>-1;)s-=1,(r=Math.round(e/t-s))%2==0&&(r-=1);return Math.max(1,r)},drawSeries:function(){var e=this.get("xcoords"),t=this.get("ycoords"),s=this.get("styles"),r=s.padding,i=e.length,a=this.get("width")-(r.left+r.right),n=this.get("ohlckeys"),l=t[n.open],o=t[n.high],c=t[n.low],h=t[n.close],g=this._calculateMarkerWidth(a,i,s.spacing),u=g/2;this._drawMarkers(e,l,o,c,h,i,g,u,s)},_getDefaultStyles:function(){return this._mergeStyles({spacing:3},s.superclass._getDefaultStyles())}}),e.RangeSeries=s},"patched-v3.18.1",{requires:["series-cartesian"]});