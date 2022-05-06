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
import { Button, Checkbox } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
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
              alignItems: "center",
              maxWidth: 320,
              margin: "10px auto",
              border: "1px solid #334",
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#fff",
            }}
          >
            {/* <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                updateTodo(e.target.checked, todo.id)
              }}
            /> */}
            <Checkbox
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
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default Todos
