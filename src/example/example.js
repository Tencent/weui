/**
 * Created by jf on 2015/9/11.
 * Modified by bear on 2016/9/7.
 */
$(function () {
    var winH = $(window).height();
    var supportTouch = function(){
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }();
    var pageManager = {
        $container: $('#container'),
        _pageStack: [],
        _configs: [],
        _pageAppend: function(){},
        _defaultPage: null,
        _pageIndex: 1,
        setDefault: function (defaultPage) {
            this._defaultPage = this._find('name', defaultPage);
            return this;
        },
        setPageAppend: function (pageAppend) {
            this._pageAppend = pageAppend;
            return this;
        },
        init: function () {
            var self = this;

            $(window).on('hashchange', function () {
                var state = history.state || {};
                var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
                var page = self._find('url', url) || self._defaultPage;
                if (state._pageIndex <= self._pageIndex || self._findInStack(url)) {
                    self._back(page);
                } else {
                    self._go(page);
                }
            });

            if (history.state && history.state._pageIndex) {
                this._pageIndex = history.state._pageIndex;
            }

            this._pageIndex--;

            var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
            var page = self._find('url', url) || self._defaultPage;
            this._go(page);
            return this;
        },
        push: function (config) {
            this._configs.push(config);
            return this;
        },
        go: function (to) {
            var config = this._find('name', to);
            if (!config) {
                return;
            }
            location.hash = config.url;
        },
        _go: function (config) {
            this._pageIndex ++;

            history.replaceState && history.replaceState({_pageIndex: this._pageIndex}, '', location.href);

            var html = $(config.template).html();
            var $html = $(html).addClass('slideIn').addClass(config.name);
            $html.on('animationend webkitAnimationEnd', function(){
                $html.removeClass('slideIn').addClass('js_show');
            });
            this.$container.append($html);
            this._pageAppend.call(this, $html);
            this._pageStack.push({
                config: config,
                dom: $html
            });

            if (!config.isBind) {
                this._bind(config);
            }

            return this;
        },
        back: function () {
            history.back();
        },
        _back: function (config) {
            this._pageIndex --;

            var stack = this._pageStack.pop();
            if (!stack) {
                return;
            }

            var url = location.hash.indexOf('#') === 0 ? location.hash : '#';
            var found = this._findInStack(url);
            if (!found) {
                var html = $(config.template).html();
                var $html = $(html).css('opacity', 1).addClass(config.name);
                $html.insertBefore(stack.dom);

                if (!config.isBind) {
                    this._bind(config);
                }

                this._pageStack.push({
                    config: config,
                    dom: $html
                });
            }

            stack.dom.addClass('slideOut').on('animationend', function () {
                stack.dom.remove();
            }).on('webkitAnimationEnd', function () {
                stack.dom.remove();
            });

            return this;
        },
        _findInStack: function (url) {
            var found = null;
            for(var i = 0, len = this._pageStack.length; i < len; i++){
                var stack = this._pageStack[i];
                if (stack.config.url === url) {
                    found = stack;
                    break;
                }
            }
            return found;
        },
        _find: function (key, value) {
            var page = null;
            for (var i = 0, len = this._configs.length; i < len; i++) {
                if (this._configs[i][key] === value) {
                    page = this._configs[i];
                    break;
                }
            }
            return page;
        },
        _bind: function (page) {
            var events = page.events || {};
            for (var t in events) {
                for (var type in events[t]) {
                    var that = this;
                    if(type == 'click' && supportTouch){
                        (function(dom, event){
                            var touchStartY;
                            that.$container.on('touchstart', dom, function (e) {
                                touchStartY = e.changedTouches[0].clientY;
                            });
                            that.$container.on('touchend', dom, function (e) {
                                if (Math.abs(e.changedTouches[0].clientY - touchStartY) > 10) return;
                                e.preventDefault();

                                events[dom][event].call(this, e);
                            });
                        })(t, type);
                    }else{
                        this.$container.on(type, t, events[t][type]);
                    }
                }
            }
            page.isBind = true;
        }
    };
    var pages = {}, tpls = $('script[type="text/html"]');
    window.home = function(){
        location.hash = '';
    };

    for (var i = 0, len = tpls.length; i < len; ++i) {
        var tpl = tpls[i], name = tpl.id.replace(/tpl_/, '');
        pages[name] = {
            name: name,
            url: '#' + name,
            template: '#' + tpl.id
        };
    }

    pages.home.url = '#';
    pages.home.events = {
        '.js_item': {
            click: function (e) {
                var id = $(this).data('id');
                pageManager.go(id);
            }
        },
        '.js_category': {
            click: function(){
                var winH = $(window).height();
                var categorySpace = 10;
                return function(){
                    var $this = $(this),
                        $inner = $this.next('.js_categoryInner'),
                        $page = $this.parents('.page'),
                        $parent = $(this).parent('li');
                    var innerH = $inner.data('height');

                    if(!innerH){
                        $inner.css('height', 'auto');
                        innerH = $inner.height();
                        $inner.removeAttr('style');
                        $inner.data('height', innerH);
                    }

                    if($parent.hasClass('js_show')){
                        $parent.removeClass('js_show');
                    }else{
                        $parent.siblings().removeClass('js_show');

                        if(this.offsetTop + this.offsetHeight + innerH > $page.scrollTop() + winH){
                            $page.scrollTop(this.offsetTop + this.offsetHeight + innerH - winH + categorySpace);
                        }
                        $parent.addClass('js_show');
                    }
                };
            }()
        }
    };

    pages.input.events = {
        '#showTooltips': {
            click: function () {
                var $tooltips = $('.js_tooltips');
                if ($tooltips.css('display') != 'none') {
                    return;
                }

                // 如果有`animation`, `position: fixed`不生效
                $('.page.cell').removeClass('slideIn');
                $tooltips.css('display', 'block');
                setTimeout(function () {
                    $tooltips.css('display', 'none');
                }, 2000);
            }
        }
    };
    pages.toast.events = {
        '#showToast': {
            click: function (e) {
                var $toast = $('#toast');
                if ($toast.css('display') != 'none') {
                    return;
                }

                $toast.fadeIn(100);
                setTimeout(function () {
                    $toast.fadeOut(100);
                }, 2000);
            }
        },
        '#showLoadingToast': {
            click: function (e) {
                var $loadingToast = $('#loadingToast');
                if ($loadingToast.css('display') != 'none') {
                    return;
                }

                $loadingToast.fadeIn(100);
                setTimeout(function () {
                    $loadingToast.fadeOut(100);
                }, 2000);
            }
        }
    };
    pages.dialog.events = {
        '#showDialog1': {
            click: function (e) {
                var $dialog = $('#dialog1');
                $dialog.fadeIn(200);
                $dialog.find('.weui-dialog__btn').one('click', function () {
                    $dialog.fadeOut(200);
                });
            }
        },
        '#showDialog2': {
            click: function (e) {
                var $dialog = $('#dialog2');
                $dialog.fadeIn(200);
                $dialog.find('.weui-dialog__btn').one('click', function () {
                    $dialog.fadeOut(200);
                });
            }
        },
        '#showDialog3': {
            click: function (e) {
                var $dialog = $('#dialog3');
                $dialog.fadeIn(200);
                $dialog.find('.weui-dialog__btn').one('click', function () {
                    $dialog.fadeOut(200);
                });
            }
        },
        '#showDialog4': {
            click: function (e) {
                var $dialog = $('#dialog4');
                $dialog.fadeIn(200);
                $dialog.find('.weui-dialog__btn').one('click', function () {
                    $dialog.fadeOut(200);
                });
            }
        }
    };
    pages.progress.events = {
        '#btnStartProgress': {
            click: function () {

                if ($(this).hasClass('weui-btn_disabled')) {
                    return;
                }

                $(this).addClass('weui-btn_disabled');

                var progress = 0;
                var $progress = $('.js_progress');

                function next() {
                    $progress.css({width: progress + '%'});
                    progress = ++progress % 100;
                    setTimeout(next, 30);
                }

                next();
            }
        }
    };
    pages.actionsheet.events = {
        '#showIOSActionSheet': {
            click: (function(){
                function hideActionSheet(weuiActionsheet, mask) {
                    weuiActionsheet.removeClass('weui-actionsheet_toggle');
                    mask.removeClass('actionsheet__mask_show');
                    weuiActionsheet.on('transitionend', function () {
                        mask.css('display', 'none');
                    }).on('webkitTransitionEnd', function () {
                        mask.css('display', 'none');
                    })
                }
                return function () {
                    var mask = $('#mask');
                    var weuiActionsheet = $('#weui-actionsheet');
                    weuiActionsheet.addClass('weui-actionsheet_toggle');
                    mask.show().focus().addClass('actionsheet__mask_show').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                    $('#actionsheet_cancel').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                    weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');
                }
            })()
        },
        '#showAndroidActionSheet':{
            'click':function(){
                var $androidActionSheet = $('#weui-android-actionsheet');
                var $androidMask = $androidActionSheet.find('.weui-mask');
                $('#weui-android-actionsheet').fadeIn(200);
                $androidMask.one('click',function () {
                    $androidActionSheet.fadeOut(200);
                });
            }
        }
    };
    pages.searchbar.events = {
        '#search_input':{
            focus:function(){
                //searchBar
                var $weuiSearchBar = $('#search_bar');
                $weuiSearchBar.addClass('weui-search-bar_focusing');
            },
            blur:function(){
                var $weuiSearchBar = $('#search_bar');
                $weuiSearchBar.removeClass('weui-search-bar_focusing');
                if($(this).val()){
                    $('#search_text').hide();
                }else{
                    $('#search_text').show();
                }
            },
            input:function(){
                var $searchShow = $('#search_show');
                if($(this).val()){
                    $searchShow.show();
                }else{
                    $searchShow.hide();
                }
            }
        },
        '#search_cancel':{
            touchend:function(){
                $("#search_show").hide();
                $('#search_input').val('');
            }
        },
        '#search_clear':{
            touchend:function(){
                $("#search_show").hide();
                $('#search_input').val('');
            }
        }
    };

    for (var page in pages) {
        pageManager.push(pages[page]);
    }
    pageManager
        .setPageAppend(function($html){
            var $foot = $html.find('.page__ft');
            if($foot.length < 1) return;

            if($foot.position().top + $foot.height() < winH){
                $foot.addClass('j_bottom');
            }else{
                $foot.removeClass('j_bottom');
            }
        })
        .setDefault('home')
        .init();

    $.getJSON('https://weui.io/api/sign?url=' + encodeURIComponent(location.href.split('#')[0]), function (res) {
        wx.config({
            beta: true,
            debug: false,
            appId: res.appid,
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                // 'setNavigationBarColor',
                'setBounceBackground'
            ]
        });
        wx.ready(function () {
            /*
            wx.invoke('setNavigationBarColor', {
                color: '#F8F8F8'
            });
             */
            wx.invoke('setBounceBackground', {
                'backgroundColor': '#F8F8F8',
                'footerBounceColor' : '#F8F8F8'
            });

            wx.onMenuShareAppMessage({
                title: 'WeUI',
                desc: '为微信 Web 服务量身设计',
                link: location.href,
                imgUrl: 'https://mmbiz.qpic.cn/mmemoticon/ajNVdqHZLLA16apETUPXh9Q5GLpSic7lGuiaic0jqMt4UY8P4KHSBpEWgM7uMlbxxnVR7596b3NPjUfwg7cFbfCtA/0'
            });
            wx.onMenuShareTimeline({
                title: 'WeUI, 为微信 Web 服务量身设计',
                desc: 'WeUI, 为微信 Web 服务量身设计',
                link: "https://weui.io",
                imgUrl: 'https://mmbiz.qpic.cn/mmemoticon/ajNVdqHZLLA16apETUPXh9Q5GLpSic7lGuiaic0jqMt4UY8P4KHSBpEWgM7uMlbxxnVR7596b3NPjUfwg7cFbfCtA/0'
            });
            wx.onMenuShareQQ(option);
        });
    });

    // preload
    $(window).on("load", function(){
        var imgList = [
            "./images/layers/content.png",
            "./images/layers/navigation.png",
            "./images/layers/popout.png",
            "./images/layers/transparent.gif"
        ];
        for (var i = 0, len = imgList.length; i < len; ++i) {
            new Image().src = imgList[i];
        }
    });

    // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    // 相关 issue: https://github.com/weui/weui/issues/15
    // 解决方法:
    // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
    // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
    //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
});