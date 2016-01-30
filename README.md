WeUI 为微信 Web 服务量身设计  ![](https://travis-ci.org/weui/weui.svg?branch=master)
====

## 概述

WeUI是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信 Web 开发量身设计，可以令用户的使用感知更加统一。包含`button`、`cell`、`dialog`、 `progress`、 `toast`、`article`、`actionsheet`、`icon`等各式元素。

## 使用

#### 方法一：
使用`bower`进行下载
```
bower install --save weui
```

#### 方法二：
使用`npm`进行下载
```
npm install --save weui
```

以上两种方法下载后，只需要在页面中引入`dist/style/weui.css`或者`dist/style/weui.min.css`其中之一即可. 例如:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
        <title>WeUI</title>
        <link rel="stylesheet" href="path/to/weui/dist/style/weui.min.css"/>
    </head>
    <body>
    
    </body>
</html>
```

## 开发

```
git clone https://github.com/weui/weui.git
cd weui
npm install -g gulp
npm install
npm start
```
运行`npm start`命令，会监听`src`目录下所有文件的变更，并且默认会在`8080`端口启动服务器，然后在浏览器打开 `http://localhost:8080/example`。


## 手机预览

请用微信扫码

![](./dist/example/snapshot/qrcode.png)

[http://weui.github.io/weui/](http://weui.github.io/weui)


## 第三方扩展

- [lihongxun945/jquery-weui](http://lihongxun945.github.io/jquery-weui/components)
- [kevyu/weui-sass](https://github.com/kevyu/weui-sass)
- [Eric-Guo/weui-rails](https://github.com/Eric-Guo/weui-rails)(Using kevyu/weui-sass)
- [n7best/react-weui](https://github.com/n7best/react-weui)
- [aidenzou/vue-weui](https://github.com/aidenzou/vue-weui)
- [adcentury/vue-weui](https://github.com/adcentury/vue-weui)
- [ZTfer/weui-sketch](https://github.com/ZTfer/weui-sketch)
- [i5ting/weui-practice](https://github.com/i5ting/weui-practice)

## 文档

WeUI 说明文档参考 [Wiki](https://github.com/weui/weui/wiki)

## License
The MIT License(http://opensource.org/licenses/MIT)
请自由地享受和参与开源

## 贡献

如果你有好的意见或建议，欢迎给我们提issue或pull request，为提升微信web体验贡献力量
