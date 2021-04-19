//方法一：
function f1(){
    clickMe.addEventListener('click',function(e){
        popover.style.display = 'block'
        //e.stopPropagation()
      })
      wrapper.addEventListener('click',function(e){
          e.stopPropagation() //点击浮层本身不消失
      })
      document.addEventListener('click',function(){
        popover.style.display = 'none'
      })
}
  //方法二 jquery
  $(clickMe).on('click',function(){
      $(popover).show()
      $(document).one('click',function(){ //只监听一次，节省内存  
        //要是不添加stopPropagation 它一添加就执行了，也可包在setTimeOut(0)里面就可以出了冒泡再添加
        $(popover).hide()
    })
  })
  $(wrapper).on('click',function(e){
    e.stopPropagation()
})
  /*本来可以用
  $(wrapper).on('click',false) //不可以，阻止了默认事件，里面的checkbox就不能用了
  等同于
  $(wrapper).on('click',function(e){
      e.preventDefault()
      e.stopPropagation()
  })*/
  


