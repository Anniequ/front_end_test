window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () { }
    nodes.html = function () { }
    return nodes
}
window.jQuery.ajax = function ({url,method,body,successFn,failFn, headers}) {
    // let url
    // if(arguments.length === 1){
    //     url = options.url
    // }else if(arguments.length === 2){
    //     url = arguments[0]
    // }  
    // let method = options.method
    // let body = options.body
    // let successFn = options.successFn
    // let failFn = options.failFn
    // let headers = options.headers
    //ES6:
    //let {url,method,body,successFn,failFn, headers} = options
    let request = new XMLHttpRequest()
    request.open(method, url)
    for (let header in headers){
        let value = headers[header]
        request.setRequestHeader(header,value)
    }
    request.onreadystatechange = () => {
        if (request.readyState === 4) {// 4请求完成
            // console.log('请求响应完成')
            if (request.status >= 200 && request.status < 300) { // request.statusText  --> OK  响应第一部分
                successFn.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)
}
window.$ = window.jQuery

myButton.addEventListener('click', (e) => {
    window.jQuery.ajax({
        url: '/xxx',                             
        method: 'post',
        headers:{
            'content-type':'application/x-www-form-urlencoded',
            'frank':'18'
        },
        body: 'a=1&b=2',
        successFn: (responseText) => { console.log('success', responseText) }, //回调
        failFn: (request) => { console.log('fail', request) }
    })
})


// myButton.addEventListener('click', (e) => {
//     let request = new XMLHttpRequest()
//     request.open('GET', '/xxx') //第三个参数是否异步，默认是  请求第一部分
//     request.setRequestHeader('frank', '18')  //请求第二部分
//     request.send('设置第四部分')  //请求第四部分
//     request.onreadystatechange = () => {
//         if (request.readyState === 4) {// 4请求完成
//             console.log('请求响应完成')
//             if (request.status >= 200 && request.status < 300) { // request.statusText  --> OK  响应第一部分
//                 console.log(request.getResponseHeader('Content-Type')) //响应第二部分
//                 let string = request.responseText  //响应第四部分
//                 let object = window.JSON.parse(string)
//                 console.log(object.note.to)

//             }
//         }
//     }
// })