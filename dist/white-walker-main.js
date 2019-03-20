!function(e){var t={};function i(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){i(1),i(2);const o=document.querySelector(".snow"),n=parseInt(o.getAttribute("count"));let r={current:0,force:.1,target:.1,min:.1,max:.25,easing:.005};new class{constructor(e,t={}){t=Object.assign({antialias:!1,depthTest:!1,mousemove:!1,autosize:!0,side:"front",vertex:"\n        precision highp float;\n\n        attribute vec4 a_position;\n        attribute vec4 a_color;\n\n        uniform float u_time;\n        uniform vec2 u_resolution;\n        uniform vec2 u_mousemove;\n        uniform mat4 u_projection;\n\n        varying vec4 v_color;\n\n        void main() {\n\n          gl_Position = u_projection * a_position;\n          gl_PointSize = (10.0 / gl_Position.w) * 100.0;\n\n          v_color = a_color;\n\n        }",fragment:"\n        precision highp float;\n\n        uniform sampler2D u_texture;\n        uniform int u_hasTexture;\n\n        varying vec4 v_color;\n\n        void main() {\n\n          if ( u_hasTexture == 1 ) {\n\n            gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);\n\n          } else {\n\n            gl_FragColor = v_color;\n\n          }\n\n        }",uniforms:{},buffers:{},camera:{},texture:null,onUpdate:()=>{},onResize:()=>{}},t);const i=Object.assign({time:{type:"float",value:0},hasTexture:{type:"int",value:0},resolution:{type:"vec2",value:[0,0]},mousemove:{type:"vec2",value:[0,0]},projection:{type:"mat4",value:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}},t.uniforms),o=Object.assign({position:{size:3,data:[]},color:{size:4,data:[]}},t.buffers),n=Object.assign({fov:60,near:1,far:1e4,aspect:1,z:100,perspective:!0},t.camera),r=document.createElement("canvas"),a=r.getContext("webgl",{antialias:t.antialias});if(!a)return!1;this.count=0,this.gl=a,this.canvas=r,this.camera=n,this.holder=e,this.onUpdate=t.onUpdate,this.onResize=t.onResize,this.data={},e.appendChild(r),this.createProgram(t.vertex,t.fragment),this.createBuffers(o),this.createUniforms(i),this.updateBuffers(),this.updateUniforms(),this.createTexture(t.texture),a.enable(a.BLEND),a.enable(a.CULL_FACE),a.blendFunc(a.SRC_ALPHA,a.ONE),a[t.depthTest?"enable":"disable"](a.DEPTH_TEST),t.autosize&&window.addEventListener("resize",e=>this.resize(e),!1),t.mousemove&&window.addEventListener("mousemove",e=>this.mousemove(e),!1),this.resize(),this.update=this.update.bind(this),this.time={start:performance.now(),old:performance.now()},this.update()}mousemove(e){let t=e.pageX/this.width*2-1,i=e.pageY/this.height*2-1;this.uniforms.mousemove=[t,i]}resize(e){const t=this.holder,i=this.canvas,o=this.gl,n=this.width=t.offsetWidth,r=this.height=t.offsetHeight,a=this.aspect=n/r,s=devicePixelRatio;i.width=n*s,i.height=r*s,i.style.width=n+"px",i.style.height=r+"px",o.viewport(0,0,n*s,r*s),o.clearColor(0,0,0,0),this.uniforms.resolution=[n,r],this.uniforms.projection=this.setProjection(a),this.onResize(n,r,s)}setProjection(e){const t=this.camera;if(t.perspective){t.aspect=e;const i=t.fov*(Math.PI/180),o=Math.tan(.5*Math.PI-.5*i),n=1/(t.near-t.far),r=[o/t.aspect,0,0,0,0,o,0,0,0,0,(t.near+t.far)*n,-1,0,0,t.near*t.far*n*2,0];return r[14]+=t.z,r[15]+=t.z,r}return[2/this.width,0,0,0,0,-2/this.height,0,0,0,0,1,0,-1,1,0,1]}createShader(e,t){const i=this.gl,o=i.createShader(e);if(i.shaderSource(o,t),i.compileShader(o),i.getShaderParameter(o,i.COMPILE_STATUS))return o;console.log(i.getShaderInfoLog(o)),i.deleteShader(o)}createProgram(e,t){const i=this.gl,o=this.createShader(i.VERTEX_SHADER,e),n=this.createShader(i.FRAGMENT_SHADER,t),r=i.createProgram();i.attachShader(r,o),i.attachShader(r,n),i.linkProgram(r),i.getProgramParameter(r,i.LINK_STATUS)?(i.useProgram(r),this.program=r):(console.log(i.getProgramInfoLog(r)),i.deleteProgram(r))}createUniforms(e){const t=this.gl,i=this.data.uniforms=e,o=this.uniforms={};Object.keys(i).forEach(e=>{i[e].location=t.getUniformLocation(this.program,"u_"+e),Object.defineProperty(o,e,{set:t=>{i[e].value=t,this.setUniform(e,t)},get:()=>i[e].value})})}setUniform(e,t){const i=this.gl,o=this.data.uniforms[e];switch(o.value=t,o.type){case"int":i.uniform1i(o.location,t);break;case"float":i.uniform1f(o.location,t);break;case"vec2":i.uniform2f(o.location,...t);break;case"vec3":i.uniform3f(o.location,...t);break;case"vec4":i.uniform4f(o.location,...t);break;case"mat2":i.uniformMatrix2fv(o.location,!1,t);break;case"mat3":i.uniformMatrix3fv(o.location,!1,t);break;case"mat4":i.uniformMatrix4fv(o.location,!1,t)}}updateUniforms(){this.gl;const e=this.data.uniforms;Object.keys(e).forEach(t=>{const i=e[t];this.uniforms[t]=i.value})}createBuffers(e){this.gl;const t=this.data.buffers=e,i=this.buffers={};Object.keys(t).forEach(e=>{const o=t[e];o.buffer=this.createBuffer("a_"+e,o.size),Object.defineProperty(i,e,{set:i=>{t[e].data=i,this.setBuffer(e,i),"position"==e&&(this.count=t.position.data.length/3)},get:()=>t[e].data})})}createBuffer(e,t){const i=this.gl,o=this.program,n=i.getAttribLocation(o,e),r=i.createBuffer();return i.bindBuffer(i.ARRAY_BUFFER,r),i.enableVertexAttribArray(n),i.vertexAttribPointer(n,t,i.FLOAT,!1,0,0),r}setBuffer(e,t){const i=this.gl,o=this.data.buffers;(null!=e||i.bindBuffer(i.ARRAY_BUFFER,null))&&(i.bindBuffer(i.ARRAY_BUFFER,o[e].buffer),i.bufferData(i.ARRAY_BUFFER,new Float32Array(t),i.STATIC_DRAW))}updateBuffers(){this.gl;const e=this.buffers;Object.keys(e).forEach(t=>e[t]=buffer.data),this.setBuffer(null)}createTexture(e){const t=this.gl,i=t.createTexture();t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),this.texture=i,e&&(this.uniforms.hasTexture=1,this.loadTexture(e))}loadTexture(e){const t=this.gl,i=this.texture,o=new Image;o.onload=(()=>{t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,o),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}),o.src=e}update(){const e=this.gl,t=performance.now(),i=(t-this.time.start)/5e3,o=t-this.time.old;this.time.old=t,this.uniforms.time=i,this.count>0&&(e.clear(e.COLORBUFFERBIT),e.drawArrays(e.POINTS,0,this.count)),this.onUpdate(o),requestAnimationFrame(this.update)}}(o,{depthTest:!1,texture:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTUtMDctMDNUMTg6NTk6MjIrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmIzMzBlMWI0LTk5ZDctNGU2NS05MGQ2LTNmYjFiYmE2ZTE0MCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjAyNThjNzMxLTQ4ZjQtYTA0MS1hNGFkLTQ4MTA2MTVjY2FlYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJjY2VkMTUyLTRjNzAtNDFlZC1hMzcyLWRlOWY4NjgyZTcwMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmNjZWQxNTItNGM3MC00MWVkLWEzNzItZGU5Zjg2ODJlNzAxIiBzdEV2dDp3aGVuPSIyMDE1LTA3LTAzVDE4OjU5OjIyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjMzMGUxYjQtOTlkNy00ZTY1LTkwZDYtM2ZiMWJiYTZlMTQwIiBzdEV2dDp3aGVuPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz50mbqsAAAToElEQVR4nOVbW49dR5X+VlXtc2v3Ne52N6bTTnAc0u02GRJQwEhYQkJ5QhmhPPOUl0iBB/4AP4JfMA95IEIaJEYiQhlesCZMEE1iGxJHIjK21XbSwX1xd5+zd9Va87BrVdfefWwI4xEaUVJpn7PPPnVqfbUu31pVh0QE/8zN/KMn8I9uTl+8+uqrAAARgYgghIBer4dnnnkGAPDFL34RANDr9eiJJ55AVVUgIhhjwMwYDAbY3Nyk8+fPP/DHdnd3ZWtr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",uniforms:{worldSize:{type:"vec3",value:[0,0,0]},gravity:{type:"float",value:100},wind:{type:"float",value:0}},buffers:{size:{size:1,data:[]},rotation:{size:3,data:[]},speed:{size:3,data:[]}},vertex:"\n    precision highp float;\n\n    attribute vec4 a_position;\n    attribute vec4 a_color;\n    attribute vec3 a_rotation;\n    attribute vec3 a_speed;\n    attribute float a_size;\n\n    uniform float u_time;\n    uniform vec2 u_mousemove;\n    uniform vec2 u_resolution;\n    uniform mat4 u_projection;\n    uniform vec3 u_worldSize;\n    uniform float u_gravity;\n    uniform float u_wind;\n\n    varying vec4 v_color;\n    varying float v_rotation;\n\n    void main() {\n\n      v_color = a_color;\n      v_rotation = a_rotation.x + u_time * a_rotation.y;\n\n      vec3 pos = a_position.xyz;\n\n      pos.x = mod(pos.x + u_time + u_wind * a_speed.x, u_worldSize.x * 2.0) - u_worldSize.x;\n      pos.y = mod(pos.y - u_time * a_speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;\n\n      pos.x += sin(u_time * a_speed.z) * a_rotation.z;\n      pos.z += cos(u_time * a_speed.z) * a_rotation.z;\n\n      gl_Position = u_projection * vec4( pos.xyz, a_position.w );\n      gl_PointSize = ( a_size / gl_Position.w ) * 100.0;\n\n    }",fragment:"\n    precision highp float;\n\n    uniform sampler2D u_texture;\n\n    varying vec4 v_color;\n    varying float v_rotation;\n\n    void main() {\n\n      vec2 rotated = vec2(\n        cos(v_rotation) * (gl_PointCoord.x - 0.5) + sin(v_rotation) * (gl_PointCoord.y - 0.5) + 0.5,\n        cos(v_rotation) * (gl_PointCoord.y - 0.5) - sin(v_rotation) * (gl_PointCoord.x - 0.5) + 0.5\n      );\n\n      vec4 snowflake = texture2D(u_texture, rotated);\n\n      gl_FragColor = vec4(snowflake.rgb, snowflake.a * v_color.a);\n\n    }",onResize(e,t,i){const o=[],r=[],a=[],s=[],c=[],u=e/t*110;Array.from({length:e/t*n},e=>{o.push(-u+Math.random()*u*2,110*Math.random()*2-110,80*Math.random()*2),c.push(1+Math.random(),1+Math.random(),10*Math.random()),s.push(2*Math.random()*Math.PI,20*Math.random(),10*Math.random()),r.push(1,1,1,.1+.2*Math.random()),a.push(5*Math.random()*5*(t*i/1e3))}),this.uniforms.worldSize=[u,110,80],this.buffers.position=o,this.buffers.color=r,this.buffers.rotation=s,this.buffers.size=a,this.buffers.speed=c},onUpdate(e){r.force+=(r.target-r.force)*r.easing,r.current+=r.force*(.2*e),this.uniforms.wind=r.current,Math.random()>.995&&(r.target=(r.min+Math.random()*(r.max-r.min))*(Math.random()>.5?-1:1),console.log(r.target))}});$(document).ready(function(){var e;e="https://www.tiendasjumbo.co/whisky-johnnie-walker-blanco-game-of-thones-x-750ml-edicion-limitada/p",$(`.${"snow"}`).click(function(){window.location.href=e}),function(e){console.log({contentClass:e})}("close")})},function(e,t,i){},function(e,t,i){}]);