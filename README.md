# 米家后台辅助扩展

## 需求背景

在做MIOT开发时，需要登录后台频繁切换企业，企业列表过长时需要通过页面搜索关键字，鼠标移入下拉再选中点击，觉得挺麻烦的...

既然是操作页面，即可借助浏览器扩展来简化该操作。

## 功能特色

1. 企业列表
- 输入框输入企业名称，按回车添加
- 列表页支持选中、删除企业
2. 产品列表
- 一键添加产品到列表，点击后自动跳转至该产品页面

## 实现方案

模拟页面操作，查找元素触发点击事件

规则：根据企业名称找到第一个符合元素，并3s后跳转至产品列表页


查找页面中企业名、产品名元素以及当前URL

使用：产品信息页面点击添加，点击列表项自动跳转链接
tip：跳转产品为先点击企业——>3s后跳转产品信息页，确保米家后台右上角有显示企业组

```js
function searchClick() {
  // 查找所有类名为 'dropdown-item' 的元素
  const elements = document.querySelectorAll('.dropdown-item');

  // 遍历所有找到的元素，查找内容为 'xxx' 的元素
  elements.forEach(element => {
    if (element.textContent.trim() === 'xxx') {
      console.log('Found the element:', element);
      
      // 这里可以执行你需要的操作，例如点击
      element.click();  // 触发点击事件

      // 如果你只想找到第一个匹配的元素，可以在找到后退出循环
      return;
    }
  });
}
```

