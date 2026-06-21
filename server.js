const express = require('express');
const axios = require('axios');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MODELNI O'ZGARTIRING: tavsiya: "OpenAssistant/oa-mini" yoki siz xohlagan HF model
const HF_MODEL = process.env.HF_MODEL || 'OpenAssistant/oa-mini';

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!process.env.HF_API_KEY) {
    return res.status(500).json({ error: 'HF_API_KEY env o\'rnatilmagan. .env faylga qo\'ying.' });
  }
  if (!message) return res.status(400).json({ error: 'message required' });

  try {
    const resp = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: message, parameters: { max_new_tokens: 256 } },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    // Hugging Face javobi turlicha bo'lishi mumkin; quydagicha normalizatsiya qilamiz:
    let reply = '';
    if (typeof resp.data === 'string') reply = resp.data;
    else if (Array.isArray(resp.data) && resp.data[0]?.generated_text) reply = resp.data[0].generated_text;
    else if (resp.data?.error) return res.status(500).json({ error: resp.data.error });
    else reply = JSON.stringify(resp.data);

    res.json({ reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'AI chaqiruvida xatolik', details: err.response?.data || err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server http://localhost:${PORT} da ishga tushdi`));
