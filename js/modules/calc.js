//Калькулятор
function calc() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
    //сохранение введённого значения пользователем
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    //функция, которая в зависимости от ранее выбранного пользователем ответа правильно меняет визуал
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    //подчёты по формуле конечный результат
    function calcTotal() {
        //проверка, заполнены ли все данные
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "______";
            //дострочно прервать работу функции
            return;
        }
        //подсчёт суточной нормы каллорий
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    //вызываем, чтобы изначально было какоето значение
    calcTotal();
    //получение значений с блоков
    function getStaticInformation(selector, activeClass) {
        //получим элементы внутри блока (получение div)
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                //блоки отличаются, смотря откуда мы получаем инфу id или дата-атрибут
                //если есть этот атрибут, то обращаемся к одному блоку, если нет, то к другому
                //если пользователь кликнул на блок, то достаём оттуда значение
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    //запоминаем в локальном хранилеще вводимые данные 
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                //класс активности сначала убираем у всех
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                //затем назначаем нужный
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    //функция которая обрабатывает каждый отдельный imput(вход)
    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);
        
        // отслеживаем событие, когда пользователь что-то вводит
        input.addEventListener('input', () => {

        // Проверяем, если вводится не число, то появляется красная рамка
        if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
        }
            //проверяем соответствие строки
            switch(input.getAttribute('id')) {
                case 'height':
                    //записываем значение
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}
export default calc;