"use client";
import { useState } from "react";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

export default function Home() {
 const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ titlu: "", gen: "", rating: "", an: "" });

  const handleAdd = () => {
    if (!form.titlu) return;
    setItems([...items, { ...form, id: Date.now() }]);
    setForm({ titlu: "", gen: "", rating: "", an: "" });
    setOpen(false);
  };

  return (
    <Container style={{ marginTop: 40 }}>
      <Typography variant="h4" gutterBottom>
        CRUD
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Item
      </Button>

      <Table style={{ marginTop: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Titlu</TableCell>
            <TableCell>Gen</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>An</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.titlu}</TableCell>
              <TableCell>{item.gen}</TableCell>
              <TableCell>{item.rating}</TableCell>
              <TableCell>{item.an}</TableCell>
              <TableCell>
                <Button color="error">Delete</Button>
              </TableCell>
              <TableCell>
                <Button>Update</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Titlu"
            fullWidth
            margin="dense"
            value={form.titlu}
            onChange={(e) => setForm({ ...form, titlu: e.target.value })}
          />
          <TextField
            label="Gen"
            fullWidth
            margin="dense"
            value={form.gen}
            onChange={(e) => setForm({ ...form, gen: e.target.value })}
          />
          <TextField
            label="Rating"
            fullWidth
            margin="dense"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />
          <TextField
            label="An"
            fullWidth
            margin="dense"
            value={form.an}
            onChange={(e) => setForm({ ...form, an: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}