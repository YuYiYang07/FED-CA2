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
//-----------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const text = "Chinese New Year";
    const typingElement = document.getElementById('typing-text');
    let index = 0;
    
    // 添加光标类
    typingElement.classList.add('typing-cursor');
    
    function typeWriter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            // 随机速度让效果更自然
            const delay = Math.random() * 100 + 80; // 80-180ms随机间隔
            setTimeout(typeWriter, delay);
        } else {
            // 打字完成后移除光标
            setTimeout(() => {
                typingElement.classList.remove('typing-cursor');
            }, 2000);
        }
    }
    
    // 延迟开始，让页面加载完毕
    setTimeout(typeWriter, 1000);
});
//------------------------------------------------------------------------------------------------------------------------------
console.log("📦 index.js loaded");

// 简单的函数：更新卡片显示位置
function updateCardClasses() {
    console.log("🔄 更新卡片位置");
    
    // 获取所有轮播项目
    const cards = document.querySelectorAll('.carousel-item');
    let activeIndex = -1;

    // 找到当前显示的卡片（有active类的）
    cards.forEach((card, index) => {
        if (card.classList.contains('active')) {
            activeIndex = index;
        }
    });

    // 如果没找到active卡片，就不处理
    if (activeIndex === -1) {
        console.warn("没有找到活跃的卡片");
        return;
    }

    // 清除之前添加的自定义类
    cards.forEach(card => {
        card.classList.remove('show-left', 'show-right');
    });

    // 计算左边和右边卡片的位置
    const totalCards = cards.length;
    const leftIndex = (activeIndex - 1 + totalCards) % totalCards; // 前一张
    const rightIndex = (activeIndex + 1) % totalCards;            // 后一张

    // 给左右卡片添加特殊的类，让它们显示出来
    cards[leftIndex].classList.add('show-left');
    cards[rightIndex].classList.add('show-right');

    console.log(`当前活跃: ${activeIndex}, 左侧: ${leftIndex}, 右侧: ${rightIndex}`);
}

// 监听Bootstrap轮播的事件
const carousel = document.querySelector('#carouselExampleFade');

if (carousel) {
    // 当轮播切换完成后，更新卡片位置
    carousel.addEventListener('slid.bs.carousel', function() {
        // 稍微延迟一下，让Bootstrap的动画先完成
        setTimeout(updateCardClasses, 50);
    });
}

// 页面加载完成后，初始化卡片位置
document.addEventListener('DOMContentLoaded', function() {
    updateCardClasses();
});

// 如果页面已经加载完成了，直接运行
if (document.readyState === 'complete') {
    updateCardClasses();
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------