$(function () {
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        layui.form.verify({
            pwd: [/^[\S]{6,12}$/, '6-12位不包含空格'],
            samepwd: function (value, item) {
                if (value === $('[name=oldPwd]').val()) {
                    return '不能与原密码相同'
                }
            },
            repwd: function (value, item) {
                if (value !== $('[name=rePwd]')) {
                    return '密码不一致'
                }
            }
        })
        var userpwd = $('[name="oldPwd"]').val().trim();
        var pwd = $('[name="newPwd"]').val().trim();
        console.log(userpwd, pwd);
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: {
                oldPwd: userpwd,
                newPwd: pwd
            },
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                console.log(res);
            }

        })

    })
})