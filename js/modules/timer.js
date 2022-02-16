const modal = require("./modal");

 // timer
function timer(id, deadline) {

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
    setClock(id, deadline);
}
export default timer;
 