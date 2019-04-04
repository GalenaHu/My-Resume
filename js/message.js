! function() {
    var view = document.getElementById('messages');
    var model = {
        init: function() {
            var APP_ID = 'NySsgYTEF9Y2bhdX1CSvUJKI-gzGzoHsz';
            var APP_KEY = 's8ILTe6dBOIAe725MrMygKAl';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });

        },
        save: function() {
            let nameTag = document.querySelector('#nameInput');
            let messageTag = document.querySelector('#messageInput');
            var MessageDb = AV.Object.extend('MessageDb');
            var messageDb = new MessageDb();
            let NameValue = nameTag.value;
            let MessageValue = messageTag.value;
            let myDate = new Date();
            let TimeValue = myDate.toLocaleDateString() + '<br>' + myDate.getHours() + ':' + myDate.getMinutes();
            messageDb.save({
                nameText: NameValue,
                messageText: MessageValue,
                timeText: TimeValue,
            }).then(function(object) {
                console.log('success');
                var newBar = controller.NewMessageBar(NameValue, MessageValue, 'new', TimeValue);
                messagesShow.prepend(newBar);
                nameTag.value = '';
                messageTag.value = '';
                inputBlur.call(nameTag);
                inputBlur.call(messageTag);
            }, function() {
                alert('Oh, something got wrong...');
            });
        },
        fetch: function() {
            var query = new AV.Query('MessageDb');
            query.limit(5);
            query.descending('createdAt');
            query.find().then(function(MessageDbs) {
                for (let i = 0; i < 5; i++) {
                    var name = MessageDbs[i].attributes.nameText;
                    var message = MessageDbs[i].attributes.messageText;
                    var serial = MessageDbs[i].attributes.number;
                    var time = MessageDbs[i].attributes.timeText
                    var newBar = controller.NewMessageBar(name, message, serial, time);
                    messagesShow.append(newBar);
                };
            });
        }

    };
    var controller = {
        view: null,
        init: function() {
            controller.view = view;
            model.init();
            model.fetch();
            controller.bindEvents();
        },
        bindEvents: function() {
            let formTag = document.querySelector('#form');
            let nameTag = document.querySelector('#nameInput');
            let messageTag = document.querySelector('#messageInput');
            formTag.addEventListener('submit', function(e) {
                e.preventDefault();
                let formTest = true;
                if (nameTag.value === '') {
                    formTest = false;
                    nameTag.classList.add('input-error');
                };
                if (messageTag.value === '') {
                    formTest = false;
                    messageTag.placeholder = '我也早觉得有写一点东西的必要了。——鲁迅';
                    messageTag.classList.add('input-error');
                };
                if (formTest) {
                    model.save();
                    return
                } else {
                    return
                };
            });
            messageTag.addEventListener('keydown', function(e) {
                if (e.keyCode == 13) {
                    if (e.ctrlKey) {
                        messageTag.value += '\r\n';
                        return
                    };
                    e.preventDefault();
                    submitButton.click();
                };
            });

            let inputArray = [nameTag, messageTag];
            for (let i = 0; i < 2; i++) {
                inputArray[i].addEventListener('focus', function(e) {
                    controller.inputFocus.call(this);
                });
                inputArray[i].addEventListener('blur', function(e) {
                    controller.inputBlur.call(this);
                });
            };

        },
        inputFocus: function() {
            this.classList.remove('input-error');
            this.nextElementSibling.classList.add('focus-border');
            let messageTag = document.querySelector('#messageInput');
            messageTag.placeholder = '留言：';
        },
        inputBlur: function() {
            if (this.value === '') {
                this.nextElementSibling.classList.remove('focus-border');
            };
        },
        NewMessageBar: function(name, message, serial, time) {
            var newMessageBar = document.getElementsByClassName('message-bar')[0].cloneNode(true);
            newMessageBar.classList.remove('message-bar-hidden');
            newMessageBar.querySelector('.message-name').innerHTML = name + '：';
            newMessageBar.querySelector('.message-text').innerHTML = message;
            newMessageBar.querySelector('.serial').innerHTML = '#' + serial;
            newMessageBar.querySelector('.time').innerHTML = time;
            return newMessageBar
        }
    };
    controller.init();
}.call();