//
//
// /**
//  * 请求json数据
//  * @param url  json地址
//  * @param success 请求成功回调
//  * @param fail   请求失败回调
//  */
// function getJson(url, success, fail) {
//     //1.创建请求
//     var request = new XMLHttpRequest();
//     //2.配置请求
//     request.open('GET', url, true);
//     //3.发送请求
//     request.send(null);
//     //4.监听状态
//     request.onreadystatechange = function () {
//         //判断是否请求成功
//         if (request.readyState == 4 && request.status == 200) {
//             //请求成功
//             // console.log(request.responseText);
//             var obj = JSON.parse(request.responseText);
//             if (success) {
//                 success(obj);
//             }
//         } else {
//             //请求失败
//             if (fail) {
//                 fail(request.status);
//             }
//         }
//     }
// }
//
//
// getJson('pages/product/js/product',function (data) {
//     for (var i=0;i<data.productSort.sofa.length;i++){
//         var box=document.querySelector(".box");
//         var test = document.createElement("p");
//         test.textContent=data.productSort.sofa[i];
//         box.appendChild(test);
//     }
// });
//
// getJson("pages/product/js/info.json",function (datas) {
//     for (var i=0;i<datas.img.length;i++){
//         var boxTow=document.querySelector(".box-tow");
//         var div=document.createElement("div");
//         div.classList.add("list-div");
//         boxTow.appendChild(div);
//
//         var listDiv=document.querySelectorAll(".list-div")[i];
//         var span=document.createElement("span");
//         span.textContent=datas.name[i];
//         listDiv.appendChild(span);
//
//
//         var listDiv=document.querySelectorAll(".list-div")[i];
//         var span=document.createElement("b");
//         span.textContent=datas.price[i];
//         listDiv.appendChild(span);
//
//
//     }
//
// });
//

// $(function () {
//
//     var str = $('.second_2 a').eq(0).text();
//
//     // var arr = [];
//     // $('.second_2 a').each(function () {
//     //     arr.push($(this).text())
//     // })
//     console.log(str)
// })