"use client";
import { useState, useEffect } from "react";
import { H4Customed } from "./styled";
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
  TextField,
  Tab
} from "@mui/material";

export default function Home() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ titlu: "", gen: "", rating: "", an: "" });
  const [editId, setEditId] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleAdd = () => {
    if (!validateForm()) return;
    setItems([...items, { ...form, id: Date.now() }]);
    setForm({ titlu: "", gen: "", rating: "", an: "" });
    setOpen(false);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdate = (id) => {
    const current = items.find((item) => item.id === id);
    setForm({
      titlu: current.titlu,
      gen: current.gen,
      rating: current.rating,
      an: current.an,
    });
    setEditId(id);
    setOpenUpdate(true);
  };

  const handleUpdateSave = () => {
    if (!validateForm()) return;
    setItems(
      items.map((i) =>
        i.id === editId ? { ...i, ...form } : i
      )
    );
    setForm({ titlu: "", gen: "", rating: "", an: "" });
    setEditId(null);
    setOpenUpdate(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("items");
    if (data) setItems(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const validateForm = () => {
    if (!form.titlu.trim()) {
      alert("Titlu nu poate fi gol!");
      return false;
    }
    if (!form.gen.trim()) {
      alert("Gen nu poate fi gol!");
      return false;
    }
    if (!/^[A-Za-z]+$/.test(form.gen.trim())) {
      alert("Gen trebuie să contina doar litere latine!");
      return false;
    }

    const ratingNum = Number(form.rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
      alert("Rating trebuie să fie un număr între 1 și 10!");
      return false;
    }
    const yearNum = Number(form.an);
    if (isNaN(yearNum) || form.an.length !== 4) {
      alert("An trebuie să fie un an valid (ex: 2024)!");
      return false;
    }
    return true;
  };

  const handleSortByYear = () => {
  const sorted = [...items].sort((a, b) => {
    const yearA = Number(a.an);
    const yearB = Number(b.an);
    return yearA - yearB;
  });
  setItems(sorted);
};


  return (
    <Container style={{ marginTop: 40 }}>
      <H4Customed variant="h4" gutterBottom>
        CRUD - Filme
      </H4Customed>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Item
      </Button>

      <Button variant="contained" onClick={handleSortByYear} style={{ marginLeft: 10 }}>
        Sort by Year
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
                <Button color="error" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>

              </TableCell>
              <TableCell>
                <Button onClick={() => handleUpdate(item.id)}>
                  Update
                </Button>
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

      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Item</DialogTitle>
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
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button onClick={handleUpdateSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}