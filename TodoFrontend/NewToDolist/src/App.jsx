import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [list, setList] = useState([])
  const [task, setTask] = useState('')
  
  
  function toggleLineThrough(itemId) {
    const label = document.querySelector(`label[for="${itemId}"]`);
    if (label) {
      label.classList.toggle("isChecked");
    }
  }
    const showTodos = async ()=>{

      try {
          const {data} = await axios.get('http://localhost:8000/api/show/todos');
          setList(data);
          }
      catch(error)
      {
        console.log(error)
      }    
    }

    const AddTodos = async (e)=>{
      e.preventDefault()
      try {
          const add = await axios.post('http://localhost:8000/api/create/list',{task});
           
           if(add.status==200){
            setTask(''); 
            showTodos();
           }
           
          }
      catch(error)
      {
        console.log(error)
      }    
    }


    const DeleteTodos = async (id)=>{
      try {

          const todoDelete = await axios.delete(`http://localhost:8000/api/delete/todo/${id}`);
           
           if(todoDelete.status==200){
            showTodos();
           }
           
          }
      catch(error)
      {
        console.log(error)
      }    
    }
    
    

     
    useEffect(()=>
    {
      showTodos();
    },[])

  return ( 
    <div>
        <h1>ToDo List</h1>
        <form className="list-container">
        <input type='text' placeholder='Enter Task' onChange={(e)=>setTask(e.target.value)} value={task} />
        <button type='button' onClick={AddTodos}>Add</button>
        </form>
        
       <div  className="list-container">
        <div></div>
        <h2>List of Task</h2>
        <ul className="list,task">
        {list.map((item) => (
          <li className="list-item" key={item.id}>{item.task}
          <input 
          type="checkbox" 
          class="checkbox" 
          onClick={() => toggleLineThrough(item.id)}/>

          <button onClick={() => DeleteTodos(item.id)} className="delete-button">
              Delete
          </button>
          </li>
        ))}
      </ul>
      </div>
    </div>   
  )
}

export default App
