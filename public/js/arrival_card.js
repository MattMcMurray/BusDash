function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)s=pug_classes(r[g]),s&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (image, minutes_to_arrival, priority, route_num, route_variant, small_font, stop_num) {;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
if ((priority == 0)) {
;pug_debug_line = 2;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel panel-default arrival-panel default\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-body\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-top-row\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"arrival-panel-img\""+pug_attr("src", image, true, false)) + "\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes(["panel-route-num",small_font], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = route_num) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-bottom-row\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = route_variant) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "Stop ";
;pug_debug_line = 10;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = stop_num) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cstrong\u003ETime to leave in ";
;pug_debug_line = 11;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = minutes_to_arrival) ? "" : pug_interp));
;pug_debug_line = 11;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
else
if ((priority == 1)) {
;pug_debug_line = 13;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel panel-default arrival-panel default low-priority\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-body\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-top-row\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"arrival-panel-img\""+pug_attr("src", image, true, false)) + "\u002F\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes(["panel-route-num",small_font], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = route_num) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-bottom-row\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = route_variant) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "Stop ";
;pug_debug_line = 21;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = stop_num) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cstrong\u003ETime to leave in ";
;pug_debug_line = 22;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = minutes_to_arrival) ? "" : pug_interp));
;pug_debug_line = 22;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
else
if ((priority == 2)) {
;pug_debug_line = 24;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel panel-default arrival-panel default soon\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-body\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-top-row\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"arrival-panel-img\""+pug_attr("src", image, true, false)) + "\u002F\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes(["panel-route-num",small_font], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = route_num) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-bottom-row\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = route_variant) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "Stop ";
;pug_debug_line = 32;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = stop_num) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 33;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 33;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cstrong\u003ETime to leave in ";
;pug_debug_line = 33;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = minutes_to_arrival) ? "" : pug_interp));
;pug_debug_line = 33;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
else
if ((priority == 3)) {
;pug_debug_line = 35;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel panel-default arrival-panel default critical\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-body\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-top-row\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"arrival-panel-img\""+pug_attr("src", image, true, false)) + "\u002F\u003E";
;pug_debug_line = 39;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cspan" + (pug_attr("class", pug_classes(["panel-route-num",small_font], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 39;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = route_num) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cdiv class=\"panel-bottom-row\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 42;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = route_variant) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "Stop ";
;pug_debug_line = 43;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = stop_num) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002Fhome\u002Fmathieu\u002FGit\u002FDash4Bus\u002Fviews\u002Fclientside\u002Farrival_card.pug";
pug_html = pug_html + "\u003Cstrong\u003ETime to leave NOW!\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"image" in locals_for_with?locals_for_with.image:typeof image!=="undefined"?image:undefined,"minutes_to_arrival" in locals_for_with?locals_for_with.minutes_to_arrival:typeof minutes_to_arrival!=="undefined"?minutes_to_arrival:undefined,"priority" in locals_for_with?locals_for_with.priority:typeof priority!=="undefined"?priority:undefined,"route_num" in locals_for_with?locals_for_with.route_num:typeof route_num!=="undefined"?route_num:undefined,"route_variant" in locals_for_with?locals_for_with.route_variant:typeof route_variant!=="undefined"?route_variant:undefined,"small_font" in locals_for_with?locals_for_with.small_font:typeof small_font!=="undefined"?small_font:undefined,"stop_num" in locals_for_with?locals_for_with.stop_num:typeof stop_num!=="undefined"?stop_num:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}