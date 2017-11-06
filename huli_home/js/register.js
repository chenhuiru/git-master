function Register() {

    //定义登录注册公共变量
    var $inpLogin = $('.loginBox input');
    var $inpRegister = $('.register input');
    var $btnLogin = $('.loginBox button');
    var $btnRegister = $('.register button');
    var regPassword = /^[a-zA-Z]\w{5,17}$/;
    var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var $main = $('main');

    //登录注册切换通过一个hiddenActive的class来达到效果
    this.toggler = function () {

        $('.loginBtn').on('click', function () {
            $btnRegister.attr('disabled', 'disabled').removeAttr('style');
            $inpRegister.val('');
            $inpRegister.next().remove();
            $(this).parent().prev().html('登&nbsp;录');
            $(this).addClass('hiddenActive').siblings().removeClass('hiddenActive');
            $('.registerBox').addClass('hiddenActive').siblings('.loginBox').removeClass('hiddenActive')

        });
        $('.registerBtn').on('click', function () {
            $btnLogin.attr('disabled', 'disabled').removeAttr('style');
            $inpLogin.val('');
            $inpLogin.next().remove();
            $(this).parent().prev().html('注&nbsp;册');
            $(this).addClass('hiddenActive').siblings().removeClass('hiddenActive');
            $('.loginBox').addClass('hiddenActive').siblings('.registerBox').removeClass('hiddenActive')

        })

    };

    //登录注册的提交和非空验证及输入格式验证
    this.registerBtn = function () {
        //登录提交
        commit($btnLogin, $inpLogin);
        //登录验证
        verify($inpLogin, $('.loginBox'));

        //注册提交
        commit($btnRegister, $inpRegister);
        //注册验证
        verify($inpRegister, $('.registerBox'));

    };

    /**
     * 内部函数使用
     */
    //提交  参数1：提交表单的按钮。参数2：所有表单集合
    function commit(btn, inp) {
        //最好是在西区焦点或者keyup的时候去实时验证；表单提交思路：1、通过inp的长度判断是登录还是注册；2、不需要在做非空验证，只需要验证是否合法用正则，然后做出相应反馈，如错误弹窗提示错误信息是什么；3、判断本地是否存在user，验证用户名是否存在，如存在提示用户从新注册，如不存在提交表单注册成功，数据存储在本地，跳转至首页；4、判断本地是否存在user，从本地去除数据，循环验证登录的账号是否是已经注册的账号；
        var len = inp.length;

        function menu(dataLen) {
            var $e = regEmail.test(inp.eq(0).val());
            var $p = regPassword.test(inp.eq(1).val());
            var $ag = regPassword.test(inp.eq(2).val());
            var username = inp.eq(0).val();
            var password = inp.eq(1).val();

            //提示文字函数封装
            function popup(text) {
                $main.children('.popupBox').remove();
                $main.append(`<div class="popupBox flex">
         <p>${text}</p>
         <button type="button">确&nbsp;定</button>
     </div>`);
                $main.children('.popupBox').fadeIn(300);
            }

            if (dataLen === 3) {
                if ($e && $p && $ag && inp.eq(1).val() === inp.eq(2).val()) {
                    /**
                     * 注册成功后的操作：1、判断本地是否已经有数据存在；2、存数据；3、跳转到个人中心
                     */
                    judgeUserNameIsExist(username, function (user) {

                         if (user){
                             popup('该邮箱已存在')
                         }else {
                             seveData({
                                 username: inp.eq(0).val(),
                                 password: inp.eq(1).val()
                             });
                             popup('注册成功');
                         }
                    });
                    setTimeout(function () {
                        location.href = 'index.html'
                    },1000)

                }
                else if ($e && $p && $ag && inp.eq(1).val() != inp.eq(2).val()) {
                    popup('两次密码输入不一致');
                }
                else if ($e && $p && !$ag) {
                    popup('密码输入不合法');
                }
                else if ($e && !$p) {
                    popup('密码输入不合法');
                    // alert('密码输入不合法')
                }
                else if (!$e) {
                    popup('请输入正确的邮箱');
                    // alert('请输入正确的邮箱')
                }
            }
            else if (dataLen === 2) {
                if ($e && $p) {
                    /**
                     * 注册成功后的操作：1、判断本地是否已经有数据存在；2、存数据；3、跳转到个人中心
                     */
                    judgeUserNameIsExist(username, function (user) {

                        if (user){

                            if(user.username === username && user.password === password){
                                popup('登录成功')
                                setTimeout(function () {
                                    location.href = 'index.html'
                                },1000)
                            }else if(user.username != username){
                                popup('邮箱错误')
                            }else if(user.password != password){
                                popup('密码错误')
                            }

                        }else {
                            popup('该邮箱为注册');
                        }
                    });
                }
                else if ($e && !$p) {
                    popup('密码输入不合法');
                }
                else if (!$e) {
                    popup('请输入正确的邮箱');
                }
            }
        }

        //提交按钮点击事件
        btn.on('click', function () {
            menu(len);
            // setTimeout(function () {
            //     $main.find('.popupBox').fadeOut(400, function () {
            //         $(this).remove()
            //     })
            // }, 2000)
        });

        //弹出框点击事件
        $main.on('click', '.popupBox', function () {
            $(this).remove()
        })
    }

    //非空验证 参数为所需要验证的表单集合
    function verify(inp, form) {
        //提示的keyup事件
        function tsKeyup($this) {

            var str = $this.prev().text();
            var notSpace = /^[\s]+$/.test($this.val());
            var thisText = !$this.val();
            var emailVal = regEmail.test($this.val());
            var passwordVal = regPassword.test($this.val());
            var s1 = $this.attr('name');
            var $formDiv = $this.parent();
            var $thisForm = $this.closest('form').hasClass('register');

            //移除提示
            $this.nextAll().remove();
            //非空验证
            if (thisText) {
                $formDiv.append("<span>" + "*" + str + "不能为空" + "</span>");
                $(this).val('');
            }
            //首字符不能为空格验证
            else if (notSpace) {
                $formDiv.append("<span>" + "*" + str + "首个字符不能为空" + "</span>");
                $(this).val('');
            }
            //内容不为空后的验证
            else if (!thisText) {
                //验证邮箱的合法
                if (emailVal && s1 === 'email') {
                    /**
                     * 功能，邮箱是否已经注册判断
                     */
                    var username = $this.val();
                    judgeUserNameIsExist(username, function (user) {

                        if (user){
                            if ($thisForm) {
                                $formDiv.append("<span>" + "*" + "该邮箱已注册" + "</span>");
                            } else {
                                $formDiv.append("<tips class='tips flex'><i>&#xe643;</i></tips>");
                            }
                        }else {
                            if ($thisForm) {
                                $formDiv.append("<tips class='tips flex'><i>&#xe643;</i>" + "<ts>" + "恭喜可以注册" + "</ts></tips>");
                            } else {
                                $formDiv.append("<span>" + "*" + "该邮箱未注册" + "</span>");
                            }
                        }

                    });


                }
                //验证邮箱不合法
                else if (!emailVal && s1 === 'email') {
                    $formDiv.append("<span>" + "*" + str + "请输入正确的邮箱" + "</span>");
                }
                //验证密码合法
                else if (passwordVal && s1 === 'password') {
                    $formDiv.append("<tips class='tips flex'><i>&#xe643;</i>" + "</tips>");
                }
                //验证密码不合法
                else if (!passwordVal && s1 === 'password') {
                    $formDiv.append("<span>" + "*" + str + "请输入6-18位数字及字母开头" + "</span>");
                }
                //只要任意内容不为空就解除按钮禁用状态
                $this.closest('form').find('button').removeAttr('disabled').css({
                    "background": "#82c353",
                    "cursor": "pointer"
                })

            }
            //移除输入框的样式
            inp.removeAttr('class');
        }

        // 表单事件绑定
        $(inp).on({
            //输入框失去焦点
            blur: function () {

                //表单判断函数调用
                tsKeyup($(this));
                //移除输入框的样式
                inp.removeAttr('class');
            },
            //输入框获得焦点
            focus: function () {
                //移除提示
                $(this).nextAll().remove();
                //键盘事件表单判断函数调用
                $(this).keyup(function () {
                    tsKeyup($(this));
                });
                // 先移除之前所有输入框身上的样式
                inp.removeAttr('class');
                //给输入框添加样式
                $(this).addClass('showActive');
            }
        })

    }

    //本地存储
    function seveData(user) {
        var users = null;
        if (localStorage.users) {
            users = JSON.parse(localStorage.users)
        } else {
            users = [];
        }
        users.push(user);
        localStorage.users = JSON.stringify(users);
    }

    //获取本地数据
    function judgeUserNameIsExist(username, callback) {
        // 获取本地数据
        var users = localStorage.users;
        // 记录存在的用户
        var user = null;
        if (users) {
            users = JSON.parse(users);
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    // 用户存在
                    user = users[i];
                    break;
                }
            }
        }
        if (callback) {
            callback(user);
        }
    }

}


$(function () {

    var register = new Register();

    register.toggler();
    register.registerBtn();


})
