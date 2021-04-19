myButton.addEventListener('click', (e)=>{
    let request = new XMLHttpRequest()
    request.open('GET','/xxx') //第三个参数是否异步，默认是  请求第一部分
    request.setRequestHeader('frank','18')  //请求第二部分
    request.send('设置第四部分')  //请求第四部分
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){// 4请求完成
            console.log('请求响应完成')
            if(request.status >= 200 && request.status < 300){ // request.statusText  --> OK  响应第一部分
                console.log(request.getResponseHeader('Content-Type')) //响应第二部分
                let string = request.responseText  //响应第四部分
                let object = window.JSON.parse(string)
                console.log(object.note.to)
               
            }
        }
    }    
})