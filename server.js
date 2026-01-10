import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = Number(process.env.PORT) || 5174;
const DATA_DIR = process.env.DIAGRAMS_DIR || path.resolve("data/diagrams");
const DATA_FILE = path.join(DATA_DIR, "diagrams.json");

const ensureDataDir = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
};

const readDiagrams = async () => {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
};

const writeDiagrams = async (payload) => {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2));
};

app.use(express.json({ limit: "2mb" }));

app.get("/api/diagrams", async (req, res) => {
  try {
    const stored = await readDiagrams();
    if (!stored || typeof stored !== "object") {
      res.json({ diagrams: [], activeDiagramId: null });
      return;
    }
    res.json({
      diagrams: Array.isArray(stored.diagrams) ? stored.diagrams : [],
      activeDiagramId:
        typeof stored.activeDiagramId === "string" ? stored.activeDiagramId : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to load diagrams." });
  }
});

app.post("/api/diagrams", async (req, res) => {
  const { diagrams, activeDiagramId } = req.body ?? {};
  if (!Array.isArray(diagrams)) {
    res.status(400).json({ error: "Invalid diagrams payload." });
    return;
  }
  try {
    await writeDiagrams({
      diagrams,
      activeDiagramId: typeof activeDiagramId === "string" ? activeDiagramId : null,
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to save diagrams." });
  }
});

app.listen(PORT, async () => {
  await ensureDataDir();
  console.log(`Diagram API listening on http://localhost:${PORT}`);
});
