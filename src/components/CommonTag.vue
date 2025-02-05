<template>
  <div class="tags">
    <el-tag
      :index = "index"
      v-for="(item,index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item,index)"
      size="small"
    >{{ item.label }}</el-tag>
  </div>
</template>

<style lang="less" scoped>
.tags {
  padding:10px;
  width:100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>

<script>
import { useStore, mapMutations } from "vuex";
import { useRouter,useRoute} from 'vue-router';
export default {
  setup(){
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const tags = store.state.tabsList;

    const changeMenu =(item) => {
      router.push({ name: item.name });

    }
    const handleClose=(item, index)=> {
      //1,调用store里的mutations方法,
      store.commit("closeTag",item);
      //2,如果关闭的不是当前页面,直接返回
      if (item.name !== route.name) {
        return;
      }
      // 3,关闭的是当前页面,需处理跳转
      /**
       * 1,如果删除了最后一个,那么页面跳转到tags数组的前一个
       * 2,如果删除的是中间,页面跳转在后一页
       */
      const length = tags.length;
      if (index == length) {
        router.push({ name: tags[index - 1].name });
      } else {
        router.push({ name: tags[index].name });
      }
    }
    return {
      tags,
      changeMenu,
      handleClose

    }
  }
};
</script>
