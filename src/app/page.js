"use client";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function Home() {
  const items = [
    { id: 1, titlu: "Film A", gen: "Drama", rating: "8", an: "2020" },
    { id: 2, titlu: "Film B", gen: "Comedy", rating: "7", an: "2019" },
  ];

  return (
    <Container style={{ marginTop: 40 }}>
      <Typography variant="h4" gutterBottom>
        CRUD
      </Typography>

      <Button variant="contained">
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
    </Container>
  );
}
