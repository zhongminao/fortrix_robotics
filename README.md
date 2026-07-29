# Fortrix Robotics 官网项目

这是 Fortrix Robotics 的官网项目，基于 Django 模板系统构建，当前包含 3 个页面：

- 首页：`/`
- 产品页：`/product/`
- 关于我们：`/about/`

项目已经接入公共页眉、公共页脚，以及页面级样式和交互脚本，适合继续维护官网内容、页眉导航和展示文案。

## 运行环境

推荐运行环境：

- Python `3.13.2`
- Django `6.0.7`
- SQLite `db.sqlite3`

## 快速启动

第一次使用时，按下面步骤启动：

```bash
git clone git@github.com:zhongminao/fortrix_robotics.git
cd fortrix_robotics
source ~/miniconda3/etc/profile.d/conda.sh
conda activate py313
python -m pip install "django==6.0.7"
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

启动后访问：

- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/product/`
- `http://127.0.0.1:8000/about/`

## 项目结构

```text
fortrix_robotics/
├─ manage.py
├─ fortrix_site/
│  ├─ settings.py
│  └─ urls.py
├─ templates/
│  ├─ base.html
│  ├─ home.html
│  ├─ product/index.html
│  ├─ about/index.html
│  └─ partials/
│     ├─ header.html
│     └─ footer.html
└─ static/
   ├─ css/
   ├─ js/
   └─ images/
```

## 每个文件负责什么

- `templates/base.html`
  所有页面共用的基础模板，统一引入页眉、页脚、公共 CSS 和公共 JS。
- `templates/partials/header.html`
  公共页眉，负责 Logo、导航项和不同页面的页眉 class。
- `static/css/header.css`
  公共页眉的基础样式。
- `static/js/header.js`
  公共页眉的滚动逻辑，例如滚动后变实底、向下滚动时隐藏页眉。
- `templates/home.html` + `static/css/home.css`
  首页内容和首页样式。
- `templates/product/index.html` + `static/css/product.css` + `static/js/product.js`
  产品页内容、样式和交互。
- `templates/about/index.html` + `static/css/about.css` + `static/js/about.js`
  关于我们页面内容、样式和交互，其中 `about.js` 还会控制 about 页眉在不同区域的视觉切换。

## 常见修改入口

如果你是来改内容，通常从这些文件开始：

- 改页眉导航或 Logo：`templates/partials/header.html`
- 改页眉通用样式：`static/css/header.css`
- 改首页内容：`templates/home.html`
- 改产品页内容：`templates/product/index.html`
- 改关于我们内容：`templates/about/index.html`
- 改 about 页面专属页眉效果：`static/css/about.css` 和 `static/js/about.js`

## 路由说明

当前路由定义在 `fortrix_site/urls.py`，只有 3 条：

- `""` -> `templates/home.html`
- `"product/"` -> `templates/product/index.html`
- `"about/"` -> `templates/about/index.html`

如果你后面新增页面，需要同时补这两部分：

1. 在 `fortrix_site/urls.py` 增加路由
2. 在 `templates/partials/header.html` 里补导航入口

## 开发前建议

- 当前 `DEBUG = True`，`ALLOWED_HOSTS = ["*"]`，适合开发环境，不适合直接作为生产配置。
- 项目默认使用 SQLite，生产环境建议切换数据库和静态资源部署方案。
- 修改完成后，至少运行一次检查：

```bash
python manage.py check
```
