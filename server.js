import express from "express";
import { exec } from "child_process";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Moltbot running on Render" });
});

// Command runner
app.post("/run", (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: "command missing" });
  }

  exec(`npx moltbot ${command}`, (error, stdout, stderr) => {
    if (error) {
      return res.json({ error: stderr || error.message });
    }
    res.json({ output: stdout });
  });
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
