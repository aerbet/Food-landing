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
  
  const deadline = '2024-06-01';
  
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
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');
  
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === "") {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  const modalTimerId = setTimeout(openModal, 300000);
  
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  
  window.addEventListener('scroll', showModalByScroll);
  
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
  
  /*const getResource = async (url) => {
    const res = await fetch(url);
    
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
  };*/
  
  /* getResource('http://localhost:3000/menu')
     .then(data => {
       data.forEach(({ img, alt, title, descr, price }) => {
         new MyCard(img, alt, title, descr, price, '.menu .container .row').render();
       });
     });*/
  
  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, alt, title, descr, price}) => {
        new MyCard(img, alt, title, descr, price, '.menu .container .row').render();
      });
    })
  
  // Form
  
  const forms = document.querySelectorAll('form');
  
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так'
  }
  
  forms.forEach(item => {
    bindPostData(item);
  })
  
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
  
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 auto;
      `
      form.insertAdjacentElement('afterend', statusMessage);
      
      const formData = new FormData(form);
      
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      
      
      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
        showThanksModal(message.failure);
        statusMessage.remove();
      }).finally(() => {
        form.reset();
      })
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
    `
    
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 3000)
  }
  
  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
  
  // slider
  
  const prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        wrapper = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slideFields = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width;
  
  let slideIndex = 1;
  let offset = 0;
  
  if (wrapper.length < 10) {
    total.textContent = `0${wrapper.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = `${wrapper.length}`;
    current.textContent = `${slideIndex}`;
  }
  
  slideFields.style.width = 100 * wrapper.length + '%';
  slideFields.style.display = 'flex';
  slideFields.style.transition = '0.5s all';
  
  slideWrapper.style.overflow = 'hidden'
  
  wrapper.forEach(item => {
    item.style.width = width;
  });
  
  slider.style.position = 'relative';
  
  const dots = document.createElement('ol'),
        dotsArr = [];
  
  dots.classList.add('dots');
  dots.style.cssText = `
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
  slider.append(dots);
  
  for (let i = 0; i < wrapper.length; i++) {
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
    if (i === 0) {
      dot.style.opacity = 1;
    }
    dots.append(dot);
    dotsArr.push(dot);
  }
  
  function updateDots() {
    dotsArr.forEach(dot => dot.style.opacity = '.5');
    dotsArr[slideIndex - 1].style.opacity = 1;
  }
  
  function checkIndex() {
    if (wrapper.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = `${slideIndex}`;
    }
  }
  
  function removeNumber(str) {
    return +str.replace(/\D/g, '');
  }
  
  next.addEventListener('click', () => {
    if (offset === removeNumber(width) * (wrapper.length - 1)) {
      offset = 0;
    } else {
      offset += removeNumber(width);
    }
    
    slideFields.style.transform = `translateX(-${offset}px)`;
    
    if (slideIndex === wrapper.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    
    checkIndex();
    updateDots();
  });
  
  prev.addEventListener('click', () => {
    if (offset === 0) {
      offset = removeNumber(width) * (wrapper.length - 1);
    } else {
      offset -= removeNumber(width);
    }
    
    slideFields.style.transform = `translateX(-${offset}px)`;
    
    if (slideIndex === 1) {
      slideIndex = wrapper.length;
    } else {
      slideIndex--;
    }
    
    checkIndex();
    updateDots();
  });
  
  dotsArr.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      
      slideIndex = slideTo;
      offset = removeNumber(width) * (slideTo - 1);
      
      slideFields.style.transform = `translateX(-${offset}px)`;
      
      checkIndex();
      updateDots();
    });
  });
  
});















