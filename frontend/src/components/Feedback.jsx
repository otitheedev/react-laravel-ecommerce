import React from 'react';

function Feedback({ type, message }) {
  if (!message) return null;
  return (
    <div className={`alert ${type === 'error' ? 'alert-danger' : 'alert-success'}`}>
      {message}
    </div>
  );
}

export default Feedback; 