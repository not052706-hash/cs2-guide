const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/tips', (req, res) => {
  const tips = {
    shooting: [
      "Контроль спрея — учи паттерны AK-47 и M4",
      "Не стреляй в движении с винтовками",
      "Используй tap-стрельбу на дальних дистанциях"
    ],
    nades: [
      "В CS2 гранаты можно перебрасывать обратно",
      "Дым взаимодействует с молотовым",
      "Изучи дымовые линейки на картах"
    ],
    economy: [
      "Форс-бай после проигрыша пистолетного раунда",
      "Покупай броню + хелс в первую очередь",
      "Не покупай каждый раунд"
    ],
    positioning: [
      "Не перекрывай линию огня тиммейтам",
      "Используй углы для сбора инфы",
      "После убийства меняй позицию"
    ]
  };
  res.json(tips);
});

app.get('/api/maps', (req, res) => {
  const maps = [
    { name: "Mirage", tips: "Контролируй мид, используй Window smoke" },
    { name: "Inferno", tips: "Зачищай Banana гранатами" },
    { name: "Dust2", tips: "Контроль Long A и катакомбы" }
  ];
  res.json(maps);
});

app.post('/api/contact', (req, res) => {
  const { name, email, question } = req.body;
  if (!name || !question) {
    return res.status(400).json({ error: "Имя и вопрос обязательны" });
  }
  const stmt = db.prepare("INSERT INTO messages (name, email, question) VALUES (?, ?, ?)");
  stmt.run(name, email || null, question, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Ошибка БД" });
    }
    res.json({ success: true, id: this.lastID });
  });
  stmt.finalize();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CS2 справочник запущен на порту ${PORT}`);
});