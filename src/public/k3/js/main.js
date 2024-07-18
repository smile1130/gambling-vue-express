function totalMoney() {
    let amount = $('.xvalue').val();
    let money = $('.amount-box').find('.action').attr("value");

    let listJoin = $('.list-join-ao li');

    $('.info-bet').attr("xvalue", amount);
    $('.info-bet').attr("money", money);

    let result = Number(amount) * Number(money) * Number(listJoin.length);
    $('.result').text(result + '');
}

function totalMoney2() {
    let amount = $('.xvalue').val();
    let money = $('.amount-box').find('.action').attr("value");

    let listJoin = $('.purple[data="chon-2-so-phu-hop"] .item.action');
    let listJoin2 = $('.num-box.red[data="chon-1-cap-duy-nhat"] .item.action');
    let listJoin3 = $('.num-box.green[data="chon-1-cap-duy-nhat"] .item.action');
    $('.info-bet').attr("xvalue", amount);
    $('.info-bet').attr("money", money);

    let result = Number(amount) * Number(money) * Number(listJoin2.length * listJoin3.length + listJoin.length);
    $('.result').text(result + '');
}

function totalMoney3() {
    let amount = $('.xvalue').val();
    let money = $('.amount-box').find('.action').attr("value");

    let listJoin = $('.bet-con[game="3"] .item.action');
    let listJoin1 = $('.chon-3-so-giong-nhau .li.action');

    $('.info-bet').attr("xvalue", amount);
    $('.info-bet').attr("money", money);

    let result = Number(amount) * Number(money) * Number(listJoin.length + listJoin1.length);
    $('.result').text(result + '');
}

function totalMoney4() {
    let amount = Number($('.xvalue').val());
    let money = Number($('.amount-box').find('.action').attr("value"));

    let listJoin1 = $('.bet-con[game="4"] .num-box:eq(0) .item.action');
    let listJoinHang1 = listJoin1.length;
    let x1 = 0;
    if (listJoinHang1 >= 3) {
        if (listJoinHang1 == 3) x1 = 1;
        if (listJoinHang1 == 4) x1 = listJoinHang1;
        if (listJoinHang1 == 5) x1 = 10;
        if (listJoinHang1 == 6) x1 = 20;
    }

    let listJoin2 = $('.bet-con[game="4"] .num-box:eq(2) .item.action');

    let listJoinHang2 = listJoin2.length;
    let x2 = 0;
    if (listJoinHang2 >= 2) {
        if (listJoinHang2 <= 3) x2 = 1;
        if (listJoinHang2 == 4) x2 = 6;
        if (listJoinHang2 == 5) x2 = 10;
        if (listJoinHang2 == 6) x2 = 15;
    }

    let listJoin3 = $('.chon-3-so-lien-tiep .li').hasClass('action');
    let x3 = 0;
    if (listJoin3) {
        x3 = 1;
    }

    $('.info-bet').attr("xvalue", amount);
    $('.info-bet').attr("money", money);

    let result = amount * (x1 * money + x2 * money + x3 * money);
    $('.result').text(result + '');
}

const socket = io();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function RenderResult(results) {
    for (let i = 0; i < 30; i++) {
        let random1 = Math.floor(Math.random() * 6) + 1;
        $('.slot-transform:eq(0) .slot-num').attr('class', `slot-num bg${random1}`);
        let random2 = Math.floor(Math.random() * 6) + 1;
        $('.slot-transform:eq(1) .slot-num').attr('class', `slot-num bg${random2}`);
        let random3 = Math.floor(Math.random() * 6) + 1;
        $('.slot-transform:eq(2) .slot-num').attr('class', `slot-num bg${random3}`);
        await sleep(50);
    }
    let result = String(results).split('');
    $('.slot-transform:eq(0) .slot-num').attr('class', `slot-num bg${result[0]}`);
    $('.slot-transform:eq(1) .slot-num').attr('class', `slot-num bg${result[1]}`);
    $('.slot-transform:eq(2) .slot-num').attr('class', `slot-num bg${result[2]}`);
    return false;
}

let checkWidth = $("#app").width();
$("html").css("font-size", `${checkWidth / 10}px`);
$(window).resize(() => {
    let checkWidth = $("#app").width();
    $("html").css("font-size", `${checkWidth / 10}px`);
});

$(".circular .li").click(function (e) {
    e.preventDefault();
    $(".van-overlay, .pop-quytac").fadeIn(300);
    $("body").addClass("van-overflow-hidden");
});

$(".pop-quytac button, .pop-quytac-buy button").click(function (e) {
    e.preventDefault();
    $(".van-overlay, .pop-quytac, .pop-quytac-buy").fadeOut(300);
    $("body").removeClass("van-overflow-hidden");
});

function reload_money() {
    fetch("/api/webapi/GetUserInfo")
        .then((response) => response.json())
        .then((data) => {
            if (data.status === false) {
                unsetCookie();
                return false;
            }
            $(".num .moneyU").text(`₹ ${data.data.money_user}.00 `);
            $(".Loading").fadeOut(0);
        });
}
reload_money();

$(".reload_money").click(function (e) {
    e.preventDefault();
    $(".Loading").fadeIn(0);
    $(this).addClass("block-click");
    setTimeout(() => {
        $(this).removeClass("block-click");
    }, 2500);
    reload_money();
});

$('.van-notice-bar__content').css("transition-duration", "42s");
setTimeout(() => {
    $('.van-notice-bar__content').css("transform", "translateX(-1872.29px)");
}, 100);

setInterval(() => {
    $('.van-notice-bar__content').css("transition-duration", "0s");
    $('.van-notice-bar__content').css("transform", "translateX(0px)");
    setTimeout(() => {
        $('.van-notice-bar__content').css("transition-duration", "42s");
        $('.van-notice-bar__content').css("transform", "translateX(-1872.29px)");
    }, 100);
}, 42000);

$('.multiple-box .li').click(function (e) {
    e.preventDefault();
    let value = $(this).attr("value");
    $('.xvalue').val(value);
    $('.multiple-box .li').removeClass('action');
    $(this).addClass('action');
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
    let value2 = $('.xvalue').val();
    if (value2 > 1) {
        $('.minus-plus .minus').addClass('action');
    } else {
        $('.minus-plus .minus').removeClass('action');
    }
});

$('.amount-box .li').click(function (e) {
    e.preventDefault();
    $('.amount-box .li').removeClass('action');
    $(this).addClass('action');
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
    let value2 = $('.xvalue').val();
    if (value2 > 1) {
        $('.minus-plus .minus').addClass('action');
    } else {
        $('.minus-plus .minus').removeClass('action');
    }
});

$('.minus-plus .minus').click(function (e) {
    e.preventDefault();
    let value = Number($('.xvalue').val());
    value -= 1;
    if (value <= 1) {
        value = 1;
        $(this).removeClass('action');
    }
    $(`.multiple-box .li`).removeClass('action');
    $(`.multiple-box .li[value=${value}]`).addClass('action');
    $('.xvalue').val(value);
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
});

$('.xvalue').on('input', () => {
    let value = $('.xvalue').val();
    if (value == "") {
        $('.minus-plus .minus').removeClass('action');
    } else if (value <= 0) {
        value = 1;
        $('.minus-plus .minus').removeClass('action');
    } else if (value > 100) {
        value = 100;
    }
    if (value > 1) {
        $('.minus-plus .minus').addClass('action');
    } else {
        $('.minus-plus .minus').removeClass('action');
    }
    $(`.multiple-box .li`).removeClass('action');
    $(`.multiple-box .li[value=${value}]`).addClass('action');
    $('.xvalue').val(value);
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
});

$('.minus-plus .plus').click(function (e) {
    e.preventDefault();
    let value = Number($('.xvalue').val());
    value += 1;
    if (value > 100) {
        value = 100;
    }
    $(`.multiple-box .li`).removeClass('action');
    $(`.multiple-box .li[value=${value}]`).addClass('action');
    $('.xvalue').val(value);
    $('.minus-plus .minus').addClass('action');
    let game = $('.bet-tab .item.action').attr('game');
    if (game == 1) totalMoney();
    if (game == 2) totalMoney2();
    if (game == 3) totalMoney3();
    if (game == 4) totalMoney4();
});

$('.txt-qu-ytac').click(function (e) {
    e.preventDefault();
    $('.pop-quytac-buy').fadeIn(200);
    $('.van-overlay').fadeIn(200);
});

$(".canned").click(function (e) {
    e.preventDefault();
    dropDown();
});

function dropDown() {
    $('.Bet-box li').remove();
    $(".list-join-total .item").find('.li .icon').remove();
    $(".list-join-total .item").find('.li').removeClass('action');
    $(".pop-total").css("transform", "translateY(400px)");
    $('.c-row[game="2_2"], .list-join-ao span[game="2_1"]').addClass('d-none');
    $('.c-row[game="2_2"]').html('');
    $('.Bet-box span').addClass('d-none');
    $('.bet-con[game="2"] .item, .chon-3-so-giong-nhau .li').removeClass('action');
    $('.bet-con[game="3"] .item').removeClass('action');
    $('.bet-con[game="4"] .item').removeClass('action');
    $('.actionBtn').addClass('d-none');
    $('.chon-3-so-lien-tiep .li').removeClass('action');
    $('.confirm').removeClass('block-click');
    $('.result').text('1');
    $('.betting-mark .amount-box .li').removeClass('action');
    $('.betting-mark .amount-box .li:eq(0)').addClass('action');
    $('.betting-mark .multiple-box .li').removeClass('action');
    $('.betting-mark .multiple-box .li:eq(0)').addClass('action');
    $('.xvalue').val(1);
    $('.num-box').find('.icon').remove();
}

var audio1 = new Audio("/audio/di1.da40b233.mp3");
var audio2 = new Audio("/audio/di2.317de251.mp3");

var clicked = false;

function openAudio() {
    audio1.muted = true;
    audio1.play();
    audio2.muted = true;
    audio2.play();
}

$("body").click(function (e) {
    e.preventDefault();
    if (clicked) return;
    openAudio();
    clicked = true;
});

function playAudio1() {
    audio1.muted = false;
    audio1.play();
}

function playAudio2() {
    audio2.muted = false;
    audio2.play();
}

function cownDownTimer() {
    let countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
    setInterval(function () {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        let checkData = Number($('html').attr('data-dpr'));
        let minute = Math.ceil(minutes % checkData);
        let seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        let seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
        $(".flex-row-end .li-item:eq(1)").text(minute);
        $(".flex-row-end .li-item:eq(2)").text(seconds1);
        $(".flex-row-end .li-item:eq(3)").text(seconds2);

        if (minute == 0 && seconds1 == 0 && seconds2 <= 5) {
            $('.mark-box').show();
            $('.mark-box .item:eq(1)').text(seconds2);
            $('.mark-box').show();
            dropDown();
        }
        if (minute >= 0 && seconds1 >= 1 && seconds2 <= 9) {
            $('.mark-box').hide();
        }
    }, 0);
    setInterval(function () {
        let now = new Date().getTime();//.toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
        let distance = countDownDate - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let checkData = Number($('html').attr('data-dpr'));
        let minute = Math.ceil(minutes % checkData);
        let seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        let seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
        const check_volume = localStorage.getItem('volume');

        if (minute == 0 && seconds1 == 0 && seconds2 <= 5) {
            if (clicked) {
                if (check_volume == 'on') {
                    playAudio1();
                }
            }
        }

        if (minute == (checkData - 1) && seconds1 == 5 && seconds2 >= 9) {
            if (clicked) {
                if (check_volume == 'on') {
                    playAudio2();
                }
            }
        }
    }, 1000);
}

cownDownTimer();

const issetVolume = localStorage.getItem('volume');
if (issetVolume == null) {
    localStorage.setItem('volume', 'on');
}

if (issetVolume == 'on') {
    $('.item-volume').attr('src', '/images/volume-up-line.webp');
} else if (issetVolume == 'off') {
    $('.item-volume').attr('src', '/images/volume-off-outline.webp');
} else {
    localStorage.setItem('volume', 'on');
}

$('.item-volume').click(function (e) {
    e.preventDefault();
    const check_volume = localStorage.getItem('volume');
    if (check_volume == 'on') {
        $(this).attr('src', '/images/volume-off-outline.webp');
        localStorage.setItem('volume', 'off');
    } else {
        $(this).attr('src', '/images/volume-up-line.webp');
        localStorage.setItem('volume', 'on');
    }
});

$('.game-minutes .img, .game-minutes .txt').click(function (e) {
    e.preventDefault();
    let parent = $(this).parent();

    $('.game-minutes .item').removeClass('action');
    parent.addClass('action');

    $('.game-minutes .item .img .van-image-1').fadeOut(0);
    $('.game-minutes .item .img .van-image-2').fadeIn(0);
    $('.game-minutes .item .img, .game-minutes .item .txt').removeClass('block-click');
    parent.find('.img .van-image:eq(0)').fadeIn(0);
    parent.find('.img .van-image:eq(1)').fadeOut(0);

    parent.find('.img').addClass('block-click');
    parent.find('.txt').addClass('block-click');

    let data = $(this).attr('data');
    $('html').attr('data-dpr', data);
    callAjaxMeJoin();
    callListOrder();
});

$('.bet-tab .item').click(function (e) {
    e.preventDefault();
    $('.bet-tab .item').removeClass('action');
    $(this).addClass('action');
    let game = $(this).attr('game');

    $('.bet-mark .bet-con').addClass('d-none');
    $('.bet-mark').find(`[game='${game}']`).removeClass('d-none');

    $('.list-join-ao span').addClass('d-none');
    $('.bet-tab .item').removeClass('block-click');
    $(this).addClass('block-click');

    dropDown();
});

// Tổng số
$(".list-join-total .item").click(function (e) {
    e.preventDefault();
    $('.list-join-ao span[game="1"]').removeClass('d-none');
    $(".pop-total").css("transform", "translateY(0px)");
    let check = $(this).find('.li').hasClass('action');
    if (check == true) {
        $(this).find('.li').removeClass('action');
        $(this).find('.li .icon').remove();

        let html = $(this).find('.li').attr('data-join');
        $('.list-join-ao').find(`[value='${html}']`)[0].remove();
        let count = $('.list-join-ao').find('li');
        if (count.length == 0) {
            dropDown();
        }
        totalMoney();
        return false;
    }
    let html = $(this).find('.li').attr('data-join');
    if (html == "Big"){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #ffa82e">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == "Small"){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #6da7f4">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == "Odd"){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == "Even"){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 3){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 4){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 5){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 6){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 7){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 8){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 9){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 10){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 11){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 12){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 13){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 14){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 15){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 16){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 17){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #fa574a">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    if (html == 18){
    $('.list-join-ao').append(`
        <li data-v-03b808c2="" value="${html}" style="background-color: #40ad72">
            <span data-v-03b808c2="">${html}</span>
        </li>
    `);}
    $(`.list-join-ao`).removeClass('d-none');
    $(this).find('.li').addClass('action');
    $(this).find('.li').append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
    totalMoney();
});

// 2 số trùng nhau
$('.bet-con[game="2"] .purple[data="chon-2-so-phu-hop"] .item').click(function (e) { // Hàng 1
    e.preventDefault();
    $(".pop-total").css("transform", "translateY(0px)");

    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.list-join-ao li[data=${data}]`).remove();
        $(this).removeClass('action');

        let game = $(this).attr('game');
        let count = $(`.list-join-ao li`);
        let count2 = $(`.c-row[game=2_2] li`);
        if (count.length <= 0 && count2.length <= 0) {
            $(`.list-join-ao span[game=${game}]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
            dropDown();
        } else if (count.length <= 0) {
            $(`.list-join-ao span[game=${game}]`).addClass('d-none');
        }
        totalMoney2();
        $(this).find('.icon').remove();
        return false;
    }

    let game = $(this).attr('game');
    let data = $(this).attr('data');

    $(`.list-join-ao`).removeClass('d-none');
    $(`.list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);

    $(`.list-join-ao span[game=${game}]`).removeClass('d-none');

    $(this).addClass('action');
    totalMoney2();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

function handlingGame2() {
    let hang1 = $('.num-box[hang="1"] .action');
    let hang2 = $('.num-box[hang="2"] .action');
    let html = '';
    let numberHang1 = '';
    let number = '';
    if (hang1.length > 0 && hang2.length > 0) {
        for (let i = 0; i < hang1.length; i++) {
            numberHang1 = hang1[i].innerText;
            for (let i = 0; i < hang2.length; i++) {
                number += String(hang2[i].innerText) + ',';
            }
            number = number.slice(0, -1);
            html += `
                <li data-v-03b808c2="" class="actionRedGreen" data="${numberHang1}">${numberHang1}|${number}</li>
            `;
            numberHang1 = '';
            number = '';
        }
        $(`.c-row[game=2_2]`).html(html);
        $(`.c-row[game=2_2]`).prepend(`<span data-v-03b808c2="">Choose a unique pair of numbers：</span>`);
    }
    if (hang1.length <= 0 || hang2.length <= 0) {
        $(`.c-row[game=2_2]`).html('');
        // $(`.c-row[game=2_2]`).prepend(`<span data-v-03b808c2="">Chọn một cặp số duy nhất：</span>`);
    }
}

$('.bet-con[game="2"] .num-box[data="chon-1-cap-duy-nhat"] .item').click(async function (e) {  // Hàng 2
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.c-row[game=2_2] li[data=${data}]`).remove();
        $(this).removeClass('action');

        let game = $(this).attr('game');
        await handlingGame2();
        let count = $(`.list-join-ao li`);
        let count2 = $(`.c-row[game=2_2] li`);
        if (count.length <= 0 && count2.length <= 0) {
            $(`.c-row[game=2_2]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
            dropDown();
        } else if (count2.length <= 0) {
            $(`.c-row[game=2_2]`).addClass('d-none');
        }
        totalMoney2();
        $(this).find('.icon').remove();
        return false;
    }

    let number = $(this).attr('number');
    let hang = $(this).parent().attr('hang');
    if (hang == 1) {
        let element = $('.num-box[hang="2"]').find(`[number=${number}]`);
        let check = element.hasClass('action');
        if (check) {
            $('.num-box[hang="2"]').find(`[number=${number}]`).removeClass('action');
            $('.num-box[hang="2"]').find(`[number=${number}]`).find('.icon').remove();
        }
    } else {
        let element = $('.num-box[hang="1"]').find(`[number=${number}]`);
        let check = element.hasClass('action');
        if (check) {
            $('.num-box[hang="1"]').find(`[number=${number}]`).removeClass('action');
            $('.num-box[hang="1"]').find(`[number=${number}]`).find('.icon').remove();
        }
    }

    let game = $(this).attr('game');
    $(`.c-row[game=${game}]`).removeClass('d-none');
    $(`.list-join-ao`).removeClass('d-none');
    $(this).addClass('action');

    let countHang1 = $('.num-box[hang="1"] .action').length;
    let countHang2 = $('.num-box[hang="2"] .action').length;
    if (countHang1 >= 1 && countHang2 >= 1) {
        $(".pop-total").css("transform", "translateY(0px)");
    }
    handlingGame2();
    let count = $(`.list-join-ao li`);
    let count2 = $(`.c-row[game=2_2] li`);
    if (count.length <= 0 && count2.length <= 0) {
        $(`.c-row[game=2_2]`).addClass('d-none');
        $(".pop-total").css("transform", "translateY(400px)");
    }
    totalMoney2();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

// 3 số trùng nhau
$('.bet-con[game="3"] .item').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.Bet-box li[data=${data}]`).remove();
        $(this).removeClass('action');

        let count = $(`.list-join-ao li`);
        let check = $('.chon-3-so-giong-nhau .li').hasClass('action');
        if (count.length <= 0 && !check) {
            $(`.list-join-ao[game=3]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
            dropDown();
        }
        if (count.length <= 0) {
            $(`.list-join-ao span[game="3"]`).addClass('d-none');
        }
        totalMoney3();
        $(this).find('.icon').remove();
        return false;
    }
    let data = $(this).attr('data');
    let game = $(this).parent().parent().attr('game');
    $(`.Bet-box ul span[game=${game}]`).removeClass('d-none');
    $(`.list-join-ao`).removeClass('d-none');
    $(this).addClass('action');
    $(`.Bet-box .list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);
    $(".pop-total").css("transform", "translateY(0px)");
    totalMoney3();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$('.chon-3-so-giong-nhau .li').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        $(this).removeClass('action');
        $('.actionBtn').addClass('d-none');

        let count = $(`.list-join-ao li`);
        let check = $('.chon-3-so-giong-nhau .li').hasClass('action');
        if (count.length <= 0 && !check) {
            $(`.list-join-ao[game=3]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
            dropDown();
        }
        totalMoney3();
        $(this).find('.icon').remove();
        return false;
    }
    $('.actionBtn').text('Choose 3 identical numbers');
    $('.actionBtn').removeClass('d-none');
    $(this).addClass('action');
    $(".pop-total").css("transform", "translateY(0px)");
    totalMoney3();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

// Khác số
$('.bet-con[game="4"] .num-box:eq(0) .item').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.Bet-box .list-join-ao li[data=${data}]`).remove();
        $(this).removeClass('action');

        let count = $(`.list-join-ao li`).length;
        let count2 = $(`.Bet-box ul[game="4"] li`).length;
        let check = $('.chon-3-so-lien-tiep .li').hasClass('action');
        if (count < 3 && count2 < 2 && !check) {
            $(`.list-join-ao`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
        }
        if (count < 3) {
            $(`.list-join-ao`).addClass('d-none');
        }
        totalMoney4();
        $(this).find('.icon').remove();
        return false;
    }
    let data = $(this).attr('data');
    let game = $(this).parent().parent().attr('game');
    $(`.list-join-ao`).addClass('d-none');
    $(`.Bet-box ul span[game=${game}]`).removeClass('d-none');
    $(this).addClass('action');
    $(`.Bet-box ul.list-join-ao`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);
    let count = $(`.Bet-box ul.list-join-ao li`).length;
    if (count >= 3) {
        $(`.list-join-ao`).removeClass('d-none');
        $(".pop-total").css("transform", "translateY(0px)");
    }
    totalMoney4();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$('.chon-3-so-lien-tiep .li').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        $(this).removeClass('action');
        $('.actionBtn').addClass('d-none');

        let count = $(`.list-join-ao li`);
        let count2 = $(`.Bet-box ul[game="4"] li`).length;
        let count3 = $(`.list-join-ao li`).length;
        let check = $('.chon-3-so-giong-nhau .li').hasClass('action');
        if (count.length <= 0 && count2 < 2 && count3 < 3 && !check) {
            $(`.list-join-ao[game=3]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
        }
        totalMoney4();
        $(this).find('.icon').remove();
        return false;
    }
    $('.actionBtn').text('Choose 3 consecutive numbers');
    $('.actionBtn').removeClass('d-none');
    $(this).addClass('action');
    $(".pop-total").css("transform", "translateY(0px)");
    totalMoney4();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

$('.bet-con[game="4"] .num-box:eq(2) .item').click(function (e) {
    e.preventDefault();
    let check = $(this).hasClass('action');
    if (check) {
        let data = $(this).attr('data');
        $(`.Bet-box ul[game="4"] li[data=${data}]`).remove();
        $(this).removeClass('action');

        let count = $(`.Bet-box ul[game="4"] li`).length;
        let count2 = $(`.list-join-ao li`).length;
        let check = $('.chon-3-so-lien-tiep .li').hasClass('action');
        if (count < 2 && count2 < 3 && !check) {
            $(`.Bet-box ul[game="4"]`).addClass('d-none');
            $(".pop-total").css("transform", "translateY(400px)");
        }
        if (count < 2) {
            $(`.Bet-box ul[game="4"]`).addClass('d-none');
        }
        totalMoney4();
        $(this).find('.icon').remove();
        return false;
    }
    let data = $(this).attr('data');
    $(`.Bet-box ul[game="4"]`).removeClass('d-none');
    $(`.Bet-box ul[game="4"] span`).removeClass('d-none');
    $(this).addClass('action');
    $(`.Bet-box ul[game="4"]`).append(`
        <li data-v-03b808c2="" class="actionViolet" data="${data}">${data}</li>
    `);

    let count = $(`.Bet-box ul[game="4"] li`).length;
    if (count >= 2) {
        $(".pop-total").css("transform", "translateY(0px)");
    }
    totalMoney4();
    $(this).append(`
        <div data-v-03b808c2="" class="icon c-row c-row-middle-center">
            <i data-v-03b808c2="" class="van-icon van-icon-success" style="color: rgb(251, 78, 78); font-size: 15px;"><!----></i>
        </div>
    `);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Đặt cược
function alertMess(mess) {
    $('body').append(
        `
      <div data-v-1dcba851="" class="msg">
        <div data-v-1dcba851="" class="msg-content v-enter-active v-enter-to" style=""> ${mess} </div>
      </div>
      `
    );
    setTimeout(() => {
        $('.msg .msg-content').removeClass('v-enter-active v-enter-to');
        $('.msg .msg-content').addClass('v-leave-active v-leave-to');
        setTimeout(() => {
            $('.msg').remove();
        }, 100);
    }, 1000);
}

function sendGame1() {
    let join = '';
    let countwe = $('.bet-con[game="1"] .list-join-total .item .action');
    for (let i = 0; i < countwe.length; i++) {
        join += countwe[i].attributes[2].value + ',';
    }
    let listJoin = join.slice(0, -1);
    let xvalue = $('.info-bet').attr("xvalue");
    let money = $('.info-bet').attr("money");
    $.ajax({
        type: "POST",
        url: "/api/webapi/action/k3/join",
        data: {
            listJoin: listJoin,
            game: $('html').attr('data-dpr'),
            gameJoin: 1,
            xvalue: xvalue,
            money: money,
        },
        dataType: "json",
        success: function (response) {
            alertMess(response.message);
            let change = String(response.change);
            if (response.status) {
                $('.moneyU').text(response.money + '00');
                socket.emit('data-server-3', { change, gameJoin: 1, listJoin, money, xvalue, game: $('html').attr('data-dpr') });
            }
            dropDown();
        }
    });
}

function sendGame2() {
    let join2 = '';
    let count2 = $('.list-join-ao li');
    for (let i = 0; i < count2.length; i++) {
        join2 += count2[i].innerText + ',';
    }
    let listJoin1 = join2.slice(0, -1);

    let join = '';
    let countwe = $('.Bet-box ul[game="2_2"] .actionRedGreen');
    for (let i = 0; i < countwe.length; i++) {
        join += countwe[i].innerText + '&';
    }

    let listJoin2 = join.slice(0, -1);

    let listJoin = listJoin1 + '@' + listJoin2;

    let xvalue = $('.info-bet').attr("xvalue");
    let money = $('.info-bet').attr("money");
    $.ajax({
        type: "POST",
        url: "/api/webapi/action/k3/join",
        data: {
            listJoin: listJoin,
            game: $('html').attr('data-dpr'),
            gameJoin: 2,
            xvalue: xvalue,
            money: money,
        },
        dataType: "json",
        success: function (response) {
            alertMess(response.message);
            let change = String(response.change);
            if (response.status) {
                $('.moneyU').text(response.money + '00');
                socket.emit('data-server-3', { change, gameJoin: 2, listJoin, money, xvalue, game: $('html').attr('data-dpr') });
            }
            dropDown();
        }
    });
}

function sendGame3() {
    let join = '';
    let countwe = $('.list-join-ao li');
    for (let i = 0; i < countwe.length; i++) {
        join += countwe[i].innerText + ',';
    }
    let listJoin = join.slice(0, -1);

    let check = $('.actionBtn').hasClass('d-none');
    let threeNum = '';
    if (!check) {
        threeNum = '3';
    }
    listJoin = listJoin + '@' + threeNum;
    let xvalue = $('.info-bet').attr("xvalue");
    let money = $('.info-bet').attr("money");
    $.ajax({
        type: "POST",
        url: "/api/webapi/action/k3/join",
        data: {
            listJoin: listJoin,
            game: $('html').attr('data-dpr'),
            gameJoin: 3,
            xvalue: xvalue,
            money: money,
        },
        dataType: "json",
        success: function (response) {
            alertMess(response.message);
            let change = String(response.change);
            if (response.status) {
                $('.moneyU').text(response.money + '00');
                socket.emit('data-server-3', { change, gameJoin: 3, listJoin, money, xvalue, game: $('html').attr('data-dpr') });
            }
            dropDown();
        }
    });
}

function sendGame4() {
    let join = '';
    let countwe = $('.list-join-ao li');
    if (countwe.length >= 3) {
        for (let i = 0; i < countwe.length; i++) {
            join += countwe[i].innerText + ',';
        }
    }
    let join2 = 'y';
    let countwe2 = $('.actionBtn').hasClass('d-none');
    if (!countwe2) {
        join2 = 'u';
    }

    let join3 = '';
    let countwe3 = $('.Bet-box .c-row[game="4"] li');
    if (countwe3.length >= 2) {
        for (let i = 0; i < countwe3.length; i++) {
            join3 += countwe3[i].innerText + ',';
        }
    }

    let listJoin = join.slice(0, -1) + '@' + join2 + '@' + join3.slice(0, -1);
    let xvalue = $('.info-bet').attr("xvalue");
    let money = $('.info-bet').attr("money");
    $.ajax({
        type: "POST",
        url: "/api/webapi/action/k3/join",
        data: {
            listJoin: listJoin,
            game: $('html').attr('data-dpr'),
            gameJoin: 4,
            xvalue: xvalue,
            money: money,
        },
        dataType: "json",
        success: function (response) {
            alertMess(response.message);
            let change = String(response.change);
            if (response.status) {
                $('.moneyU').text(response.money + '00');
                socket.emit('data-server-3', { change, gameJoin: 4, listJoin, money, xvalue, game: $('html').attr('data-dpr') });
            }
            dropDown();
        }
    });
}

$('.confirm').click(async function (e) {
    e.preventDefault();
    $(this).addClass('block-click');
    let game = $('.bet-tab .action').attr('game');

    if (game == 1) {
        await sendGame1();
    } else if (game == 2) {
        await sendGame2();
    } else if (game == 3) {
        await sendGame3();
    } else if (game == 4) {
        await sendGame4();
    }
    callAjaxMeJoin();
});