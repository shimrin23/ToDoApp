import { useEffect,useState } from 'react'

export default function Todo() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
     const [editTitle, seteditTitle] = useState('')
    const [editDescription, seteditDescription] = useState('')
    const [todos, setTodos] = useState([])
    const apiUrl = "http://localhost:7000"
    const [error, setError] = useState("")
    const [editId, setEditId] = useState(-1)
    const [message, setMessage] = useState("")

    const handleSubmit = () => {
        setError("")
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(apiUrl + '/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            })
                .then((res) => {
                    if (res.ok) {
                        setTodos([...todos, { title, description }])
                        setTitle("")
                        setDescription("")
                        setMessage("Todo item added successfully!")
                        setTimeout(() => {
                            
                             setMessage("")
                        }, 2000)



                    } else {
                        setError("Failed to add todo item.")
                    }
                }).catch((err) => {
                    setError("Error: " + err.message)
        }  )  
    }}


useEffect(() => {
    getItems()
}, [])
 
const getItems = () => {
    fetch(apiUrl + '/todos')
    .then((res) => res.json())
    .then((res) => setTodos(res))
    .catch((err) => setError("Error: " + err.message))
}
     const handleEdit = (item) => {
         setEditId(item._id);
         seteditTitle(item.title);
          seteditDescription(item.description) 
     }

    const handleUpdate = () => { setError("")
        if (editTitle.trim() !== '' && editDescription.trim() !== '') {
            fetch(apiUrl + '/todos/' + editId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editTitle, description: editDescription })
            })
                .then((res) => {
                    if (res.ok) { 

                      const updatedTodos = todos.map((item)=>{
                            if(item._id == editId){
                                item.title= editTitle;
                                item.description= editDescription
                            } return item;
                        })
                        setTodos(updatedTodos)
                        setTitle("")
                        setDescription("")
                        setMessage("Todo item updated successfully!")
                        setTimeout(() => {
                            setMessage("")
                        }, 2000)
                        setEditId(-1);



                    } else {
                        setError("Failed to add todo item.")
                    }
                }).catch((err) => {
                    setError("Error: " + err.message)
        }  )  
    }
       
    } 
    const handleEditCancel = () => {
        setEditId(-1);

    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete?")) {
            fetch (apiUrl + '/todos/' + id, {
                method: 'DELETE'
            })
            .then(() =>{
              const updatedTodos =  todos.filter((item) => item._id !== id  )
                setMessage("Todo item deleted successfully!")
                setTodos(updatedTodos)
            })
        }
    }
    

    return (
      <div className="container-fluid text-center">

         <>
            <div className="row p-3 bg-success text-light">
                <h1>Todo project with MERN stack</h1>
            </div>
            <div className="row">
                <h3>Add item</h3>
                {message && <p className="text-success">{message}</p>}
                <div className="form-group d-flex gap-2">
                    <input
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="form-control"
                        type="text"
                    />
                    <input  
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="form-control"
                        type="text"
                    />
                    <button className="btn btn-dark" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div> 
            <div className="row mt-3">
                <h3>Tasks</h3>
              <div className="container text-center col-md-6 ">
                  <ul className="list-group">
                    {
                        todos.map((item) => 
                        <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex flex-column me-2"> 
                       {
                            editId == -1 || editId !== item._id? <> 
                            <span className="fw-bold">{item.title}</span>
                             <span >{item.description}</span>
                            
                            </>:<>
                            <div className="form-group d-flex gap-2">
                    <input
                        placeholder="Title"
                        onChange={(e) => seteditTitle(e.target.value)}
                        value={editTitle}
                        className="form-control"
                        type="text"
                    />
                    <input  
                        placeholder="Description"
                        onChange={(e) => seteditDescription(e.target.value)}
                        value={editDescription}
                        className="form-control"
                        type="text"
                    />
                   
                </div>


                            </>
                       }
                        
                    </div>

                        <div className="d-flex gap-2">
                          {  editId == -1  || editId !== item._id?  <button className="btn btn-warning" onClick={()=> handleEdit(item) }>Edit</button>:<button className="btn btn-warning" onClick={handleUpdate} >Update</button>}
                           {  editId == -1 || editId !== item._id?   <button className="btn btn-danger"onClick={()=> handleDelete(item._id)} >Delete</button>:
                             <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>}
                         </div>
                        
                    </li>)
                    }
                    
                </ul>
              </div>

            </div>
        </>
       </div>
    )
}