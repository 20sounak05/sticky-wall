import './StickyNote.css';

function StickyNote({ note, onClaim, onResolve, onOpen, currentUserId }) {
  const isAuthor = note.authorId === currentUserId;
  const isClaimer = note.claimedById === currentUserId;
  const canResolve = isAuthor || isClaimer;

  const tilt = ((note.id * 37) % 8) - 4;

  return (
    <div
      className="sticky-note"
      style={{
        '--note-color': note.authorColorHex,
        '--note-tilt': `${tilt}deg`,
      }}
      onClick={() => onOpen(note)}
    >
      <div className="sticky-note-header">
        <span className="sticky-note-author">{note.authorName}</span>
        <span className="sticky-note-type">{note.type}</span>
      </div>

      <p className={`sticky-note-content ${!note.canViewContent ? 'locked' : ''}`}>
        {note.canViewContent ? note.content : '🔒 Hidden — tap to check who it\'s for'}
      </p>

      <div className="sticky-note-meta">
        {note.status}
        {note.claimedByName && ` · claimed by ${note.claimedByName}`}
      </div>

      <div className="sticky-note-actions">
        {note.type === 'HELP' && note.status === 'OPEN' && (
          <button
            className="sticky-note-btn"
            onClick={(e) => { e.stopPropagation(); onClaim(note.id); }}
          >
            I'll do it
          </button>
        )}
        {note.status !== 'RESOLVED' && canResolve && (
          <button
            className="sticky-note-btn secondary"
            onClick={(e) => { e.stopPropagation(); onResolve(note.id); }}
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  );
}

export default StickyNote;