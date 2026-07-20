import { useState, useEffect } from 'react';
import './NoteModal.css';

function NoteModal({ note, onClose, onClaim, onResolve, currentUserId }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 350); // matches CSS transition duration below
  };

  const isAuthor = note.authorId === currentUserId;
  const isClaimer = note.claimedById === currentUserId;
  const canResolve = isAuthor || isClaimer;

  return (
    <div className={`note-modal-backdrop ${open ? 'open' : ''}`} onClick={handleClose}>
      <div className="note-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div
          className={`note-modal-note ${open ? 'open' : ''}`}
          style={{ '--note-color': note.authorColorHex }}
        >
          <button className="note-modal-close" onClick={handleClose} aria-label="Close">×</button>

          <div className="sticky-note-header">
            <span className="sticky-note-author">{note.authorName}</span>
            <span className="sticky-note-type">{note.type}</span>
          </div>

          <p className={`note-modal-content ${!note.canViewContent ? 'locked' : ''}`}>
            {note.canViewContent ? note.content : '🔒 Hidden — only visible to the intended recipients'}
          </p>

          <div className="sticky-note-meta">
            {note.status}
            {note.claimedByName && ` · claimed by ${note.claimedByName}`}
          </div>

          <div className="sticky-note-actions">
            {note.type === 'HELP' && note.status === 'OPEN' && (
              <button className="sticky-note-btn" onClick={() => onClaim(note.id)}>I'll do it</button>
            )}
            {note.status !== 'RESOLVED' && canResolve && (
              <button className="sticky-note-btn secondary" onClick={() => onResolve(note.id)}>Resolve</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;