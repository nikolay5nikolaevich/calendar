# AGENTS.md

Инструкции для Codex при работе с этим репозиторием.

## Команды

```bash
npm run dev      # Vite dev-сервер. Порты 5173-5176 обычно заняты — запускается на 5177
npm run build    # Сборка в dist/
npm run preview  # Превью продакшн-сборки
npm run lint     # ESLint
```

Тестов нет.

## Стек

React 19 + Vite 7, чистый JS (TypeScript НЕ добавлять). Никаких UI-библиотек, никакого Tailwind — только ванильный CSS в `src/style.css`.

react-router-dom v7, three / @react-three/fiber установлены, но используется только canvas 2d на hero.

## Эстетика — Editorial Noir

Сайт оформлен в стиле редакционного журнала с акцентным неоном.

**Палитра** (CSS-переменные в `:root` и `:root:not(.dark)`):
- `--paper` / `--paper-2..4` — фон (тёмная: тёплый чёрный `#0c0a08`; светлая: кремовая бумага `#f1ead8`)
- `--ink`, `--ink-soft`, `--ink-faint`, `--ink-quiet` — текст
- `--lime` — **единственный** сигнал-цвет. Тёмная: `#d9ff00`. Светлая: `#4a6b00` (оливковый). Никакого фиолета, никаких градиентов — лайм или сразу `--ember` (`#ff5a2c`)
- `--rule`, `--rule-strong` — линии

**Тёмная — по умолчанию** (`html.dark`). Светлая — newsprint. Не вводить новых акцентных цветов в палитру без явной просьбы.

**Шрифты** — подключены в `index.html` (НЕ `@import` в CSS):
- **Fraunces** (variable serif, opsz 9-144, SOFT 0-100, WONK 0-1) — заголовки, italic-варианты для акцентов
- **JetBrains Mono** — все метки, навигация, цифры
- **Inter Tight** — body

Когда добавляешь новый текст: заголовок = Fraunces italic с `font-variation-settings: "opsz" 144, "SOFT" 60-80, "WONK" 1`. Метки/служебка = JetBrains Mono uppercase letter-spacing 0.2em. НЕ использовать Syne, Manrope, DM Mono — они вырезаны.

## Custom cursor

`Cursor.jsx` рендерит lime-точку и кольцо. `body { cursor: none }` глобально. **Любой новый интерактивный элемент должен иметь `cursor: none`** — иначе появится системная стрелка. На coarse-pointer (моб.) курсор скрыт media-query, body возвращается к `cursor: auto`.

НЕ ставить `cursor: pointer` на кнопках — это дублирует и ломает вид.

## Архитектура

Многостраничка через React Router. Весь стейт в `App.jsx`, передаётся вниз пропсами. Никакого Redux/Zustand.

**Страницы:**
- `/` — Hero + Manifest + Tracker (трекер привычек)
- `/progress` — графики по 12 месяцам

**Поток данных:**
- `App.jsx` владеет: `tasks`, `viewMonth`, `goal`, `toast`
- `useEffect` сохраняет в `localStorage`: `"habit"` (привычки), `"goal"`, `"darkMode"`
- Все мутаторы (`onAddhabit`, `Delete_habit`, `onToggleday`, и т.д.) объявлены в `App.jsx`

**Раскладка главной**: Hero (100vh) → Marquee → About/Manifest → Section divider → Tracker (`id="tracker"`, левая 320px колонка `HabitInput` + правая `HabitCards`).

## Структура объекта привычки

```js
{
  id: crypto.randomUUID(),
  name: "string",
  color: "yellow" | "mint" | "blue" | "purple" | "coral" | "orange",
  done_days: ["YYYY-MM-DD"]
}
```

**Важно:** `normalize_habit()` в `App.jsx` **перезаписывает** цвет по индексу (`HABIT_COLORS[index % 6]`) при загрузке. Цвет в storage игнорируется. Если хочешь стабильные цвета — нужно менять `normalize_habit`.

**Миграция done_days:** старый формат — числа дней. `migrate_done_days()` конвертирует в ISO-строки. Новый код всегда пишет `YYYY-MM-DD`.

## Компоненты

**Используемые:**
- `Navbar.jsx` — pill-меню по центру, часы MSK справа, theme toggle
- `HeroSection.jsx` — асимметричный hero, particle canvas (lime dots), word-reveal анимация, magnetic CTA. Содержит Marquee и Manifest-секцию через `Reveal`
- `HabitInput.jsx` + `Add_task_form.jsx` — левая панель, форма с italic-serif input'ом (transparent underline border)
- `HabitCards.jsx` — **основной вид трекера**, «specimen sheets» в 1px-gap grid. Календарь **Monday-first** (Пн-Вт-Ср-Чт-Пт-Сб-Вс). ink-pour clip-path анимация при отметке дня
- `pages/ProgressPage.jsx` — ink-bars столбцы, italic-serif значения сверху, 3-col stat-cards с растущей лаймовой линией снизу при ховере

**Утилиты / атмосфера:**
- `Cursor.jsx` — custom cursor (см. выше)
- `Grain.jsx` — SVG-turbulence overlay через `data:image/svg+xml`, `mix-blend-mode: overlay` (dark) / `multiply` (light)
- `ScrollProgress.jsx` — лаймовый бар сверху, scaleX по `scrollY/(scrollHeight-innerHeight)`
- `Reveal.jsx` — IntersectionObserver wrapper. Стартовое `opacity:0 translateY(28px)`, добавляет `is-in` когда элемент входит в viewport. **Имеет 2.5с safety-fallback** — если IO не сработал (headless screenshot, prefers-reduced-motion), элемент всё равно покажется. НЕ удалять fallback
- `Marquee.jsx` — бесконечная горизонтальная лента (дублирует items, animation `marquee` 40s linear infinite)
- `Toast.jsx` — pill-form внизу, кнопка «отменить» с лаймовым фоном

**Legacy / неиспользуемые (НЕ трогать, но и не редактировать без причины):**
- `Calendar.jsx` — старый 31-колоночный трекер, **скрыт через `.calendar { display: none }`** в CSS. Sunday-first weeks. Можно удалить если уверен что не используется
- `CalendarGrid.jsx`, `Calendar3D.jsx` — НЕ подключены ни в одном маршруте

## CSS-конвенции

`src/style.css` (~1000 строк, переписан с нуля под editorial noir). Структура файла блочная: NAVBAR / HERO / ABOUT / TRACKER / HABIT CARDS / TOAST / PROGRESS PAGE / responsive.

**Цветовые классы привычек** — `is-yellow / is-mint / is-blue / is-purple / is-coral / is-orange`. В новой палитре мапятся на приглушённые тёплые тона (olive/azure/plum/rose/ember), НЕ на исходные неоны. См. `chart_bar.is-*` в style.css.

**Брейкпоинты:**
- 1180px — tablet: layout 1 колонка
- 768px — мобильник: курсор отключается, многие сетки в 1 колонку
- 480px — узкий моб.

**Анимации**: hero-words rise, ink-pour на cell, bar-rise на chart, marquee, hero-pulse на скролл-баре, strike на перечёркивании. Все через CSS, без motion-библиотек.

## Скриншоты для проверки дизайна

`.agents/screenshot.mjs` + `node_modules/playwright` (установлен `--no-save`). Запуск: `node .agents/screenshot.mjs`. Скрипт сидит localStorage сэмпл-привычками, делает снимки hero / tracker / about / progress / light / dark. Скриншоты в `.agents/shots/`.

Скрипт использует `reducedMotion: 'reduce'` и `autoScroll()` через всю страницу — это триггерит Reveal и заставляет элементы появиться до `fullPage: true`.

## Чек-лист при добавлении новой UI-фичи

1. Любая кнопка/инпут/ховер — добавь `cursor: none`
2. Заголовок — Fraunces italic, опционально `font-variation-settings`
3. Цифры/метки — JetBrains Mono uppercase, `letter-spacing: 0.16em-0.32em`
4. Цвет — только `--ink`/`--ink-faint`/`--lime`/`--ember`. Никаких хардкод-хексов вне `style.css`
5. Анимация появления — оборачивай в `<Reveal>` если элемент ниже first fold
6. Не плодить файлы — стили в `src/style.css`, не создавать `*.module.css`
7. После изменений — `node .agents/screenshot.mjs` и просмотр `.agents/shots/*.png`

## Что НЕ делать

- ❌ Возвращать фиолетовый акцент / Syne / Manrope
- ❌ Добавлять `cursor: pointer` (ломает custom cursor)
- ❌ Использовать `Calendar.jsx` или возвращать старый 31-колоночный трекер
- ❌ Менять структуру `tasks` или `done_days` (поломаешь миграцию)
- ❌ Создавать `*.md` файлы документации без явной просьбы
- ❌ Добавлять TypeScript, Tailwind, styled-components, UI-библиотеки
- ❌ Удалять Reveal-fallback (без него скриншоты падают)

## Справочные материалы

- `research-habit-trackers.md` — анализ конкурентов
- `design-spec.md` — старая спека, частично устарела после редизайна
