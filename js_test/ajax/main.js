myButton.addEventListener('click', (e)=>{
    let request = new XMLHttpRequest()
    request.open('GET','/xxx') //第三个参数是否异步，默认是
    request.send()
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){// 4请求完成
            if(request.status >= 200 && request.status < 300){
                let string = request.responseText
                let object = window.JSON.parse(string)
            }
        }
    }    
})