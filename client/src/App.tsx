import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// No changes needed, the line can be safely removed
import { Button } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
