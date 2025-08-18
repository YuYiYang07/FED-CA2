document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 导航栏脚本开始执行');

    // 获取当前页面文件名
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('📍 当前页面:', currentPage);

    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('🔗 找到导航链接数量:', navLinks.length);

    // 1. 首先清除所有激活状态
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        console.log('🧹 清除激活状态:', link.textContent.trim());
    });

    // 2. 然后根据当前页面设置正确的激活状态
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        let shouldActivate = false;

        // 详细的页面匹配逻辑
        if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
            // 首页情况
            if (href === 'index.html') {
                shouldActivate = true;
            }
        } else if (currentPage === 'info.html') {
            // 信息页面
            if (href === 'info.html') {
                shouldActivate = true;
            }
        } else if (currentPage === 'form.html') {
            // 表单页面 - 这是你缺少的！
            if (href === 'form.html') {
                shouldActivate = true;
            }
        }

        // 激活匹配的链接
        if (shouldActivate) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            console.log('✅ 激活导航:', link.textContent.trim(), '- 链接:', href);
        }
    });

    console.log('✨ 导航栏状态更新完成');
});
