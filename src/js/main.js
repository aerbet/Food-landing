window.addEventListener('DOMContentLoaded', () => {
  
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
  
  const hideTabContent = () => {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });
    
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    })
  }
  
  const showTabContent = (i = 0) => {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }
  
  hideTabContent();
  showTabContent();
  
  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  
  // Timer
  
  const deadline = '2024-02-10';
  
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor((t / (1000 * 60 * 60) % 24));
        minutes = Math.floor((t / 1000 / 60) % 60);
        seconds = Math.floor((t / 1000) % 60);
    }
    
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  
  setClock('.timer', deadline);
  
  // Modal
  const modal = document.querySelector('.modal'),
        modalBtn = document.querySelectorAll('.modalBtn'),
        modalClose = document.querySelector('.modal__close');
  
  function openModal () {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    /*clearInterval(modalTimerId);*/
  }
  
  modalBtn.forEach(item => {
    item.addEventListener('click', openModal);
  });
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  modalClose.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  })
  
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && getComputedStyle(modal).display === 'block') {
      closeModal();
    }
  });
  
  /*const modalTimerId = setTimeout(openModal, 15000);*/
  
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  
  window.addEventListener('scroll', showModalByScroll);
  
  // Creating classes for cards
  
 class MyCard {
   constructor(src, alt, title, descr, price, parentSection,) {
     this.src = src;
     this.alt = alt;
     this.title = title;
     this.descr = descr;
     this.price = price;
     this.parent = document.querySelector(parentSection);
     this.transfer = 89;
     this.changeToSom();
   }
   
   changeToSom() {
     this.price = this.price * this.transfer;
   }
   
   render() {
     const element = document.createElement('div');
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
  
  new MyCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    5,
    '.menu .container'
  ).render();
  
  new MyCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    9,
    '.menu .container'
  ).render();
  
  new MyCard(
    "img/tabs/post.jpg",
    "postnoe",
    'Меню “Постное”',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    7,
    '.menu .container'
  ).render();
  
});















