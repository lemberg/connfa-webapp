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

$(document).on('click','.hamburger-box',function(e){
    e.preventDefault();
    e.stopPropagation();
    $('body').toggleClass('open');
});

$(document).on('click', '.over',function(e){
    e.preventDefault();
    e.stopPropagation();
    $('body').removeClass('open');
});

$(document).ready(function() {

    cls();
    filter();
    $(window).resize(function(){
        cls();
    });
});

