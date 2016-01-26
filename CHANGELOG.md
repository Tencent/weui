
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