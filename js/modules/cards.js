import {getResource} from '../services/services';
function cards() {
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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({title, img, altimg, descr, price}) => {
                new NewBox(title, img, altimg, descr, price, '.menu .container').addText();
            });
        });    
}

export default cards;