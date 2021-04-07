function init() {
    $('.images > img:nth-child(1)').addClass('current').siblings().addClass('enter')
    let imgs = $('.images > img')
    /*for (let i = 2; i <= imgs.length; i++) {
        $(`.images > img:nth-child(${i})`).addClass('enter')
    }*/
    return imgs.length
}
imgLength = init()

let n = 1
setInterval(() => {
    makeLeave(getImage(n))  //.one  return 
        .one('transitionend', (e) => {
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImage(n+1))
    n += 1
}, 2000)

function getImage(n){
    return $(`.images > img:nth-child(${xxx(n)})`)
}
function makeCurrent($node){
    $node.removeClass('enter leave').addClass('current')
}
function makeLeave($node){
    $node.removeClass('enter current').addClass('leave')
    return $node
}
function makeEnter($node){
    $node.removeClass('current leave').addClass('enter')
}
function xxx(n) {
    if (n > imgLength) {
        n = n % imgLength
        if (n === 0) {
            n = imgLength
        }
    }
    return n
}