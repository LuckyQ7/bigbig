// 设置ajax 预处理函数
$.ajaxPrefilter(function (opitons) {
    opitons.url = 'http://api-breakingnews-web.itheima.net' + opitons.url;
})