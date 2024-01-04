import { useEffect, useState } from 'react';
import Input from './components/input/Input';
import Notes from './components/notes/Notes';
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetAllNotesQuery,
  useLazySearchNoteQuery,
  useUpdateNoteMutation
} from './queries/NoteQuery';

type Note = { id: number; title: string; content: string };

const App = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  // const [filteredNote, setFilteredNote] = useState<Note[]>([]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: getAllNotes } = useGetAllNotesQuery('');
  const [createNote] = useCreateNoteMutation();
  const [deleteNote, isSuccess] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [searchNote] = useLazySearchNoteQuery();

  const handleAddNote = async (event: any) => {
    event.preventDefault();
    // try {
    //   const response = await fetch('http://localhost:5000/api/notes', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ title, content })
    //   });
    //   const newNote = await response.json();
    //   setNotes([newNote, ...notes]);
    //   setTitle('');
    //   setContent('');
    // } catch (error) {
    //   console.log(error);
    // }
    const response = await createNote({ title, content });
    console.log('create', response);
    if ('data' in response) {
      const newNote = response.data;
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handelUpdateNote = async (id: number) => {
    // try {
    //   if (id) {
    //     const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ title, content })
    //     });
    //     const updatedNote = await response.json();
    //     const updatedNoteList = notes.map((item) =>
    //       item.id === id ? updatedNote : item
    //     );
    //     setNotes(updatedNoteList);
    //     setTitle('');
    //     setContent('');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    const payload = { title, content };
    const response = await updateNote({ id, body: payload });
    if ('data' in response) {
      const updatedNote = response.data;
      const updatedNoteList = notes.map((item) =>
        item.id === id ? updatedNote : item
      );
      setNotes(updatedNoteList);
      setTitle('');
      setContent('');
    }
  };

  const handleCancel = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  const handleDeleteNote = async (
    event: React.MouseEvent<HTMLElement>,
    note: Note
  ) => {
    event.stopPropagation();
    // try {
    //   await fetch(`http://localhost:5000/api/notes/${note.id}`, {
    //     method: 'DELETE'
    //   });
    //   const updatedNoteList = notes.filter((item) => item.id !== note.id);
    //   setNotes(updatedNoteList);
    // } catch (error) {
    //   console.log(error);
    // }
    deleteNote(note.id);
    if (isSuccess) {
      const updatedNoteList = notes.filter((item) => item.id !== note.id);
      setNotes(updatedNoteList);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/notes');
  //       const note: Note[] = await response.json();
  //       setNotes(note);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    setNotes(getAllNotes);
  }, [getAllNotes]);

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // console.log('search', searchTerm, searchTerm.length);
      const res = await searchNote(searchTerm);
      if ('data' in res) {
        setNotes(res.data);
      }
      // try {
      //   const response = await fetch(
      //     `http://localhost:5000/api/notes/search?title=${searchTerm}`
      //   );
      //   const data = await response.json();
      //   console.log('data', data);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  return (
    <>
      <input
        className="mb-10 h-10 rounded-md border p-2 focus:outline-none"
        placeholder="Enter your search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
      <div className="flex w-full">
        <form className="flex w-1/4 flex-col">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mb-8 p-2"
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Content"
            required
            rows={10}
            className="rounded-md border p-2 focus:outline-none"
          />
          {selectedNote ? (
            <div className="w-full">
              <button
                type="submit"
                className="mt-4 h-10 w-1/2 rounded-md bg-[#409ab8] text-white"
                onClick={(e) => {
                  e.preventDefault();
                  handelUpdateNote(selectedNote.id);
                }}
              >
                Save
              </button>
              <button
                type="submit"
                className="mt-4 h-10 w-1/2 rounded-md bg-[#409ab8] text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 h-10 rounded-md bg-[#409ab8] text-white"
              onClick={(e) => handleAddNote(e)}
            >
              Add Note
            </button>
          )}
        </form>
        <div className="ml-4 grid w-3/4 grid-cols-2 gap-4">
          {notes?.map((item) => (
            <div
              role="presentation"
              key={item?.id}
              onClick={() => handleNoteClick(item)}
            >
              <Notes
                title={item?.title}
                content={item?.content}
                // key={item.id}
                handleCancelClick={(e: React.MouseEvent<HTMLElement>) =>
                  handleDeleteNote(e, item)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
