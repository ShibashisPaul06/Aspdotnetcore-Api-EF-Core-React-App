import React, { useEffect, useState } from 'react';
import { getAll, create, update, remove } from './api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ id: 0, name: '', email: '', department: '', salary: '' });

  const load = async () => {
    const res = await getAll();
    setEmployees(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id === 0) await create(form);
    else await update(form.id, form);
    setForm({ id: 0, name: '', email: '', department: '', salary: '' });
    load();
  };

  const editEmp = (emp) => setForm(emp);
  const deleteEmp = async (id) => { await remove(id); load(); };

  return (
    <div style={{ padding: 20 }}>
      <h1>Employee Management CRUD</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
        <input placeholder="Salary" type="number" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
        <button type="submit">{form.id === 0 ? 'Add' : 'Update'}</button>
        {form.id !== 0 && <button type="button" onClick={() => setForm({ id: 0, name: '', email: '', department: '', salary: '' })}>Cancel</button>}
      </form>
      <table border="1" cellPadding="5">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Salary</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => editEmp(emp)}>Edit</button>
                <button onClick={() => deleteEmp(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
