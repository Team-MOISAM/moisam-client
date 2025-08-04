import { CloseHeader } from "@/widgets/headers";
import { useNavigate } from "react-router-dom";

const marketingContents = [
  {
    title: "1. 수신 항목 및 목적",
    contents: [
      "모이삼에서 제공하는 이벤트, 프로모션, 할인정보 등 마케팅 및 광고성 정보 제공",
      "새로운 서비스 및 기능 업데이트 안내",
      "이용자 맞춤형 광고 및 혜택 제공",
    ],
  },
  {
    title: "2. 전송 수단",
    contents: ["서비스 내 알림(Push), SMS(문자메시지), 이메일, 전화 등"],
  },
  {
    title: "3. 수신 동의 철회 방법",
    contents: [
      "사용자는 언제든지 별도 문의를 통해 마케팅 정보 수신 동의를 철회할 수 있습니다.",
      "철회 시, 이후 해당 정보를 수신하지 않게 됩니다.",
    ],
  },
  {
    title: "4. 보유 및 이용 기간",
    contents: ["동의일로부터 수신 철회 또는 회원 탈퇴 시까지"],
  },
  {
    title: "5. 기타 안내",
    contents: [
      "본 동의는 마케팅 정보 수신을 위한 것으로, 서비스 이용을 위한 필수 동의사항이 아닙니다.",
      "동의하지 않더라도 모이삼 기본 서비스 이용에 제한은 없습니다.",
      "※ 관련 법령: 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제50조, 제66조 등",
    ],
  },
];

const MarketingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen-dvh">
      <CloseHeader title="마케팅 수신 동의" onClick={handleClick} />
      <div className="flex-1 p-5 text-md text-gray-60 overflow-y-scroll scrollbar-hidden min-h-0">
        <h2 className="text-gray-80 font-semibold">마케팅 정보 수신에 대한 동의 안내</h2>
        <p>
          모이삼은 사용자의 편의를 위해 다양한 혜택, 이벤트, 신제품 출시 및 맞춤형 서비스 안내 등 마케팅 정보를 아래와
          같은 방법으로 전달할 수 있습니다.
        </p>
        <hr className="my-3" />

        {marketingContents.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-gray-80 font-semibold">{section.title}</h3>
            <>
              {section.contents.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </>
            <hr className="my-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingPage;
