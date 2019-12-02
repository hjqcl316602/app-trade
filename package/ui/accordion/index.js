import Accordion from './accordion.vue';
import AccordionItem from './accordion-item.vue';

Accordion.install = function(Vue, options) {
  Vue.component(Accordion.name, Accordion);
};

AccordionItem.install = function(Vue, options) {
  Vue.component(AccordionItem.name, AccordionItem);
};


Accordion.Item = AccordionItem;



export default Accordion;
