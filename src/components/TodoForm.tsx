import { useState } from "react"
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore"

function TodoForm() {
  const [todo, setTodo] = useState("")
  const [completed, setCompleted] = useState(false)
  const db = getFirestore()

  //collection ref
  const colRef = collection(db, "todos")
  //add todo
  const submitTodo = () => {
    addDoc(colRef, {
      title: todo,
      completed: completed,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        console.log("completed")
        setTodo("")
        // document.getElementById('todo-form')?.reset()
      })
      .catch((e) => e)
  }

  //delete todo

  return (
    <div>
      <form
        id="todo-form"
        onSubmit={(e) => {
          e.preventDefault()
          submitTodo()
        }}
      >
        <input
          type="text"
          name="title"
          id="title"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </form>
    </div>
  )
}

export default TodoForm
