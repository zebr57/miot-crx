<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import SelectComp from "./components/SelectComp.vue";
import { Delete } from "@element-plus/icons-vue";

import { ref, onMounted } from "vue";

const inputValue = ref("");
const enterpriseList = ref([]);

onMounted(() => {
  // 获取本地存储的数据
  chrome.storage.local.get(["list"], function (result) {
    console.log("enterpriseList from storage:", result.list);
    // 赋值
    const { list } = result;
    if (!list) return;
    enterpriseList.value = JSON.parse(list);
  });
});

const handleAdd = () => {
  if (!inputValue.value) return;
  enterpriseList.value.push(inputValue.value);
  chrome.storage.local.set({ list: JSON.stringify(enterpriseList.value) }); // 同步保存到本地
};
const handleClickItem = async (item: string) => {
  // 发送消息给content方式
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "popup", action: "click", value: item },
        (res) => {
          console.log("获取到信息为：", res);
        }
      );
    }
  );
};
const handleDelete = (item) => {
  enterpriseList.value = enterpriseList.value.filter((e) => e != item);
  chrome.storage.local.set({ list: JSON.stringify(enterpriseList.value) }); // 同步保存到本地
};
</script>

<template>
  <div class="title">MIOT CRX</div>
  <div>
    <el-input
      v-model="inputValue"
      style="width: 240px"
      placeholder="请输入企业名称按回车添加"
      @keydown.enter="handleAdd"
    />
    <div class="list_box">
      <div
        v-for="(item, index) in enterpriseList"
        :key="item + index"
        class="list_item"
        @click="handleClickItem(item)"
      >
        <div class="left_box">
          <p class="name">{{ item }}</p>
        </div>
        <div class="right_box">
          <el-button
            class="operate_item"
            type="danger"
            :icon="Delete"
            circle
            size="small"
            @click.stop="handleDelete(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 16px;
  margin-bottom: 12px;
}
.list_box {
  margin-top: 12px;
}
.list_item {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0px;
  padding: 0px 6px;
  height: 40px;
}
.list_item:hover {
  /* filter: drop-shadow(0 0 2em #646cffaa); */
  /* border-bottom: 1px solid #646cffaa; */
  box-shadow: 0 4px 8px #eee;
  border-radius: 10px;
}
.left_box {
}
.name {
  font-size: 14px;
}
.right_box {
}
.operate_item {
}

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
