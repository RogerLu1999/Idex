import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = Number(process.env.PORT) || 5174;
const DATA_DIR = process.env.DIAGRAMS_DIR || path.resolve("data/diagrams");
const MANIFEST_FILE = path.join(DATA_DIR, "manifest.json");
const DIAGRAM_FILE_SUFFIX = ".json";

const ensureDataDir = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
};

const readManifest = async () => {
  try {
    const raw = await fs.readFile(MANIFEST_FILE, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
};

const toDiagramFileName = (diagramId) =>
  `${encodeURIComponent(diagramId)}${DIAGRAM_FILE_SUFFIX}`;

const readDiagrams = async () => {
  try {
    const manifest = await readManifest();
    const files = await fs.readdir(DATA_DIR);
    const diagramFiles = files.filter(
      (file) => file.endsWith(DIAGRAM_FILE_SUFFIX) && file !== path.basename(MANIFEST_FILE)
    );
    const orderedIds = Array.isArray(manifest?.order) ? manifest.order : null;
    const order = orderedIds && orderedIds.length > 0 ? orderedIds : null;
    const fileNames = order
      ? order.map(toDiagramFileName).filter((file) => diagramFiles.includes(file))
      : diagramFiles;
    const diagrams = await Promise.all(
      fileNames.map(async (fileName) => {
        const raw = await fs.readFile(path.join(DATA_DIR, fileName), "utf8");
        return JSON.parse(raw);
      })
    );
    return {
      diagrams,
      activeDiagramId:
        typeof manifest?.activeDiagramId === "string" ? manifest.activeDiagramId : null,
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
};

const writeDiagrams = async ({ diagrams, activeDiagramId }) => {
  await ensureDataDir();
  const expectedFiles = new Set(
    diagrams.map((diagram) => toDiagramFileName(diagram.id))
  );
  await Promise.all(
    diagrams.map((diagram) =>
      fs.writeFile(
        path.join(DATA_DIR, toDiagramFileName(diagram.id)),
        JSON.stringify(diagram, null, 2)
      )
    )
  );
  const existingFiles = await fs.readdir(DATA_DIR);
  await Promise.all(
    existingFiles
      .filter(
        (file) =>
          file.endsWith(DIAGRAM_FILE_SUFFIX) &&
          file !== path.basename(MANIFEST_FILE) &&
          !expectedFiles.has(file)
      )
      .map((file) => fs.unlink(path.join(DATA_DIR, file)))
  );
  await fs.writeFile(
    MANIFEST_FILE,
    JSON.stringify(
      {
        activeDiagramId: typeof activeDiagramId === "string" ? activeDiagramId : null,
        order: diagrams.map((diagram) => diagram.id),
      },
      null,
      2
    )
  );
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
      activeDiagramId,
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
