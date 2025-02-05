import { createStore } from 'vuex'

export default createStore({
    state: {
        isCollapse: true, // 控制菜单收起和展开
        tabsList: [  //面包屑数据
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home"
            }
        ],
        menu: []
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse;
        },
        //更新面包屑数据
        selectMenu(state, val) {
            //判断添加的数据是不是首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name);
                if (index === -1) {
                    state.tabsList.push(val);
                }
            }
        },
        closeTag(state, val) { //删除指定tag数据
            const index = state.tabsList.findIndex(item => val.name === item.name);
            state.tabsList.splice(index, 1);
        },
        // 登陆后获取的菜单数据,放进vuex管理,并缓存在本地
        setMenu(state, val) {
            state.menu = val;
            localStorage.setItem("menu", JSON.stringify(val));
        },
        //动态添加路由
        addMenu(state,router) {
            if (!localStorage.getItem("menu")) {
                return
            }
            const menu = JSON.parse(localStorage.getItem("menu"));
            state.menu = menu;

            //组状动态路由的数据
            const menuArray = [];
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}`;
                        item.component = () => import(/* @vite-ignore */url);
                        return item;
                    })
                    menuArray.push(...item.children);
                } else {
                    let url = `../views/${item.url}`;
                    item.component = () => import(/* @vite-ignore */url);
                    menuArray.push(item);
                }
            });
            console.log(menuArray, 'menuArray')
            menuArray.forEach(item => {
                router.addRoute('Main', item);
            });
        },
        //登出时,清除菜单和本地缓存
        cleanMenu(state){
            state.menu = [];
            localStorage.removeItem("menu");
        }
    }
})