// 设置ajax 预处理函数
$.ajaxPrefilter(function (opitons) {
    // 设置url
    opitons.url = 'http://api-breakingnews-web.itheima.net' + opitons.url;

    // 有权限的话要设置请求头
    if (opitons.url.indexOf('/my/') !== -1) {
        opitons.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    opitons.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})