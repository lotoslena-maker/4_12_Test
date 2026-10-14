# 4_12_Test

Мобільний тест до заняття **4.11 «Перспективні напрями використання методів аналізу даних»**.

## Посилання

- Тест: https://cdn.jsdelivr.net/gh/lotoslena-maker/4_12_Test@main/site/index.html
- QR-екран для демонстрації: https://cdn.jsdelivr.net/gh/lotoslena-maker/4_12_Test@main/site/qr.html
- Google Sheets з результатами: https://docs.google.com/spreadsheets/d/1ngD5jb8SrKWvLetR5DyjPAcIe9dg9r_HpFsowHNvkY8/edit

## Що збирається перед тестом

1. Номер групи
2. В/звання
3. Ім’я та прізвище

Далі слухач відповідає на 6 легких запитань, кожне має 3 варіанти відповіді.

## Одноразове підключення автоматичного запису в Google Sheets

Google Sheets не приймає анонімні POST-запити напряму, тому потрібен маленький Google Apps Script.

1. Відкрийте створену таблицю результатів.
2. **Розширення → Apps Script**.
3. Видаліть стандартний код і вставте код із `backend/Code.gs`.
4. **Deploy → New deployment → Web app**.
5. Execute as: **Me**.
6. Who has access: **Anyone**.
7. Натисніть **Deploy** і скопіюйте URL виду:
   `https://script.google.com/macros/s/.../exec`
8. У файлі `site/app.js` замініть:
   `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
   на отриманий URL.

Після commit зміни доступні через jsDelivr-посилання вище. CDN іноді кешує файл кілька хвилин.

## Структура

- `site/` — готовий тест і QR-сторінка.
- `backend/Code.gs` — Apps Script, який перевіряє відповіді та додає рядок у Google Sheets.
- `.github/workflows/pages.yml` — автоматичне розгортання GitHub Pages.

### Правильні відповіді

1. Transfer Learning — адаптація попередньо навченої моделі.
2. RNN/LSTM/GRU — послідовні дані та часові ряди.
3. Attention — оцінювання важливості частин вхідних даних.
4. Reward — числовий сигнал якості дії агента.
5. AutoML — автоматизація пошуку, вибору і налаштування моделей.
6. MLOps — моніторинг якості, затримки, дрейфу даних і стабільності після розгортання.


