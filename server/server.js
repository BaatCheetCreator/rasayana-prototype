import express from 'express';
import { PrismaClient } from '@prisma/client'; 
import cors from 'cors'; // Import cors

const prisma = new PrismaClient(); 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Use cors middleware to allow requests from other origins (like your frontend)
app.use(express.json()); 

// --- API Routes ---

// GET all menu items
app.get('/api/menuitems', async (req, res) => {
  console.log("GET /api/menuitems request received"); 
  try {
    const menuItems = await prisma.menuItem.findMany();
    console.log("Fetched menu items:", menuItems); 
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error); 
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Basic root route (optional)
app.get('/', (req, res) => {
  res.send('Hello from Rasayana Backend!'); 
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});