import React, { useEffect, useState } from 'react';
import { getAll, create, update, remove } from './api';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ id: 0, name: '', email: '', department: '', salary: '' });
  const [open, setOpen] = useState(false);

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
    setOpen(false);
    load();
  };

  const editEmp = (emp) => {
    setForm(emp);
    setOpen(true);
  };

  const deleteEmp = async (id) => {
    await remove(id);
    load();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 100, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="outlined" onClick={() => editEmp(params.row)}>Edit</Button>
          <Button variant="outlined" color="error" onClick={() => deleteEmp(params.row.id)} style={{ marginLeft: 10 }}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Paper style={{ padding: 20, margin: 20 }}>
      <Typography variant="h4" gutterBottom>Employee Management CRUD</Typography>
      <Button variant="contained" onClick={() => setOpen(true)} style={{ marginBottom: 20 }}>
        Add Employee
      </Button>

      {/* DataGrid table */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
          disableSelectionOnClick
        />
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{form.id === 0 ? 'Add Employee' : 'Edit Employee'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            fullWidth margin="normal"
            required
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            fullWidth margin="normal"
          />
          <TextField
            label="Department"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
            fullWidth margin="normal"
          />
          <TextField
            label="Salary"
            type="number"
            value={form.salary}
            onChange={e => setForm({ ...form, salary: e.target.value })}
            fullWidth margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{form.id === 0 ? 'Add' : 'Update'}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default App;
