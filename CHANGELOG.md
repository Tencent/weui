#### v1.1.1 (2017-01-17)

- 【修复】 fix icon-safe的错乱问题
- 【增强】 增加按钮loading状态
- 【增强】 更新普通警告图标颜色



#### v1.1.0 (2016-11-21)

- 【增强】 新增兼容IE Edge版本的switch
- 【增强】 增加组件 badge徽章
- 【增强】 增加组件 slider滑块
- 【增强】 增加组件 picker多列选择器
- 【优化】 把radio和checkbox下的weui-cell的:active挪到weui-check__label
- 【优化】 src/navbar.less 更名为 src/weui-navbar.less
- 【优化】 src/tabbar.less 更名为 src/weui-tabbar.less
- 【优化】 loading的base64
- 【优化】 去掉废弃和冗余的样式
- 【修复】 preview下，两个button并排时，高度有问题 (#462)
- 【修复】 button作为.weui-vcode-btn时的样式问题 (#519)
- 【修复】 sourcemap 为乱码的问题
- 【修复】 select的箭头没有居中的问题
- 【修复】 tabbar的间距样式



#### v1.0.2 (2016-09-27)

- 【修复】 fix 不见了的weui-icon_clear的icon: weui-icon_close -> weui-icon_clear
- 【修复】 preview在没有value的时候会变形: 增加weui-form-preview__item来控制
- 【修复】 补上九宫格Grid的DEMO
- 【修复】 九宫格文字换行问题 #483
- 【优化】 icon的实现
- 【优化】 example代码


#### v1.0.1 (2016-09-27)

- 【修复】 preview中，button与a标签的样式不一致
- 【修复】 把遗漏的weui-media 更名为 weui-media-box


#### v1.0.0 (2016-09-23)

- 【增强】 采用BEM命名规范
- 【增强】 新增Flex布局
- 【增强】 新增Gallery
- 【增强】 新增Preview
- 【增强】 新增Agreement
- 【增强】 新增Footer
- 【增强】 新增Dialog和Actionsheet的Android样式
- 【修复】 修正了部分组件的间距
- 【修复】 修复了已知问题


#### v0.4.3 (2016-07-05)

- 【修复】 图片上传组件无法选中图片的缺陷
- 【修复】 九宫格组件少于3个时出现多余线段的缺陷
- 【修复】 解决某些组件的z-index冲突，标准化z-index
- 【修复】 解决`pannel`图标没有对齐的问题 
- 【增强】 demo 更新 router 
- 【增强】 autoprefixer 指定浏览器范围

详情参考:

- [60873c2](https://github.com/weui/weui/commit/60873c2) fix 某些android机不能选图片的bug (issues#388)
- [46235c6](https://github.com/weui/weui/commit/46235c6) #376 Fix grids top line bug with less than 2 item
- [715de0e](https://github.com/weui/weui/commit/715de0e) standard weui zindex (#415)
- [07187f8](https://github.com/weui/weui/commit/07187f8) verticle mediabox appmsg thumb
- [4c566dd](https://github.com/weui/weui/commit/4c566dd) #401 update demo router
- [d8b504d](https://github.com/weui/weui/commit/d8b504d) #401 指定 autoprefixer 浏览器范围

#### v0.4.2 (2016-04-28)

- 【修复】 修复 `weui_label` 在英文字符下溢出的缺陷
- 【增强】 Article 页面增加支持图片样式
- 【修复】 demo 页面的 `lang` 属性修改
- 【修复】 修复 demo 页面的 ActionSheet mask 无动画的缺陷
- 【增强】 优化 demo, 为tab中navbar和tabbar里标签添加点击事件交互，方便查看实际效果
- 【修复】 修改 `weui_label` 的宽度为 105px

详情参考:

- [8515ba3](https://github.com/weui/weui/commit/8515ba3) word wrap weui label (#341)
- [b37830b](https://github.com/weui/weui/commit/b37830b) add article img
- [9ad4230](https://github.com/weui/weui/commit/9ad4230) 调整 html 的 lang 属性
- [775502c](https://github.com/weui/weui/commit/775502c) fix mask no transition bug (#333)
- [3a6eaf7](https://github.com/weui/weui/commit/3a6eaf7) 优化demo 为tab中navbar和tabbar里标签添加点击事件交互，方便查看实际效果
- [14ee030](https://github.com/weui/weui/commit/14ee030) standard weui select gap

#### v0.4.1 (2016-04-06)

- 【修复】优化 demo，修复 demo 的若干 bug
- 【修复】修复搜索框上下边框位置的 bug
- 【修复】改进 navbar 高亮背景色过浅的问题
- 【修复】修复 navbar 在 iOS 下无法点击的 bug
- 【修复】禁用 cssnano 插件压缩 css 时对 z-index 的转换，是 mask、toast、dialog 等有预设的 z-index
- 【修复】修复弹框内容在英文字符时溢出的 bug
- 【修复】修复 media-box 布局的 bug
- 【修复】修复 tab demo 页面出现滚动条的 bug

详情参考:

- [22ba680](https://github.com/weui/weui/commit/22ba680) 优化 demo
- [169e18a](https://github.com/weui/weui/commit/169e18a) fixed `search bar` border-top & border-bottom position bug
- [7db3ca0](https://github.com/weui/weui/commit/7db3ca0) #295 fixed navbar active background-color
- [1a549ea](https://github.com/weui/weui/commit/1a549ea) improve navbar touched behavior on ios
- [6c1d7b5](https://github.com/weui/weui/commit/6c1d7b5) disable cssnano zindex
- [e32dc1a](https://github.com/weui/weui/commit/e32dc1a) add dialog content word wrap
- [b93306b](https://github.com/weui/weui/commit/b93306b) fix flexbox layout problem
- [2260e49](https://github.com/weui/weui/commit/2260e49) #244 修复 tab demo 页出滚动条的bug

#### v0.4.0 (2016-02-26)

- 【增强】新增 navbar 组件
- 【增强】新增 tabbar 组件
- 【增强】新增 panel 组件
- 【增强】新增 search_bar 组件
- 【修复】#193 字体格式的问题，只使用 ttf 格式文件
- 【增强】增加 `weui_icon_clear` 图标
- 【修复】去掉表单元素 input 、textarea 点击时的默认的阴影
- 【修复】修复 radio 图标没有完全居中的问题

详情参考：
- [3eda74a](https://github.com/weui/weui/commit/3eda74a) init navbar
- [2567ad9](https://github.com/weui/weui/commit/2567ad9) init tabbar
- [61ce366](https://github.com/weui/weui/commit/61ce366) rename card to panel
- [f081257](https://github.com/weui/weui/commit/f081257) add searchbar
- [affb271](https://github.com/weui/weui/commit/affb271) #193 fix font-face type
- [4a3762c](https://github.com/weui/weui/commit/4a3762c) add `weui_icon_clear`
- [491150b](https://github.com/weui/weui/commit/491150b) 去掉weui_cells_form的input textareat label[for]的点击阴影
- [370acc2](https://github.com/weui/weui/commit/370acc2) update radio icon position, remove unused property

#### v0.3.0 (2016-01-22)

- 【增强】#149 添加 `bower.json` 描述文件
- 【增强】增加图片上传（weui_uploader）组件
- 【增强】增加九宫格（grid）组件

详情参考：

- [4d8aeb5](https://github.com/weui/weui/commit/4d8aeb5) #149 add bower.json file
- [fe9d34f](https://github.com/weui/weui/commit/fe9d34f) add weui_uploader
- [d7a63bd](https://github.com/weui/weui/commit/d7a63bd) create `weui_grid`

#### v0.2.3 (2015-12-29)

- 【修复】#134 修复iOS平台下跳转新页面，返回时Cell出现黑边的bug
- 【增强】新增搜索框（放大镜）图标 `.weui_icon_search`
- 【增强】文本域（textarea）添加计数器（.weui_textarea_counter）
- 【修复】警告弹框内容居中，普通弹框内容居左
- 【修复】移除没有使用的类
- 【增强】#118 弹框按钮增加 active 态
- 【修复】修改`.weui_cells_access` 底部间距
- 【修复】`.weui_cells_tips` 内容居左

详情参考：

- [e08b9f6](https://github.com/weui/weui/commit/e08b9f6) #134 修复iOS平台下跳转新页面，返回时`Cell`出现黑边的bug
- [dad33d7](https://github.com/weui/weui/commit/dad33d7) add `weui_icon_search`
- [306e35f](https://github.com/weui/weui/commit/306e35f) add weui_textarea_counter
- [133800f](https://github.com/weui/weui/commit/133800f) weui_dialog align content
- [521807c](https://github.com/weui/weui/commit/521807c) fix textarea在weui_cell_warn下没有变色
- [9868278](https://github.com/weui/weui/commit/9868278) remove no use class name
- [7bd198b](https://github.com/weui/weui/commit/7bd198b) remove no use style
- [9b59aa4](https://github.com/weui/weui/commit/9b59aa4) #118 add `weui_dialog` button's active color
- [b480fb6](https://github.com/weui/weui/commit/b480fb6) weui_cells_access ft gap
- [6d65cc7](https://github.com/weui/weui/commit/6d65cc7) add header while output css
- [830eabe](https://github.com/weui/weui/commit/830eabe) `weui_cells_tips` align left

#### v0.2.2 (2015-11-30)

- 【修复】移出不必要的代码
- 【增强】移除 `.weui_check_label` 的 `display: block`属性
- 【增强】`.weui_dialog_ft` 从 `float` 改为 `flex`
- 【增强】`Cell` 实现，从 `table-cell` 改为 `flex`
- 【修复】#86 修复某些机型下字体图标无法显示的bug
- 【修复】`.weui_progress_cancel` 重命名为 `.weui_progress_opr`

详情参考：

- [5de42e3](https://github.com/weui/weui/commit/5de42e3) remove no use style
- [089725d](https://github.com/weui/weui/commit/089725d) remove `.weui_check_label` display: block because of `flex`
- [c0549ff](https://github.com/weui/weui/commit/c0549ff) weui_dialog_ft: `float` to `flex`
- [88afd9f](https://github.com/weui/weui/commit/88afd9f) `table-cell` to `flex`
- [4492533](https://github.com/weui/weui/commit/4492533) #86 修复某些机型下字体图标无法显示的bug
- [092ab48](https://github.com/weui/weui/commit/092ab48) rename `weui_progress_cancel` to `weui_progress_opr`

#### v0.2.1 （2015-11-11）

- 【修复】移除 step list 代码
- 【修复】去掉 Msg 的头
- 【修复】修改 input 的行高
- 【修复】#60 修复iOS下input[type=date]失效的bug
- 【修复】修改 Cells Title 字号为 14px
- 【增强】增加 ActionSheet 组件
- 【增强】增加取消图标`.weui_icon_cancel`
- 【增强】增加 info 图标 `.weui_icon_info_circle`
- 【增强】增加进度条（Progress）组件
- 【增强】增加开关（switch）组件

详情参考：

- [7a166d8](https://github.com/weui/weui/commit/7a166d8) remove weui_step_list.less
- [ec8f4e7](https://github.com/weui/weui/commit/ec8f4e7) 统一样式风格，提高可读性
- [c9a459f](https://github.com/weui/weui/commit/c9a459f) 去掉Msg的头
- [b62c24a](https://github.com/weui/weui/commit/b62c24a) 样式优化
- [f636d50](https://github.com/weui/weui/commit/f636d50) fix weui input line-height
- [c3508d9](https://github.com/weui/weui/commit/c3508d9) #60 修复iOS下input[type=date]失效的bug
- [ba95914](https://github.com/weui/weui/commit/ba95914) `cell title` set to 14px
- [ea613c1](https://github.com/weui/weui/commit/ea613c1) add action sheet
- [e9cc680](https://github.com/weui/weui/commit/e9cc680) add `weui_icon_cancel`
- [f8d22d5](https://github.com/weui/weui/commit/f8d22d5) add `weui_icon_info_circle` icon
- [0df897c](https://github.com/weui/weui/commit/0df897c) add `weui_progress` widget
- [bbb219c](https://github.com/weui/weui/commit/bbb219c) add weui_switch.less

#### v0.2.0 （2015-10-27）

- 【修复】按钮组中间的间距从 10px 改为 15px
- 【修复】修复镂空按钮 active 态的问题
- 【修复】表单下面没有按钮时，去掉 margin-top
- 【修复】Cells 没有 title 时，增加 margin-top
- 【修复】删除不必要的代码
- 【修复】修复表单、验证码的bug

详情参考：

- [4e25528](https://github.com/weui/weui/commit/4e25528) fix 按钮间的间距10px -> 15px
- [302c8a8](https://github.com/weui/weui/commit/302c8a8) fix 当在button标签上应用.weui_btn_plain_primary的时候，会出现背景色灰色填充，并且由于样式优先级的问题，在…
- [15605c8](https://github.com/weui/weui/commit/15605c8) add 在weui_cells_form下的weui_btn_area会有默认的margin-top
- [4bd0b01](https://github.com/weui/weui/commit/4bd0b01) fix cells没有title的时候缺乏margin-top
- [98d073f](https://github.com/weui/weui/commit/98d073f) del lab widget
- [97ffc47](https://github.com/weui/weui/commit/97ffc47) weui_button layout
- [59d8fd5](https://github.com/weui/weui/commit/59d8fd5) fix weui_select arrow align & weui_msg gap & weui_vcode align
- [f8f31aa](https://github.com/weui/weui/commit/f8f31aa) rename rename weui_dialog button

#### v0.1.0 (2015-09-07)

初始发布

- Initial release
