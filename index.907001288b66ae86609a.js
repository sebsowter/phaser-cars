!function(e){function t(t){for(var n,a,s=t[0],u=t[1],c=t[2],f=0,l=[];f<s.length;f++)a=s[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);for(p&&p(t);l.length;)l.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,s=1;s<r.length;s++){var u=r[s];0!==o[u]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={0:0},i=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var p=u;i.push([2,1]),r()}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(7);Object.defineProperty(t,"CarContainer",{enumerable:!0,get:function(){return n.default}});var o=r(8);Object.defineProperty(t,"CarStatic",{enumerable:!0,get:function(){return o.default}});var i=r(9);Object.defineProperty(t,"CarPlayer",{enumerable:!0,get:function(){return i.default}});var a=r(10);Object.defineProperty(t,"SkidMark",{enumerable:!0,get:function(){return a.default}});var s=r(11);Object.defineProperty(t,"SkidMarkGroup",{enumerable:!0,get:function(){return s.default}})},,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),r(1);var n=r(3),o={type:Phaser.AUTO,width:256,height:224,zoom:3,input:{keyboard:!0,gamepad:!0},render:{pixelArt:!0,antialias:!1,antialiasGL:!1},physics:{default:"matter",matter:{debug:!1,gravity:{y:0}}},scene:[n.LoaderScene,n.GameScene]};window.addEventListener("load",(function(){new Phaser.Game(o)}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4);Object.defineProperty(t,"LoaderScene",{enumerable:!0,get:function(){return n.default}});var o=r(5);Object.defineProperty(t,"GameScene",{enumerable:!0,get:function(){return o.default}})},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.preload=function(){this.load.image("bg","./assets/bg.png"),this.load.spritesheet("cars","./assets/cars.png",{frameWidth:16,frameHeight:16})},t.prototype.create=function(){this.scene.start("game")},t}(Phaser.Scene);t.default=i},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=r(6),a=r(0),s=function(e){function t(){return e.call(this,{key:"game",active:!1,visible:!1})||this}return o(t,e),t.prototype.init=function(){this.inputs=new i.default(this),this.skidMarks=new a.SkidMarkGroup(this)},t.prototype.create=function(){for(var e=this.add.image(0,0,"bg").setOrigin(0,0),t=e.width,r=e.height,n=new a.CarPlayer(this,t/2,r/2).setDepth(2),o=this.add.group({classType:a.CarStatic}).setDepth(1),i=0;i<15;i++)Math.random()<.25&&o.create(60,80+16*i).setAngle(0);for(i=0;i<15;i++)Math.random()<.25&&o.create(452,80+16*i).setAngle(180);for(i=0;i<23;i++)Math.random()<.25&&o.create(80+16*i,324).setAngle(-90);for(i=0;i<23;i++)Math.random()<.25&&o.create(80+16*i,60).setAngle(90);for(i=0;i<17;i++)Math.random()<.25&&o.create(128+16*i,132).setAngle(-90);for(i=0;i<17;i++)Math.random()<.25&&o.create(128+16*i,156).setAngle(90);for(i=0;i<17;i++)Math.random()<.25&&o.create(128+16*i,228).setAngle(-90);for(i=0;i<17;i++)Math.random()<.25&&o.create(128+16*i,252).setAngle(90);this.cameras.main.setBounds(0,0,t,r),this.cameras.main.startFollow(n,!0),this.matter.world.setBounds(32,32,t-64,r-64)},t}(Phaser.Scene);t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.scene=e,this.keys=this.scene.input.keyboard.addKeys("W,A,S,D,up,left,down,right")}return Object.defineProperty(e.prototype,"up",{get:function(){return this.keys.up.isDown||this.keys.W.isDown||this.padA},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"down",{get:function(){return this.keys.down.isDown||this.keys.S.isDown||this.padB},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"left",{get:function(){return this.keys.left.isDown||this.keys.A.isDown||this.getPadH(!0)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"right",{get:function(){return this.keys.right.isDown||this.keys.D.isDown||this.getPadH(!1)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"padA",{get:function(){return this.pad&&this.pad.buttons.some((function(e){return e.index%2==0&&1===e.value}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"padB",{get:function(){return this.pad&&this.pad.buttons.some((function(e){return e.index%2==1&&1===e.value}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"pad",{get:function(){var e=this.scene.input.gamepad;return e&&e.gamepads&&e.gamepads.length?e.gamepads[0]:null},enumerable:!1,configurable:!0}),e.prototype.getPadH=function(e){return this.pad&&this.pad.axes[0].getValue()===(e?-1:1)},e}();t.default=n},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(t,r,n,o){var i=e.call(this,t,r,n)||this;i.chassis=new Phaser.GameObjects.Sprite(t,0,0,"cars",o),i.wheels=[];for(var a=0;a<2;a++)for(var s=0;s<2;s++){var u=5-10*a,c=10*s-5;i.wheels.push(new Phaser.GameObjects.Rectangle(t,u,c,4,2,0))}return i.add(i.wheels),i.add(i.chassis),i.setSize(16,8),i.scene.add.existing(i),i.sprite=i.scene.matter.add.gameObject(i),i}return o(t,e),t}(Phaser.GameObjects.Container);t.default=i},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(t,r,n){return e.call(this,t,r,n,1)||this}return o(t,e),t}(r(0).CarContainer);t.default=i},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){function t(t,r,n){var o=e.call(this,t,r,n,0)||this,a={angularGrip:.05,grip:.02,powerForward:.075,powerReverse:.025,turnMax:40*Phaser.Math.DEG_TO_RAD,turnRate:20*Phaser.Math.DEG_TO_RAD};return o.setData(i(i({},a),{drag:1-a.grip,angularDrag:1-a.angularGrip,wheelAngle:0})),o}return o(t,e),t.prototype.preUpdate=function(){var e=this.scene.inputs,t=e.left,r=e.right,n=e.up,o=e.down,i=this.getData(["powerForward","powerReverse","turnMax","turnRate","grip","drag","angularGrip","angularDrag"]),a=i[0],s=i[1],u=i[2],c=i[3],p=i[4],f=i[5],l=i[6],h=i[7],d=this.body.angularVelocity*h,y=this.body.speed,g=0;if(n?g=a:o&&(g=-s,y=-y),t||r){var b=Math.sign(Math.floor(y/.1));this.wheelAngle=Math.min(Math.max(this.wheelAngle+(t?-c:c),-u),u),d+=b*this.wheelAngle*.1*l}else 0!==this.wheelAngle&&(this.wheelAngle=this.wheelAngle>0?Math.max(this.wheelAngle-c,0):Math.min(this.wheelAngle+c,0));var _=new Phaser.Math.Vector2(this.body.position.x-this.body.positionPrev.x,this.body.position.y-this.body.positionPrev.y),v=new Phaser.Math.Vector2(_.x*f+Math.cos(this.rotation)*(y*p+g),_.y*f+Math.sin(this.rotation)*(y*p+g));this.sprite.setVelocity(v.x,v.y),this.sprite.setAngularVelocity(d);for(var O=0;O<2;O++)this.wheels[O].setRotation(this.wheelAngle);Math.abs(d)>.025&&Math.abs(y)>1&&this.scene.skidMarks.draw(new Phaser.Math.Vector2(this.x,this.y),this.rotation)},Object.defineProperty(t.prototype,"wheelAngle",{get:function(){return this.getData("wheelAngle")},set:function(e){this.setData("wheelAngle",e)},enumerable:!1,configurable:!0}),t}(r(0).CarContainer);t.default=a},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(t,r,n){return e.call(this,t,r,n,4,3,3355443)||this}return o(t,e),t}(Phaser.GameObjects.Rectangle);t.default=i},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),a=function(e){function t(t){return e.call(this,t,[],{classType:i.SkidMark})||this}return o(t,e),t.prototype.draw=function(e,t){for(var r=-1;r<2;r+=2)this.create(e.x+Math.sin(t)*(4*r)-6*Math.cos(t),e.y-Math.cos(t)*(4*r)-6*Math.sin(t)).setRotation(t)},t}(Phaser.GameObjects.Group);t.default=a}]);