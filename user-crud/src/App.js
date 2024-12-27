import React, { useState } from 'react';
import useUserStore from './store/userStore';

const App = () => {
  const { users, addUser, updateUser, deleteUser } = useUserStore();
  const [form, setForm] = useState({ name: '', email: '' });
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateUser(editId, form);
      setEditId(null);
    } else {
      addUser({ id: Date.now(), ...form });
    }
    setForm({ name: '', email: '' });
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User CRUD</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">{editId ? 'Update' : 'Add'} User</button>
      </form>

      <h2>User List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.name} - {user.email}
              </span>
              <button
                onClick={() => handleEdit(user)}
                style={{ marginLeft: '10px' }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                style={{ marginLeft: '5px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default App;
