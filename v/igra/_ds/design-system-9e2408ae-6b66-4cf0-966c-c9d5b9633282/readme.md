# Парциальный Дракоша — дизайн-система

**«Парциальный Дракоша — медицинские материалы»** is a study platform (website + mobile app) for medical students: конспекты, схемы, таблицы and тесты organised as **Курс → Семестр → Дисциплина → Тема → Материал**.

- Main slogan: **«Разбирай медицину по частям. Понимай целиком.»**
- Footer slogan: **«Медицина по полочкам.»**
- Language: Russian (all UI copy is Russian; Latin appears only in medical terms and bibliography).

## Sources
This system was built from a written brief (colour/type/component spec pasted by the user) and 12 uploaded images in `uploads/`:
- `1000097976.png` — master logo lockup (emblem + wordmark + tagline).
- Desktop mockups: `5d6ff196…` home (guest), `2da88eff…` home with search dropdown open, `a87d0df4…` material page «Воспаление», `10080147…` test page.
- Mobile mockups: `96d2eab6…` home, `3443a2e9…` all disciplines, `fbc6304e…` full-screen search, `6285eb96…` material (top), `7f4d9121…` material (vascular reactions / cells), `4f8146bf…` end of topic + sources + comments, `63b38a1f…` about.

No codebase, Figma file or font binaries were provided. The mockups are raster images, so all values come from the brief first and screenshots second.

---

## Index
- `styles.css` — entry point; only `@import`s:
  - `tokens/fonts.css` (self-hosted @font-face), `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/base.css` (element defaults, `.pd-eyebrow`, `.pd-hand`).
- `fonts/` — woff2 (Source Serif 4, Inter, Montserrat, Marck Script; cyrillic + latin).
- `assets/logo/` — `lockup.png`, `emblem.png` (transparent), `lockup-mono-white.png`, `emblem-mono-white.png`.
- `assets/images/` — `hero-books-desktop.png`, `hero-books-mobile.png`, `footer-motif.png`.
- `assets/illustrations/` — `vascular-reactions-3step.png`, `microcirculation-changes.png`, `inflammation-focus-events.png`, `neutrophil-micrograph.png`, `engraving-books.png`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — React primitives (see below), one `*.card.html` per folder.
- `ui_kits/website/` — desktop click-through (home, search, конспект, тест).
- `ui_kits/mobile/` — iPhone click-through (главная, дисциплины, конспект, поиск, о проекте).
- `SKILL.md` — agent-skill entry.

## Components
Namespace in cards/kits: `window.DesignSystem_9e2408`.

- **brand/** — Logo
- **core/** — Icon, Button, IconButton, Badge, Chip, IconTile, Avatar, ProgressBar, Card
- **forms/** — SearchField, Select, Checkbox, Tabs
- **navigation/** — Header, MobileHeader, TabBar, Breadcrumbs, SidebarNav, TableOfContents, Accordion, Footer
- **content/** — SectionHeader, Callout, QuoteCard, Stepper, StepList, Figure, DataTable, ListCard, TermList
- **catalog/** — CourseTile, DisciplineCard, MaterialItem, MaterialTable, NewsCard, StatCard, FeatureItem
- **quiz/** — AnswerOption, QuestionNav, TestTimer, AnswerFeedback
- **community/** — Comment, CommentComposer, SourcesList, CompletionCard

### Intentional additions
- **Icon** — wrapper around the bundled Lucide set so every component draws the same 1.75-stroke glyphs.
- **Card** — base container; the brief defines card styling for every block but no single named card component.
- **Checkbox** — the brief names the forest-900 checkbox fill but no screen shows one.
- **Select** — the filter dropdowns («Любой курс ▾», «Сначала новые ▾») need an open state; the menu styling (white, radius 12, light shadow) follows the search popover.

---

## CONTENT FUNDAMENTALS

**Voice.** Calm, academic, warm. Like a good textbook written by a senior student. Content is precise and terminologically correct; the interface around it is short and friendly.

**Address.** Calls to action and slogans use **«ты»** imperatives: «Разбирай», «Понимай», «Перейти к курсам». Explanatory and system text uses the polite plural **«вы»**: «Выберите свой курс», «Вы дошли до конца темы!», «Теперь вы можете перейти к тестам…», «Используйте более точные запросы». Never mix both in one sentence.

**Casing.** Sentence case for every heading, button and menu item («Недавно добавленные материалы», «Скачать PDF»). ALL CAPS only for eyebrows («МЕДИЦИНСКИЕ МАТЕРИАЛЫ ДЛЯ СТУДЕНТОВ»), the logo tagline and the quote signature «ПАРЦИАЛЬНЫЙ ДРАКОША», always with wide letter-spacing.

**Microcopy** is short verb/noun phrases: «Подробнее», «Все материалы →», «Показать все результаты →», «Сообщить об ошибке», «Свернуть ⌃», «Ответить», «Отправить». Links that lead somewhere get a trailing arrow (→); back links a leading one (←).

**Typography rules.** Russian guillemets «ёлочки» for quotes and titles («Воспаление»). Em dash with spaces in definitions: «Воспаление — это…». Middle dot `·` separates meta («Патофизиология · 3 курс · V семестр»); bullet `•` separates the subtitle line under H1. Semesters in Roman numerals (V семестр, V–VI семестр). Dates: «12 ноя 2024» in lists, «2 октября 2024» on news cards. Counts: «124 материала», «Найдено: 12», «Вопрос 5 из 20». Thin space in thousands: «10 000+».

**Content structure.** Topics open with a bold defined term + definition, then a «Кратко» summary, then numbered H2 sections («1. Причины воспаления»). Figures are captioned «Рис. N. …». Bibliography follows ГОСТ.

**Emoji:** never. **Exclamation marks:** only in success states («Правильно!», «Вы дошли до конца темы!»).

**Quotes / epigraphs** are short aphorisms about learning: «Понимание патогенеза — основа осознанного лечения», «Знания сегодня — здоровье завтра», «Большая медицина состоит из маленьких понятных частей».

---

## VISUAL FOUNDATIONS

**Mood.** A modern take on an old university library or a well-made textbook: cream paper, deep forest green, occasional brick red. Calm, airy and trustworthy, with content ahead of decoration.

**Colour.**
- Page is always `--paper #FAF8F3`. Cards are `--surface #FBFAF6` and almost merge with it; a 1px `--border #E5E4E0` separates them. Sidebars, table heads and term blocks sit on `--panel #F3F3EC`.
- Primary actions, footer, active chips/tabs, avatar, current question and checkbox fill use `--forest-900 #1C3420`. Progress fill is `--forest-700`. Selection is `--sage-100` with a 2–3px forest left bar. Soft quote/remember blocks use `--sage-50`.
- Red is used in small doses: one accent word in a headline (`--red-800`), «Важно» headings, the «Тест» label, «Завершить тест», step 1 and star icons (`--red-600`). Never as a large fill.
- Semantic blocks have their own pastel bg/fg pairs (info blue-grey, warning warm pink, success sage). Badges and icon tiles are pastel tint + darker same-hue text/stroke. News cards are washed in their badge's hue.
- Not used: pure white page backgrounds, bright/startup blue, neon, gradients, glassmorphism.

**Type.** Source Serif 4 Bold for display, H1–H3, section titles, stat numbers and the wordmark (tight 1.1–1.2 leading, −0.01em on large sizes). Inter 400/500/600 for all UI and body copy (line-height 1.6), including buttons, tables, badges, forms, numbers and the timer (tabular figures). Source Serif 4 Italic for quotes (22–28px, #323B32). Montserrat 500 caps at 0.3em only in the logo tagline. Marck Script appears only on photographs and illustrations. No more than two families in one block.
Scale desktop / mobile: Display 56/36 · H1 48/34 · H2 26/22 · H3 18/17 · Lead 17/16 · Body 15–16 · Small 13–14 · Caption 12.

**Spacing & layout.** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Card padding 16–24, section gaps 48–64. The home page uses full-width sections in a ~1200px container. Material and test pages use three columns: ~210px navigator, ~530px content, ~210px utility sidebar (sidebars are sticky). On mobile, long horizontal sets (courses, chips, news, similar materials) scroll sideways and bleed to the screen edge.

**Corners.** Badge 6 · button/input/chip 8 · icon button/tile 10–12 · card/panel 12 · popover 16 · avatar and step numbers round. Nothing over 16px, and no pill buttons.

**Borders, shadows & depth.** Every card has a 1px #E5E4E0 border. Shadows are close to zero: at most `0 1px 2px rgba(28,52,32,.04)`. The only real shadow is the search popover (`--shadow-popover`). Depth comes from the paper → surface → panel tone steps, not elevation. No inner shadows.

**Backgrounds & imagery.** There are no patterns or textures in the UI itself. Photography is warm and light, in natural daylight with muted greens and creams: book stacks with spines (АНАТОМИЯ, ФИЗИОЛОГИЯ, ПАТОЛОГИЯ…), a stethoscope, a mug reading «Знания лечат.», house plants, and handwritten notes in Marck Script with a red underline. Hero photos fade into the paper on their left edge, which is the only gradient allowed and acts as a photo mask. Medical illustrations are clean watercolour-vector work with pink-red tissue and vessels and lavender-violet leukocytes, captioned «Рис. N.» and framed in a bordered card. Decorative accents are thin engraved book drawings in grey-green inside quote cards. The forest footer has a faint leaf/scale motif in the top-right corner, one tone lighter than the background.

**Transparency & blur.** Used only for the translucent sage hero quote card over the photo and the 10–18% white social squares in the footer. No backdrop blur.

**Motion.** Minimal: 120–260ms colour/border transitions with `cubic-bezier(.2,0,0,1)`, smooth width change on progress bars, and no bounces or parallax.

**Hover / press.** Primary buttons darken (forest-950). Secondary and outline buttons gain a sage-50/panel fill, and outline borders shift to sage-500. List rows get a panel background, and link cards get a sage-300 border. Ghost links underline. Focus shows a 2px forest-700 outline with a 2px offset. There is no press-shrink.

**Cards.** Surface fill with a 1px border, radius 12 and 16–24px padding. Variants: panel (sidebars), soft sage-50 without a border (quotes, remember, completion), and white mini-cards on panel (terms). The «Важно запомнить» block uses a thick 4px forest-900 left bar; the brief asks for this on mobile only, and no other card uses a coloured left border.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) line icons with round caps and joins. Brand stroke is 1.75 (1.4–1.5 on large course/feature icons, 2–2.5 inside small filled circles). Icons use the text colour by default, forest-900 when standalone, or the tint colour inside an IconTile.
- **Delivery:** 118 icons were fetched from `lucide-static@0.460.0` and inlined into `components/core/iconData.js`, then rendered by `<Icon name="…" />`. There is no icon font and no sprite. In HTML outside React you can copy the path markup from `iconData.js` or load Lucide from a CDN.
- **Common glyphs:** book-open, stethoscope, chart-column, cross, users, graduation-cap (courses) · file-text / file-check-2 (document types) · search, bookmark, bell, house, user (navigation) · download, share-2, flag, a-large-small (actions) · info, circle-alert, check, leaf, star (callouts/lists) · alarm-clock, clipboard-list, clock (tests) · heart, message-circle, ellipsis-vertical, bold, italic, link, list (comments).
- **Active tab bar** icons are filled (`fill="currentColor"`); inactive ones are outline grey.
- **Unicode** appears only inside copy: arrows → ← in labels like «Курс → Семестр», the bullet •, the middle dot ·, and ≈ in «≈ 20 минут». Icons themselves are never Unicode or emoji.
- **Substitutions (flagged):** Lucide has no VK glyph, so the footer square shows bold «VK» text. Telegram uses Lucide `send` and YouTube uses Lucide `youtube`. Lucide has no lungs or kidney icons, so Анатомия uses `bone`, Фтизиатрия `wind` and Урология `droplet`. Replace these with the brand's own icons if they exist.

## Logo
The emblem (a red dragon-wolf head in profile with dark horns, green mane, gold neck and cream earrings), a thin dark-green vertical rule, the two-line serif wordmark «Парциальный» (#222C13) / «Дракоша» (#922616), and the caps tagline «МЕДИЦИНСКИЕ МАТЕРИАЛЫ». The emblem raster was cut from the master PNG with its background removed. A white monochrome version was derived for the forest footer. In `<Logo>` the wordmark is live Source Serif 4 type rather than an image. The master wordmark appears to use a heavier, more Clarendon-like serif, so swap in vector logo files if they exist.

## Caveats
- **Fonts:** no binaries were supplied. The Google Fonts versions of the families named in the brief are self-hosted in `fonts/`.
- **Imagery:** hero photos, illustrations and the micrograph are low-resolution crops from the mockup screenshots. Treat them as placeholders until originals are available.
- Only the screens in the mockups were recreated. Профиль, Сохранённое, login and registration have no source design.
