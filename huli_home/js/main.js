/**页面加载完成后执行**/
$(function () {
    //实例化请求JSON数据函数
    let jsonData = new Structure();
    //实例化导航菜单函数
    let traversal = new Structure();
    //初始化多选菜单函数
    let ohoice = new Structure();
    //实例化头部函数
    let hed = new Structure();
    //调用生成网页尾部方法
    hed.foot();
    /****JSON数据请求方法调用   参数1：JSON路径  参数2：亲贵成功的回调函数 ****/
    jsonData.requestdata("js/product.json",function (data) {
        console.log(data)
        //调用头部方法
        hed.heaser();
        //    调用多选菜单方法
        ohoice.hoice();
        /***遍历导航菜单方法调用  参数：请求成功的JSON数据*8*/
        traversal.traversalmenu(data.productSort);
        console.log(data.productSort)
    });
});

/*****************************************
 * 定义构造函数实例化后执行相关功能
 * ***************************************/
function Structure() {
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

    /***
     * 导航菜单遍历方法
     * 参数：导航菜单数据
     */
    this.traversalmenu = function (traversaldata) {
        //接收相对应的数组的床都
        let arryLenght = "";
        //  绑定菜单点击事件
        $(".around").on("click","li",function () {
                //获取当前的索引值，通过索引值遍历相应的数据
                let idx = $(this).index();
                switch (idx){
                    case 0:
                        arryLenght = traversaldata.sofa.length;
                        /***遍历函数调用  参数1表示点击后要遍历的数组  参数2表示点击当前元素的索引值**/
                        ergodic(traversaldata.sofa,arryLenght,idx);
                        return;
                    case 1:
                        arryLenght = traversaldata.tablesChairs.length;
                        ergodic(traversaldata.tablesChairs,arryLenght,idx);
                        return;
                    case 2:
                        arryLenght = traversaldata.beds.length;
                        ergodic(traversaldata.beds,arryLenght,idx);
                        return;
                    case 3:
                        arryLenght = traversaldata.storage.length;
                        ergodic(traversaldata.storage,arryLenght,idx);
                        return;
                    case 4:
                        arryLenght = traversaldata.more.length;
                        ergodic(traversaldata.more,arryLenght,idx);
                        return;
                    default:
                        return
                }
            },
        );
        /***
         * @param data 表示点击后获得与之对应的数组
         * @param arryLenght 点击当前元素的索引值
         * */
        function ergodic(data,arryLenght,ide){
            //清空上次操作的数据
            $(".around").children("li").children("div").remove();
            //添加二级菜单盒子
            $(".around").children("li").eq(ide).append("<div class='second_2'></div>");

            //定义空字符串接收遍历的数据，优化操作
            let text = "";

            for ( i = 0; i < arryLenght;i++){
                text += `<a>${data[i]}</a>`
            }
            //在页面添加数
            /*修改*/
            $(".around").children("li").children("div").append(text).slideDown(800);
            $(".navBox>ul").on("mouseleave",function () {
                $(".second_2").slideUp(800);
            })


        }
    };



    /***
     * 功能；多选菜单方法
     */
    this.hoice = function () {
            //显示默认文本
            $(".selectMenu").prepend(`<span>成都地区</span>`);
            //点击显示下拉选项
            $(".selectMenu").on("click",function () {
                $(".selectMenu>ul").slideDown();
                $(".selectMenu>ul>li").on("click").on("click",function () {
                    //获取当前文本
                    let text = $(this).text();
                    //清空原始数据
                    $(".selectMenu span").text("");
                    //添加当前数据
                    $(".selectMenu>span").append(text);
                    $(".selectMenu>ul").slideUp();
                    //阻止事件冒泡
                    return false;
                })
            })
        };
    /**
     * 功能：生成网页头部
     */
    this.heaser = function () {
            let text = `    <div class="topBox">
        <!--版心盒子-->
        <div class="centerBox horizontal">
            <a href="#" class="contUS_mark"></a>
            <div class="logoBox">
                <a href="#/" class="logo"></a>
                <div class="selectMenu horizontal">
                    <p></p>
                    <ul>
                        <li>成都地区</li>
                        <li>北京地区</li>
                        <li>上海地区</li>
                        <li>深圳地区</li>
                        <li>其他地区</li>
                    </ul>
                </div>
            </div>
            <div class="loginOrShop horizontal">
                <a href="#" class="Land"></a>
                <span class="gapLine_0">|</span>
                <a href="#" class="cartIcon"></a>
            </div>
        </div>
        <!--菜单栏-->
        <div class="banner">
            <!--菜单盒子-->
            <div class="navBox">
                <ul class="around">
                    <li>
                        <a href="#/shafa">沙发&nbsp;&nbsp;&nbsp;SOFAS</a>
                        <!--<ul class="second_2">-->
                            <!--<li><a href="#">沙发椅</a></li>-->
                            <!--<li><a href="#">沙发而</a></li>-->
                            <!--<li><a href="#">沙发三</a></li>-->
                            <!--<li><a href="#">山发丝</a></li>-->
                        <!--</ul>-->
                    </li>
                    <li>
                        <a href="#/dask">桌椅&nbsp;&nbsp;&nbsp;TABLES/CHAIRS</a>
                        <!--<ul class="second_2">-->
                            <!--<li><a href="#">沙发椅</a></li>-->
                            <!--<li><a href="#">沙发而</a></li>-->
                            <!--<li><a href="#">沙发三</a></li>-->
                            <!--<li><a href="#">山发丝</a></li>-->
                        <!--</ul>-->
                    </li>
                    <li>
                        <a href="#/bad">床&nbsp;&nbsp;&nbsp;BEDS</a>
                        <!--<ul class="second_2">-->
                            <!--<li><a href="#">沙发椅</a></li>-->
                            <!--<li><a href="#">沙发而</a></li>-->
                            <!--<li><a href="#">沙发三</a></li>-->
                            <!--<li><a href="#">山发丝</a></li>-->
                        <!--</ul>-->
                    </li>
                    <li>
                        <a href="#/storage">柜&nbsp;&nbsp;&nbsp;STORAGE</a>
                        <!--<ul class="second_2">-->
                            <!--<li><a href="#">沙发椅</a></li>-->
                            <!--<li><a href="#">沙发而</a></li>-->
                            <!--<li><a href="#">沙发三</a></li>-->
                            <!--<li><a href="#">山发丝</a></li>-->
                        <!--</ul>-->
                    </li>
                    <li>
                        <a href="#/more">更多&nbsp;&nbsp;&nbsp;MORE</a>
                        <!--<ul class="second_2">-->
                            <!--<li><a href="#">沙发椅</a></li>-->
                            <!--<li><a href="#">沙发而</a></li>-->
                            <!--<li><a href="#">沙发三</a></li>-->
                            <!--<li><a href="#">山发丝</a></li>-->
                        <!--</ul>-->
                    </li>
                </ul>
                <div class="nav_search horizontal">
                    <input type="text" class="search" value="搜索">
                    <span></span>
                </div>
            </div>
        </div>
    </div>`;
            $("header").html(text)
        };
    /**
     * 功能：生成网页底部
     */
    this.foot = function () {
            let text = `  <!--尾部-->
    <div class="bottonBox">
        <div class="pageBanner">
            <div class="pagBox">生活要过得朴素而有味道，但不用过得奢华。</div>
        </div>
        <div class="thotoBox horizontal">
            <div>
                <span>环保</span>
                <div>无甲醛 大自然</div>
            </div>
            <div>
                <span>低价</span>
                <div>低于购买价6折</div>
            </div>
            <div>
                <span>安全</span>
                <div>专业清洁消毒处理</div>
            </div>
            <div>
                <span>省心</span>
                <div>专业物流配送安装</div>
            </div>
            <div>
                <span>快捷</span>
                <div>24小时内送货</div>
            </div>
        </div>
        <div class="informationBox horizontal">
            <div class="smallboxs">
                <h2>关于我们</h2>
                <div>
                    <a href="#">关于户里</a>
                    <a href="#">注册协议</a>
                </div>
                <div>
                    <a href="#">业务合作</a>
                    <a href="#">免责声明</a>
                </div>
                <div>
                    <a href="#">加入户里</a>
                    <a href="#">隐私保护</a>
                </div>
            </div>
            <div class="smallboxs">
                <h2>流程指南</h2>
                <div>
                    <a href="#">购买家具</a>
                    <a href="#">出售家具</a>
                </div>
                <div>
                    <a href="#">支付方式</a>
                    <a href="#">配送安装</a>
                </div>
                <div>
                    <a href="#">售后保障</a>
                </div>
            </div>
            <div class="smallboxs">
                <h2>会员中心</h2>
                <div>
                    <a href="#">会员计划</a>
                </div>
                <div>
                    <a href="#">积分规则</a>
                </div>
                <div>
                    <a href="#">投诉建议</a>
                </div>
            </div>
            <div class="contact">
                <h2>联系客服</h2>
                <div>电话:</div>
                <div>028-67635062</div>
                <div>邮箱:</div>
                <div>hello@hulihome.com</div>
            </div>
            <div class="information ">
                <span class="smallicons sign_2"></span>
                <span> 新浪微博@户里网</span>
                <div class="bigicons wechat"></div>
            </div>
            <div class="information">
                <span class="smallicons sign_1"></span>
                <span> 关注微信“户里网”</span>
                <div class="bigicons weChat"></div>
            </div>
        </div>
        <div class="text">蜀ICP备15028224号  成都户里科技有限公司</div>
    </div>`;
            $("footer").html(text)
        }

}

/******************************************************************
 * 熊磊：新增2017-11-02
 */
skip()
function skip() {

    $(document).on('click','.cartIcon',function () {
        location.href = 'shopping.html'
    });

    $(document).on('click','.Land',function () {
        location.href = 'register.html'
    });
}



var str1 = location.href.includes('#/');
var str2 = location.href.includes('index.html');
$("header").on('click','.navBox .around li a',function () {

    var str = $(this).attr('href');
    var arr = [];
    $(this).next('.second_2 a').each(function () {
        alert($(this).val())
    })
    if (!str1 && !str2){
        location.href = 'index.html';
        location.href = 'index.html'+ str
    }
});



/******************************************************************
 * 结束
 */
