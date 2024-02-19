function cards() {
  // Creating classes for cards
  class MyCard {
    constructor(src, alt, title, descr, price, parentSection, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSection);
      this.transfer = 89;
      this.changeToSom();
    }
    
    changeToSom() {
      this.price = this.price * this.transfer;
    }
    
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'col';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      
      element.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> сом/день</div>
        </div>
      </div>
     `;
      this.parent.append(element);
    }
  }
  
  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, alt, title, descr, price}) => {
        new MyCard(img, alt, title, descr, price, '.menu .container .row').render();
      });
    })
}

export default cards;