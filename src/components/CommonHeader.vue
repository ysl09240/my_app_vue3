<template>
  <el-header class="header">
    <div class="l-content">
      <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
          <Menu/>
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          :index="item.name"
          v-for="item in tags"
          :key="item.name"
          :to="{ path: item.path }"
        >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="userimg" :src="getImgSrc('userimg.png')"></img>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';
import Cookie from 'js-cookies';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let tags = store.state.tabsList;
    const getImgSrc = (name)=>{
      const url = `../assets/images/${name}`;
      return new URL(url,import.meta.url).href;
    }
    const handleCollapse = () =>{
      return store.commit("updateIsCollapse");
    }
    const handleLogout = () =>{
        store.commit("cleanMenu");
        Cookie.removeItem("token");
        router.push({
          name:"login"
        })
    }
    return {
      getImgSrc,
      handleCollapse,
      tags,
      handleLogout
    }
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background:#333;
}
.r-content {
  .userimg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  :deep(.el-breadcrumb__item) {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
}

</style>


