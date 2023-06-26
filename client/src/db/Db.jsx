// const { Client } = require("pg");

// const client = new Client(process.env.DATABASE_URL);

// (async () => {
//   await client.connect();
//   try {
//     const results = await client.query("SELECT NOW()");
//     console.log(results);
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     client.end();
//   }
// })();
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Client } from 'pg';

const client = new Client({
  user: 'root',
  host: 'cockroachdb-public-ip',
  database: 'mydb',
  port: 26257,
  ssl: {
    ca: 'path/to/ca.crt',
    cert: 'path/to/client.max.crt',
    key: 'path/to/client.max.key',
  },
});

const Db = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await client.connect();
      const result = await client.query('SELECT * FROM todos');
      setTodos(result.rows);
      await client.end();
    };
    fetchData();
  }, []);

  const handleAddTodo = async () => {
    const newId = uuidv4();
    await client.connect();
    await client.query('INSERT INTO todos (id, task) VALUES ($1, $2)', [newId, newTodo]);
    setTodos([...todos, { id: newId, task: newTodo }]);
    await client.end();
  };

  const handleDeleteTodo = async (id) => {
    await client.connect();
    await client.query('DELETE FROM todos WHERE id = $1', [id]);
    setTodos(todos.filter((todo) => todo.id !== id));
    await client.end();
  };

  return (
    <div>
      <h1>Todos</h1>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Db;
