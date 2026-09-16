(function () {
  'use strict';

  const lessons = window.KlarLessons || [];
  const storage = window.KlarStorage;
  const exercises = window.KlarExercises;
  const verbPractice = window.KlarVerbPractice;
  const icons = window.KlarIcons;
  const ui = {
    route: 'dashboard',
    activeLessonId: lessons[0] ? lessons[0].id : null,
    sessions: {},
    reviewSession: {},
    reviewQuestions: [],
    exerciseModes: { sein: 'conjugation', haben: 'conjugation' },
    verbSessions: {}
  };

  const view = document.getElementById('app-view');
  const sidebar = document.getElementById('sidebar');
  const sidebarScrim = document.querySelector('.sidebar-scrim');
  const breadcrumb = document.getElementById('breadcrumb');
  const toastRegion = document.getElementById('toast-region');

  function esc(value) { return exercises.escapeHTML(value); }
  function icon(name, className, label) { return icons.render(name, className, label); }
  function getLesson(id) { return lessons.find((lesson) => lesson.id === id); }
  function getProgress() { return storage.getProgress(); }

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

  function getVerbSession(modeId) {
    const key = getExercisePage().id + ':' + modeId;
    if (!ui.verbSessions[key]) ui.verbSessions[key] = { answers: {}, results: {}, checked: false };
    return ui.verbSessions[key];
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
    document.getElementById('sidebar-progress-copy').textContent = percent === 0 ? 'Comece pelo primeiro passo.' : percent === 100 ? 'A1 Starter concluído!' : progress.completedLessons.length + ' de ' + lessons.length + ' aulas concluídas.';
    document.getElementById('review-badge').textContent = progress.completedLessons.length;
    document.getElementById('streak-value').textContent = progress.totalAnswered > 0 ? '2' : '1';
  }

  function renderSidebar(progress) {
    updateTopbar(progress);
    const nav = document.getElementById('lesson-nav');
    nav.innerHTML = lessons.map((lesson) => {
      const status = lessonStatus(lesson, progress);
      const isActive = ui.route === 'lesson' && ui.activeLessonId === lesson.id;
      return '<button type="button" class="lesson-nav-item' + (isActive ? ' is-active' : '') + '" data-open-lesson="' + esc(lesson.id) + '" aria-current="' + (isActive ? 'page' : 'false') + '">' +
        '<span class="lesson-nav-number">' + String(lesson.number).padStart(2, '0') + '</span>' +
        '<span class="lesson-nav-title">' + esc(lesson.title) + '</span>' +
        '<span class="lesson-status is-' + status + '" aria-label="' + (status === 'complete' ? 'Concluída' : status === 'progress' ? 'Em andamento' : 'Não iniciada') + '"></span>' +
        '</button>';
    }).join('');

    document.querySelectorAll('[data-route]').forEach((item) => item.classList.toggle('is-active', item.dataset.route === ui.route));
  }

  function updateBreadcrumb() {
    if (ui.route === 'dashboard') {
      breadcrumb.innerHTML = '<span>Meu Alemão</span><span aria-hidden="true">/</span><strong>Visão geral</strong>';
    } else if (ui.route === 'review') {
      breadcrumb.innerHTML = '<span>Meu Alemão</span><span aria-hidden="true">/</span><strong>Revisar</strong>';
    } else if (ui.route === 'exercises' || ui.route === 'exercises-haben') {
      breadcrumb.innerHTML = '<span>Prática A1</span><span aria-hidden="true">/</span><strong>Exercícios · ' + esc(getExercisePage().title) + '</strong>';
    } else {
      const lesson = getLesson(ui.activeLessonId);
      breadcrumb.innerHTML = '<span>Curso A1</span><span aria-hidden="true">/</span><strong>Aula ' + String(lesson.number).padStart(2, '0') + ' · ' + esc(lesson.title) + '</strong>';
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
      '<div><p class="view-kicker">Meu Alemão · seu espaço de estudo</p><h1>Aprenda alemão<br>do zero <span aria-label="Alemanha">🇩🇪</span></h1><p class="hero-copy">Um curso prático para construir sua base no alemão — com frases que cabem na sua vida na Alemanha.</p><div class="hero-note"><span class="hero-note-mark">' + icon('sparkles') + '</span><span>Conteúdo salvo localmente, no seu ritmo.</span></div></div>' +
        '<div class="overview-card"><div class="overview-card-top"><div><p class="overview-card-label">Progresso geral</p><h3>' + completed + ' de ' + lessons.length + ' aulas</h3></div><span class="overview-percent">' + percent + '%</span></div><div class="progress-track"><span style="width:' + percent + '%"></span></div><div class="overview-card-foot"><span>' + progress.totalAnswered + ' exercícios respondidos</span><strong>' + accuracy + '% de acertos</strong></div></div>' +
      '</section>' +
      '<section class="stats-grid" aria-label="Resumo do progresso">' +
        statCard(String(completed), 'aulas concluídas') + statCard(String(lessons.length), 'aulas no caminho') + statCard(String(progress.totalAnswered), 'exercícios feitos') + statCard(accuracy + '%', 'taxa de acertos') +
      '</section>' +
      '<section><div class="section-heading"><div><h2>Continuar estudando</h2><p>O próximo passo já está separado para você.</p></div></div>' +
        '<button type="button" class="continue-card" data-open-lesson="' + esc(next.id) + '"><span class="continue-number">' + String(next.number).padStart(2, '0') + '</span><span><h3>' + esc(next.title) + '</h3><p>' + (progress.completedLessons.length === lessons.length ? 'Revise uma aula e mantenha o ritmo.' : esc(next.focus)) + '</p></span><span class="continue-arrow" aria-hidden="true">' + icon('arrow-right') + '</span></button>' +
      '</section>' +
      '<section class="path-section"><div class="section-heading"><div><h2>Seu caminho</h2><p>De sons básicos a conversas que você realmente vai usar.</p></div><button type="button" class="text-button" data-route="review">Revisar aulas concluídas ' + icon('arrow-right') + '</button></div><div class="lesson-path">' + lessons.map((lesson) => renderPathCard(lesson, progress, next.id)).join('') + '</div></section>' +
      '<section class="bottom-grid"><div class="panel"><h3>Conquistas</h3><p class="panel-intro">Pequenos marcos para celebrar a constância, não a pressa.</p><div class="achievement-list">' + renderAchievements(progress) + '</div></div><div class="panel"><h3>Ritmo de estudo</h3><p class="panel-intro">Uma visão simples dos seus últimos passos.</p><div class="study-rhythm" aria-label="Ritmo de estudo dos últimos sete dias">' + [22, 38, 28, 46, 34, 57, progress.totalAnswered ? 68 : 0].map((height) => '<span class="rhythm-bar" style="height:' + height + '%"></span>').join('') + '</div><div class="rhythm-labels"><span>seg</span><span>ter</span><span>qua</span><span>qui</span><span>sex</span><span>sáb</span><span>hoje</span></div></div></section>' +
      '</div>';
  }

  function statCard(value, label) {
    return '<div class="stat-card"><span class="stat-value">' + esc(value) + '</span><span class="stat-label">' + esc(label) + '</span></div>';
  }

  function renderPathCard(lesson, progress, nextId) {
    const status = lessonStatus(lesson, progress);
    const percentage = lessonPercent(lesson, progress, ui.sessions[lesson.id]);
    const statusIcon = status === 'complete' ? 'circle-check' : status === 'progress' ? 'circle-dot' : 'circle';
    return '<button type="button" class="path-card' + (status === 'complete' ? ' is-complete' : '') + (lesson.id === nextId ? ' is-current' : '') + '" data-open-lesson="' + esc(lesson.id) + '"><div class="path-card-top"><span class="path-number">' + String(lesson.number).padStart(2, '0') + '</span><span class="path-status" aria-hidden="true">' + icon(statusIcon, 'status-icon') + '</span></div><h3>' + esc(lesson.title) + '</h3><p>' + (status === 'complete' ? 'Concluída' : status === 'progress' ? 'Em andamento' : esc(lesson.focus)) + '</p><span class="path-card-bar"><span style="width:' + percentage + '%"></span></span></button>';
  }

  function renderAchievements(progress) {
    const list = [
      ['first-step', 'sparkles', 'Primeiro passo', 'Conclua sua primeira aula.'],
      ['guten-tag', 'sun', 'Guten Tag!', 'Conclua 5 aulas.'],
      ['a1-starter', 'star', 'A1 Starter', 'Conclua as 10 aulas.']
    ];
    return list.map(([id, iconName, title, description]) => {
      const unlocked = progress.achievements.includes(id);
      return '<div class="achievement-row' + (unlocked ? ' is-unlocked' : '') + '"><span class="achievement-icon" aria-hidden="true">' + icon(iconName) + '</span><span class="achievement-copy"><strong>' + title + '</strong><span>' + description + '</span></span><span class="achievement-lock" aria-label="' + (unlocked ? 'Desbloqueada' : 'Bloqueada') + '">' + icon(unlocked ? 'check' : 'lock') + '</span></div>';
    }).join('');
  }

  function renderLesson(lesson) {
    const progress = getProgress();
    const session = getSession(lesson.id);
    const percentage = lessonPercent(lesson, progress, session);
    const checked = Object.values(session.answers).filter((answer) => answer.checked).length;
    const lessonStatusIcon = progress.completedLessons.includes(lesson.id) ? 'circle-check' : checked ? 'circle-dot' : 'circle';
    view.innerHTML = '<div class="fade-in"><section class="lesson-header"><div><p class="view-kicker">Aula ' + String(lesson.number).padStart(2, '0') + ' · ' + esc(lesson.focus) + '</p><h1>' + esc(lesson.title) + '</h1><p class="lesson-description">' + esc(lesson.description) + '</p><div class="lesson-meta"><span class="meta-pill">' + icon('clock-3', 'meta-icon') + esc(lesson.duration) + '</span><span class="meta-pill">' + icon('list-checks', 'meta-icon') + lesson.exercises.length + ' exercícios</span><span class="meta-pill">' + icon(lessonStatusIcon, 'meta-icon') + (progress.completedLessons.includes(lesson.id) ? ' concluída' : checked ? ' em andamento' : ' não iniciada') + '</span></div></div><div class="lesson-completion"><div class="lesson-completion-label"><span>Progresso desta aula</span><strong id="lesson-completion-value">' + percentage + '%</strong></div><div class="progress-track"><span id="lesson-completion-bar" style="width:' + percentage + '%"></span></div><p class="lesson-progress-note" id="lesson-progress-note">' + checked + ' de ' + lesson.exercises.length + ' exercícios verificados.</p></div></section><div class="lesson-steps" aria-label="Etapas da aula"><span class="lesson-step is-active"><span class="lesson-step-dot"></span>entenda</span><span class="lesson-step"><span class="lesson-step-dot"></span>observe</span><span class="lesson-step"><span class="lesson-step-dot"></span>pratique</span><span class="lesson-step"><span class="lesson-step-dot"></span>conclua</span></div><div class="lesson-body">' +
      '<section class="content-section"><p class="view-kicker">01 · Introdução</p><p class="section-lede">' + esc(lesson.introduction) + '</p><div class="what-list">' + lesson.objectives.map((objective, index) => '<div class="what-item"><span>0' + (index + 1) + '</span><p>' + esc(objective) + '</p></div>').join('') + '</div></section>' +
      lesson.sections.map(renderSection).join('') +
      '<section class="content-section"><p class="view-kicker">08 · Vocabulário</p><h2>Vocabulário da aula</h2><p class="section-lede">Guarde a palavra com o artigo e ouça a pronúncia sempre que precisar.</p><div class="vocab-grid">' + lesson.vocabulary.map(renderVocabulary).join('') + '</div></section>' +
      '<section class="content-section exercises-section"><p class="view-kicker">09 · Prática</p><h2>Exercícios</h2><p class="section-lede">Responda sem medo de errar. Você pode tentar novamente e abrir a explicação quando quiser.</p><div class="exercise-list">' + lesson.exercises.map((exercise, index) => exercises.renderExercise(exercise, index, lesson.id)).join('') + '</div>' + renderResultCard(lesson, session, 'lesson-result') + '</section>' +
       '<section class="content-section"><p class="view-kicker">11 · Fechamento</p><div class="summary-card"><h3>Antes de continuar, lembre-se</h3><ul>' + lesson.summary.map((item) => '<li><span class="summary-icon" aria-hidden="true">' + icon('check', 'summary-icon-svg') + '</span><span>' + esc(item) + '</span></li>').join('') + '</ul></div></section>' +
      '<footer class="lesson-footer"><div class="lesson-nav-buttons"><button type="button" class="button button-secondary" data-nav-lesson="prev"' + (lesson.number === 1 ? ' disabled' : '') + '>' + icon('arrow-left', 'button-icon') + 'Anterior</button><button type="button" class="button button-secondary" data-nav-lesson="next"' + (lesson.number === lessons.length ? ' disabled' : '') + '>Próxima aula' + icon('arrow-right', 'button-icon') + '</button></div><button type="button" class="button button-yellow finish-button" data-complete-lesson="' + esc(lesson.id) + '"' + (progress.completedLessons.includes(lesson.id) ? ' disabled' : '') + '>' + (progress.completedLessons.includes(lesson.id) ? icon('check', 'button-icon') + 'Aula concluída' : 'Concluir aula') + '</button></footer>' +
       '</div></div>';
    icons.refresh(view);
  }

  function renderSection(section) {
    if (section.type === 'soundGrid') {
      return '<section class="content-section"><p class="view-kicker">02 · Explicação</p><h2>' + esc(section.title) + '</h2><p class="section-lede">' + esc(section.lede || '') + '</p><div class="sound-grid">' + section.items.map((item) => '<article class="sound-card"><div class="sound-symbol">' + esc(item.symbol) + '</div><div><h3>' + esc(item.title) + '</h3><p>' + esc(item.pronunciation) + '</p><p class="sound-example">' + esc(item.example) + ' · ' + esc(item.translation) + ' <button type="button" class="audio-inline" data-speak="' + esc(item.example) + '" aria-label="Ouvir ' + esc(item.example) + '">' + icon('volume-2', 'audio-icon') + '</button></p></div></article>').join('') + '</div></section>';
    }
    if (section.type === 'table') {
      return '<section class="content-section"><p class="view-kicker">02 · Explicação</p><h2>' + esc(section.title) + '</h2>' + (section.lede ? '<p class="section-lede">' + esc(section.lede) + '</p>' : '') + '<div class="data-table-wrap"><table class="data-table"><thead><tr>' + section.headers.map((header) => '<th>' + esc(header) + '</th>').join('') + '</tr></thead><tbody>' + section.rows.map((row) => '<tr>' + row.map((cell, index) => '<td>' + esc(cell) + (index === 0 && /^[a-zäöüßÄÖÜ]/i.test(cell) ? ' <button type="button" class="audio-inline" data-speak="' + esc(cell) + '" aria-label="Ouvir ' + esc(cell) + '">' + icon('volume-2', 'audio-icon') + '</button>' : '') + '</td>').join('') + '</tr>').join('') + '</tbody></table></div></section>';
    }
    if (section.type === 'examples') {
      return '<section class="content-section"><p class="view-kicker">03 · Exemplos</p><h2>' + esc(section.title) + '</h2>' + (section.lede ? '<p class="section-lede">' + esc(section.lede) + '</p>' : '') + '<div class="example-list">' + section.items.map((item) => '<div class="example-row"><div><div class="example-de">' + esc(item.de) + '</div><span class="example-pt">' + esc(item.pt) + '</span>' + (item.note ? '<span class="example-note">' + esc(item.note) + '</span>' : '') + '</div><button type="button" class="speak-button" data-speak="' + esc(item.de) + '" aria-label="Ouvir ' + esc(item.de) + '">' + icon('volume-2', 'audio-icon') + '</button></div>').join('') + '</div></section>';
    }
    if (section.type === 'rule') {
      return '<section class="content-section"><p class="view-kicker">02 · Explicação</p><h2>' + esc(section.title) + '</h2><div class="rule-strip">' + section.segments.map((segment, index) => '<span class="rule-segment' + (index === section.verbIndex ? ' is-verb' : '') + '">' + esc(segment) + '</span>' + (index < section.segments.length - 1 ? '<span class="rule-arrow" aria-hidden="true">' + icon('arrow-right', 'rule-arrow-icon') + '</span>' : '')).join('') + '<p class="rule-caption">' + esc(section.caption) + '</p></div></section>';
    }
    if (section.type === 'callout') {
      return '<section class="content-section"><div class="info-callout"><span class="callout-icon" aria-hidden="true">' + icon('lightbulb', 'callout-icon-svg') + '</span><p><strong>' + esc(section.title) + '</strong><br>' + section.text + '</p></div></section>';
    }
    if (section.type === 'compare') {
      return '<section class="content-section"><p class="view-kicker">02 · Explicação</p><h2>' + esc(section.title) + '</h2><div class="scenario-grid">' + section.items.map((item) => '<article class="scenario-card"><h3><span class="scenario-icon" aria-hidden="true">' + icon('circle-help', 'scenario-icon-svg') + '</span>' + esc(item.label) + '</h3><p class="panel-intro" style="margin-top:8px;margin-bottom:0">' + esc(item.description) + '</p><ul>' + item.examples.map((example) => '<li>' + esc(example) + '</li>').join('') + '</ul></article>').join('') + '</div></section>';
    }
    if (section.type === 'scenario') {
      return '<section class="content-section"><p class="view-kicker">07 · Vida real</p><h2>' + esc(section.title) + '</h2><div class="scenario-grid">' + section.scenarios.map((scenario) => '<article class="scenario-card"><h3><span class="scenario-icon" aria-hidden="true">' + icon(scenario.icon, 'scenario-icon-svg') + '</span>' + esc(scenario.title) + '</h3><ul>' + scenario.phrases.map((phrase) => { const audio = phrase.split(' — ')[0]; return '<li><span>' + esc(phrase) + '</span> <button type="button" class="audio-inline" data-speak="' + esc(audio) + '" aria-label="Ouvir frase">' + icon('volume-2', 'audio-icon') + '</button></li>'; }).join('') + '</ul></article>').join('') + '</div></section>';
    }
    if (section.type === 'dialogue') {
      return '<section class="content-section"><p class="view-kicker">07 · Conversa</p><h2>' + esc(section.title) + '</h2><div class="dialogue">' + section.lines.map((line) => '<div class="dialogue-line"><span class="dialogue-speaker">' + esc(line[0]) + '</span><span class="dialogue-text">' + esc(line[1]) + '</span><button type="button" class="speak-button" data-speak="' + esc(line[1]) + '" aria-label="Ouvir fala">' + icon('volume-2', 'audio-icon') + '</button></div>').join('') + '</div></section>';
    }
    return '';
  }

  function renderVocabulary(item) {
    return '<article class="vocab-card"><div class="vocab-card-top"><div><div class="vocab-word">' + esc(item.word) + '</div><div class="vocab-meaning">' + esc(item.meaning) + '</div></div><button type="button" class="speak-button" data-speak="' + esc(item.word) + '" aria-label="Ouvir ' + esc(item.word) + '">' + icon('volume-2', 'audio-icon') + '</button></div><p class="vocab-example"><em>' + esc(item.example) + '</em></p></article>';
  }

  function renderResultCard(lesson, session, id) {
    const answered = Object.values(session.answers).filter((answer) => answer.checked);
    const allDone = answered.length === lesson.exercises.length;
    const correct = answered.filter((answer) => answer.correct).length;
    const percent = answered.length ? Math.round((correct / answered.length) * 100) : 0;
    const message = percent >= 90 ? 'Excelente. Você dominou esta aula.' : percent >= 70 ? 'Muito bom. Revise apenas os pontos em que teve dificuldade.' : percent >= 50 ? 'Você está avançando. Vale revisar esta aula.' : 'Recomendo revisar a explicação antes de avançar.';
    return '<section class="result-card' + (answered.length ? ' is-visible' : '') + '" id="' + id + '" aria-live="polite"><div class="result-score"><span class="score-circle" style="--score:' + percent + '%">' + (answered.length ? percent + '%' : '—') + '</span><div><strong>' + correct + ' / ' + (answered.length || lesson.exercises.length) + '</strong><span>' + (allDone ? 'resultado da aula' : answered.length + ' respondidos') + '</span></div></div><div class="result-message"><strong>' + (answered.length ? message : 'Seu resultado aparece aqui') + '</strong><span>' + (allDone ? 'Você pode refazer a sequência quando quiser.' : 'Continue respondendo para fechar seu resultado.') + '</span></div><div class="result-actions">' + (allDone ? '<button type="button" class="button button-secondary" data-retry-lesson="' + esc(lesson.id) + '">' + icon('rotate-ccw', 'button-icon') + 'Tentar novamente</button>' : '') + (answered.length ? '<button type="button" class="button button-secondary" data-scroll-summary>Ver resumo da aula</button>' : '') + '</div></section>';
  }

  function buildReviewQuestions(progress) {
    const pool = [];
    lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).forEach((lesson) => lesson.exercises.forEach((exercise) => pool.push({ lessonId: lesson.id, lessonTitle: lesson.title, exercise })));
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
      view.innerHTML = '<div class="fade-in"><section class="review-hero"><div><p class="view-kicker">Revisão inteligente · A1</p><h1>Revisar</h1><p>Depois que você concluir uma aula, algumas perguntas dela aparecem aqui para ajudar o conteúdo a ficar.</p></div><div class="review-mark" aria-hidden="true">' + icon('refresh-cw', 'review-mark-icon') + '</div></section><div class="review-empty"><div class="empty-symbol" aria-hidden="true">' + icon('sparkles') + '</div><h3>Seu espaço de revisão está esperando</h3><p>Conclua sua primeira aula e volte aqui. Eu vou separar uma seleção curta de perguntas para você.</p><button type="button" class="button button-primary" data-open-lesson="' + esc(lessons[0].id) + '">Começar primeira aula' + icon('arrow-right', 'button-icon') + '</button></div></div>';
      icons.refresh(view);
      return;
    }
      view.innerHTML = '<div class="fade-in"><section class="review-hero"><div><p class="view-kicker">Revisão inteligente · A1</p><h1>Revisar</h1><p>Uma seleção curta e aleatória das aulas concluídas. Reforce o que já estudou sem recomeçar do zero.</p></div><div class="review-mark" aria-hidden="true">' + icon('refresh-cw', 'review-mark-icon') + '</div></section><div class="review-meta"><span class="meta-pill">' + icon('list-checks', 'meta-icon') + ui.reviewQuestions.length + ' perguntas selecionadas</span><span class="meta-pill">' + icon('book-open', 'meta-icon') + progress.completedLessons.length + ' aulas disponíveis</span></div><div class="exercise-list">' + ui.reviewQuestions.map((item, index) => exercises.renderExercise(item.exercise, index, item.lessonId)).join('') + '</div>' + renderReviewResult() + '<div class="lesson-footer"><span class="muted" style="font-size:11px">As perguntas são escolhidas novamente ao abrir esta tela.</span><button type="button" class="button button-secondary" data-route="dashboard">' + icon('arrow-left', 'button-icon') + 'Voltar para visão geral</button></div></div>';
    icons.refresh(view);
  }

  function renderReviewResult() {
    const answered = Object.values(ui.reviewSession).filter((answer) => answer.checked);
    if (!answered.length) return '<section class="result-card" id="review-result" aria-live="polite"></section>';
    const correct = answered.filter((answer) => answer.correct).length;
    const percent = Math.round((correct / answered.length) * 100);
    return '<section class="result-card is-visible" id="review-result" aria-live="polite"><div class="result-score"><span class="score-circle" style="--score:' + percent + '%">' + percent + '%</span><div><strong>' + correct + ' / ' + answered.length + '</strong><span>na revisão</span></div></div><div class="result-message"><strong>' + (percent >= 80 ? 'Boa memória. Seu alemão está ganhando raízes.' : 'Você está construindo a base.') + '</strong><span>Continue alternando aulas novas e revisões curtas.</span></div><div class="result-actions"><button type="button" class="button button-secondary" data-retry-review>' + icon('rotate-ccw', 'button-icon') + 'Nova seleção</button></div></section>';
  }

  function renderVerbRow(item, session, index) {
    const response = session.answers[item.id] || '';
    const hasResult = session.checked && Object.prototype.hasOwnProperty.call(session.results, item.id);
    const correct = hasResult && session.results[item.id];
    const statusClass = hasResult ? (correct ? ' is-correct' : response.trim() ? ' is-wrong' : ' is-empty') : '';
    const statusText = !hasResult ? '' : correct ? 'Certo' : response.trim() ? 'Revise esta forma' : 'Em branco';
    const correctAnswer = hasResult && !correct ? '<span class="verb-correct-answer">Resposta certa: ' + esc(item.answers.join(' / ')) + '</span>' : '';
    return '<div class="verb-prompt-row' + statusClass + '" data-verb-row data-verb-id="' + esc(item.id) + '">' +
      '<div class="verb-prompt-copy"><span class="verb-prompt-number">' + String(index + 1).padStart(2, '0') + '</span><div><strong>' + esc(item.prompt) + '</strong><span>' + esc(item.detail) + '</span></div></div>' +
      '<div class="verb-input-wrap"><span class="verb-input-label">Em alemão</span><input class="verb-input" type="text" autocomplete="off" spellcheck="false" data-verb-input data-verb-id="' + esc(item.id) + '" value="' + esc(response) + '" placeholder="' + esc(item.placeholder) + '" aria-label="Resposta para ' + esc(item.prompt) + '" /></div>' +
      '<span class="verb-row-feedback" data-verb-feedback>' + (statusText ? (correct ? icon('circle-check', 'verb-feedback-symbol') : icon('circle-x', 'verb-feedback-symbol')) + statusText + correctAnswer : '') + '</span>' +
      '</div>';
  }

  function renderVerbResult(page, mode, session) {
    if (!session.checked) {
      return '<div class="verb-result is-empty" data-verb-result aria-live="polite"><span class="verb-result-mark" aria-hidden="true">' + icon('sparkles') + '</span><div><strong>Seu resultado aparece aqui.</strong><span>Preencha as respostas e verifique quando estiver pronto.</span></div></div>';
    }
    const correct = mode.items.filter((item) => session.results[item.id]).length;
    const percent = Math.round((correct / mode.items.length) * 100);
    const message = percent === 100 ? page.perfectMessage : percent >= 70 ? 'Muito bom. Revise só as formas que escaparam.' : 'Você está construindo a base. Tente mais uma vez com calma.';
    return '<div class="verb-result is-checked" data-verb-result aria-live="polite"><div class="verb-result-score"><span class="verb-score-circle" style="--verb-score:' + percent + '%"><span>' + percent + '%</span></span><div><strong>' + correct + ' / ' + mode.items.length + '</strong><span>respostas certas</span></div></div><div class="verb-result-message"><strong>' + message + '</strong><span>' + mode.title + '</span></div></div>';
  }

  function renderExercises() {
    const page = getExercisePage();
    const mode = getVerbMode();
    const session = getVerbSession(mode.id);
      view.innerHTML = '<div class="fade-in exercise-page"><section class="exercise-hero"><div><p class="view-kicker">Exercícios · prática guiada</p><h1>' + esc(page.heroTitle) + '<br><span>' + esc(page.heroAccent) + '</span></h1><p class="exercise-hero-copy">Treine as formas mais importantes do verbo <em>' + esc(page.verb) + '</em> — ' + esc(page.heroCopy) + '</p><div class="exercise-hero-meta"><span class="meta-pill">A1 · presente</span><span class="meta-pill">' + mode.items.length + ' desafios</span><span class="meta-pill">sem pressa</span></div></div><div class="exercise-hero-mark" aria-hidden="true"><span>' + esc(page.verb) + '</span><small>' + esc(page.meaning) + '</small></div></section>' +
      '<div class="practice-tabs" role="tablist" aria-label="Formas de praticar"><button type="button" class="practice-tab' + (mode.id === 'conjugation' ? ' is-active' : '') + '" data-exercise-mode="conjugation" role="tab" aria-controls="verb-practice-panel" aria-selected="' + (mode.id === 'conjugation' ? 'true' : 'false') + '"><span>01</span><strong>Conjugação</strong><small>as formas do verbo</small></button><button type="button" class="practice-tab' + (mode.id === 'sentences' ? ' is-active' : '') + '" data-exercise-mode="sentences" role="tab" aria-controls="verb-practice-panel" aria-selected="' + (mode.id === 'sentences' ? 'true' : 'false') + '"><span>02</span><strong>Frases rápidas</strong><small>na vida real</small></button></div>' +
      '<section class="verb-practice-card" id="verb-practice-panel" role="tabpanel"><div class="verb-practice-heading"><div><p class="view-kicker">' + esc(mode.shortLabel) + '</p><h2>' + esc(mode.title) + '</h2><p>' + esc(mode.instruction) + '</p></div><div class="verb-rule-note"><span class="verb-rule-note-mark" aria-hidden="true">' + icon('info') + '</span><span><strong>' + esc(page.verb) + '</strong> = ' + esc(page.meaning) + '</span></div></div><div class="verb-prompt-list">' + mode.items.map((item, index) => renderVerbRow(item, session, index)).join('') + '</div><div class="verb-form-actions"><button type="button" class="button button-primary" data-check-verb>Verificar respostas</button><button type="button" class="button button-secondary" data-reset-verb>Resetar</button></div>' + renderVerbResult(page, mode, session) + '</section>' +
       '<p class="exercise-page-note"><span aria-hidden="true">' + icon('sparkles') + '</span> Dica: fale cada resposta em voz alta depois de escrever. A memória gosta de ouvir a própria voz.</p></div>';
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
      showToast('Escolha ou escreva uma resposta antes de verificar.');
      return;
    }
    const key = responseKey(response);
    if (state.checked && state.responseKey === key) {
      showToast('Essa resposta já foi verificada. Tente outra alternativa.');
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
    text.textContent = correct ? 'Correto! ' + exercise.explanation : 'Ainda não. Você pode tentar novamente ou ver a explicação.';
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
    if (note) note.textContent = checked + ' de ' + lesson.exercises.length + ' exercícios verificados.';
    icons.refresh(document);
  }

  function toggleExplanation(card) {
    const exercise = findExercise(card.dataset.lessonId, card.dataset.exerciseId);
    if (!exercise) return;
    const explanation = card.querySelector('[data-explanation]');
    const reveal = card.querySelector('[data-answer-reveal]');
    const opening = !explanation.classList.contains('is-visible');
    explanation.classList.toggle('is-visible', opening);
    if (opening) reveal.textContent = 'Resposta: ' + exercises.answerLabel(exercise);
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
    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function completeLesson(id) {
    const lesson = getLesson(id);
    const progress = storage.markLessonComplete(id);
    renderSidebar(progress);
    renderLesson(lesson);
    updateBreadcrumb();
    showToast('Aula concluída. Schön gemacht!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetLessonSession(id) {
    ui.sessions[id] = { answers: {}, isRetry: true };
    renderLesson(getLesson(id));
    renderSidebar(getProgress());
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Exercícios reiniciados. Vamos mais uma vez.');
  }

  function resetAllProgress() {
    const confirmed = window.confirm('Resetar todo o progresso salvo neste navegador? Esta ação não pode ser desfeita.');
    if (!confirmed) return;
    storage.resetProgress();
    ui.sessions = {};
    ui.reviewSession = {};
    ui.route = 'dashboard';
    render();
    showToast('Seu caminho voltou ao início.');
  }

  function closeSidebar() { sidebar.classList.remove('is-open'); sidebarScrim.classList.remove('is-visible'); }
  function openSidebar() { sidebar.classList.add('is-open'); sidebarScrim.classList.add('is-visible'); }

  function render() {
    const progress = getProgress();
    renderSidebar(progress);
    updateBreadcrumb();
    if (ui.route === 'dashboard') renderDashboard();
    else if (ui.route === 'review') renderReview();
    else if (ui.route === 'exercises' || ui.route === 'exercises-haben') renderExercises();
    else renderLesson(getLesson(ui.activeLessonId));
    icons.refresh(document);
    view.focus({ preventScroll: true });
  }

  document.addEventListener('click', (event) => {
    const speak = event.target.closest('[data-speak]');
    if (speak) {
      const worked = window.speakGerman(speak.dataset.speak);
      if (!worked) showToast('O áudio não está disponível neste navegador.');
      return;
    }
    const open = event.target.closest('[data-open-lesson]');
    if (open) { openLesson(open.dataset.openLesson); return; }
    const route = event.target.closest('[data-route]');
    if (route) { ui.route = route.dataset.route; render(); closeSidebar(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const exerciseMode = event.target.closest('[data-exercise-mode]');
    if (exerciseMode) {
      ui.exerciseModes[getExercisePage().id] = exerciseMode.dataset.exerciseMode;
      renderExercises();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (event.target.closest('[data-open-sidebar]')) { openSidebar(); return; }
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
    if (event.target.closest('[data-check-verb]')) { checkVerbPractice(); return; }
    if (event.target.closest('[data-reset-verb]')) { resetVerbPractice(); return; }
    if (event.target.closest('[data-scroll-summary]')) { document.querySelector('.summary-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  });

  document.addEventListener('input', (event) => {
    if (event.target.matches('.verb-input')) {
      const mode = getVerbMode();
      const session = getVerbSession(mode.id);
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

  window.addEventListener('resize', () => { if (window.innerWidth > 800) closeSidebar(); });

  function checkVerbPractice() {
    const mode = getVerbMode();
    const session = getVerbSession(mode.id);
    const inputs = Array.from(document.querySelectorAll('.verb-input'));
    const hasAnswer = inputs.some((input) => input.value.trim());
    if (!hasAnswer) {
      showToast('Preencha pelo menos uma resposta antes de verificar.');
      return;
    }
    mode.items.forEach((item) => {
      const input = document.querySelector('.verb-input[data-verb-id="' + item.id + '"]');
      const response = input ? input.value : '';
      session.answers[item.id] = response;
      session.results[item.id] = item.answers.some((answer) => exercises.normalize(response) === exercises.normalize(answer));
    });
    session.checked = true;
    const scrollY = window.scrollY;
    renderExercises();
    window.scrollTo({ top: scrollY, behavior: 'auto' });
    const correct = mode.items.filter((item) => session.results[item.id]).length;
    showToast(correct === mode.items.length ? 'Tudo certo. Sehr gut!' : 'Resposta conferida. Veja onde ajustar.', correct === mode.items.length ? 'success' : '');
  }

  function resetVerbPractice() {
    const mode = getVerbMode();
    ui.verbSessions[getExercisePage().id + ':' + mode.id] = { answers: {}, results: {}, checked: false };
    renderExercises();
    showToast('Exercício resetado. Vamos de novo.');
  }
  render();
}());
