import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const App = () => {
  // const [todos, setTodos] = useState([]);

  // const createTodo = (title) => {
  //   const newTodo = { id: Date.now(), title };
  //   setTodos([...todos, newTodo]);
  // };
  // const deleteTodo = (id) => {
  //   setTodos(todos.filter((t) => t.id !== id));
  // };

  return (
    <div className="min-h-screen bg-[#0B0F19] bg-gradient-to-br from-[#1B1F3B] via-[#0B0F19] to-black">
      <Header />
      <Outlet />
      {/* <div className="flex flex-col items-center gap-2 border-1 border-blue-400">
        <h1 className="text-3xl font-bold underline">Todo App</h1>
        <TodoCreate onCreate={createTodo} />
        <TodoList todos={todos} setTodos={setTodos} onDelete={deleteTodo} />
      </div> */}
    </div>
  );
};
export default App;
