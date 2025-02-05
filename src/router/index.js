import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name:'Main',
        component: ()=>import('../views/Main.vue'),
        redirect:'/home',
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: ()=>import('../views/home/Home.vue')
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: ()=>import('../views/user/user.vue')
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: ()=>import('../views/mall/Mall.vue')
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: ()=>import('../views/other/Page1.vue')
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: ()=>import('../views/other/Page2.vue')
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: ()=>import('../views/login/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router