!function(){
let code = `
/*
* 首先，要准备皮卡丘的皮
*/
.preview{
height: 100%;
background: #fee433;
display: flex;
justify-content: center;
align-items: center;
}
.wrapper{
    width: 100%;
    height: 165px;
    position: relative;
}
/*
* 接下来，画皮卡丘的鼻子
*/
.nose{
    width: 0px;
    height: 0px;
    border: solid;
    border-width: 12px 14px;
    border-color: black transparent transparent;
    border-radius: 11px;
    
    position: absolute;
    left:50%; /*div左边正中   margin-left: -11px; or transform*/
    top: 28px;
    transform: translateX(-50%);
}
/*
* 接下来，画皮卡丘两只眼睛
*/
.eye{
    width: 49px;
    height: 49px;
    background: #2e2e2e;
    position: absolute;
    border-radius: 50%;
    border: 2px solid #000000;
}
/*
* 画皮卡丘的眼珠
*/
.eye::before{
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: white;
    position: absolute;
    border-radius: 50%;
    border: 1px solid black;
    left: 6px;
}
/*
* 左眼在左边（废话）
*/
.eye.left{
    right: 50%;
    margin-right: 90px;
}
/*
* 右眼在右边（废话）
*/
.eye.right{
    left: 50%;
    margin-left: 90px;
}
/*
* 然后，画皮卡丘的脸
*/
.face{
    width: 68px;
    height: 68px;
    background: #fc0d1c;
    border-radius: 50%;
    border: 2px solid black;
    position: absolute;
    top: 85px;
}
/*
* 把皮卡丘的脸放到正确的位置
*/
.face.left{
    right: 50%;
    margin-right: 116px;
}
.face.right{
    left: 50%;
    margin-left: 116px;
}
/*
* 画皮卡丘的上嘴唇
*/
.upperLip{
    height: 20px;
    width: 70px;
    border: 3px solid black;
    background: #fee433;
    position:absolute;
    top: 50px;
}
/*
* 画皮卡丘的下嘴唇
*/   
.upperLip.left{
    right:50%;
    border-bottom-left-radius: 40px 20px;
    border-top: none;
    border-right: none;
    transform: rotate(-20deg);
}
.upperLip.right{
    left:50%;
    border-bottom-right-radius: 40px 20px;
    border-top: none;
    border-left: none;
    transform: rotate(20deg);
}
/*
* 画皮卡丘的下嘴唇
*/
.lowerLip-wrapper{
    position: absolute;
    bottom: 0;  
    left: 50%;
    transform: translateX(-50%);
    height: 109px;
    width: 139px;
    overflow: hidden;
}
.lowerLip{
    width: 139px;
    height: 1000px;
    background: #990513;
    border-radius: 100px/500px;
    border: 2px solid black;
    position: absolute; 
    bottom: 0; 
    overflow: hidden;
}
/*
* 小舌头
*/
.lowerLip::before{
    content: '';
    bottom: -20px;
    width: 100px;
    height: 100px;
    background: #fc4a62;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 45px;
}
/*
* 结束，谢谢观看
*/
    `
    writeCode('', code)
    $('.actions').on('click','button', function(e){
        let $button = $(e.currentTarget)
        let speed =  $button.attr('data-speed')
        // console.log(speed)
        $button.addClass('active')
            .siblings('.active').removeClass('active')
        switch(speed){
            case 'slow':duration = 100; break
            case 'normal':duration = 50; break
            case 'fast':duration = 10; break
        }
    })
    var duration = 50
    function writeCode(prefix, code, fn){
        let container = document.querySelector('#code')
        let styleTag = document.querySelector('#styleTag')
        let n = 0
        let id
        id = setTimeout(function run(){
            n+=1
            container.innerHTML = code.substring(0, n)
            styleTag.innerHTML = code.substring(0, n)
            container.scrollTop = container.scrollHeight
            if(n < code.length){
                id = setTimeout(run,duration) 
            }else{
                fn && fn.call()
            }
        },duration) //setInterval不能改时间，改用setTimeout
    }
}.call()

