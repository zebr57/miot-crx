<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import SelectComp from "./components/SelectComp.vue";
import { Delete } from "@element-plus/icons-vue";

import { ref, onMounted } from "vue";
import type { TabsPaneContext } from 'element-plus'

const activeName = ref("second") // tab栏切换
const inputValue = ref(""); 
const enterpriseList = ref([]);
const searchValue = ref("")
const productList = ref([])

onMounted(() => {
  // 获取本地存储的数据
  chrome.storage.local.get(["list", 'products'], function (result) {
    console.log("enterpriseList from storage:", result.list);
    console.log("productList from storage:", result.products);
    // 赋值
    const { list, products } = result;
    if (list) enterpriseList.value = JSON.parse(list);
    if(products) productList.value = JSON.parse(products);
    
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

const handleJumpProduct = async (name: string,  url: string) => {
  // 发送消息给content方式
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "popup", action: "hover", value: name },
        (res) => {
          console.log("获取到信息为：", res);
         
        }
      );
    }
  );
}
const handleClickTab = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const handleAddProduct = () => {
  console.log("handleAddProduct")
  // 发送消息给content方式
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "popup", action: "add-product" },
        (res: string) => {
          console.log("获取到信息为：", res);
          const {productName, enterpriseName} = res
          const url = tabs[0].url
          console.log("productName: ", productName);
          console.log("enterpriseName: ", enterpriseName);
          console.log("url:", url);

          productList.value.push({productName, enterpriseName, url});
          chrome.storage.local.set({ products: JSON.stringify(productList.value) }); // 同步保存到本地
          
        }
      );
    }
  );
}
const handleSearch = () => {
  console.log(searchValue.value,"handleSearch");
  const key =  searchValue.value
  productList.value = productList.value.filter(e => e.productName.indexOf(key) != -1 )
}
const handleClickProduct = (item) => {
  console.log("handleClickProduct", item);
  const { enterpriseName, url } = item
  // 发送消息给content方式
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "popup", action: "click", value: enterpriseName },
        (res) => {
          console.log("获取到信息为：", res);
          console.log("改变页面地址");
          // 一秒后执行跳转到产品页
          const timer = setTimeout(() => {
            clearTimeout(timer)
            chrome.tabs.update(tabs[0].id, { url });
          },2000)
        }
      );
    }
  );
}
const handleDeleteProduct = (item) => {
  console.log("handleDeleteProduct", item);
  productList.value = productList.value.filter((e) => e.productName != item.productName);
  chrome.storage.local.set({ products: JSON.stringify(productList.value) }); // 同步保存到本地
}
</script>

<template>
  <el-button
    class="operate_item"
    type="primary"
    size="small"
    @click.stop="handleJumpProduct(21)"
  >测试</el-button>
  <div class="title">MIOT CRX</div>

  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClickTab">
    <el-tab-pane label="企业" name="first">
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
    </el-tab-pane>
    <el-tab-pane label="产品" name="second">
      <el-button
        style="width: 240px"
        type="primary"
        @click.stop="handleAddProduct()"
      >点击自动添加</el-button>
      <el-input
          v-model="searchValue"
          style="width: 240px"
          placeholder="请输入产品名称过滤"
          @change="handleSearch()"
        />
      <div>
        <div class="list_box">
          <div
            v-for="(item) in productList"
            :key="item.url"
            class="list_item"
            @click="handleClickProduct(item)"
          >
            <div class="left_box">
              <p class="name">{{ item.productName }}</p>
            </div>
            <div class="right_box">
              <el-button
                class="operate_item"
                type="danger"
                :icon="Delete"
                circle
                size="small"
                @click.stop="handleDeleteProduct(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>



</template>

<style scoped>
.title {
  font-size: 16px;
  margin-bottom: 12px;
}
.demo-tabs {
  width: 100%;
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
