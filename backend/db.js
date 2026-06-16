const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'messages.json');

// Создаём папку data если её нет
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Создаём файл базы данных если его нет
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// Функции для работы с "базой данных"
const db = {
  // Получить все сообщения
  getAll: () => {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  },
  
  // Добавить новое сообщение
  add: (message) => {
    const messages = db.getAll();
    const newMessage = {
      id: Date.now(),
      ...message,
      created_at: new Date().toISOString()
    };
    messages.push(newMessage);
    fs.writeFileSync(dbPath, JSON.stringify(messages, null, 2));
    return newMessage;
  }
};

console.log('✅ JSON база данных готова');

module.exports = db;