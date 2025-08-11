import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [savedNotes, setSavedNotes] = useState([]);
  const [isEnableNotification, setIsEnableNotification] = useState(false);

  // notes

  const saveNote = async data => {
    try {
      const storedNote = await AsyncStorage.getItem('notes');
      let notes = storedNote !== null ? JSON.parse(storedNote) : [];

      const updatedNotes = [...notes, data];

      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const fetchNotes = async () => {
    try {
      const savedData = await AsyncStorage.getItem('notes');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedNotes(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = async selectedNote => {
    const jsonValue = await AsyncStorage.getItem('notes');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedNote.id);

    setSavedNotes(filtered);
    await AsyncStorage.setItem('notes', JSON.stringify(filtered));
  };

  const value = {
    saveNote,
    fetchNotes,
    savedNotes,
    removeNote,
    isEnableNotification,
    setIsEnableNotification,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
