(()=>{var e,t={169(e,t){(()=>{var e={56:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},72:e=>{"use strict";var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},a=[],l=0;l<e.length;l++){var s=e[l],c=r.base?s[0]+r.base:s[0],u=i[c]||0,p="".concat(c," ").concat(u);i[c]=u+1;var d=n(p),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==d)t[d].references++,t[d].updater(f);else{var m=o(f,r);r.byIndex=l,t.splice(l,0,{identifier:p,updater:m,references:1})}a.push(p)}return a}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var l=n(i[a]);t[l].references--}for(var s=r(e,o),c=0;c<i.length;c++){var u=n(i[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}i=s}}},113:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},192:(e,t,n)=>{"use strict";n.d(t,{A:()=>l});var r=n(601),o=n.n(r),i=n(314),a=n.n(i)()(o());a.push([e.id,':root{--wp-admin-theme-color: #007cba;--wp-admin-theme-color--rgb: 0, 124, 186;--wp-admin-theme-color-darker-10: rgb(0, 107, 160.5);--wp-admin-theme-color-darker-10--rgb: 0, 107, 161;--wp-admin-theme-color-darker-20: #005a87;--wp-admin-theme-color-darker-20--rgb: 0, 90, 135;--wp-admin-border-width-focus: 2px;--wp-block-synced-color: #7a00df;--wp-block-synced-color--rgb: 122, 0, 223;--wp-bound-block-color: var(--wp-block-synced-color)}@media(-webkit-min-device-pixel-ratio: 2),(min-resolution: 192dpi){:root{--wp-admin-border-width-focus: 1.5px}}.codeamp-components-multi-select-control__input-container{font-size:13px;line-height:normal}.codeamp-components-multi-select-control__input-container{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;padding:6px 8px;box-shadow:0 0 0 rgba(0,0,0,0);border-radius:2px;border:1px solid #949494;font-size:16px;line-height:normal;width:100%;margin:0 0 8px 0;padding:0;cursor:text}@media not (prefers-reduced-motion){.codeamp-components-multi-select-control__input-container{transition:box-shadow .1s linear}}@media(min-width: 600px){.codeamp-components-multi-select-control__input-container{font-size:13px;line-height:normal}}.codeamp-components-multi-select-control__input-container:focus{border-color:var(--wp-admin-theme-color);box-shadow:0 0 0 .5px var(--wp-admin-theme-color);outline:2px solid rgba(0,0,0,0)}.codeamp-components-multi-select-control__input-container::-webkit-input-placeholder{color:rgba(30,30,30,.62)}.codeamp-components-multi-select-control__input-container::-moz-placeholder{color:rgba(30,30,30,.62)}.codeamp-components-multi-select-control__input-container:-ms-input-placeholder{color:rgba(30,30,30,.62)}.codeamp-components-multi-select-control__input-container.is-disabled{background:#ddd;border-color:#ddd}.codeamp-components-multi-select-control__input-container.is-active{border-color:var(--wp-admin-theme-color);box-shadow:0 0 0 .5px var(--wp-admin-theme-color);outline:2px solid rgba(0,0,0,0)}.codeamp-components-multi-select-control__input-container input[type=text].codeamp-components-multi-select-control__input{display:inline-block;flex:1;font-family:inherit;font-size:16px;width:100%;max-width:100%;margin-left:4px;padding:0;min-height:24px;min-width:50px;background:inherit;border:0;color:#1e1e1e;box-shadow:none;line-height:30px}@media(min-width: 600px){.codeamp-components-multi-select-control__input-container input[type=text].codeamp-components-multi-select-control__input{font-size:13px}}.codeamp-components-multi-select-control__input-container input[type=text].codeamp-components-multi-select-control__input:focus,.codeamp-components-multi-select-control.is-active .codeamp-components-multi-select-control__input-container input[type=text].codeamp-components-multi-select-control__input{outline:none;box-shadow:none}.codeamp-components-multi-select-control__input-container .codeamp-components-multi-select-control__token+input[type=text].codeamp-components-multi-select-control__input{width:auto}.codeamp-components-multi-select-control__help{font-size:12px;font-style:normal;color:#757575}.codeamp-components-multi-select-control__tokens-container{min-height:38px;padding:4px;width:100%}.codeamp-components-multi-select-control__token{font-size:13px;display:flex;color:#1e1e1e;max-width:100%;padding:0}.codeamp-components-multi-select-control__token.is-borderless{position:relative;padding:0 24px 0 0}.codeamp-components-multi-select-control__token.is-borderless .codeamp-components-multi-select-control__token-text{background:rgba(0,0,0,0);color:var(--wp-admin-theme-color)}.codeamp-components-multi-select-control__token.is-borderless .codeamp-components-multi-select-control__remove-token{background:rgba(0,0,0,0);color:#757575;position:absolute;top:1px;right:0;padding:0}.codeamp-components-multi-select-control__token.is-borderless.is-success .codeamp-components-multi-select-control__token-text{color:#4ab866}.codeamp-components-multi-select-control__token.is-borderless.is-error .codeamp-components-multi-select-control__token-text{color:#cc1818;border-radius:4px 0 0 4px;padding:0 4px 0 6px}.codeamp-components-multi-select-control__token.is-borderless.is-validating .codeamp-components-multi-select-control__token-text{color:#1e1e1e}.codeamp-components-multi-select-control__token.is-disabled .codeamp-components-multi-select-control__remove-token{cursor:default}.codeamp-components-multi-select-control__token-text,.codeamp-components-multi-select-control__remove-token.components-button{display:inline-block;line-height:30px;height:auto;background:#ddd;min-width:unset;transition:all .2s cubic-bezier(0.4, 1, 0.4, 1)}@media(prefers-reduced-motion: reduce){.codeamp-components-multi-select-control__token-text,.codeamp-components-multi-select-control__remove-token.components-button{transition-duration:0s;transition-delay:0s;animation-duration:1ms;animation-delay:0s}}.codeamp-components-multi-select-control__token-text{border-radius:2px 0 0 2px;padding:0 0 0 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.codeamp-components-multi-select-control__remove-token.components-button{cursor:pointer;border-radius:0 2px 2px 0;padding:0 4px;color:#1e1e1e;line-height:10px;overflow:initial}.codeamp-components-multi-select-control__remove-token.components-button:hover{color:#1e1e1e}.codeamp-components-multi-select-control__suggestions-list{flex:1 0 100%;min-width:100%;overflow-y:auto;transition:all .15s ease-in-out;list-style:none;border-top:1px solid #757575;margin:0;padding:0}@media(prefers-reduced-motion: reduce){.codeamp-components-multi-select-control__suggestions-list{transition-duration:0s;transition-delay:0s}}.codeamp-components-multi-select-control__no-suggestions{color:#757575;font-size:13px;margin:0;display:block;padding:4px 8px}.codeamp-components-multi-select-control__suggestion{color:#757575;display:block;font-size:13px;padding:4px 8px;margin:0;cursor:pointer}.codeamp-components-multi-select-control__suggestion.is-selected{background:var(--wp-admin-theme-color);color:#fff}.codeamp-components-multi-select-control__suggestion-match{text-decoration:underline}',""]);const l=a},243:(e,t,n)=>{"use strict";n.d(t,{A:()=>l});var r=n(601),o=n.n(r),i=n(314),a=n.n(i)()(o());a.push([e.id,".codeamp-components-resource-select-control>.components-base-control__field{position:relative;display:flex;flex-wrap:wrap}.codeamp-components-resource-select-control>.components-base-control__field>.components-base-control__label{flex:2}.codeamp-components-resource-select-control__label{margin-bottom:8px}.codeamp-components-resource-select-control .codeamp-components-resource-select-control__menu_button.has-icon{height:40px;margin-bottom:0;min-width:26px;padding:2px 0;flex-basis:26px;width:26px}.codeamp-components-resource-select-control__select{width:auto;flex:1}.codeamp-components-resource-select-control .components-base-control{margin-bottom:0}.codeamp-components-resource-select-control .components-base-control__field{margin-bottom:0}.codeamp-components-resource-select-control .components-base-control{flex:1}",""]);const l=a},314:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n}).join("")},t.i=function(e,n,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var l=0;l<this.length;l++){var s=this[l][0];null!=s&&(a[s]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);r&&a[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),t.push(u))}},t}},485:(e,t)=>{var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var a=o.apply(null,n);a&&e.push(a)}}else if("object"===i){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var l in n)r.call(n,l)&&n[l]&&e.push(l)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},540:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},601:e=>{"use strict";e.exports=function(e){return e[1]}},659:e=>{"use strict";var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},825:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}}},n={};function r(t){var o=n[t];if(void 0!==o)return o.exports;var i=n[t]={id:t,exports:{}};return e[t](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nc=void 0;var o={};(()=>{"use strict";r.r(o),r.d(o,{MultiSelectControl:()=>Oe,ResourceSelectControl:()=>T});const e=window.wp.i18n,t=window.wp.components,n=window.wp.compose,i=window.React,a=window.wp.primitives,l=(0,i.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(a.Path,{d:"M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"}));var s=r(72),c=r.n(s),u=r(825),p=r.n(u),d=r(659),f=r.n(d),m=r(56),h=r.n(m),g=r(540),v=r.n(g),b=r(113),x=r.n(b),w=r(243),y={};y.styleTagTransform=x(),y.setAttributes=h(),y.insert=f().bind(null,"head"),y.domAPI=p(),y.insertStyleElement=v(),c()(w.A,y),w.A&&w.A.locals&&w.A.locals;var k=r(485),_=r.n(k);function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function A(){return A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},A.apply(null,arguments)}function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach(function(t){O(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function O(e,t,n){return(t=function(e){var t=function(e){if("object"!=S(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=S(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==S(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var E=function(){},T=function(r){var o,i,a=r.onChange,s=void 0===a?E:a,c=r.label,u=void 0===c?"":c,p=r.loadingLabel,d=void 0===p?(0,e.__)("Loading","codeamp-block-components"):p,f=r.showActions,m=void 0===f||f,h=r.dropdownProps,g=r.dropdownToggleProps,v=r.disabled,b=void 0!==v&&v,x=r.defaultOption,w=r.options,y=r.value,k=r.help,S=r.id,j=r.className,O=[];d&&(O=[{value:"loading",label:d}]),w&&(O=[],x&&O.push(x),(o=O).push.apply(o,function(e){if(Array.isArray(e))return C(e)}(i=w)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(i)||function(e,t){if(e){if("string"==typeof e)return C(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()));var M=(0,n.useInstanceId)(T,"codeamp-components-resource-select-control");return S&&(M=S),React.createElement(t.BaseControl,{id:M,className:_()("components-base-control codeamp-components-resource-select-control",j),help:k,label:u,__nextHasNoMarginBottom:!0},React.createElement(t.__experimentalHStack,null,React.createElement(t.SelectControl,{id:M,value:y,options:O,className:"codeamp-components-resource-select-control__select",onChange:s,disabled:b,__nextHasNoMarginBottom:!0,__next40pxDefaultSize:!0}),m&&React.createElement(t.DropdownMenu,A({icon:l,toggleProps:z(z({className:"codeamp-components-resource-select-control__menu_button",iconSize:26},g),{},{__next40pxDefaultSize:!0})},h))))};const M=window.wp.element,P=window.wp.a11y,I=window.wp.isShallowEqual;var R=r.n(I);const $=(0,i.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,i.createElement)(a.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));var L=function(){};function N(r){var o=r.value,i=r.label,a=r.title,l=r.isBorderless,s=void 0!==l&&l,c=r.disabled,u=void 0!==c&&c,p=r.onClickRemove,d=void 0===p?L:p,f=r.onMouseEnter,m=r.onMouseLeave,h=r.messages,g=r.termPosition,v=r.termsCount,b=(0,n.useInstanceId)(N),x=_()("codeamp-components-multi-select-control__token",{"is-borderless":s,"is-disabled":u}),w=(0,e.sprintf)((0,e.__)("%1$s (%2$s of %3$s)"),i,g,v);return React.createElement("span",{className:x,onMouseEnter:f,onMouseLeave:m,title:a,style:{margin:"0"}},React.createElement("span",{className:"codeamp-components-multi-select-control__token-text",id:"codeamp-components-multi-select-control__token-text-".concat(b)},React.createElement(t.VisuallyHidden,{as:"span"},w),React.createElement("span",{"aria-hidden":"true"},i)),React.createElement(t.Button,{className:"codeamp-components-multi-select-control__remove-token",icon:$,onClick:u?L:function(){return d({value:o})},label:h.remove,"aria-describedby":"codeamp-components-multi-select-control__token-text-".concat(b)}))}var D=["value","isExpanded","instanceId","selectedSuggestionIndex","className","onChange","onFocus","onBlur"];function B(){return B=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},B.apply(null,arguments)}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}const H=(0,M.forwardRef)(function(e,t){var n,r=e.value,o=e.isExpanded,i=e.instanceId,a=e.selectedSuggestionIndex,l=e.className,s=e.onChange,c=e.onFocus,u=e.onBlur,p=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(-1!==t.indexOf(r))continue;n[r]=e[r]}return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],-1===t.indexOf(n)&&{}.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,D),d=function(e){if(Array.isArray(e))return e}(n=(0,M.useState)(!1))||function(e){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,r,o,i,a=[],l=!0,s=!1;try{for(o=(t=t.call(e)).next;!(l=(n=o.call(t)).done)&&(a.push(n.value),2!==a.length);l=!0);}catch(e){s=!0,r=e}finally{try{if(!l&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(s)throw r}}return a}}(n)||function(e){if(e){if("string"==typeof e)return F(e,2);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?F(e,2):void 0}}(n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),f=d[0],m=d[1],h=r?r.length+1:0;return React.createElement("input",B({ref:t,id:i,type:"text"},p,{value:r||"",onChange:function(e){s&&s({value:e.target.value})},onFocus:function(e){m(!0),null==c||c(e)},onBlur:function(e){m(!1),null==u||u(e)},size:h,className:_()(l,"codeamp-components-multi-select-control__input"),autoComplete:"off",role:"combobox","aria-expanded":o,"aria-autocomplete":"list","aria-owns":o?"".concat(i,"-suggestions"):void 0,"aria-activedescendant":f&&-1!==a&&o?"".concat(i,"-suggestions-").concat(a):void 0,"aria-describedby":"".concat(i,"-howto"),"data-lpignore":"true"}))});function U(e){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U(e)}function W(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function q(e,t){var n=e["page".concat(t?"Y":"X","Offset")],r="scroll".concat(t?"Top":"Left");if("number"!=typeof n){var o=e.document;"number"!=typeof(n=o.documentElement[r])&&(n=o.body[r])}return n}function G(e){return q(e)}function X(e){return q(e,!0)}function Y(e){var t=function(e){var t,n,r,o=e.ownerDocument,i=o.body,a=o&&o.documentElement;return n=(t=e.getBoundingClientRect()).left,r=t.top,{left:n-=a.clientLeft||i.clientLeft||0,top:r-=a.clientTop||i.clientTop||0}}(e),n=e.ownerDocument,r=n.defaultView||n.parentWindow;return t.left+=G(r),t.top+=X(r),t}var K,Q=new RegExp("^(".concat(/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,")(?!px)[a-z%]+$"),"i"),J=/^(top|right|bottom|left)$/,Z="currentStyle",ee="runtimeStyle",te="left";function ne(e,t){for(var n=0;n<e.length;n++)t(e[n])}function re(e){return"border-box"===K(e,"boxSizing")}"undefined"!=typeof window&&(K=window.getComputedStyle?function(e,t,n){var r="",o=e.ownerDocument,i=n||o.defaultView.getComputedStyle(e,null);return i&&(r=i.getPropertyValue(t)||i[t]),r}:function(e,t){var n=e[Z]&&e[Z][t];if(Q.test(n)&&!J.test(t)){var r=e.style,o=r[te],i=e[ee][te];e[ee][te]=e[Z][te],r[te]="fontSize"===t?"1em":n||0,n=r.pixelLeft+"px",r[te]=o,e[ee][te]=i}return""===n?"auto":n});var oe=["margin","border","padding"];function ie(e,t,n){var r,o,i,a=0;for(o=0;o<t.length;o++)if(r=t[o])for(i=0;i<n.length;i++){var l;l="border"===r?"".concat(r+n[i],"Width"):r+n[i],a+=parseFloat(K(e,l))||0}return a}function ae(e){return null!=e&&e==e.window}var le={};function se(e,t,n){if(ae(e))return"width"===t?le.viewportWidth(e):le.viewportHeight(e);if(9===e.nodeType)return"width"===t?le.docWidth(e):le.docHeight(e);var r="width"===t?["Left","Right"]:["Top","Bottom"],o="width"===t?e.offsetWidth:e.offsetHeight,i=(K(e),re(e)),a=0;(null==o||o<=0)&&(o=void 0,(null==(a=K(e,t))||Number(a)<0)&&(a=e.style[t]||0),a=parseFloat(a)||0),void 0===n&&(n=i?1:-1);var l=void 0!==o||i,s=o||a;if(-1===n)return l?s-ie(e,["border","padding"],r):a;if(l){var c=2===n?-ie(e,["border"],r):ie(e,["margin"],r);return s+(1===n?0:c)}return a+ie(e,oe.slice(n),r)}ne(["Width","Height"],function(e){le["doc".concat(e)]=function(t){var n=t.document;return Math.max(n.documentElement["scroll".concat(e)],n.body["scroll".concat(e)],le["viewport".concat(e)](n))},le["viewport".concat(e)]=function(t){var n="client".concat(e),r=t.document,o=r.body,i=r.documentElement[n];return"CSS1Compat"===r.compatMode&&i||o&&o[n]||i}});var ce={position:"absolute",visibility:"hidden",display:"block"};function ue(e){var t,n=arguments;return 0!==e.offsetWidth?t=se.apply(void 0,n):function(e,r){var o,i={},a=e.style;for(o in r)r.hasOwnProperty(o)&&(i[o]=a[o],a[o]=r[o]);for(o in function(){t=se.apply(void 0,n)}.call(e),r)r.hasOwnProperty(o)&&(a[o]=i[o])}(e,ce),t}function pe(e,t,n){var r=n;if("object"!==U(t))return void 0!==r?("number"==typeof r&&(r+="px"),void(e.style[t]=r)):K(e,t);for(var o in t)t.hasOwnProperty(o)&&pe(e,o,t[o])}ne(["width","height"],function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);le["outer".concat(t)]=function(t,n){return t&&ue(t,e,n?0:1)};var n="width"===e?["Left","Right"]:["Top","Bottom"];le[e]=function(t,r){return void 0===r?t&&ue(t,e,-1):t?(K(t),re(t)&&(r+=ie(t,["padding","border"],n)),pe(t,e,r)):void 0}});var de=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(n,!0).forEach(function(t){W(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({getWindow:function(e){var t=e.ownerDocument||e;return t.defaultView||t.parentWindow},offset:function(e,t){if(void 0===t)return Y(e);!function(e,t){"static"===pe(e,"position")&&(e.style.position="relative");var n,r,o=Y(e),i={};for(r in t)t.hasOwnProperty(r)&&(n=parseFloat(pe(e,r))||0,i[r]=n+t[r]-o[r]);pe(e,i)}(e,t)},isWindow:ae,each:ne,css:pe,clone:function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);if(e.overflow)for(var r in e)e.hasOwnProperty(r)&&(t.overflow[r]=e.overflow[r]);return t},scrollLeft:function(e,t){if(ae(e)){if(void 0===t)return G(e);window.scrollTo(t,X(e))}else{if(void 0===t)return e.scrollLeft;e.scrollLeft=t}},scrollTop:function(e,t){if(ae(e)){if(void 0===t)return X(e);window.scrollTo(G(e),t)}else{if(void 0===t)return e.scrollTop;e.scrollTop=t}},viewportWidth:0,viewportHeight:0},le);function fe(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var me=function(e){e.preventDefault()};const he=function(t){var r,o=t.selectedIndex,i=t.scrollIntoView,a=t.searchValue,l=t.onHover,s=t.onSelect,c=t.suggestions,u=void 0===c?[]:c,p=t.instanceId,d=t.__experimentalRenderItem,f=function(e){if(Array.isArray(e))return e}(r=(0,M.useState)(!1))||function(e){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,r,o,i,a=[],l=!0,s=!1;try{for(o=(t=t.call(e)).next;!(l=(n=o.call(t)).done)&&(a.push(n.value),2!==a.length);l=!0);}catch(e){s=!0,r=e}finally{try{if(!l&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(s)throw r}}return a}}(r)||function(e){if(e){if("string"==typeof e)return fe(e,2);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?fe(e,2):void 0}}(r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),m=f[0],h=f[1],g=(0,n.useRefEffect)(function(e){var t;return o>-1&&i&&e.children[o]&&(h(!0),function(e,t,n){n=n||{},9===t.nodeType&&(t=de.getWindow(t));var r=n.allowHorizontalScroll,o=n.onlyScrollIfNeeded,i=n.alignWithTop,a=n.alignWithLeft,l=n.offsetTop||0,s=n.offsetLeft||0,c=n.offsetBottom||0,u=n.offsetRight||0;r=void 0===r||r;var p,d,f,m,h,g,v,b,x,w,y=de.isWindow(t),k=de.offset(e),_=de.outerHeight(e),S=de.outerWidth(e);y?(v=t,w=de.height(v),x=de.width(v),b={left:de.scrollLeft(v),top:de.scrollTop(v)},h={left:k.left-b.left-s,top:k.top-b.top-l},g={left:k.left+S-(b.left+x)+u,top:k.top+_-(b.top+w)+c},m=b):(p=de.offset(t),d=t.clientHeight,f=t.clientWidth,m={left:t.scrollLeft,top:t.scrollTop},h={left:k.left-(p.left+(parseFloat(de.css(t,"borderLeftWidth"))||0))-s,top:k.top-(p.top+(parseFloat(de.css(t,"borderTopWidth"))||0))-l},g={left:k.left+S-(p.left+f+(parseFloat(de.css(t,"borderRightWidth"))||0))+u,top:k.top+_-(p.top+d+(parseFloat(de.css(t,"borderBottomWidth"))||0))+c}),h.top<0||g.top>0?!0===i?de.scrollTop(t,m.top+h.top):!1===i?de.scrollTop(t,m.top+g.top):h.top<0?de.scrollTop(t,m.top+h.top):de.scrollTop(t,m.top+g.top):o||((i=void 0===i||!!i)?de.scrollTop(t,m.top+h.top):de.scrollTop(t,m.top+g.top)),r&&(h.left<0||g.left>0?!0===a?de.scrollLeft(t,m.left+h.left):!1===a?de.scrollLeft(t,m.left+g.left):h.left<0?de.scrollLeft(t,m.left+h.left):de.scrollLeft(t,m.left+g.left):o||((a=void 0===a||!!a)?de.scrollLeft(t,m.left+h.left):de.scrollLeft(t,m.left+g.left)))}(e.children[o],e,{onlyScrollIfNeeded:!0}),t=requestAnimationFrame(function(){h(!1)})),function(){void 0!==t&&cancelAnimationFrame(t)}},[o,i]),v=function(e){return function(){m||null==l||l(e)}},b=function(e){return function(){null==s||s(e)}};return React.createElement("ul",{ref:g,className:"codeamp-components-multi-select-control__suggestions-list",id:"".concat(p,"-suggestions"),role:"listbox"},0===u.length&&React.createElement("li",{className:"codeamp-components-multi-select-control__no-suggestions",role:"option"},(0,e.__)("No results found.","codeamp-block-components")),u.map(function(e,t){var n,r=function(e){var t=e.label.toLocaleLowerCase().indexOf(a);return{suggestionBeforeMatch:e.label.substring(0,t),suggestionMatch:e.label.substring(t,t+a.length),suggestionAfterMatch:e.label.substring(t+a.length)}}(e),i=_()("codeamp-components-multi-select-control__suggestion",{"is-selected":t===o});return n="function"==typeof d?d({item:e}):r?React.createElement("span",{"aria-label":e.label},r.suggestionBeforeMatch,React.createElement("strong",{className:"codeamp-components-multi-select-control__suggestion-match"},r.suggestionMatch),r.suggestionAfterMatch):e.label,React.createElement("li",{id:"".concat(p,"-suggestions-").concat(t),role:"option",className:i,key:e.value,onMouseDown:me,onClick:b(e),onMouseEnter:v(e),"aria-selected":t===o},n)}))};var ge=r(192),ve={};function be(){return be=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},be.apply(null,arguments)}function xe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function we(e,t,n){return(t=function(e){var t=function(e){if("object"!=ye(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=ye(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==ye(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ye(e){return ye="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ye(e)}function ke(e){return function(e){if(Array.isArray(e))return Ae(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Se(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _e(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,a,l=[],s=!0,c=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=i.call(n)).done)&&(l.push(r.value),l.length!==t);s=!0);}catch(e){c=!0,o=e}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(c)throw o}}return l}}(e,t)||Se(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Se(e,t){if(e){if("string"==typeof e)return Ae(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ae(e,t):void 0}}function Ae(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function je(e){if(""===e)return null;var t=null!=e?e:"";return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).find(function(e){return-1!==e.label.toLocaleLowerCase().indexOf(t.trim().toLocaleLowerCase())})}ve.styleTagTransform=x(),ve.setAttributes=h(),ve.insert=f().bind(null,"head"),ve.domAPI=p(),ve.insertStyleElement=v(),c()(ge.A,ve),ge.A&&ge.A.locals&&ge.A.locals;var ze=function(){};function Oe(r){var o=r.autoCapitalize,i=r.autoComplete,a=r.maxLength,l=r.placeholder,s=r.label,c=void 0===s?(0,e.__)("Add item"):s,u=r.help,p=r.className,d=r.suggestions,f=void 0===d?[]:d,m=r.options,h=void 0===m?[]:m,g=r.maxSuggestions,v=void 0===g?100:g,b=r.value,x=void 0===b?[]:b,w=r.onChange,y=void 0===w?function(){}:w,k=r.onInputChange,S=void 0===k?function(){}:k,A=r.onFocus,j=void 0===A?void 0:A,z=(r.isBorderless,r.id),O=r.disabled,C=void 0!==O&&O,E=r.messages,T=void 0===E?{added:(0,e.__)("Item added."),removed:(0,e.__)("Item removed."),remove:(0,e.__)("Remove item"),__experimentalInvalid:(0,e.__)("Invalid item")}:E,I=r.__experimentalRenderItem,$=r.__experimentalAutoSelectFirstMatch,L=void 0===$||$,D=r.__experimentalValidateInput,B=void 0===D?function(){return!0}:D,F=r.__experimentalCloseSuggestionsOnSelect,U=void 0===F||F,W=(0,n.useInstanceId)(Oe,"codeamp-components-multi-select-control");z&&(W=z);var V=_e((0,M.useState)(""),2),q=V[0],G=V[1],X=_e((0,M.useState)(0),2),Y=X[0],K=X[1],Q=_e((0,M.useState)(!1),2),J=Q[0],Z=Q[1],ee=_e((0,M.useState)(!1),2),te=ee[0],ne=ee[1],re=_e((0,M.useState)(-1),2),oe=re[0],ie=re[1],ae=_e((0,M.useState)(!1),2),le=ae[0],se=ae[1],ce=(0,n.usePrevious)(f),ue=(0,n.usePrevious)(x),pe=(0,M.useRef)(null),de=(0,M.useRef)(null),fe=(0,n.useDebounce)(P.speak,500);function me(){var e;null===(e=pe.current)||void 0===e||e.focus()}function ge(){var e;return pe.current===(null===(e=pe.current)||void 0===e?void 0:e.ownerDocument.activeElement)}function ve(e){ge()||e.target===de.current?(Z(!0),ne(!0)):Z(!1),"function"==typeof j&&j(e)}function Se(e){e.target===de.current&&J&&e.preventDefault()}function Ae(e){Pe(e.value),me()}function Ce(e){var t=!1;return ge()&&Ne()&&(e(),t=!0),t}function Ee(){var e=Le()-1;e>-1&&Pe(x[e])}function Te(){var e=Le();e<x.length&&(Pe(x[e]),function(e){K(x.length-Math.max(e,-1)-1)}(e))}function Me(e){B(e.label)?(function(e){if(ke(new Set(e.filter(function(e){return!function(e){return x.some(function(t){return Ie(e)===Ie(t)})}(e)}))),e.length>0){var t=ke(x);t.splice.apply(t,[Le(),0].concat(ke(e))),y(t)}}([e.value]),(0,P.speak)(T.added,"assertive"),G(""),se(!1),ie(-1),U&&ne(!1),J&&me()):(0,P.speak)(T.__experimentalInvalid,"assertive")}function Pe(e){var t=x.filter(function(t){return Ie(t)!==Ie(e)});y(t),(0,P.speak)(T.removed,"assertive")}function Ie(e){return"object"===ye(e)?e.value:e}function Re(){return h.filter(function(e){return-1===x.indexOf(e.value)})}function $e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re(),n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:v;if(""!==e.trim()){var r=[],o=[];t.forEach(function(t){var n=t.label.toLocaleLowerCase().indexOf(e.trim().toLocaleLowerCase());0===n?r.push(t):n>0&&o.push(t)}),t=r.concat(o)}return t.slice(0,n)}function Le(){return x.length-Y}function Ne(){return 0===q.length}function De(){var e;return(null===(e=je(q))||void 0===e||null===(e=e.label)||void 0===e?void 0:e.length)>0}function Be(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],n=$e(q),r=n.length>0;t&&(L&&r?(ie(0),se(!0)):(ie(-1),se(!1))),ie(0);var o=r?(0,e.sprintf)((0,e._n)("%d result found, use up and down arrow keys to navigate.","%d results found, use up and down arrow keys to navigate.",n.length),n.length):(0,e.__)("No results.");fe(o,"assertive")}function Fe(e){return h.find(function(t){return t.value===e})||null}(0,M.useEffect)(function(){J&&!ge()&&me()},[J]),(0,M.useEffect)(function(){var e=!R()(f,ce||[]);(e||x!==ue)&&Be(e)},[f,ce,x,ue]),(0,M.useEffect)(function(){Be()},[q]),C&&J&&(Z(!1),G(""));var He,Ue,We=_()(p,"codeamp-components-multi-select-control__input-container",{"is-active":J,"is-disabled":C}),Ve={className:"components-base-control codeamp-components-multi-select-control",tabIndex:-1},qe=$e();return C||(Ve=Object.assign({},Ve,{onKeyDown:function(e){var t=!1;if(!e.defaultPrevented){switch(e.code){case"Backspace":t=Ce(Ee);break;case"Enter":case"Space":t=function(){var e=!1,t=function(){if(-1!==oe)return $e()[oe]}();return t&&te?(Me(t),e=!0):De()&&""!==q.trim()&&(Me(q),e=!0),e}();break;case"ArrowLeft":t=function(){var e=!1;return Ne()&&(K(function(e){return Math.min(e+1,x.length)}),e=!0),e}();break;case"ArrowUp":t=te?(ie(function(e){return(0===e?$e(q,Re(),x,v).length:e)-1}),se(!0),!0):(ne(!0),ie(0),se(!0),!0);break;case"ArrowRight":t=function(){var e=!1;return Ne()&&(K(function(e){return Math.max(e-1,0)}),e=!0),e}();break;case"ArrowDown":t=te?(ie(function(e){return(e+1)%$e(q,Re(),x,v).length}),se(!0),!0):(ne(!0),ie(0),se(!0),!0);break;case"Delete":t=Ce(Te);break;case"Escape":t=function(e){return e.target instanceof HTMLInputElement&&(G(e.target.value),ne(!1),ie(-1),se(!1)),!0}(e)}t&&e.preventDefault()}},onKeyPress:function(e){var t=!1;44===e.charCode&&(De()&&Me(q),t=!0),t&&e.preventDefault()},onFocus:ve})),React.createElement(t.BaseControl,{id:W,label:c,help:u},React.createElement("div",Ve,React.createElement("div",{ref:de,className:We,tabIndex:-1,onMouseDown:Se,onTouchStart:Se},React.createElement(t.Flex,{className:"codeamp-components-multi-select-control__tokens-container",justify:"flex-start",align:"flex-start",gap:"4px",wrap:!0,hasTokens:!!x.length},(Ue=[],x.forEach(function(e,n){var r=Fe(e);Fe(e)&&Ue.push(function(e,n){var r=e.value,o=e.label,i=e.onMouseEnter,a=void 0===i?ze:i,l=e.onMouseLeave,s=void 0===l?ze:l,c=e.isBorderless,u=void 0!==c&&c,p=r,d=n+1;return React.createElement(t.FlexItem,{key:"token-"+p},React.createElement(N,{value:p,label:o,title:"string"!=typeof token?o:void 0,onClickRemove:Ae,isBorderless:u,onMouseEnter:a,onMouseLeave:s,disabled:C,messages:T,termPosition:d,termsCount:x.length}))}(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?xe(Object(n),!0).forEach(function(t){we(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):xe(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},r),n))}),Ue.splice(Le(),0,(He={instanceId:W,autoCapitalize:o,autoComplete:i,placeholder:0===x.length?l:"",key:"input",disabled:C,value:q,onBlur:function(){De()?Z(!1):(G(""),K(0),Z(!1),ne(!1),ie(-1),se(!1))},isExpanded:te,selectedSuggestionIndex:oe,onClick:ve},React.createElement(H,be({},He,{onChange:a&&x.length>=a?void 0:function(e){var t=e.value;G(t),ne(!0),S(t)},ref:pe})))),Ue)),te&&React.createElement(he,{instanceId:W,match:je(q,h),searchValue:q.trim(),suggestions:qe,selectedIndex:oe,scrollIntoView:le,onHover:function(e){var t=$e().indexOf(e);t>=0&&(ie(t),se(!1))},onSelect:function(e){Me(e)},__experimentalRenderItem:I}))))}})();var i=t;for(var a in o)i[a]=o[a];o.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})()},398(e,t,n){"use strict";var r={};n.r(r),n.d(r,{VERSION:()=>wt,after:()=>Jr,all:()=>xo,allKeys:()=>In,any:()=>wo,assign:()=>Jn,before:()=>Zr,bind:()=>Br,bindAll:()=>Ur,chain:()=>$r,chunk:()=>ni,clone:()=>nr,collect:()=>fo,compact:()=>Vo,compose:()=>Qr,constant:()=>hn,contains:()=>yo,countBy:()=>Ro,create:()=>tr,debounce:()=>Xr,default:()=>ii,defaults:()=>Zn,defer:()=>qr,delay:()=>Vr,detect:()=>co,difference:()=>Go,drop:()=>Uo,each:()=>po,escape:()=>Sr,every:()=>xo,extend:()=>Qn,extendOwn:()=>Jn,filter:()=>vo,find:()=>co,findIndex:()=>ro,findKey:()=>to,findLastIndex:()=>oo,findWhere:()=>uo,first:()=>Ho,flatten:()=>qo,foldl:()=>ho,foldr:()=>go,forEach:()=>po,functions:()=>Yn,get:()=>lr,groupBy:()=>Po,has:()=>sr,head:()=>Ho,identity:()=>cr,include:()=>yo,includes:()=>yo,indexBy:()=>Io,indexOf:()=>lo,initial:()=>Fo,inject:()=>ho,intersection:()=>Qo,invert:()=>Xn,invoke:()=>ko,isArguments:()=>dn,isArray:()=>cn,isArrayBuffer:()=>Zt,isBoolean:()=>Wt,isDataView:()=>sn,isDate:()=>Yt,isElement:()=>Vt,isEmpty:()=>jn,isEqual:()=>Pn,isError:()=>Qt,isFinite:()=>fn,isFunction:()=>nn,isMap:()=>Hn,isMatch:()=>zn,isNaN:()=>mn,isNull:()=>Ht,isNumber:()=>Xt,isObject:()=>Ft,isRegExp:()=>Kt,isSet:()=>Wn,isString:()=>Gt,isSymbol:()=>Jt,isTypedArray:()=>yn,isUndefined:()=>Ut,isWeakMap:()=>Un,isWeakSet:()=>Vn,iteratee:()=>mr,keys:()=>An,last:()=>Wo,lastIndexOf:()=>so,map:()=>fo,mapObject:()=>gr,matcher:()=>ur,matches:()=>ur,max:()=>Ao,memoize:()=>Wr,methods:()=>Yn,min:()=>jo,mixin:()=>oi,negate:()=>Kr,noop:()=>vr,now:()=>yr,object:()=>ei,omit:()=>Bo,once:()=>eo,pairs:()=>Gn,partial:()=>Dr,partition:()=>$o,pick:()=>Do,pluck:()=>_o,property:()=>pr,propertyOf:()=>br,random:()=>wr,range:()=>ti,reduce:()=>ho,reduceRight:()=>go,reject:()=>bo,rest:()=>Uo,restArguments:()=>Bt,result:()=>Pr,sample:()=>Co,select:()=>vo,shuffle:()=>Eo,size:()=>Lo,some:()=>wo,sortBy:()=>To,sortedIndex:()=>io,tail:()=>Uo,take:()=>Ho,tap:()=>rr,template:()=>Mr,templateSettings:()=>jr,throttle:()=>Gr,times:()=>xr,toArray:()=>Oo,toPath:()=>or,transpose:()=>Jo,unescape:()=>Ar,union:()=>Ko,uniq:()=>Yo,unique:()=>Yo,uniqueId:()=>Rr,unzip:()=>Jo,values:()=>qn,where:()=>So,without:()=>Xo,wrap:()=>Yr,zip:()=>Zo});const o=window.wp.components,i=window.wp.element,a=window.wp.hooks,l=window.wp.i18n,s=window.wp.primitives,c=window.ReactJSXRuntime,u=(0,c.jsx)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,c.jsx)(s.Path,{fillRule:"evenodd",d:"M11.25 5h1.5v15h-1.5V5zM6 10h1.5v10H6V10zm12 4h-1.5v6H18v-6z",clipRule:"evenodd"})});function p(){return window?.prcWpAdminDataview?.dataset||{}}function d(e){const t=(p().zipStatuses||[]).find(t=>t.value===e);return t?t.label:"1"===e?(0,l.__)("Has ZIP file","prc-datasets"):(0,l.__)("Missing ZIP file","prc-datasets")}function f(e){const t=(p().downloadUnavailableStatuses||[]).find(t=>t.value===e);return t?t.label:"1"===e?(0,l.__)("Download unavailable","prc-datasets"):(0,l.__)("Download available","prc-datasets")}function m({onOpenStats:e}){return[{id:"zipStatus",label:(0,l.__)("ZIP file","prc-datasets"),getValue:({item:e})=>e?.hasZip||"0",render:({item:e})=>(0,c.jsx)("span",{children:d(e?.hasZip||"0")}),elements:(p().zipStatuses||[]).map(e=>({value:e.value,label:e.label})),filterBy:{operators:["is"],isPrimary:!0},enableSorting:!1},{id:"downloadUnavailable",label:(0,l.__)("Download","prc-datasets"),getValue:({item:e})=>e?.downloadUnavailable||"0",render:({item:e})=>(0,c.jsx)("span",{children:f(e?.downloadUnavailable||"0")}),elements:(p().downloadUnavailableStatuses||[]).map(e=>({value:e.value,label:e.label})),filterBy:{operators:["is"],isPrimary:!0},enableSorting:!1},{id:"totalDownloads",label:(0,l.__)("Downloads","prc-datasets"),getValue:({item:e})=>e?.totalDownloads??0,render:({item:e})=>(0,c.jsx)("span",{children:(e?.totalDownloads??0).toLocaleString()}),enableSorting:!1},{id:"stats",label:(0,l.__)("Stats","prc-datasets"),getValue:({item:e})=>(e?.totalDownloads??0)>0?(0,l.__)("Available","prc-datasets"):(0,l.__)("Unavailable","prc-datasets"),render:({item:t})=>{const n=(t?.totalDownloads??0)>0;return(0,c.jsx)(o.Button,{icon:u,label:(0,l.__)("View download analytics","prc-datasets"),size:"compact",disabled:!n,onClick:r=>{r.stopPropagation(),n&&e(t)}})},enableSorting:!1,enableHiding:!0},{id:"isAtp",label:(0,l.__)("ATP","prc-datasets"),getValue:({item:e})=>e?.isAtp?"1":"0",render:({item:e})=>e?.isAtp?(0,l.__)("Yes","prc-datasets"):(0,l.__)("No","prc-datasets"),enableSorting:!1}]}const h=window.wp.apiFetch;var g=n.n(h);const v=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function b({years:e,selectedYear:t,onYearChange:n,selectedMonth:r,onMonthChange:i,yearLabel:a=(0,l.__)("Select Year","prc-components"),monthLabel:s=(0,l.__)("Select Month","prc-components"),allMonthsLabel:u=(0,l.__)("All months","prc-components")}){const p=[{label:u,value:""},...v.map((e,t)=>({label:e,value:String(t+1).padStart(2,"0")}))];return(0,c.jsxs)(o.__experimentalVStack,{spacing:3,children:[(0,c.jsx)(o.SelectControl,{label:a,value:String(t),options:e.map(e=>({label:String(e),value:String(e)})),onChange:e=>{i(""),n(e)},__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0}),(0,c.jsx)(o.SelectControl,{label:s,value:r,options:p,onChange:i,__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0})]})}function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},x.apply(null,arguments)}const w=window.React;var y=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach(function(e){var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)}),this.tags=[],this.ctr=0},e}(),k=Math.abs,_=String.fromCharCode,S=Object.assign;function A(e){return e.trim()}function j(e,t,n){return e.replace(t,n)}function z(e,t){return e.indexOf(t)}function O(e,t){return 0|e.charCodeAt(t)}function C(e,t,n){return e.slice(t,n)}function E(e){return e.length}function T(e){return e.length}function M(e,t){return t.push(e),e}var P=1,I=1,R=0,$=0,L=0,N="";function D(e,t,n,r,o,i,a){return{value:e,root:t,parent:n,type:r,props:o,children:i,line:P,column:I,length:a,return:""}}function B(e,t){return S(D("",null,null,"",null,null,0),e,{length:-e.length},t)}function F(){return L=$>0?O(N,--$):0,I--,10===L&&(I=1,P--),L}function H(){return L=$<R?O(N,$++):0,I++,10===L&&(I=1,P++),L}function U(){return O(N,$)}function W(){return $}function V(e,t){return C(N,e,t)}function q(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function G(e){return P=I=1,R=E(N=e),$=0,[]}function X(e){return N="",e}function Y(e){return A(V($-1,J(91===e?e+2:40===e?e+1:e)))}function K(e){for(;(L=U())&&L<33;)H();return q(e)>2||q(L)>3?"":" "}function Q(e,t){for(;--t&&H()&&!(L<48||L>102||L>57&&L<65||L>70&&L<97););return V(e,W()+(t<6&&32==U()&&32==H()))}function J(e){for(;H();)switch(L){case e:return $;case 34:case 39:34!==e&&39!==e&&J(L);break;case 40:41===e&&J(e);break;case 92:H()}return $}function Z(e,t){for(;H()&&e+L!==57&&(e+L!==84||47!==U()););return"/*"+V(t,$-1)+"*"+_(47===e?e:H())}function ee(e){for(;!q(U());)H();return V(e,$)}var te="-ms-",ne="-moz-",re="-webkit-",oe="comm",ie="rule",ae="decl",le="@keyframes";function se(e,t){for(var n="",r=T(e),o=0;o<r;o++)n+=t(e[o],o,e,t)||"";return n}function ce(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case ae:return e.return=e.return||e.value;case oe:return"";case le:return e.return=e.value+"{"+se(e.children,r)+"}";case ie:e.value=e.props.join(",")}return E(n=se(e.children,r))?e.return=e.value+"{"+n+"}":""}function ue(e){return X(pe("",null,null,null,[""],e=G(e),0,[0],e))}function pe(e,t,n,r,o,i,a,l,s){for(var c=0,u=0,p=a,d=0,f=0,m=0,h=1,g=1,v=1,b=0,x="",w=o,y=i,k=r,S=x;g;)switch(m=b,b=H()){case 40:if(108!=m&&58==O(S,p-1)){-1!=z(S+=j(Y(b),"&","&\f"),"&\f")&&(v=-1);break}case 34:case 39:case 91:S+=Y(b);break;case 9:case 10:case 13:case 32:S+=K(m);break;case 92:S+=Q(W()-1,7);continue;case 47:switch(U()){case 42:case 47:M(fe(Z(H(),W()),t,n),s);break;default:S+="/"}break;case 123*h:l[c++]=E(S)*v;case 125*h:case 59:case 0:switch(b){case 0:case 125:g=0;case 59+u:-1==v&&(S=j(S,/\f/g,"")),f>0&&E(S)-p&&M(f>32?me(S+";",r,n,p-1):me(j(S," ","")+";",r,n,p-2),s);break;case 59:S+=";";default:if(M(k=de(S,t,n,c,u,o,l,x,w=[],y=[],p),i),123===b)if(0===u)pe(S,t,k,k,w,i,p,l,y);else switch(99===d&&110===O(S,3)?100:d){case 100:case 108:case 109:case 115:pe(e,k,k,r&&M(de(e,k,k,0,0,o,l,x,o,w=[],p),y),o,y,p,l,r?w:y);break;default:pe(S,k,k,k,[""],y,0,l,y)}}c=u=f=0,h=v=1,x=S="",p=a;break;case 58:p=1+E(S),f=m;default:if(h<1)if(123==b)--h;else if(125==b&&0==h++&&125==F())continue;switch(S+=_(b),b*h){case 38:v=u>0?1:(S+="\f",-1);break;case 44:l[c++]=(E(S)-1)*v,v=1;break;case 64:45===U()&&(S+=Y(H())),d=U(),u=p=E(x=S+=ee(W())),b++;break;case 45:45===m&&2==E(S)&&(h=0)}}return i}function de(e,t,n,r,o,i,a,l,s,c,u){for(var p=o-1,d=0===o?i:[""],f=T(d),m=0,h=0,g=0;m<r;++m)for(var v=0,b=C(e,p+1,p=k(h=a[m])),x=e;v<f;++v)(x=A(h>0?d[v]+" "+b:j(b,/&\f/g,d[v])))&&(s[g++]=x);return D(e,t,n,0===o?ie:l,s,c,u)}function fe(e,t,n){return D(e,t,n,oe,_(L),C(e,2,-2),0)}function me(e,t,n,r){return D(e,t,n,ae,C(e,0,r),C(e,r+1,-1),r)}var he=function(e,t,n){for(var r=0,o=0;r=o,o=U(),38===r&&12===o&&(t[n]=1),!q(o);)H();return V(e,$)},ge=new WeakMap,ve=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||ge.get(n))&&!r){ge.set(e,!0);for(var o=[],i=function(e,t){return X(function(e,t){var n=-1,r=44;do{switch(q(r)){case 0:38===r&&12===U()&&(t[n]=1),e[n]+=he($-1,t,n);break;case 2:e[n]+=Y(r);break;case 4:if(44===r){e[++n]=58===U()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=_(r)}}while(r=H());return e}(G(e),t))}(t,o),a=n.props,l=0,s=0;l<i.length;l++)for(var c=0;c<a.length;c++,s++)e.props[s]=o[l]?i[l].replace(/&\f/g,a[c]):a[c]+" "+i[l]}}},be=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}};function xe(e,t){switch(function(e,t){return 45^O(e,0)?(((t<<2^O(e,0))<<2^O(e,1))<<2^O(e,2))<<2^O(e,3):0}(e,t)){case 5103:return re+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return re+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return re+e+ne+e+te+e+e;case 6828:case 4268:return re+e+te+e+e;case 6165:return re+e+te+"flex-"+e+e;case 5187:return re+e+j(e,/(\w+).+(:[^]+)/,re+"box-$1$2"+te+"flex-$1$2")+e;case 5443:return re+e+te+"flex-item-"+j(e,/flex-|-self/,"")+e;case 4675:return re+e+te+"flex-line-pack"+j(e,/align-content|flex-|-self/,"")+e;case 5548:return re+e+te+j(e,"shrink","negative")+e;case 5292:return re+e+te+j(e,"basis","preferred-size")+e;case 6060:return re+"box-"+j(e,"-grow","")+re+e+te+j(e,"grow","positive")+e;case 4554:return re+j(e,/([^-])(transform)/g,"$1"+re+"$2")+e;case 6187:return j(j(j(e,/(zoom-|grab)/,re+"$1"),/(image-set)/,re+"$1"),e,"")+e;case 5495:case 3959:return j(e,/(image-set\([^]*)/,re+"$1$`$1");case 4968:return j(j(e,/(.+:)(flex-)?(.*)/,re+"box-pack:$3"+te+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+re+e+e;case 4095:case 3583:case 4068:case 2532:return j(e,/(.+)-inline(.+)/,re+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(E(e)-1-t>6)switch(O(e,t+1)){case 109:if(45!==O(e,t+4))break;case 102:return j(e,/(.+:)(.+)-([^]+)/,"$1"+re+"$2-$3$1"+ne+(108==O(e,t+3)?"$3":"$2-$3"))+e;case 115:return~z(e,"stretch")?xe(j(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==O(e,t+1))break;case 6444:switch(O(e,E(e)-3-(~z(e,"!important")&&10))){case 107:return j(e,":",":"+re)+e;case 101:return j(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+re+(45===O(e,14)?"inline-":"")+"box$3$1"+re+"$2$3$1"+te+"$2box$3")+e}break;case 5936:switch(O(e,t+11)){case 114:return re+e+te+j(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return re+e+te+j(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return re+e+te+j(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return re+e+te+e+e}return e}var we=[function(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case ae:e.return=xe(e.value,e.length);break;case le:return se([B(e,{value:j(e.value,"@","@"+re)})],r);case ie:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,function(t){switch(function(e){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return se([B(e,{props:[j(t,/:(read-\w+)/,":-moz-$1")]})],r);case"::placeholder":return se([B(e,{props:[j(t,/:(plac\w+)/,":"+re+"input-$1")]}),B(e,{props:[j(t,/:(plac\w+)/,":-moz-$1")]}),B(e,{props:[j(t,/:(plac\w+)/,te+"input-$1")]})],r)}return""})}}],ye=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))})}var r,o,i=e.stylisPlugins||we,a={},l=[];r=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)a[t[n]]=!0;l.push(e)});var s,c,u,p,d=[ce,(p=function(e){s.insert(e)},function(e){e.root||(e=e.return)&&p(e)})],f=(c=[ve,be].concat(i,d),u=T(c),function(e,t,n,r){for(var o="",i=0;i<u;i++)o+=c[i](e,t,n,r)||"";return o});o=function(e,t,n,r){s=n,se(ue(e?e+"{"+t.styles+"}":t.styles),f),r&&(m.inserted[t.name]=!0)};var m={key:t,sheet:new y({key:t,container:r,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:a,registered:{},insert:o};return m.sheet.hydrate(l),m},ke={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function _e(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}var Se=/[A-Z]|^ms/g,Ae=/_EMO_([^_]+?)_([^]*?)_EMO_/g,je=function(e){return 45===e.charCodeAt(1)},ze=function(e){return null!=e&&"boolean"!=typeof e},Oe=_e(function(e){return je(e)?e:e.replace(Se,"-$&").toLowerCase()}),Ce=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(Ae,function(e,t,n){return Te={name:t,styles:n,next:Te},t})}return 1===ke[e]||je(e)||"number"!=typeof t||0===t?t:t+"px"};function Ee(e,t,n){if(null==n)return"";var r=n;if(void 0!==r.__emotion_styles)return r;switch(typeof n){case"boolean":return"";case"object":var o=n;if(1===o.anim)return Te={name:o.name,styles:o.styles,next:Te},o.name;var i=n;if(void 0!==i.styles){var a=i.next;if(void 0!==a)for(;void 0!==a;)Te={name:a.name,styles:a.styles,next:Te},a=a.next;return i.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var o=0;o<n.length;o++)r+=Ee(e,t,n[o])+";";else for(var i in n){var a=n[i];if("object"!=typeof a){var l=a;null!=t&&void 0!==t[l]?r+=i+"{"+t[l]+"}":ze(l)&&(r+=Oe(i)+":"+Ce(i,l)+";")}else if(!Array.isArray(a)||"string"!=typeof a[0]||null!=t&&void 0!==t[a[0]]){var s=Ee(e,t,a);switch(i){case"animation":case"animationName":r+=Oe(i)+":"+s+";";break;default:r+=i+"{"+s+"}"}}else for(var c=0;c<a.length;c++)ze(a[c])&&(r+=Oe(i)+":"+Ce(i,a[c])+";")}return r}(e,t,n);case"function":if(void 0!==e){var l=Te,s=n(e);return Te=l,Ee(e,t,s)}}var c=n;if(null==t)return c;var u=t[c];return void 0!==u?u:c}var Te,Me=/label:\s*([^\s;{]+)\s*(;|$)/g,Pe=!!w.useInsertionEffect&&w.useInsertionEffect,Ie=Pe||function(e){return e()},Re=(Pe||w.useLayoutEffect,w.createContext("undefined"!=typeof HTMLElement?ye({key:"css"}):null)),$e=Re.Provider,Le=w.createContext({}),Ne=function(e,t,n){var r=e.key+"-"+t.name;!1===n&&void 0===e.registered[r]&&(e.registered[r]=t.styles)},De=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Be=_e(function(e){return De.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91}),Fe=function(e){return"theme"!==e},He=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Be:Fe},Ue=function(e,t,n){var r;if(t){var o=t.shouldForwardProp;r=e.__emotion_forwardProp&&o?function(t){return e.__emotion_forwardProp(t)&&o(t)}:o}return"function"!=typeof r&&n&&(r=e.__emotion_forwardProp),r},We=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;return Ne(t,n,r),Ie(function(){return function(e,t,n){Ne(e,t,n);var r=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var o=t;do{e.insert(t===o?"."+r:"",o,e.sheet,!0),o=o.next}while(void 0!==o)}}(t,n,r)}),null},Ve=function e(t,n){var r,o,i=t.__emotion_real===t,a=i&&t.__emotion_base||t;void 0!==n&&(r=n.label,o=n.target);var l=Ue(t,n,i),s=l||He(a),c=!s("as");return function(){var u=arguments,p=i&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==r&&p.push("label:"+r+";"),null==u[0]||void 0===u[0].raw)p.push.apply(p,u);else{var d=u[0];p.push(d[0]);for(var f=u.length,m=1;m<f;m++)p.push(u[m],d[m])}var h,g=(h=function(e,t,n){var r,i,u,d,f=c&&e.as||a,m="",h=[],g=e;if(null==e.theme){for(var v in g={},e)g[v]=e[v];g.theme=w.useContext(Le)}"string"==typeof e.className?(r=t.registered,i=h,u=e.className,d="",u.split(" ").forEach(function(e){void 0!==r[e]?i.push(r[e]+";"):e&&(d+=e+" ")}),m=d):null!=e.className&&(m=e.className+" ");var b=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,o="";Te=void 0;var i=e[0];null==i||void 0===i.raw?(r=!1,o+=Ee(n,t,i)):o+=i[0];for(var a=1;a<e.length;a++)o+=Ee(n,t,e[a]),r&&(o+=i[a]);Me.lastIndex=0;for(var l,s="";null!==(l=Me.exec(o));)s+="-"+l[1];var c=function(e){for(var t,n=0,r=0,o=e.length;o>=4;++r,o-=4)t=1540483477*(65535&(t=255&e.charCodeAt(r)|(255&e.charCodeAt(++r))<<8|(255&e.charCodeAt(++r))<<16|(255&e.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(o){case 3:n^=(255&e.charCodeAt(r+2))<<16;case 2:n^=(255&e.charCodeAt(r+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(r)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}(o)+s;return{name:c,styles:o,next:Te}}(p.concat(h),t.registered,g);m+=t.key+"-"+b.name,void 0!==o&&(m+=" "+o);var x=c&&void 0===l?He(f):s,y={};for(var k in e)c&&"as"===k||x(k)&&(y[k]=e[k]);return y.className=m,n&&(y.ref=n),w.createElement(w.Fragment,null,w.createElement(We,{cache:t,serialized:b,isStringTag:"string"==typeof f}),w.createElement(f,y))},(0,w.forwardRef)(function(e,t){var n=(0,w.useContext)(Re);return h(e,n,t)}));return g.displayName=void 0!==r?r:"Styled("+("string"==typeof a?a:a.displayName||a.name||"Component")+")",g.defaultProps=t.defaultProps,g.__emotion_real=g,g.__emotion_base=a,g.__emotion_styles=p,g.__emotion_forwardProp=l,Object.defineProperty(g,"toString",{value:function(){return"."+o}}),g.withComponent=function(t,r){return e(t,x({},n,r,{shouldForwardProp:Ue(g,r,!0)})).apply(void 0,p)},g}}.bind(null);["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){Ve[e]=Ve(e)});const qe={none:{background:"#fff",border:"var(--wp-admin-theme-color-lighter-70, #c5d9ed)",color:"var(--wp-admin-theme-color-darker-10, #006ba1)"},low:{background:"#ffffb2",border:"rgba(0, 0, 0, 0.1)",color:"#666"},medium:{background:"#fed976",border:"rgba(0, 0, 0, 0.1)",color:"#444"},high:{background:"#fd8d3c",border:"rgba(0, 0, 0, 0.1)",color:"#fff"},"very-high":{background:"#e31a1c",border:"rgba(0, 0, 0, 0.1)",color:"#fff"}},Ge=Ve.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
	max-width: 100%;

	@media (max-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
	}
`,Xe=Ve.div`
	appearance: none;
	font: inherit;
	width: 100%;
	margin: 0;
	position: relative;
	background: ${e=>qe[e.$heat].background};
	border: 1px solid ${e=>qe[e.$heat].border};
	border-radius: 4px;
	padding: 0.75rem;
	text-align: center;
	min-height: 70px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	transition: all 0.2s ease;
	color: ${e=>qe[e.$heat].color};
	cursor: ${e=>e.$interactive?"pointer":"default"};
	outline: ${e=>e.$highlight?"2px solid var(--wp-admin-theme-color, #007cba)":"none"};
	outline-offset: ${e=>e.$highlight?"2px":"0"};

	&::before {
		content: attr(data-month);
		position: absolute;
		top: 0.25rem;
		left: 0.5rem;
		font-size: 0.75rem;
		opacity: 0.8;
		color: ${e=>"none"===e.$heat?"var(--wp-admin-theme-color, #007cba)":qe[e.$heat].color};
	}

	&:hover {
		background: ${e=>"none"===e.$heat?"var(--wp-admin-theme-color-lighter-80, #e5f0f8)":qe[e.$heat].background};
	}

	&:focus-visible {
		outline: 2px solid var(--wp-admin-theme-color, #007cba);
		outline-offset: 2px;
	}
`,Ye=Ve.span`
	font-size: 1.25rem;
	font-weight: 600;
	color: ${e=>"none"===e.$heat?"var(--wp-admin-theme-color-darker-10, #006ba1)":qe[e.$heat].color};
`;function Ke({values:e,labels:t=[...v],renderValue:n,getTooltipText:r,getCellAriaLabel:i,onCellClick:a,highlightIndex:s=null,className:u}){const p="function"==typeof a;return(0,c.jsx)(Ge,{className:u,children:e.map((u,d)=>{const f=function(e,t){const n=Math.max(...t,0),r=n>0?e/n*100:0;return 0===e?"none":r<=25?"low":r<=50?"medium":r<=75?"high":"very-high"}(u,e),m=t[d]||String(d),h=n?n(u,d):u,g=r?.(u,d),v=(0,c.jsx)(Ye,{$heat:f,children:h}),b=i?.(u,d)||(p?(0,l.sprintf)(/* translators: %s: month or day label */ /* translators: %s: month or day label */
(0,l.__)("View %s analytics","prc-components"),m):void 0),x=(0,c.jsx)(Xe,{as:p?"button":"div",type:p?"button":void 0,"data-month":m,"data-heat":f,"data-index":d,$heat:f,$highlight:s===d,$interactive:p,onClick:p?()=>{a(d)}:void 0,"aria-label":b,children:v},m);return g?(0,c.jsx)(o.Tooltip,{text:g,children:x},m):x})})}const Qe={verified:(0,l.__)("Verified","prc-platform-core"),unverified:(0,l.__)("Unverified","prc-platform-core"),all:(0,l.__)("All recipients","prc-platform-core")};[{id:"count",label:(0,l.__)("Recipients","prc-platform-core"),type:"integer",readOnly:!0},{id:"verification",label:(0,l.__)("Verification","prc-platform-core"),type:"text",readOnly:!0,elements:Object.entries(Qe).map(([e,t])=>({value:e,label:t}))},{id:"builtAt",label:(0,l.__)("Built","prc-platform-core"),type:"datetime",readOnly:!0,render:({item:e,field:t})=>null===e.builtAt?(0,l.__)("Not available","prc-platform-core"):t.getValueFormatted({item:e,field:t})},{id:"key",label:(0,l.__)("Key","prc-platform-core"),type:"text",readOnly:!0,render:({item:e})=>(0,i.createElement)("span",{className:"prc-audience-build-panel__key",title:e.key},e.key)},{id:"scanned",label:(0,l.__)("Scanned","prc-platform-core"),type:"integer",readOnly:!0,getValue:({item:e})=>e.stats?.scanned,isVisible:e=>void 0!==e.stats?.scanned},{id:"matched",label:(0,l.__)("Matched","prc-platform-core"),type:"integer",readOnly:!0,getValue:({item:e})=>e.stats?.matched,isVisible:e=>void 0!==e.stats?.matched},{id:"v2Groups",label:(0,l.__)("V2 groups","prc-platform-core"),type:"integer",readOnly:!0,getValue:({item:e})=>e.stats?.v2Groups,isVisible:e=>void 0!==e.stats?.v2Groups}].map(({id:e})=>e);const Je=window.wp.blockEditor;window.wp.data,window.wp.blocks,window.wp.wordcount;const Ze=window.wp.htmlEntities;new Map,window.wp.url;const et=window.wp.compose,tt=window.wp.coreData;Ve.div`
	width: 80vw;
	.block-editor-block-patterns-list {
		column-count: 3;
		.block-editor-block-patterns-list__list-item {
			break-inside: avoid-column !important;
		}
	}
`,Ve.div`
	background: white;
	position: sticky;
	top: 0;
	z-index: 100;
	input:focus {
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
	}
`;const nt=JSON.parse('{"prc":["arrow-right","angle-up","angle-right","clipboard-list","person-walking-arrow-loop-left","people-group","person-praying","person-booth","hands-praying","user-plus","backward","forward","bookmark","bookmark-outline","caret-up","caret-down","caret-right","caret-left","check","chevron-up","chevron-down","chevron-left","chevron-right","circle-chevron-up","circle-chevron-down","circle-chevron-left","circle-chevron-right","circle","circle-outline","circle-plus","circle-plus-outline","circle-minus","circle-minus-outline","circle-xmark","circle-xmark-outline","code","headphones","house","list","magnifying-glass","minus","plus","moon","moon-outline","sun","sun-outline","play","pause","print","share","share-nodes","xmark","chart-column","table","compare","arrow-right-long","circle-check","circle-check-outline","circle-x","circle-x-outline","graduation-cap","arrows-rotate","arrow-rotate-left","arrow-rotate-right","up-right-and-down-left-from-center","search","star","star-outline","download","file","file-outline","video","clipboard","clipboard-outline","link","presentation-screen","file-pdf","file-pdf-outline","upload","arrow-down-up-across-line","arrow-up-a-z","arrow-up-right-from-square","bars-progress","bars","bullhorn","calendar-week","circle-play","circle-play-outline","circle-question","circle-question-outline","cookie-bite","database","diamond-turn-right","earth-americas","file-arrow-down","file-lines","file-lines-outline","filter","fingerprint","fire","hat-wizard","icons","layer-group","lock","map","map-outline","newspaper","newspaper-outline","palette","passport","pen-to-square","pen-to-square-outline","rectangle-ad","recycle","signs-post","square-check","square-check-outline","tag","tags","temperature-three-quarters","timeline","trash-can","trash-can-outline","user-check","user-gear","user-graduate","user-lock","users-gear","users-line","users-viewfinder","window-restore","window-restore-outline","yin-yang","arrow-down-short-wide","arrow-up-short-wide","bars-staggered","chart-pie","chart-simple","circle-dot","circle-dot-outline","clock","clock-rotate-left","clock-outline","clone","clone-outline","comment","comment-outline","credit-card","credit-card-outline","i-cursor","image","image-outline","pen","shield-halved","sliders","stopwatch","bell","bell-outline","bell-slash","bell-slash-outline","envelope","envelope-outline","envelope-open","envelope-open-outline","envelope-open-text","envelope-circle-check","inbox","paper-plane","paper-plane-outline","card"],"brands":["apple","bluesky","discord","facebook","github","google","instagram","linkedin","mailchimp","microsoft","slack","sticker-mule","threads","tiktok","twitter","whatsapp","x-twitter","youtube"]}'),rt="prc",ot="brands",it={"column-chart":"chart-column",pdf:"file-pdf",x:"xmark",home:"house","globe-pointer":"earth-americas","chart-bar":"chart-column","building-magnifying-glass":"magnifying-glass","face-viewfinder":"users-viewfinder","filter-list":"filter",filters:"filter","lock-hashtag":"lock","pen-field":"pen-to-square","table-pivot":"table","rectangle-history-circle-plus":"circle-plus","square-dashed-circle-plus":"circle-plus","arrow-down-small-big":"arrow-down-short-wide","arrow-up-small-big":"arrow-up-short-wide","cards-blank":"clone","chess-clock":"stopwatch","clock-two":"clock","credit-card-front":"credit-card",donut:"chart-pie","input-text":"i-cursor","list-radio":"circle-dot","message-smile":"comment","rectangle-history":"clone","rectangle-vertical-history":"bars-staggered","shield-exclamation":"shield-halved",slider:"sliders","chart-bullet":"chart-simple","hexagon-image":"image","pen-circle":"pen","card-spade":"card","family-dress":"people-group",undo:"arrow-rotate-left","arrow-left-rotate":"arrow-rotate-left","arrow-rotate-back":"arrow-rotate-left","arrow-rotate-backward":"arrow-rotate-left",redo:"arrow-rotate-right","arrow-right-rotate":"arrow-rotate-right","arrow-rotate-forward":"arrow-rotate-right",history:"clock-rotate-left","chevron-circle-up":"circle-chevron-up","chevron-circle-down":"circle-chevron-down","chevron-circle-left":"circle-chevron-left","chevron-circle-right":"circle-chevron-right"};function at(e){return"string"!=typeof e||""===e?e:it[e]||e}function lt(e){return{kind:"missing",spriteLibrary:rt,icon:e}}function st(e,t,n,r){if("missing"===r||!n)return"";const o=`${e}/wp-content/plugins/prc-icon-library/build/icons`;return t===ot||r===ot?`${o}/brands.svg#${n}`:t===rt||r===rt?`${o}/prc.svg#${n}`:""}function ct({library:e=rt,icon:t,curatedNames:n=[],approvedBrandNames:r=[]}){const o=at(t);return("string"==typeof e&&""!==e?e:rt)===ot?r.includes(o)?{kind:"brands",spriteLibrary:ot,icon:o}:lt(o):n.includes(o)?{kind:"prc",spriteLibrary:rt,icon:o}:lt(o)}const ut=new Map,pt=["px","em","rem","%","vw","vh","vmin","vmax","ex","ch","cm","mm","in","pt","pc"],dt=(0,i.memo)(({library:e=rt,icon:t,size:n=1,color:r=null,className:o=""})=>{const a=ct({library:e,icon:t,curatedNames:nt.prc,approvedBrandNames:nt.brands}),{spriteLibrary:l,kind:s}=a,u=a.icon,p="missing"===s,d=(0,i.useMemo)(()=>{const e=`${s}:${l}#${u}`;if(!ut.has(e)){const t="undefined"!=typeof window&&window.location?window.location.origin:"";ut.set(e,st(t,l,u,s))}return ut.get(e)},[s,l,u]),f=(0,i.useMemo)(()=>{return"number"==typeof n?`${n}em`:"string"==typeof n?(e=n,pt.some(t=>e.endsWith(t))?n:`${n}em`):void 0;var e},[n]),m=(0,i.useMemo)(()=>r?{color:`${r} !important`}:{},[r]),h=(0,i.useMemo)(()=>({width:f,height:f,...m}),[f,m]);if(!t||"string"!=typeof t||p)return null;const g=["icon",o].filter(Boolean).join(" ");return(0,c.jsx)("i",{className:g,children:(0,c.jsx)("svg",{style:h,children:(0,c.jsx)("use",{xlinkHref:d})})})});dt.displayName="Icon";const ft=dt,mt=JSON.parse('{"prc":["arrow-right","angle-up","angle-right","clipboard-list","person-walking-arrow-loop-left","people-group","person-praying","person-booth","hands-praying","user-plus","backward","forward","bookmark","bookmark-outline","caret-up","caret-down","caret-right","caret-left","check","chevron-up","chevron-down","chevron-left","chevron-right","circle-chevron-up","circle-chevron-down","circle-chevron-left","circle-chevron-right","circle","circle-outline","circle-plus","circle-plus-outline","circle-minus","circle-minus-outline","circle-xmark","circle-xmark-outline","code","headphones","house","list","magnifying-glass","minus","plus","moon","moon-outline","sun","sun-outline","play","pause","print","share","share-nodes","xmark","chart-column","table","compare","arrow-right-long","circle-check","circle-check-outline","circle-x","circle-x-outline","graduation-cap","arrows-rotate","arrow-rotate-left","arrow-rotate-right","up-right-and-down-left-from-center","search","star","star-outline","download","file","file-outline","video","clipboard","clipboard-outline","link","presentation-screen","file-pdf","file-pdf-outline","upload","arrow-down-up-across-line","arrow-up-a-z","arrow-up-right-from-square","bars-progress","bars","bullhorn","calendar-week","circle-play","circle-play-outline","circle-question","circle-question-outline","cookie-bite","database","diamond-turn-right","earth-americas","file-arrow-down","file-lines","file-lines-outline","filter","fingerprint","fire","hat-wizard","icons","layer-group","lock","map","map-outline","newspaper","newspaper-outline","palette","passport","pen-to-square","pen-to-square-outline","rectangle-ad","recycle","signs-post","square-check","square-check-outline","tag","tags","temperature-three-quarters","timeline","trash-can","trash-can-outline","user-check","user-gear","user-graduate","user-lock","users-gear","users-line","users-viewfinder","window-restore","window-restore-outline","yin-yang","arrow-down-short-wide","arrow-up-short-wide","bars-staggered","chart-pie","chart-simple","circle-dot","circle-dot-outline","clock","clock-rotate-left","clock-outline","clone","clone-outline","comment","comment-outline","credit-card","credit-card-outline","i-cursor","image","image-outline","pen","shield-halved","sliders","stopwatch","bell","bell-outline","bell-slash","bell-slash-outline","envelope","envelope-outline","envelope-open","envelope-open-outline","envelope-open-text","envelope-circle-check","inbox","paper-plane","paper-plane-outline","card"],"brands":["apple","bluesky","discord","facebook","github","google","instagram","linkedin","mailchimp","microsoft","slack","sticker-mule","threads","tiktok","twitter","whatsapp","x-twitter","youtube"]}');window.prcIcons||(window.prcIcons={Icon:ft,IconLibraryIndex:mt,curatedPrcIcons:nt,getIconSpriteHref:st,getIconSpriteSheetUrl:function(e,t,n){const r=st(e,t,"_",n);if(!r)return"";const o=r.lastIndexOf("#");return-1===o?r:r.slice(0,o)},resolveIconName:at,resolveIconSource:ct});const ht="prc",gt="brands",vt=(bt=nt,xt=mt.brands||[],{[ht]:[...bt.prc],[gt]:bt.brands.filter(e=>xt.includes(e))});var bt,xt;Object.keys(vt).map(e=>({label:"prc"===e?"PRC Icons":e.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),value:e})),(0,w.memo)(function({blocks:e,blockContextId:t,isHidden:n,setActiveBlockContextId:r}){const o=(0,Je.__experimentalUseBlockPreview)({blocks:e}),i={display:n?"none":void 0};return(0,c.jsx)("div",{...o,tabIndex:0,role:"button",onClick:()=>{r(t)},onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),r(t))},style:i})}),Ve(o.RangeControl)`
	.components-range-control__slider-wrapper {
		padding-bottom: 28px;
	}

	span.components-range-control__mark-label {
		padding-top: 4px;
		font-size: 11px;
	}
`;var wt="1.13.7",yt="object"==typeof self&&self.self===self&&self||"object"==typeof globalThis&&globalThis.global===globalThis&&globalThis||Function("return this")()||{},kt=Array.prototype,_t=Object.prototype,St="undefined"!=typeof Symbol?Symbol.prototype:null,At=kt.push,jt=kt.slice,zt=_t.toString,Ot=_t.hasOwnProperty,Ct="undefined"!=typeof ArrayBuffer,Et="undefined"!=typeof DataView,Tt=Array.isArray,Mt=Object.keys,Pt=Object.create,It=Ct&&ArrayBuffer.isView,Rt=isNaN,$t=isFinite,Lt=!{toString:null}.propertyIsEnumerable("toString"),Nt=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],Dt=Math.pow(2,53)-1;function Bt(e,t){return t=null==t?e.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),r=Array(n),o=0;o<n;o++)r[o]=arguments[o+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var i=Array(t+1);for(o=0;o<t;o++)i[o]=arguments[o];return i[t]=r,e.apply(this,i)}}function Ft(e){var t=typeof e;return"function"===t||"object"===t&&!!e}function Ht(e){return null===e}function Ut(e){return void 0===e}function Wt(e){return!0===e||!1===e||"[object Boolean]"===zt.call(e)}function Vt(e){return!(!e||1!==e.nodeType)}function qt(e){var t="[object "+e+"]";return function(e){return zt.call(e)===t}}const Gt=qt("String"),Xt=qt("Number"),Yt=qt("Date"),Kt=qt("RegExp"),Qt=qt("Error"),Jt=qt("Symbol"),Zt=qt("ArrayBuffer");var en=qt("Function"),tn=yt.document&&yt.document.childNodes;"object"!=typeof Int8Array&&"function"!=typeof tn&&(en=function(e){return"function"==typeof e||!1});const nn=en,rn=qt("Object");var on=Et&&(!/\[native code\]/.test(String(DataView))||rn(new DataView(new ArrayBuffer(8)))),an="undefined"!=typeof Map&&rn(new Map),ln=qt("DataView");const sn=on?function(e){return null!=e&&nn(e.getInt8)&&Zt(e.buffer)}:ln,cn=Tt||qt("Array");function un(e,t){return null!=e&&Ot.call(e,t)}var pn=qt("Arguments");!function(){pn(arguments)||(pn=function(e){return un(e,"callee")})}();const dn=pn;function fn(e){return!Jt(e)&&$t(e)&&!isNaN(parseFloat(e))}function mn(e){return Xt(e)&&Rt(e)}function hn(e){return function(){return e}}function gn(e){return function(t){var n=e(t);return"number"==typeof n&&n>=0&&n<=Dt}}function vn(e){return function(t){return null==t?void 0:t[e]}}const bn=vn("byteLength"),xn=gn(bn);var wn=/\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;const yn=Ct?function(e){return It?It(e)&&!sn(e):xn(e)&&wn.test(zt.call(e))}:hn(!1),kn=vn("length");function Sn(e,t){t=function(e){for(var t={},n=e.length,r=0;r<n;++r)t[e[r]]=!0;return{contains:function(e){return!0===t[e]},push:function(n){return t[n]=!0,e.push(n)}}}(t);var n=Nt.length,r=e.constructor,o=nn(r)&&r.prototype||_t,i="constructor";for(un(e,i)&&!t.contains(i)&&t.push(i);n--;)(i=Nt[n])in e&&e[i]!==o[i]&&!t.contains(i)&&t.push(i)}function An(e){if(!Ft(e))return[];if(Mt)return Mt(e);var t=[];for(var n in e)un(e,n)&&t.push(n);return Lt&&Sn(e,t),t}function jn(e){if(null==e)return!0;var t=kn(e);return"number"==typeof t&&(cn(e)||Gt(e)||dn(e))?0===t:0===kn(An(e))}function zn(e,t){var n=An(t),r=n.length;if(null==e)return!r;for(var o=Object(e),i=0;i<r;i++){var a=n[i];if(t[a]!==o[a]||!(a in o))return!1}return!0}function On(e){return e instanceof On?e:this instanceof On?void(this._wrapped=e):new On(e)}function Cn(e){return new Uint8Array(e.buffer||e,e.byteOffset||0,bn(e))}On.VERSION=wt,On.prototype.value=function(){return this._wrapped},On.prototype.valueOf=On.prototype.toJSON=On.prototype.value,On.prototype.toString=function(){return String(this._wrapped)};var En="[object DataView]";function Tn(e,t,n,r){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return!1;if(e!=e)return t!=t;var o=typeof e;return("function"===o||"object"===o||"object"==typeof t)&&Mn(e,t,n,r)}function Mn(e,t,n,r){e instanceof On&&(e=e._wrapped),t instanceof On&&(t=t._wrapped);var o=zt.call(e);if(o!==zt.call(t))return!1;if(on&&"[object Object]"==o&&sn(e)){if(!sn(t))return!1;o=En}switch(o){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:0===+e?1/+e==1/t:+e===+t;case"[object Date]":case"[object Boolean]":return+e===+t;case"[object Symbol]":return St.valueOf.call(e)===St.valueOf.call(t);case"[object ArrayBuffer]":case En:return Mn(Cn(e),Cn(t),n,r)}var i="[object Array]"===o;if(!i&&yn(e)){if(bn(e)!==bn(t))return!1;if(e.buffer===t.buffer&&e.byteOffset===t.byteOffset)return!0;i=!0}if(!i){if("object"!=typeof e||"object"!=typeof t)return!1;var a=e.constructor,l=t.constructor;if(a!==l&&!(nn(a)&&a instanceof a&&nn(l)&&l instanceof l)&&"constructor"in e&&"constructor"in t)return!1}r=r||[];for(var s=(n=n||[]).length;s--;)if(n[s]===e)return r[s]===t;if(n.push(e),r.push(t),i){if((s=e.length)!==t.length)return!1;for(;s--;)if(!Tn(e[s],t[s],n,r))return!1}else{var c,u=An(e);if(s=u.length,An(t).length!==s)return!1;for(;s--;)if(!un(t,c=u[s])||!Tn(e[c],t[c],n,r))return!1}return n.pop(),r.pop(),!0}function Pn(e,t){return Tn(e,t)}function In(e){if(!Ft(e))return[];var t=[];for(var n in e)t.push(n);return Lt&&Sn(e,t),t}function Rn(e){var t=kn(e);return function(n){if(null==n)return!1;var r=In(n);if(kn(r))return!1;for(var o=0;o<t;o++)if(!nn(n[e[o]]))return!1;return e!==Bn||!nn(n[$n])}}var $n="forEach",Ln=["clear","delete"],Nn=["get","has","set"],Dn=Ln.concat($n,Nn),Bn=Ln.concat(Nn),Fn=["add"].concat(Ln,$n,"has");const Hn=an?Rn(Dn):qt("Map"),Un=an?Rn(Bn):qt("WeakMap"),Wn=an?Rn(Fn):qt("Set"),Vn=qt("WeakSet");function qn(e){for(var t=An(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=e[t[o]];return r}function Gn(e){for(var t=An(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=[t[o],e[t[o]]];return r}function Xn(e){for(var t={},n=An(e),r=0,o=n.length;r<o;r++)t[e[n[r]]]=n[r];return t}function Yn(e){var t=[];for(var n in e)nn(e[n])&&t.push(n);return t.sort()}function Kn(e,t){return function(n){var r=arguments.length;if(t&&(n=Object(n)),r<2||null==n)return n;for(var o=1;o<r;o++)for(var i=arguments[o],a=e(i),l=a.length,s=0;s<l;s++){var c=a[s];t&&void 0!==n[c]||(n[c]=i[c])}return n}}const Qn=Kn(In),Jn=Kn(An),Zn=Kn(In,!0);function er(e){if(!Ft(e))return{};if(Pt)return Pt(e);var t=function(){};t.prototype=e;var n=new t;return t.prototype=null,n}function tr(e,t){var n=er(e);return t&&Jn(n,t),n}function nr(e){return Ft(e)?cn(e)?e.slice():Qn({},e):e}function rr(e,t){return t(e),e}function or(e){return cn(e)?e:[e]}function ir(e){return On.toPath(e)}function ar(e,t){for(var n=t.length,r=0;r<n;r++){if(null==e)return;e=e[t[r]]}return n?e:void 0}function lr(e,t,n){var r=ar(e,ir(t));return Ut(r)?n:r}function sr(e,t){for(var n=(t=ir(t)).length,r=0;r<n;r++){var o=t[r];if(!un(e,o))return!1;e=e[o]}return!!n}function cr(e){return e}function ur(e){return e=Jn({},e),function(t){return zn(t,e)}}function pr(e){return e=ir(e),function(t){return ar(t,e)}}function dr(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,i){return e.call(t,n,r,o,i)}}return function(){return e.apply(t,arguments)}}function fr(e,t,n){return null==e?cr:nn(e)?dr(e,t,n):Ft(e)&&!cn(e)?ur(e):pr(e)}function mr(e,t){return fr(e,t,1/0)}function hr(e,t,n){return On.iteratee!==mr?On.iteratee(e,t):fr(e,t,n)}function gr(e,t,n){t=hr(t,n);for(var r=An(e),o=r.length,i={},a=0;a<o;a++){var l=r[a];i[l]=t(e[l],l,e)}return i}function vr(){}function br(e){return null==e?vr:function(t){return lr(e,t)}}function xr(e,t,n){var r=Array(Math.max(0,e));t=dr(t,n,1);for(var o=0;o<e;o++)r[o]=t(o);return r}function wr(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))}On.toPath=or,On.iteratee=mr;const yr=Date.now||function(){return(new Date).getTime()};function kr(e){var t=function(t){return e[t]},n="(?:"+An(e).join("|")+")",r=RegExp(n),o=RegExp(n,"g");return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(o,t):e}}const _r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},Sr=kr(_r),Ar=kr(Xn(_r)),jr=On.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var zr=/(.)^/,Or={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},Cr=/\\|'|\r|\n|\u2028|\u2029/g;function Er(e){return"\\"+Or[e]}var Tr=/^\s*(\w|\$)+\s*$/;function Mr(e,t,n){!t&&n&&(t=n),t=Zn({},t,On.templateSettings);var r=RegExp([(t.escape||zr).source,(t.interpolate||zr).source,(t.evaluate||zr).source].join("|")+"|$","g"),o=0,i="__p+='";e.replace(r,function(t,n,r,a,l){return i+=e.slice(o,l).replace(Cr,Er),o=l+t.length,n?i+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?i+="'+\n((__t=("+r+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n";var a,l=t.variable;if(l){if(!Tr.test(l))throw new Error("variable is not a bare identifier: "+l)}else i="with(obj||{}){\n"+i+"}\n",l="obj";i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{a=new Function(l,"_",i)}catch(e){throw e.source=i,e}var s=function(e){return a.call(this,e,On)};return s.source="function("+l+"){\n"+i+"}",s}function Pr(e,t,n){var r=(t=ir(t)).length;if(!r)return nn(n)?n.call(e):n;for(var o=0;o<r;o++){var i=null==e?void 0:e[t[o]];void 0===i&&(i=n,o=r),e=nn(i)?i.call(e):i}return e}var Ir=0;function Rr(e){var t=++Ir+"";return e?e+t:t}function $r(e){var t=On(e);return t._chain=!0,t}function Lr(e,t,n,r,o){if(!(r instanceof t))return e.apply(n,o);var i=er(e.prototype),a=e.apply(i,o);return Ft(a)?a:i}var Nr=Bt(function(e,t){var n=Nr.placeholder,r=function(){for(var o=0,i=t.length,a=Array(i),l=0;l<i;l++)a[l]=t[l]===n?arguments[o++]:t[l];for(;o<arguments.length;)a.push(arguments[o++]);return Lr(e,r,this,this,a)};return r});Nr.placeholder=On;const Dr=Nr,Br=Bt(function(e,t,n){if(!nn(e))throw new TypeError("Bind must be called on a function");var r=Bt(function(o){return Lr(e,r,t,this,n.concat(o))});return r}),Fr=gn(kn);function Hr(e,t,n,r){if(r=r||[],t||0===t){if(t<=0)return r.concat(e)}else t=1/0;for(var o=r.length,i=0,a=kn(e);i<a;i++){var l=e[i];if(Fr(l)&&(cn(l)||dn(l)))if(t>1)Hr(l,t-1,n,r),o=r.length;else for(var s=0,c=l.length;s<c;)r[o++]=l[s++];else n||(r[o++]=l)}return r}const Ur=Bt(function(e,t){var n=(t=Hr(t,!1,!1)).length;if(n<1)throw new Error("bindAll must be passed function names");for(;n--;){var r=t[n];e[r]=Br(e[r],e)}return e});function Wr(e,t){var n=function(r){var o=n.cache,i=""+(t?t.apply(this,arguments):r);return un(o,i)||(o[i]=e.apply(this,arguments)),o[i]};return n.cache={},n}const Vr=Bt(function(e,t,n){return setTimeout(function(){return e.apply(null,n)},t)}),qr=Dr(Vr,On,1);function Gr(e,t,n){var r,o,i,a,l=0;n||(n={});var s=function(){l=!1===n.leading?0:yr(),r=null,a=e.apply(o,i),r||(o=i=null)},c=function(){var c=yr();l||!1!==n.leading||(l=c);var u=t-(c-l);return o=this,i=arguments,u<=0||u>t?(r&&(clearTimeout(r),r=null),l=c,a=e.apply(o,i),r||(o=i=null)):r||!1===n.trailing||(r=setTimeout(s,u)),a};return c.cancel=function(){clearTimeout(r),l=0,r=o=i=null},c}function Xr(e,t,n){var r,o,i,a,l,s=function(){var c=yr()-o;t>c?r=setTimeout(s,t-c):(r=null,n||(a=e.apply(l,i)),r||(i=l=null))},c=Bt(function(c){return l=this,i=c,o=yr(),r||(r=setTimeout(s,t),n&&(a=e.apply(l,i))),a});return c.cancel=function(){clearTimeout(r),r=i=l=null},c}function Yr(e,t){return Dr(t,e)}function Kr(e){return function(){return!e.apply(this,arguments)}}function Qr(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}}function Jr(e,t){return function(){if(--e<1)return t.apply(this,arguments)}}function Zr(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}}const eo=Dr(Zr,2);function to(e,t,n){t=hr(t,n);for(var r,o=An(e),i=0,a=o.length;i<a;i++)if(t(e[r=o[i]],r,e))return r}function no(e){return function(t,n,r){n=hr(n,r);for(var o=kn(t),i=e>0?0:o-1;i>=0&&i<o;i+=e)if(n(t[i],i,t))return i;return-1}}const ro=no(1),oo=no(-1);function io(e,t,n,r){for(var o=(n=hr(n,r,1))(t),i=0,a=kn(e);i<a;){var l=Math.floor((i+a)/2);n(e[l])<o?i=l+1:a=l}return i}function ao(e,t,n){return function(r,o,i){var a=0,l=kn(r);if("number"==typeof i)e>0?a=i>=0?i:Math.max(i+l,a):l=i>=0?Math.min(i+1,l):i+l+1;else if(n&&i&&l)return r[i=n(r,o)]===o?i:-1;if(o!=o)return(i=t(jt.call(r,a,l),mn))>=0?i+a:-1;for(i=e>0?a:l-1;i>=0&&i<l;i+=e)if(r[i]===o)return i;return-1}}const lo=ao(1,ro,io),so=ao(-1,oo);function co(e,t,n){var r=(Fr(e)?ro:to)(e,t,n);if(void 0!==r&&-1!==r)return e[r]}function uo(e,t){return co(e,ur(t))}function po(e,t,n){var r,o;if(t=dr(t,n),Fr(e))for(r=0,o=e.length;r<o;r++)t(e[r],r,e);else{var i=An(e);for(r=0,o=i.length;r<o;r++)t(e[i[r]],i[r],e)}return e}function fo(e,t,n){t=hr(t,n);for(var r=!Fr(e)&&An(e),o=(r||e).length,i=Array(o),a=0;a<o;a++){var l=r?r[a]:a;i[a]=t(e[l],l,e)}return i}function mo(e){return function(t,n,r,o){var i=arguments.length>=3;return function(t,n,r,o){var i=!Fr(t)&&An(t),a=(i||t).length,l=e>0?0:a-1;for(o||(r=t[i?i[l]:l],l+=e);l>=0&&l<a;l+=e){var s=i?i[l]:l;r=n(r,t[s],s,t)}return r}(t,dr(n,o,4),r,i)}}const ho=mo(1),go=mo(-1);function vo(e,t,n){var r=[];return t=hr(t,n),po(e,function(e,n,o){t(e,n,o)&&r.push(e)}),r}function bo(e,t,n){return vo(e,Kr(hr(t)),n)}function xo(e,t,n){t=hr(t,n);for(var r=!Fr(e)&&An(e),o=(r||e).length,i=0;i<o;i++){var a=r?r[i]:i;if(!t(e[a],a,e))return!1}return!0}function wo(e,t,n){t=hr(t,n);for(var r=!Fr(e)&&An(e),o=(r||e).length,i=0;i<o;i++){var a=r?r[i]:i;if(t(e[a],a,e))return!0}return!1}function yo(e,t,n,r){return Fr(e)||(e=qn(e)),("number"!=typeof n||r)&&(n=0),lo(e,t,n)>=0}const ko=Bt(function(e,t,n){var r,o;return nn(t)?o=t:(t=ir(t),r=t.slice(0,-1),t=t[t.length-1]),fo(e,function(e){var i=o;if(!i){if(r&&r.length&&(e=ar(e,r)),null==e)return;i=e[t]}return null==i?i:i.apply(e,n)})});function _o(e,t){return fo(e,pr(t))}function So(e,t){return vo(e,ur(t))}function Ao(e,t,n){var r,o,i=-1/0,a=-1/0;if(null==t||"number"==typeof t&&"object"!=typeof e[0]&&null!=e)for(var l=0,s=(e=Fr(e)?e:qn(e)).length;l<s;l++)null!=(r=e[l])&&r>i&&(i=r);else t=hr(t,n),po(e,function(e,n,r){((o=t(e,n,r))>a||o===-1/0&&i===-1/0)&&(i=e,a=o)});return i}function jo(e,t,n){var r,o,i=1/0,a=1/0;if(null==t||"number"==typeof t&&"object"!=typeof e[0]&&null!=e)for(var l=0,s=(e=Fr(e)?e:qn(e)).length;l<s;l++)null!=(r=e[l])&&r<i&&(i=r);else t=hr(t,n),po(e,function(e,n,r){((o=t(e,n,r))<a||o===1/0&&i===1/0)&&(i=e,a=o)});return i}var zo=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;function Oo(e){return e?cn(e)?jt.call(e):Gt(e)?e.match(zo):Fr(e)?fo(e,cr):qn(e):[]}function Co(e,t,n){if(null==t||n)return Fr(e)||(e=qn(e)),e[wr(e.length-1)];var r=Oo(e),o=kn(r);t=Math.max(Math.min(t,o),0);for(var i=o-1,a=0;a<t;a++){var l=wr(a,i),s=r[a];r[a]=r[l],r[l]=s}return r.slice(0,t)}function Eo(e){return Co(e,1/0)}function To(e,t,n){var r=0;return t=hr(t,n),_o(fo(e,function(e,n,o){return{value:e,index:r++,criteria:t(e,n,o)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(n<r||void 0===r)return-1}return e.index-t.index}),"value")}function Mo(e,t){return function(n,r,o){var i=t?[[],[]]:{};return r=hr(r,o),po(n,function(t,o){var a=r(t,o,n);e(i,t,a)}),i}}const Po=Mo(function(e,t,n){un(e,n)?e[n].push(t):e[n]=[t]}),Io=Mo(function(e,t,n){e[n]=t}),Ro=Mo(function(e,t,n){un(e,n)?e[n]++:e[n]=1}),$o=Mo(function(e,t,n){e[n?0:1].push(t)},!0);function Lo(e){return null==e?0:Fr(e)?e.length:An(e).length}function No(e,t,n){return t in n}const Do=Bt(function(e,t){var n={},r=t[0];if(null==e)return n;nn(r)?(t.length>1&&(r=dr(r,t[1])),t=In(e)):(r=No,t=Hr(t,!1,!1),e=Object(e));for(var o=0,i=t.length;o<i;o++){var a=t[o],l=e[a];r(l,a,e)&&(n[a]=l)}return n}),Bo=Bt(function(e,t){var n,r=t[0];return nn(r)?(r=Kr(r),t.length>1&&(n=t[1])):(t=fo(Hr(t,!1,!1),String),r=function(e,n){return!yo(t,n)}),Do(e,r,n)});function Fo(e,t,n){return jt.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))}function Ho(e,t,n){return null==e||e.length<1?null==t||n?void 0:[]:null==t||n?e[0]:Fo(e,e.length-t)}function Uo(e,t,n){return jt.call(e,null==t||n?1:t)}function Wo(e,t,n){return null==e||e.length<1?null==t||n?void 0:[]:null==t||n?e[e.length-1]:Uo(e,Math.max(0,e.length-t))}function Vo(e){return vo(e,Boolean)}function qo(e,t){return Hr(e,t,!1)}const Go=Bt(function(e,t){return t=Hr(t,!0,!0),vo(e,function(e){return!yo(t,e)})}),Xo=Bt(function(e,t){return Go(e,t)});function Yo(e,t,n,r){Wt(t)||(r=n,n=t,t=!1),null!=n&&(n=hr(n,r));for(var o=[],i=[],a=0,l=kn(e);a<l;a++){var s=e[a],c=n?n(s,a,e):s;t&&!n?(a&&i===c||o.push(s),i=c):n?yo(i,c)||(i.push(c),o.push(s)):yo(o,s)||o.push(s)}return o}const Ko=Bt(function(e){return Yo(Hr(e,!0,!0))});function Qo(e){for(var t=[],n=arguments.length,r=0,o=kn(e);r<o;r++){var i=e[r];if(!yo(t,i)){var a;for(a=1;a<n&&yo(arguments[a],i);a++);a===n&&t.push(i)}}return t}function Jo(e){for(var t=e&&Ao(e,kn).length||0,n=Array(t),r=0;r<t;r++)n[r]=_o(e,r);return n}const Zo=Bt(Jo);function ei(e,t){for(var n={},r=0,o=kn(e);r<o;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n}function ti(e,t,n){null==t&&(t=e||0,e=0),n||(n=t<e?-1:1);for(var r=Math.max(Math.ceil((t-e)/n),0),o=Array(r),i=0;i<r;i++,e+=n)o[i]=e;return o}function ni(e,t){if(null==t||t<1)return[];for(var n=[],r=0,o=e.length;r<o;)n.push(jt.call(e,r,r+=t));return n}function ri(e,t){return e._chain?On(t).chain():t}function oi(e){return po(Yn(e),function(t){var n=On[t]=e[t];On.prototype[t]=function(){var e=[this._wrapped];return At.apply(e,arguments),ri(this,n.apply(On,e))}}),On}po(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=kt[e];On.prototype[e]=function(){var n=this._wrapped;return null!=n&&(t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0]),ri(this,n)}}),po(["concat","join","slice"],function(e){var t=kt[e];On.prototype[e]=function(){var e=this._wrapped;return null!=e&&(e=t.apply(e,arguments)),ri(this,e)}});const ii=On;var ai=oi(r);ai._=ai,window.wp.mediaUtils,Ve(o.Button)`
	margin: 0 !important;
`,Ve.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`,Ve.button`
	cursor: pointer;
	background: none;
	border: none;
	margin: 0;
`,Ve.div`
	cursor: pointer;
	background: none;
	border: none;
	margin: 0;
`,window.lodash,window.wp.editor,Ve.div`
	background: inherit;
	position: relative;
`,Ve.div`
	background: var(--wp--preset--color--ui-gray-very-light);
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	clear: both;
	width: ${e=>e.aspectWidth}px;
	height: ${e=>e.aspectHeight}px;
	max-width: 100%;
	max-height: 100%;
`,console.log("placeholder"),n(471),w.PureComponent;const li='Georgia, "Times New Roman", Times, serif',si={instagram:{name:"Instagram",icon:(0,c.jsx)(ft,{icon:"instagram",library:"brands",size:"12px"}),width:1121,height:1920,layout:{backgroundColor:"#000000",image:{top:50,maxHeight:850},title:{fontFamily:li,fontSize:72,lineHeight:1.2,color:"#ffffff",marginTop:80,marginX:80,maxLines:4},logo:{height:80,marginBottom:80}}},threads:{name:"Threads",icon:(0,c.jsx)(ft,{icon:"threads",library:"brands",size:"12px"}),width:1080,height:1920,layout:{backgroundColor:"#000000",image:{top:50,maxHeight:850},title:{fontFamily:li,fontSize:68,lineHeight:1.2,color:"#ffffff",marginTop:80,marginX:70,maxLines:4},logo:{height:75,marginBottom:80}}},twitter:{name:"Twitter",icon:(0,c.jsx)(ft,{icon:"twitter",library:"brands",size:"12px"}),width:1200,height:675,layout:{backgroundColor:"#000000",image:{top:0,maxHeight:400},title:{fontFamily:li,fontSize:48,lineHeight:1.2,color:"#ffffff",marginTop:30,marginX:60,maxLines:3},logo:{height:50,marginBottom:30}}},bluesky:{name:"Bluesky",icon:(0,c.jsx)(ft,{icon:"bluesky",library:"brands",size:"12px"}),width:1200,height:630,layout:{backgroundColor:"#000000",image:{top:0,maxHeight:380},title:{fontFamily:li,fontSize:44,lineHeight:1.2,color:"#ffffff",marginTop:25,marginX:60,maxLines:3},logo:{height:45,marginBottom:25}}},facebook:{name:"Facebook",icon:(0,c.jsx)(ft,{icon:"facebook",library:"brands",size:"12px"}),width:1200,height:630,layout:{backgroundColor:"#000000",image:{top:0,maxHeight:380},title:{fontFamily:li,fontSize:44,lineHeight:1.2,color:"#ffffff",marginTop:25,marginX:60,maxLines:3},logo:{height:45,marginBottom:25}}},linkedin:{name:"LinkedIn",icon:(0,c.jsx)(ft,{icon:"linkedin",library:"brands",size:"12px"}),width:1200,height:627,layout:{backgroundColor:"#000000",image:{top:0,maxHeight:375},title:{fontFamily:li,fontSize:44,lineHeight:1.2,color:"#ffffff",marginTop:25,marginX:60,maxLines:3},logo:{height:45,marginBottom:25}}}};Object.keys(si),s.SVG,s.Path,s.SVG,s.Path,Ve.div`
	font-family: Helvetica, Arial, sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #65676b;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	background: #ffffff;
	max-width: 500px;
	border: 1px solid #dadde1;
	border-radius: 8px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	overflow: hidden;
`,Ve.div`
	display: flex;
	align-items: flex-start;
	gap: 8px;
	padding: 12px 16px 0;
`,Ve.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
	background: #e4e6eb;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #0866ff;
	color: white;
	font-size: 16px;
	font-weight: 700;
`,Ve.div`
	flex: 1;
	min-width: 0;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
`,Ve.span`
	font-size: 15px;
	font-weight: 600;
	color: #050505;
	line-height: 1.33;
`,Ve.svg`
	width: 15px;
	height: 15px;
	flex-shrink: 0;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 13px;
	color: #65676b;
	line-height: 1.23;
`,Ve.svg`
	width: 12px;
	height: 12px;
`,Ve.button`
	background: none;
	border: none;
	padding: 8px;
	cursor: pointer;
	color: #65676b;
	font-size: 20px;
	line-height: 1;
	margin-left: auto;
	border-radius: 50%;
	&:hover {
		background-color: #f0f2f5;
	}
`,Ve.div`
	padding: 4px 16px 12px;
	font-size: 15px;
	color: #050505;
	line-height: 1.33;
	word-wrap: break-word;
`,Ve.span`
	white-space: pre-wrap;
`,Ve.span`
	font-weight: 600;
	color: #050505;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`,Ve.div`
	width: 100%;
	background: #f0f2f5;
`,Ve.img`
	width: 100%;
	height: auto;
	display: block;
`,Ve.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 16px;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
`,Ve.div`
	display: flex;
	align-items: center;
`,Ve.div`
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: ${e=>e.bg};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;
	margin-left: -4px;
	border: 2px solid #ffffff;
	z-index: ${e=>e.zIndex};
	&:first-of-type {
		margin-left: 0;
	}
`,Ve.span`
	font-size: 15px;
	color: #65676b;
	margin-left: 4px;
`,Ve.div`
	font-size: 15px;
	color: #65676b;
`,Ve.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 4px 8px;
	border-top: 1px solid #dadde1;
`,Ve.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	background: none;
	border: none;
	padding: 12px 4px;
	cursor: pointer;
	color: #65676b;
	font-size: 15px;
	font-weight: 600;
	border-radius: 4px;
	transition: background-color 0.2s;
	flex: 1;

	&:hover {
		background-color: #f0f2f5;
	}

	svg {
		width: 20px;
		height: 20px;
	}
`,Ve.div`
	font-family:
		-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
		sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #536471;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	background: #ffffff;
	max-width: 500px;
	padding: 12px 16px;
	border: 1px solid #cfd9de;
	border-radius: 16px;
`,Ve.div`
	display: flex;
	align-items: flex-start;
	gap: 12px;
	margin-bottom: 4px;
`,Ve.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
	background: #cfd9de;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #1d9bf0;
	color: white;
	font-size: 18px;
	font-weight: 700;
`,Ve.div`
	flex: 1;
	min-width: 0;
`,Ve.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 4px;
	line-height: 1.25;
`,Ve.span`
	font-size: 15px;
	font-weight: 700;
	color: #0f1419;
`,Ve.svg`
	width: 18px;
	height: 18px;
	flex-shrink: 0;
`,Ve.span`
	font-size: 15px;
	color: #536471;
`,Ve.button`
	background: none;
	border: none;
	padding: 0;
	color: #536471;
	cursor: pointer;
	margin-left: auto;
	font-size: 18px;
	line-height: 1;
`,Ve.div`
	font-size: 15px;
	color: #0f1419;
	line-height: 1.4;
	margin-bottom: 12px;
	word-wrap: break-word;
	white-space: pre-wrap;
`,Ve.div`
	border: 1px solid #cfd9de;
	border-radius: 16px;
	overflow: hidden;
	cursor: pointer;
	transition: background-color 0.2s;
	&:hover {
		background-color: rgba(0, 0, 0, 0.03);
	}
`,Ve.div`
	width: 100%;
	height: 0;
	padding-bottom: 52.25%; /* Twitter card aspect ratio */
	position: relative;
	overflow: hidden;
	background: #f7f9f9;
`,Ve.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.77);
	padding: 8px 12px;
`,Ve.div`
	font-size: 15px;
	font-weight: 400;
	color: #ffffff;
	line-height: 1.3;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`,Ve.div`
	padding: 12px;
	font-size: 13px;
	color: #536471;
`,Ve.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 12px;
	max-width: 425px;
`,Ve.button`
	display: flex;
	align-items: center;
	gap: 4px;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	color: #536471;
	font-size: 13px;
	transition: color 0.2s;

	&:hover {
		color: #1d9bf0;
	}

	svg {
		width: 18.75px;
		height: 18.75px;
	}
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
`,Ve.div`
	font-family:
		-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
		sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #737373;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	border: 1px solid #dbdbdb;
	border-radius: 12px;
	overflow: hidden;
	background: #ffffff;
	max-width: 400px;
`,Ve.div`
	width: 100%;
	height: 0;
	padding-bottom: 100%; /* Square aspect ratio for Threads */
	position: relative;
	overflow: hidden;
	background: #fafafa;
`,Ve.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	padding: 12px;
`,Ve.div`
	font-size: 14px;
	font-weight: 600;
	color: #262626;
	line-height: 1.4;
	margin-bottom: 4px;
	word-wrap: break-word;
`,Ve.div`
	font-size: 14px;
	color: #737373;
	line-height: 1.4;
	margin-bottom: 8px;
	word-wrap: break-word;
`,Ve.div`
	font-size: 12px;
	color: #737373;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	font-family:
		-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
		sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #0085ff;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	background: #ffffff;
	max-width: 500px;
	padding: 16px;
	border: 1px solid #e0e0e0;
	border-radius: 12px;
`,Ve.div`
	display: flex;
	align-items: flex-start;
	gap: 10px;
	margin-bottom: 8px;
`,Ve.div`
	width: 42px;
	height: 42px;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
	background: #e0e0e0;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #0085ff;
	color: white;
	font-size: 18px;
	font-weight: 700;
`,Ve.div`
	flex: 1;
	min-width: 0;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
	line-height: 1.25;
`,Ve.span`
	font-size: 15px;
	font-weight: 700;
	color: #000000;
`,Ve.svg`
	width: 16px;
	height: 16px;
	flex-shrink: 0;
`,Ve.div`
	font-size: 14px;
	color: #666666;
	margin-top: 1px;
`,Ve.div`
	font-size: 15px;
	color: #000000;
	line-height: 1.5;
	margin-bottom: 12px;
	word-wrap: break-word;
	white-space: pre-wrap;
`,Ve.div`
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	overflow: hidden;
	cursor: pointer;
	transition: background-color 0.2s;
	&:hover {
		background-color: rgba(0, 0, 0, 0.02);
	}
`,Ve.div`
	width: 100%;
	height: 0;
	padding-bottom: 52.5%;
	position: relative;
	overflow: hidden;
	background: #f5f5f5;
`,Ve.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	padding: 12px;
`,Ve.div`
	font-size: 15px;
	font-weight: 700;
	color: #000000;
	line-height: 1.3;
	margin-bottom: 4px;
	word-wrap: break-word;
`,Ve.div`
	font-size: 14px;
	color: #666666;
	line-height: 1.4;
	margin-bottom: 8px;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 13px;
	color: #666666;
`,Ve.svg`
	width: 14px;
	height: 14px;
	flex-shrink: 0;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 12px 0;
	margin-top: 12px;
	border-top: 1px solid #e0e0e0;
	font-size: 14px;
	color: #666666;
`,Ve.span`
	color: #666666;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
`,Ve.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 12px;
	border-top: 1px solid #e0e0e0;
`,Ve.button`
	display: flex;
	align-items: center;
	gap: 6px;
	background: none;
	border: none;
	padding: 8px;
	cursor: pointer;
	color: #666666;
	font-size: 13px;
	border-radius: 25%;
	transition: all 0.2s;

	&:hover {
		background-color: rgba(0, 133, 255, 0.1);
		color: #0085ff;
	}

	svg {
		width: 20px;
		height: 20px;
	}
`,Ve.span`
	font-size: 13px;
	min-width: 16px;
`,Ve.div`
	font-family: Slack-Lato, Lato, appleLogo, sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #616061;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	background: #ffffff;
	max-width: 500px;
	padding: 8px 16px;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 4px;
`,Ve.div`
	width: 36px;
	height: 36px;
	border-radius: 4px;
	overflow: hidden;
	flex-shrink: 0;
	background: #e8e8e8;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #4a154b;
	color: white;
	font-size: 14px;
	font-weight: 700;
`,Ve.div`
	display: flex;
	align-items: baseline;
	gap: 6px;
`,Ve.span`
	font-size: 15px;
	font-weight: 900;
	color: #1d1c1d;
`,Ve.span`
	font-size: 12px;
	color: #616061;
`,Ve.div`
	font-size: 15px;
	color: #1d1c1d;
	line-height: 1.46668;
	margin-bottom: 4px;
	margin-left: 44px;
	word-wrap: break-word;
`,Ve.a`
	color: #1264a3;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`,Ve.div`
	margin-left: 44px;
	margin-top: 4px;
	border-left: 4px solid #e0e0e0;
	padding-left: 12px;
	max-width: 400px;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 4px;
`,Ve.img`
	width: 16px;
	height: 16px;
	border-radius: 2px;
`,Ve.div`
	width: 16px;
	height: 16px;
	border-radius: 2px;
	background: #e8e8e8;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	font-weight: 700;
	color: #616061;
`,Ve.span`
	font-size: 13px;
	font-weight: 700;
	color: #1d1c1d;
`,Ve.a`
	display: block;
	font-size: 15px;
	font-weight: 700;
	color: #1264a3;
	line-height: 1.375;
	margin-bottom: 4px;
	text-decoration: none;
	word-wrap: break-word;
	&:hover {
		text-decoration: underline;
	}
`,Ve.div`
	font-size: 15px;
	color: #1d1c1d;
	line-height: 1.46668;
	margin-bottom: 8px;
	word-wrap: break-word;
`,Ve.div`
	display: flex;
	gap: 40px;
	margin-bottom: 8px;
`,Ve.div`
	display: flex;
	flex-direction: column;
	gap: 0;
`,Ve.span`
	font-size: 13px;
	font-weight: 700;
	color: #1d1c1d;
`,Ve.span`
	font-size: 13px;
	color: #1d1c1d;
`,Ve.div`
	width: 100%;
	max-width: 360px;
	border-radius: 8px;
	overflow: hidden;
	background: #f8f8f8;
`,Ve.img`
	width: 100%;
	height: auto;
	display: block;
`,Ve.div`
	font-family: Whitney, 'Helvetica Neue', Helvetica, Arial, sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #72767d;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	border-left: 4px solid #5865f2;
	border-radius: 4px;
	background: #2f3136;
	max-width: 520px;
	overflow: hidden;
`,Ve.div`
	display: flex;
	gap: 16px;
	padding: 12px 8px 12px 12px;
`,Ve.div`
	flex-shrink: 0;
	width: 80px;
	height: 80px;
	border-radius: 4px;
	overflow: hidden;
	background: #202225;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #202225;
	color: #72767d;
	font-size: 24px;
	font-weight: 600;
`,Ve.div`
	flex: 1;
	min-width: 0;
`,Ve.div`
	font-size: 16px;
	font-weight: 600;
	color: #ffffff;
	line-height: 1.375;
	margin-bottom: 4px;
	word-wrap: break-word;
`,Ve.div`
	font-size: 14px;
	color: #dcddde;
	line-height: 1.375;
	margin-bottom: 8px;
	word-wrap: break-word;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 8px;
`,Ve.img`
	width: 16px;
	height: 16px;
	border-radius: 2px;
`,Ve.div`
	font-size: 12px;
	color: #72767d;
	font-weight: 500;
`,Ve.div`
	font-family: arial, sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #70757a;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	max-width: 600px;
`,Ve.div`
	display: flex;
	align-items: flex-start;
	gap: 12px;
	margin-bottom: 3px;
`,Ve.div`
	flex-shrink: 0;
	width: 16px;
	height: 16px;
	margin-top: 2px;
`,Ve.img`
	width: 16px;
	height: 16px;
	border-radius: 2px;
`,Ve.div`
	width: 16px;
	height: 16px;
	border-radius: 2px;
	background: #f1f3f4;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	font-weight: 600;
	color: #70757a;
`,Ve.div`
	flex: 1;
	min-width: 0;
`,Ve.div`
	font-size: 14px;
	color: #202124;
	line-height: 1.3;
	margin-bottom: 1px;
`,Ve.div`
	font-size: 14px;
	color: #202124;
	line-height: 1.3;
	word-break: break-all;
`,Ve.h3`
	font-size: 20px;
	font-weight: 400;
	color: #1a0dab;
	line-height: 1.3;
	margin: 3px 0 0 0;
	padding: 0;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`,Ve.div`
	font-size: 14px;
	color: #70757a;
	margin: 3px 0;
`,Ve.p`
	font-size: 14px;
	color: #4d5156;
	line-height: 1.58;
	margin: 3px 0 0 0;
	word-wrap: break-word;
`,Ve.div`
	font-family:
		-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
		'Helvetica Neue', 'Fira Sans', Ubuntu, Oxygen, 'Oxygen Sans', Cantarell,
		'Droid Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
		'Lucida Grande', Helvetica, Arial, sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #666666;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	background: #ffffff;
	max-width: 552px;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	box-shadow:
		0 0 0 1px rgba(0, 0, 0, 0.08),
		0 2px 4px rgba(0, 0, 0, 0.08);
	overflow: hidden;
`,Ve.div`
	display: flex;
	align-items: flex-start;
	gap: 8px;
	padding: 12px 16px 0;
`,Ve.div`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
	background: #e0e0e0;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #0a66c2;
	color: white;
	font-size: 18px;
	font-weight: 700;
`,Ve.div`
	flex: 1;
	min-width: 0;
`,Ve.div`
	font-size: 14px;
	font-weight: 600;
	color: #000000;
	line-height: 1.33;
`,Ve.div`
	font-size: 12px;
	color: #666666;
	line-height: 1.33;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	color: #666666;
	line-height: 1.33;
`,Ve.svg`
	width: 12px;
	height: 12px;
`,Ve.button`
	background: none;
	border: none;
	padding: 4px;
	cursor: pointer;
	color: #666666;
	font-size: 20px;
	line-height: 1;
	margin-left: auto;
`,Ve.div`
	padding: 12px 16px;
	font-size: 14px;
	color: #000000;
	line-height: 1.43;
	white-space: pre-wrap;
	word-wrap: break-word;
`,Ve.a`
	color: #0a66c2;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`,Ve.div`
	display: flex;
	background: #f3f2ef;
	border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
	cursor: pointer;
	&:hover {
		background: #e9e8e4;
	}
`,Ve.div`
	width: 128px;
	height: 128px;
	flex-shrink: 0;
	background: #e0e0e0;
	overflow: hidden;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	flex: 1;
	padding: 12px;
	min-width: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
`,Ve.div`
	font-size: 14px;
	font-weight: 600;
	color: #000000;
	line-height: 1.43;
	margin-bottom: 4px;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`,Ve.div`
	font-size: 12px;
	color: #666666;
`,Ve.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	border-bottom: 1px solid #e0e0e0;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 4px;
`,Ve.div`
	display: flex;
	align-items: center;
`,Ve.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: ${e=>e.color};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	margin-left: -4px;
	border: 1px solid #ffffff;
	z-index: ${e=>e.zIndex};
	&:first-of-type {
		margin-left: 0;
	}
`,Ve.span`
	font-size: 12px;
	color: #666666;
	margin-left: 4px;
`,Ve.div`
	font-size: 12px;
	color: #666666;
`,Ve.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 4px 8px;
`,Ve.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	background: none;
	border: none;
	padding: 12px 8px;
	cursor: pointer;
	color: #666666;
	font-size: 14px;
	font-weight: 600;
	border-radius: 4px;
	transition: background-color 0.2s;
	flex: 1;

	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
		color: #000000;
	}

	svg {
		width: 24px;
		height: 24px;
	}
`,Ve.div`
	font-family:
		'Segoe UI',
		-apple-system,
		BlinkMacSystemFont,
		Roboto,
		'Helvetica Neue',
		sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #605e5c;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	overflow: hidden;
	background: #ffffff;
	max-width: 500px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	position: relative;
`,Ve.div`
	display: flex;
	gap: 16px;
	padding: 12px;
`,Ve.div`
	flex-shrink: 0;
	width: 160px;
	height: 100px;
	border-radius: 4px;
	overflow: hidden;
	background: #f3f2f1;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f3f2f1;
	color: #605e5c;
	font-size: 32px;
	font-weight: 600;
`,Ve.div`
	flex: 1;
	min-width: 0;
`,Ve.div`
	font-size: 15px;
	font-weight: 600;
	color: #323130;
	line-height: 1.4;
	margin-bottom: 4px;
	word-wrap: break-word;
`,Ve.div`
	font-size: 14px;
	color: #605e5c;
	line-height: 1.4;
	margin-bottom: 8px;
	word-wrap: break-word;
`,Ve.div`
	font-size: 12px;
	color: #605e5c;
	display: flex;
	align-items: center;
	gap: 6px;
`,Ve.img`
	width: 16px;
	height: 16px;
	border-radius: 2px;
`,Ve.div`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		Helvetica, Arial, sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #737373;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	width: 270px;
	height: 480px;
	border-radius: 12px;
	overflow: hidden;
	position: relative;
	background: #000000;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 48px;
`,Ve.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 100px;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.6) 0%,
		rgba(0, 0, 0, 0) 100%
	);
	pointer-events: none;
`,Ve.div`
	position: absolute;
	top: 8px;
	left: 8px;
	right: 8px;
	height: 2px;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 1px;
`,Ve.div`
	width: 30%;
	height: 100%;
	background: #ffffff;
	border-radius: 1px;
`,Ve.div`
	position: absolute;
	top: 16px;
	left: 12px;
	right: 12px;
	display: flex;
	align-items: center;
	gap: 10px;
`,Ve.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	overflow: hidden;
	border: 2px solid #ffffff;
	flex-shrink: 0;
	background: #ffffff;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 14px;
	font-weight: 600;
`,Ve.div`
	font-size: 13px;
	font-weight: 600;
	color: #ffffff;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`,Ve.span`
	font-weight: 400;
	color: rgba(255, 255, 255, 0.7);
	margin-left: 6px;
`,Ve.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120px;
	background: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.6) 0%,
		rgba(0, 0, 0, 0) 100%
	);
	pointer-events: none;
`,Ve.div`
	position: absolute;
	bottom: 16px;
	left: 12px;
	right: 60px;
`,Ve.div`
	font-size: 14px;
	color: #ffffff;
	line-height: 1.4;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	word-wrap: break-word;
`,Ve.div`
	position: absolute;
	bottom: 16px;
	right: 12px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: center;
`,Ve.div`
	color: #ffffff;
	font-size: 24px;
	cursor: pointer;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`,Ve.div`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		Helvetica, Arial, sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #737373;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	width: 270px;
	height: 480px;
	border-radius: 12px;
	overflow: hidden;
	position: relative;
	background: #000000;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #405de6 0%, #833ab4 50%, #fd1d1d 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 48px;
`,Ve.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 60px;
	height: 60px;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.2s;

	&:hover {
		background: rgba(0, 0, 0, 0.7);
	}
`,Ve.div`
	width: 0;
	height: 0;
	border-left: 20px solid #ffffff;
	border-top: 12px solid transparent;
	border-bottom: 12px solid transparent;
	margin-left: 4px;
`,Ve.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 80px;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.5) 0%,
		rgba(0, 0, 0, 0) 100%
	);
	pointer-events: none;
`,Ve.div`
	position: absolute;
	top: 12px;
	left: 12px;
	display: flex;
	align-items: center;
	gap: 8px;
`,Ve.div`
	background: rgba(0, 0, 0, 0.5);
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 11px;
	font-weight: 600;
	color: #ffffff;
	display: flex;
	align-items: center;
	gap: 4px;
`,Ve.span`
	font-size: 12px;
`,Ve.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 180px;
	background: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.7) 0%,
		rgba(0, 0, 0, 0) 100%
	);
	pointer-events: none;
`,Ve.div`
	position: absolute;
	bottom: 16px;
	left: 12px;
	right: 50px;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 10px;
`,Ve.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	overflow: hidden;
	border: 2px solid #ffffff;
	flex-shrink: 0;
	background: #ffffff;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 12px;
	font-weight: 600;
`,Ve.div`
	font-size: 13px;
	font-weight: 600;
	color: #ffffff;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`,Ve.button`
	background: transparent;
	border: 1px solid #ffffff;
	border-radius: 8px;
	padding: 4px 12px;
	font-size: 12px;
	font-weight: 600;
	color: #ffffff;
	cursor: pointer;
	margin-left: auto;
`,Ve.div`
	font-size: 13px;
	color: #ffffff;
	line-height: 1.4;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	word-wrap: break-word;
	margin-bottom: 8px;
`,Ve.div`
	display: flex;
	align-items: center;
	gap: 8px;
`,Ve.span`
	font-size: 12px;
`,Ve.div`
	font-size: 12px;
	color: #ffffff;
	opacity: 0.9;
`,Ve.div`
	position: absolute;
	bottom: 100px;
	right: 12px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
`,Ve.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
`,Ve.div`
	font-size: 24px;
	color: #ffffff;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`,Ve.div`
	font-size: 11px;
	color: #ffffff;
	font-weight: 500;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`,Ve.div`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		Helvetica, Arial, sans-serif;
	margin-bottom: 1rem;
`,Ve.div`
	font-size: 12px;
	font-weight: 600;
	color: #737373;
	margin-bottom: 8px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`,Ve.div`
	width: 400px;
	background: #ffffff;
	border: 1px solid #dbdbdb;
	border-radius: 8px;
	overflow: hidden;
`,Ve.div`
	display: flex;
	align-items: center;
	padding: 12px;
	gap: 10px;
`,Ve.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
	background: #fafafa;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 14px;
	font-weight: 600;
`,Ve.div`
	flex: 1;
	min-width: 0;
`,Ve.div`
	font-size: 14px;
	font-weight: 600;
	color: #262626;
`,Ve.div`
	font-size: 12px;
	color: #262626;
`,Ve.button`
	background: none;
	border: none;
	padding: 8px;
	cursor: pointer;
	font-size: 16px;
	color: #262626;
`,Ve.div`
	width: 100%;
	aspect-ratio: 1 / 1;
	background: #fafafa;
	overflow: hidden;
`,Ve.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Ve.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #fafafa 0%, #efefef 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 64px;
	color: #dbdbdb;
`,Ve.div`
	display: flex;
	align-items: center;
	padding: 12px;
	gap: 16px;
`;const ci=Ve.button`
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	font-size: 24px;
	line-height: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;Ve(ci)`
	margin-left: auto;
`,Ve.div`
	padding: 0 12px;
	font-size: 14px;
	font-weight: 600;
	color: #262626;
`,Ve.div`
	padding: 0 12px 12px;
`,Ve.div`
	font-size: 14px;
	color: #262626;
	line-height: 1.5;
	word-wrap: break-word;
`,Ve.span`
	font-weight: 600;
	margin-right: 6px;
`,Ve.span`
	color: #8e8e8e;
	cursor: pointer;
`,Ve.div`
	padding: 0 12px 8px;
	font-size: 14px;
	color: #8e8e8e;
	cursor: pointer;
`,Ve.div`
	padding: 0 12px 12px;
	font-size: 10px;
	color: #8e8e8e;
	text-transform: uppercase;
	letter-spacing: 0.2px;
`;var ui=n(67),pi=n.n(ui);const di=e=>{const{children:t,cacheKey:n}=e,r=(0,et.useInstanceId)(di),o=ye({key:n||r}),[i,a]=(0,w.useState)(o),l=(0,et.useRefEffect)(e=>(e&&a(ye({key:n||r,container:e})),()=>{a(o)}),[n,r]);return(0,c.jsxs)(w.Fragment,{children:[(0,c.jsx)("span",{ref:l,style:{display:"none"}}),(0,c.jsx)($e,{value:i,children:t})]})};di.propTypes={children:pi().node.isRequired,cacheKey:pi().string.isRequired},window.wp.notices,Ve.div`
	display: flex;
	align-items: center;
	justify-content: center;
`,n(169),Ve("div")`
	& .components-button.has-icon {
		padding: 0px !important;
	}
`;const fi=Ve("div")`
	position: relative;
	& .components-spinner {
		position: absolute;
		right: 0;
		bottom: 0.5em;
	}
`;function mi({className:e,onChange:t,taxonomy:n,value:r,maxTerms:a,label:l}){const s=void 0!==l?l:`Select a ${n} term`,[u,p]=(0,i.useState)(""),d=(0,et.useDebounce)(p,500),{records:f,isResolving:m,hasResolved:h}=(0,tt.useEntityRecords)("taxonomy",n,{per_page:10,context:"view",search:u}),g=(0,i.useMemo)(()=>h&&f?f.map(e=>e.name):[],[f,h]);return(0,c.jsxs)(fi,{className:e,children:[(0,c.jsx)(o.FormTokenField,{value:r,suggestions:g,onInputChange:d,displayTransform:e=>(0,Ze.decodeEntities)(e),onChange:e=>{if(!e||0===e.length)return void t(null);const n=e[e.length-1],r=f?.find(e=>e.name===n);if(r){const{id:e,name:n,slug:o,taxonomy:i,parent:a,link:l}=r;t({id:e,name:n,slug:o,taxonomy:i,parent:a,link:l})}},label:s,maxLength:a,__experimentalShowHowTo:!1}),m&&(0,c.jsx)(o.Spinner,{})]})}mi.defaultProps={className:"",maxTerms:1,onChange:e=>{console.log("Selected Term: ",e)},taxonomy:"topic",value:[]},mi.propTypes={className:pi().string,maxTerms:pi().number,onChange:pi().func,taxonomy:pi().string,value:pi().array},window.wp.date,(0,i.createContext)(),Ve.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 40px;
	overflow: hidden;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 430px;
	margin: 0 auto;
	height: 100%;
	min-height: 800px;
`,Ve.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 14px 24px 0;
	font-size: 14px;
	font-weight: 600;
	color: #000;
	height: 44px;
	box-sizing: border-box;
`,Ve.div`
	display: flex;
	gap: 6px;
	align-items: center;
`;const hi=Ve.div`
	background-color: #000;
	opacity: 0.8;
	mask-size: contain;
	mask-repeat: no-repeat;
	mask-position: center;
`;Ve(hi)`
	width: 16px;
	height: 10px;
	mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect y="6" width="3" height="4" rx="1"/><rect x="4" y="4" width="3" height="6" rx="1"/><rect x="8" y="2" width="3" height="8" rx="1"/><rect x="12" width="3" height="10" rx="1"/></svg>');
`,Ve(hi)`
	width: 16px;
	height: 12px;
	mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12"><path d="M8 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-4.5c-1.8 0-3.5.6-4.8 1.6l-1.3-1.6C3.6 6.1 5.7 5.5 8 5.5s4.4.6 6.1 2l-1.3 1.6c-1.3-1-3-1.6-4.8-1.6zm0-4.5C5.1 3 2.5 4 .5 5.8L0 4.5C2.2 2.5 5 1.5 8 1.5s5.8 1 8 3l-.5 1.3C13.5 4 10.9 3 8 3z"/></svg>');
`,Ve(hi)`
	width: 24px;
	height: 12px;
	mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 12"><rect x="1" y="1" width="20" height="10" rx="3" fill="none" stroke="black" stroke-width="1"/><rect x="3" y="3" width="16" height="6" rx="1"/><path d="M22 4v4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/></svg>');
`,Ve.div`
	padding: 8px 16px;
	background-color: #f8f8f8;
	border-bottom: 1px solid #e0e0e0;
`,Ve.div`
	background-color: #e8e8ed;
	border-radius: 12px;
	padding: 10px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`,Ve.span`
	font-size: 14px;
	color: #333;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`,Ve.div`
	flex: 1;
	overflow-y: auto;
	position: relative;
	display: flex;
	flex-direction: column;
`,Ve.div`
	height: 34px;
	background-color: #f8f8f8;
	border-top: 1px solid #e0e0e0;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: env(safe-area-inset-bottom);
`,Ve.div`
	width: 134px;
	height: 5px;
	background-color: #000;
	border-radius: 100px;
	opacity: 0.8;
`,Ve.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	width: 100%;
	min-height: 600px;
`,Ve.div`
	background-color: #f6f6f6;
	border-bottom: 1px solid #d1d1d1;
	display: flex;
	flex-direction: column;
`,Ve.div`
	display: flex;
	gap: 8px;
	padding: 12px 16px 0;
`;const gi=Ve.div`
	width: 12px;
	height: 12px;
	border-radius: 50%;
`,vi=(Ve(gi)`
	background-color: #ff5f56;
	border: 1px solid #e0443e;
`,Ve(gi)`
	background-color: #ffbd2e;
	border: 1px solid #dea123;
`,Ve(gi)`
	background-color: #27c93f;
	border: 1px solid #1aab29;
`,Ve.div`
	display: flex;
	align-items: center;
	padding: 8px 16px 12px;
	gap: 16px;
`,Ve.div`
	display: flex;
	gap: 12px;
`,Ve.div`
	width: 12px;
	height: 12px;
	border-top: 2px solid #888;
	border-right: 2px solid #888;
	opacity: 0.5;
`),bi=(Ve(vi)`
	transform: rotate(-135deg);
`,Ve(vi)`
	transform: rotate(45deg);
`,Ve.div`
	flex: 1;
	background-color: #fff;
	border: 1px solid #d1d1d1;
	border-radius: 6px;
	padding: 6px 12px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`,Ve.span`
	font-size: 13px;
	color: #333;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`,Ve.div`
	display: flex;
	gap: 16px;
`,Ve.div`
	width: 16px;
	height: 16px;
	background-color: #888;
	opacity: 0.5;
	mask-size: contain;
	mask-repeat: no-repeat;
	mask-position: center;
`);function xi({postId:e,embedded:t=!1}){const n=function(e){const[t,n]=(0,i.useState)(null);return(0,i.useEffect)(()=>{g()({path:`/prc-api/v3/datasets/download-stats?dataset_id=${e}`,method:"GET"}).then(e=>{n({success:!0,...e})}).catch(e=>{console.error({error:e})})},[e]),t}(e),r=(new Date).getFullYear(),a=(0,i.useMemo)(()=>n?.log?Object.keys(n.log):[],[n]),[s,u]=(0,i.useState)(String(r)),[p,d]=(0,i.useState)(""),f=(0,i.useMemo)(()=>{if(!n?.log)return[];const e={...n.log[s]||{}};for(let t=1;t<=12;t++){const n=t.toString().padStart(2,"0");n in e||(e[n]=0)}return Object.keys(e).filter(e=>/^\d{2}$/.test(e)).sort((e,t)=>e-t).map(t=>{const r=Number(e[t])||0,o=`${s}-${t}`;return{month:t,total:r,split:n.splits?.[o]||null}})},[n,s]),m=(0,i.useMemo)(()=>f.reduce((e,t)=>e+t.total,0),[f]),h=(0,i.useMemo)(()=>{if(!p||!n?.daily)return[];const e=(n.daily[s]||{})[p]||{},t=(r=Number(s),o=Number(p),new Date(r,o,0).getDate());var r,o;const i=[];for(let n=1;n<=t;n++){const t=String(n).padStart(2,"0");i.push(Number(e[t]||e[String(n)]||0))}return i},[n,s,p]),x=(0,i.useMemo)(()=>h.map((e,t)=>String(t+1).padStart(2,"0")),[h]),w=(0,i.useMemo)(()=>{if(!p||!n?.new_data_uploaded)return null;const e=n.splits?.[`${s}-${p}`];return e?.upload_day?Number(e.upload_day)-1:null},[n,s,p]),y=(0,i.useMemo)(()=>h.reduce((e,t)=>e+t,0),[h]);(0,i.useEffect)(()=>{a.length>0&&!a.includes(String(s))&&u(a[a.length-1])},[a,s]);const k=(0,c.jsxs)(o.__experimentalVStack,{spacing:4,children:[null!=n?.total&&(0,c.jsx)("p",{className:"dataset-stats-all-time",children:(0,l.sprintf)(/* translators: %s: total download count */ /* translators: %s: total download count */
(0,l.__)("All-time downloads: %s","prc-datasets"),Number(n.total).toLocaleString())}),(0,c.jsx)(b,{years:a,selectedYear:s,onYearChange:u,selectedMonth:p,onMonthChange:d,yearLabel:(0,l.__)("Select Year","prc-datasets"),monthLabel:(0,l.__)("Select Month","prc-datasets"),allMonthsLabel:(0,l.__)("All months","prc-datasets")}),!p&&(0,c.jsx)(o.BaseControl,{id:"dataset-download-stats",help:(0,l.sprintf)(/* translators: %s: yearly total */ /* translators: %s: yearly total */
(0,l.__)("Year total: %s","prc-datasets"),m.toLocaleString()),children:(0,c.jsx)(Ke,{values:f.map(e=>e.total),onCellClick:e=>{d(function(e){return String(e+1).padStart(2,"0")}(e))},getCellAriaLabel:(e,t)=>(0,l.sprintf)(/* translators: %s: month abbreviation */ /* translators: %s: month abbreviation */
(0,l.__)("View daily downloads for %s","prc-datasets"),v[t]),renderValue:(e,t)=>{const n=f[t];return n?.split?`${n.split.before}|${n.split.after}`:n?.total}})}),p&&(0,c.jsxs)(o.BaseControl,{id:"dataset-download-stats-daily",help:(0,l.sprintf)(/* translators: 1: month label 2: day total */ /* translators: 1: month label 2: day total */
(0,l.__)("Daily total for %1$s: %2$s","prc-datasets"),v[Number(p)-1],y.toLocaleString()),children:[n?.splits?.[`${s}-${p}`]&&(0,c.jsx)("p",{className:"dataset-stats-split",children:(0,l.sprintf)(/* translators: 1: before count 2: after count 3: upload day */ /* translators: 1: before count 2: after count 3: upload day */
(0,l.__)("New data split (day %3$s): %1$s before · %2$s after","prc-datasets"),n.splits[`${s}-${p}`].before.toLocaleString(),n.splits[`${s}-${p}`].after.toLocaleString(),n.splits[`${s}-${p}`].upload_day)}),0===h.length||0===y?(0,c.jsx)("p",{children:(0,l.__)("No daily download data for this month yet.","prc-datasets")}):(0,c.jsx)(Ke,{values:h,labels:x,highlightIndex:w})]})]});return t?k:(0,c.jsx)(o.PanelBody,{title:"Dataset Download Stats",children:k})}function wi({dataset:e,onClose:t}){if(!e)return null;const n=e.title?.trim()||(0,l.__)("Untitled dataset","prc-datasets");return(0,c.jsx)(o.Modal,{title:n,onRequestClose:t,className:"prc-datasets-library-stats-modal",size:"medium",children:(0,c.jsxs)("div",{className:"prc-datasets-library-stats-modal__section",children:[(0,c.jsx)("h3",{children:(0,l.__)("Download Analytics","prc-datasets")}),(0,c.jsx)(xi,{postId:e.id,embedded:!0})]})})}Ve(bi)`
	mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>');
`,Ve(bi)`
	mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>');
`,Ve.div`
	flex: 1;
	overflow-y: auto;
	position: relative;
	display: flex;
	flex-direction: column;
`,(0,i.createContext)(null);const{Fill:yi}=(0,o.createSlotFill)("prcWpAdminDataview.PageExtras"),ki="prcWpAdminDataview.pageExtra";function _i(){return"dataset"===window?.prcWpAdminDataview?.postType}function Si(){const[e,t]=(0,i.useState)(null);return(0,i.useEffect)(()=>{const e=e=>{"dataset-stats"===e.detail?.type&&t(e.detail.payload)};return window.addEventListener(ki,e),()=>window.removeEventListener(ki,e)},[]),(0,c.jsx)(wi,{dataset:e,onClose:()=>t(null)})}function Ai(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{children:(0,l.__)("Browse and manage datasets.","prc-datasets")}),(0,c.jsx)(yi,{children:(0,c.jsx)(Si,{})})]})}(0,a.addFilter)("prcWpAdminDataview.fields","prc-datasets/fields",e=>_i()?[...e,...m({onOpenStats:e=>{return t=e,void window.dispatchEvent(new CustomEvent(ki,{detail:{type:"dataset-stats",payload:t}}));var t}})]:e),(0,a.addFilter)("prcWpAdminDataview.defaultVisibleFields","prc-datasets/default-fields",e=>_i()?["zipStatus","downloadUnavailable","totalDownloads","stats","status","date"]:e),(0,a.addFilter)("prcWpAdminDataview.pageDescription","prc-datasets/page-description",e=>_i()?(0,c.jsx)(Ai,{}):e)},471(e){var t=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=t},1(e,t,n){var r;!function(e){var t,n,r,o,i,a,l,s=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(s)&&s.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",(n=document.createElement("source"),r=function(e){var t,r,o=e.parentNode;"PICTURE"===o.nodeName.toUpperCase()?(t=n.cloneNode(),o.insertBefore(t,o.firstElementChild),setTimeout(function(){o.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,r=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=r}))},o=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)r(t[e])},i=function(){clearTimeout(t),t=setTimeout(o,99)},a=e.matchMedia&&matchMedia("(orientation: landscape)"),l=function(){i(),a&&a.addListener&&a.addListener(i)},n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?l():document.addEventListener("DOMContentLoaded",l),i))}(window),function(o,i,a){"use strict";var l,s,c;i.createElement("picture");var u={},p=!1,d=function(){},f=i.createElement("img"),m=f.getAttribute,h=f.setAttribute,g=f.removeAttribute,v=i.documentElement,b={},x={algorithm:""},w="data-pfsrc",y=w+"set",k=navigator.userAgent,_=/rident/.test(k)||/ecko/.test(k)&&k.match(/rv\:(\d+)/)&&RegExp.$1>35,S="currentSrc",A=/\s+\+?\d+(e\d+)?w/,j=/(\([^)]+\))?\s*(.+)/,z=o.picturefillCFG,O="font-size:100%!important;",C=!0,E={},T={},M=o.devicePixelRatio,P={px:1,in:96},I=i.createElement("a"),R=!1,$=/^[ \t\n\r\u000c]+/,L=/^[, \t\n\r\u000c]+/,N=/^[^ \t\n\r\u000c]+/,D=/[,]+$/,B=/^\d+$/,F=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,H=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},U=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}};function W(e){return" "===e||"\t"===e||"\n"===e||"\f"===e||"\r"===e}var V,q,G,X,Y,K,Q,J,Z,ee,te,ne,re,oe,ie,ae=(V=/^([\d\.]+)(em|vw|px)$/,q=U(function(e){return"return "+function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n}((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"}),function(e,t){var n;if(!(e in E))if(E[e]=!1,t&&(n=e.match(V)))E[e]=n[1]*P[n[2]];else try{E[e]=new Function("e",q(e))(P)}catch(e){}return E[e]}),le=function(e,t){return e.w?(e.cWidth=u.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},se=function(e){if(p){var t,n,r,o=e||{};if(o.elements&&1===o.elements.nodeType&&("IMG"===o.elements.nodeName.toUpperCase()?o.elements=[o.elements]:(o.context=o.elements,o.elements=null)),r=(t=o.elements||u.qsa(o.context||i,o.reevaluate||o.reselect?u.sel:u.selShort)).length){for(u.setupRun(o),R=!0,n=0;n<r;n++)u.fillImg(t[n],o);u.teardownRun(o)}}};function ce(e,t,n,r){var o,i,a;return"saveData"===x.algorithm?e>2.7?a=n+1:(i=(t-n)*(o=Math.pow(e-.6,1.5)),r&&(i+=.1*o),a=e+i):a=n>1?Math.sqrt(e*t):e,a>n}function ue(e,t){return e.res-t.res}function pe(e,t){var n,r,o;if(e&&t)for(o=u.parseSet(t),e=u.makeUrl(e),n=0;n<o.length;n++)if(e===u.makeUrl(o[n].url)){r=o[n];break}return r}o.console&&console.warn,S in f||(S="src"),b["image/jpeg"]=!0,b["image/gif"]=!0,b["image/png"]=!0,b["image/svg+xml"]=i.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),u.ns=("pf"+(new Date).getTime()).substr(0,9),u.supSrcset="srcset"in f,u.supSizes="sizes"in f,u.supPicture=!!o.HTMLPictureElement,u.supSrcset&&u.supPicture&&!u.supSizes&&(G=i.createElement("img"),f.srcset="data:,a",G.src="data:,a",u.supSrcset=f.complete===G.complete,u.supPicture=u.supSrcset&&u.supPicture),u.supSrcset&&!u.supSizes?(X="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",K=function(){2===Y.width&&(u.supSizes=!0),s=u.supSrcset&&!u.supSizes,p=!0,setTimeout(se)},(Y=i.createElement("img")).onload=K,Y.onerror=K,Y.setAttribute("sizes","9px"),Y.srcset=X+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w",Y.src=X):p=!0,u.selShort="picture>img,img[srcset]",u.sel=u.selShort,u.cfg=x,u.DPR=M||1,u.u=P,u.types=b,u.setSize=d,u.makeUrl=U(function(e){return I.href=e,I.href}),u.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},u.matchesMedia=function(){return o.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?u.matchesMedia=function(e){return!e||matchMedia(e).matches}:u.matchesMedia=u.mMQ,u.matchesMedia.apply(this,arguments)},u.mMQ=function(e){return!e||ae(e)},u.calcLength=function(e){var t=ae(e,!0)||!1;return t<0&&(t=!1),t},u.supportsType=function(e){return!e||b[e]},u.parseSize=U(function(e){var t=(e||"").match(j);return{media:t&&t[1],length:t&&t[2]}}),u.parseSet=function(e){return e.cands||(e.cands=function(e,t){function n(t){var n,r=t.exec(e.substring(c));if(r)return n=r[0],c+=n.length,n}var r,o,i,a,l,s=e.length,c=0,u=[];function p(){var e,n,i,a,l,s,c,p,d,f=!1,m={};for(a=0;a<o.length;a++)s=(l=o[a])[l.length-1],c=l.substring(0,l.length-1),p=parseInt(c,10),d=parseFloat(c),B.test(c)&&"w"===s?((e||n)&&(f=!0),0===p?f=!0:e=p):F.test(c)&&"x"===s?((e||n||i)&&(f=!0),d<0?f=!0:n=d):B.test(c)&&"h"===s?((i||n)&&(f=!0),0===p?f=!0:i=p):f=!0;f||(m.url=r,e&&(m.w=e),n&&(m.d=n),i&&(m.h=i),i||n||e||(m.d=1),1===m.d&&(t.has1x=!0),m.set=t,u.push(m))}function d(){for(n($),i="",a="in descriptor";;){if(l=e.charAt(c),"in descriptor"===a)if(W(l))i&&(o.push(i),i="",a="after descriptor");else{if(","===l)return c+=1,i&&o.push(i),void p();if("("===l)i+=l,a="in parens";else{if(""===l)return i&&o.push(i),void p();i+=l}}else if("in parens"===a)if(")"===l)i+=l,a="in descriptor";else{if(""===l)return o.push(i),void p();i+=l}else if("after descriptor"===a)if(W(l));else{if(""===l)return void p();a="in descriptor",c-=1}c+=1}}for(;;){if(n(L),c>=s)return u;r=n(N),o=[],","===r.slice(-1)?(r=r.replace(D,""),p()):d()}}(e.srcset,e)),e.cands},u.getEmValue=function(){var e;if(!l&&(e=i.body)){var t=i.createElement("div"),n=v.style.cssText,r=e.style.cssText;t.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",v.style.cssText=O,e.style.cssText=O,e.appendChild(t),l=t.offsetWidth,e.removeChild(t),l=parseFloat(l,10),v.style.cssText=n,e.style.cssText=r}return l||16},u.calcListLength=function(e){if(!(e in T)||x.uT){var t=u.calcLength(function(e){var t,n,r,o,i,a,l=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,s=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;function c(e){return!!(l.test(e)&&parseFloat(e)>=0)||!!s.test(e)||"0"===e||"-0"===e||"+0"===e}for(r=(n=function(e){var t,n="",r=[],o=[],i=0,a=0,l=!1;function s(){n&&(r.push(n),n="")}function c(){r[0]&&(o.push(r),r=[])}for(;;){if(""===(t=e.charAt(a)))return s(),c(),o;if(l){if("*"===t&&"/"===e[a+1]){l=!1,a+=2,s();continue}a+=1}else{if(W(t)){if(e.charAt(a-1)&&W(e.charAt(a-1))||!n){a+=1;continue}if(0===i){s(),a+=1;continue}t=" "}else if("("===t)i+=1;else if(")"===t)i-=1;else{if(","===t){s(),c(),a+=1;continue}if("/"===t&&"*"===e.charAt(a+1)){l=!0,a+=2;continue}}n+=t,a+=1}}}(e)).length,t=0;t<r;t++)if(c(i=(o=n[t])[o.length-1])){if(a=i,o.pop(),0===o.length)return a;if(o=o.join(" "),u.matchesMedia(o))return a}return"100vw"}(e));T[e]=t||P.width}return T[e]},u.setRes=function(e){var t;if(e)for(var n=0,r=(t=u.parseSet(e)).length;n<r;n++)le(t[n],e.sizes);return t},u.setRes.res=le,u.applySetCandidate=function(e,t){if(e.length){var n,r,o,i,a,l,s,c,p,d=t[u.ns],f=u.DPR;if(l=d.curSrc||t[S],s=d.curCan||function(e,t,n){var r;return!n&&t&&(n=(n=e[u.ns].sets)&&n[n.length-1]),(r=pe(t,n))&&(t=u.makeUrl(t),e[u.ns].curSrc=t,e[u.ns].curCan=r,r.res||le(r,r.set.sizes)),r}(t,l,e[0].set),s&&s.set===e[0].set&&((p=_&&!t.complete&&s.res-.1>f)||(s.cached=!0,s.res>=f&&(a=s))),!a)for(e.sort(ue),a=e[(i=e.length)-1],r=0;r<i;r++)if((n=e[r]).res>=f){a=e[o=r-1]&&(p||l!==u.makeUrl(n.url))&&ce(e[o].res,n.res,f,e[o].cached)?e[o]:n;break}a&&(c=u.makeUrl(a.url),d.curSrc=c,d.curCan=a,c!==l&&u.setSrc(t,a),u.setSize(t))}},u.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},u.getSet=function(e){var t,n,r,o=!1,i=e[u.ns].sets;for(t=0;t<i.length&&!o;t++)if((n=i[t]).srcset&&u.matchesMedia(n.media)&&(r=u.supportsType(n.type))){"pending"===r&&(n=r),o=n;break}return o},u.parseSets=function(e,t,n){var r,o,i,l,c=t&&"PICTURE"===t.nodeName.toUpperCase(),p=e[u.ns];(p.src===a||n.src)&&(p.src=m.call(e,"src"),p.src?h.call(e,w,p.src):g.call(e,w)),(p.srcset===a||n.srcset||!u.supSrcset||e.srcset)&&(r=m.call(e,"srcset"),p.srcset=r,l=!0),p.sets=[],c&&(p.pic=!0,function(e,t){var n,r,o,i,a=e.getElementsByTagName("source");for(n=0,r=a.length;n<r;n++)(o=a[n])[u.ns]=!0,(i=o.getAttribute("srcset"))&&t.push({srcset:i,media:o.getAttribute("media"),type:o.getAttribute("type"),sizes:o.getAttribute("sizes")})}(t,p.sets)),p.srcset?(o={srcset:p.srcset,sizes:m.call(e,"sizes")},p.sets.push(o),(i=(s||p.src)&&A.test(p.srcset||""))||!p.src||pe(p.src,o)||o.has1x||(o.srcset+=", "+p.src,o.cands.push({url:p.src,d:1,set:o}))):p.src&&p.sets.push({srcset:p.src,sizes:null}),p.curCan=null,p.curSrc=a,p.supported=!(c||o&&!u.supSrcset||i&&!u.supSizes),l&&u.supSrcset&&!p.supported&&(r?(h.call(e,y,r),e.srcset=""):g.call(e,y)),p.supported&&!p.srcset&&(!p.src&&e.src||e.src!==u.makeUrl(p.src))&&(null===p.src?e.removeAttribute("src"):e.src=p.src),p.parsed=!0},u.fillImg=function(e,t){var n,r=t.reselect||t.reevaluate;e[u.ns]||(e[u.ns]={}),n=e[u.ns],(r||n.evaled!==c)&&(n.parsed&&!t.reevaluate||u.parseSets(e,e.parentNode,t),n.supported?n.evaled=c:function(e){var t,n=u.getSet(e),r=!1;"pending"!==n&&(r=c,n&&(t=u.setRes(n),u.applySetCandidate(t,e))),e[u.ns].evaled=r}(e))},u.setupRun=function(){R&&!C&&M===o.devicePixelRatio||(C=!1,M=o.devicePixelRatio,E={},T={},u.DPR=M||1,P.width=Math.max(o.innerWidth||0,v.clientWidth),P.height=Math.max(o.innerHeight||0,v.clientHeight),P.vw=P.width/100,P.vh=P.height/100,c=[P.height,P.width,M].join("-"),P.em=u.getEmValue(),P.rem=P.em)},u.supPicture?(se=d,u.fillImg=d):(ne=o.attachEvent?/d$|^c/:/d$|^c|^i/,re=function(){var e=i.readyState||"";oe=setTimeout(re,"loading"===e?200:999),i.body&&(u.fillImgs(),(Q=Q||ne.test(e))&&clearTimeout(oe))},oe=setTimeout(re,i.body?9:99),ie=v.clientHeight,H(o,"resize",(J=function(){C=Math.max(o.innerWidth||0,v.clientWidth)!==P.width||v.clientHeight!==ie,ie=v.clientHeight,C&&u.fillImgs()},te=function(){var e=new Date-ee;e<99?Z=setTimeout(te,99-e):(Z=null,J())},function(){ee=new Date,Z||(Z=setTimeout(te,99))})),H(i,"readystatechange",re)),u.picturefill=se,u.fillImgs=se,u.teardownRun=d,se._=u,o.picturefillCFG={pf:u,push:function(e){var t=e.shift();"function"==typeof u[t]?u[t].apply(u,e):(x[t]=e[0],R&&u.fillImgs({reselect:!0}))}};for(;z&&z.length;)o.picturefillCFG.push(z.shift());o.picturefill=se,"object"==typeof e.exports?e.exports=se:(r=function(){return se}.call(t,n,t,e))===a||(e.exports=r),u.supPicture||(b["image/webp"]=function(e){var t=new o.Image;return t.onerror=function(){b[e]=!1,se()},t.onload=function(){b[e]=1===t.width,se()},t.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==","pending"}("image/webp"))}(window,document)},999(e,t,n){"use strict";var r=n(848);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},67(e,t,n){e.exports=n(999)()},848(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,o,i)=>{if(!n){var a=1/0;for(u=0;u<e.length;u++){for(var[n,o,i]=e[u],l=!0,s=0;s<n.length;s++)(!1&i||a>=i)&&Object.keys(r.O).every(e=>r.O[e](n[s]))?n.splice(s--,1):(l=!1,i<a&&(a=i));if(l){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,o,i]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={57:0,350:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[a,l,s]=n,c=0;if(a.some(t=>0!==e[t])){for(o in l)r.o(l,o)&&(r.m[o]=l[o]);if(s)var u=s(r)}for(t&&t(n);c<a.length;c++)i=a[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(u)},n=globalThis.webpackChunk_prc_datasets=globalThis.webpackChunk_prc_datasets||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[350],()=>r(398));o=r.O(o)})();