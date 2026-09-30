(function () {
  'use strict';

  const STORAGE_KEY = 'klar-deutsch-progress-v1';

  function freshProgress() {
    return {
      completedLessons: [],
      lessonScores: {},
      totalAnswered: 0,
      totalCorrect: 0,
      activityByDay: {},
      achievements: [],
      lastLessonId: null,
      startedAt: new Date().toISOString()
    };
  }

  function isRecord(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function nonNegativeInteger(value, fallback) {
    return Number.isSafeInteger(value) && value >= 0 ? value : fallback;
  }

  function validDateKey(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }

  function localDateKey(date) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }

  function sanitizeActivity(value) {
    if (!isRecord(value)) return {};
    return Object.keys(value).reduce((activity, dateKey) => {
      const count = value[dateKey];
      if (validDateKey(dateKey) && Number.isSafeInteger(count) && count > 0) activity[dateKey] = count;
      return activity;
    }, {});
  }

  function sanitizeLessonScores(value) {
    if (!isRecord(value)) return {};
    return Object.keys(value).reduce((scores, lessonId) => {
      const rawScore = value[lessonId];
      if (!lessonId || !isRecord(rawScore)) return scores;
      const exercises = {};
      if (isRecord(rawScore.exercises)) {
        Object.keys(rawScore.exercises).forEach((exerciseId) => {
          const attempt = rawScore.exercises[exerciseId];
          if (!exerciseId || !isRecord(attempt) || typeof attempt.correct !== 'boolean') return;
          exercises[exerciseId] = { correct: attempt.correct };
          if (typeof attempt.answeredAt === 'string' && Number.isFinite(Date.parse(attempt.answeredAt))) {
            exercises[exerciseId].answeredAt = attempt.answeredAt;
          }
        });
      }
      const hasExerciseRecords = isRecord(rawScore.exercises);
      const total = hasExerciseRecords ? Object.keys(exercises).length : nonNegativeInteger(rawScore.total, 0);
      const correct = hasExerciseRecords
        ? Object.values(exercises).filter((attempt) => attempt.correct).length
        : Math.min(nonNegativeInteger(rawScore.correct, 0), total);
      const score = { correct, total, percent: total ? Math.round((correct / total) * 100) : 0, exercises };
      if (typeof rawScore.completedAt === 'string' && Number.isFinite(Date.parse(rawScore.completedAt))) score.completedAt = rawScore.completedAt;
      scores[lessonId] = score;
      return scores;
    }, {});
  }

  function sanitizeProgress(parsed) {
    if (!isRecord(parsed)) return freshProgress();
    const progress = freshProgress();
    progress.completedLessons = Array.isArray(parsed.completedLessons)
      ? Array.from(new Set(parsed.completedLessons.filter((id) => typeof id === 'string' && id.length)))
      : [];
    progress.lessonScores = sanitizeLessonScores(parsed.lessonScores);
    progress.totalAnswered = nonNegativeInteger(parsed.totalAnswered, 0);
    progress.totalCorrect = Math.min(nonNegativeInteger(parsed.totalCorrect, 0), progress.totalAnswered);
    progress.activityByDay = sanitizeActivity(parsed.activityByDay);
    progress.achievements = Array.isArray(parsed.achievements)
      ? parsed.achievements.filter((achievement) => typeof achievement === 'string')
      : [];
    progress.lastLessonId = typeof parsed.lastLessonId === 'string' ? parsed.lastLessonId : null;
    progress.startedAt = typeof parsed.startedAt === 'string' && Number.isFinite(Date.parse(parsed.startedAt))
      ? parsed.startedAt
      : progress.startedAt;
    return updateAchievements(progress);
  }

  function recordActivity(progress) {
    if (!isRecord(progress.activityByDay)) progress.activityByDay = {};
    const today = localDateKey(new Date());
    progress.activityByDay[today] = nonNegativeInteger(progress.activityByDay[today], 0) + 1;
    return progress;
  }

  function getProgress() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return freshProgress();
      const parsed = JSON.parse(stored);
      return sanitizeProgress(parsed);
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
    const courseLessonCount = Array.isArray(window.KlarLessons) && window.KlarLessons.length
      ? window.KlarLessons.length
      : 11;
    const earned = [];
    if (total >= 1) earned.push('first-step');
    if (total >= 5) earned.push('guten-tag');
    if (total >= courseLessonCount) earned.push('a1-starter');
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
    recordActivity(progress);
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
    recordActivity(progress);
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
