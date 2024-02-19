function slider() {
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
}

module.exports = slider;