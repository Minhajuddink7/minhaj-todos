import { useState, useEffect } from "react"
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
import { TextField } from "@mui/material"

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
        style={{
          backgroundColor: "#fff",
          width: "50%",
          margin: "0px auto",
          paddingTop: 15,
        }}
      >
        {/* <input
          type="text"
          name="title"
          id="title"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        /> */}
        <TextField
          label="Type your todo..."
          color="secondary"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
    </div>
  )
}

export default TodoForm
