<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
// import SelectComp from "./components/SelectComp.vue";
import { Delete } from '@element-plus/icons-vue'

import { ref } from 'vue'

const enterpriseValue = ref([])

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<template>
  <div>MIOT CRX</div>
  <div class="m-4">
    <p>请选择企业列表</p>
    <el-select v-model="enterpriseValue" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="3"
      placeholder="Select" style="width: 240px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="danger" :icon="Delete" circle />
  </div>
  <!-- <SelectComp></SelectComp> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
