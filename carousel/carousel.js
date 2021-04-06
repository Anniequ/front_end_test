/*$(p1).on('click', function(){
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
*/
var allButtons = $('#buttons > button')
for (let i = 0; i < allButtons.length; i++) {
    //allbutton[i].onclick = function(){}  //allbutton是一个dom对象
    $(allButtons[i]).on('click', function (x) {
        var index = $(x.currentTarget).index()
        var px = index * -300
        $('#images').css({
            transform: 'translate(' + px + 'px)'
        })
        n = index
        activeButton(allButtons.eq(n))
})
}

var n = 0
var size = allButtons.length
playSlide(n % size)

// eq()封装成jq对象   siblings接受的是选择器，add和removeClass接受的是类名
var timeId = setTimer()

$('.window').on('mouseenter', function () {
    window.clearInterval(timeId)
})
$('.window').on('mouseleave', function () {
    timeId = setTimer()
})


function setTimer(){
    return setInterval(() => {
        n += 1
        playSlide(n % size)
    }, 1000)
}
function activeButton($button) {
    $button.addClass('red').siblings('.red').removeClass('red')
}
function playSlide(index){
    allButtons.eq(index).trigger('click')
activeButton(allButtons.eq(index))
}

