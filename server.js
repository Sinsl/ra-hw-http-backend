import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const notes = [
  {
    "id": 0,
    "content": "Идейные соображения высшего порядка, а также повышение уровня гражданского сознания способствует повышению качества экспериментов, поражающих по своей масштабности и грандиозности."
  },
  {
    "id": 1,
    "content": "Безусловно, семантический разбор внешних противодействий создаёт предпосылки для дальнейших направлений развития."
  },
  {
    "id": 2,
    "content": "Сложно сказать, почему сторонники тоталитаризма в науке объявлены нарушающими общечеловеческие нормы этики и морали."
  }
];
let nextId = 3;

app.get("/notes", (req, res) => {  
  res.send(JSON.stringify(notes));
});

app.post("/notes", (req, res) => {
  notes.push({ ...req.body, id: nextId++ });
  res.status(204);
  res.end();
});

app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
