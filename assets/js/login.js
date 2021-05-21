$(function () {
    // 1.切换登录和注册表单
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })


    // 4.判断数据 自定义表单校验
    var form = layui.form;
    form.verify({
        // 属性名就是规则名
        pwd: [
            /^[\S]{6,12}$/,
            '不对'
        ],
        repwd: function (value, item) {
            // value 使用此表单项规则的值
            // 使用此规则的表单元素的对象
            if (value !== $('#form_reg [name="password"]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 6.layui弹窗
    var layer = layui.layer;

    // 2.注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        // 3.收集表单数据
        var username = $('#form_reg [name="username"]').val().trim();
        var userpassword = $('#form_reg [name="password"]').val().trim();

        // 5.调用接口
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: username,
                password: userpassword
            },
            success(res) {
                if (res.status !== 0) {
                    // alert("注册失败")
                    layer.msg(res.message, { icon: 5 })
                }
                console.log(res);
                // alert('注册成功')
                layer.msg(res.message, { icon: 6 }, function () {
                    $('#link_login').click();
                })
            }
        })
    })


    // 7.登录功能
    $('#form_login').on('submit', function (e) {
        // 收集表单数据
        var data = $(this).serialize();
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: data,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                console.log(res);
                layer.msg(res.message, { icon: 6 });

                // 保存token 身份认证信息
                localStorage.setItem('token', res.token);

                // 链接跳转
                location.href = '/index.html'
            }
        })
    })
})