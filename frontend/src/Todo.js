import { useEffect,useState } from 'react'

export default function Todo() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [todos, setTodos] = useState([])
    const apiUrl = "http://localhost:7000"
    const [error, setError] = useState("")
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


    return (
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
                <ul className="list-group">
                    {
                        todos.map((item) => 
                        <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex flex-column"> 
                        <span className="fw-bold">{item.title}</span>
                        <span >{item.description}</span>
                    </div>

                        <div className="d-flex gap-2">
                            <button className="btn btn-warning">Edit</button>
                             <button className="btn btn-danger">Delete</button>
                         </div>
                        
                    </li>)
                    }
                    
                </ul>

            </div>
        </>
    )
}