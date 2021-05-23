$(function () {
    // 获取用户基本信息
    getUserInfo();
    var layer = layui.layer;


    // 退出登录功能
    $('#logout').on('click', function () {

        layer.confirm('确定?', { icon: 3, title: '提示' }, function (index) {
            // 清除token
            localStorage.removeItem('token')
            // 跳转到登录界面
            location.href = '/login.html'

            // 关闭层
            layer.close(index);
        }
        )
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        /*  headers: {
             Authorization: localStorage.getItem('token')
         }, */
        success(res) {
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 2 })
            }
            console.log(res);
            layer.msg(res.message, { icon: 1 })

            // 展示用户信息
            renderAvatar(res.data);
        },
        /*  complete(res) {
             // 请求失败和成功都会调用此回调函数
             console.log(res.responseJSON);
             if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                 localStorage.removeItem('token');
                 location.href = '/login.html';
             }
         } */
    })
}


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