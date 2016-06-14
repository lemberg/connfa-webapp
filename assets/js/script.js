function menu(){
    $(document).on('click', '.select', function(e){
        e.preventDefault();
        $(this).parents('.nav').toggleClass('active');
    });
}
function control(){
    $(document).on('click', '.control', function(){
        $('.clear-all').addClass('active');
    });
}
function animate() {
    $('body').addClass('animate');
    setTimeout(function () {
        $('body').removeClass('animate');
    }, 500);
}
function scrollFixedOverflow(){
    $('body').addClass('overflow');
    setTimeout(function () {
        $('body').removeClass('overflow');
    }, 500);
}
function cls(){
    var windowWidth=$(window).width();
    if(windowWidth<=979){
        $('body').removeClass('open');
    }
    else{
        $('body').addClass('open');
    }
}
function filter(){
    $(document).on('click', '.filter', function(e){
        $('.filter-nav').toggleClass('active');
        $(this).toggleClass('active');
        $(this).parents('header').toggleClass('hide');
        animate();
        scrollFixedOverflow();
    });
}
function back(){
    $(document).on('click', '.arrow-back', function(){
        $(this).parents('.active').removeClass('active');
        $('header').removeClass('hide');
        $('.filter').removeClass('active');
        $('body').removeClass('overflow');
        $('.clear-all').removeClass('active');
        animate();
        scrollFixedOverflow();
    });
}
function desc(){
    $(document).on('click', '.events-info li .box-item,.speakers-info li a', function(e) {
        animate();
        scrollFixedOverflow();
    });
}
function search(){
    $(document).on('click', '.header .close', function(){
        $(this).parents('.header').removeClass('active');
    });
    $(document).on('click', '.header .icon-search', function(){
        $(this).parents('.header').toggleClass('active');
    });

}
$(document).ready(function() {
    $(document).on('click', '.hamburger-box',function(e){
        e.preventDefault();
        e.stopPropagation();
        $('body').toggleClass('open');
        animate();
    });
    $(document).on('click', '.over',function(e){
        e.preventDefault();
        e.stopPropagation();
        $('body').removeClass('open');
        animate();
    });
    cls();
    filter();
    search();
    back();
    desc();
    control();
    menu();
    $(window).load(function() {
        setTimeout(function() {
            $('.load').remove('.load');
        }, 600);
    });
    $(window).resize(function(){
        cls();
    });
});

