/**页面加载完成后执行**/
$(function () {
    //实例化请求JSON数据函数
    let jsonData = new Structur();
    //实例化添加页面数据函数
    let onpage = new Structur();
    //实例化图片显示函数
    let htopo = new Structur();
    //初始化本地数据储存函数
    let text = new Structur();
    text.locko();
    let inx = new Structur()
    inx.inxs();
    let traversal = new Structure();
    //  数据欧请求方法调用  参数1 表示JSON地址  参数2 表示解析后的数据
    jsonData.requestdata("js/product.json",function (data) {
        //调用数据加载方法， 参数  解析后的相对的数据
        onpage.page(data.product);
        //调用图片显示方法
        console.log(data)
        htopo.switch(data.product);
        traversal.traversalmenu(data.productSort);
    })
});

/*****************************************
 * 定义构造函数实例化后执行相关功能
 * ***************************************/
function Structur() {
    /**
     * JSON数据请求方法
     * @param rul 数据地址
     * @param Callback 回调函数
     */
    this.requestdata = function request(rul, Callback) {
//    穿件对象
        let xhr = new XMLHttpRequest();
//    创建请求
        xhr.open("GET", rul, true);
//    发送请求
        xhr.send();
//     对请求到的数据进行处理
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //    接受请求到的字符串
                    let jsonData = xhr.responseText;
                    //    对数据进行解析
                    let jsonString = JSON.parse(jsonData);
                    //判断回掉函数是否存在
                    if (Callback) {
                        //将数据返回出去用于后续操作
                        Callback(jsonString)
                    }
                }
            }
        }
    };
    /**
     * 加载数据方法
     */
    this.page = function (data) {
        console.log(data[0]);
        //    获取当前页面图片数组的长度、
        let dataLenght = data[0].detailBigImg.length;
        //    定义字符串接受当前值用于优化操作
        let arry = "";
        //添加图片
        for(var i = 0;i < dataLenght; i++){
            arry += `<div><img src =img/${data[0].detailBigImg[i]}></div>`
        }
        $(".topSubjec").append(arry);
        let sub = $(".subjectRight");
        //添加数据
        /*修改类名*/
        sub.prepend(`<div class="subjectRight_3"><span>库存数量:</span><span class="badt">${data[0].repertory}</span></div>`);
        sub.prepend(`<div class="subjectRight_3"><dpan>积分：</dpan><spa>6.8</spa><a href="#">了解积分规则</a></div>`);
        sub.prepend(`<div class="subjectRight_3"><span>原始购买价格：</span><span class="fast">${data[0].beforePrice}</span><span>元</span></div>`);
        sub.prepend(`<div class="subjectRight_2"><span class="font_1">￥</span><span class="font_3">${data[0].price}</span><span class="font_2">元</span><span class="font_1">￥</span><span class="font_3 fong_4">${data[0].newPrice}</span><span class="font_2">元</span></div>`);
        sub.prepend(`<div class="subjectRight_1"><span>${data[0].specification}</span><span></span>
           <span>${data[0].integral}</span></div>`);
        sub.prepend(`<h1>${data[0].title}</h1>`);
        //    添加商品规格；
        $(".subj_1").append(`<div><span>尺寸：</span><span>${data[0].size}</span></div>`);
        $(".subj_1").append(`<div><span>材料：</span><span>${data[0].texture}</span></div>`);
        $(".subj_1").append(`<div><span>颜色：</span><span>${data[0].color}</span></div>`);
        // //    加载商品数据
        $(".bann_1").append(`<img src =img/${data[0].detailBigImg[4]}>`);
        $(".marny1").append(`${data[0].beforePrice}`);
        $(".marny_1").append(`${data[0].price}`)
    };
    /**
     * 图片切换
     */
    this.switch = function (data) {
        //显示默认图片
        $(".bigth").append(`<img src =img/${data[0].detailBigImg[0]}>`) ;
        //绑定每一项图片的点击事件
        $(".topSubjec ").children("div").on("click",function () {
            let inx = $(this).index();
            $(".topSubjec ").children("div").removeClass("bor");
            $(".topSubjec ").children("div").eq(inx).addClass("bor");
            //数据青龙造作
            $(".bigth img").remove();
            //图片显示
            $(".bigth").append(`<img src =img/${data[0].detailBigImg[inx]}>`) .fadeIn(2000);
        })
    };
    /*数据修改*/
    //本地储存
    this.locko = function () {
        //    绑定点击事件
        let arry = [];
        let obj = {};
        $(".button_2").on("click",function () {
            let text_1 = $(".subjectRight").children("h1").text(),
                text_2 = $(".fast").text(),
                text_3 = $("img").attr("src"),
                text_4 = $(".badt").text();
            let time = new Date();
            arry[0] = text_1;
            arry[1] = text_2;
            arry[2] = text_3;
            arry[3] = text_4;
            arry[4] = time;
            obj.str = arry;
            let jsonDa = JSON.stringify(obj);
            localStorage.setItem("jsonData",jsonDa)
        })
    };
//    点击库存量函数
    this.inxs = function () {
        //记录点击次数记录库存量
        let conter = 0;
        //显示默认值
        $(".subjec_1 input").val(conter);
        $(".bust_1").on("click",function () {
            if (conter >= 5){
                return
            }
            conter ++;
            $(".subjec_1 input").val(conter);

        });
        $(".bust_2").on("click",function () {
            if (conter === 0){
                return
            }
            conter --;
            $(".subjec_1 input").val(conter);
        });
    }}
