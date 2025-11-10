import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());

const menu = [
  { id: 1, name: 'Iced Coffee', price: 3.5, category: 'Drinks' },
  { id: 2, name: 'Matcha Latte', price: 4.25, category: 'Drinks' },
  { id: 3, name: 'Pasta Primavera', price: 8.0, category: 'Main Dishes' },
  { id: 4, name: 'Grilled Salmon', price: 12.5, category: 'Main Dishes' },
  { id: 5, name: 'Cheesecake', price: 4.0, category: 'Desserts' },
  { id: 6, name: 'Chocolate Lava Cake', price: 4.75, category: 'Desserts' }
];

app.get('/menu', (req, res) => {
  res.json(menu);
});

app.post('/order', (req, res) => {
  const order = req.body;
  console.log('Received order', order);
  res.status(201).json({ status: 'ok', received: order });
});

app.listen(PORT, () => {
  console.log(`Mock restaurant server listening on http://localhost:${PORT}`);
});

