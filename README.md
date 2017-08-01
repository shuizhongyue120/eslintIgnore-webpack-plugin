# eslintIgnore

eslintIgnore webpack eslint-loader

---

项目中推广eslint规范，在使用发现了一个问题；
eslintignore文件只能在 eslint xxx 命令行形式中生效；
webpack eslint-loader则不可以，因为webpack loader中规定了 忽略文件要通过exclude方式。

故写了一个简单的loader来读取eslintignore的内容，并且以数字的形式返回给exclude。
使用方式如下：
<pre><code type="javascript">
    preLoaders: [{
            test: /\w+[^Tpl]\.js$/,
            loader: 'eslint-loader',
            include: path.resolve(__dirname, "../js"),
            exclude: new EslintIgnore()
            /*exclude:[ // 排除第三方库，插件之类的
                path.resolve(__dirname, "../js/lib"),
                path.resolve(__dirname, "../js/com/thunderAgent.js"),
                path.resolve(__dirname, "../js/com/pv_click_v2.mini.js"),
                path.resolve(__dirname, "../js/util/debug.js")
            ]*/
        }]
</code></pre>




