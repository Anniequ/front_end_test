let $buttons = $('#buttonwrapper>button')
let $slides = $('#images')
//给前后各加上1,4
let $images = $slides.children('img')
makeFakesSlides()
$slides.css({ transform: 'translateX(-300px)' })
bindEvents()
$(next).on('click',function(){
    goToSlide(current + 1)
})
$(previous).on('click',function(){
    goToSlide(current - 1)
})

let timer = setInterval(() => {
    goToSlide(current+1)
}, 2000)

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer = setInterval(() => {
        goToSlide(current+1)
    }, 2000)
})


function makeFakesSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

let current = 0
function bindEvents() {
    $('#buttonwrapper').on('click', 'button', function(e){
        //console.log(1)
        let $button = $(e.currentTarget)
        let index = $button.index()
        //console.log(index)
        //$slides.css({transform:`translateX(${-(index+1)*300}px)`})
        //console.log(current,$button.length -1)
        goToSlide(index)
    })
}
function goToSlide(index){
    if(index>$buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length-1
    }
    if(current === $buttons.length -1 && index === 0){
        $slides.css({transform:`translateX(${-($buttons.length + 1)*300}px)`})
            .one('transitionend', function () {
                $slides.hide()
                    .offset()  //hide()show()没有反应
                $slides.css({transform:`translateX(${-(index+1)*300}px)`}).show()
            })
    }else if(current === 0 && index === $buttons.length -1){
        $slides.css({ transform: 'translateX(0px)' })
            .one('transitionend', function () {
                $slides.hide()
                    .offset()  //hide()show()没有反应
                $slides.css({transform:`translateX(${-(index+1)*300}px)`}).show()
            })
    }else{
        $slides.css({transform:`translateX(${-(index+1)*300}px)`})
    } 
    current  = index
}
//第一张和最后一张切换的时候，不能在它没变完的时候按下一张