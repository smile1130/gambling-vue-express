let getWBody = $('.navbar').width();
$(".list-banner .van-swipe-item").css("width", `${getWBody}px`);

let checkWidth = $('.navbar').width();
$('html').css('font-size', `${checkWidth / 10}px`);
$('.van-tabbar .van-tabbar-item').css({
    'transform': 'scale(0.9)',
});
$(window).resize(() => {
    let checkWidth = $('.navbar').width();
    $('html').css('font-size', `${checkWidth / 10}px`);
    $('.van-tabbar .van-tabbar-item').css({
        'transform': 'scale(0.9)',
    });
});

function formatMoney(money, type) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${type}`);
}
