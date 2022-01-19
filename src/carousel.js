import './carousel.css';
import ImgLArrow from './left-arrow.svg';
import ImgRArrow from './right-arrow.svg';

const CarouselComponent = (imgSrcs) => {
  const CSS = {
    container: 'carousel-container',
    img: 'carousel-img',
    lbtn: 'carousel-btn-l',
    rbtn: 'carousel-btn-r',
    visible: 'carousel-visible',
    dotsContainer: 'carousel-dots',
    imgContainer: 'carousel-img-container',
    pointable: 'carousel-pointable',
    dot: 'carousel-dot',
    activeDot: 'carousel-dot-active',
    fade: 'carousel-fade',
  };
  let currentActiveIndex = 0;
  // CREATE DOM ELEMENTS
  const container = document.createElement('div');
  const lbtn = document.createElement('button');
  const rbtn = document.createElement('button');
  const dotsContainer = document.createElement('div');
  const imgContainer = document.createElement('div');
  const dots = [];
  const imgs = [];

  // FUNCTIONS
  function update(index) {
    const updateActiveImg = (i) => {
      imgs[currentActiveIndex].classList.remove(CSS.visible);
      imgs[i].classList.add(CSS.visible);
    };
    const updateActiveDot = (i) => {
      dots[currentActiveIndex].classList.remove(CSS.activeDot);
      dots[i].classList.add(CSS.activeDot);
    };
    updateActiveImg(index);
    updateActiveDot(index);
    currentActiveIndex = index;
  }
  function dotClickHandler(e) {
    const index = parseInt(e.target.getAttribute('value'), 10);
    update(index);
  }

  function btnClickHandler(e) {
    let currentIndex = currentActiveIndex;
    switch (e.target) {
      case rbtn:
        currentIndex += 1;
        if (currentIndex > imgSrcs.length - 1) {
          currentIndex = 0;
        }
        break;
      case lbtn:
        currentIndex -= 1;
        if (currentIndex < 0) {
          currentIndex = imgSrcs.length - 1;
        }
        break;
      default:
        return;
    }
    update(currentIndex);
  }

  // ADD CLASSES
  lbtn.classList.add(CSS.lbtn, CSS.pointable);
  rbtn.classList.add(CSS.rbtn, CSS.pointable);
  dotsContainer.classList.add(CSS.dotsContainer);
  imgContainer.classList.add(CSS.imgContainer);
  container.classList.add(CSS.container);

  lbtn.style.backgroundImage = `url(${ImgLArrow})`;
  rbtn.style.backgroundImage = `url(${ImgRArrow})`;

  rbtn.addEventListener('click', btnClickHandler);
  lbtn.addEventListener('click', btnClickHandler);

  // CREATE IMAGES
  (() => {
    for (let i = 0; i < imgSrcs.length; i += 1) {
      const img = new Image();
      img.src = imgSrcs[i];
      if (i === currentActiveIndex) {
        img.classList.add(CSS.visible);
      }
      img.classList.add(CSS.img, CSS.fade);
      img.setAttribute('value', i);
      imgs.push(img);
      imgContainer.appendChild(img);
    }
  })();

  // CREATE DOTS
  (() => {
    for (let i = 0; i < imgSrcs.length; i += 1) {
      const dot = document.createElement('button');
      if (i === currentActiveIndex) {
        dot.classList.add(CSS.activeDot);
      }
      dot.classList.add(CSS.dot, CSS.pointable, CSS.fade);
      dot.setAttribute('value', i);
      dot.addEventListener('click', dotClickHandler);
      dots.push(dot);
      dotsContainer.appendChild(dot);
    }
  })();

  // APPEND
  container.appendChild(lbtn);
  container.appendChild(imgContainer);
  container.appendChild(dotsContainer);
  container.appendChild(rbtn);

  return container;
};

export { CarouselComponent };
