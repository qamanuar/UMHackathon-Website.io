// server.js
import express from 'express';
import dotenv from 'dotenv';
import supabase from './supabaseClient.js';

dotenv.config();

const app = express();
app.use(express.json());

// Test connection route
app.get('/api/test', async (req, res) => {
  const { data, error } = await supabase.from('participants').select('*').limit(1);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true, data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
