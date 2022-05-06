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
  updateDoc,
} from "firebase/firestore"

type Todo = { title: string; id: string; completed: boolean }
function Todos({ todos = [] }) {
  const db = getFirestore()
  //delete todo
  const deleteTodo = (id: string) => {
    const docRef = doc(db, "todos", id)
    deleteDoc(docRef)
      .then(() => {
        alert("todo deleted")
      })
      .catch((e) => console.log(e))
  }

  //update todo
  const updateTodo = (checked: boolean, id: string) => {
    const docRef = doc(db, "todos", id)
    updateDoc(docRef, { completed: checked })
      .then(() => {
        alert("updated")
      })
      .catch((e) => console.log(e))
  }
  return (
    <div>
      {todos?.map((todo: Todo) => {
        return (
          <div
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 220,
              margin: "10px auto",
              border: "1px solid #334",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                updateTodo(e.target.checked, todo.id)
              }}
            />
            <p
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Todos
