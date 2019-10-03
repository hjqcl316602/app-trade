
const  Index = r => require.ensure([], () => r(require('@pages/index/Index.vue')), 'Index');


export default [
        { path: '/', component: Index },
        { path: '/index', component: Index },
]

