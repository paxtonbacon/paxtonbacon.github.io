// 组件专用功能

// 搜索功能
class SearchComponent {
    constructor() {
        this.setupSearch();
    }

    setupSearch() {
        // 为博客区域添加搜索功能
        const blogSection = document.getElementById('blog');
        if (blogSection) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            searchContainer.innerHTML = `
                <i class="fas fa-search search-icon"></i>
                <input type="text" class="search-input" placeholder="搜索博客文章..." id="blogSearch">
            `;
            
            const sectionHeader = blogSection.querySelector('.section-header');
            if (sectionHeader) {
                sectionHeader.insertBefore(searchContainer, sectionHeader.firstChild);
            }

            // 搜索功能
            const searchInput = document.getElementById('blogSearch');
            searchInput?.addEventListener('input', (e) => {
                this.searchBlogPosts(e.target.value);
            });
        }
    }

    searchBlogPosts(query) {
        const grid = document.getElementById('blogGrid');
        if (!grid || !app) return;

        const filteredPosts = app.data.blogPosts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        grid.innerHTML = filteredPosts.map(post => `
            <div class="glass-card blog-post" onclick="app.showBlogPost(${post.id})">
                <button class="delete-btn" onclick="event.stopPropagation(); app.deleteBlogPost(${post.id})" title="删除文章"><i class="fas fa-trash"></i></button>
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }
}

// 过滤器组件
class FilterComponent {
    constructor() {
        this.setupFilters();
    }

    setupFilters() {
        // 为博客区域添加过滤器
        const blogSection = document.getElementById('blog');
        if (blogSection) {
            // 创建第二行筛选器容器
            const filterRow = document.createElement('div');
            filterRow.className = 'filter-row';
            filterRow.innerHTML = `
                <div class="filter-module">
                    <div class="filter-select-container">
                        <select class="filter-select" data-module="技术">
                            <option value="">技术</option>
                            <option value="算法">算法</option>
                            <option value="工程">工程</option>
                            <option value="hacker">hacker</option>
                            <option value="编程">编程</option>
                            <option value="数学">数学</option>
                        </select>
                    </div>
                </div>
                <div class="filter-module">
                    <div class="filter-select-container">
                        <select class="filter-select" data-module="爱好">
                            <option value="">爱好</option>
                            <option value="创造世界">创造世界</option>
                            <option value="读书">读书</option>
                            <option value="交友">交友</option>
                        </select>
                    </div>
                </div>
                <div class="filter-module">
                    <div class="filter-select-container">
                        <select class="filter-select" data-module="认识">
                            <option value="">认识</option>
                            <option value="世界">世界</option>
                            <option value="健身">健身</option>
                            <option value="英语">英语</option>
                            <option value="底线">底线</option>
                        </select>
                    </div>
                </div>
                <div class="filter-module">
                    <div class="filter-select-container">
                        <select class="filter-select" data-module="散聊">
                            <option value="">散聊</option>
                            <option value="散聊">散聊</option>
                        </select>
                    </div>
                </div>
                <div class="filter-module">
                    <button class="filter-btn filter-btn-all active" data-filter="all">全部</button>
                </div>
                <div class="filter-module timeline-btn-module">
                    <button class="filter-btn timeline-btn" id="timelineViewBtn"><i class="fas fa-stream"></i> 时间线显示</button>
                </div>
            `;
            
            // 将筛选器插入到博客网格之前
            const blogGrid = blogSection.querySelector('#blogGrid');
            if (blogGrid) {
                blogGrid.parentNode.insertBefore(filterRow, blogGrid);
            }

            // 下拉框筛选功能
            filterRow.addEventListener('change', (e) => {
                if (e.target.classList.contains('filter-select')) {
                    const selectedValue = e.target.value;
                    const currentModule = e.target.getAttribute('data-module');
                    
                    // 如果选择了某个值
                    if (selectedValue) {
                        // 清除"全部"按钮的选中状态
                        filterRow.querySelector('.filter-btn-all').classList.remove('active');
                        
                        // 清除其他模块的选择
                        filterRow.querySelectorAll('.filter-select').forEach(select => {
                            if (select !== e.target) {
                                select.value = '';
                            }
                        });
                        
                        // 过滤文章
                        this.filterBlogPosts(selectedValue);
                        this.showBlogGrid();
                    } else {
                        // 如果清空了选择，显示全部
                        filterRow.querySelector('.filter-btn-all').classList.add('active');
                        this.filterBlogPosts('all');
                        this.showBlogGrid();
                    }
                }
            });

            // "全部"按钮功能
            filterRow.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn-all')) {
                    // 清除所有下拉框的选择
                    filterRow.querySelectorAll('.filter-select').forEach(select => {
                        select.value = '';
                    });
                    
                    // 清除所有选中状态
                    filterRow.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    
                    // 显示所有文章
                    this.filterBlogPosts('all');
                    this.showBlogGrid();
                }
            });

            // 时间线显示按钮功能
            const timelineBtn = filterRow.querySelector('#timelineViewBtn');
            if (timelineBtn) {
                timelineBtn.addEventListener('click', () => {
                    this.renderTimelineView();
                });
            }
        }
    }

    showBlogGrid() {
        // 显示博客网格，隐藏时间线
        const grid = document.getElementById('blogGrid');
        let timeline = document.getElementById('blogTimeline');
        if (grid) grid.style.display = '';
        if (timeline) timeline.style.display = 'none';
    }

    renderTimelineView() {
        const blogSection = document.getElementById('blog');
        let timeline = document.getElementById('blogTimeline');
        const grid = document.getElementById('blogGrid');
        if (grid) grid.style.display = 'none';
        if (!timeline) {
            timeline = document.createElement('div');
            timeline.id = 'blogTimeline';
            timeline.className = 'blog-timeline';
            blogSection.appendChild(timeline);
        }
        timeline.style.display = '';
        // 获取所有文章，按时间倒序
        let posts = app.data.blogPosts.slice();
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        // 渲染时间线
        timeline.innerHTML = posts.map(post => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${post.date}</div>
                    <div class="timeline-title"><a href="javascript:void(0)" onclick="app.showBlogPost(${post.id})">${post.title}</a></div>
                </div>
            </div>
        `).join('');
    }

    filterBlogPosts(filter) {
        const grid = document.getElementById('blogGrid');
        if (!grid || !app) return;

        let filteredPosts;
        if (filter === 'all') {
            filteredPosts = app.data.blogPosts;
        } else {
            filteredPosts = app.data.blogPosts.filter(post => 
                post.tags.some(tag => tag.includes(filter))
            );
        }

        grid.innerHTML = filteredPosts.map(post => `
            <div class="glass-card blog-post" onclick="app.showBlogPost(${post.id})">
                <button class="delete-btn" onclick="event.stopPropagation(); app.deleteBlogPost(${post.id})" title="删除文章"><i class="fas fa-trash"></i></button>
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }
}

// 统计组件
class StatsComponent {
    constructor() {
        this.setupStats();
    }

    setupStats() {
        // 为主页添加统计卡片
        const homeSection = document.getElementById('home');
        if (homeSection) {
            const statsContainer = document.createElement('div');
            statsContainer.className = 'stats-grid';
            statsContainer.innerHTML = `
                <div class="glass-card stat-card">
                    <div class="stat-card-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="stat-card-number" id="blogCount">0</div>
                    <div class="stat-card-label">博客文章</div>
                </div>
                <div class="glass-card stat-card">
                    <div class="stat-card-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="stat-card-number" id="lifeCount">0</div>
                    <div class="stat-card-label">生活记录</div>
                </div>
                <div class="glass-card stat-card">
                    <div class="stat-card-icon">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="stat-card-number" id="planCount">0</div>
                    <div class="stat-card-label">计划总数</div>
                </div>
                <div class="glass-card stat-card">
                    <div class="stat-card-icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="stat-card-number" id="bookCount">0</div>
                    <div class="stat-card-label">阅读记录</div>
                </div>
            `;
            
            const container = homeSection.querySelector('.container');
            if (container) {
                container.insertBefore(statsContainer, container.firstChild);
            }

            this.updateStats();
        }
    }

    updateStats() {
        if (!app) return;

        const blogCount = document.getElementById('blogCount');
        const lifeCount = document.getElementById('lifeCount');
        const planCount = document.getElementById('planCount');
        const bookCount = document.getElementById('bookCount');

        if (blogCount) blogCount.textContent = app.data.blogPosts.length;
        if (lifeCount) lifeCount.textContent = app.data.lifePosts.length;
        if (planCount) planCount.textContent = app.data.dailyPlans.length + app.data.stagePlans.length;
        if (bookCount) bookCount.textContent = app.data.books.length + app.data.videos.length;
    }
}

// 时间线组件
class TimelineComponent {
    constructor() {
        this.setupTimeline();
    }

    setupTimeline() {
        // 为生活记录区域添加时间线视图
        const lifeSection = document.getElementById('life');
        if (lifeSection) {
            const timelineContainer = document.createElement('div');
            timelineContainer.className = 'timeline';
            timelineContainer.id = 'lifeTimeline';
            
            const sectionHeader = lifeSection.querySelector('.section-header');
            if (sectionHeader) {
                const viewToggle = document.createElement('div');
                viewToggle.className = 'view-toggle';
                viewToggle.innerHTML = `
                    <button class="btn btn-secondary" id="gridView">网格视图</button>
                    <button class="btn btn-secondary" id="timelineView">时间线视图</button>
                `;
                sectionHeader.appendChild(viewToggle);

                // 视图切换
                document.getElementById('gridView')?.addEventListener('click', () => {
                    this.switchToGridView();
                });

                document.getElementById('timelineView')?.addEventListener('click', () => {
                    this.switchToTimelineView();
                });
            }
        }
    }

    switchToGridView() {
        const lifeGrid = document.getElementById('lifeGrid');
        const timeline = document.getElementById('lifeTimeline');
        
        if (lifeGrid && timeline) {
            lifeGrid.style.display = 'grid';
            timeline.style.display = 'none';
        }
    }

    switchToTimelineView() {
        const lifeGrid = document.getElementById('lifeGrid');
        const timeline = document.getElementById('lifeTimeline');
        
        if (lifeGrid && timeline && app) {
            lifeGrid.style.display = 'none';
            timeline.style.display = 'block';
            
            // 按日期排序
            const sortedPosts = [...app.data.lifePosts].sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );

            timeline.innerHTML = sortedPosts.map(post => `
                <div class="timeline-item">
                    <div class="timeline-content glass-card">
                        <div class="timeline-date">${post.date}</div>
                        <div class="timeline-title">${post.title}</div>
                        <div class="timeline-description">${post.content}</div>
                        ${post.image ? `<img src="${post.image}" alt="${post.title}" style="width: 100%; border-radius: 8px; margin-top: 10px;">` : ''}
                    </div>
                </div>
            `).join('');
        }
    }
}

// 导出功能
class ExportComponent {
    constructor() {
        this.setupExport();
    }

    setupExport() {
        // 添加导出按钮到各个区域
        this.addExportButton('blog', '导出博客数据');
        this.addExportButton('life', '导出生活记录');
        this.addExportButton('plans', '导出计划数据');
        this.addExportButton('records', '导出阅读记录');
    }

    addExportButton(sectionId, buttonText) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionHeader = section.querySelector('.section-header');
            if (sectionHeader) {
                const exportBtn = document.createElement('button');
                exportBtn.className = 'btn btn-secondary';
                exportBtn.innerHTML = `<i class="fas fa-download"></i> ${buttonText}`;
                exportBtn.addEventListener('click', () => {
                    this.exportData(sectionId);
                });
                sectionHeader.appendChild(exportBtn);
            }
        }
    }

    exportData(sectionId) {
        if (!app) return;

        let data;
        let filename;

        switch (sectionId) {
            case 'blog':
                data = app.data.blogPosts;
                filename = 'blog-posts.json';
                break;
            case 'life':
                data = app.data.lifePosts;
                filename = 'life-posts.json';
                break;
            case 'plans':
                data = {
                    daily: app.data.dailyPlans,
                    stage: app.data.stagePlans
                };
                filename = 'plans.json';
                break;
            case 'records':
                data = {
                    books: app.data.books,
                    videos: app.data.videos
                };
                filename = 'records.json';
                break;
            default:
                return;
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        app.showNotification('数据导出成功！', 'success');
    }
}

// 导入功能
class ImportComponent {
    constructor() {
        this.setupImport();
    }

    setupImport() {
        // 添加导入按钮到各个区域
        this.addImportButton('blog', '导入博客数据');
        this.addImportButton('life', '导入生活记录');
        this.addImportButton('plans', '导入计划数据');
        this.addImportButton('records', '导入阅读记录');
    }

    addImportButton(sectionId, buttonText) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionHeader = section.querySelector('.section-header');
            if (sectionHeader) {
                const importBtn = document.createElement('button');
                importBtn.className = 'btn btn-secondary';
                importBtn.innerHTML = `<i class="fas fa-upload"></i> ${buttonText}`;
                importBtn.addEventListener('click', () => {
                    this.importData(sectionId);
                });
                sectionHeader.appendChild(importBtn);
            }
        }
    }

    importData(sectionId) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        this.processImportedData(sectionId, data);
                    } catch (error) {
                        app.showNotification('文件格式错误！', 'error');
                    }
                };
                reader.readAsText(file);
            }
        });
        input.click();
    }

    processImportedData(sectionId, data) {
        if (!app) return;

        switch (sectionId) {
            case 'blog':
                app.data.blogPosts = [...app.data.blogPosts, ...data];
                break;
            case 'life':
                app.data.lifePosts = [...app.data.lifePosts, ...data];
                break;
            case 'plans':
                if (data.daily) app.data.dailyPlans = [...app.data.dailyPlans, ...data.daily];
                if (data.stage) app.data.stagePlans = [...app.data.stagePlans, ...data.stage];
                break;
            case 'records':
                if (data.books) app.data.books = [...app.data.books, ...data.books];
                if (data.videos) app.data.videos = [...app.data.videos, ...data.videos];
                break;
        }

        app.saveData();
        app.renderCurrentSection();
        app.showNotification('数据导入成功！', 'success');
    }
}

// 主题切换组件
class ThemeComponent {
    constructor() {
        this.setupThemeToggle();
    }

    setupThemeToggle() {
        // 添加主题切换按钮到导航栏
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            const themeBtn = document.createElement('button');
            themeBtn.className = 'btn btn-secondary theme-toggle';
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
            navContainer.appendChild(themeBtn);
        }

        // 加载保存的主题
        this.loadTheme();
    }

    toggleTheme() {
        const body = document.body;
        const themeBtn = document.querySelector('.theme-toggle i');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            themeBtn.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            themeBtn.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeBtn = document.querySelector('.theme-toggle i');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeBtn) themeBtn.className = 'fas fa-sun';
        }
    }
}

// 初始化所有组件
document.addEventListener('DOMContentLoaded', () => {
    // 等待主应用初始化完成
    setTimeout(() => {
        new SearchComponent();
        new FilterComponent();
        new StatsComponent();
        new TimelineComponent();
        new ExportComponent();
        new ImportComponent();
        new ThemeComponent();
    }, 100);
});

// 添加深色主题样式
const darkThemeStyles = `
    .dark-theme {
        background: var(--dark-bg) !important;
        color: var(--dark-text-primary) !important;
    }
    
    .dark-theme .navbar {
        background: var(--dark-glass-bg) !important;
        border-bottom-color: var(--dark-glass-border) !important;
    }
    
    .dark-theme .nav-link {
        color: var(--dark-text-primary) !important;
    }
    
    .dark-theme .nav-link:hover,
    .dark-theme .nav-link.active {
        background: var(--dark-glass-bg) !important;
    }
    
    .dark-theme .section-title {
        color: var(--dark-text-primary) !important;
    }
    
    .dark-theme .glass-card {
        background: var(--dark-glass-bg) !important;
        border-color: var(--dark-glass-border) !important;
    }
    
    .dark-theme .glass-card::before {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
    }
    
    .dark-theme .btn-secondary {
        background: var(--dark-glass-bg) !important;
        color: var(--dark-text-primary) !important;
        border-color: var(--dark-glass-border) !important;
    }
    
    .dark-theme .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1) !important;
    }
    
    .dark-theme .profile-name,
    .dark-theme .skill-card h3,
    .dark-theme .portfolio-item h3,
    .dark-theme .blog-post h3,
    .dark-theme .life-post h3,
    .dark-theme .plans-container h3,
    .dark-theme .plan-item h4,
    .dark-theme .book-item h4,
    .dark-theme .video-item h4,
    .dark-theme .social-card h4,
    .dark-theme .modal-header h3,
    .dark-theme .stat-card-number,
    .dark-theme .timeline-title {
        color: var(--dark-text-primary) !important;
    }
    
    .dark-theme .profile-title,
    .dark-theme .profile-description,
    .dark-theme .stat-label,
    .dark-theme .skill-bar span,
    .dark-theme .portfolio-item p,
    .dark-theme .tag,
    .dark-theme .blog-post .post-meta,
    .dark-theme .blog-post .post-excerpt,
    .dark-theme .life-post p,
    .dark-theme .plan-item p,
    .dark-theme .plan-meta,
    .dark-theme .book-item p,
    .dark-theme .video-item p,
    .dark-theme .social-card p,
    .dark-theme .close,
    .dark-theme .form-group label,
    .dark-theme .form-group input,
    .dark-theme .form-group textarea,
    .dark-theme .form-group select,
    .dark-theme .footer,
    .dark-theme .timeline-date,
    .dark-theme .timeline-description {
        color: var(--dark-text-secondary) !important;
    }
    
    .dark-theme .form-group input,
    .dark-theme .form-group textarea,
    .dark-theme .form-group select,
    .dark-theme .plan-select,
    .dark-theme .tab-btn {
        background: var(--dark-glass-bg) !important;
        border-color: var(--dark-glass-border) !important;
    }
    
    .dark-theme .close:hover {
        color: var(--dark-text-primary) !important;
    }
    
    .dark-theme .form-group input:focus,
    .dark-theme .form-group textarea:focus,
    .dark-theme .form-group select:focus {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
    }
    
    .dark-theme .timeline::before {
        background: var(--dark-glass-border) !important;
    }
    
    .dark-theme .timeline-item::before {
        border-color: var(--dark-glass-bg) !important;
    }
    
    .dark-theme .timeline-content {
        background: var(--dark-glass-bg) !important;
        border-color: var(--dark-glass-border) !important;
    }
    
    .dark-theme .tooltip .tooltiptext {
        background: var(--dark-glass-bg) !important;
        color: var(--dark-text-primary) !important;
        border-color: var(--dark-glass-border) !important;
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = darkThemeStyles;
document.head.appendChild(styleSheet); 