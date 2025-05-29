"use client";

import { useState } from "react";
import TranslateBox from "./components/TranslateBox";
import VoiceTranslator from "./components/VoiceTranslator";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"text" | "voice">("text");

  return (
    <div className="min-h-screen p-8 pb-20 gap-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-2">
        한국어 자동 번역 서비스
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        한국어를 입력하거나 말하면 자동으로 영어로 번역됩니다.
      </p>

      <div className="w-full max-w-2xl mb-6">
        <div className="flex border-b border-gray-300 dark:border-gray-700">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "text"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("text")}
          >
            텍스트 입력 번역
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "voice"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("voice")}
          >
            음성 인식 번역
          </button>
        </div>
      </div>

      {activeTab === "text" ? <TranslateBox /> : <VoiceTranslator />}

      <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400 text-center">
        © {new Date().getFullYear()} 한국어-영어 번역 서비스. 무료 MyMemory
        API를 사용합니다.
      </footer>
    </div>
  );
}
