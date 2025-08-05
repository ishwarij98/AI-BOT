// App.js
import React, { useReducer, useEffect, createContext, useContext } from "react";

// Theme Context
const ThemeContext = createContext();

const initialState = {
  todos: [],
  theme: "light",
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload, loading: false };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_TODOS", payload: data }))
      .catch((err) => dispatch({ type: "ERROR", payload: err.message }));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: state.theme, dispatch }}>
      <div className={`app ${state.theme}`}>
        <h1>React Complex Todo App</h1>
        <ThemeSwitcher />
        {state.loading ? (
          <p>Loading...</p>
        ) : state.error ? (
          <p>Error: {state.error}</p>
        ) : (
          <TodoList todos={state.todos} />
        )}
        <AddTodo />
      </div>
    </ThemeContext.Provider>
  );
};

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          ✅ {todo.title}
        </li>
      ))}
    </ul>
  );
};

// Component to add todo
const AddTodo = () => {
  const [text, setText] = React.useState("");
  const { dispatch } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { id: Date.now(), title: text };
    dispatch({ type: "ADD_TODO", payload: newTodo });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New Todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

// Component to switch theme
const ThemeSwitcher = () => {
  const { theme, dispatch } = useContext(ThemeContext);
  return (
    <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default App;
