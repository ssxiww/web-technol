@echo off
REM Упрощённый BAT-файл для компиляции SCSS в CSS

REM Укажите путь к SCSS-файлу и папку для CSS
set SCSS_FILE=style.scss
set CSS_OUTPUT=../css/style.css

REM Запуск компиляции с режимом "смотреть"
sass --watch %SCSS_FILE%:%CSS_OUTPUT%

pause