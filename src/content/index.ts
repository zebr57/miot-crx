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
  const elements = document.querySelectorAll(".ant-dropdown-menu-item div");

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

function hoverEnterprise() {
  const element = document.querySelector('.nav-login .ant-dropdown-trigger');
    if (element) {
      const mouseEvent = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      element.dispatchEvent(mouseEvent);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("收到来自", request, request.action);
  if (request.action == "click") {
    hoverEnterprise()
    const timer = setTimeout(() => {
      clearTimeout(timer)
      searchClick(request.value)
    }, 1000)
  }
  // 测试 模拟鼠标移入触发下拉框弹出
  if (request.action == "hover") {
    console.log("hover");
    const element = document.querySelector('.nav-login .ant-dropdown-trigger');
    if (element) {
      const mouseEvent = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      element.dispatchEvent(mouseEvent);
    }

  }
  // 添加产品
  if (request.action == "add-product") {
    // 1.获取企业名
    const enterpriseNodes = document.querySelectorAll(".nav-login-dropdown-label");
    console.log("产品名：", enterpriseNodes[0].textContent);
    // 1.获取产品名
    const productNodes = document.querySelectorAll(".detailHeader-content p");
    console.log("产品名：", productNodes[0].textContent);
    // 2.返回给Popup
    sendResponse({enterpriseName: enterpriseNodes[0].textContent, productName: productNodes[0].textContent});
    return;
  }

  sendResponse("content收到了");
});

