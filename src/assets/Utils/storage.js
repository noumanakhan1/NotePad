const STORAGE_KEY = "professional-notepad-notes";

export const loadNotesFromStorage = () => {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      if (Array.isArray(parsedNotes)) {
        return parsedNotes;
      }
    }
  } catch (error) {
    console.error("Error loading notes from localStorage:", error);
    localStorage.removeItem(STORAGE_KEY);
  }
  return [];
};

export const saveNotesToStorage = (notes) => {
  try {
    const notesData = JSON.stringify(notes);
    localStorage.setItem(STORAGE_KEY, notesData);
    return true;
  } catch (error) {
    console.error("Error saving notes to localStorage:", error);
    return false;
  }
};

export const clearNotesFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
