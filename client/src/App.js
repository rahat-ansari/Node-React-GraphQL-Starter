import './App.css';

import { gql, useQuery } from "@apollo/client";


const query = gql`
  query getAllTodos {
    getAllTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;


function App() {
  const { data, loading } = useQuery(query);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="App">
      {/* <table>
        <tbody>
          {data.getAllTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {data.getAllTodos.length}
      {/* {data.getAllTodos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title} <span> --{todo.user.name}</span> </p>
          
        </div>
      ))} */}
      {/* {loading && <h1>Loading...</h1>}
      {!loading && <h1>Loaded</h1>} */}
      {loading ? <h1>Loading...</h1> : <>
        <ol>
          {data.getAllTodos.map((todo) => (
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

      </>}

    </div>
  );
}

export default App;
