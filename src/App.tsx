import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { TemperatureChart } from "./components/TemperatureChart";
import type { Reading } from "./types/Reading";
import { API_BASE_URL, SOCKET_URL } from "./config";

const socket = io(SOCKET_URL);

function App() {
  const [readings, setReadings] = useState<Reading[]>([]);

  // Загружаем историю через REST
  useEffect(() => {
    axios
      .get<Reading[]>(`${API_BASE_URL}/api/readings`)
      .then(res => setReadings(res.data))
      .catch(err => console.error("Ошибка загрузки истории:", err));
  }, []);

  // Подключаемся к Socket.IO
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Подключено к WebSocket серверу");
    });

    socket.on("history", (data: Reading[]) => {
      console.log("Получена история через WS:", data);
      setReadings(data);
    });

    socket.on("new-reading", (data: Reading) => {
      console.log("Новое значение:", data);
      setReadings(prev => [...prev, data]);
    });

    socket.on("disconnect", () => {
      console.warn("❌ Соединение потеряно");
    });

    return () => {
      socket.off("history");
      socket.off("new-reading");
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px",
        backgroundColor: "#f9fafb"
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Мониторинг температуры датчика
      </h1>

      <div
        style={{
          width: "90%",
          maxWidth: "800px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "20px"
        }}
      >
        <TemperatureChart readings={readings} />
      </div>
    </div>
  );
}

export default App;
