import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config({ path: '../.env' }); 

console.log('DATABASE_URL:', process.env.DATABASE_URL);
connectDB(); 

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  })
);

app.use(express.json());
app.use("/api/cart", cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});