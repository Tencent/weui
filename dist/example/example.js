/**
 * Created by jf on 2015/9/11.
 */

$(function () {

    var pageManager = {
        $container: $('.js_container'),
        pageStack: [],
        pages: [],
        _isGo: false,
        init: function () {
            var self = this;
            $(window).on('hashchange', function (e) {
                var _isBack = !self._isGo;
                self._isGo = false;
                if (!_isBack) {
                    return;
                }

                // TODO just `go back` for this demo
                self.back();
            });

            return this;
        },
        push: function (page) {
            this.pages.push(page);
            return this;
        },
        go: function (to) {
            var page = this._find('name', to);
            if (!page) {
                return;
            }

            var html = $(page.template).html();
            var $html = $(html).addClass('slideIn').addClass(page.name);
            this.$container.append($html);
            this.pageStack.push($html);

            this._isGo = true;
            location.hash = page.url;

            if (!page.isBind) {
                this._bind(page);
            }

            return this;
        },
        back: function (){
            var $html = this.pageStack.pop();
            if (!$html) {
                return;
            }

            $html.addClass('slideOut').on('animationend', function () {
                $html.remove();
            }).on('webkitAnimationEnd', function () {
                $html.remove();
            });

            return this;
        },
        _find: function (key, value) {
            var page = null;
            for (var i = 0, len = this.pages.length; i < len; i++) {
                if (this.pages[i][key] === value) {
                    page = this.pages[i];
                    break;
                }
            }
            return page;
        },
        _bind: function (page) {
            var events = page.events || {};
            for (var t in events) {
                for (var type in events[t]) {
                    this.$container.on(type, t, events[t][type]);
                }
            }
            page.isBind = true;
        }
    };

    var home = {
        name: 'home',
        url: '#',
        template: '#tpl_home',
        events: {
            '.js_cell': {
                click: function (e) {
                    var id = $(this).data('id');
                    pageManager.go(id);
                }
            }
        }
    };
    var button = {
        name: 'button',
        url: '#button',
        template: '#tpl_button'
    };
    var cell = {
        name: 'cell',
        url: '#cell',
        template: '#tpl_cell',
        events: {
            '#showTooltips': {
                click: function (){
                    var $tooltips = $('.js_tooltips');
                    if ($tooltips.css('display') != 'none') {
                        return;
                    }

                    // 如果有`animation`, `position: fixed`不生效
                    $('.page.cell').removeClass('slideIn');
                    $tooltips.show();
                    setTimeout(function (){
                        $tooltips.hide();
                    }, 2000);
                }
            }
        }
    };
    var toast = {
        name: 'toast',
        url: '#toast',
        template: '#tpl_toast',
        events: {
            '#showToast': {
                click: function (e){
                    var $toast = $('#toast');
                    if ($toast.css('display') != 'none') {
                        return;
                    }

                    $toast.show();
                    setTimeout(function (){
                        $toast.hide();
                    }, 2000);
                }
            },
            '#showLoadingToast': {
                click: function (e){
                    var $loadingToast = $('#loadingToast');
                    if ($loadingToast.css('display') != 'none') {
                        return;
                    }

                    $loadingToast.show();
                    setTimeout(function (){
                        $loadingToast.hide();
                    }, 2000);
                }
            }
        }
    };
    var dialog = {
        name: 'dialog',
        url: '#dialog',
        template: '#tpl_dialog',
        events: {
            '#showDialog1': {
                click: function (e){
                    var $dialog = $('#dialog1');
                    $dialog.show();
                    $dialog.find('.weui_btn_dialog').on('click', function () {
                        $dialog.hide();
                    });
                }
            },
            '#showDialog2': {
                click: function (e){
                    var $dialog = $('#dialog2');
                    $dialog.show();
                    $dialog.find('.weui_btn_dialog').on('click', function () {
                        $dialog.hide();
                    });
                }
            }
        }
    };
    var progress = {
        name: 'progress',
        url: '#progress',
        template: '#tpl_progress',
        events: {
            '#btnStartProgress': {
                click: function (){

                    if ($(this).hasClass('weui_btn_disabled')) {
                        return;
                    }

                    $(this).addClass('weui_btn_disabled');

                    var progress = 0;
                    var $progress = $('.js_progress');

                    function next(){
                        $progress.css({width: progress + '%'});
                        progress = ++progress % 100;
                        setTimeout(next, 30);
                    }
                    next();
                }
            }
        }
    };
    var msg = {
        name: 'msg',
        url: '#msg',
        template: '#tpl_msg',
        events: {}
    };
    var article = {
        name: 'article',
        url: '#article',
        template: '#tpl_article',
        events: {}
    };
    var actionSheet = {
        name: 'actionSheet',
        url: '#actionSheet',
        template: '#tpl_actionSheet',
        events: {
            '#showActionSheet': {
                click: function (){
                    var mask = $('#mask');
                    var weuiActionsheet = $('#weui_actionsheet');
                    weuiActionsheet.addClass('weui_actionsheet_toggle');
                    mask.show().addClass('weui_fade_toggle').click(function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                    $('#actionsheet_cancel').click(function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                    weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');

                    function hideActionSheet(weuiActionsheet, mask) {
                        weuiActionsheet.removeClass('weui_actionsheet_toggle');
                        mask.removeClass('weui_fade_toggle');
                        weuiActionsheet.on('transitionend', function () {
                            mask.hide();
                        }).on('webkitTransitionEnd', function () {
                            mask.hide();
                        })
                    }
                }
            }
        }
    };
    var icons = {
        name: 'icons',
        url: '#icons',
        template: '#tpl_icons',
        events: {}
    };

    pageManager.push(home)
        .push(button)
        .push(cell)
        .push(toast)
        .push(dialog)
        .push(progress)
        .push(msg)
        .push(article)
        .push(actionSheet)
        .push(icons)
        .init()
        .go('home');
});