# KlarDeutsch

<div align="center">

### German A1, made practical.

Learn the German you can use today — with short lessons, useful phrases, clear explanations, and audio practice built for Portuguese-speaking beginners.

[![Live demo](https://img.shields.io/badge/Live%20demo-easy--german.netlify.app-0b5b5b?style=for-the-badge)](https://easy-german.netlify.app/)
[![Built with vanilla JavaScript](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JavaScript-f1c75b?style=for-the-badge)](#tech-stack)

[Open the live app →](https://easy-german.netlify.app/)

</div>

## What is KlarDeutsch?

KlarDeutsch is a lightweight, bilingual German A1 starter course for people who want to build confidence from the very first sentence.

It combines a guided learning path with quick reference pages, pronunciation support, interactive exercises, and everyday German that is easy to revisit on a phone or desktop.

The guiding idea is simple: learn small, useful pieces of German and practice them until they feel natural.

## Highlights

- 12 structured A1 lessons, starting with first sentences and continuing to real-life modal verbs
- Portuguese and English interface localization
- Clear explanations with German examples and translations
- Pronunciation support using the browser's German text-to-speech engine
- Vocabulary pages for words, phrases, numbers, weekdays, and months
- Interactive exercises with instant feedback and explanations
- Dedicated practice for `sein` and `haben`
- Number-writing practice from 1 to 10, in order or randomized
- 50 quick `sein` sentences and 50 quick `haben` sentences
- 50 beginner sentence translations in a one-at-a-time A1 lesson
- Progress tracking stored locally in the browser
- Responsive layout for mobile, tablet, and desktop
- No account, backend, build pipeline, or installation required

## The learning path

| # | Lesson | Focus |
| --- | --- | --- |
| 01 | First sentences | Greetings, introductions, routines, places, times, and basic questions |
| 02 | Pronunciation and reading | Special sounds, sound combinations, and listening practice |
| 03 | Personal pronouns | `ich`, `du`, `er`, `sie`, `es`, `wir`, `ihr`, and formal `Sie` |
| 04 | `Sein` and `haben` | The two most important German verbs |
| 05 | Basic sentence structure | The verb-in-second-position rule |
| 06 | Questions in German | Asking and understanding everyday questions |
| 07 | Present-tense verbs | Build sentences about daily actions |
| 08 | Articles and gender | Learn `der`, `die`, and `das` with useful nouns |
| 09 | Negation | Use `nicht` and `kein` to say “not” and “no” |
| 10 | Accusative case | Understand who does the action and what receives it |
| 11 | Modals and real-life German | `können`, `müssen`, `möchten`, and practical situations |
| 12 | Connectors and prepositions | Join ideas and talk about place, direction, time, and relationships |

## Practice areas

### Vocabulary

Build a useful starter bank with dedicated sections for:

- Words and everyday expressions
- Greetings and short phrases
- Numbers from 1 to 20
- Weekdays
- Months

Every vocabulary item includes a translation, an example, and a listen button where appropriate.

### Verb practice

The practice area focuses on the verbs beginners need constantly:

- Conjugation drills for `sein` and `haben`
- Short translation prompts
- Number-writing drills from 1 to 10, with ordered and randomized modes
- One-at-a-time interaction with streak feedback
- 50 beginner-friendly sentences for each verb
- German answers with keyboard-friendly support for umlauts and `ß`

## Audio

KlarDeutsch uses the Web Speech API to read German words and sentences aloud. The voice, language support, and audio output come from the browser and device, so available voices can vary between desktop and mobile browsers.

For the best experience, open the live site directly in Safari or Chrome and make sure the device has a German text-to-speech voice available.

## Local development

KlarDeutsch is a static site. There is no package manager or build step.

```bash
git clone https://github.com/vli8ca/easy-german.git
cd easy-german
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

You can also serve the folder with any static file server.

## Tech stack

- Semantic HTML
- Custom CSS with responsive layouts
- Vanilla JavaScript
- Browser `localStorage` for progress persistence
- Web Speech API for pronunciation practice
- Lucide icons loaded from the browser

## Project structure

```text
.
├── index.html           # Application shell
├── css/
│   └── styles.css       # Visual system and responsive layout
├── js/
│   ├── app.js           # Routing, rendering, and interaction state
│   ├── exercises.js     # Shared exercise behavior
│   ├── i18n.js          # Portuguese and English localization
│   ├── lessons.js       # A1 course content
│   ├── speech.js        # Browser speech integration
│   ├── storage.js       # Local progress persistence
│   └── verb-exercises.js  # Sein and haben practice data
└── tests/               # Static integration and content checks
```

## Design principles

KlarDeutsch is intentionally:

- **Practical** — phrases are chosen for real beginner situations.
- **Calm** — short sections and clear progress keep the learner moving.
- **Bilingual** — Portuguese helps explain the rule; German stays visible.
- **Offline-friendly** — learning progress stays on the device.
- **Accessible by default** — semantic controls, labels, focus states, and readable contrast are part of the interface.

## Live demo

Try KlarDeutsch here:

**[https://easy-german.netlify.app/](https://easy-german.netlify.app/)**
