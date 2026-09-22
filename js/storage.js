(function () {
  'use strict';

  const STORAGE_KEY = 'klar-deutsch-progress-v1';

  function freshProgress() {
    return {
      completedLessons: [],
      lessonScores: {},
      totalAnswered: 0,
      totalCorrect: 0,
      achievements: [],
      lastLessonId: null,
      startedAt: new Date().toISOString()
    };
  }

  function getProgress() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return freshProgress();
      const parsed = JSON.parse(stored);
      return Object.assign(freshProgress(), parsed);
    } catch (error) {
      console.warn('Não foi possível ler o progresso salvo.', error);
      return freshProgress();
    }
  }

  function saveProgress(progress) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn('Não foi possível salvar o progresso.', error);
    }
    return progress;
  }

  function updateAchievements(progress) {
    const total = progress.completedLessons.length;
    const earned = [];
    if (total >= 1) earned.push('first-step');
    if (total >= 5) earned.push('guten-tag');
    if (total >= 12) earned.push('a1-starter');
    progress.achievements = earned;
    return progress;
  }

  function markLessonComplete(lessonId) {
    const progress = getProgress();
    if (!progress.completedLessons.includes(lessonId)) progress.completedLessons.push(lessonId);
    progress.lastLessonId = lessonId;
    updateAchievements(progress);
    return saveProgress(progress);
  }

  function recordAnswer(lessonId, exerciseId, isCorrect) {
    const progress = getProgress();
    progress.totalAnswered += 1;
    if (isCorrect) progress.totalCorrect += 1;
    progress.lastLessonId = lessonId;
    if (!progress.lessonScores[lessonId]) {
      progress.lessonScores[lessonId] = { correct: 0, total: 0, percent: 0, exercises: {} };
    }
    const score = progress.lessonScores[lessonId];
    if (!score.exercises) score.exercises = {};
    score.exercises[exerciseId] = { correct: isCorrect, answeredAt: new Date().toISOString() };
    const attempts = Object.values(score.exercises);
    score.correct = attempts.filter((attempt) => attempt.correct).length;
    score.total = attempts.length;
    score.percent = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    return saveProgress(progress);
  }

  function saveLessonScore(lessonId, correct, total) {
    const progress = getProgress();
    progress.lessonScores[lessonId] = Object.assign({}, progress.lessonScores[lessonId], {
      correct,
      total,
      percent: total ? Math.round((correct / total) * 100) : 0,
      completedAt: new Date().toISOString()
    });
    updateAchievements(progress);
    return saveProgress(progress);
  }

  function recordReviewAnswer(isCorrect) {
    const progress = getProgress();
    progress.totalAnswered += 1;
    if (isCorrect) progress.totalCorrect += 1;
    return saveProgress(progress);
  }

  function resetProgress() {
    const progress = freshProgress();
    saveProgress(progress);
    return progress;
  }

  window.KlarStorage = {
    STORAGE_KEY,
    freshProgress,
    getProgress,
    saveProgress,
    updateAchievements,
    markLessonComplete,
    recordAnswer,
    recordReviewAnswer,
    saveLessonScore,
    resetProgress
  };
}());
