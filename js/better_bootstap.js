function setupSlider(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);

    const sync = () => display.textContent = slider.value;
    slider.addEventListener('input', sync);
    sync();
}

// 初始化三个滑块
setupSlider('contentRating', 'contentVal');
setupSlider('techniqueRating', 'techniqueVal');
setupSlider('designRating', 'designVal');

//------------------------------------------------------------------------------------------------------------------------------

const celebrities = [
    {
        name: "Professor Lee",
        avatar: "../images/lee.jpg",
        comments: [
            "This website is very well done!",
            "I truly appreciate the effort put into this design.",
            "Festivals are precious treasures of humanity."
        ]
    },
    {
        name: "Leader Wong Zhe Wei",
        avatar: "../images/professional.jpg",  // image from bilibili.com
        comments: [
            "Chinese New Year is truly wonderful!",
            "The cultural details here are impressive.",
            "This project really preserves our traditions."
        ]
    },
    {
        name: "Principal Ahmad",
        avatar: "../images/professional.jpg",
        comments: [
            "I enjoy how this site showcases festivals.",
            "This work connects generations together.",
            "A great way to celebrate our heritage!"
        ]
    },
    {
        name: "Lecturer Aung",
        avatar: "../images/aung.jpg",
        comments: [
            "The layout is neat and easy to use.",
            "Festivals bring joy and unity to everyone.",
            "Excellent presentation of our culture."
        ]
    },
    {
        name: "Chairman Moe",
        avatar: "../images/alex.jpg",
        comments: [
            "This site captures the festive spirit perfectly.",
            "I believe more people should see this.",
            "Chinese New Year celebrations are amazing!"
        ]
    },
    {
        name: "Expert Yu",
        avatar: "../images/yu.jpg",
        comments: [
            "Very informative and beautifully made.",
            "Festivals are part of our shared identity.",
            "The content is both engaging and meaningful."
        ]
    },
    {
        name: "Teacher Alex",
        avatar: "../images/alex.jpg",
        comments: [
            "Students can learn so much from this site.",
            "Cultural traditions should be passed down.",
            "Chinese New Year is a joy for the young and old."
        ]
    },
    {
        name: "Director Goh",
        avatar: "../images/aung.jpg",
        comments: [
            "User experience here is excellent.",
            "The design reflects the warmth of our festivals.",
            "Celebrations like these bring people together."
        ]
    }
];


const themes = ['', 'theme-blue', 'theme-green', 'theme-pink'];
let danmakuInterval;
let isPaused = false;

function getRandomCelebrity() {
    const celeb = celebrities[Math.floor(Math.random() * celebrities.length)];
    const comment = celeb.comments[Math.floor(Math.random() * celeb.comments.length)];
    return { ...celeb, currentComment: comment };
}

function createDanmaku() {
    const container = document.getElementById('danmakuContainer');
    const celebrity = getRandomCelebrity();

    const danmaku = document.createElement('div');
    danmaku.className = 'danmaku-item';


    // 随机选择主题
    const theme = themes[Math.floor(Math.random() * themes.length)];
    if (theme) danmaku.classList.add(theme);

    // 随机位置（垂直）
    const topPosition = Math.random() * (container.clientHeight - 80) + 60;
    danmaku.style.top = topPosition + 'px';

    danmaku.innerHTML = `
                <img class="avatar" src="${celebrity.avatar}" alt="${celebrity.name}">
                <div class="comment-text">
                    <span class="username">${celebrity.name}:</span>
                    ${celebrity.currentComment}
                </div>
            `;

    container.appendChild(danmaku);

    // 8秒后移除弹幕
    setTimeout(() => {
        if (danmaku.parentNode) {
            danmaku.parentNode.removeChild(danmaku);
        }
    }, 8000);
}

function startDanmaku() {
    if (danmakuInterval) clearInterval(danmakuInterval);
    danmakuInterval = setInterval(() => {
        if (!isPaused) {
            createDanmaku();
        }
    }, 1500); // 每1.5秒生成一条弹幕
}

function pauseDanmaku() {
    isPaused = true;
    const danmakus = document.querySelectorAll('.danmaku-item');
    danmakus.forEach(danmaku => {
        danmaku.style.animationPlayState = 'paused';
    });
}

function resumeDanmaku() {
    isPaused = false;
    const danmakus = document.querySelectorAll('.danmaku-item');
    danmakus.forEach(danmaku => {
        danmaku.style.animationPlayState = 'running';
    });
}

function addNewDanmaku() {
    createDanmaku();
}

// 页面加载完成后开始弹幕
window.addEventListener('load', () => {
    startDanmaku();
    // 立即创建几条弹幕
    setTimeout(() => createDanmaku(), 500);
    setTimeout(() => createDanmaku(), 1000);
});

// 页面可见性改变时暂停/恢复动画
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseDanmaku();
    } else {
        resumeDanmaku();
    }
});


//------------------------------------------------------------------------------------------------------------------------------

document.getElementById('fileInput1').addEventListener('change', function (e) {
    const files = Array.from(e.target.files);
    const display = document.getElementById('selectedFiles1');

    if (files.length > 0) {
        display.style.display = 'block';
        display.innerHTML = `
                    <strong>已选择 ${files.length} 个文件：</strong><br>
                    ${files.map(file => `📄 ${file.name} (${formatFileSize(file.size)})`).join('<br>')}
                `;
    } else {
        display.style.display = 'none';
    }
});

// 简单版本的文件名显示
function showFileName(input) {
    const display = document.getElementById('fileName');
    if (input.files.length > 0) {
        display.style.display = 'block';
        display.innerHTML = `✅ 已选择: ${input.files[0].name}`;
    } else {
        display.style.display = 'none'; 
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
//--------------------------------------------------------------------------------------------------------------------------------
const checkbox2 = document.getElementById('radio-button1');
const uploadBtns = document.querySelectorAll('.upload_btn');


checkbox2.addEventListener('change', function () {
    console.log('🔄 Switch:', checkbox2.checked);

    uploadBtns.forEach((btn, index) => {
        if (checkbox2.checked) {
            btn.classList.add('btn-visible');
            console.log(`✅ btn${index + 1}visible`);
        } else {
            btn.classList.remove('btn-visible');
            console.log(`❌ btn ${index + 1}hided`);
        }
    });
});

//--------------------------------------------------------------------------------------------------------------------------------
// 邮箱验证功能
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = `validation-message ${type} show`;
    }
}

// 邮箱输入验证
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('input', function () {
        const email = this.value;

        if (email === '') {
            document.getElementById('emailMessage').className = 'validation-message';
        } else if (validateEmail(email)) {
            showMessage('emailMessage', '✅ Email format is correct', 'success');
        } else {
            showMessage('emailMessage', '❌ Email format is not correct', 'error');
        }
    });
}


//-------------------------------------------------------------------------------------------------------------------------------------------------

const notRobotCheck = document.getElementById('notRobotCheck');
if (notRobotCheck) {
    notRobotCheck.addEventListener('change', function () {
        console.log('🔄 Robot Check:', this.checked);

        formValidation.notRobot = this.checked;

        if (this.checked) {
            showMessage('robotMessage', '✅ 人机验证通过', 'success');
        } else {
            showMessage('robotMessage', '❌ 请完成人机验证', 'error');
        }

    });
}

//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
// AI优化功能
//--------------------------------------------------------------------------------------------------------------------------------
// AI优化功能
document.addEventListener('DOMContentLoaded', function () {
    const refineBtn = document.getElementById('refineWithAI');
    if (refineBtn) {
        refineBtn.addEventListener('click', function () {
            const commentTextarea = document.getElementById('exampleFormControlTextarea1');
            const originalText = commentTextarea ? commentTextarea.value : '';

            if (!originalText.trim()) {
                // 显示输入提醒卡片
                showInputWarning();
                return;
            }

            // 显示加载动画
            const loadingDiv = document.getElementById('aiLoading');
            this.style.display = 'none';
            loadingDiv.style.display = 'block';

            // 模拟AI处理时间
            setTimeout(() => {
                // 隐藏加载动画
                loadingDiv.style.display = 'none';
                this.style.display = 'inline-block';

                // 显示警告模态框（替换alert）
                document.getElementById('aiModal').style.display = 'block';

                // 保留原文本
                if (commentTextarea) {
                    commentTextarea.value = originalText;
                }
            }, 3000);
        });
    }
});

// 关闭AI模态框
function closeAIModal() {
    document.getElementById('aiModal').style.display = 'none';
}

// 显示输入提醒
function showInputWarning() {
    // 创建临时提醒卡片
    const warningCard = document.createElement('div');
    warningCard.className = 'ai-modal';
    warningCard.innerHTML = `
        <div class="ai-modal-content">
            <div class="warning-icon">📝</div>
            <h4> please key in text </h4>
            <p> please key in some things before you use this function </p>
            <button type="button" class="btn btn-primary" onclick="this.closest('.ai-modal').remove()"> OK </button>
        </div>
    `;
    document.body.appendChild(warningCard);
    warningCard.style.display = 'block';
}

// 点击模态框外部关闭
window.addEventListener('click', function (event) {
    const modal = document.getElementById('aiModal');
    if (event.target === modal) {
        closeAIModal();
    }
});

//--------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认提交行为
            
            console.log('表单提交成功 - 期末作业演示');
            
            // 直接显示成功模态框
            showSubmitSuccess();
        });
    }
});

// 显示提交成功模态框
function showSubmitSuccess() {
    const modal = document.getElementById('submitSuccessModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// 重新填写表单（直接刷新页面）
function fillAnotherForm() {
    window.location.href = "form.html"; // 强制刷新，相当于全新表单
}

// 返回主页
function returnToHome() {
    window.location.href = "index.html"; // 跳转到主页
}