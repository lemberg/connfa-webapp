function animate() {
    $('body').addClass('animate');
    setTimeout(function () {
        $('body').removeClass('animate');
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
    $('.filter').click(function(e){
        $('.filter-nav').toggleClass('active');
        $(this).toggleClass('active');
        $(this).parents('header').toggleClass('hide');
        animate();
    });
}
function search(){
    $('header .close').click(function(){
        $(this).parents('header').removeClass('active');
    });
    $('header .icon-search').click(function(){
        $(this).parents('header').toggleClass('active');
    });

}
function back(){
    $('.arrow-back').click(function(){
        $(this).parents('.active').removeClass('active');
        $('header').removeClass('hide');
        $('.filter').removeClass('active');
        animate();
    })
}
$(document).ready(function() {
    $('.hamburger-box').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('body').toggleClass('open');
        animate();
    });
    $('.over').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('body').removeClass('open');
        animate();
    });
    cls();
    filter();
    search();
    back();
    $(window).load(function() {
        setTimeout(function() {
            $('.load').remove('.load');
        }, 600);
    });
    $(window).resize(function(){
        cls();
    });
});

