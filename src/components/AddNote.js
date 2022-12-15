import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = (props) => {
  const context =useContext(noteContext);
  const {addNote}=context;

  const [note,setNote] = useState({title:'',description:'',tag:''})
  const handleclick=(e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag)
    setNote({title:'',description:'',tag:''})
    props.showAlert("Added successfully","success")
  }
  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
       <div className="container my-3">
        <h2>Add a Note</h2>
        <form className='my-3'>
           <div className="mb-3">
              <label htmlFor="title" className="form-label" >Title</label>
              <input type="text" value={note.title} name='title' className="form-control"  onChange={onchange} minLength={3} required id="title" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" value={note.description} className="form-control" onChange={onchange} minLength={5} required name='description' id="description"/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" value={note.tag} className="form-control" onChange={onchange}  required name='tag' id="tag"/>
            </div>
            
            <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
