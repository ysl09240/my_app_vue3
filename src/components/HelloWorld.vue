<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(2)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <el-button type="button" @click="count++">count is {{ count }}</el-button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
