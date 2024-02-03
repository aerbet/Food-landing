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
        if (target == item) {
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
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
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
        if (iphone.gb === 512) {
          console.log('Мы идём покупать 14 про 512гб');
        } else {
          console.log('Мы идём покупать 14 про 256гб и зарядку');
        }
      }
    }
  }
  
  setClock('.timer', deadline);
  
  // Modal
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('.modalBtn');
  const modalClose = document.querySelector('.modal__close');
  
  modalBtn.forEach(item => {
    item.addEventListener('click', () => {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
    });
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
  
  const modalTimerId = setTimeout(() => {
  
  });
})