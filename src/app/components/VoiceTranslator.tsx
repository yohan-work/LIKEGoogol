"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function VoiceTranslator() {
  const [isListening, setIsListening] = useState(false);
  const [koreanText, setKoreanText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [error, setError] = useState("");
  const [recognitionSupported, setRecognitionSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Web Speech API 지원 확인
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setRecognitionSupported(false);
      setError(
        "이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요."
      );
      return;
    }

    // Speech Recognition 객체 생성
    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    // 설정
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "ko-KR";

    // 이벤트 핸들러
    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("");

      setKoreanText(transcript);
      translateText(transcript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("음성 인식 오류:", event.error);
      setError(`음성 인식 오류: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        // 계속 듣기 모드면 다시 시작
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setError("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const translateText = async (text: string) => {
    if (!text.trim()) return;

    try {
      const response = await axios.post("/api/translate", { text });
      setEnglishText(response.data.translatedText);
    } catch (err) {
      console.error("Translation error:", err);
      setError("번역 중 오류가 발생했습니다.");
    }
  };

  const clearText = () => {
    setKoreanText("");
    setEnglishText("");
  };

  if (!recognitionSupported) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="text-red-500">
          {error ||
            "이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요."}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">실시간 음성 번역</h2>

      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={toggleListening}
          className={`px-6 py-3 rounded-full font-medium text-white ${
            isListening
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isListening ? "음성 인식 중지" : "음성 인식 시작"}
        </button>

        <button
          onClick={clearText}
          className="px-6 py-3 rounded-full font-medium text-white bg-gray-600 hover:bg-gray-700"
        >
          초기화
        </button>
      </div>

      {isListening && (
        <div className="flex justify-center items-center mb-4">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></span>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></span>
          </div>
          <span className="ml-2 text-red-500">음성 인식 중...</span>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">인식된 한국어</label>
        <div className="w-full min-h-20 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
          {koreanText || "마이크에 말해주세요..."}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">영어 번역 결과</label>
        <div className="w-full min-h-20 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
          {englishText || "번역 결과가 여기에 표시됩니다..."}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        * 주의: Web Speech API는 Chrome 브라우저에서 가장 잘 작동합니다.
      </div>
    </div>
  );
}
