import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotes, createNote, claimNote, resolveNote } from '../api/notes';
import StickyNote from '../components/StickyNote';
import ComposeBar from '../components/ComposeBar';
import NoteModal from '../components/NoteModal';
import './Wall.css';

function Wall() {
  const { user, logoutUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleClaim = async (noteId) => {
    await claimNote(noteId);
    loadNotes();
  };

  const handleResolve = async (noteId) => {
    await resolveNote(noteId);
    loadNotes();
  };

  const handleCreateNote = async (noteData) => {
    await createNote(noteData);
    loadNotes();
  };

  return (
    <div className="wall-page">
      <header className="wall-header">
        <h1 className="wall-title">Sticky Wall</h1>
        <div className="wall-user-info">
          <span>Logged in as {user.name}</span>
          <button className="wall-logout-btn" onClick={logoutUser}>Log out</button>
        </div>
      </header>

      {loading && <p className="wall-loading">Loading notes...</p>}
      {error && <p className="wall-loading">{error}</p>}

      <div className={`notes-board ${selectedNote ? 'blurred' : ''}`}>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onClaim={handleClaim}
            onResolve={handleResolve}
            onOpen={setSelectedNote}
            currentUserId={user.userId}
          />
        ))}
      </div>

      {notes.length === 0 && !loading && (
        <p className="wall-empty-state">The wall is empty — stick the first note.</p>
      )}

      <ComposeBar onCreateNote={handleCreateNote} />

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onClaim={handleClaim}
          onResolve={handleResolve}
          currentUserId={user.userId}
        />
      )}
    </div>
  );
}

export default Wall;