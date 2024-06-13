/**
 * Starts the GraphQL server using Express.
 *
 * This function sets up an Express app, creates an Apollo Server instance, and configures the necessary middleware to handle GraphQL requests.
 *
 * The server exposes two GraphQL queries:
 * - `getTodos`: Returns a list of all todos.
 * - `getAllUsers`: Returns a list of all users.
 * - `getUserById`: Returns a single user by ID.
 *
 * The server listens on port 8000 and logs a message when it starts.
 */
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const { USERS } = require("./user");
const { TODOS } = require("./todo");

async function startServer() {
  const app = express();

  /**
   * user: User
   * Represents a user associated with a todo item.
   *
   * userId: ID!
   * @property {string} userId - The ID of the user associated with the todo item.
   */

  const server = new ApolloServer({
    typeDefs: `
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!            
        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean            
            user: User
            userId: ID!
        }

        type Query {
            getAllTodos: [Todo]
            getTodoById(id: ID!): Todo
            getAllUsers: [User]
            getUserById(id: ID!): User         
            getTodosByUserId(userId: ID!): [Todo]           
        
        }
    `,
    resolvers: {
      Todo: {
        // user: (todo) => USERS.find((e) => e.id === todo.id),
        /**
         * Resolves the user associated with a given todo item.
         *
         * @param {object} todo - The todo item for which to fetch the associated user.
         * @param {string} todo.userId - The ID of the user associated with the todo item.
         * @returns {Promise<object>} The user object associated with the todo item.
         */
        user: async (todo) => {
          try {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching todos:", error);
            return [];
          }
        },
      },
      Query: {
        //getTodos: () => TODOS,
        /**
         * Retrieves all todos from the API.
         *
         * @returns {Promise<Array<Todo>>} An array of all todo items.
         */
        getAllTodos: async () => {
          try {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/todos`
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching todos:", error);
            return [];
          }
        },
        /**
         * Retrieves a single todo item by ID.
         *
         * @param {object} _parent - The parent object in the GraphQL resolver hierarchy.
         * @param {string} id - The ID of the todo item to retrieve.
         * @returns {Promise<object>} The todo item with the specified ID.
         */
        getTodoById: async (_parent, { id }) => {
          try {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/todos/${id}`
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching todos:", error);
            return [];
          }
        },

        /**
         * Retrieves all users from the API.
         *
         * @returns {Promise<Array<User>>} An array of all user objects.
         */
        getAllUsers: async () => {
          try {
            const response = await axios.get(
              "https://jsonplaceholder.typicode.com/users"
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching todos:", error);
            return [];
          }
        },
        // getUserById: async (parent, { id }) => USERS.find((e) => e.id === id),
        /**
         * Retrieves a single user by ID.
         *
         * @param {object} _parent - The parent object in the GraphQL resolver hierarchy.
         * @param {string} id - The ID of the user to retrieve.
         * @returns {Promise<object>} The user object with the specified ID.
         */
        getUserById: async (_parent, { id }) => {
          try {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/users/${id}`
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching todos:", error);
            return [];
          }
        },
        getTodosByUserId: async (_parent, { userId }) => {
          try {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching todos:", error);
            return [];
          }
        },
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Serevr Started at PORT 8000"));
}

startServer();
