import React, { useState, useEffect } from "react";
import Header from "./assets/components/Header";
import Toolbar from "./assets/components/Toolbar";
import StatsPanel from "./assets/components/StatsPanel";
import NoteForm from "./assets/components/NoteForm";
import NoteCard from "./assets/components/NoteCard";
import {
  loadNotesFromStorage,
  saveNotesToStorage,
  clearNotesFromStorage,
} from "./assets/utils/storage";

const App = () => {
  const [notes, setNotes] = useState(() => loadNotesFromStorage());
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "General",
  });
  const [storageInfo, setStorageInfo] = useState({ used: 0, lastSaved: null });

  const categories = [
    "General",
    "Work",
    "Personal",
    "Ideas",
    "Todo",
    "Important",
  ];

  useEffect(() => {
    const success = saveNotesToStorage(notes);
    if (success) {
      const usedBytes = new Blob([JSON.stringify(notes)]).size;
      setStorageInfo({
        used: usedBytes,
        lastSaved: new Date().toLocaleTimeString(),
      });
    }
  }, [notes]);

  const createNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    const note = {
      id: Date.now() + Math.random(),
      title: newNote.title.trim(),
      content: newNote.content.trim(),
      category: newNote.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewNote({ title: "", content: "", category: "General" });
    setIsCreating(false);
  };

  const updateNote = (id, updated) => {
    if (!updated.title.trim() || !updated.content.trim()) return false;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...updated, updatedAt: new Date().toISOString() }
          : n
      )
    );
    return true;
  };

  const deleteNote = (id) => {
    const target = notes.find((n) => n.id === id);
    if (window.confirm(`Delete note: "${target?.title}"?`)) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const exportNotes = () => {
    const blob = new Blob([JSON.stringify({ notes }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notepad-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importNotes = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const imported = Array.isArray(data) ? data : data.notes || [];
        if (imported.length === 0) return alert("No notes found in the file.");

        if (window.confirm("Replace current notes with imported ones?")) {
          setNotes(imported);
        } else {
          setNotes((prev) => [
            ...prev,
            ...imported.map((n) => ({ ...n, id: Date.now() + Math.random() })),
          ]);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("Import failed. Invalid file format.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const clearAllNotes = () => {
    if (window.confirm("Delete all notes? This cannot be undone.")) {
      clearNotesFromStorage();
      setNotes([]);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Header />
        <Toolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsCreating={setIsCreating}
          exportNotes={exportNotes}
          importNotes={importNotes}
          clearAllNotes={clearAllNotes}
        />
        <StatsPanel
          notes={notes}
          filteredNotes={filteredNotes}
          storageInfo={storageInfo}
        />
        {isCreating && (
          <NoteForm
            newNote={newNote}
            setNewNote={setNewNote}
            createNote={createNote}
            setIsCreating={setIsCreating}
            categories={categories}
          />
        )}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No notes found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                updateNote={updateNote}
                deleteNote={deleteNote}
                categories={categories}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
