(()=>{var e,t,n,r,o={389:(e,t,n)=>{"use strict";n.a(e,(async(e,t)=>{try{var r=n(575);let o=localStorage.getItem("apiToken");o||(o=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15),localStorage.setItem("apiToken",o));const a=(await r.i.getAllTasksByUser(o)).tasks;for(const u of a)document.getElementById("tasks").innerHTML+=`\n  <div class="mb-3">\n    <div class="d-flex align-items-center">\n      <input type="checkbox" id=""/>\n\n      <p class="mb-0" style="margin-right: auto; margin-left: 20px">\n        <span>${u.title}</span>\n        <a href="${u.url}" target="_blank">link</a>\n      </p>\n      <div style="cursor: pointer" class="task-delete-btn" id="${u._id}">\n        <img width="20px" src="public/trash.svg" />\n      </div>\n    </div>\n  </div>\n  `;async function i(e){(await r.i.deleteTask(localStorage.getItem("apiToken"),e)).success&&location.reload()}async function s(){document.getElementById("modal-error-elem").innerHTML="";const e=document.getElementById("task-title-input").value;e?(await r.i.createTask(localStorage.getItem("apiToken"),e)).success&&location.reload():document.getElementById("modal-error-elem").innerHTML="Title is mandatory"}const c=document.getElementsByClassName("task-delete-btn");for(const l of c)l.addEventListener("click",(async()=>{const e=l.id;await i(e)}));document.getElementById("add-task-btn").addEventListener("click",(async e=>{e.preventDefault(),await s()})),t()}catch(f){t(f)}}),1)},575:(e,t,n)=>{"use strict";n.d(t,{i:()=>h});var r=function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((r=r.apply(e,t||[])).next())}))},o=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},a=null,i=null,s=!1;function c(){return r(this,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return"undefined"==typeof process||null==process.versions||null==process.versions.node?[3,3]:[4,n(504)("http")];case 1:return a=e.sent(),[4,n(504)("https")];case 2:i=e.sent(),e.label=3;case 3:return s=!0,[2]}}))}))}function u(e,t){return r(this,void 0,void 0,(function(){return o(this,(function(n){switch(n.label){case 0:return[4,fetch("".concat(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return[2,n.sent().json()]}}))}))}function l(e,t,n){return r(this,void 0,void 0,(function(){var s,c,u,l;return o(this,(function(f){return s=JSON.stringify(e),c=new URL(t),u={hostname:c.hostname,path:c.search?c.pathname+c.search:c.pathname,port:c.port,method:"POST",headers:{"Content-Type":"application/json","Content-Length":s.length},agent:n},l=t.includes("https")?i:a,[2,new Promise((function(e,t){var n=l.request(u,(function(t){var n="";t.on("data",(function(e){n+=e})),t.on("end",(function(){return r(this,void 0,void 0,(function(){var t;return o(this,(function(r){return t=JSON.parse(n),e(t),[2]}))}))}))}));n.on("error",(function(e){t(e)})),n.write(s),n.end()}))]}))}))}var f=function(){function e(e){if(this.url=void 0,this.agent=void 0,this.url=e,null!==a&&null!==i){var t=e.includes("https")?i:a;this.agent=new t.Agent({keepAlive:!0})}}return e.prototype.call=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return r(this,void 0,void 0,(function(){var n,r;return o(this,(function(o){switch(o.label){case 0:return n={jsonrpc:"2.0",method:e,params:t,id:3},r=void 0,s?[3,2]:[4,c()];case 1:o.sent(),o.label=2;case 2:return null===a||null===i?[3,4]:[4,l(n,this.url,this.agent)];case 3:return r=o.sent(),[3,6];case 4:return[4,u(n,this.url)];case 5:r=o.sent(),o.label=6;case 6:return r.error?[2,r.error.message]:[2,r.result]}}))}))},e}(),d=function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}c((r=r.apply(e,t||[])).next())}))},p=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},h=function(){function e(){}return e.getAllTasksByUser=function(t){return d(this,void 0,void 0,(function(){return p(this,(function(n){switch(n.label){case 0:return[4,e.remote.call("Task.getAllTasksByUser",t)];case 1:return[2,n.sent()]}}))}))},e.createTask=function(t,n){return d(this,void 0,void 0,(function(){return p(this,(function(r){switch(r.label){case 0:return[4,e.remote.call("Task.createTask",t,n)];case 1:return[2,r.sent()]}}))}))},e.updateTask=function(t,n,r,o){return d(this,void 0,void 0,(function(){return p(this,(function(a){switch(a.label){case 0:return[4,e.remote.call("Task.updateTask",t,n,r,o)];case 1:return[2,a.sent()]}}))}))},e.remote=new f("http://127.0.0.1:8083/Task"),e}()},504:e=>{function t(e){return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}))}t.keys=()=>[],t.resolve=t,t.id=504,e.exports=t}},a={};function i(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return o[e](n,n.exports,i),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},i.a=(o,a,i)=>{var s;i&&((s=[]).d=-1);var c,u,l,f=new Set,d=o.exports,p=new Promise(((e,t)=>{l=t,u=e}));p[t]=d,p[e]=e=>(s&&e(s),f.forEach(e),p.catch((e=>{}))),o.exports=p,a((o=>{var a;c=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[e])return o;if(o.then){var a=[];a.d=0,o.then((e=>{i[t]=e,r(a)}),(e=>{i[n]=e,r(a)}));var i={};return i[e]=e=>e(a),i}}var s={};return s[e]=e=>{},s[t]=o,s})))(o);var i=()=>c.map((e=>{if(e[n])throw e[n];return e[t]})),u=new Promise((t=>{(a=()=>t(i)).r=0;var n=e=>e!==s&&!f.has(e)&&(f.add(e),e&&!e.d&&(a.r++,e.push(a)));c.map((t=>t[e](n)))}));return a.r?u:i()}),(e=>(e?l(p[n]=e):u(d),r(s)))),s&&s.d<0&&(s.d=0)},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i(389)})();