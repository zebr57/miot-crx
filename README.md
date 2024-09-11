# 米家后台辅助扩展

## 需求背景

在做MIOT开发时，需要登录后台频繁切换企业，企业列表过长时需要通过页面搜索关键字，鼠标移入下拉再选中点击，觉得挺麻烦的...

既然是操作页面，即可借助浏览器扩展来简化该操作。

## 功能特色

1.  打开米家后台自动显示企业列表弹窗组件
2.  列表页支持选中、添加、删除企业

## 实现方案

查找元素触发点击事件

规则：根据企业名称找到第一个符合元素

```js
function searchClick() {
  // 查找所有类名为 'dropdown-item' 的元素
  const elements = document.querySelectorAll('.dropdown-item');

  // 遍历所有找到的元素，查找内容为 '索菲亚' 的元素
  elements.forEach(element => {
    if (element.textContent.trim() === '索菲亚家居股份有限公司') {
      console.log('Found the element:', element);
      
      // 这里可以执行你需要的操作，例如点击
      element.click();  // 触发点击事件

      // 如果你只想找到第一个匹配的元素，可以在找到后退出循环
      return;
    }
  });
}
```

通过插件拦截网络请求，获取企业下拉列表

<https://iot.mi.com/cgi-op/api/v1/personCenter/getEnterpriseGroupInfo?userId=2750228175&xiaomiiot_ph=%2B6ATmE9j%2Ft3ye8jEh%2FBnzQ%3D%3D>


# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
