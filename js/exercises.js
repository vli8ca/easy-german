(function () {
  'use strict';

  const icons = window.KlarIcons;
  const i18n = window.KlarI18n;
  const typeLabels = {
    multiple: 'exercise.choose',
    fill: 'exercise.complete',
    order: 'exercise.order',
    translate: 'exercise.translate',
    truefalse: 'exercise.trueFalse'
  };

  function localizeExercise(exercise) {
    const content = Object.assign({}, exercise);
    content.optionValues = exercise.options;
    ['prompt', 'options', 'explanation'].forEach((field) => {
      const translated = exercise[field + '_en'];
      if (translated !== undefined) content[field] = translated;
    });
    return content;
  }

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalize(value) {
    return String(value == null ? '' : value)
      .trim()
      .toLocaleLowerCase('de-DE')
      .replace(/[.!?,;:]+$/g, '')
      .replace(/\s+/g, ' ');
  }

  /**
   * Normalizes an A1 German answer while accepting keyboard-friendly
   * spellings without umlauts or the German sharp s.
   *
   * @param {*} value The answer to normalize.
   * @returns {string} A comparable normalized answer.
   */
  function normalizeGermanAnswer(value) {
    return normalize(value)
      .trim()
      .normalize('NFC')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ß/g, 'ss');
  }

  function renderOptions(exercise) {
    const optionValues = exercise.optionValues || exercise.options;
    return '<div class="exercise-options" role="group" aria-label="' + escapeHTML(i18n.t('exercise.alternatives')) + '">' + exercise.options.map((option, index) => (
      '<button type="button" class="option-button' + (exercise.type === 'truefalse' ? ' is-true' : '') + '" data-option="' + escapeHTML(optionValues[index]) + '">' + escapeHTML(option) + '</button>'
    )).join('') + '</div>';
  }

  function renderOrder(exercise) {
    return '<div class="word-bank" aria-label="' + escapeHTML(i18n.t('exercise.availableWords')) + '">' + exercise.answer.map((word, index) => (
      '<button type="button" class="word-chip" data-order-word="' + escapeHTML(word) + '" data-word-index="' + index + '">' + escapeHTML(word) + '</button>'
    )).join('') + '</div>' +
      '<div class="order-answer" data-order-answer data-placeholder="' + escapeHTML(i18n.t('exercise.orderPlaceholder')) + '" aria-label="' + escapeHTML(i18n.t('exercise.yourSentence')) + '"></div>' +
      '<button type="button" class="order-reset" data-reset-order>' + escapeHTML(i18n.t('exercise.clearOrder')) + '</button>';
  }

  function renderTextInput(exercise) {
    const placeholder = exercise.type === 'translate' ? i18n.t('exercise.placeholderTranslate') : i18n.t('exercise.placeholderAnswer');
    return '<input class="exercise-input" type="text" autocomplete="off" spellcheck="false" placeholder="' + escapeHTML(placeholder) + '" aria-label="' + escapeHTML(i18n.t('exercise.answer')) + '" />';
  }

  function renderExercise(exercise, index, contextId) {
    exercise = localizeExercise(exercise);
    const question = exercise.audioText ?
      '<button type="button" class="audio-inline" data-speak="' + escapeHTML(exercise.audioText) + '" aria-label="' + escapeHTML(i18n.t('exercise.listenSentence')) + '">' + icons.render('volume-2', 'audio-icon') + escapeHTML(i18n.t('vocabulary.listen')) + '</button>' : '';
    let input = '';
    if (exercise.type === 'multiple' || exercise.type === 'truefalse') input = renderOptions(exercise);
    if (exercise.type === 'fill' || exercise.type === 'translate') input = renderTextInput(exercise);
    if (exercise.type === 'order') input = renderOrder(exercise);
    return '<article class="exercise-card" data-exercise-card data-exercise-id="' + escapeHTML(exercise.id) + '" data-lesson-id="' + escapeHTML(contextId) + '">' +
      '<div class="exercise-top"><span class="exercise-number">' + escapeHTML(i18n.t('exercise.number', { number: String(index + 1).padStart(2, '0') })) + '</span><span class="exercise-type">' + escapeHTML(i18n.t(typeLabels[exercise.type] || 'exercise.practice')) + '</span></div>' +
      '<h3>' + escapeHTML(exercise.prompt) + ' ' + question + '</h3>' +
      input +
      '<div class="exercise-actions"><button type="button" class="button button-primary" data-check-exercise>' + escapeHTML(i18n.t('exercise.check')) + '</button><button type="button" class="button button-secondary" data-show-explanation>' + escapeHTML(i18n.t('exercise.explanationButton')) + '</button></div>' +
      '<div class="feedback" data-feedback aria-live="polite"><span class="feedback-symbol" data-feedback-symbol></span><span data-feedback-text></span></div>' +
      '<div class="explanation" data-explanation>' + escapeHTML(exercise.explanation) + '<span class="answer-reveal" data-answer-reveal></span></div>' +
      '</article>';
  }

  function readResponse(card, exercise) {
    if (exercise.type === 'multiple' || exercise.type === 'truefalse') {
      const selected = card.querySelector('.option-button.is-selected');
      return selected ? selected.dataset.option : '';
    }
    if (exercise.type === 'order') {
      return Array.from(card.querySelectorAll('[data-order-answer] .word-chip')).map((chip) => chip.dataset.orderWord);
    }
    const input = card.querySelector('.exercise-input');
    return input ? input.value.trim() : '';
  }

  function isCorrect(response, exercise) {
    if (exercise.type === 'order') {
      const actual = response.map(normalizeGermanAnswer);
      const expected = exercise.answer.map(normalizeGermanAnswer);
      return actual.length === expected.length && actual.every((word, index) => word === expected[index]);
    }
    const accepted = exercise.answers || [exercise.answer];
    return accepted.some((answer) => normalizeGermanAnswer(response) === normalizeGermanAnswer(answer));
  }

  function answerLabel(exercise) {
    if (exercise.type === 'order') return exercise.answer.join(' ');
    return exercise.answer;
  }

  window.KlarExercises = {
    escapeHTML,
    typeLabels,
    normalize,
    normalizeGermanAnswer,
    renderExercise,
    readResponse,
    isCorrect,
    answerLabel
  };
}());
