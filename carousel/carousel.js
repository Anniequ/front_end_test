$(p1).on('click', function(){
    $(images).css({
        //transform:'translateX(0)' //窗口不是100%，窗口要抖动。。。
        'margin-left':0
    })
})
$(p2).on('click', function(){
    $(images).css({
        //transform:'translateX(-300px)'
        'margin-left':'-300px'
    })
})
$(p3).on('click', function(){
    $(images).css({
        //transform:'translateX(-600px)'
        'margin-left':'-600px'
    })
})
