import React, { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(0); // Zamanı tutmak için state
  const [isRunning, setIsRunning] = useState(false); // Zamanlayıcının çalışıp çalışmadığını tutmak için state

  // isRunning state'indeki değişiklikleri izlemek için useEffect
  useEffect(() => {
    let intervalId; // Zamanlayıcının kimliğini tut

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Her 10 milisaniyede bir zamanı güncelle
      }, 10);
    }

    return () => {
      clearInterval(intervalId); // Zamanlayıcıyı temizle
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true); // Zamanlayıcıyı başlatmak için state'i güncelle
  };

  const handleStop = () => {
    setIsRunning(false); // Zamanlayıcıyı durdurmak için state'i güncelle
  };

  const handleReset = () => {
    setTime(0); // Zamanı sıfırlamak için state'i güncelle
    setIsRunning(false); // Zamanlayıcıyı durdurmak için state'i güncelle
  };

  // Zamanı formatlı bir şekilde göstermek için kullanılır
  // Parametre olarak toplam milisaniye cinsinden bir zaman değeri alır
  // Dakika:saniye:yüzde bir saniye formatında bir zaman dizesi döndürür
  // Örneğin, 123456 milisaniye, "02:03:56" şeklinde bir dizeye dönüşür
  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000); // Dakikaları hesapla
    const seconds = Math.floor((time / 100) % 60); // Saniyeleri hesapla
    const centiseconds = time % 100; // Yüzde bir saniyeleri hesapla

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {/* Zamanı ekranda göster */}
      <h1 className="text-6xl">{formatTime(time)}</h1>
      {/* Butonları gruplamak için section kullan */}
      <section className="space-x-4">
        {/* Başlat butonu */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStart}
        >
          Başlat
        </button>
        {/* Duraklat butonu */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStop}
        >
          Duraklat
        </button>
        {/* Sıfırla butonu */}
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleReset}
        >
          Sıfırla
        </button>
      </section>
    </main>
  );
}

export default App;
