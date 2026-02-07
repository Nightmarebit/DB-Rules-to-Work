# DB SafeLearn

Progressive Web App for railway safety training (DB InfraGO): terminology, safety rules, GSM-R trainer, decision tree, scenarios. Multilingual (RU/DE/EN/AR), mobile-first, dark theme, offline-ready.

## Stack

- **Next.js 14** (App Router), TypeScript, Tailwind CSS
- **i18n:** next-intl (ru, de, en, ar)
- **UI:** Lucide React, Framer Motion
- **PWA:** manifest + static export (service worker can be added later)
- **State:** React Context + localStorage (progress)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Middleware redirects `/` to default locale (e.g. `/de`).

## Build & static export

```bash
npm run build
```

Output: `out/` (static export).

---

## Деплой: рабочий сайт по ссылке

### Вариант 1: GitHub Pages (как вчера с GitHub)

1. **Создай репозиторий на GitHub**  
   https://github.com/new — имя, например `DB-APP` или `db-safelearn`. Не добавляй README (у тебя уже есть).

2. **Запушь код** (в папке проекта):
   ```bash
   git init
   git add .
   git commit -m "DB SafeLearn PWA"
   git branch -M main
   git remote add origin https://github.com/ТВОЙ_ЛОГИН/ИМЯ_РЕПО.git
   git push -u origin main
   ```
   Подставь свой логин и имя репозитория вместо `ТВОЙ_ЛОГИН` и `ИМЯ_РЕПО`.

3. **Включи GitHub Pages**  
   В репо: **Settings** → **Pages** → **Source**: выбери **GitHub Actions**.

4. **Дождись деплоя**  
   После пуша в **Actions** запустится workflow «Deploy to GitHub Pages». Через 1–2 минуты сайт будет доступен по ссылке:
   ```
   https://ТВОЙ_ЛОГИН.github.io/ИМЯ_РЕПО/
   ```
   Например: `https://nightmare.github.io/DB-APP/`

### Вариант 2: Vercel (короткая ссылка)

1. Зайди на https://vercel.com и войди через GitHub.
2. **Add New** → **Project** → выбери репозиторий с этим проектом.
3. **Deploy** (настройки по умолчанию подойдут).
4. Сайт будет по ссылке вида: `https://db-app-xxx.vercel.app`
5. При каждом `git push` в `main` Vercel будет собирать и обновлять сайт автоматически.

## Project structure

- `src/app/[locale]/` — locale-based routes (home, terms, rules, gsmr, decision, scenarios)
- `src/components/` — layout (Header, Navigation, LanguageSwitcher), common (Card, Button, ProgressBar), home (HomeProgress)
- `src/data/` — terminology (20 terms), more data files to add (rules, gsmr-phrases, decision-tree, scenarios)
- `src/lib/` — progress, storage, audio (to implement)
- `messages/` — ru.json, de.json, en.json, ar.json

## PWA icons

Add `public/icons/icon-192.png` and `public/icons/icon-512.png` for install prompt and home screen. Manifest is at `public/manifest.json`.

## Next steps (from spec)

- Phase 2: TermCard, TermList, audio (lib/audio.ts), decision tree data + component, gsmr-phrases + PhraseTrainer, scenarios data + ScenarioCard
- Phase 3: rules.ts + RulesView, PWA service worker, animations, progress view, search, quick reference
- Phase 4: Responsive and a11y audit, error boundaries, final README

## License

Internal / DB InfraGO use.
