import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';


const App = () => {
  const [notes, setNotes] = useState([{
    id: nanoid(),
    text:"This is my first note!",
    date:"16/10/2024",
  },
  {
    id: nanoid(),
    text:"This is my second note!",
    date:"16/10/2024",
  },
  {
    id: nanoid(),
    text:"This is my third note!",
    date:"16/10/2024",
  },
  {
    id: nanoid(),
    text:"This is my new note!",
    date:"16/10/2024",
  },
]);

const [searchText, setSearchText] = useState('');

const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
  );

  if(savedNotes){
    setNotes(savedNotes);
  }
}, []);

useEffect(() =>{
  console.log('Notes saved to localStorage:', notes);
  localStorage.setItem(
    'react-notes-app-data', 
    JSON.stringify(notes)
  );
}, [notes]);
  const addNote = (text) => {
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    const newNote = {
      id: nanoid(),
      text: text,
      date: formattedDate,
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id!== id);
    setNotes(newNotes);
  };

  return(
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
      <Header handleToggleDarkMode = {setDarkMode} />
      <Search handleSearchNote = {setSearchText} />
      <NotesList 
        notes={notes.filter((note) => 
          note.text.toLowerCase().includes(searchText)
        )} 
        handleAddNote = {addNote}
        handleDeleteNote = {deleteNote}
        />
     </div>
   </div>
    
  )
};

export default App;
