import React, { useState, useEffect } from "react";
import { db, auth } from "../../src/config/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Notes = () => {
  let initialState = {
    title: "",
    description: "",
  };
  const [value, setValue] = useState(initialState);
  const [isComplete, setIsComplete] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idNote, setIdNote] = useState();
  const [uid, setUid] = useState();

  const handleValueChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNotes = async () => {
    _clearForm();

    try {
      const data = {
        title: value.title,
        description: value.description,
        isComplete: isComplete,
        created: Timestamp.now(),
        uid: uid,
      };

      await addDoc(collection(db, "notes"), data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateNotes = async () => {
    _clearForm();
    const noteRef = doc(db, "notes", idNote);

    try {
      await updateDoc(noteRef, {
        title: value.title,
        description: value.description,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getNotesDocument = async () => {
    try {
      setLoading(true);
      const q = await query(
        collection(db, "notes"),
        where("uid", "==", uid && uid)
      );
      onSnapshot(q, (querySnapshot) => {
        setNotes(
          querySnapshot.docs.map((notes) => {
            return {
              id: notes.id,
              data: notes.data(),
            };
          })
        );
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setFormWithCurrentNote = (id, title, description) => {
    setValue({
      ...value,
      title: title,
      description: description,
    });
    setIdNote(id);
    setIsUpdate(true);
  };

  const deleteNote = async (id) => {
    const noteRef = doc(db, "notes", id);

    try {
      await deleteDoc(noteRef);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    getNotesDocument();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const _clearForm = () => {
    setValue(initialState);
  };
  return (
    <div className="row">
      <div className="col-4">
        <div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              id="title"
              aria-describedby="title"
              name="title"
              value={value.title}
              onChange={handleValueChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              id="description"
              aria-describedby="description"
              name="description"
              value={value.description}
              onChange={handleValueChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="completed"
              checked={isComplete}
              onChange={() => setIsComplete(!isComplete)}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Sudah Selesai
            </label>
          </div>
          {isUpdate ? (
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleUpdateNotes}
            >
              Update Notes
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleAddNotes}
            >
              Add Notes
            </button>
          )}
        </div>
      </div>
      <div className="col-8">
        <div className="row">
          {loading && <h3>Loading...</h3>}
          {notes?.map((note) => {
            return (
              <div className="col-3" key={note.id}>
                <div className="card bg-dark">
                  <div className="card-body">
                    <h5 className="card-title">{note.data.title}</h5>
                    <p className="card-text">{note.data.description}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn text-success"
                        onClick={() =>
                          setFormWithCurrentNote(
                            note.id,
                            note.data.title,
                            note.data.description
                          )
                        }
                      >
                        Edit Note
                      </button>
                      <button
                        className="btn text-danger"
                        onClick={() => deleteNote(note.id)}
                      >
                        Delete Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
