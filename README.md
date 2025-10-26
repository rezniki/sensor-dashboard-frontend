# Sensor Dashboard — Frontend

Фронтенд для отображения показаний датчиков температуры в реальном времени.  
Реализовано на **React + TypeScript + Vite + Chart.js + Socket.IO**.

---

## Коротко о проекте

- Загружает историю показаний с backend через REST (`/api/readings`).
- Подписывается на live-обновления через Socket.IO (`history`, `new-reading`).
- Отображает данные на линейном графике (Chart.js).
- Конфигурация через `.env` (Vite environment variables).
- Готов к деплою на Vercel.

---

## Требования (локально)

- Node.js >= 18
- npm
- Рабочий backend (Express + Socket.IO) доступен по URL, указанному в `.env`.

---

## Быстрый старт (локально)

1. Клонируйте репозиторий и перейдите в папку:
```bash
git clone <repo-url>
cd sensor-dashboard-frontend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл .env в корне (см. пример ниже) и укажите адрес вашего backend:
```bash
VITE_API_BASE_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
```

4. Запустите dev-сервер:
```bash
npm run dev
```

5. Откройте в браузере:
```bash
http://localhost:5173
```

---

## Файлы и структура (важные места)
```bash
src/
├─ main.tsx            # точка входа
├─ App.tsx             # главный компонент
├─ config.ts           # константы (подхватывает import.meta.env)
├─ types/Reading.ts    # TS типы
└─ components/
   └─ TemperatureChart.tsx   # компонент с Chart.js
.vitepress/ (опционально)
```

## Скриншот

![Sensor Dashboard](https://github.com/user-attachments/assets/e0a69ede-88a3-4f43-bd67-c97d54c69e40")
