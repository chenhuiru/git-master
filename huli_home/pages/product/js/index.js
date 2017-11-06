


//轮播
var curIndex = 0;
var len = $('.bannerssBox img').length;
setInterval(function () {

    if (curIndex < len - 1) {
        curIndex++;
    } else {
        curIndex = 0;
    }
    //调用变换处理函数
    $('.box ul li').eq(curIndex).addClass('activeHover').siblings().removeClass('activeHover')
    changeTo(curIndex);
},5000);
$('.box').on('click','ul li',function () {
    var num = $(this).index();
    console.log(num)
    changeTo(num,function () {
    })
})
function changeTo(num){
    $('.bannerssBox').find('img.zIndex').removeAttr('class');

    $('.bannerssBox').find('img').eq(num).addClass('zIndex');
}

//商品图片事件监听
$(document).on('click','.content-main > div > div',function () {

    location.href = 'main.html'

});