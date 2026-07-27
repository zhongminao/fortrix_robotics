# Fortrix Robotics Django Header Demo

这个示例演示了三件事：

- `templates/partials/header.html` 是公共页眉
- `templates/base.html` 负责把公共页眉带到每个页面
- `static/css/site.css` 和 `static/js/header.js` 负责页眉样式与滚动效果

两个页面：

- `/`

运行方式：

```bash
source ~/miniconda3/etc/profile.d/conda.sh
conda activate py313
cd ~/mydisk/web/fortrix_robotics
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
