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
    });
    $(document).on('click', '.over',function(e){
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

