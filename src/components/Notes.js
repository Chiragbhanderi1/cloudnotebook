import React,{useContext, useEffect,useRef,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = () => {
  const context =useContext(noteContext);
  const {notes,getNotes,editNote}=context;
  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate("/Login") 
    }
    // eslint-disable-next-line
  },[])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note,setNote] = useState({id:"",etitle:'',edescription:'',etag:''})
  const updateNote =(currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  const handleclick=(e)=>{
    refClose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag)
  }
  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
    <AddNote/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form className='my-3'>
           <div className="mb-3">
              <label htmlFor="etitle" className="form-label" >Title</label>
              <input type="text" name='etitle' className="form-control"  value={note.etitle} onChange={onchange} required minLength={3} id="etitle" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">Description</label>
              <input type="text" className="form-control" value={note.edescription} onChange={onchange} name='edescription' minLength={5} required id="edescription"/>
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input type="text" className="form-control" value={note.etag} onChange={onchange} name='etag' required id="etag"/>
            </div>
        </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleclick} className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-3">
           {notes.length === 0  && 'No Notes to display.' }
        </div>
        {notes.map((note)=>{
          return  <Noteitem key={note._id} updateNote={updateNote}  note={note}/>
        })}
      </div>
    </div>
    </>
  )
}

export default Notes
