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
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

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
    
    modalCloseBtn.addEventListener('click', closeModal);

    //при клике на область, где нет модального окна, оно закрывается 
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    //при нажатии на esc модальное окно закрывается
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});






