$(function () {
    // 获取用户基本信息
    getUserInfo();
    var layer = layui.layer;
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            /*  headers: {
                 Authorization: localStorage.getItem('token')
             }, */
            success(res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                console.log(res);
                layer.msg(res.message, { icon: 1 })

                // 展示用户信息
                renderAvatar(res.data);

            }
        })


        function renderAvatar(user) {
            console.log(user);
            // 如果有昵称展示昵称 没有的话展示用户名
            var name = user.nickname || user.username
            $('#welcome').html('欢迎 ' + name)

            // 渲染我们的头像
            if (user.user_pic === null) {
                $('.layui-nav-img').hide();
                var first = name[0].toUpperCase();
                $('.text-avatar').html(first).show();

            } else {
                $('.layui-nav-img').prop('src', user.user_pic).show();
                $('.text-avatar').hide();
            }
        }
    }


})