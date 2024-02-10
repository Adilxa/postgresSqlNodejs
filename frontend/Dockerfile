# Используйте официальный образ Node.js 18
FROM node:18

# Установите рабочую директорию
WORKDIR /usr/src/app

# Скопируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте остальные файлы приложения
COPY . .

# Соберите приложение Next.js
RUN npm run build

# Откройте порт, на котором работает приложение Next.js
EXPOSE 3000

# Запустите приложение Next.js
CMD ["npm", "start"]
