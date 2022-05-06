import "./App.css"
import {
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { useState } from "react"
import Firebase from "./helpers/Firebase"
import TodoForm from "./components/TodoForm"
import Todos from "./components/Todos"

function App() {
  const [todos, setTodos] = useState([])
  //init services
  initializeApp({
    apiKey: "AIzaSyAdwmoNTYNRGlWpGnMC3GmQX2m-3oYNqGY",
    authDomain: "minhaj-todos-1.firebaseapp.com",
    projectId: "minhaj-todos-1",
    storageBucket: "minhaj-todos-1.appspot.com",
    messagingSenderId: "712511568133",
    appId: "1:712511568133:web:8be52f0bf234af639a1f6c",
  })
  // Firebase();
  const db = getFirestore()

  //collection ref
  const colRef = collection(db, "todos")
  const q = query(colRef, orderBy("createdAt"))
  onSnapshot(q, (snapshot) => {
    let todos: any = []
    snapshot.docs.forEach((doc) => {
      const todo: any = { ...doc.data(), id: doc.id }
      todos.push(todo)
    })
    setTodos(todos)
    // console.log(todos)
  })

  return (
    <div className="App">
      <TodoForm />
      <Todos todos={todos} />
    </div>
  )
}

export default App
