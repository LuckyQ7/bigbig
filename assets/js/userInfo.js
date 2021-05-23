$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 自定义规则
    form.verify({
        nickname: [/^[\S]{1,6}$/, '1-6位不能包含空格']
    })
    // 获取用户基本信息
    getuserInfo();
    function getuserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                // 表单赋值
                form.val('formUserInfo', res.data);

            }
        })
    }

    // 重置功能
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        getuserInfo();
    })

    // 修改信息功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            data: data,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                console.log(res);
                // 调用父页面的方法
                window.parent.getUserInfo();
            }
        })
    })
})