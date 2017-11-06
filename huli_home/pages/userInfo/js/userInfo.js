
var $Li = $('form div ul > li');

inputSlide($Li);

function inputSlide(obj) {
    obj.on({
        'click':function () {
            $(this).children('ul').slideDown(300)
        },
        'mouseleave':function () {
            $(this).children('ul').slideUp(300)
        }
    });
    obj.on('click','ul li',function (e) {
        e.stopPropagation();
        $(this).parent().siblings('p').text($(this).text());

        var yearText = parseInt($('.year-text').text());
        var monthText = parseInt($('.month-text').text());

        // console.log($('.month-text').text(),$('.year-text').text())
        $(this).closest('ul').slideUp(300);
        if(yearText%4 === 0){
            if (monthText === 4 || monthText === 6 || monthText === 9 || monthText === 11){
                creatMoth(31)
            }else {
                creatMoth(30)
            }
        }else {
            if (monthText === 4 || monthText === 6 || monthText === 9 || monthText === 11){
                creatMoth(31)
            }else {
                creatMoth(29)
            }
        }
        if(monthText === 1||monthText === 3||monthText === 5||monthText === 7||monthText === 8||monthText === 10||monthText === 12){
           creatMoth(32)
        }

    })

}

var regChain = /^[\u4e00-\u9fa5]{0,5}$/;
var regPhion = /^(13[09]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
var $username = regChain.test($('input[name="username"]').val())
var $number = regPhion.test($('input[name="number"]').val())
console.log($username,$number)

$('form[name="my-user-form"]').children().find('input').on({
    "focus":function () {
        $(this).addClass('showActive');
        $(this).keyup(function () {

        })
    },
    "blur":function () {
        console.log($username,$number);
        $(this).removeClass('showActive');

        // $(this).parent().children().last().remove()
        // alert(123)


    }
})
//动态生成生日列表
//年
var date = new Date();
var year = date.getFullYear();
var str = '';
for(var i = year; i > 1900; i--){
    str += "<li>"+i+"</li>"
}
$('.birth > ul > li:first-child').append(`<ul class="year">${str}</ul>`);

//日
/**
 * num:为天数
 * @param num
 */
function creatMoth(num) {
    var str = '';
    var obj = $('.birth > ul > li:last-child')
    obj.children().find('ul').remove();
        for (var i = 1; i < num; i++){
            str += "<li>"+i+"</li>"
        }

    obj.append(`<ul class="day">${str}</ul>`);

    //动态生成生日列表
//年
    var date = new Date();
    var year = date.getFullYear();
    var str = '';
    for(var i = year; i > 1900; i--){
        str += "<li>"+i+"</li>"
    }
    $('.birth > ul > li:first-child').append(`<ul class="year">${str}</ul>`);

}

//省市区三级联动
$.getJSON('json/region.json',function (datas) {
    // console.log(datas);
    var obj1 = $('.loction > ul > li:first-child');
    var obj2 = $('.loction > ul > li:nth-child(2)');
    var obj3 = $('.loction > ul > li:last-child');

    creatLoction(datas,obj1,obj2,obj3);

    function creatLoction(datas,obj1,obj2,obj3) {
        console.log(obj1);

        var str1 = '';
        var str2 = '';
        var str3 = '';


        // console.log(datas[3].city)
        for(var x in datas){
            // console.log(datas[x].city);
            str1 += "<li>"+datas[x].name +"</li>";
        }

        obj1.on('click','ul li',function () {
            var num = $(this).index();
            // console.log(num)
            for(var j in datas[num].city){
                str2 += "<li>"+datas[num].city[j].name +"</li>";
                // console.log(datas[num].city[j].name)
            }
            obj2.on('click','ul li',function (e) {
                e.stopPropagation()
                var num2 = $(this).index();
                // console.log(num)
                for(var k in datas[num].city[num2].area){
                    str3 += "<li>"+datas[num].city[num2].area[k] +"</li>";
                    // console.log(datas[num].city[num2].area[k])
                }
                obj3.append(`<ul>${str3}</ul>`);
            })
            obj2.append(`<ul>${str2}</ul>`);
        })

        obj1.append(`<ul>${str1}</ul>`);
    }

    window.onload = function () {
        obj1.find('ul li').trigger('click')
    }

});