import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [toggle, setToggle] = useState(true)
  useEffect(() => {
    let itemstring = localStorage.getItem("todos")
    if (itemstring) {
      let item = JSON.parse(localStorage.getItem("todos"))
      setTodos(item)
    }
  }, [])
  const showToggle = () => {
    setToggle(!toggle)
  }

  const savetoLcoal = () => {
    //local storage stores the data in cache memory and it stores in key value pair

    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const check = (e, id) => {
    let a = confirm("are you sure want to delete it");
    if (a == true) {
      handleDelete(e, id);
    }
  }
  const check2 = (e, id) => {
    let a = confirm("are you sure want to edit this TODO");
    if (a == true) {
      handleEdit(e, id);
    }
  }
  const handleEdit = (e, id) => {
    let el = todos.filter(i => i.id === id)
    setTodo(el[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newtodos)
    savetoLcoal();

  }
  const handleDelete = (e, id) => {

    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newtodos)
    savetoLcoal();

  }
  const handleAdd = () => {
    if (todo.length <= 3) {
      alert("The todo length must be greater than 3")
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("")
    savetoLcoal();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos]; //naya todos bnana hai taki bad mai re rendering ho
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    savetoLcoal();
  }

  return (
    <>
      <Navbar />

      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2'>
        <h1 className='font-bold text-center text-2xl my-3 underline'>Todo manager-Manage your Todos at one place</h1>
        <h2 className='text-lg font-bold'>Add Todo</h2>
        <div className=" flex addTodo my-3" >
          <input type="text" value={todo} onChange={handleChange} className='w-full rounded-full p-2' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-full mx-3'>Save</button>
        </div>
        <input className='my-5' id='show' type="checkbox" onChange={showToggle} checked={toggle} />
        <label className="mx-2" htmlFor="show">Show completed task's</label>
        <div className='h-[1px] bg-black opacity-30 w-[90%] mx-auto my-2'></div>
        <h1 className='text-xl font-bold'>Your todos</h1>
        <div className="todos">
          {todos.length == 0 && <div> No Todos to display  </div>}
          {todos.map(item => {

            return (toggle || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { check2(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdEditSquare /></button>
                <button onClick={(e) => { check(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><RiDeleteBin5Fill /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
