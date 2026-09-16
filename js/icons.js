(function () {
  'use strict';

  function escapeAttribute(value) {
    return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function render(name, className, label) {
    const iconClass = className ? ' class="' + escapeAttribute(className) + '"' : '';
    const labelAttribute = label ? ' aria-label="' + escapeAttribute(label) + '"' : ' aria-hidden="true"';
    return '<i data-lucide="' + escapeAttribute(name) + '"' + iconClass + labelAttribute + '></i>';
  }

  function refresh(root) {
    if (!window.lucide || typeof window.lucide.createIcons !== 'function') return false;
    window.lucide.createIcons({
      root: root || document,
      attrs: { 'stroke-width': 1.8 }
    });
    return true;
  }

  window.KlarIcons = { render, refresh };
}());
