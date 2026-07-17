import { useState } from 'react';
import './ComposeBar.css';

function ComposeBar({ onCreateNote }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('FYI');
  const [hidden, setHidden] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await onCreateNote({ content, type, hidden });
      setContent('');
      setType('FYI');
      setHidden(false);
      setIsOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button className="compose-fab" onClick={() => setIsOpen(true)} aria-label="Compose note">
        +
      </button>
    );
  }

  return (
    <div className="compose-panel">
      <form onSubmit={handleSubmit}>
        <textarea
          className="compose-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Stick a note to the wall..."
          rows={3}
          autoFocus
        />

        <div className="compose-row">
          <label>Type</label>
          <select className="compose-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="FYI">FYI</option>
            <option value="HELP">Help</option>
            <option value="SHOUTOUT">Shoutout</option>
            <option value="QUESTION">Question</option>
          </select>
        </div>

        <div className="compose-row">
          <input
            type="checkbox"
            id="hidden-checkbox"
            checked={hidden}
            onChange={(e) => setHidden(e.target.checked)}
          />
          <label htmlFor="hidden-checkbox">Hide content until revealed</label>
        </div>

        <div className="compose-actions">
          <button type="submit" className="compose-btn-primary" disabled={submitting}>
            {submitting ? 'Posting...' : 'Post'}
          </button>
          <button type="button" className="compose-btn-secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ComposeBar;