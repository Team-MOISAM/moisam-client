import { BottomSheet } from "@/shared/ui";
import { Overlay } from "@/shared/ui/BottomSheet/Overlay";
import Button from "@/shared/ui/Button";
import { useState } from "react";
import { CheckBox } from "@/features/history/ui";
import { useStoreAgreement } from "@/features/history/hooks";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { createGtagHandler } from "@/shared/utils";

interface PolicyBottomSheetProps {
  onClose: () => void;
}

export const PolicyBottomSheet = ({ onClose }: PolicyBottomSheetProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useStoreAgreement();
  const [agreements, setAgreements] = useState({
    personalInfo: false,
    marketing: false,
  });

  const handleToggle = (key: "personalInfo" | "marketing") => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAgreement = () => {
    if (agreements.personalInfo) {
      mutate(
        {
          isPersonalInfoAgreement: agreements.personalInfo,
          isMarketingAgreement: agreements.marketing,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] });

            // gtag 유틸로 전송 (기본 파라미터 자동 병합)
            const sendSignIn = createGtagHandler("sign_in", {
              prev_page_url: document.referrer || "direct",
            });
            sendSignIn();

            onClose();
          },
          onError: error => {
            console.error("약관 동의 요청 실패", error?.message);
          },
        }
      );
    } else {
      setAgreements({ personalInfo: true, marketing: true });
    }
  };

  return (
    <>
      <Overlay isBlur={false} />
      <BottomSheet minHeightPx={280} maxHeightPx={280}>
        <div className="flex flex-col gap-10 pt-8 p-5 h-full">
          <div>
            <span className="text-lg font-bold text-gray-80 mb-[2px]">잠깐만요!</span>
            <p className="text-md font-medium text-gray-40 mb-8">서비스 이용을 위해 약관에 동의해주세요</p>
            <div className="flex flex-col gap-5">
              <CheckBox
                label="이용약관 및 개인정보처리방침(필수)"
                isChecked={agreements.personalInfo}
                onToggle={() => handleToggle("personalInfo")}
                onClick={() => navigate("/policy")}
              />
              <CheckBox
                label="마케팅 수신 동의(선택)"
                isChecked={agreements.marketing}
                onToggle={() => handleToggle("marketing")}
                onClick={() => navigate("/marketing")}
              />
            </div>
          </div>
          <Button onClick={handleAgreement}>{agreements.personalInfo ? "완료" : "모두 동의하기"}</Button>
        </div>
      </BottomSheet>
    </>
  );
};
