! function() {
    var view = document.getElementById('navBar');
    var controller = {
        view: null,
        init: function() {
            this.view = view;
            this.bindEvents();
            this.liBorderMove();

        },
        bindEvents: function() {
            if (window.scrollY > 0) {
                controller.view.classList.add('nav-scroll')
            }
            window.addEventListener('scroll', function(e) {
                if (window.scrollY > 0) {
                    controller.view.classList.add('nav-scroll')
                    window.setTimeout(controller.liBorderMove, 200)
                } else {
                    controller.view.classList.remove('nav-scroll')
                }



            })
            let navLis = document.getElementsByClassName('nav-li')
            let elementHeight
            for (let navLi of navLis) {
                navLi.onmouseover = function() {
                    navLi.classList.add('li-active-hover')
                }
                navLi.onmouseout = function() {
                    navLi.classList.remove('li-active-hover')
                }
                navLi.onclick = function(e) {
                    e.preventDefault()
                    var currentHref = e.target.getAttribute('href')
                    elementHeight = document.getElementById(currentHref.slice(1)).offsetTop - 170 //目标页面滚动高度
                    let currentScrollTop = window.scrollY //当前页面滚动高度
                    var begin = { y: currentScrollTop }

                    controller.tweenMove(begin, elementHeight)
                }
            }
        },
        tweenMove: function(begin, elementHeight) {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
            var tween = new TWEEN.Tween(begin).to({ y: elementHeight }, 400)
                .easing(TWEEN.Easing.Quartic.Out)
                .onUpdate(function() { window.scrollTo(0, begin.y) })
                .start()
        },
        liBorderMove: function() {
            let allSectionTags = document.querySelectorAll('section')
            let navLis = document.getElementsByClassName('nav-li')
            let minIndex = 0
            for (let i = 1; i < allSectionTags.length; i++) {
                if (Math.abs(allSectionTags[i].offsetTop - window.scrollY) < Math.abs(allSectionTags[minIndex].offsetTop - window.scrollY)) {
                    minIndex = i
                }
            }
            for (let navLi of navLis) {
                navLi.classList.remove('li-active')
                if (allSectionTags[minIndex].id === navLi.getAttribute('href').slice(1)) {
                    navLi.classList.add('li-active')
                }
            }
        }

    }
    controller.init();
}.call();