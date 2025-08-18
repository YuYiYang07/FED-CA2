gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  gsap.set(".container", { opacity: 1 });
  let split = SplitText.create(".animate-me", { type: "words", aria: "hidden" });

  gsap.from(split.words, {
    opacity: 0,
    duration: 2,
    ease: "sine.out",
    stagger: 0.1,
  });
});

//----------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

  // offcanvas animations
  // 修复后的offcanvas动画设置
  function setupOffcanvasAnimations() {
    const offcanvasElements = document.querySelectorAll('.offcanvas');

    offcanvasElements.forEach(offcanvas => {
      offcanvas.addEventListener('shown.bs.offcanvas', function () {
        const img = this.querySelector('.info-2-stat-image');
        if (img) {
          img.classList.add('animate');
        }
      });

      // 关闭offcanvas时重置图片状态
      offcanvas.addEventListener('hidden.bs.offcanvas', function () {
        const img = this.querySelector('.info-2-stat-image');
        if (img) {
          img.classList.remove('animate');
        }
      });

      // 当offcanvas开始关闭时，提前移除动画类
      offcanvas.addEventListener('hide.bs.offcanvas', function () {
        const img = this.querySelector('.info-2-stat-image');
        if (img) {
          img.classList.remove('animate');
        }
      });
    });
  }

  // scrolling-triggered
  // 修复后的滚动动画设置
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1, // 降低阈值，让动画更早触发
      rootMargin: '0px 0px -20px 0px' // 减少底部边距
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target.id === 'red-fish-image') {
            // 直接添加animate类，移除延迟
            target.classList.add('animate');
          }

          if (target.classList.contains('scroll-fade')) {
            target.classList.add('in-view');
          }

          // 停止观察，避免重复触发
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // 观察红鱼图片
    const redFishImg = document.getElementById('red-fish-image');
    if (redFishImg) {
      observer.observe(redFishImg);
    }

    // 观察其他滚动元素
    document.querySelectorAll('.scroll-fade').forEach(el => {
      observer.observe(el);
    });
  }


  // scrolling-triggered
  setupScrollAnimations();

  // always - offcanvas - have animations
  setupOffcanvasAnimations();
});

// ------------------------------------------------------------------------------------------------------------------------------------------------

let isExpanded = false;
let observer = null;
let allCardsVisible = false;

// 使用 Intersection Observer 检测所有卡片是否都在视野中
function initializeObserver() {
  const cards = document.querySelectorAll('.photo-card');
  let visibleCards = new Set();

  // 创建观察器来监视卡片的可见性
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const cardNumber = entry.target.dataset.card;

      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        // 当卡片30%以上可见时，加入可见集合
        visibleCards.add(cardNumber);
      } else {
        // 当卡片不够可见时，从可见集合中移除
        visibleCards.delete(cardNumber);
      }
    });

    // 检查是否所有卡片都可见
    const newAllVisible = visibleCards.size === cards.length;

    if (newAllVisible && !allCardsVisible && !isExpanded) {
      // 所有卡片都可见且尚未展开，触发展开动画
      console.log('所有卡片都可见了，开始展开动画');
      allCardsVisible = true;
      setTimeout(() => {
        expandCards();
      }, 500); // 短暂延迟让用户意识到检测到了所有卡片
    }

    allCardsVisible = newAllVisible;
  }, {
    // 观察器选项：需要至少30%的元素可见
    threshold: 0.3,
    // 添加一些边距，让检测更加灵敏
    rootMargin: '50px'
  });

  // 开始观察所有卡片
  cards.forEach(card => {
    observer.observe(card);
  });
}

function showBlinds() {
  const cards = document.querySelectorAll('.photo-card');
  const container = document.getElementById('container3d');

  // 使用 Tailwind 类来控制状态
  container.classList.remove('timeline-visible');

  cards.forEach(card => {
    // 移除展开状态，添加百叶窗关闭状态
    card.classList.remove('blinds-open');
    card.classList.add('blinds-closed');
  });

  isExpanded = false;
  allCardsVisible = false; // 重置检测状态

  console.log('切换到百叶窗模式');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function expandCards() {
  const cards = document.querySelectorAll('.photo-card');
  const container = document.getElementById('container3d');

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('blinds-closed');
    cards[i].classList.add('blinds-open');
    console.log(`卡片 ${i + 1} 展开`);
    await sleep(200); // 一张张等待
  }

  // 所有展开后，展示 timeline
  container.classList.add('timeline-visible');
}


// 页面加载完成后初始化
window.addEventListener('load', () => {
  console.log('页面加载完成，初始化观察器');
  initializeObserver();

  // 页面加载后不自动展开，等待用户滚动查看所有卡片
});

// 清理观察器（当页面卸载时）
window.addEventListener('beforeunload', () => {
  if (observer) {
    observer.disconnect();
  }
});
//-----------------------------------------------------------------------------------------------------------------------------------

(function () {
  'use strict';

  let currentIndex = 0; // 默认显示Day 23（索引0）
  const totalCards = 7; // 总共7张卡片

  // 选择特定日程
  function selectDay(index) {
    currentIndex = index;
    updateDisplay();
  }

  // 更新显示状态 - 只操作CSS类名
  function updateDisplay() {
    // 更新所有卡片的状态
    for (let i = 0; i < totalCards; i++) {
      const cardElement = document.getElementById(`day-card-${i}`);
      if (!cardElement) continue;

      // 清除所有状态类
      cardElement.className = 'day-card';

      if (i === currentIndex) {
        // 当前激活：大卡片
        cardElement.classList.add('active');
      } else if (i === currentIndex - 1) {
        // 上一个：上方小预览
        cardElement.classList.add('inactive', 'prev');
      } else if (i === currentIndex + 1) {
        // 下一个：下方小预览
        cardElement.classList.add('inactive', 'next');
      } else {
        // 其他：隐藏
        cardElement.classList.add('hidden');
      }
    }

    // 更新滚轮状态
    updateWheelState();
  }

  // 更新滚轮的激活状态
  function updateWheelState() {
    const marks = document.querySelectorAll('.wheel-mark');
    const labels = document.querySelectorAll('.wheel-label');

    marks.forEach((mark, index) => {
      mark.classList.toggle('active', index === currentIndex);
    });

    labels.forEach((label, index) => {
      label.classList.toggle('active', index === currentIndex);
    });
  }

  // 滚轮事件处理
  function handleWheel(event) {
    event.preventDefault();

    if (event.deltaY > 0) {
      // 向下滚动：下一个日程
      if (currentIndex < totalCards - 1) {
        currentIndex++;
      }
    } else {
      // 向上滚动：上一个日程
      if (currentIndex > 0) {
        currentIndex--;
      }
    }

    updateDisplay();
  }

  // 键盘控制
  function handleKeyboard(event) {
    const info4Section = document.getElementById('info_part4');
    if (!info4Section) return;

    const rect = info4Section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (!inView) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) {
          currentIndex--;
          updateDisplay();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < totalCards - 1) {
          currentIndex++;
          updateDisplay();
        }
        break;
    }
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      updateDisplay();

      // 添加滚轮事件
      const wheelArea = document.querySelector('.wheel-area');
      if (wheelArea) {
        wheelArea.addEventListener('wheel', handleWheel);
      }

      const mainContainer = document.querySelector('.main-container');
      if (mainContainer) {
        mainContainer.addEventListener('wheel', handleWheel);
      }

      // 添加键盘事件
      document.addEventListener('keydown', handleKeyboard);

      console.log('春节日程卡片系统初始化完成');
    }, 100);
  });

  // 全局函数，供HTML中的onclick使用
  window.selectDay = selectDay;

})();

// ----------------------------------------------------------------------------------------------------------------------------------
// secondary-nav-bar-info-part6
const tabSwitcher = document.querySelector('.tab-switcher');
const tabItems = document.querySelectorAll('.tab-item');
const tabContents = document.querySelectorAll('.tab-content');

console.log('找到的标签数量:', tabItems.length);

// 2. 为每个导航标签添加事件监听器
tabItems.forEach(function (tab, index) {
  tab.addEventListener('click', function () {
    console.log('点击了标签:', tab.textContent, '索引:', index);

    // 3. 获取目标标签页ID
    const targetTabId = tab.getAttribute('data-tab');

    // 4. 移除所有元素的活跃状态
    tabItems.forEach(function (t) {
      t.classList.remove('active');
    });

    tabContents.forEach(function (content) {
      content.classList.remove('active');
    });

    // 5. 添加当前元素的活跃状态
    tab.classList.add('active');

    // 6. 更新滑动指示器位置
    tabSwitcher.setAttribute('data-active', index);
    console.log('滑块移动到位置:', index);

    // 7. 显示对应的内容
    const targetContent = document.getElementById(targetTabId);
    targetContent.classList.add('active');
  });
});

// =================== 扩展功能示例 ===================

// 函数式写法（更简洁）- 更新选择器
function switchToTab(tabId) {
  // 移除所有active类
  document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));

  // 添加对应的active类
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// 获取当前活跃标签 - 更新选择器
function getCurrentTab() {
  return document.querySelector('.tab-item.active').getAttribute('data-tab');
}

console.log('当前活跃标签:', getCurrentTab());

// ------------------------------------------------------------------------------------------------------------------------------

let innerScrollArea = null;

// 初始化
document.addEventListener('DOMContentLoaded', function () {
  innerScrollArea = document.querySelector('.inner-scroll-area');

  if (innerScrollArea) {
    innerScrollArea.addEventListener('scroll', handleInnerScroll);
    console.log('视频动画初始化完成');
  }
});

// 处理内部滚动
function handleInnerScroll() {
  const scrollTop = innerScrollArea.scrollTop;
  const scrollHeight = innerScrollArea.scrollHeight;
  const clientHeight = innerScrollArea.clientHeight;

  const maxScroll = scrollHeight - clientHeight;
  const progress = Math.min(scrollTop / maxScroll, 1);

  updateAnimation(progress);
  updateProgressBar(progress);

  document.getElementById('progress-text').textContent = Math.round(progress * 100) + '%';
}

// 更新动画
function updateAnimation(progress) {
  const videoContainer = document.querySelector('.video-container');
  const flexContainer = document.querySelector('.flex-container');

  if (progress <= 0.9) {
    // 前90%：视频从超大缩小到正常大小
    const scale = 3 - (progress * 2.7);

    videoContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
    videoContainer.style.opacity = '1';

    flexContainer.style.opacity = '0';
  } else {
    // 最后10%：切换到flex布局
    const fadeProgress = (progress - 0.9) / 0.1;

    videoContainer.style.opacity = 1 - fadeProgress;
    flexContainer.style.opacity = fadeProgress;
  }
}
