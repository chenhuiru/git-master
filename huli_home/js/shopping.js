


/**
 * 请求json数据
 * @param url  json地址
 * @param success 请求成功回调
 * @param fail   请求失败回调
 */
function getJsonOne(url, success, fail) {
    //1.创建请求
    var request = new XMLHttpRequest();
    //2.配置请求
    request.open('GET', url, true);
    //3.发送请求
    request.send(null);
    //4.监听状态
    request.onreadystatechange = function () {
        //判断是否请求成功
        if (request.readyState == 4 && request.status == 200) {
            //请求成功
            // console.log(request.responseText);
            var obj = JSON.parse(request.responseText);
            if (success) {
                success(obj);
            }
        } else {
            //请求失败
            if (fail) {
                fail(request.status);
            }
        }
    }
}

// 推荐商品
getJsonOne("js/shopping.json",function (datas) {
    for (var i=0;i<datas.recommend[0].img.length;i++){
        var boxTow=document.querySelector(".box-tow");
        var div=document.createElement("div");
        div.classList.add("list-div");
        boxTow.appendChild(div);

        var listDiv=document.querySelectorAll(".list-div")[i];
        var img=document.createElement("img");
        img.setAttribute("src","img/" + datas.recommend[0].img[i]);
        listDiv.appendChild(img);



        var listDiv=document.querySelectorAll(".list-div")[i];
        var span=document.createElement("span");
        span.textContent=datas.recommend[0].name[i];
        listDiv.appendChild(span);


        var listDiv=document.querySelectorAll(".list-div")[i];
        var span=document.createElement("b");
        span.textContent=datas.recommend[0].price[i];
        listDiv.appendChild(span);


    }

});





$(function () {
    $(".ckb-all").click(function() {
        // 调用函数“全选按钮功能”
        ckdAllInput(this);

    });
    $("#dataTable tbody tr input:checkbox").click(function() {
        // 调用函数“数据行选择功能”
        dataTrCkd(this);
    });
    $(".delect").click(function () {
        // 删除数据
        delect(this);
    });
    $(".one button").click(function () {
        // 结算
        if(!(parseInt($(".one .change").val())==0)&&!(parseInt($(".one .change").val())==7)){
            countOne();
            cont();

        }

    });
    $(".two button").click(function () {
        // 结算
        if(!(parseInt($(".two .change").val())==0)&&!(parseInt($(".two .change").val())==5)){
            countTwo();
            cont();

        }

    })
})
// 全选
function ckdAllInput(ident) {
    var ckd=$(ident).prop("checked"),
        bodyCkd=$("#dataTable tbody input:checkbox");

    var skd2=$(ident).prop("checked");
    if(ckd&&skd2) {
        bodyCkd.prop("checked", true);
        cont();
    }
    else {
        bodyCkd.prop("checked", false);
    }

}
// 单选（还不得行）
function dataTrCkd(ident) {
    var ckbAll=$("thead .ckb-all input:checkbox");
    var tr=$("#dataTable tbody").children();
    var tr_len=tr.length;
    var ckdCount=0;
    for(var i = 0; i < tr_len; i++) {
        if((tr.eq(i).find("#dataTable tbody input:checkbox").prop("checked")) == true) {
            ckdCount++;
        }
    }
    if(ckdCount == 0) {
        // 取消全选复选框的选中效果
        ckbAll.prop("checked", false);
    }
    // 全部都选中
    else {
        // 取消半选状态
        ckbAll[0].indeterminate = false;
        // 将全选复选框设置为选中状态
        ckbAll.prop("checked", true);
    }
}



// 加减
$(function() {
    // 实例化公共功能对象
    var main = new Main();
    // 商品数量选择
    main.countor(".one",7);
    main.countor(".two",5);
});
function Main() {
    // 存储this指向
    var thisFn = this;
    /**
     * 功能：弹出框
     **/
    this.popupBox = function(text) {
        // 弹出框核心功能（用alert临时替代）
        alert(text);
    }
    /**
     * 功能：数量选择操作
     * 参数：
     * 1、当前数量选择器的CSS选择器（String）
     * 2、库存量（Number）
     **/
    this.countor = function(container, stock) {
        // 当前容器内的计数器文本框
        var $showCount = $(container).children("input");

        // 减少1
        $(container).children(".reduce").on("click", function() {
            var thisVal = parseInt($showCount.val());
            if(--thisVal >= 0) {
                // 重设为文本框的值
                $showCount.val(thisVal);
            }
            else {
                // 禁用该按钮
                $(this).addClass("disabled").prop("disabled",true);
                // 调用主构造函数下的弹出框方法
                thisFn.popupBox("不能再少了");
                return;
            }

            // 根据条件启动“增加”按钮
            enabled.call(this);
        });
        // 增加1
        $(container).children(".plus").on("click", function() {
            var thisVal = parseInt($showCount.val());
            if(++thisVal <= stock) {
                // 重设为文本框的值
                $showCount.val(thisVal);
            }
            else {
                // 禁用该按钮
                $(this).addClass("disabled").prop("disabled",true);
                // 调用主构造函数下的弹出框方法
                thisFn.popupBox("商品已经没有更多的库存");
                return;
            }

            // 根据条件启动“减少”按钮
            enabled.call(this);
        });

        /* 增加和减少按钮的禁用状态解除 */
        function enabled() {
            // 如果库存量不为零的时候
            if(stock !== 0) {
                $(this).siblings(".plus, .reduce").removeClass("disabled").prop("disabled",false);
            } else {
                return;
            }
        }
    }
}

// 删除
function delect(ident) {
    ident.closest(".a").remove();
}
// 结算
function cont() {
    //总的数量
    var he=parseInt($(".one .change").val())+1+parseInt($(".two .change").val());
    $(".cont").text(he);
    //总的钱数
    var nitPveOne=parseInt($(".nitPriceOne").text().slice(1));
    var nitPveTwo=parseInt($(".nitPriceTwo").text().slice(1));
    var numOne=parseInt($(".one .change").val())+1;
    var numTwo=parseInt($(".two .change").val());
    var hePrice=(nitPveOne * numOne)+(nitPveTwo * numTwo);
    $(".price").text("￥"+hePrice);

}
//单个金额
function countOne() {
    var nitPveOne=parseInt($(".nitPriceOne").text().slice(1));
    var numOne=parseInt($(".one .change").val())+1;
    var one=nitPveOne*numOne;
    $(".amouantOne").text("￥"+one);
}
//单个金额
function countTwo() {
    var nitPveTwo=parseInt($(".nitPriceTwo").text().slice(1));
    var numTwo=parseInt($(".two .change").val())+1;
    var two=nitPveTwo * numTwo;
    $(".amouantTow").text("￥"+two);
}












