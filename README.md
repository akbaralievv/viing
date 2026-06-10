# VIING — корпоративный сайт

Маркетинговый сайт производителя VIING: каталог продукции, портфолио кейсов и три
продуктовых лендинга. Три языка (ru / en / uz), форма заявок с доставкой в Telegram.

## Стек

- **Next.js 15** (App Router, React 18, TypeScript strict)
- **next-intl 4** — локализация (`messages/{ru,en,uz}.json`)
- **Tailwind CSS 3.4** + shadcn/ui (Radix) + lucide-react
- **Vitest** — тесты API-роута, консистентности переводов и ассетов

## Запуск

```bash
npm install
cp .env.example .env.local   # заполнить TELEGRAM_* для доставки заявок
npm run dev                  # http://localhost:3000
```

| Скрипт           | Что делает                              |
| ---------------- | --------------------------------------- |
| `npm run dev`    | dev-сервер (turbopack)                  |
| `npm run build`  | продакшн-сборка                         |
| `npm run start`  | запуск собранного приложения            |
| `npm run lint`   | tsc --noEmit + ESLint                   |
| `npm run test`   | vitest (API, i18n-паритет, ассеты)      |
| `npm run format` | biome format                            |

## Структура

```
src/
  app/[locale]/            # страницы (главная, каталог, кейсы, about, brand, ...)
    cases/wet-wipes/       # лендинг TOZA KO'ZA (влажные салфетки)
    cases/stretch-film/    # лендинг GILAM PLYÖNKASI (стретч-плёнка)
    cases/food-cling-film/ # лендинг DASTURXON PLYÖNKASI (пищевая плёнка)
  app/api/contact/         # приём заявок → Telegram (rate-limit, honeypot)
  components/
    toza-koza/ gilam/ dasturxon/   # секции продуктовых лендингов
    sections/                      # секции главной (header, footer, hero, ...)
    ui/                            # shadcn/ui-примитивы
  i18n/                    # next-intl: routing, navigation, request
  lib/                     # каталог, кейсы, конфиг сайта
messages/                  # переводы ru/en/uz (наборы ключей идентичны — см. тесты)
public/                    # ассеты; имена в kebab-case, по папке на раздел
tests/                     # vitest
```

## Конвенции

- **Цвета продуктовых страниц** — только через токены из `tailwind.config.ts`
  (`toza-*`, `gilam-*`, `dast-*`, `amber-cta`), без сырых hex в className.
- **Переводы**: ключи во всех трёх локалях должны совпадать —
  `npm run test` это проверяет. Namespace на страницу
  (`wetWipes`, `stretchFilm`, `dasturxon`, ...).
- **Ошибки формы**: API возвращает стабильные коды (`{ error: "nameMin" }`),
  клиент переводит их через `form.errors.*`.
- **Картинки**: ниже первого экрана — `loading="lazy" decoding="async"`;
  лайтбокс — компонент `ZoomableImage`.

## Деплой

Обычный Next.js-деплой (`next build` + `next start`). Сейчас в
`next.config.js` стоит `images.unoptimized: true` — если хостинг поддерживает
оптимизатор изображений Next (Vercel / node-сервер), флаг можно убрать и
получить автоматический WebP/ресайз.

Переменные окружения — см. [.env.example](.env.example).
