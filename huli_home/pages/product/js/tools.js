
/**
 * 获取非行间样式
 * @param obj    元素节点
 * @param attr  要获取的样式属性
 * @returns {*} 字符串
 */
//获取元素样式
function getStyle(obj,attr) {
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
/**
 * 
 * @param min
 * @param max
 * @returns {*}
 */
function randomDecimals(min, max) {

    Math.randomDecimals = function(min, max) {
        if (!min || !max || isNaN(min) || isNaN(max)) {
            return -1;
        }else {
            return Math.random() * (max - min) + min;
        }
    };
}

/**
 * 获取区间整数随机数字
 * @param min    最小值
 * @param max    最大值
 * @param length 长度
 * @returns {*}  返回一个数组
 */
Math.randomInteger = function (min, max) {
    if (!min || !max || isNaN(min) || isNaN(max)) {
        return -1;
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

function getNums(length, min, max) {
    var nums = [],
        i = 0,
        num = 0;
    for (; i < length; i++) {
        num = Math.randomInteger(min, max);
        nums.push(num);
    }
    return nums;
}
/**
 * 随机字数和字母
 * @param length      需要字符的长度
 * @returns {string}  返回字符串
 */
function random_char(length) {
    var bStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    bStr += 'abcdefghijklmnopqrstuvwxyz';
    bStr += '0123456789';
    var rStr = '';
    for (var i = 0; i < length; i++) {
        var idx = Math.floor(Math.random() * bStr.length);
        rStr += bStr.substring(idx, idx + 1);
    }
    return rStr;
}

/**
 * 淡入淡出效果-封装
 * @param element   执行元素(要隐藏显示的元素)
 * @param target    目标值(透明的目标值,淡出目标为0,淡入目标为100,实际是透明0-1,被函数处理成0-100了)
 * @param duration  持续时间(单位毫秒,淡入淡出的持续时间)
 * @param completed 回调函数
 */
function fade(element, target, duration, completed) {
    // Exception handling
    if (!element || target == undefined) {
        throw 'Error：Parameter is not complete in function \'changeOpacity\'.';
    }
    // Set the default value
    duration = duration ? duration : 1000;
    // Gets the current opacity
    var curOpa = getCurrentOpacity();
    // Calculating offset
    var offset = target - curOpa;
    // Set the interval
    var interval = 30;
    // Calculating speed
    var speed = offset > 0 ? Math.ceil(offset / (duration / interval)) : Math.floor(offset / (duration / interval));
    // Execute transition animations
    var t = setInterval(function () {
        // Update the current opacity
        curOpa = getCurrentOpacity();
        // Determine whether to reach the target
        if ((offset > 0 && curOpa < target) || (offset < 0 && curOpa > target)) {
            // Frame by frame change
            element.style.opacity = (curOpa + speed) / 100
        } else { // Has completed the transition animation
            element.style.opacity = target / 100;
            clearInterval(t);
            // Invoke the callback function
            if (completed) {
                completed();
            }
        }
    }, interval);

    function getCurrentOpacity() {
        var curOpa = 0;
        // Compatible with IE browser
        if (element.currentStyle) {
            curOpa = element.currentStyle['opacity'] * 100;
        } else {
            curOpa = getComputedStyle(element, false)['opacity'] * 100;
        }
        return curOpa;
    }
}

/**
 * 请求json数据
 * @param url  json地址
 * @param success 请求成功回调
 * @param fail   请求失败回调
 */
function getJson(url, success, fail) {
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
                success(obj)
            }
        } else {
            //请求失败
            if (fail) {
                fail(request.status);
            }
        }
    }
}
/**
 * 缓慢回到顶部代码
 * @param btn  只需传一个按钮
 */
function scrollTopEffect(btn) {
    var timer = null;
    var isTop = true;
    //获取页面可视区高度
    var clientHeight = document.documentElement.clientHeight;

    //滚动条滚动时触发
    window.onscroll = function () {
        //显示回到顶部按钮
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop >= clientHeight) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
        //回到顶部过程中用户滚动滚动条，停止定时器
        if (!isTop) {
            clearInterval(timer);
        };
        isTop = false;

    };

    btn.onclick = function () {
        //设置定时器
        timer = setInterval(function () {
            //获取滚动条距离顶部高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            var isPeed = Math.floor(-osTop / 7);

            document.documentElement.scrollTop = document.body.scrollTop = osTop + isPeed;
            //到达顶部，清除定时器
            if (osTop == 0) {
                clearInterval(timer);
            }
            isTop = true;

        }, 30);
    };
}
/**
 * 把网址后面的内容变成键值对对象 location.search -> obj
 * @param searchStr 字符串
 * @returns {*}     对象
 */
function locSearchValToObj(searchStr) {
    // 异常处理
    if (!searchStr) {
        return null;
    } else {
        //去掉问号
        var str = searchStr.slice(1);
        //分割成数组
        var strArr = str.split('&');
        //新建对象
        var obj = {};
        // 遍历数组
        strArr.forEach(function (item, idx, arr) {
            //分割成数组
            var arr = item.split('=');
            var key = decodeURI(arr[0])//键 decodeURI解码
            var val = decodeURI(arr[1]);//值
            // 添加到obj对象
            obj[key] = val;
        });
        // 返回对象
        return obj;
    }
}
    /**
     * 异常处理(断言)
     * @param expression  判断条件 -> 布尔值
     * @param message     字符串 ->提示的信息
     */
    function assert(expression, message) {
        if (!expression) {
            throw {name: 'Assertion Exception', message: message};
        }
    }

/**
 * 添加事件
 * @param element  元素节点
 * @param type     事件类型
 * @param callBack 回调函数
 */
function addEvent(element, type, callBack) {
    // 兼容IE10.0以下
    if(element.attachEvent) {
        element.attachEvent('on' + type, callBack);
    }else {
        element.addEventListener(type, callBack, false);
    }
}
/**
 * 移动函数
 * @param obj     需要移动的对象
 * @param attr    向上下左右移动(left,right,top,bottom值)调用属性写引号
 * @param dir     速度
 * @param target  目标值
 * @param endFn   回调函数
 */
function doMove(obj, attr, dir, target, endFn) {
    // 判断方向,判断目标值与现在的值的大小决定dir的正负,为正就是向前,为负就是向后
    dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;

    //清除定时器,为了代码简介
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var speed = parseInt(getStyle(obj, attr)) + dir;

        if (speed > target && dir > 0 || speed < target && dir < 0) {
            speed = target;
        }
        obj.style[attr] = speed + 'px';
        if (speed == target) {
            clearInterval(obj.timer);
            // if (endFn){endFn();} 与下面等价
            endFn && endFn();//如果endFn为真就调用函数endFn
        }
    }, 30);
}
/**
 * 仿jq元素选择器
 * @param v      元素对象
 * @returns {*}
 */
function $(v) {
    if (typeof v ==='function'){
        window.onload =v;
    }else if( typeof v ==='string'){
        return document.getElementById(v);
    }else if( typeof v ==='object'){
        return v;
    }
}

/**
 * 设置一个cookie
 * @param key    键
 * @param value  值
 * @param t      过期时间(天数)
 */
function setCookie(key, value, t) {
    var oDate = new Date();
    oDate.setDate( oDate.getDate() + t );
    document.cookie = key + '=' + value + ';expires=' + oDate.toDateString();
}
/**
 * 获取浏览器的cookie
 * @param key         键
 * @returns {string}  返回字符串
 */
function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i=0; i<arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if ( arr2[0] == key ) {
            return decodeURI(arr2[1]);
        }
    }
}
/**
 * 移除coolie
 * @param key
 */
function removeCookie(key) {
    setCookie(key, '', -1);
}

/**
 * 分页
 * opt {
 *    id:'',
 * 	  curPage:..,
 *    allPage:..,
 *    callBack:..
 * }
 */

function page(opt) {
    // 异常处理：判断调用时是否传入id，只在传入id的情况下使用该分页函数
    if (!opt.id || opt.curPage <= 0 || opt.allPage <= 0 || opt.curPage > opt.allPage) {return null};

    // 获取元素及参数，对参数做异常处理
    var obj      = document.getElementById(opt.id);
    var curPage  = opt.curPage  || 1; // 当前页，默认1
    var allPage  = opt.allPage  || 5; // 总页码，默认5
    var callBack = opt.callBack || function(){};

    //【首页】仅在当前页大于等于4，且总页数大于等于6的情况下出现首页
    if (curPage >= 4 && allPage >= 6) {
        var oA = document.createElement('a');
        oA.href = '#1';
        oA.innerHTML = '首页';
        obj.appendChild(oA);
    }

    // 【上一页】在当前页大于等于2的情况下出现上一页
    if (curPage >= 2) {
        var oA = document.createElement('a');
        oA.href = '#' + (curPage - 1);
        oA.innerHTML = '上一页';
        obj.appendChild(oA);
    }

    // 假设页码显示的数量为五个，则分为两种情况
    // 1、总页码小于等于5
    // 2、总页码大于5
    if (allPage <= 5) { // 当总页数少于5个的时候
        for (var i = 1; i <= allPage; i++) {
            var oA = document.createElement('a');
            oA.href = '#' + i;
            if (curPage == i) { // 当前页码不加‘[]’
                oA.innerHTML = i;
            }else {
                oA.innerHTML = '[' + i + ']';
            }
            obj.appendChild(oA);
        }
    }else { // 当总页数大于5页的时候
        for(var i = 1; i <= 5; i++) {
            var oA = document.createElement('a');
            if (curPage < 3) {  // 当前页小于3，即1、2页时
                oA.href = '#' + i;
                if (curPage == i) {
                    oA.innerHTML = i;
                }else {
                    oA.innerHTML = '['+ i +']'
                }
            }else if(curPage > allPage - 2){ // 当前页为最后两页时
                oA.href = '#' + (allPage - 5 + i);
                if (curPage == (allPage - 5 + i)) {
                    oA.innerHTML = (allPage - 5 + i);
                }else {
                    oA.innerHTML = '[' + (allPage - 5 + i) + ']'
                }
            }else {
                oA.href = '#' + (curPage - 3 + i);
                if (i == 3) {
                    oA.innerHTML = (curPage - 3 + i);
                }else {
                    oA.innerHTML = '[' + (curPage - 3 + i) + ']';
                }
            }
            obj.appendChild(oA);
        }
    }

    // 【下一页】当前页不等于总页码数且总页码数大于等于2的情况下
    if ((allPage - curPage) >= 1)  {
        var oA = document.createElement('a');
        oA.href = '#' + (curPage + 1);
        oA.innerHTML = '下一页';
        obj.appendChild(oA);
    }

    // 【尾页】当总页数比当前页至少大3，且总页码数大于等于6的情况下出现
    if ((allPage - curPage) >= 3 && allPage >= 6) {
        var oA = document.createElement('a');
        oA.href = '#' + allPage;
        oA.innerHTML = '尾页';
        obj.appendChild(oA);
    }

    // 总页码
    var oA = document.createElement('a');
    oA.innerHTML = '共' + allPage + '页';
    obj.appendChild(oA);

    // 执行回调函数
    callBack(curPage, allPage);

    // 为每一个a添加点击事件
    var aA = obj.getElementsByTagName('a');
    for (var i = 0; i < aA.length; i++) {
        aA[i].onclick = function() {
            var curPage = parseInt(this.getAttribute('href').slice(1));
            obj.innerHTML = '';
            page({
                id: opt.id,
                curPage: curPage,
                allPage: allPage,
                callBack: callBack

            });
            // 阻止默认事件
            return false;
        }
    }
}


/**
 * 本地存储：添加用户
 * @param key      存储用户信息的key
 * @param user     用户信息
 * @param callBack 存储成功回调函数
 */
function addUser(key, user, callBack) {
    // 定义存储用户信息的集合
    var users = null;
    var loginuser = user;
    // 判断本地是否已经存在该用户数据集合
    if(localStorage[key]) {
        // 存在，根据本地用户数据集合来初始化users
        users = JSON.parse(localStorage[key]);
    }else {
        // 不存在，创建一个空数组
        users = [];
    }
    // 添加用户
    users.push(user);
    // 更新本地数据
    localStorage[key] = JSON.stringify(users);
    sessionStorage.loginuser = JSON.stringify(loginuser);


    // 数据存储成功之后调用回调函数
    if(callBack) {
        callBack();
    }
}

/**
 * 判断用户是否存在
 * @param key      存储用户信息在本地的key
 * @param gist     判断用户是否存在的依据
 * @param value    用户输入的值
 * @param response 响应结果（0用户存在 1用户不存在）
 */
function determineUserIsExists(key, gist, value, response) {
    if(!localStorage[key]) {
        response(1);
        return;
    }
    // 获取本地用户数据集合
    var users = JSON.parse(localStorage[key]);
    // 遍历本地用户数据集合，判断用户是否存在
    var tag = false;
    for(var i = 0; i < users.length; i++) {
        if(users[i][gist] == value) {
            // 用户存在
            tag = true;
        }
    }
    tag ? response(0) : response(1);
}

/**
 * 判断是否登录成功
 * @param key      存储用户信息在本地的key
 * @param gists    判断依据
 * @param response 响应结果
 * 0   用户不存在
 * 1   账号或密码错误
 * 2   账号或密码密码为空
 * 200 登录成功
 */

function login(key, gists, response) {
    // 判断本地数据用户集合是否存在
    // 如果不存在，则直接提示用户不存在
    if(!localStorage[key]) {
        response(0);
        return;
    }

    // 判断用户输入的账号或密码为空
    var username = Object.keys(gists)[0];
    var password = Object.keys(gists)[1];
    if(!gists[username] || !gists[password]) {
        response(2);
        return;
    }

    // 判断是否登录成功
    var users = JSON.parse(localStorage[key]);
    var idx = undefined;
    var uesr = null;
    for(var i = 0; i < users.length; i++) {
        // 判断用户是否存在
        if(users[i][username] == gists[username]) {
            idx = i;
            uesr = users[idx];
            break;
        }
    }
    if(idx == undefined) {
        // 用户不存在
        response(0);
    }else {
        // 用户存在
        if((users[idx][username] == gists[username]) &&  (users[idx][password] == gists[password])) {
            response(200,uesr);
        }else {
            response(1);
        }
    }

}

/**
 * 样式属性更新(适用于对多个元素添加事件,移除之前样式给当前添加样式)
 * @param abj      元素集合
 * @param attr     元素需要添加移除的样式名称(字符串形式)
 * @param evname   元素需要添加的事件(字符串形式)
 * @param callBack 回调函数 
 */
function upDote(abj, attr, evname, callBack) {

    for(var i = 0; i<abj.length; i++){

        abj[i].index = i;
        //添加事件绑定,判断标准和ie的事件添加
        if (abj[i].addEventListener){
            //添加绑定事件
            abj[i].addEventListener(evname,function () {
                //调用更新小圆点函数
                fn(this.index);
                //返回当前点击的对象
                if (callBack){callBack(abj[this.index])}
            },false)
        }else {
            abj[i].attachEvent("on" + evname, function () {
                callBack.call(abj[i]);
                fn(this.index);
                if (callBack){callBack(abj[this.index])}
            })
        }

    }
//小圆点函数
    function fn(num) {
        for (var i = 0; i<abj.length; i++){
            if(abj[i].classList.contains(attr)){
                abj[i].classList.remove(attr);
                break;
            }
        }
        abj[num].classList.add(attr)
    }

}
