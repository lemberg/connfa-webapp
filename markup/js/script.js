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
        $(this).toggleClass('active')
    });
}
function search(){
    $('.header .close').click(function(){
        $(this).parents('.header').removeClass('active');
    });
    $('.header .icon-search').click(function(){
        $(this).parents('.header').toggleClass('active');
    });

}
$(document).ready(function() {
    $('.hamburger-box').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('body').toggleClass('open');
    });
    $('.over').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('body').removeClass('open');
    });
    cls();
    filter();
    search();
    $(window).load(function() {
        setTimeout(function() {
            $('.load').remove('.load');
        }, 600);
    });
    $(window).resize(function(){
        cls();
    });
});

