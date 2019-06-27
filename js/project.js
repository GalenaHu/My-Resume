window.onload = function() {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hiddenClass: 'my-button-hidden',
        },
    })
    mySwiper.el.onmouseover = function() {
        mySwiper.autoplay.stop();
    }
    mySwiper.el.onmouseleave = function() {
        mySwiper.autoplay.start();
    }
}