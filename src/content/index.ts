// 可以导入资源
// import logo from "../assets/vue.svg";
// const url = chrome.runtime.getURL(logo);
// console.log(url);

// // 可以请求插件内的资源
// const src = chrome.runtime.getURL("src/pages/help/index.html");

// const iframe = new DOMParser().parseFromString(
//   `<iframe class="crx" src="${src}"></iframe>`,
//   "text/html"
// ).body.firstElementChild;

// document.body.append(iframe);\

console.log("index.js");

function searchClick(value: string) {
  // 查找所有类名为 'dropdown-item' 的元素
  const elements = document.querySelectorAll(".dropdown-item");

  // 遍历所有找到的元素，查找内容为 '索菲亚' 的元素
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.textContent?.includes(value)) {
      console.log("Found the element:", element);

      // 这里可以执行你需要的操作，例如点击
      element.click(); // 触发点击事件

      // 如果你只想找到第一个匹配的元素，可以在找到后退出循环
      return;
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("收到来自", request, request.action == "click");
  if (request.action == "click") {
    searchClick(request.value);
  }

  sendResponse("content收到了");
});

