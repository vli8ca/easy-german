(function () {
  'use strict';

  const lessons = window.KlarLessons || [];
  const storage = window.KlarStorage;
  const exercises = window.KlarExercises;
  const verbPractice = window.KlarVerbPractice;
  const icons = window.KlarIcons;
  const i18n = window.KlarI18n;
  const ui = {
    route: 'dashboard',
    activeLessonId: lessons[0] ? lessons[0].id : null,
    sessions: {},
    reviewSession: {},
    reviewQuestions: [],
    exerciseModes: { sein: 'conjugation', haben: 'conjugation' },
    verbSessions: {},
    sidebarSections: { vocabulary: false, lessons: false, exercises: false }
  };

  const vocabulary = {
    words: [
      { word: 'Guten', meaning: 'bom / boa (forma usada nas saudações)', meaning_en: 'good (form used in greetings)' },
      { word: 'Morgen', meaning: 'manhã', meaning_en: 'morning' },
      { word: 'Tag', meaning: 'dia', meaning_en: 'day' },
      { word: 'Abend', meaning: 'noite / fim da tarde', meaning_en: 'evening / late afternoon' },
      { word: 'Gute', meaning: 'boa', meaning_en: 'good' },
      { word: 'Nacht', meaning: 'noite', meaning_en: 'night' },
      { word: 'Tschüss', meaning: 'adeus / tchau (formal)', meaning_en: 'goodbye / bye (formal)' },
      { word: 'Tschau', meaning: 'adeus / tchau (informal)', meaning_en: 'goodbye / bye (informal)' },
      { word: 'Bis', meaning: 'até', meaning_en: 'until' },
      { word: 'später', meaning: 'mais tarde', meaning_en: 'later' },
      { word: 'dann', meaning: 'então', meaning_en: 'then' },
      { word: 'bald', meaning: 'em breve', meaning_en: 'soon' },
      { word: 'Auf', meaning: 'até (na expressão Auf Wiedersehen)', meaning_en: 'until (in the expression Auf Wiedersehen)' },
      { word: 'Wiedersehen', meaning: 'ver novamente / reencontro', meaning_en: 'seeing again / reunion' },
      { word: 'Mein', meaning: 'meu', meaning_en: 'my' },
      { word: 'Name', meaning: 'nome', meaning_en: 'name' },
      { word: 'ist', meaning: 'é / está', meaning_en: 'is' },
      { word: 'Leo', meaning: 'Leo', meaning_en: 'Leo' },
      { word: 'Ich', meaning: 'eu', meaning_en: 'I' },
      { word: 'heiße', meaning: 'me chamo', meaning_en: 'am called / my name is' },
      { word: 'bin', meaning: 'sou / estou', meaning_en: 'am' },
      { word: '25', meaning: 'vinte e cinco', meaning_en: 'twenty-five' },
      { word: 'Jahre', meaning: 'anos', meaning_en: 'years' },
      { word: 'alt', meaning: 'de idade', meaning_en: 'old / years old' },
      { word: 'komme', meaning: 'venho', meaning_en: 'come' },
      { word: 'aus', meaning: 'de', meaning_en: 'from' },
      { word: 'Brasilien', meaning: 'Brasil', meaning_en: 'Brazil' },
      { word: 'Brasilianer/in', meaning: 'brasileiro/a', meaning_en: 'Brazilian man/woman' },
      { word: 'wohne', meaning: 'moro', meaning_en: 'live' },
      { word: 'in', meaning: 'em', meaning_en: 'in' },
      { word: 'München', meaning: 'Munique', meaning_en: 'Munich' },
      { word: 'spreche', meaning: 'falo', meaning_en: 'speak' },
      { word: 'Portugiesisch', meaning: 'português', meaning_en: 'Portuguese' },
      { word: 'und', meaning: 'e', meaning_en: 'and' },
      { word: 'Deutsch', meaning: 'alemão', meaning_en: 'German' },
      { word: 'Meine', meaning: 'meus / minhas', meaning_en: 'my' },
      { word: 'Hobbys', meaning: 'passatempos', meaning_en: 'hobbies' },
      { word: 'sind', meaning: 'são / estão', meaning_en: 'are' },
      { word: 'Fußball', meaning: 'futebol', meaning_en: 'soccer' },
      { word: 'spielen', meaning: 'jogar', meaning_en: 'play' },
      { word: 'lesen', meaning: 'ler', meaning_en: 'read' },
      { word: 'Single', meaning: 'solteiro/a', meaning_en: 'single' },
      { word: 'habe', meaning: 'tenho', meaning_en: 'have' },
      { word: 'einen', meaning: 'um', meaning_en: 'a / one (masculine accusative)' },
      { word: 'Freund', meaning: 'amigo / namorado', meaning_en: 'friend / boyfriend' },
      { word: 'eine', meaning: 'uma', meaning_en: 'a / one (feminine)' },
      { word: 'Freundin', meaning: 'amiga / namorada', meaning_en: 'friend / girlfriend' },
      { word: 'verheiratet', meaning: 'casado/a', meaning_en: 'married' },
      { word: 'Student/in', meaning: 'estudante universitário/a', meaning_en: 'university student' },
      { word: 'Schüler/in', meaning: 'aluno/a', meaning_en: 'student / pupil' },
      { word: 'Lehrer/in', meaning: 'professor/a', meaning_en: 'teacher' },
      { word: 'Frage', meaning: 'pergunta', meaning_en: 'question' },
      { word: 'Antwort', meaning: 'resposta', meaning_en: 'answer' },
      { word: 'Wie', meaning: 'como / quão', meaning_en: 'how / how ...?' },
      { word: 'dein', meaning: 'seu / sua', meaning_en: 'your' },
      { word: 'bist', meaning: 'é / está (com du)', meaning_en: 'are (with du)' },
      { word: 'du', meaning: 'você', meaning_en: 'you' },
      { word: 'Woher', meaning: 'de onde', meaning_en: 'where from' },
      { word: 'kommst', meaning: 'vem (com du)', meaning_en: 'come (with du)' },
      { word: 'Was', meaning: 'o que / quais', meaning_en: 'what / which' },
      { word: 'deine', meaning: 'seus / suas', meaning_en: 'your' },
      { word: 'Welche', meaning: 'quais', meaning_en: 'which' },
      { word: 'Sprachen', meaning: 'idiomas / línguas', meaning_en: 'languages' },
      { word: 'sprichst', meaning: 'fala (com du)', meaning_en: 'speak (with du)' }
    ],
    phrases: [
      { de: 'Guten Morgen', pt: 'bom dia', pt_en: 'good morning' },
      { de: 'Guten Tag', pt: 'bom dia / boa tarde', pt_en: 'good day / good afternoon' },
      { de: 'Guten Abend', pt: 'boa noite', pt_en: 'good evening' },
      { de: 'Gute Nacht', pt: 'boa noite', pt_en: 'good night' },
      { de: 'Bis später / bis dann', pt: 'até mais', pt_en: 'see you later' },
      { de: 'Bis bald', pt: 'até breve', pt_en: 'see you soon' },
      { de: 'Auf Wiedersehen', pt: 'até mais', pt_en: 'goodbye' },
      { de: 'Mein Name ist Leo', pt: 'meu nome é Leonardo', pt_en: 'my name is Leo' },
      { de: 'Ich heiße Leo', pt: 'chamo-me Leo', pt_en: 'my name is Leo' },
      { de: 'Ich bin Leo', pt: 'eu sou Leo', pt_en: 'I am Leo' },
      { de: 'Ich bin 25 Jahre alt', pt: 'tenho 25 anos de idade', pt_en: 'I am 25 years old' },
      { de: 'Ich komme aus Brasilien', pt: 'venho do Brasil', pt_en: 'I am from Brazil' },
      { de: 'Ich bin Brasilianer/in', pt: 'eu sou brasileiro/a', pt_en: 'I am Brazilian' },
      { de: 'Ich wohne in München', pt: 'moro em Munique', pt_en: 'I live in Munich' },
      { de: 'Ich spreche Portugiesisch und Deutsch', pt: 'falo português e alemão', pt_en: 'I speak Portuguese and German' },
      { de: 'Meine Hobbys sind Fußball spielen und lesen', pt: 'meus passatempos são jogar futebol e ler', pt_en: 'My hobbies are playing soccer and reading' },
      { de: 'Ich bin Single', pt: 'eu sou solteiro/a', pt_en: 'I am single' },
      { de: 'Ich habe einen Freund', pt: 'eu tenho namorado', pt_en: 'I have a boyfriend' },
      { de: 'Ich habe eine Freundin', pt: 'eu tenho namorada', pt_en: 'I have a girlfriend' },
      { de: 'Ich bin verheiratet', pt: 'sou casado/a', pt_en: 'I am married' },
      { de: 'Ich bin Student/in', pt: 'eu sou estudante', pt_en: 'I am a university student' },
      { de: 'Ich bin Schüler/in', pt: 'eu sou aluno/a', pt_en: 'I am a student' },
      { de: 'Ich bin Lehrer/in', pt: 'eu sou professor/a', pt_en: 'I am a teacher' },
      { de: 'Wie ist dein Name?', pt: 'qual é o seu nome?', pt_en: 'What is your name?' },
      { de: 'Wie alt bist du?', pt: 'quantos anos você tem?', pt_en: 'How old are you?' },
      { de: 'Woher kommst du?', pt: 'de onde você é?', pt_en: 'Where are you from?' },
      { de: 'Was sind deine Hobbys?', pt: 'quais são os seus passatempos?', pt_en: 'What are your hobbies?' },
      { de: 'Welche Sprachen sprichst du?', pt: 'quais idiomas você fala?', pt_en: 'Which languages do you speak?' }
    ],
    numbers: [
      ['1', 'eins'], ['2', 'zwei'], ['3', 'drei'], ['4', 'vier'], ['5', 'fünf'],
      ['6', 'sechs'], ['7', 'sieben'], ['8', 'acht'], ['9', 'neun'], ['10', 'zehn'],
      ['11', 'elf'], ['12', 'zwölf'], ['13', 'dreizehn'], ['14', 'vierzehn'], ['15', 'fünfzehn'],
      ['16', 'sechzehn'], ['17', 'siebzehn'], ['18', 'achtzehn'], ['19', 'neunzehn'], ['20', 'zwanzig']
    ],
    weekdays: [
      ['Montag', 'segunda-feira'], ['Dienstag', 'terça-feira'], ['Mittwoch', 'quarta-feira'],
      ['Donnerstag', 'quinta-feira'], ['Freitag', 'sexta-feira'], ['Samstag', 'sábado'], ['Sonntag', 'domingo']
    ],
    months: [
      ['Januar', 'janeiro'], ['Februar', 'fevereiro'], ['März', 'março'], ['April', 'abril'],
      ['Mai', 'maio'], ['Juni', 'junho'], ['Juli', 'julho'], ['August', 'agosto'],
      ['September', 'setembro'], ['Oktober', 'outubro'], ['November', 'novembro'], ['Dezember', 'dezembro']
    ]
  };

  const vocabularyRoutes = ['vocabulary-words', 'vocabulary-phrases', 'vocabulary-numbers', 'vocabulary-weekdays', 'vocabulary-months'];

  const view = document.getElementById('app-view');
  const appShell = document.querySelector('.app-shell');
  const sidebar = document.getElementById('sidebar');
  const sidebarScrim = document.querySelector('.sidebar-scrim');
  const breadcrumb = document.getElementById('breadcrumb');
  const toastRegion = document.getElementById('toast-region');
  const sidebarBreakpoint = 800;
  let sidebarIsOpen = window.innerWidth > sidebarBreakpoint;
  let sidebarWasMobile = window.innerWidth <= sidebarBreakpoint;

  function esc(value) { return exercises.escapeHTML(value); }
  function icon(name, className, label) { return icons.render(name, className, label); }
  function tr(key, variables, fallback) { return i18n.t(key, variables, fallback); }
  function localize(item, key) { return i18n.localize(item, key); }
  function localized(value) {
    if (i18n.getLanguage() !== 'en' || value == null || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(localized);
    const result = {};
    Object.keys(value).filter((key) => key !== 'en' && !key.endsWith('_en')).forEach((key) => {
      result[key] = localized(value[key]);
    });
    Object.keys(value).filter((key) => key.endsWith('_en')).forEach((key) => {
      result[key.slice(0, -3)] = localized(value[key]);
    });
    if (typeof value.en === 'string' && Object.prototype.hasOwnProperty.call(value, 'pt')) {
      result.pt = value.en;
    }
    if (value.en && typeof value.en === 'object') Object.assign(result, localized(value.en));
    return result;
  }
  function getLesson(id) { return lessons.find((lesson) => lesson.id === id); }
  function getProgress() { return storage.getProgress(); }
  function isVocabularyRoute(route) { return vocabularyRoutes.includes(route); }

  function completionPercent(progress) {
    return lessons.length ? Math.round((progress.completedLessons.length / lessons.length) * 100) : 0;
  }

  function lessonStatus(lesson, progress) {
    if (progress.completedLessons.includes(lesson.id)) return 'complete';
    if (progress.lastLessonId === lesson.id || (progress.lessonScores[lesson.id] && progress.lessonScores[lesson.id].total)) return 'progress';
    return 'idle';
  }

  function lessonPercent(lesson, progress, session) {
    if (progress.completedLessons.includes(lesson.id)) return 100;
    const current = session && session.answers ? Object.values(session.answers).filter((answer) => answer.checked).length : 0;
    if (session && session.isRetry) return lesson.exercises.length ? Math.round((current / lesson.exercises.length) * 100) : 0;
    const saved = progress.lessonScores[lesson.id] ? progress.lessonScores[lesson.id].total : 0;
    const answered = Math.max(current, saved);
    return lesson.exercises.length ? Math.round((answered / lesson.exercises.length) * 100) : 0;
  }

  function getNextLesson(progress) {
    return lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) || lessons[lessons.length - 1];
  }

  function getSession(lessonId) {
    if (!ui.sessions[lessonId]) ui.sessions[lessonId] = { answers: {} };
    return ui.sessions[lessonId];
  }

  function getExercisePage() {
    const pageId = ui.route === 'exercises-haben' ? 'haben' : 'sein';
    return verbPractice.pages[pageId] || verbPractice.pages.sein;
  }

  function getVerbMode() {
    const page = getExercisePage();
    const modeId = ui.exerciseModes[page.id] || 'conjugation';
    return page.modes[modeId] || page.modes.conjugation;
  }

  function shuffleVerbSentenceOrder(items) {
    const original = items.map((item) => item.id);
    const order = original.slice();
    for (let index = order.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [order[index], order[swap]] = [order[swap], order[index]];
    }
    if (order.length > 1 && order.every((id, index) => id === original[index])) {
      [order[0], order[1]] = [order[1], order[0]];
    }
    return order;
  }

  function createVerbSession(mode) {
    return {
      answers: {},
      results: {},
      checked: false,
      currentIndex: 0,
      status: 'idle',
      completed: false,
      streak: 0,
      order: mode.id === 'sentences' ? shuffleVerbSentenceOrder(mode.items) : []
    };
  }

  function getVerbSession(modeId) {
    const page = getExercisePage();
    const mode = page.modes[modeId] || page.modes.conjugation;
    const key = page.id + ':' + modeId;
    if (!ui.verbSessions[key]) ui.verbSessions[key] = createVerbSession(mode);
    const session = ui.verbSessions[key];
    if (mode.id === 'sentences') {
      const itemIds = mode.items.map((item) => item.id);
      const orderIsCurrent = Array.isArray(session.order) && session.order.length === itemIds.length && new Set(session.order).size === itemIds.length && itemIds.every((id) => session.order.includes(id));
      if (!orderIsCurrent) {
        ui.verbSessions[key] = createVerbSession(mode);
        return ui.verbSessions[key];
      }
      if (!Number.isFinite(session.streak) || session.streak < 0) session.streak = 0;
    }
    return session;
  }

  function getCurrentVerbSentence(mode, session) {
    const currentId = session.order && session.order[session.currentIndex];
    return mode.items.find((item) => item.id === currentId) || mode.items[session.currentIndex];
  }

  function updateLanguageButtons() {
    const current = i18n.getLanguage();
    document.querySelectorAll('[data-language]').forEach((button) => {
      const active = button.dataset.language === current;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function showToast(message, kind) {
    const toast = document.createElement('div');
    toast.className = 'toast' + (kind ? ' is-' + kind : '');
    toast.textContent = message;
    toastRegion.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3400);
  }

  function updateTopbar(progress) {
    const percent = completionPercent(progress);
    document.getElementById('sidebar-progress-value').textContent = percent + '%';
    document.getElementById('sidebar-progress-bar').style.width = percent + '%';
    document.getElementById('sidebar-progress-copy').textContent = percent === 0 ? tr('sidebar.start') : percent === 100 ? tr('sidebar.complete') : tr('sidebar.progressCount', { completed: progress.completedLessons.length, total: lessons.length });
    document.getElementById('review-badge').textContent = progress.completedLessons.length;
  }

  function renderSidebar(progress) {
    updateTopbar(progress);
    const nav = document.getElementById('lesson-nav');
    nav.innerHTML = lessons.map((lesson) => {
      const status = lessonStatus(lesson, progress);
      const isActive = ui.route === 'lesson' && ui.activeLessonId === lesson.id;
      return '<button type="button" class="lesson-nav-item' + (isActive ? ' is-active' : '') + '" data-open-lesson="' + esc(lesson.id) + '" aria-current="' + (isActive ? 'page' : 'false') + '">' +
        '<span class="lesson-nav-number">' + String(lesson.number).padStart(2, '0') + '</span>' +
        '<span class="lesson-nav-title">' + esc(localize(lesson, 'title')) + '</span>' +
        '<span class="lesson-status is-' + status + '" aria-label="' + esc(tr('sidebar.status.' + status)) + '"></span>' +
        '</button>';
    }).join('');

    document.querySelectorAll('[data-route]').forEach((item) => {
      const isActive = item.dataset.route === ui.route;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    document.querySelectorAll('[data-sidebar-section]').forEach((section) => {
      const isOpen = ui.sidebarSections[section.dataset.sidebarSection] !== false;
      section.classList.toggle('is-collapsed', !isOpen);
      const toggle = section.querySelector('[data-toggle-sidebar-section]');
      if (toggle) toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function updateBreadcrumb() {
    if (ui.route === 'dashboard') {
      breadcrumb.innerHTML = '<span>' + esc(tr('breadcrumb.myGerman')) + '</span><span aria-hidden="true">/</span><strong>' + esc(tr('breadcrumb.overview')) + '</strong>';
    } else if (ui.route === 'review') {
      breadcrumb.innerHTML = '<span>' + esc(tr('breadcrumb.myGerman')) + '</span><span aria-hidden="true">/</span><strong>' + esc(tr('nav.review')) + '</strong>';
    } else if (ui.route === 'exercises' || ui.route === 'exercises-haben') {
      breadcrumb.innerHTML = '<span>' + esc(tr('breadcrumb.practice')) + '</span><span aria-hidden="true">/</span><strong>' + esc(tr('breadcrumb.exercises')) + ' · ' + esc(localize(getExercisePage(), 'title')) + '</strong>';
    } else if (isVocabularyRoute(ui.route)) {
      const vocabularyLabels = { 'vocabulary-words': 'sidebar.words', 'vocabulary-phrases': 'sidebar.phrases', 'vocabulary-numbers': 'sidebar.numbers', 'vocabulary-weekdays': 'sidebar.weekdays', 'vocabulary-months': 'sidebar.months' };
      breadcrumb.innerHTML = '<span>' + esc(tr('breadcrumb.course')) + '</span><span aria-hidden="true">/</span><strong>' + esc(tr('breadcrumb.vocabulary')) + ' · ' + esc(tr(vocabularyLabels[ui.route])) + '</strong>';
    } else {
      const lesson = getLesson(ui.activeLessonId);
      breadcrumb.innerHTML = '<span>' + esc(tr('breadcrumb.course')) + '</span><span aria-hidden="true">/</span><strong>' + esc(tr('breadcrumb.lesson')) + ' ' + String(lesson.number).padStart(2, '0') + ' · ' + esc(localize(lesson, 'title')) + '</strong>';
    }
  }

  function renderDashboard() {
    const progress = getProgress();
    const next = getNextLesson(progress);
    const completed = progress.completedLessons.length;
    const accuracy = progress.totalAnswered ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100) : 0;
    const percent = completionPercent(progress);

      view.innerHTML = '<div class="fade-in">' +
      '<section class="dashboard-hero">' +
      '<div><p class="view-kicker">' + esc(tr('dashboard.kicker')) + '</p><h1>' + esc(tr('dashboard.title')) + '<br>' + esc(tr('dashboard.titleAccent')) + ' <span aria-label="' + esc(tr('dashboard.titleAria')) + '">🇩🇪</span></h1><p class="hero-copy">' + esc(tr('dashboard.copy')) + '</p><div class="hero-note"><span class="hero-note-mark">' + icon('sparkles') + '</span><span>' + esc(tr('dashboard.localCopy')) + '</span></div></div>' +
        '<div class="overview-card"><div class="overview-card-top"><div><p class="overview-card-label">' + esc(tr('dashboard.generalProgress')) + '</p><h3>' + esc(tr('dashboard.lessons', { completed, total: lessons.length })) + '</h3></div><span class="overview-percent">' + percent + '%</span></div><div class="progress-track"><span style="width:' + percent + '%"></span></div><div class="overview-card-foot"><span>' + progress.totalAnswered + ' ' + esc(tr('dashboard.answered')) + '</span><strong>' + accuracy + '% ' + esc(tr('dashboard.accuracy')) + '</strong></div></div>' +
      '</section>' +
      '<section class="stats-grid" aria-label="' + esc(tr('dashboard.progressSummary')) + '">' +
        statCard(String(completed), tr('dashboard.lessonsCompleted')) + statCard(String(lessons.length), tr('dashboard.lessonsPath')) + statCard(String(progress.totalAnswered), tr('dashboard.exercisesDone')) + statCard(accuracy + '%', tr('dashboard.accuracyRate')) +
      '</section>' +
      '<section><div class="section-heading"><div><h2>' + esc(tr('dashboard.continue')) + '</h2><p>' + esc(tr('dashboard.nextStep')) + '</p></div></div>' +
        '<button type="button" class="continue-card" data-open-lesson="' + esc(next.id) + '"><span class="continue-number">' + String(next.number).padStart(2, '0') + '</span><span><h3>' + esc(localize(next, 'title')) + '</h3><p>' + (progress.completedLessons.length === lessons.length ? esc(tr('dashboard.reviewKeepGoing')) : esc(localize(next, 'focus'))) + '</p></span><span class="continue-arrow" aria-hidden="true">' + icon('arrow-right') + '</span></button>' +
      '</section>' +
      '<section class="path-section"><div class="section-heading"><div><h2>' + esc(tr('dashboard.path')) + '</h2><p>' + esc(tr('dashboard.pathCopy')) + '</p></div><button type="button" class="text-button" data-route="review">' + esc(tr('dashboard.reviewCompleted')) + ' ' + icon('arrow-right') + '</button></div><div class="lesson-path">' + lessons.map((lesson) => renderPathCard(lesson, progress, next.id)).join('') + '</div></section>' +
      '<section class="bottom-grid"><div class="panel"><h3>' + esc(tr('dashboard.achievements')) + '</h3><p class="panel-intro">' + esc(tr('dashboard.achievementsCopy')) + '</p><div class="achievement-list">' + renderAchievements(progress) + '</div></div><div class="panel"><h3>' + esc(tr('dashboard.studyRhythm')) + '</h3><p class="panel-intro">' + esc(tr('dashboard.studyRhythmCopy')) + '</p><div class="study-rhythm" aria-label="' + esc(tr('dashboard.studyRhythmAria')) + '">' + [22, 38, 28, 46, 34, 57, progress.totalAnswered ? 68 : 0].map((height) => '<span class="rhythm-bar" style="height:' + height + '%"></span>').join('') + '</div><div class="rhythm-labels"><span>' + esc(tr('dashboard.week.mon')) + '</span><span>' + esc(tr('dashboard.week.tue')) + '</span><span>' + esc(tr('dashboard.week.wed')) + '</span><span>' + esc(tr('dashboard.week.thu')) + '</span><span>' + esc(tr('dashboard.week.fri')) + '</span><span>' + esc(tr('dashboard.week.sat')) + '</span><span>' + esc(tr('dashboard.today')) + '</span></div></div></section>' +
      '</div>';
  }

  function statCard(value, label) {
    return '<div class="stat-card"><span class="stat-value">' + esc(value) + '</span><span class="stat-label">' + esc(label) + '</span></div>';
  }

  function renderPathCard(lesson, progress, nextId) {
    const status = lessonStatus(lesson, progress);
    const percentage = lessonPercent(lesson, progress, ui.sessions[lesson.id]);
    const statusIcon = status === 'complete' ? 'circle-check' : status === 'progress' ? 'circle-dot' : 'circle';
    return '<button type="button" class="path-card' + (status === 'complete' ? ' is-complete' : '') + (lesson.id === nextId ? ' is-current' : '') + '" data-open-lesson="' + esc(lesson.id) + '"><div class="path-card-top"><span class="path-number">' + String(lesson.number).padStart(2, '0') + '</span><span class="path-status" aria-hidden="true">' + icon(statusIcon, 'status-icon') + '</span></div><h3>' + esc(localize(lesson, 'title')) + '</h3><p>' + (status === 'complete' ? esc(tr('lesson.completed')) : status === 'progress' ? esc(tr('lesson.inProgress')) : esc(localize(lesson, 'focus'))) + '</p><span class="path-card-bar"><span style="width:' + percentage + '%"></span></span></button>';
  }

  function renderAchievements(progress) {
    const list = [
      ['first-step', 'sparkles', 'achievement.first', 'achievement.firstDescription'],
      ['guten-tag', 'sun', 'achievement.five', 'achievement.fiveDescription'],
      ['a1-starter', 'star', 'achievement.ten', 'achievement.tenDescription']
    ];
    return list.map(([id, iconName, title, description]) => {
      const unlocked = progress.achievements.includes(id);
      return '<div class="achievement-row' + (unlocked ? ' is-unlocked' : '') + '"><span class="achievement-icon" aria-hidden="true">' + icon(iconName) + '</span><span class="achievement-copy"><strong>' + esc(tr(title)) + '</strong><span>' + esc(tr(description)) + '</span></span><span class="achievement-lock" aria-label="' + esc(tr(unlocked ? 'achievement.unlocked' : 'achievement.locked')) + '">' + icon(unlocked ? 'check' : 'lock') + '</span></div>';
    }).join('');
  }

  function renderLesson(lesson) {
    const progress = getProgress();
    const session = getSession(lesson.id);
    const content = localized(lesson);
    const percentage = lessonPercent(lesson, progress, session);
    const checked = Object.values(session.answers).filter((answer) => answer.checked).length;
    const lessonStatusIcon = progress.completedLessons.includes(lesson.id) ? 'circle-check' : checked ? 'circle-dot' : 'circle';
    view.innerHTML = '<div class="fade-in"><section class="lesson-header"><div><p class="view-kicker">' + esc(tr('breadcrumb.lesson')) + ' ' + String(content.number).padStart(2, '0') + ' · ' + esc(content.focus) + '</p><h1>' + esc(content.title) + '</h1><p class="lesson-description">' + esc(content.description) + '</p><div class="lesson-meta"><span class="meta-pill">' + icon('clock-3', 'meta-icon') + esc(content.duration) + '</span><span class="meta-pill">' + icon('list-checks', 'meta-icon') + content.exercises.length + ' ' + esc(tr('lesson.exercises')) + '</span><span class="meta-pill">' + icon(lessonStatusIcon, 'meta-icon') + esc(progress.completedLessons.includes(lesson.id) ? tr('lesson.completed') : checked ? tr('lesson.inProgress') : tr('lesson.notStarted')) + '</span></div></div><div class="lesson-completion"><div class="lesson-completion-label"><span>' + esc(tr('lesson.progress')) + '</span><strong id="lesson-completion-value">' + percentage + '%</strong></div><div class="progress-track"><span id="lesson-completion-bar" style="width:' + percentage + '%"></span></div><p class="lesson-progress-note" id="lesson-progress-note">' + esc(tr('lesson.verified', { checked, total: content.exercises.length })) + '</p></div></section><div class="lesson-steps" aria-label="' + esc(tr('lesson.steps')) + '"><span class="lesson-step is-active"><span class="lesson-step-dot"></span>' + esc(tr('lesson.understand')) + '</span><span class="lesson-step"><span class="lesson-step-dot"></span>' + esc(tr('lesson.observe')) + '</span><span class="lesson-step"><span class="lesson-step-dot"></span>' + esc(tr('lesson.practice')) + '</span><span class="lesson-step"><span class="lesson-step-dot"></span>' + esc(tr('lesson.finish')) + '</span></div><div class="lesson-body">' +
      '<section class="content-section"><p class="view-kicker">01 · ' + esc(tr('lesson.introduction')) + '</p><p class="section-lede">' + esc(content.introduction) + '</p><div class="what-list">' + (content.objectives || []).map((objective, index) => '<div class="what-item"><span>0' + (index + 1) + '</span><p>' + esc(objective) + '</p></div>').join('') + '</div></section>' +
      (lesson.sections || []).map(renderSection).join('') +
      '<section class="content-section"><p class="view-kicker">08 · ' + esc(tr('lesson.vocabulary')) + '</p><h2>' + esc(tr('lesson.vocabularyTitle')) + '</h2><p class="section-lede">' + esc(tr('lesson.vocabularyCopy')) + '</p><div class="vocab-grid">' + (content.vocabulary || []).map(renderVocabulary).join('') + '</div></section>' +
      '<section class="content-section exercises-section"><p class="view-kicker">09 · ' + esc(tr('lesson.practice')) + '</p><h2>' + esc(tr('exercise.pluralTitle')) + '</h2><p class="section-lede">' + esc(tr('lesson.practiceCopy')) + '</p><div class="exercise-list">' + (lesson.exercises || []).map((exercise, index) => exercises.renderExercise(exercise, index, lesson.id)).join('') + '</div>' + renderResultCard(lesson, session, 'lesson-result') + '</section>' +
       '<section class="content-section"><p class="view-kicker">11 · ' + esc(tr('lesson.closing')) + '</p><div class="summary-card"><h3>' + esc(tr('lesson.summaryTitle')) + '</h3><ul>' + (content.summary || []).map((item) => '<li><span class="summary-icon" aria-hidden="true">' + icon('check', 'summary-icon-svg') + '</span><span>' + esc(item) + '</span></li>').join('') + '</ul></div></section>' +
      '<footer class="lesson-footer"><div class="lesson-nav-buttons"><button type="button" class="button button-secondary" data-nav-lesson="prev"' + (content.number === 1 ? ' disabled' : '') + '>' + icon('arrow-left', 'button-icon') + esc(tr('lesson.previous')) + '</button><button type="button" class="button button-secondary" data-nav-lesson="next"' + (content.number === lessons.length ? ' disabled' : '') + '>' + esc(tr('lesson.next')) + icon('arrow-right', 'button-icon') + '</button></div><button type="button" class="button button-yellow finish-button" data-complete-lesson="' + esc(lesson.id) + '"' + (progress.completedLessons.includes(lesson.id) ? ' disabled' : '') + '>' + (progress.completedLessons.includes(lesson.id) ? icon('check', 'button-icon') + esc(tr('lesson.completedButton')) : esc(tr('lesson.complete'))) + '</button></footer>' +
       '</div></div>';
    icons.refresh(view);
  }

  function renderSection(section) {
    const source = section;
    section = localized(section);
    if (section.type === 'soundGrid') {
      return '<section class="content-section"><p class="view-kicker">02 · ' + esc(tr('lesson.explanation')) + '</p><h2>' + esc(section.title) + '</h2><p class="section-lede">' + esc(section.lede || '') + '</p><div class="sound-grid">' + (section.items || []).map((item) => '<article class="sound-card"><div class="sound-symbol">' + esc(item.symbol) + '</div><div><h3>' + esc(item.title) + '</h3><p>' + esc(item.pronunciation) + '</p><p class="sound-example">' + esc(item.example) + ' · ' + esc(item.translation) + ' <button type="button" class="audio-inline" data-speak="' + esc(item.example) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: item.example })) + '">' + icon('volume-2', 'audio-icon') + '</button></p></div></article>').join('') + '</div></section>';
    }
    if (section.type === 'table') {
      return '<section class="content-section"><p class="view-kicker">02 · ' + esc(tr('lesson.explanation')) + '</p><h2>' + esc(section.title) + '</h2>' + (section.lede ? '<p class="section-lede">' + esc(section.lede) + '</p>' : '') + '<div class="data-table-wrap"><table class="data-table"><thead><tr>' + (section.headers || []).map((header) => '<th>' + esc(header) + '</th>').join('') + '</tr></thead><tbody>' + (section.rows || []).map((row, rowIndex) => '<tr>' + row.map((cell, index) => { const spoken = source.rows && source.rows[rowIndex] ? source.rows[rowIndex][index] : cell; return '<td>' + esc(cell) + (index === 0 && /^[a-zäöüßÄÖÜ]/i.test(spoken) ? ' <button type="button" class="audio-inline" data-speak="' + esc(spoken) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: spoken })) + '">' + icon('volume-2', 'audio-icon') + '</button>' : '') + '</td>'; }).join('') + '</tr>').join('') + '</tbody></table></div></section>';
    }
    if (section.type === 'examples') {
      return '<section class="content-section"><p class="view-kicker">03 · ' + esc(tr('lesson.examples')) + '</p><h2>' + esc(section.title) + '</h2>' + (section.lede ? '<p class="section-lede">' + esc(section.lede) + '</p>' : '') + '<div class="example-list">' + (section.items || []).map((item) => '<div class="example-row"><div><div class="example-de">' + esc(item.de) + '</div><span class="example-pt">' + esc(item.pt) + '</span>' + (item.note ? '<span class="example-note">' + esc(item.note) + '</span>' : '') + '</div><button type="button" class="speak-button" data-speak="' + esc(item.de) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: item.de })) + '">' + icon('volume-2', 'audio-icon') + '</button></div>').join('') + '</div></section>';
    }
    if (section.type === 'rule') {
      return '<section class="content-section"><p class="view-kicker">02 · ' + esc(tr('lesson.explanation')) + '</p><h2>' + esc(section.title) + '</h2><div class="rule-strip">' + (section.segments || []).map((segment, index) => '<span class="rule-segment' + (index === section.verbIndex ? ' is-verb' : '') + '">' + esc(segment) + '</span>' + (index < section.segments.length - 1 ? '<span class="rule-arrow" aria-hidden="true">' + icon('arrow-right', 'rule-arrow-icon') + '</span>' : '')).join('') + '<p class="rule-caption">' + esc(section.caption) + '</p></div></section>';
    }
    if (section.type === 'callout') {
      return '<section class="content-section"><div class="info-callout"><span class="callout-icon" aria-hidden="true">' + icon('lightbulb', 'callout-icon-svg') + '</span><p><strong>' + esc(section.title) + '</strong><br>' + section.text + '</p></div></section>';
    }
    if (section.type === 'compare') {
      return '<section class="content-section"><p class="view-kicker">02 · ' + esc(tr('lesson.explanation')) + '</p><h2>' + esc(section.title) + '</h2><div class="scenario-grid">' + (section.items || []).map((item) => '<article class="scenario-card"><h3><span class="scenario-icon" aria-hidden="true">' + icon('circle-help', 'scenario-icon-svg') + '</span>' + esc(item.label) + '</h3><p class="panel-intro" style="margin-top:8px;margin-bottom:0">' + esc(item.description) + '</p><ul>' + (item.examples || []).map((example) => '<li>' + esc(example) + '</li>').join('') + '</ul></article>').join('') + '</div></section>';
    }
    if (section.type === 'scenario') {
      return '<section class="content-section"><p class="view-kicker">07 · ' + esc(tr('lesson.realLife')) + '</p><h2>' + esc(section.title) + '</h2><div class="scenario-grid">' + (section.scenarios || []).map((scenario) => '<article class="scenario-card"><h3><span class="scenario-icon" aria-hidden="true">' + icon(scenario.icon, 'scenario-icon-svg') + '</span>' + esc(scenario.title) + '</h3><ul>' + (scenario.phrases || []).map((phrase) => { const audio = phrase.split(' — ')[0]; return '<li><span>' + esc(phrase) + '</span> <button type="button" class="audio-inline" data-speak="' + esc(audio) + '" aria-label="' + esc(tr('vocabulary.listenPhrase')) + '">' + icon('volume-2', 'audio-icon') + '</button></li>'; }).join('') + '</ul></article>').join('') + '</div></section>';
    }
    if (section.type === 'dialogue') {
      return '<section class="content-section"><p class="view-kicker">07 · ' + esc(tr('lesson.conversation')) + '</p><h2>' + esc(section.title) + '</h2><div class="dialogue">' + (section.lines || []).map((line) => '<div class="dialogue-line"><span class="dialogue-speaker">' + esc(line[0]) + '</span><span class="dialogue-text">' + esc(line[1]) + '</span><button type="button" class="speak-button" data-speak="' + esc(line[1]) + '" aria-label="' + esc(tr('vocabulary.listenPhrase')) + '">' + icon('volume-2', 'audio-icon') + '</button></div>').join('') + '</div></section>';
    }
    return '';
  }

  function renderVocabulary(item) {
    const content = localized(item);
    return '<article class="vocab-card"><div class="vocab-card-top"><div><div class="vocab-word">' + esc(content.word) + '</div><div class="vocab-meaning">' + esc(content.meaning) + '</div></div><button type="button" class="speak-button" data-speak="' + esc(content.word) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: content.word })) + '">' + icon('volume-2', 'audio-icon') + '</button></div><p class="vocab-example"><em>' + esc(content.example) + '</em></p></article>';
  }

  function renderVocabularyWord(item) {
    const content = localized(item);
    return '<article class="vocab-card vocabulary-word-card"><div class="vocab-card-top"><div><div class="vocab-word">' + esc(content.word) + '</div><div class="vocab-meaning">' + esc(content.meaning) + '</div></div><button type="button" class="speak-button" data-speak="' + esc(content.word) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: content.word })) + '">' + icon('volume-2', 'audio-icon') + '</button></div></article>';
  }

  function renderNumberCard(item, index) {
    return '<article class="number-card"><span class="number-card-index">' + String(index + 1).padStart(2, '0') + '</span><div class="number-card-copy"><strong>' + esc(item[1]) + '</strong><span>' + esc(item[0]) + '</span></div><button type="button" class="speak-button" data-speak="' + esc(item[1]) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: item[1] })) + '">' + icon('volume-2', 'audio-icon') + '</button></article>';
  }

  function renderNumberRule(rule) {
    const content = localized(rule);
    return '<article class="number-rule-card"><div class="number-rule-top"><span class="number-rule-range">' + esc(content.range) + '</span><span class="number-rule-icon" aria-hidden="true">' + icon(content.icon) + '</span></div><h3>' + esc(content.title) + '</h3><p>' + esc(content.description) + '</p><div class="number-rule-examples">' + content.examples.map((example) => '<div class="number-rule-example"><span>' + esc(example[0]) + '</span><strong>' + esc(example[1]) + '</strong><button type="button" class="audio-inline" data-speak="' + esc(example[1]) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: example[1] })) + '">' + icon('volume-2', 'audio-icon') + '</button></div>').join('') + '</div></article>';
  }

  function renderCalendarCard(item, index, kind) {
    const names = kind === 'weekday' ? { 'segunda-feira': 'Monday', 'terça-feira': 'Tuesday', 'quarta-feira': 'Wednesday', 'quinta-feira': 'Thursday', 'sexta-feira': 'Friday', 'sábado': 'Saturday', 'domingo': 'Sunday' } : { janeiro: 'January', fevereiro: 'February', março: 'March', abril: 'April', maio: 'May', junho: 'June', julho: 'July', agosto: 'August', setembro: 'September', outubro: 'October', novembro: 'November', dezembro: 'December' };
    const label = i18n.getLanguage() === 'en' ? (names[item[1]] || item[1]) : item[1];
    const prefix = 'der ';
    const usage = kind === 'weekday' ? 'am ' + item[0] + ' · ' + tr('vocabulary.on') + ' ' + label : 'im ' + item[0] + ' · ' + tr('vocabulary.in') + ' ' + label;
    return '<article class="calendar-card"><span class="calendar-card-index">' + String(index + 1).padStart(2, '0') + '</span><div class="calendar-card-copy"><strong>' + prefix + esc(item[0]) + '</strong><span>' + esc(label) + '</span><small>' + esc(usage) + '</small></div><button type="button" class="speak-button" data-speak="' + esc(item[0]) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: item[0] })) + '">' + icon('volume-2', 'audio-icon') + '</button></article>';
  }

  function renderVocabularyPage() {
    const pageKey = ui.route.replace('vocabulary-', '');
    const meta = {
      kicker: tr('vocabPage.' + pageKey + '.kicker'),
      title: tr('vocabPage.' + pageKey + '.title'),
      accent: tr('vocabPage.' + pageKey + '.accent'),
      copy: tr('vocabPage.' + pageKey + '.copy'),
      iconName: { words: 'book-open', phrases: 'book-open', numbers: 'hash', weekdays: 'calendar-days', months: 'calendar-range' }[pageKey],
      mark: pageKey === 'words' ? vocabulary.words.length + ' ' + tr('vocabulary.wordCount') : pageKey === 'phrases' ? vocabulary.phrases.length + ' ' + tr('vocabulary.phraseCount') : pageKey === 'numbers' ? '1 → 1.000.000' : pageKey === 'weekdays' ? '7 ' + tr('vocabulary.weekdayCount') : '12 ' + tr('vocabulary.monthCount'),
      sectionLabel: tr('vocabPage.' + pageKey + '.sectionLabel'),
      sectionTitle: tr('vocabPage.' + pageKey + '.sectionTitle'),
      sectionDescription: tr('vocabPage.' + pageKey + '.sectionDescription')
    };
    const tabs = [
      ['vocabulary-words', '01', tr('vocabulary.wordsTab'), vocabulary.words.length + ' ' + tr('vocabulary.wordCount')],
      ['vocabulary-phrases', '02', tr('vocabulary.phrasesTab'), vocabulary.phrases.length + ' ' + tr('vocabulary.phraseCount')],
      ['vocabulary-numbers', '03', tr('vocabulary.numbersTab'), tr('vocabulary.oneToMillion')],
      ['vocabulary-weekdays', '04', tr('vocabulary.weekdaysTab'), '7 ' + tr('vocabulary.weekdayCount')],
      ['vocabulary-months', '05', tr('vocabulary.monthsTab'), '12 ' + tr('vocabulary.monthCount')]
    ];
    let content = '';
    if (ui.route === 'vocabulary-words') {
      content = '<div class="vocab-grid vocabulary-word-grid">' + vocabulary.words.map(renderVocabularyWord).join('') + '</div>';
    } else if (ui.route === 'vocabulary-phrases') {
      content = '<div class="example-list vocabulary-phrase-list">' + vocabulary.phrases.map((phrase) => { const item = localized(phrase); return '<div class="example-row"><div><div class="example-de">' + esc(item.de) + '</div><span class="example-pt">' + esc(item.pt) + '</span></div><button type="button" class="speak-button" data-speak="' + esc(item.de) + '" aria-label="' + esc(tr('vocabulary.listenWord', { word: item.de })) + '">' + icon('volume-2', 'audio-icon') + '</button></div>'; }).join('') + '</div>';
    } else if (ui.route === 'vocabulary-numbers') {
      const rules = [
        { range: '20 → 100', title: 'Unidade + und + dezena', title_en: 'Unit + und + tens', description: 'A unidade vem antes da dezena. O und significa “e”: 21 é literalmente “um e vinte”.', description_en: 'The unit comes before the tens. Und means “and”: 21 is literally “one and twenty”.', icon: 'arrow-left-right', examples: [['21', 'einundzwanzig'], ['32', 'zweiunddreißig'], ['47', 'siebenundvierzig'], ['99', 'neunundneunzig']] },
        { range: '100 → 1.000', title: 'Centena + resto do número', title_en: 'Hundreds + the rest of the number', description: 'Use hundert depois da centena e continue com a mesma lógica das dezenas. 100 pode ser hundert ou einhundert.', description_en: 'Use hundert after the hundreds digit and continue with the same tens logic. 100 can be hundert or einhundert.', icon: 'layers-3', examples: [['101', 'einhunderteins'], ['245', 'zweihundertfünfundvierzig'], ['999', 'neunhundertneunundneunzig']] },
        { range: '1.000 → 1.000.000', title: 'Milhar + centenas', title_en: 'Thousands + hundreds', description: 'Coloque tausend depois do bloco dos milhares. Em 1.000.000, use eine Million; Million é um substantivo.', description_en: 'Place tausend after the thousands block. For 1,000,000, use eine Million; Million is a noun.', icon: 'milestone', examples: [['1.234', 'eintausendzweihundertvierunddreißig'], ['12.500', 'zwölftausendfünfhundert'], ['1.000.000', 'eine Million']] }
      ];
      content = '<section class="number-basics"><div class="number-basics-heading"><div><p class="view-kicker">01 · ' + esc(tr('vocabulary.firstStep')) + '</p><h3>' + esc(tr('vocabulary.numbers1to20')) + '</h3><p>' + esc(tr('vocabulary.numbersBaseCopy')) + '</p></div><span class="number-basics-note">20 = zwanzig</span></div><div class="number-grid">' + vocabulary.numbers.map(renderNumberCard).join('') + '</div></section><div class="number-rule-grid">' + rules.map(renderNumberRule).join('') + '</div><div class="info-callout number-tip"><span class="callout-icon" aria-hidden="true">' + icon('lightbulb', 'callout-icon-svg') + '</span><p><strong>' + esc(tr('vocabulary.numberRuleTipTitle')) + '</strong><br>' + tr('vocabulary.numberRuleTip') + '</p></div>';
    } else if (ui.route === 'vocabulary-weekdays') {
      content = '<div class="calendar-grid">' + vocabulary.weekdays.map((item, index) => renderCalendarCard(item, index, 'weekday')).join('') + '</div><div class="info-callout calendar-tip"><span class="callout-icon" aria-hidden="true">' + icon('calendar-check', 'callout-icon-svg') + '</span><p><strong>' + esc(tr('vocabulary.weekdayCalloutTitle')) + '</strong><br>' + tr('vocabulary.weekdayCallout') + '</p></div>';
    } else {
      content = '<div class="calendar-grid months-grid">' + vocabulary.months.map((item, index) => renderCalendarCard(item, index, 'month')).join('') + '</div><div class="info-callout calendar-tip"><span class="callout-icon" aria-hidden="true">' + icon('calendar-check', 'callout-icon-svg') + '</span><p><strong>' + esc(tr('vocabulary.monthCalloutTitle')) + '</strong><br>' + tr('vocabulary.monthCallout') + '</p></div>';
    }
    view.innerHTML = '<div class="fade-in vocabulary-page"><section class="vocabulary-hero"><div><p class="view-kicker">' + esc(meta.kicker) + '</p><h1>' + esc(meta.title) + '<br><span>' + esc(meta.accent) + '</span></h1><p class="vocabulary-hero-copy">' + esc(meta.copy) + '</p></div><div class="vocabulary-hero-mark" aria-hidden="true">' + icon(meta.iconName) + '<small>' + esc(meta.mark) + '</small></div></section>' +
      '<nav class="vocabulary-tabs" aria-label="' + esc(tr('vocabulary.sectionsAria')) + '">' + tabs.map((tab) => '<button type="button" role="tab" class="vocabulary-tab' + (ui.route === tab[0] ? ' is-active' : '') + '" data-route="' + tab[0] + '" aria-selected="' + (ui.route === tab[0] ? 'true' : 'false') + '"><span>' + tab[1] + '</span><strong>' + esc(tab[2]) + '</strong><small>' + esc(tab[3]) + '</small></button>').join('') + '</nav>' +
      '<section class="content-section vocabulary-content"><p class="view-kicker">' + esc(meta.sectionLabel) + '</p><h2>' + esc(meta.sectionTitle) + '</h2><p class="section-lede">' + esc(meta.sectionDescription) + '</p>' + content + '</section></div>';
  }

  function renderResultCard(lesson, session, id) {
    const answered = Object.values(session.answers).filter((answer) => answer.checked);
    const allDone = answered.length === lesson.exercises.length;
    const correct = answered.filter((answer) => answer.correct).length;
    const percent = answered.length ? Math.round((correct / answered.length) * 100) : 0;
    const messageKey = percent >= 90 ? 'result.excellent' : percent >= 70 ? 'result.veryGood' : percent >= 50 ? 'result.advancing' : 'result.recommendReview';
    return '<section class="result-card' + (answered.length ? ' is-visible' : '') + '" id="' + id + '" aria-live="polite"><div class="result-score"><span class="score-circle" style="--score:' + percent + '%">' + (answered.length ? percent + '%' : '—') + '</span><div><strong>' + correct + ' / ' + (answered.length || lesson.exercises.length) + '</strong><span>' + esc(allDone ? tr('result.lesson') : tr('result.answered', { count: answered.length })) + '</span></div></div><div class="result-message"><strong>' + esc(answered.length ? tr(messageKey) : tr('result.emptyTitle')) + '</strong><span>' + esc(allDone ? tr('result.allDoneCopy') : tr('result.continueCopy')) + '</span></div><div class="result-actions">' + (allDone ? '<button type="button" class="button button-secondary" data-retry-lesson="' + esc(lesson.id) + '">' + icon('rotate-ccw', 'button-icon') + esc(tr('result.retry')) + '</button>' : '') + (answered.length ? '<button type="button" class="button button-secondary" data-scroll-summary>' + esc(tr('result.summary')) + '</button>' : '') + '</div></section>';
  }

  function buildReviewQuestions(progress) {
    const pool = [];
    lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).forEach((lesson) => lesson.exercises.forEach((exercise) => pool.push({ lessonId: lesson.id, lessonTitle: localize(lesson, 'title'), exercise })));
    for (let index = pool.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [pool[index], pool[swap]] = [pool[swap], pool[index]];
    }
    return pool.slice(0, Math.min(6, pool.length));
  }

  function renderReview() {
    const progress = getProgress();
    ui.reviewQuestions = buildReviewQuestions(progress);
    if (!ui.reviewQuestions.length) {
      view.innerHTML = '<div class="fade-in"><section class="review-hero"><div><p class="view-kicker">' + esc(tr('review.kicker')) + '</p><h1>' + esc(tr('review.title')) + '</h1><p>' + esc(tr('review.copy')) + '</p></div><div class="review-mark" aria-hidden="true">' + icon('refresh-cw', 'review-mark-icon') + '</div></section><div class="review-empty"><div class="empty-symbol" aria-hidden="true">' + icon('sparkles') + '</div><h3>' + esc(tr('review.emptyTitle')) + '</h3><p>' + esc(tr('review.emptyCopy')) + '</p><button type="button" class="button button-primary" data-open-lesson="' + esc(lessons[0].id) + '">' + esc(tr('review.start')) + icon('arrow-right', 'button-icon') + '</button></div></div>';
      icons.refresh(view);
      return;
    }
      view.innerHTML = '<div class="fade-in"><section class="review-hero"><div><p class="view-kicker">' + esc(tr('review.kicker')) + '</p><h1>' + esc(tr('review.title')) + '</h1><p>' + esc(tr('review.selectedCopy')) + '</p></div><div class="review-mark" aria-hidden="true">' + icon('refresh-cw', 'review-mark-icon') + '</div></section><div class="review-meta"><span class="meta-pill">' + icon('list-checks', 'meta-icon') + esc(tr('review.questions', { count: ui.reviewQuestions.length })) + '</span><span class="meta-pill">' + icon('book-open', 'meta-icon') + esc(tr('review.lessonsAvailable', { count: progress.completedLessons.length })) + '</span></div><div class="exercise-list">' + ui.reviewQuestions.map((item, index) => exercises.renderExercise(item.exercise, index, item.lessonId)).join('') + '</div>' + renderReviewResult() + '<div class="lesson-footer"><span class="muted" style="font-size:11px">' + esc(tr('review.footer')) + '</span><button type="button" class="button button-secondary" data-route="dashboard">' + icon('arrow-left', 'button-icon') + esc(tr('review.back')) + '</button></div></div>';
    icons.refresh(view);
  }

  function renderReviewResult() {
    const answered = Object.values(ui.reviewSession).filter((answer) => answer.checked);
    if (!answered.length) return '<section class="result-card" id="review-result" aria-live="polite"></section>';
    const correct = answered.filter((answer) => answer.correct).length;
    const percent = Math.round((correct / answered.length) * 100);
    return '<section class="result-card is-visible" id="review-result" aria-live="polite"><div class="result-score"><span class="score-circle" style="--score:' + percent + '%">' + percent + '%</span><div><strong>' + correct + ' / ' + answered.length + '</strong><span>' + esc(tr('review.scoreLabel')) + '</span></div></div><div class="result-message"><strong>' + esc(percent >= 80 ? tr('review.goodMemory') : tr('review.buildingBase')) + '</strong><span>' + esc(tr('review.continue')) + '</span></div><div class="result-actions"><button type="button" class="button button-secondary" data-retry-review>' + icon('rotate-ccw', 'button-icon') + esc(tr('review.newSelection')) + '</button></div></section>';
  }

  function renderVerbRow(item, session, index) {
    const content = localized(item);
    const response = session.answers[item.id] || '';
    const hasResult = session.checked && Object.prototype.hasOwnProperty.call(session.results, item.id);
    const correct = hasResult && session.results[item.id];
    const statusClass = hasResult ? (correct ? ' is-correct' : response.trim() ? ' is-wrong' : ' is-empty') : '';
    const statusText = !hasResult ? '' : correct ? tr('verb.status.correct') : response.trim() ? tr('verb.status.wrong') : tr('verb.status.empty');
    const correctAnswer = hasResult && !correct ? '<span class="verb-correct-answer">' + esc(tr('verb.correctAnswer', { answer: item.answers.join(' / ') })) + '</span>' : '';
    return '<div class="verb-prompt-row' + statusClass + '" data-verb-row data-verb-id="' + esc(item.id) + '">' +
      '<div class="verb-prompt-copy"><span class="verb-prompt-number">' + String(index + 1).padStart(2, '0') + '</span><div><strong>' + esc(content.prompt) + '</strong><span>' + esc(content.detail) + '</span></div></div>' +
      '<div class="verb-input-wrap"><span class="verb-input-label">' + esc(tr('verb.inGerman')) + '</span><input class="verb-input" type="text" autocomplete="off" spellcheck="false" data-verb-input data-verb-id="' + esc(item.id) + '" value="' + esc(response) + '" placeholder="' + esc(content.placeholder) + '" aria-label="' + esc(tr('exercise.answerFor', { prompt: content.prompt })) + '" /></div>' +
      '<span class="verb-row-feedback" data-verb-feedback>' + (statusText ? (correct ? icon('circle-check', 'verb-feedback-symbol') : icon('circle-x', 'verb-feedback-symbol')) + statusText + correctAnswer : '') + '</span>' +
      '</div>';
  }

  function renderSentenceFeedback(item, response, status) {
    const content = localized(item);
    const canonical = content.answers[0];
    if (status === 'correct') {
      return '<div class="verb-sentence-feedback is-correct" role="status" aria-live="polite">' + icon('circle-check', 'verb-feedback-symbol') + '<div><strong>' + esc(tr('verb.correctNotice', { answer: canonical })) + '</strong></div></div>';
    }
    if (status === 'wrong') {
      return '<div class="verb-sentence-feedback is-wrong" role="status" aria-live="polite"><div><strong>' + esc(tr('verb.wrongNotice')) + '</strong><div class="verb-answer-comparison"><div><span>' + esc(tr('verb.youWrote')) + '</span><strong>' + esc(response) + '</strong></div><div><span>' + esc(tr('verb.correctAnswerLabel')) + '</span><strong>' + esc(canonical) + '</strong></div></div></div></div>';
    }
    return '';
  }

  function focusVerbAnswer() {
    const input = document.querySelector('[data-verb-answer]');
    if (input) input.focus();
  }

  function renderSentenceStreak(session) {
    const streak = Math.max(0, Number.isFinite(session.streak) ? session.streak : 0);
    const visibleStreak = Math.min(streak, 10);
    const copy = streak === 0 ? tr('verb.streakZero') : streak === 1 ? tr('verb.streakSingle') : tr('verb.streakPlural', { count: streak });
    const segments = Array.from({ length: 10 }, (_, index) => '<span class="' + (index < visibleStreak ? 'is-active' : '') + '"></span>').join('');
    return '<div class="verb-streak-meter" data-verb-streak role="meter" aria-live="polite" aria-valuemin="0" aria-valuemax="10" aria-valuenow="' + visibleStreak + '" aria-valuetext="' + esc(copy) + '" aria-label="' + esc(tr('verb.streakLabel')) + '"><div class="verb-streak-summary"><span>' + esc(tr('verb.streakLabel')) + '</span><strong>' + streak + '</strong></div><div class="verb-streak-track" aria-hidden="true">' + segments + '</div><span class="verb-streak-copy">' + esc(copy) + '</span></div>';
  }

  function renderSentencePractice(page, mode, session) {
    const total = mode.items.length;
    if (!total) return '<div class="verb-sentence-practice"><p>' + esc(tr('verb.resultEmptyCopy')) + '</p></div>';
    if (session.completed) {
      return '<div class="verb-sentence-practice is-complete" data-verb-sentence-practice><div class="verb-completion-mark" aria-hidden="true">' + icon('circle-check') + '</div><div><h3>' + esc(tr('verb.completedTitle')) + '</h3><p>' + esc(tr('verb.completedCopy', { total })) + ' ' + esc(tr('verb.finalStreak', { count: session.streak || 0 })) + '</p></div><button type="button" class="button button-secondary" data-retry-verb="restart">' + icon('rotate-ccw', 'button-icon') + esc(tr('verb.restartSentences')) + '</button></div>';
    }
    const index = Math.min(Math.max(Number.isInteger(session.currentIndex) ? session.currentIndex : 0, 0), total - 1);
    session.currentIndex = index;
    const item = getCurrentVerbSentence(mode, session);
    const content = localized(item);
    const response = session.answers[item.id] || '';
    const status = session.status || 'idle';
    const disabled = status === 'correct' || status === 'wrong' ? ' disabled' : '';
    let action = '<button type="button" class="button button-primary" data-check-verb>' + icon('check', 'button-icon') + esc(tr('verb.checkSentence')) + '</button>';
    if (status === 'correct') {
      const isLast = index === total - 1;
      action = '<button type="button" class="button button-primary" data-next-verb>' + icon(isLast ? 'check' : 'arrow-right', 'button-icon') + esc(isLast ? tr('verb.completedTitle') : tr('verb.nextSentence')) + '</button>';
    } else if (status === 'wrong') {
      action = '<button type="button" class="button button-secondary" data-retry-verb="current">' + icon('rotate-ccw', 'button-icon') + esc(tr('verb.tryAgain')) + '</button>';
    }
    return '<div class="verb-sentence-practice" data-verb-sentence-practice>' +
      renderSentenceStreak(session) +
      '<article class="verb-sentence-card' + (status === 'correct' ? ' is-correct' : status === 'wrong' ? ' is-wrong' : '') + '">' +
      '<div class="verb-sentence-number" aria-hidden="true">' + String(index + 1).padStart(2, '0') + '</div>' +
      '<div class="verb-sentence-copy"><h3>' + esc(content.prompt) + '</h3><p>' + esc(content.detail) + '</p></div>' +
      '<div class="verb-sentence-input-wrap"><label class="verb-input-label" for="verb-answer-' + esc(page.id) + '">' + esc(tr('verb.sentenceInput')) + '</label><input id="verb-answer-' + esc(page.id) + '" class="verb-input" type="text" autocomplete="off" spellcheck="false" data-verb-input data-verb-answer data-verb-id="' + esc(item.id) + '" value="' + esc(response) + '" placeholder="' + esc(content.placeholder) + '" aria-label="' + esc(tr('exercise.answerFor', { prompt: content.prompt })) + '"' + disabled + ' /></div>' +
      renderSentenceFeedback(item, response, status) +
      '<div class="verb-sentence-actions">' + action + '</div>' +
      '</article></div>';
  }

  function renderVerbResult(page, mode, session) {
    const contentPage = localized(page);
    const contentMode = localized(mode);
    if (!session.checked) {
      return '<div class="verb-result is-empty" data-verb-result aria-live="polite"><span class="verb-result-mark" aria-hidden="true">' + icon('sparkles') + '</span><div><strong>' + esc(tr('verb.resultEmptyTitle')) + '</strong><span>' + esc(tr('verb.resultEmptyCopy')) + '</span></div></div>';
    }
    const correct = mode.items.filter((item) => session.results[item.id]).length;
    const percent = Math.round((correct / mode.items.length) * 100);
    const message = percent === 100 ? contentPage.perfectMessage : percent >= 70 ? tr('verb.good') : tr('verb.keepBuilding');
    return '<div class="verb-result is-checked" data-verb-result aria-live="polite"><div class="verb-result-score"><span class="verb-score-circle" style="--verb-score:' + percent + '%"><span>' + percent + '%</span></span><div><strong>' + esc(tr('verb.correctCount', { correct, total: mode.items.length })) + '</strong><span>' + esc(tr('verb.correctAnswers')) + '</span></div></div><div class="verb-result-message"><strong>' + esc(message) + '</strong><span>' + esc(contentMode.title) + '</span></div></div>';
  }

  function renderExercises() {
    const page = getExercisePage();
    const mode = getVerbMode();
    const contentPage = localized(page);
    const contentMode = localized(mode);
    const session = getVerbSession(mode.id);
    const practiceContent = mode.id === 'sentences'
      ? renderSentencePractice(page, mode, session)
      : '<div class="verb-prompt-list">' + mode.items.map((item, index) => renderVerbRow(item, session, index)).join('') + '</div><div class="verb-form-actions"><button type="button" class="button button-primary" data-check-verb>' + esc(tr('verb.check')) + '</button><button type="button" class="button button-secondary" data-reset-verb>' + esc(tr('verb.reset')) + '</button></div>' + renderVerbResult(page, mode, session);
    view.innerHTML = '<div class="fade-in exercise-page"><section class="exercise-hero"><div><p class="view-kicker">' + esc(tr('verb.practiceKicker')) + '</p><h1>' + esc(contentPage.heroTitle) + '<br><span>' + esc(contentPage.heroAccent) + '</span></h1><p class="exercise-hero-copy">' + esc(tr('verb.heroIntro', { verb: contentPage.verb, copy: contentPage.heroCopy })) + '</p><div class="exercise-hero-meta"><span class="meta-pill">' + esc(tr('verb.present')) + '</span><span class="meta-pill">' + esc(tr('verb.challenges', { count: mode.items.length })) + '</span><span class="meta-pill">' + esc(tr('verb.noRush')) + '</span></div></div><div class="exercise-hero-mark" aria-hidden="true"><span>' + esc(contentPage.verb) + '</span><small>' + esc(contentPage.meaning) + '</small></div></section>' +
      '<div class="practice-tabs" role="tablist" aria-label="' + esc(tr('verb.tabsAria')) + '"><button type="button" class="practice-tab' + (mode.id === 'conjugation' ? ' is-active' : '') + '" data-exercise-mode="conjugation" role="tab" aria-controls="verb-practice-panel" aria-selected="' + (mode.id === 'conjugation' ? 'true' : 'false') + '"><span>01</span><strong>' + esc(tr('verb.conjugation')) + '</strong><small>' + esc(tr('verb.conjugationShort')) + '</small></button><button type="button" class="practice-tab' + (mode.id === 'sentences' ? ' is-active' : '') + '" data-exercise-mode="sentences" role="tab" aria-controls="verb-practice-panel" aria-selected="' + (mode.id === 'sentences' ? 'true' : 'false') + '"><span>02</span><strong>' + esc(tr('verb.sentences')) + '</strong><small>' + esc(tr('verb.sentencesShort')) + '</small></button></div>' +
      '<section class="verb-practice-card" id="verb-practice-panel" role="tabpanel"><div class="verb-practice-heading"><div><p class="view-kicker">' + esc(contentMode.shortLabel) + '</p><h2>' + esc(contentMode.title) + '</h2><p>' + esc(contentMode.instruction) + '</p></div><div class="verb-rule-note"><span class="verb-rule-note-mark" aria-hidden="true">' + icon('info') + '</span><span>' + esc(tr('verb.equals', { verb: contentPage.verb, meaning: contentPage.meaning })) + '</span></div></div>' + practiceContent + '</section>' +
      '<p class="exercise-page-note"><span aria-hidden="true">' + icon('sparkles') + '</span> ' + esc(tr('tip.speak')) + '</p></div>';
    icons.refresh(view);
  }

  function sessionForCard(card) {
    const lessonId = card.dataset.lessonId;
    const exerciseId = card.dataset.exerciseId;
    if (ui.route === 'review') {
      const key = lessonId + ':' + exerciseId;
      if (!ui.reviewSession[key]) ui.reviewSession[key] = { checked: false, attempts: 0 };
      return { state: ui.reviewSession[key], key, lessonId };
    }
    const session = getSession(lessonId);
    if (!session.answers[exerciseId]) session.answers[exerciseId] = { checked: false, attempts: 0 };
    return { state: session.answers[exerciseId], key: exerciseId, lessonId };
  }

  function findExercise(lessonId, exerciseId) {
    const lesson = getLesson(lessonId);
    return lesson ? lesson.exercises.find((exercise) => exercise.id === exerciseId) : null;
  }

  function responseKey(response) {
    return Array.isArray(response) ? response.join('|') : String(response);
  }

  function handleCheck(card) {
    const exercise = findExercise(card.dataset.lessonId, card.dataset.exerciseId);
    if (!exercise) return;
    const { state, lessonId } = sessionForCard(card);
    const response = exercises.readResponse(card, exercise);
    if ((Array.isArray(response) && response.length === 0) || (!Array.isArray(response) && !String(response).trim())) {
      showToast(tr('exercise.emptyAnswer'));
      return;
    }
    const key = responseKey(response);
    if (state.checked && state.responseKey === key) {
      showToast(tr('exercise.duplicateAnswer'));
      return;
    }
    const correct = exercises.isCorrect(response, exercise);
    state.checked = true;
    state.correct = correct;
    state.attempts = (state.attempts || 0) + 1;
    state.responseKey = key;
    if (ui.route !== 'review') storage.recordAnswer(lessonId, exercise.id, correct);
    else storage.recordReviewAnswer(correct);

    card.classList.remove('is-correct', 'is-wrong');
    card.classList.add(correct ? 'is-correct' : 'is-wrong');
    const feedback = card.querySelector('[data-feedback]');
    const symbol = card.querySelector('[data-feedback-symbol]');
    const text = card.querySelector('[data-feedback-text]');
    feedback.className = 'feedback is-visible ' + (correct ? 'is-correct' : 'is-wrong');
    symbol.innerHTML = correct ? icon('circle-check', 'feedback-icon') : icon('circle-x', 'feedback-icon');
    text.textContent = correct ? tr('exercise.correct', { explanation: localized(exercise).explanation }) : tr('exercise.tryAgain');
    icons.refresh(feedback);
    updateResultAfterAnswer();
  }

  function updateResultAfterAnswer() {
    const progress = getProgress();
    renderSidebar(progress);
    if (ui.route === 'review') {
      const result = document.getElementById('review-result');
      if (result) result.outerHTML = renderReviewResult();
      icons.refresh(document);
      return;
    }
    const lesson = getLesson(ui.activeLessonId);
    const session = getSession(lesson.id);
    const result = document.getElementById('lesson-result');
    if (result) result.outerHTML = renderResultCard(lesson, session, 'lesson-result');
    const percentage = lessonPercent(lesson, progress, session);
    const checked = Object.values(session.answers).filter((answer) => answer.checked).length;
    const value = document.getElementById('lesson-completion-value');
    const bar = document.getElementById('lesson-completion-bar');
    const note = document.getElementById('lesson-progress-note');
    if (value) value.textContent = percentage + '%';
    if (bar) bar.style.width = percentage + '%';
    if (note) note.textContent = tr('lesson.verified', { checked, total: lesson.exercises.length });
    icons.refresh(document);
  }

  function toggleExplanation(card) {
    const exercise = findExercise(card.dataset.lessonId, card.dataset.exerciseId);
    if (!exercise) return;
    const explanation = card.querySelector('[data-explanation]');
    const reveal = card.querySelector('[data-answer-reveal]');
    const opening = !explanation.classList.contains('is-visible');
    explanation.classList.toggle('is-visible', opening);
    if (opening) reveal.textContent = tr('exercise.answerReveal', { answer: exercises.answerLabel(exercise) });
  }

  function handleOrderWord(button) {
    const card = button.closest('[data-exercise-card]');
    const bank = card.querySelector('.word-bank');
    const answer = card.querySelector('[data-order-answer]');
    if (button.parentElement === bank) {
      answer.appendChild(button);
    } else {
      bank.appendChild(button);
    }
    const state = sessionForCard(card).state;
    state.checked = false;
    card.classList.remove('is-correct', 'is-wrong');
    card.querySelector('[data-feedback]').className = 'feedback';
  }

  function resetOrder(card) {
    const bank = card.querySelector('.word-bank');
    const answer = card.querySelector('[data-order-answer]');
    Array.from(answer.querySelectorAll('.word-chip')).forEach((chip) => bank.appendChild(chip));
    const state = sessionForCard(card).state;
    state.checked = false;
    card.classList.remove('is-correct', 'is-wrong');
    card.querySelector('[data-feedback]').className = 'feedback';
  }

  function navigateLesson(direction) {
    const index = lessons.findIndex((lesson) => lesson.id === ui.activeLessonId);
    const target = lessons[index + (direction === 'next' ? 1 : -1)];
    if (target) openLesson(target.id);
  }

  function openLesson(id) {
    if (!getLesson(id)) return;
    ui.activeLessonId = id;
    ui.route = 'lesson';
    render();
    closeSidebarOnMobile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function completeLesson(id) {
    const lesson = getLesson(id);
    const progress = storage.markLessonComplete(id);
    renderSidebar(progress);
    renderLesson(lesson);
    updateBreadcrumb();
    showToast(tr('lesson.progressComplete'), 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetLessonSession(id) {
    ui.sessions[id] = { answers: {}, isRetry: true };
    renderLesson(getLesson(id));
    renderSidebar(getProgress());
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(tr('toast.lessonReset'));
  }

  function resetAllProgress() {
    const confirmed = window.confirm(tr('confirm.reset'));
    if (!confirmed) return;
    storage.resetProgress();
    ui.sessions = {};
    ui.reviewSession = {};
    ui.route = 'dashboard';
    render();
    showToast(tr('toast.pathReset'));
  }

  function updateSidebarToggleState(isOpen) {
    document.querySelectorAll('[data-toggle-sidebar]').forEach((button) => {
      button.setAttribute('aria-expanded', String(isOpen));
      button.setAttribute('aria-label', tr(isOpen ? 'sidebar.close' : 'sidebar.open'));
    });
  }

  function setSidebarState(isOpen) {
    sidebarIsOpen = isOpen;
    sidebar.classList.toggle('is-open', isOpen);
    appShell.classList.toggle('is-sidebar-collapsed', !isOpen);
    sidebarScrim.classList.toggle('is-visible', isOpen && window.innerWidth <= sidebarBreakpoint);
    updateSidebarToggleState(isOpen);
  }

  function closeSidebar() {
    setSidebarState(false);
  }

  function openSidebar() {
    setSidebarState(true);
  }

  function toggleSidebar() {
    if (sidebarIsOpen) closeSidebar();
    else openSidebar();
  }

  function closeSidebarOnMobile() {
    if (window.innerWidth <= sidebarBreakpoint) closeSidebar();
  }

  function render() {
    const progress = getProgress();
    renderSidebar(progress);
    updateBreadcrumb();
    if (ui.route === 'dashboard') renderDashboard();
    else if (ui.route === 'review') renderReview();
    else if (ui.route === 'exercises' || ui.route === 'exercises-haben') renderExercises();
    else if (isVocabularyRoute(ui.route)) renderVocabularyPage();
    else renderLesson(getLesson(ui.activeLessonId));
    icons.refresh(document);
    i18n.apply(document);
    updateLanguageButtons();
    updateSidebarToggleState(sidebarIsOpen);
    view.focus({ preventScroll: true });
  }

  document.addEventListener('click', (event) => {
    const language = event.target.closest('[data-language]');
    if (language) {
      i18n.setLanguage(language.dataset.language);
      return;
    }
    const sectionToggle = event.target.closest('[data-toggle-sidebar-section]');
    if (sectionToggle) {
      const sectionId = sectionToggle.dataset.toggleSidebarSection;
      ui.sidebarSections[sectionId] = ui.sidebarSections[sectionId] === false;
      renderSidebar(getProgress());
      icons.refresh(document);
      return;
    }
    const speak = event.target.closest('[data-speak]');
    if (speak) {
      const worked = window.speakGerman(speak.dataset.speak);
      if (!worked) showToast(tr('toast.audioUnavailable'));
      return;
    }
    const open = event.target.closest('[data-open-lesson]');
    if (open) { openLesson(open.dataset.openLesson); return; }
    const route = event.target.closest('[data-route]');
    if (route) { ui.route = route.dataset.route; render(); closeSidebarOnMobile(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const exerciseMode = event.target.closest('[data-exercise-mode]');
    if (exerciseMode) {
      ui.exerciseModes[getExercisePage().id] = exerciseMode.dataset.exerciseMode;
      renderExercises();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (event.target.closest('[data-toggle-sidebar]')) { toggleSidebar(); return; }
    if (event.target.closest('[data-close-sidebar]')) { closeSidebar(); return; }
    if (event.target.closest('[data-reset-progress]')) { resetAllProgress(); return; }
    const option = event.target.closest('[data-option]');
    if (option) {
      const card = option.closest('[data-exercise-card]');
      card.querySelectorAll('[data-option]').forEach((item) => item.classList.remove('is-selected'));
      option.classList.add('is-selected');
      const state = sessionForCard(card).state;
      state.checked = false;
      card.classList.remove('is-correct', 'is-wrong');
      card.querySelector('[data-feedback]').className = 'feedback';
      return;
    }
    const orderWord = event.target.closest('[data-order-word]');
    if (orderWord) { handleOrderWord(orderWord); return; }
    const orderReset = event.target.closest('[data-reset-order]');
    if (orderReset) { resetOrder(orderReset.closest('[data-exercise-card]')); return; }
    const check = event.target.closest('[data-check-exercise]');
    if (check) { handleCheck(check.closest('[data-exercise-card]')); return; }
    const explanation = event.target.closest('[data-show-explanation]');
    if (explanation) { toggleExplanation(explanation.closest('[data-exercise-card]')); return; }
    const retry = event.target.closest('[data-retry-lesson]');
    if (retry) { resetLessonSession(retry.dataset.retryLesson); return; }
    const retryReview = event.target.closest('[data-retry-review]');
    if (retryReview) { ui.reviewSession = {}; renderReview(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const navLesson = event.target.closest('[data-nav-lesson]');
    if (navLesson && !navLesson.disabled) { navigateLesson(navLesson.dataset.navLesson); return; }
    const complete = event.target.closest('[data-complete-lesson]');
    if (complete && !complete.disabled) { completeLesson(complete.dataset.completeLesson); return; }
    if (event.target.closest('[data-next-verb]')) { nextVerbSentence(); return; }
    if (event.target.closest('[data-retry-verb]')) { retryVerbSentence(); return; }
    if (event.target.closest('[data-check-verb]')) { checkVerbPractice(); return; }
    if (event.target.closest('[data-reset-verb]')) { resetVerbPractice(); return; }
    if (event.target.closest('[data-scroll-summary]')) { document.querySelector('.summary-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  });

  document.addEventListener('input', (event) => {
    if (event.target.matches('.verb-input')) {
      const mode = getVerbMode();
      const session = getVerbSession(mode.id);
      if (mode.id === 'sentences') {
        const item = getCurrentVerbSentence(mode, session);
        if (item) session.answers[item.id] = event.target.value;
        session.checked = false;
        return;
      }
      session.answers[event.target.dataset.verbId] = event.target.value;
      session.checked = false;
      session.results = {};
      const result = document.querySelector('[data-verb-result]');
      if (result) result.outerHTML = renderVerbResult(getExercisePage(), mode, session);
      const row = event.target.closest('[data-verb-row]');
      row.classList.remove('is-correct', 'is-wrong', 'is-empty');
      row.querySelector('[data-verb-feedback]').textContent = '';
      return;
    }
    if (!event.target.matches('.exercise-input')) return;
    const card = event.target.closest('[data-exercise-card]');
    const state = sessionForCard(card).state;
    state.checked = false;
    card.classList.remove('is-correct', 'is-wrong');
    card.querySelector('[data-feedback]').className = 'feedback';
  });

  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= sidebarBreakpoint;
    if (isMobile === sidebarWasMobile) return;
    sidebarWasMobile = isMobile;
    setSidebarState(!isMobile);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebarIsOpen) closeSidebar();
  });

  function nextVerbSentence() {
    const mode = getVerbMode();
    const session = getVerbSession(mode.id);
    if (mode.id !== 'sentences' || session.status !== 'correct') return;
    if (session.currentIndex >= session.order.length - 1) {
      session.completed = true;
      renderExercises();
      return;
    }
    session.currentIndex += 1;
    session.status = 'idle';
    session.checked = false;
    renderExercises();
    focusVerbAnswer();
  }

  function retryVerbSentence() {
    const mode = getVerbMode();
    const session = getVerbSession(mode.id);
    if (mode.id !== 'sentences') return;
    if (session.completed) {
      resetVerbPractice();
      return;
    }
    const item = getCurrentVerbSentence(mode, session);
    if (item) {
      delete session.answers[item.id];
      delete session.results[item.id];
    }
    session.status = 'idle';
    session.checked = false;
    renderExercises();
    focusVerbAnswer();
  }

  function checkSentencePractice() {
    const mode = getVerbMode();
    const session = getVerbSession(mode.id);
    const item = getCurrentVerbSentence(mode, session);
    if (!item) return;
    const response = String(session.answers[item.id] || '').trim();
    if (!response) {
      showToast(tr('toast.answerRequired'));
      return;
    }
    const normalizeGermanAnswer = exercises.normalizeGermanAnswer || exercises.normalize;
    const correct = item.answers.some((answer) => normalizeGermanAnswer(response) === normalizeGermanAnswer(answer));
    session.answers[item.id] = response;
    session.results[item.id] = correct;
    session.checked = true;
    session.status = correct ? 'correct' : 'wrong';
    session.streak = Number.isFinite(session.streak) ? session.streak : 0;
    if (correct) {
      session.streak += 1;
    } else {
      session.streak = 0;
    }
    if (correct && session.currentIndex === session.order.length - 1) session.completed = true;
    renderExercises();
  }

  function checkVerbPractice() {
    const mode = getVerbMode();
    if (mode.id === 'sentences') {
      checkSentencePractice();
      return;
    }
    const session = getVerbSession(mode.id);
    const inputs = Array.from(document.querySelectorAll('.verb-input'));
    const hasAnswer = inputs.some((input) => input.value.trim());
    if (!hasAnswer) {
      showToast(tr('toast.answerRequired'));
      return;
    }
    mode.items.forEach((item) => {
      const input = document.querySelector('.verb-input[data-verb-id="' + item.id + '"]');
      const response = input ? input.value : '';
      session.answers[item.id] = response;
      const normalizeGermanAnswer = exercises.normalizeGermanAnswer || exercises.normalize;
      session.results[item.id] = item.answers.some((answer) => normalizeGermanAnswer(response) === normalizeGermanAnswer(answer));
    });
    session.checked = true;
    const scrollY = window.scrollY;
    renderExercises();
    window.scrollTo({ top: scrollY, behavior: 'auto' });
    const correct = mode.items.filter((item) => session.results[item.id]).length;
    showToast(correct === mode.items.length ? tr('verb.perfect') : tr('verb.checked'), correct === mode.items.length ? 'success' : '');
  }

  function resetVerbPractice() {
    const mode = getVerbMode();
    ui.verbSessions[getExercisePage().id + ':' + mode.id] = createVerbSession(mode);
    renderExercises();
    showToast(tr('toast.verbReset'));
  }
  setSidebarState(sidebarIsOpen);
  i18n.subscribe(() => render());
  render();
}());
