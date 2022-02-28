/*
 * @Author: 秦真
 * @Date: 2021-09-13 23:35:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-28 15:13:25
 * @Description: Modal框自定义指令
 * @FilePath: \bgy-component\src\directives\modal.js
 */
import Vue from 'vue';

// 全屏功能
function onFullscreen(modalEl) {
  // Modal内容
  const contentEl = modalEl.querySelector('.ant-modal-content');

  if (!contentEl) return;

  // Modal头部DOM
  const headerEl = contentEl.querySelector('.ant-modal-header');
  // Modal底部DOM
  const footerEl = contentEl.querySelector('.ant-modal-footer');

  // 全屏功能相关样式设置
  modalEl.style.width = '100%';
  modalEl.style.top = 0;
  contentEl.style.borderRadius = 0;
  const headerHeight = headerEl ? headerEl.offsetHeight : 0;
  const footerHeight = footerEl ? footerEl.offsetHeight : 0;
  const modalBodyEl = contentEl.querySelector('.ant-modal-body');
  if (modalBodyEl) {
    modalBodyEl.style.height = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
  }
}

// 拖拽功能
function onDrag(el, binding, vnode) {
  const modalEl = el.querySelector('.ant-modal');
  if (!modalEl) return;

  // Modal内容
  const contentEl = modalEl.querySelector('.ant-modal-content');

  if (!contentEl) return;

  // Modal头部DOM
  const headerEl = contentEl.querySelector('.ant-modal-header');

  // 弹窗拖拽事件绑定在弹窗 header 上，如果弹窗没有 header 则不支持拖拽
  if (!headerEl) return;

  // 设置头部鼠标浮动上去样式
  headerEl.style.cursor = 'move';

  Vue.nextTick(() => {
    const { visible, destroyOnClose } = vnode.componentInstance;
    // 防止未定义 destroyOnClose 关闭弹窗时dom未被销毁，指令被重复调用
    if (!visible) return;
    let left = 0;
    let top = 0;

    // 未定义 destroyOnClose 时，dom未被销毁，关闭弹窗再次打开，弹窗会停留在上一次拖动的位置
    if (!destroyOnClose) {
      left = modalEl.left || 0;
      top = modalEl.top || 0;
    }
    // top 初始值为 offsetTop
    top = top || modalEl.offsetTop;

    headerEl.onmousedown = e => {
      const startX = e.clientX;
      const startY = e.clientY;
      headerEl.left = headerEl.offsetLeft;
      headerEl.top = headerEl.offsetTop;
      el.onmousemove = event => {
        const endX = event.clientX;
        const endY = event.clientY;
        modalEl.left = headerEl.left + (endX - startX) + left;
        modalEl.top = headerEl.top + (endY - startY) + top;
        modalEl.style.left = modalEl.left + 'px';
        modalEl.style.top = modalEl.top + 'px';
      }
      el.onmouseup = () => {
        left = modalEl.left
        top = modalEl.top
        el.onmousemove = null;
        el.onmouseup = null;
        headerEl.releaseCapture && headerEl.releaseCapture();
      }
      headerEl.setCapture && headerEl.setCapture();
    }
  });
}

export default {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  bind: function (el, binding, vnode, oldValue) {
    const {
      value = true,           // 默认为 true，表示对 modifiers 都生效
      modifiers: {            // 修饰符
        drag = false,         // 是否支持拖拽
        fullscreen = false,   // 是否全屏展示
      }
    } = binding;

    // 值为false则不处理
    if (!value) return;

    const modalEl = el.querySelector('.ant-modal');
    if (!modalEl) return;

    modalEl.style.paddingBottom = '0'; // .ant-modal 有设置 padding-bottom 值

    // Modal容器可见区域
    const contentEl = modalEl.querySelector('.ant-modal-content');
    if (!contentEl) return;

    if (fullscreen) {   // 开启全屏弹窗（全屏状态下不允许拖拽）
      onFullscreen(modalEl);
    } else if (drag) {  // 开启拖拽功能
      onDrag(el, binding, vnode);
    }
  },
}