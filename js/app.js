// 主要应用逻辑
class EarthOnlineApp {
    constructor() {
        this.currentSection = 'home';
        this.data = {
            blogPosts: [],
            lifePosts: [],
            dailyPlans: [],
            stagePlans: [],
            books: [],
            videos: []
        };
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderCurrentSection();
        this.setupMobileMenu();
        this.loadAvatar(); // 加载保存的头像
        this.loadSkillLevels(); // 加载技能等级
    }

    // 加载数据
    loadData() {
        // 从localStorage加载数据
        const savedData = localStorage.getItem('earthOnlineData');
        if (savedData) {
            this.data = { ...this.data, ...JSON.parse(savedData) };
        } else {
            // 初始化示例数据
            this.initializeSampleData();
        }
    }

    // 保存数据
    saveData() {
        localStorage.setItem('earthOnlineData', JSON.stringify(this.data));
    }

    // 初始化示例数据
    initializeSampleData() {
        this.data.blogPosts = [
            {
                id: 1,
                title: '欢迎来到我的博客',
                content: `# 欢迎来到我的博客

这是我的第一篇博客文章，在这里我将分享我的想法、经验和学习心得。

## 关于我

我是一名热爱技术的开发者，喜欢探索新技术，分享学习经验。

## 技术栈

- **前端**: React, Vue, JavaScript
- **后端**: Node.js, Python, Java
- **数据库**: MongoDB, MySQL, PostgreSQL

希望这个博客能够帮助到更多的人！`,
                tags: ['介绍', '技术'],
                date: '2024-01-15',
                author: '博主'
            },
            {
                id: 2,
                title: 'JavaScript 异步编程详解',
                content: `# JavaScript 异步编程详解

异步编程是现代JavaScript开发中非常重要的概念。

## Promise

Promise是处理异步操作的标准方式：

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        resolve('成功！');
    }, 1000);
});
\`\`\`

## Async/Await

更现代的异步编程方式：

\`\`\`javascript
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('错误:', error);
    }
}
\`\`\``,
                tags: ['JavaScript', '异步编程'],
                date: '2024-01-10',
                author: '博主'
            }
        ];

        this.data.lifePosts = [
            {
                id: 1,
                title: '周末的咖啡时光',
                content: '今天在咖啡馆度过了一个美好的下午，阳光透过窗户洒在桌面上，感觉很温暖。',
                image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
                date: '2024-01-14'
            },
            {
                id: 2,
                title: '学习新技能',
                content: '今天开始学习React Hooks，感觉这个新特性真的很强大，让代码变得更加简洁。',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
                date: '2024-01-12'
            }
        ];

        this.data.dailyPlans = [
            {
                id: 1,
                title: '完成项目文档',
                description: '编写项目技术文档和用户手册',
                date: '2024-01-15',
                priority: 'high',
                completed: false
            },
            {
                id: 2,
                title: '学习React Hooks',
                description: '深入学习React Hooks的使用方法',
                date: '2024-01-15',
                priority: 'medium',
                completed: true
            }
        ];

        this.data.stagePlans = [
            {
                id: 1,
                title: '完成个人网站',
                description: '开发一个完整的个人文档网站',
                date: '2024-02-01',
                priority: 'high',
                completed: false
            },
            {
                id: 2,
                title: '学习机器学习',
                description: '系统学习机器学习基础知识',
                date: '2024-03-01',
                priority: 'medium',
                completed: false
            }
        ];

        this.data.books = [
            {
                id: 1,
                title: 'JavaScript高级程序设计',
                author: 'Nicholas C. Zakas',
                status: 'reading',
                notes: '正在学习ES6新特性'
            },
            {
                id: 2,
                title: 'React学习手册',
                author: 'Alex Banks',
                status: 'completed',
                notes: '很好的React入门书籍'
            }
        ];

        this.data.videos = [
            {
                id: 1,
                title: 'React Hooks 完全指南',
                url: 'https://www.youtube.com/watch?v=example1',
                platform: 'youtube',
                notes: '详细介绍了React Hooks的使用方法'
            },
            {
                id: 2,
                title: 'JavaScript异步编程',
                url: 'https://www.bilibili.com/video/example2',
                platform: 'bilibili',
                notes: '深入理解Promise和async/await'
            }
        ];

        this.saveData();
    }

    // 设置事件监听器
    setupEventListeners() {
        // 导航链接
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // 博客相关
        document.getElementById('uploadPostBtn')?.addEventListener('click', () => {
            this.showModal('uploadModal');
        });

        document.getElementById('uploadForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBlogPost();
        });

        // 生活记录相关
        document.getElementById('addLifePostBtn')?.addEventListener('click', () => {
            this.showModal('lifeModal');
        });

        document.getElementById('lifeForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addLifePost();
        });

        // 计划相关
        document.getElementById('addPlanBtn')?.addEventListener('click', () => {
            this.showModal('planModal');
        });

        document.getElementById('planForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPlan();
        });

        // 书籍相关
        document.getElementById('addBookBtn')?.addEventListener('click', () => {
            this.showModal('bookModal');
        });

        document.getElementById('bookForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBook();
        });

        // 视频相关
        document.getElementById('addVideoBtn')?.addEventListener('click', () => {
            this.showModal('videoModal');
        });

        document.getElementById('videoForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addVideo();
        });

        // 记录标签切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // 模态框关闭
        document.querySelectorAll('.close, .btn-secondary').forEach(element => {
            element.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.hideModal(modal.id);
                }
            });
        });

        // 点击模态框外部关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });

        // 计划类型切换
        document.getElementById('planType')?.addEventListener('change', (e) => {
            this.switchPlanType(e.target.value);
        });

        // 头像上传功能
        document.getElementById('avatarInput')?.addEventListener('change', (e) => {
            this.handleAvatarUpload(e);
        });

        // 技能等级调整功能
        this.setupSkillLevelAdjustment();
    }

    // 设置技能等级调整功能
    setupSkillLevelAdjustment() {
        document.querySelectorAll('.level-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.adjustSkillLevel(e.target);
            });
        });
    }

    // 调整技能等级
    adjustSkillLevel(clickedDot) {
        const skillBar = clickedDot.closest('.skill-bar');
        const dots = skillBar.querySelectorAll('.level-dot');
        const levelText = skillBar.querySelector('.level-text');
        const clickedLevel = parseInt(clickedDot.getAttribute('data-level'));
        
        // 更新所有点的状态
        dots.forEach((dot, index) => {
            const dotLevel = index + 1;
            if (dotLevel <= clickedLevel) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // 更新等级文本
        levelText.textContent = `${clickedLevel}/10`;
        
        // 保存到localStorage
        this.saveSkillLevels();
        
        // 显示通知
        this.showNotification(`技能等级已调整为 ${clickedLevel}/10`, 'success');
    }

    // 保存技能等级
    saveSkillLevels() {
        const skillLevels = {};
        document.querySelectorAll('.skill-bar').forEach(skillBar => {
            const skillName = skillBar.querySelector('span').textContent;
            const activeDots = skillBar.querySelectorAll('.level-dot.active').length;
            skillLevels[skillName] = activeDots;
        });
        localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
    }

    // 加载技能等级
    loadSkillLevels() {
        const savedLevels = localStorage.getItem('skillLevels');
        if (savedLevels) {
            const skillLevels = JSON.parse(savedLevels);
            document.querySelectorAll('.skill-bar').forEach(skillBar => {
                const skillName = skillBar.querySelector('span').textContent;
                const level = skillLevels[skillName] || 0;
                const dots = skillBar.querySelectorAll('.level-dot');
                const levelText = skillBar.querySelector('.level-text');
                
                dots.forEach((dot, index) => {
                    if (index < level) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
                
                levelText.textContent = `${level}/10`;
            });
        }
    }

    // 设置移动端菜单
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击导航链接后关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 导航到指定区域
    navigateToSection(section) {
        // 更新导航状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // 隐藏所有区域
        document.querySelectorAll('.section').forEach(s => {
            s.classList.remove('active');
        });

        // 显示目标区域
        document.getElementById(section).classList.add('active');
        this.currentSection = section;

        // 渲染当前区域内容
        this.renderCurrentSection();
    }

    // 渲染当前区域
    renderCurrentSection() {
        switch (this.currentSection) {
            case 'blog':
                this.renderBlogPosts();
                break;
            case 'life':
                this.renderLifePosts();
                break;
            case 'plans':
                this.renderPlans();
                break;
            case 'records':
                this.renderRecords();
                break;
        }
    }

    // 渲染博客文章
    renderBlogPosts() {
        const grid = document.getElementById('blogGrid');
        if (!grid) return;

        grid.innerHTML = this.data.blogPosts.map(post => `
            <div class="glass-card blog-post" onclick="app.showBlogPost(${post.id})">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                </div>
                <div class="post-excerpt">${post.content.substring(0, 150)}...</div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // 渲染生活记录
    renderLifePosts() {
        const grid = document.getElementById('lifeGrid');
        if (!grid) return;

        grid.innerHTML = this.data.lifePosts.map(post => `
            <div class="glass-card life-post">
                ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="post-meta">
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                </div>
            </div>
        `).join('');
    }

    // 渲染计划
    renderPlans() {
        this.renderDailyPlans();
        this.renderStagePlans();
    }

    renderDailyPlans() {
        const grid = document.getElementById('dailyPlansGrid');
        if (!grid) return;

        grid.innerHTML = this.data.dailyPlans.map(plan => `
            <div class="glass-card plan-item ${plan.completed ? 'completed' : ''}" onclick="app.togglePlanComplete(${plan.id}, 'daily')">
                <h4>${plan.title}</h4>
                <p>${plan.description}</p>
                <div class="plan-meta">
                    <span><i class="fas fa-calendar"></i> ${plan.date}</span>
                    <span class="plan-priority ${plan.priority}">${this.getPriorityText(plan.priority)}</span>
                </div>
            </div>
        `).join('');
    }

    renderStagePlans() {
        const grid = document.getElementById('stagePlansGrid');
        if (!grid) return;

        grid.innerHTML = this.data.stagePlans.map(plan => `
            <div class="glass-card plan-item ${plan.completed ? 'completed' : ''}" onclick="app.togglePlanComplete(${plan.id}, 'stage')">
                <h4>${plan.title}</h4>
                <p>${plan.description}</p>
                <div class="plan-meta">
                    <span><i class="fas fa-calendar"></i> ${plan.date}</span>
                    <span class="plan-priority ${plan.priority}">${this.getPriorityText(plan.priority)}</span>
                </div>
            </div>
        `).join('');
    }

    // 渲染记录
    renderRecords() {
        this.renderBooks();
        this.renderVideos();
    }

    renderBooks() {
        const grid = document.getElementById('booksGrid');
        if (!grid) return;

        grid.innerHTML = this.data.books.map(book => `
            <div class="glass-card book-item">
                <h4>${book.title}</h4>
                <p><strong>作者:</strong> ${book.author}</p>
                <span class="book-status ${book.status}">${this.getBookStatusText(book.status)}</span>
                ${book.notes ? `<p><strong>笔记:</strong> ${book.notes}</p>` : ''}
            </div>
        `).join('');
    }

    renderVideos() {
        const grid = document.getElementById('videosGrid');
        if (!grid) return;

        grid.innerHTML = this.data.videos.map(video => `
            <div class="glass-card video-item">
                <h4>${video.title}</h4>
                <span class="video-platform">${this.getPlatformText(video.platform)}</span>
                <p><a href="${video.url}" target="_blank">观看视频</a></p>
                ${video.notes ? `<p><strong>笔记:</strong> ${video.notes}</p>` : ''}
            </div>
        `).join('');
    }

    // 切换标签
    switchTab(tab) {
        // 更新标签按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // 更新内容区域
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tab).classList.add('active');
    }

    // 切换计划类型
    switchPlanType(type) {
        const dailyContainer = document.querySelector('.daily-plans');
        const stageContainer = document.querySelector('.stage-plans');

        if (type === 'daily') {
            dailyContainer.style.display = 'block';
            stageContainer.style.display = 'none';
        } else {
            dailyContainer.style.display = 'none';
            stageContainer.style.display = 'block';
        }
    }

    // 显示模态框
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // 隐藏模态框
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            // 清空表单
            const form = modal.querySelector('form');
            if (form) {
                form.reset();
            }
        }
    }

    // 添加博客文章
    addBlogPost() {
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const tags = document.getElementById('postTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);

        const post = {
            id: Date.now(),
            title,
            content,
            tags,
            date: new Date().toISOString().split('T')[0],
            author: '博主'
        };

        this.data.blogPosts.unshift(post);
        this.saveData();
        this.renderBlogPosts();
        this.hideModal('uploadModal');
        this.showNotification('文章发布成功！', 'success');
    }

    // 添加生活记录
    addLifePost() {
        const title = document.getElementById('lifeTitle').value;
        const content = document.getElementById('lifeContent').value;
        const image = document.getElementById('lifeImage').value;

        const post = {
            id: Date.now(),
            title,
            content,
            image,
            date: new Date().toISOString().split('T')[0]
        };

        this.data.lifePosts.unshift(post);
        this.saveData();
        this.renderLifePosts();
        this.hideModal('lifeModal');
        this.showNotification('生活记录添加成功！', 'success');
    }

    // 添加计划
    addPlan() {
        const title = document.getElementById('planTitle').value;
        const description = document.getElementById('planDescription').value;
        const date = document.getElementById('planDate').value;
        const priority = document.getElementById('planPriority').value;
        const type = document.getElementById('planType').value;

        const plan = {
            id: Date.now(),
            title,
            description,
            date,
            priority,
            completed: false
        };

        if (type === 'daily') {
            this.data.dailyPlans.unshift(plan);
        } else {
            this.data.stagePlans.unshift(plan);
        }

        this.saveData();
        this.renderPlans();
        this.hideModal('planModal');
        this.showNotification('计划添加成功！', 'success');
    }

    // 添加书籍
    addBook() {
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const status = document.getElementById('bookStatus').value;
        const notes = document.getElementById('bookNotes').value;

        const book = {
            id: Date.now(),
            title,
            author,
            status,
            notes
        };

        this.data.books.unshift(book);
        this.saveData();
        this.renderBooks();
        this.hideModal('bookModal');
        this.showNotification('书籍记录添加成功！', 'success');
    }

    // 添加视频
    addVideo() {
        const title = document.getElementById('videoTitle').value;
        const url = document.getElementById('videoUrl').value;
        const platform = document.getElementById('videoPlatform').value;
        const notes = document.getElementById('videoNotes').value;

        const video = {
            id: Date.now(),
            title,
            url,
            platform,
            notes
        };

        this.data.videos.unshift(video);
        this.saveData();
        this.renderVideos();
        this.hideModal('videoModal');
        this.showNotification('视频记录添加成功！', 'success');
    }

    // 切换计划完成状态
    togglePlanComplete(id, type) {
        const plans = type === 'daily' ? this.data.dailyPlans : this.data.stagePlans;
        const plan = plans.find(p => p.id === id);
        if (plan) {
            plan.completed = !plan.completed;
            this.saveData();
            this.renderPlans();
        }
    }

    // 显示博客文章详情
    showBlogPost(id) {
        const post = this.data.blogPosts.find(p => p.id === id);
        if (!post) return;

        // 创建文章详情模态框
        const modal = document.createElement('div');
        modal.className = 'modal article-modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="article-content">
                <div class="article-header">
                    <h1 class="article-title">${post.title}</h1>
                    <div class="article-meta">
                        <span><i class="fas fa-user"></i> ${post.author}</span>
                        <span><i class="fas fa-calendar"></i> ${post.date}</span>
                    </div>
                </div>
                <div class="article-body">
                    ${marked.parse(post.content)}
                </div>
                <div class="article-footer">
                    <div class="article-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 点击关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 工具方法
    getPriorityText(priority) {
        const texts = {
            high: '高',
            medium: '中',
            low: '低'
        };
        return texts[priority] || priority;
    }

    getBookStatusText(status) {
        const texts = {
            reading: '正在阅读',
            completed: '已完成',
            planning: '计划阅读'
        };
        return texts[status] || status;
    }

    getPlatformText(platform) {
        const texts = {
            youtube: 'YouTube',
            bilibili: 'Bilibili',
            other: '其他'
        };
        return texts[platform] || platform;
    }

    // 处理头像上传
    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // 检查文件类型
        if (!file.type.startsWith('image/')) {
            this.showNotification('请选择图片文件！', 'error');
            return;
        }

        // 检查文件大小（限制为5MB）
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('图片文件大小不能超过5MB！', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const avatarImage = document.getElementById('avatarImage');
            if (avatarImage) {
                avatarImage.src = e.target.result;
                // 保存到localStorage
                localStorage.setItem('userAvatar', e.target.result);
                this.showNotification('头像上传成功！', 'success');
            }
        };
        reader.readAsDataURL(file);
    }

    // 加载保存的头像
    loadAvatar() {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            const avatarImage = document.getElementById('avatarImage');
            if (avatarImage) {
                avatarImage.src = savedAvatar;
            }
        }
    }
}

// 初始化应用
const app = new EarthOnlineApp(); 