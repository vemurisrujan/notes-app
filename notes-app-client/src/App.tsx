import React, {useState} from 'react';
import './App.css';

type Note = {
  id: number;
  title: string;
  content: string;
}

function App() {

  const [notes, setNotes] = useState<Note[]>([{
    id:1,
    title: 'First Note',
    content: 'This is the content of the first note.' 
  },
{
    id:2,
    title: 'First Note',
    content: 'This is the content of the first note.' 
  },
{
    id:3,
    title: 'First Note',
    content: 'This is the content of the first note.' 
  },
{
    id:4,
    title: 'First Note',
    content: 'This is the content of the first note.' 
  }]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

   const [slectedNote, setslectedNote] = useState<Note | null>(null);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title,
      content
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  }

  const handleSelectNote = (note: Note) => {
    setslectedNote(note);
     setTitle(note.title);
    setContent(note.content);
  }

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slectedNote) {
      return;
    }

    const updatedNote: Note = {
      ...slectedNote,
      title: title,
      content: content
    };

    const updatedNotes = notes.map((note) =>
      note.id === slectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotes);
    setslectedNote(null);
    setTitle("");
    setContent(""); 
    
  }

  const handleCancel = () => {
    setslectedNote(null);
    setTitle("");
    setContent(""); 
  }

  const handleDeleteNote = (e:React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
                              
  }

  return (
    <div className="app-container">
      <form className="notes-form" onSubmit={(e)=> slectedNote? handleAddNote(e) : handleUpdateNote(e)  }>
        <input value={title} onChange={(e)=> setTitle(e.target.value) } type="text" placeholder='title' required/>
        <textarea value={content} onChange={(e)=> setContent(e.target.value) } placeholder='Content' rows={10} required />
          {slectedNote ? (
            <div className="notes-edit">
              <button type="submit" onClick={(e) => handleUpdateNote(e)}>Update Note</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          ) : <button type="submit">Add Notes</button>}
        
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
        <div className="notes-item" onClick={() => handleSelectNote(note)} key={note.id}>
           <div className="notes-header">
            <button onClick={(e)=> handleDeleteNote(e, note.id)}>x</button>
           </div>
           <h2>{note.title}</h2>
           <p>{note.content}</p>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
