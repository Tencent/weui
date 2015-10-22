/**
 * Created by jfengjiang on 2015/9/11.
 */

$(function () {
    // page stack
    var stack = [];
    var $container = $('.js_container');
    $container.on('click', '.js_cell[data-id]', function () {
        var id = $(this).data('id');
        var index = $(this).data('index');
        go(id,index);
    });

    // location.hash = '#hash1' 和点击后退都会触发`hashchange`，这个demo页面只关心后退
    $(window).on('hashchange', function (e) {
        if (/#.+/gi.test(e.newURL)) {
            return;
        }
        var $top = stack.pop();
        if (!$top) {
            return;
        }
        $top.addClass('slideOut').on('animationend', function () {
            $top.remove();
        }).on('webkitAnimationEnd', function () {
            $top.remove();
        });
    });

    function go(id,index){
        var $tpl = $($('#tpl_' + id).html()).addClass('slideIn').addClass(id);
        $container.append($tpl);
        stack.push($tpl);
        // why not use `history.pushState`, https://github.com/weui/weui/issues/26
        //history.pushState({id: id}, '', '#' + id);
        location.hash = '#' + id;

        //加载数据
        if(typeof eval('load_'+id) != 'undefined' && eval('load_'+id) instanceof Function) {            
            if(index!= 'undefined'){
                eval('load_'+id+'("'+index+'");');
            }else{
                eval('load_'+id+'();');
            }
        }

        $($tpl).on('webkitAnimationEnd', function (){
            $(this).removeClass('slideIn');
        }).on('animationend', function (){
            $(this).removeClass('slideIn');
        });
        // tooltips
        if (id == 'cell') {
            $('.js_tooltips').show();
            setTimeout(function (){
                $('.js_tooltips').hide();
            }, 3000);
        }
    }

    if (/#.*/gi.test(location.href)) {
        go(location.hash.slice(1));
    }

});

//加载提示
function show_toast(content){
    $('#toast .weui_toast_content').text(content);
    $('#toast').show();
    setTimeout(function () {
        $('#toast').hide();
    }, 800);
}

//加载对话框
function show_dialog(title,content){
    $('#dialog .weui_dialog_title').text(title);
    $('#dialog .weui_dialog_bd').text(content);

    $('#dialog').show();
    $('#dialog').find('.weui_btn_dialog').on('click', function () {
        $('#dialog').hide();
    });
}