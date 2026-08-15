from django.urls import path
from django.views.generic import TemplateView

# manage.py 设置 DJANGO_SETTINGS_MODULE = "fortrix_site.settings"
# Django 启动后会自动读取 ROOT_URLCONF = "fortrix_site.urls"

# urls.py 负责 URL 和页面的对应关系
# path() 里：
# 第1个参数："product/"    真正的 URL 路径
# 第2个参数：TemplateView... 匹配后渲染哪个模板
# name="product"          这条路由的名字，供 {% url 'product' %} 反向解析使用

urlpatterns = [
    path("", TemplateView.as_view(template_name="home.html"), name="home"),
    path(
        "product/",
        TemplateView.as_view(template_name="product/index.html"),
        name="product",     
    ),
    path(
        "about/",
        TemplateView.as_view(template_name="about/index.html"),
        name="about",
    ),
    path(
        "about/photo_log.txt",
        TemplateView.as_view(
            template_name="about/photo_log.txt",
            content_type="text/plain",
        ),
        name="about_photo_log",
    ),
    path(
        "about/people/xu-chao.html",
        TemplateView.as_view(template_name="about/people/xu-chao.html"),
        name="founder_xu_chao",
    ),
    path(
        "about/people/ye-bo.html",
        TemplateView.as_view(template_name="about/people/ye-bo.html"),
        name="founder_ye_bo",
    ),
    path(
        "about/people/ren-zhigang.html",
        TemplateView.as_view(template_name="about/people/ren-zhigang.html"),
        name="founder_ren_zhigang",
    ),
    path(
        "about/people/fang-qiang.html",
        TemplateView.as_view(template_name="about/people/fang-qiang.html"),
        name="founder_fang_qiang",
    ),
    path(
        "about/people/chen-peng.html",
        TemplateView.as_view(template_name="about/people/chen-peng.html"),
        name="founder_chen_peng",
    ),
    path(
        "about/people/jin-yuzhe.html",
        TemplateView.as_view(template_name="about/people/jin-yuzhe.html"),
        name="founder_jin_yuzhe",
    ),
    path(
        "join/",
        TemplateView.as_view(template_name="join/index.html"),
        name="join",
    ),
]
