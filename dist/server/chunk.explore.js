exports.ids=[1],exports.modules={212:function(n,t,e){var o=e(213);"string"==typeof o&&(o=[[n.i,o,""]]);var r={transform:void 0},i=e(23)(o,r);o.locals&&(n.exports=o.locals),n.exports.__universal__=i.__universal__},213:function(n,t,e){(t=n.exports=e(22)(!1)).push([n.i,".SectionMain__section-main__36JBC5pg {\n  font-size: 40px; }\n  .SectionMain__section-main__36JBC5pg .SectionMain__btn__1RyjkEih {\n    display: inline-block;\n    margin-left: 20px;\n    padding: 2px 6px;\n    border: 1px solid #222d32;\n    text-decoration: none;\n    font-size: 14px;\n    color: #222d32; }\n  .SectionMain__section-main__36JBC5pg .SectionMain__info__1DbZn_H7 {\n    font-size: 20px; }\n",""]),t.locals={"section-main":"SectionMain__section-main__36JBC5pg",sectionMain:"SectionMain__section-main__36JBC5pg",btn:"SectionMain__btn__1RyjkEih",info:"SectionMain__info__1DbZn_H7"}},214:function(n,t,e){var o=e(215);"string"==typeof o&&(o=[[n.i,o,""]]);var r={transform:void 0},i=e(23)(o,r);o.locals&&(n.exports=o.locals),n.exports.__universal__=i.__universal__},215:function(n,t,e){(t=n.exports=e(22)(!1)).push([n.i,".App__app__1BetFU0o {\n  padding: 5px 15px; }\n",""]),t.locals={app:"App__app__1BetFU0o"}},221:function(n,t,e){"use strict";e.r(t);var o=e(3),r=e.n(o),i=e(212),a=e.n(i);function c(n){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function s(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function u(n,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):t}function f(n){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function l(n,t){return(l=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}var p=function(n){function t(){return function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,f(t).call(this))}var e,i,c;return function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&l(n,t)}(t,o["Component"]),e=t,(i=[{key:"handleFetch",value:function(){this.props.actions.fetchUserInfo()}},{key:"handleClear",value:function(){this.props.actions.clearUserInfo()}},{key:"render",value:function(){var n=this.props.userInfo;return r.a.createElement("section",{className:a.a.sectionMain},"Explore",r.a.createElement("a",{href:"javascript:void(0)",className:a.a.btn,onClick:this.handleFetch.bind(this)},"Fetch Data"),r.a.createElement("a",{href:"javascript:void(0)",className:a.a.btn,onClick:this.handleClear.bind(this)},"Clear"),r.a.createElement("br",null),r.a.createElement("span",{className:a.a.info},n&&JSON.stringify(n)))}}])&&s(e.prototype,i),c&&s(e,c),t}(),_=e(214),y=e.n(_);function b(n){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function h(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function m(n,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):t}function v(n){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function d(n,t){return(d=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}var S=function(n){function t(){return function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),m(this,v(t).call(this))}var e,i,a;return function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&d(n,t)}(t,o["Component"]),e=t,(i=[{key:"render",value:function(){var n=this.props,t=n.userInfo,e=n.actions;return r.a.createElement("div",{className:y.a.app},r.a.createElement(p,{userInfo:t,actions:e}))}}])&&h(e.prototype,i),a&&h(e,a),t}();t.default=S}};