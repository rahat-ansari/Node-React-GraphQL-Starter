import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// No changes needed, the line can be safely removed
import { gql, useQuery } from "@apollo/client";
import { Button } from "@mui/material";

const query = gql`
  query GetAllTodos {
    getAllTodos {
      id
      userId
      completed
      title
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const [count, setCount] = useState(0);
  const { data } = useQuery(query);
  return (
    <>
      <div className="text-center w-fit m-auto ">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + typeScript + Tailwind CSS + MUI </h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="text-red-600">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Button variant="contained" color="success">
        Success
      </Button>

      <ol>
        {data?.getAllTodos.map((todo: any) => (
          <li
            key={todo.id}
            style={{
              textAlign: "left",
              color: todo.completed ? "green" : "red",
            }}
          >
            {todo.title} {todo.completed ? " ✔" : " X"}
          </li>
        ))}
      </ol>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
