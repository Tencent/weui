$(function () {

    var router = new Router({
        container: '#container',
        enterTimeout: 300,
        leaveTimeout: 300
    });


    // grid
    var home = {
        url: '/',
        className: 'home',
        render: function () {
            return $('#tpl_home').html();
        }
    };

    // button
    var button = {
        url: '/button',
        className: 'button',
        render: function () {
            return $('#tpl_button').html();
        }
    };

    // cell
    var cell = {
        url: '/cell',
        className: 'cell',
        render: function () {
            return $('#tpl_cell').html();
        }
    };

    // toast
    var toast = {
        url: '/toast',
        className: 'toast',
        render: function () {
            return $('#tpl_toast').html();
        },
        bind: function () {
            $('#container').on('click', '#showToast', function () {
                $('#toast').show();
                setTimeout(function () {
                    $('#toast').hide();
                }, 2000);
            }).on('click', '#showLoadingToast', function () {
                $('#loadingToast').show();
                setTimeout(function () {
                    $('#loadingToast').hide();
                }, 2000);
            });
        }
    };

    // dialog
    var dialog = {
        url: '/dialog',
        className: 'dialog',
        render: function () {
            return $('#tpl_dialog').html();
        },
        bind: function () {
            $('#container').on('click', '#showDialog1', function () {
                $('#dialog1').show().on('click', '.weui_btn_dialog', function () {
                    $('#dialog1').off('click').hide();
                });
            }).on('click', '#showDialog2', function () {
                $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                    $('#dialog2').off('click').hide();
                });
            });

        }
    };

    // progress
    var progress = {
        url: '/progress',
        className: 'progress',
        render: function () {
            return $('#tpl_progress').html();
        },
        bind: function () {
            $('#container').on('click', '#btnStartProgress', function () {
                if ($(this).hasClass('weui_btn_disabled')) {
                    return;
                }

                $(this).addClass('weui_btn_disabled');

                var progress = 0;
                var $progress = $('.js_progress');

                function next() {
                    $progress.css({width: progress + '%'});
                    progress = ++progress % 100;
                    setTimeout(next, 30);
                }

                next();
            });
        }
    };

    // msg
    var msg = {
        url: '/msg',
        className: 'msg',
        render: function () {
            return $('#tpl_msg').html();
        }
    };

    // article
    var article = {
        url: '/article',
        className: 'article',
        render: function () {
            return $('#tpl_article').html();
        }
    };

    // actionsheet
    var actionsheet = {
        url: '/actionsheet',
        className: 'actionsheet',
        render: function () {
            return $('#tpl_actionsheet').html();
        },
        bind: function () {
            $('#container').on('click', '#showActionSheet', function () {
                var mask = $('#mask');
                var weuiActionsheet = $('#weui_actionsheet');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show().addClass('weui_fade_toggle').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                });
                $('#actionsheet_cancel').one('click', function () {
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
            });
        }
    };

    // icons
    var icons = {
        url: '/icons',
        className: 'icons',
        render: function () {
            return $('#tpl_icons').html();
        }
    };

    // panel
    var panel = {
        url: '/panel',
        className: 'panel',
        render: function () {
            return $('#tpl_panel').html();
        }
    };

    // tab
    var tab = {
        url: '/tab',
        className: 'tab',
        render: function () {
            return $('#tpl_tab').html();
        }
    };

    // navbar
    var navbar = {
        url: '/navbar',
        className: 'navbar',
        render: function () {
            return $('#tpl_navbar').html();
        }
    };

    // tabbar
    var tabbar = {
        url: '/tabbar',
        className: 'tabbar',
        render: function () {
            return $('#tpl_tabbar').html();
        }
    };

    // searchbar
    var searchbar = {
        url: '/searchbar',
        className: 'searchbar',
        render: function () {
            return $('#tpl_searchbar').html();
        },
        bind: function () {
            $('#container').on('focus', '#search_input', function () {
                var $weuiSearchBar = $('#search_bar');
                $weuiSearchBar.addClass('weui_search_focusing');
            }).on('blur', '#search_input', function () {
                var $weuiSearchBar = $('#search_bar');
                $weuiSearchBar.removeClass('weui_search_focusing');
                if ($(this).val()) {
                    $('#search_text').hide();
                } else {
                    $('#search_text').show();
                }
            }).on('input', '#search_input', function () {
                var $searchShow = $("#search_show");
                if ($(this).val()) {
                    $searchShow.show();
                } else {
                    $searchShow.hide();
                }
            }).on('touchend', '#search_cancel', function () {
                $("#search_show").hide();
                $('#search_input').val('');
            }).on('touchend', '#search_clear', function () {
                $("#search_show").hide();
                $('#search_input').val('');
            });
        }
    };

    router.push(home)
        .push(button)
        .push(cell)
        .push(toast)
        .push(dialog)
        .push(progress)
        .push(msg)
        .push(article)
        .push(actionsheet)
        .push(icons)
        .push(panel)
        .push(tab)
        .push(navbar)
        .push(tabbar)
        .push(searchbar)
        .setDefault('/')
        .init();
});