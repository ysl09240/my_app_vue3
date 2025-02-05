import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body);
        if (username == 'admin' && password == "admin") {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "house",
                            url: "home/Home.vue"
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "mall/Mall.vue"
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "user/User.vue"
                        },
                        {
                            label: "其他",
                            icon: "location",
                            children: [
                                {
                                    path: "/page1",
                                    name: "page1",
                                    label: "页面1",
                                    icon: "setting",
                                    url: "other/PageOne.vue"
                                },
                                {
                                    path: "/page2",
                                    name: "page2",
                                    label: "页面2",
                                    icon: "setting",
                                    url: "other/PageTwo.vue"
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    msg: "获取成功"
                }

            }
        } else if (username == 'xiao' && password == "xiao") {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "Home.vue"
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "Mall.vue"
                        }

                    ],
                    token: Mock.Random.guid(),
                    msg: "获取成功"
                }

            }
        } else {
            return {
                code: -999,
                data: {
                    msg: "密码错误"
                }
            }
        }


    }
}