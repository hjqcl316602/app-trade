import Carousel from "./carousel.vue";
import CarouselChild from "./carousel-child.vue";

Carousel.install = function(Vue, options) {
  Vue.component(Carousel.name, Carousel);
};

CarouselChild.install = function(Vue, options) {
  Vue.component(CarouselChild.name, CarouselChild);
};
Carousel.Child = CarouselChild;

export default Carousel;
