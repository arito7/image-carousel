import ImgSalad from './salad.jpg';
import ImgPancakes from './pancakes.jpg';
import ImgPasta from './pasta.jpg';
import ImgBacon from './bacon.jpg';
import ImgLobster from './lobster.jpg';
import { CarouselComponent } from './carousel';
import './index.css';

(() => {
  const body = document.querySelector('body');
  const imgs = [ImgSalad, ImgPancakes, ImgPasta, ImgBacon, ImgLobster];
  const carousel = CarouselComponent(imgs);

  body.appendChild(carousel);
})();
