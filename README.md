# Fortrix Robotics 官网项目

这是 Fortrix Robotics 的官网项目，基于 Django 模板系统构建。当前项目更接近一个轻量官网原型：Django 负责路由和模板渲染，页面内容、样式和少量交互主要分布在 `templates/`、`static/css/`、`static/js/` 与 `static/images/` 中。

项目当前已包含首页、产品页、关于我们、团队人物详情页和加入我们页面；导航中的「核心技术」和「新闻资讯」还处于占位状态，后续可继续补齐独立页面。

## 运行环境

推荐运行环境：

- Python `3.13.2`
- Conda 环境 `py313`
- Django `6.0.7`
- SQLite `db.sqlite3`

当前项目没有单独的 `requirements.txt` 或 `pyproject.toml`，首次部署时需要手动安装 Django。

## 快速启动

```bash
git clone git@github.com:zhongminao/fortrix_robotics.git
cd fortrix_robotics
source ~/miniconda3/etc/profile.d/conda.sh
conda activate py313
python -m pip install "django==6.0.7"
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

## 临时 cpolar 访问保护

临时把端口暴露到公网时，可以开启一层 HTTP Basic Auth 外壳。它不改页面内容，默认关闭，只在设置环境变量时启用。

```bash
source ~/miniconda3/etc/profile.d/conda.sh
conda activate py313
export FORTRIX_BASIC_AUTH_ENABLED=true
export FORTRIX_BASIC_AUTH_USERNAME=fortrix
export FORTRIX_BASIC_AUTH_PASSWORD='change-this-password'
python manage.py runserver 0.0.0.0:8000
```

关闭保护时，去掉这些 `FORTRIX_BASIC_AUTH_*` 环境变量，或设置：

```bash
export FORTRIX_BASIC_AUTH_ENABLED=false
```

启动后访问：

- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/product/`
- `http://127.0.0.1:8000/about/`
- `http://127.0.0.1:8000/join/`

## 当前页面与路由

| 路由 | 模板 | 页面状态 |
| --- | --- | --- |
| `/` | `templates/home.html` | 首页 Hero，文案聚焦「具身智能时代的机器人创新者」 |
| `/product/` | `templates/product/index.html` | Robosweeper P1 产品页，包含产品介绍、优势、应用场景、核心技术能力和产品参数 |
| `/about/` | `templates/about/index.html` | 关于我们 / Founder Team 页面，展示团队能力与 6 位核心成员入口 |
| `/about/people/xu-chao.html` | `templates/about/people/xu-chao.html` | 许超详情页 |
| `/about/people/ye-bo.html` | `templates/about/people/ye-bo.html` | 叶波详情页 |
| `/about/people/ren-zhigang.html` | `templates/about/people/ren-zhigang.html` | 任志刚详情页 |
| `/about/people/fang-qiang.html` | `templates/about/people/fang-qiang.html` | 方强详情页 |
| `/about/people/chen-peng.html` | `templates/about/people/chen-peng.html` | 陈鹏详情页 |
| `/about/people/jin-yuzhe.html` | `templates/about/people/jin-yuzhe.html` | 金昱哲详情页 |
| `/about/photo_log.txt` | `templates/about/photo_log.txt` | 关于页图片素材记录 |
| `/join/` | `templates/join/index.html` | 加入我们页面，岗位、投递入口和附录链接仍是占位内容 |

所有路由当前都定义在 `fortrix_site/urls.py`，主要通过 `TemplateView` 直接渲染静态模板。

## 项目结构

```text
fortrix_robotics/
├─ manage.py
├─ db.sqlite3
├─ fortrix_site/
│  ├─ settings.py
│  ├─ urls.py
│  ├─ asgi.py
│  └─ wsgi.py
├─ templates/
│  ├─ base.html
│  ├─ home.html
│  ├─ product/index.html
│  ├─ about/index.html
│  ├─ about/people/
│  ├─ join/index.html
│  └─ partials/
│     ├─ header.html
│     └─ footer.html
└─ static/
   ├─ css/
   ├─ js/
   └─ images/
      ├─ branding/
      ├─ home/
      ├─ product/
      ├─ about/
      ├─ founder-team/
      └─ join/
```

## 文件职责

- `fortrix_site/settings.py`
  Django 基础配置，包含模板目录、静态资源目录、SQLite 数据库、语言和时区配置。
- `fortrix_site/urls.py`
  官网所有页面路由，目前没有业务 app，主要使用 `TemplateView` 绑定模板。
- `templates/base.html`
  全站基础模板，统一加载公共 CSS、公共页眉、公共页脚和页面级资源块。
- `templates/partials/header.html`
  公共页眉，包含 Logo、导航、产品矩阵悬浮菜单；「核心技术」和「新闻资讯」目前是静态占位项。
- `templates/partials/footer.html`
  公共页脚。
- `static/css/base.css`
  全局基础样式。
- `static/css/header.css`、`static/js/header.js`
  公共页眉样式和交互，包括滚动后实底、自动隐藏、产品矩阵悬浮菜单。
- `static/css/footer.css`
  公共页脚样式。

## 页面入口

- 首页：`templates/home.html` + `static/css/home.css`
  当前只有首屏 Hero。按钮里的 `#technology`、`#contact` 锚点是后续内容预留。
- 产品页：`templates/product/index.html` + `static/css/product.css` + `static/js/product.js`
  展示 Robosweeper P1，桌面端带滚动分屏吸附交互。
- 关于我们：`templates/about/index.html` + `static/css/about.css`
  展示团队叙事和人物卡片，图片资源主要来自 `static/images/founder-team/`。
- 人物详情页：`templates/about/people/*.html` + `static/css/about-detail.css`
  每位核心成员一个独立静态模板，路由在 `fortrix_site/urls.py` 中逐条声明。
- 加入我们：`templates/join/index.html` + `static/css/join.css` + `static/js/join.js`
  包含侧边目录高亮、价值观、岗位表和附录链接；岗位与投递入口仍需替换为正式内容。

## 后续核心技术页准备

导航里已经预留「核心技术」入口，但目前还不是可点击链接。后续写 Technology 页面时，建议按现有模式补齐：

1. 在 `fortrix_site/urls.py` 增加 `technology/` 路由。
2. 新建 `templates/technology/index.html`，继承 `templates/base.html`。
3. 新建 `static/css/technology.css`，如有滚动、标签切换或图表交互，再增加 `static/js/technology.js`。
4. 将 `templates/partials/header.html` 里的「核心技术」从静态 `span` 改为指向 `technology_url` 的链接。
5. 如果首页 Hero 的「了解技术架构」按钮要跳转到独立页面，可从 `#contact` 或 `#technology` 改为 `{% url 'technology' %}`。

Technology 内容可以围绕当前项目已出现的技术线索展开：

- 「一脑多体」智能架构
- L4 自动驾驶与机器人系统工程化
- 多模态感知、3D 环境理解与 SLAM
- VLA / 具身智能模型
- 端侧 AI、模型量化与边缘计算部署
- 感知、决策、控制、远程接管与安全兜底闭环
- Robosweeper P1 的 360° 感知融合、厘米级定位、动态路径规划、垃圾视觉识别和自主清扫能力

## 常见修改入口

- 改页眉导航或 Logo：`templates/partials/header.html`
- 改页眉通用样式：`static/css/header.css`
- 改首页内容：`templates/home.html`
- 改产品页内容：`templates/product/index.html`
- 改关于我们内容：`templates/about/index.html`
- 改人物详情页：`templates/about/people/*.html`
- 改加入我们内容：`templates/join/index.html`
- 改产品页滚动吸附：`static/js/product.js`
- 改加入我们侧边目录高亮：`static/js/join.js`

## 当前占位内容

- 导航中的「核心技术」和「新闻资讯」暂未绑定真实路由。
- 首页 Hero 的两个按钮使用了预留锚点，当前页面还没有对应内容区块。
- 加入我们页面的岗位、投递入口、招聘邮箱和外部链接仍是占位内容。
- 部分备份文件、参考 HTML 和素材记录留在项目中，修改前注意确认是否仍需保留。

## 开发前建议

- 当前 `DEBUG = True`，`ALLOWED_HOSTS = ["*"]`，适合开发环境，不适合直接作为生产配置。
- 项目默认使用 SQLite，生产环境建议补充正式数据库和静态资源部署方案。
- 修改完成后至少运行一次检查：

```bash
source ~/miniconda3/etc/profile.d/conda.sh
conda activate py313
python manage.py check
```
