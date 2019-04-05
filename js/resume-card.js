! function() {
    var view = document.getElementById('resumeCard');
    var controller = {
        view: null,
        init: function() {
            this.view = view;
            this.bindEvents();
        },
        bindEvents: function() {
            let obj = {
                email: document.getElementById('email'),
                phone: document.getElementById('phone'),
            };
            for (let i in obj) {
                let svg = obj[i].querySelector('use');
                obj[i].addEventListener('click', function() {
                    let input = document.createElement('input');
                    document.body.appendChild(input);
                    input.setAttribute('value', obj[i].innerText);
                    input.select();
                    input.setAttribute('readonly', 'readonly');
                    input.setSelectionRange(0, input.value.length);
                    if (document.execCommand('copy')) {
                        document.execCommand('copy');
                        svg.setAttribute('xlink:href', '#icon-xingzhuang')
                    }
                    document.body.removeChild(input);
                })
                obj[i].addEventListener('mouseleave', function() {
                    svg.setAttribute('xlink:href', '#icon-copy')
                })
            }
        },
    };
    controller.init();
}.call();