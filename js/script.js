window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");
    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    
  // timer

  const deadline = "2022-11-20";

  // разница между дедлайном и текущим временем
  function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),//Date.parse - строку переводим в число (в милисек.)
          days = Math.floor(t / (1000 * 60 * 60 * 24)),//  Math.floor - округление до максимального целого
          hours =  Math.floor((t / (1000 * 60 * 60 ) % 24)),
          minutes =  Math.floor((t / 1000 / 60 ) % 60),
          seconds =  Math.floor((t / 1000 ) % 60);
        // чтобы вернуть наружу переменные , для этого создаём обьект
      return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
      };
  }

  function getZero (num){
      if(num >= 0 && num < 10) {
          return `0${num}`;
      } else {
          return num;
      }
  }
  //установка таймера на страницу
  function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);//обновление функции каждую секунду

      updateClock();//предотвращает мигание (верстки и полученного значения)
      //обновление часов, каждую секунду
      function updateClock() {
          const t = getTimeRemaining(endtime);//расчет времени
          //вывод на страницу
          days.innerHTML = getZero(t.days);
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML =getZero(t.minutes);
          seconds.innerHTML =getZero(t.seconds);
          //остановить 
          if (t.total <= 0) {
              clearInterval(timeInterval);//??
          }
      }
  }
  setClock('.timer', deadline);


//   //вызов модального окна на несколько тригеров
//    const openModalButton = document.querySelector('[data-modal]'),
//          closeModalButton = document.querySelector('[data-close]'),
//          modalWindow = document.querySelector('.modal');

//         
//             openModalButton.addEventListener('click', () => {
//                 modalWindow.classList.add('show');
//                 modalWindow.classList.remove('hide');
//             });
//         
//             closeModalButton.addEventListener('click', () => {
//                 modalWindow.classList.add('hide');
//                 modalWindow.classList.remove('show');
//             });
//         

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');


    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
        
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }
    


    //при клике на область, где нет модального окна, оно закрывается 
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    //при нажатии на esc модальное окно закрывается
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



    class NewBox {
        constructor(title, bacground, box, text, price, cont, transfer, ...classes) {
            this.title = title;
            this.bacground = bacground;
            this.box = box;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.cont = cont;
            this.transfer = 27;
            this.changeToUAH();
        }
    
        //из гривен в доллары
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        addText () {
            const container = document.querySelector(this.cont),
            menuFilde = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                menuFilde.classList.add(this.element);
            } else {
                this.classes.forEach(className => menuFilde.classList.add(className));
            }
             
            menuFilde.innerHTML +=  
            `   <img src=${this.bacground} alt=${this.box}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
             
             container.append(menuFilde);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }; 

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({title, img, altimg, descr, price}) => {
                new NewBox(title, img, altimg, descr, price, '.menu .container').addText();
            });
        });

    //Forms
    const forms = document.querySelectorAll('form');
    //текстовое сообщение, если что-то произошло
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindDostData(item);
    });

//запускается фун-ия postData, 
//делаем запрос на сервер  
//даелаем синхронный код async, ставится перед функцией 
//await-ставим перед опирациями,которые необходимо дождаться,(дожидается результата этого запроса)
//возвращаем ответ в формате джейсон
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };
    function bindDostData(form) {
        //срабатывает каждый раз, когда хотим отправить какую-то форму
        form.addEventListener('submit', (e) => {
            //чтобы отменить стандартное поведение браузера
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText =`
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);

            const json =JSON.stringify(Object.fromEntries(formData.entries()));

            postData(' http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }

    //перелистывание слайдов

    const prev = document.querySelector('.offer__slider-prev'),
        slider = document.querySelector('.offer__slider'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

        let offset = 0;
        let slideIndex = 1;
        if(slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }

        slidesField.style.width = 100 * slides.length +'%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';

        slides.forEach(slide => {
            slide.style.width = width;
        });

        slider.style.position = 'relative';
        const indicators = document.createElement('ol'),
              dots = [];
        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }

        next.addEventListener('click', () => {
            if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.replace(/\D/g, "");
            }

            slidesField.style.transform = `translateX(-${offset}px)`;
            if(slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
            changes();
        });

        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = +width.replace(/\D/g, "") * (slides.length - 1);
            } else {
                offset -= +width.replace(/\D/g, "");
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            if(slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
            changes();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset =  +width.replace(/\D/g, "") * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;
                changes();
            });
        });

        function changes() {
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        }
});






