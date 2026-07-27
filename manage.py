#!/usr/bin/env python
# python manage.py runserver 0.0.0.0:8000
import os
import sys

def main(
    ):
    if "PYTHONUNBUFFERED" not in os.environ or os.environ["PYTHONUNBUFFERED"] != "1":
        os.environ["PYTHONUNBUFFERED"] = "1"
        os.execv(sys.executable, [sys.executable, "-u", *sys.argv])

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fortrix_site.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
