# Тест 4.11: Перспективні напрями використання методів аналізу даних

Мобільний навчальний тест: 6 питань × 3 варіанти відповіді. Перед початком слухач вказує номер групи, військове звання, ім’я та прізвище.

## Посилання на GitHub Pages

- **Тест:** https://lotoslena-maker.github.io/4_12_Test/
- **QR-код для демонстрації:** https://lotoslena-maker.github.io/4_12_Test/qr.html
- **Google Sheets (тільки для викладача):** https://docs.google.com/spreadsheets/d/1ngD5jb8SrKWvLetR5DyjPAcIe9dg9r_HpFsowHNvkY8/edit

**Потрібна одноразова активація GitHub Pages власником репозиторію:**

1. Відкрити https://github.com/lotoslena-maker/4_12_Test/settings/pages
2. У **Build and deployment** вибрати **Source: Deploy from a branch**.
3. Вибрати **Branch: main**, **Folder: /docs**, натиснути **Save**.
4. Зачекати публікацію сайту, потім відкрити адресу тесту вище.

УВАГА: Не використовуйте посилання виду `https://cdn.jsdelivr.net/gh/.../index.html` як сайт: браузер може показувати вихідний HTML-код замість сторінки.

## Файли

- `docs/index.html` — головна вебсторінка (GitHub Pages).
- `docs/styles.css` — оформлення.
- `docs/app.js` — запитання, навігація й надсилання результатів до Google Apps Script.
- `docs/qr.html` — QR-код із правильною адресою GitHub Pages.
- `backend/Code.gs` — серверна частина Google Apps Script.
- `site/` — початкова версія, не використовується як корінь GitHub Pages.

## Google Sheets

Google Apps Script вже має налаштований `doGet` і `doPost`. `docs/app.js` містить видану адресу публікації `/exec`. Під час проходження тесту відповіді відправляються до `doPost`, який рахує бал і додає рядок у таблицю **«Результати»**.

Щоб перевірити запис, введіть у тесті фіктивні дані `TEST` / `ТЕСТ` / `ТЕСТ ПІДКЛЮЧЕННЯ`, пройдіть 6 питань та перевірте появу рядка у таблиці. Відправлення через `no-cors` не дає браузеру підтвердження від сервера, тому показаний повідомленням факт відправлення сам по собі не доводить успішного запису.
