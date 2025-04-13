import "./App.css";
import TodoList from "./ToDoList";
import Todoprovider from "./context/todocontext";
import { ToastProvider } from "./context/toast";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "99vh",
        backgroundColor: "#383c3c",
      }}
    >
      <Todoprovider>
        <ToastProvider>
          <TodoList />
        </ToastProvider>
      </Todoprovider>
    </div>
  );
}

export default App;
