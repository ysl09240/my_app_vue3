<template>
  <el-aside :width="$store.state.isCollapse ? '180px': '64px'">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3>{{$store.state.isCollapse ? '后台管理系统':'后台'}}</h3>
      <el-menu-item
        :index="item.name"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
          <component class="icons" :is="item.icon"/>
          <span>{{item.label}}</span>
      </el-menu-item>
      <el-sub-menu :index="item.name" v-for="item in hasChildren()" :key="item.path">
        <template #title>
          <component class="icons" :is="item.icon"/>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.name"
            v-for="(subItem,index) in item.children"
            :key="subItem.path"
            @click="clickMenu(subItem)"
          >{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import {useRouter} from 'vue-router'
import { useStore } from 'vuex';
export default {
  setup() {
    //转换成根据权限动态获取时菜单时,这个就不用了,先留在这里
    const menuList = [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "house",
        url: "Home/Home"
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "video-play",
        url: "MallManage/MallManage"
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "UserManage/UserManage"
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
            url: "Other/PageOne"
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting",
            url: "Other/PageTwo"
          }
        ]
      }
    ];
    const router = useRouter();
    const store = useStore();
    //登陆成功后,根据权限返回的menu列表存储在localstore中,并且放在vuex中
    const asyncMenuList = store.state.menu;
    const noChildren = () => {
      return asyncMenuList.filter(item => !item.children);
    };
    const hasChildren = () => {
      return asyncMenuList.filter(item => item.children);
    };
    const clickMenu = (item) =>{
      router.push({name:item.name});
      // store Tag中添加数据
      store.commit("selectMenu",item);
    }
    return {
      noChildren,
      hasChildren,
      clickMenu
    };
  }
};
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
  height: 100vh;
  overflow: auto;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
</style>



