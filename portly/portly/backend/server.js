const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const app = express();

app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/generate-summary', async (req, res) => {
  const { notes } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a project manager summarizing a freelancer’s weekly client update." },
        { role: "user", content: `Summarize these project notes into a clean weekly client update:\n\n${notes}` }
      ],
      max_tokens: 200
    });

    const summary = response.choices[0].message.content.trim();
    res.json({ summary });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating summary.");
  }
});

app.listen(3001, () => console.log("Portly API running on http://localhost:3001"));
