//构造函数
function Router() {
    var routes = {};
    var currentUrl = '';
    //获取到页面所有的has值，以{path:"fn"}
    this.route = function (path, callback) {
        //给不同的hash设置不同的回调函数
        routes[path] = callback || function () {};
            // console.log(routes[path])
    };
    //hash值刷新
    this.refresh = function () {
        //如果存在hash值则获取到，否则设置hash值为/
        currentUrl = location.hash.slice(1) || '/';
        // console.log(routes);
        // console.log(currentUrl);
        // console.log(routes[currentUrl]);
        //根据当前的hash值来调用相对应的回调函数
        routes[currentUrl]();
    };

    //事件监听
    this.init = function () {
        window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    }


}

var router = new Router();
var obj = $('.userInfo-content');

router.init();

function getUrl(url,obj) {
    $.ajax({
        type: "post",
        dataType: "html",
        url: url.html,
        success: function (data) {
            if (data != "") {
                obj.html(data).siblings('tep').remove()
            }
        }
    });
}

router.route('/', function() {

     getUrl({html:"pages/userInfo/pages/userInfo.html"},obj);
});
router.route('/oeder', function() {
    getUrl({
        html:"pages/userInfo/pages/oeder.html"},obj);
});
router.route('/mySell', function() {
    getUrl({
        html:"pages/userInfo/pages/mySell.html"},obj);

});
router.route('/account', function() {
    getUrl({
        html:"pages/userInfo/pages/account.html"},obj);

});
router.route('/systemMessage', function() {
    getUrl({
        html:"pages/userInfo/pages/systemMessage.html"},obj);
});

//个人中心导航点击事件添加
$('.userInfo-nav ul li').on('click',function () {

    $(this).children('a').addClass('activeUserNav');
    $(this).siblings().children().removeClass('activeUserNav')

});

//公共弹窗
$('body').on('click','.popup button',function () {

    $(this).parent('.popup').remove()

})
