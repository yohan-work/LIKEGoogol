"use client";

import { useState } from "react";
import axios from "axios";

export default function TranslateBox() {
  const [koreanText, setKoreanText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!koreanText.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/translate", { text: koreanText });
      setEnglishText(response.data.translatedText);
    } catch (err) {
      setError("번역 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error("Translation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        한국어 → 영어 번역
      </h2>

      <div className="mb-4">
        <label htmlFor="koreanText" className="block text-sm font-medium mb-2">
          한국어 입력
        </label>
        <textarea
          id="koreanText"
          value={koreanText}
          onChange={(e) => setKoreanText(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="번역할 한국어를 입력하세요..."
        />
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading || !koreanText.trim()}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {loading ? "번역 중..." : "번역하기"}
      </button>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="englishText" className="block text-sm font-medium mb-2">
          영어 결과
        </label>
        <textarea
          id="englishText"
          value={englishText}
          readOnly
          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
          placeholder="번역된 영어가 여기에 표시됩니다..."
        />
      </div>
    </div>
  );
}
