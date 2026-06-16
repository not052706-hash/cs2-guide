FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY backend/package*.json /app/backend/

# Устанавливаем зависимости
RUN cd /app/backend && npm install

# Копируем ВСЕ файлы проекта
COPY . /app/

# Открываем порт
EXPOSE 3000

# Запускаем сервер
CMD ["node", "/app/backend/server.js"]