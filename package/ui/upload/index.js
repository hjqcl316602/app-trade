import Upload from './index.vue';
Upload.install = function(Vue, options) {
  Vue.component(Upload.name, Upload);
};
export default Upload;
