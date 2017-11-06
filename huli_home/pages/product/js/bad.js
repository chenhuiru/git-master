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
// getJson('pages/product/js/product.json',function (data) {
//     for (var i=0;i<data.productSort.beds.length;i++){
//         var box=document.querySelector(".box");
//         var test = document.createElement("p");
//         test.textContent=data.productSort.beds[i];
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
//
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
