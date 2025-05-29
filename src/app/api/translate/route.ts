import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "텍스트가 필요합니다." },
        { status: 400 }
      );
    }

    try {
      // MyMemory API 사용 (무료 번역 API, 일일 요청 제한이 있지만 데모용으로 충분)
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=ko|en`
      );

      if (
        response.data &&
        response.data.responseData &&
        response.data.responseData.translatedText
      ) {
        return NextResponse.json({
          translatedText: response.data.responseData.translatedText,
        });
      } else {
        throw new Error("번역 결과가 없습니다.");
      }
    } catch (apiError) {
      console.error("API 번역 오류:", apiError);

      // 백업 방법: 확장된 번역 딕셔너리
      const koreanToEnglish = {
        안녕: "Hello",
        안녕하세요: "Hello",
        감사합니다: "Thank you",
        고맙습니다: "Thank you",
        반갑습니다: "Nice to meet you",
        한국어: "Korean language",
        영어: "English",
        번역: "Translation",
        자동: "Automatic",
        서비스: "Service",
        웹사이트: "Website",
        만들다: "Create",
        만들기: "Creation",
        프로그램: "Program",
        컴퓨터: "Computer",
        인터넷: "Internet",
        무료: "Free",
        유료: "Paid",
        사용자: "User",
        개발자: "Developer",
        오류: "Error",
        문제: "Problem",
        해결: "Solution",
        테스트: "Test",
        안내: "Guide",
        도움말: "Help",
        정보: "Information",
      };

      let translatedText = text;

      // 딕셔너리의 단어들로 간단한 번역 수행
      Object.keys(koreanToEnglish).forEach((korWord) => {
        const pattern = new RegExp(`\\b${korWord}\\b`, "g");
        translatedText = translatedText.replace(
          pattern,
          koreanToEnglish[korWord as keyof typeof koreanToEnglish]
        );
      });

      // 번역된 내용이 변경되지 않았다면 메시지 추가
      if (translatedText === text) {
        return NextResponse.json({
          translatedText: text + " (Sorry, couldn't translate this text)",
        });
      }

      return NextResponse.json({ translatedText });
    }
  } catch (error) {
    console.error("번역 오류:", error);
    return NextResponse.json(
      { error: "번역 서비스를 사용할 수 없습니다." },
      { status: 500 }
    );
  }
}
