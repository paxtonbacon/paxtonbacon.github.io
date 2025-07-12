# EarthOnline - 个人文档网站

一个现代化的个人文档管理平台，采用半透明浮窗式设计，提供完整的个人内容管理功能。

## 🌟 特性

### 🎨 设计特色
- **半透明浮窗式设计** - 采用现代化的玻璃拟态效果
- **响应式布局** - 完美适配桌面端和移动端
- **深色主题支持** - 可切换明暗主题
- **流畅动画** - 丰富的交互动画效果

### 📝 功能模块

#### 1. 主页区
- **个人介绍** - 展示个人信息和统计数据
- **能力分析** - 技能进度条可视化展示
- **个人版面** - 作品集项目展示

#### 2. 博客区
- **Markdown支持** - 直接上传Markdown文档
- **文章管理** - 创建、编辑、删除文章
- **标签系统** - 文章分类和标签管理
- **搜索功能** - 全文搜索和过滤
- **评论系统** - 文章评论功能

#### 3. 生活记录区
- **图文帖子** - 支持图片和文字的生活记录
- **时间线视图** - 按时间顺序展示记录
- **网格视图** - 卡片式展示模式

#### 4. 计划区
- **日常计划** - 每日任务管理
- **阶段计划** - 长期目标规划
- **优先级管理** - 高、中、低优先级设置
- **完成状态** - 计划完成状态跟踪

#### 5. 阅读记录区
- **书籍管理** - 阅读状态和笔记记录
- **视频记录** - 观看记录和平台链接
- **社交账号** - 外部平台链接管理

### 🔧 技术特性
- **数据导出/导入** - JSON格式数据备份
- **本地存储** - 数据持久化保存
- **搜索过滤** - 智能内容搜索
- **主题切换** - 明暗主题切换
- **移动端适配** - 响应式设计

## 🚀 快速开始

### 环境要求
- 现代浏览器（支持ES6+）
- 本地服务器（推荐）

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/EarthOnline.git
cd EarthOnline
```

2. **启动本地服务器**
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx serve .

# 或使用PHP
php -S localhost:8000
```

3. **访问网站**
打开浏览器访问 `http://localhost:8000`

### 配置说明

编辑 `config.yml` 文件来自定义网站内容：

```yaml
# 个人资料设置
profile:
  name: "您的姓名"
  title: "您的职业"
  description: "个人简介"

# 社交账号
social:
  github:
    url: "https://github.com/your-username"
```

## 📁 项目结构

```
EarthOnline/
├── index.html          # 主页面
├── config.yml          # 配置文件
├── README.md           # 项目说明
├── css/
│   ├── style.css       # 主样式文件
│   └── components.css  # 组件样式
├── js/
│   ├── app.js          # 主应用逻辑
│   └── components.js   # 组件功能
└── assets/             # 静态资源
    ├── images/
    └── icons/
```

## 🎯 使用指南

### 添加博客文章
1. 点击"博客"区域
2. 点击"上传文章"按钮
3. 填写标题、内容（支持Markdown）
4. 添加标签
5. 点击"发布文章"

### 管理计划
1. 进入"计划"区域
2. 选择计划类型（日常/阶段）
3. 点击"添加计划"
4. 设置标题、描述、日期、优先级
5. 点击计划卡片可标记完成状态

### 记录生活
1. 进入"生活记录"区域
2. 点击"添加记录"
3. 填写标题、内容、图片URL
4. 支持网格视图和时间线视图切换

### 管理阅读记录
1. 进入"阅读记录"区域
2. 选择"书籍阅读"或"视频观看"标签
3. 添加相应的记录信息
4. 可添加阅读/观看笔记

## 🔧 自定义配置

### 主题颜色
在 `config.yml` 中修改主题设置：

```yaml
theme:
  primary_color: "#6366f1"
  secondary_color: "#8b5cf6"
  accent_color: "#06b6d4"
```

### 功能开关
控制各种功能的启用状态：

```yaml
features:
  search: true
  filters: true
  export: true
  import: true
  dark_mode: true
```

### 数据备份
网站支持数据导出和导入：

1. **导出数据** - 点击各区域的导出按钮
2. **导入数据** - 点击导入按钮选择JSON文件
3. **自动备份** - 数据自动保存到本地存储

## 🎨 样式定制

### CSS变量
主要样式变量定义在 `css/style.css` 中：

```css
:root {
  --primary-color: #6366f1;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}
```

### 玻璃效果
玻璃拟态效果的核心样式：

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}
```

## 📱 移动端适配

网站完全响应式设计，支持：
- 触摸友好的交互
- 移动端优化的导航菜单
- 适配不同屏幕尺寸的布局
- 移动端专用的组件样式

## 🔒 数据安全

- 所有数据存储在浏览器本地
- 支持数据导出备份
- 输入内容自动过滤XSS攻击
- 不向外部服务器发送数据

## 🚀 部署

### GitHub Pages
1. 将项目推送到GitHub
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源

### 其他平台
- **Netlify** - 拖拽部署
- **Vercel** - 自动部署
- **传统服务器** - 上传文件到Web目录

## 🤝 贡献

欢迎提交Issue和Pull Request！

### 开发环境
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 创建Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Font Awesome](https://fontawesome.com/) - 图标库
- [Marked](https://marked.js.org/) - Markdown解析器
- [Unsplash](https://unsplash.com/) - 示例图片

## 📞 联系

- 项目地址：https://github.com/your-username/EarthOnline
- 问题反馈：https://github.com/your-username/EarthOnline/issues
- 邮箱：your.email@example.com

---

⭐ 如果这个项目对您有帮助，请给它一个星标！ 
