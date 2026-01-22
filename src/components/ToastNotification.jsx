import React from 'react';

export function ToastNotification({ showToast }) {
  return (
    <div
      className={`toast ${
        showToast ? 'active' : 'closed'
      }`}
    >
      <svg className="icon-svg--check" width="40" height="40"><use xlinkHref="#icon-check"></use></svg>
      <span className="font-medium">Link copied</span>
    </div>
  );
}