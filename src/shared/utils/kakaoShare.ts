import { shareContentProps } from "../model";

// 카카오 SDK 초기화
if (window.Kakao) {
  const kakao = window.Kakao;
  if (!kakao.isInitialized()) {
    kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
  }
}

export const shareToKakao = ({ title, description, imageUrl, links }: shareContentProps) => {
  if (!window.Kakao || !window.Kakao.isInitialized() || !window.Kakao.Link) {
    console.error("Kakao SDK is not initialized");
    return;
  }

  try {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: {
          webUrl: links[0].url,
          mobileWebUrl: links[0].url,
        },
        imageWidth: 800,
        imageHeight: 400,
      },
      buttons: links.map(link => ({
        title: link.label,
        link: {
          webUrl: link.url,
          mobileWebUrl: link.url,
        },
      })),
    });
  } catch (error) {
    console.error("카카오 공유 실패:", error);
    alert("카카오 공유에 실패했습니다. 모바일에서 카카오톡이 설치되어 있는지 확인해주세요.");
  }
};
