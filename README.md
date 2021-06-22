# ac_music

## 安装依赖
```
npm install
```

### 开发模式下
```
npm run watch
并在tampermonkey新建脚本，头部下面添加如下（chrome下的tampermonkey需要勾选
“允许访问文件网址”）
// @require      file://（你的文件夹）/dist/js/chunk-vendors.js
// @require      file://（你的文件夹）/dist/js/app.js
```

### 生产模式
npm run build
新建脚本在头部添加vue、vuex依赖
// @require      https://unpkg.com/vue@3.1.1/dist/vue.global.js
// @require      https://unpkg.com/vuex@4.0.0/dist/vuex.global.js
将dist/js/app.js里面的代码粘贴致“your code”处即可
