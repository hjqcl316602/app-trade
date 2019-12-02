import Image from './index.vue';
Image.install = function(Vue, options) {
  Vue.component(Image.name, Image);
};
export default Image;