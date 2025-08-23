import { CloseHeader } from "@/widgets/headers";
import { useNavigate } from "react-router-dom";

const policySections = [
  {
    title: "1. 서비스 이용 시 유의사항",
    contents: [
      {
        type: "p",
        text: "사용자는 다음 각 호에 해당하는 행위를 해서는 안 되며, 위반 시 회사는 서비스 이용 제한, 강제탈퇴 등 필요한 조치를 취할 수 있습니다.",
      },
      { type: "li", text: "1. 회사가 명시하지 않은 방식으로 서비스에 접근하거나 방해하는 행위" },
      { type: "li", text: "2. 타인의 개인정보를 무단 수집, 이용하거나 제3자에게 제공하는 행위" },
      { type: "li", text: "3. 모이삼 서비스를 영리, 홍보 등 부정한 목적에 사용하는 행위" },
      { type: "li", text: "4. 법령이나 공공질서에 위배되는 정보를 게시 또는 전송하는 행위" },
      { type: "li", text: "5. 서비스 또는 소프트웨어의 무단 복제, 수정, 배포, 판매, 대여, 역설계 등의 행위" },
      { type: "li", text: "6. 관련 법령 및 본 약관 또는 운영정책을 위반하는 행위" },
    ],
  },
  {
    title: "2. 개인정보 보호",
    contents: [
      {
        type: "p",
        text: `회사는 서비스 제공을 위한 최소한의 개인정보만 수집하며, 사용자의 동의 범위 내에서만 이용합니다. 보다 자세한
          내용은 [모이삼 개인정보처리방침]을 확인해 주세요.`,
      },
    ],
  },
  {
    title: "3. 공지 및 알림",
    contents: [
      {
        type: "p",
        text: `회사는 서비스 운영과 관련된 중요사항 또는 마케팅 정보를 앱 내 알림, 문자메시지, 이메일 등으로 안내할 수 있습니다. 사용자는 언제든지 수신을 거부할 수 있으며, 수신 거부 시 회사는 해당 정보를 더 이상 발송하지 않습니다. 다만, 법령상 의무 고지는 수신 거부 대상에서 제외됩니다.`,
      },
    ],
  },
  {
    title: "4. 위치기반서비스 관련 안내",
    contents: [
      {
        type: "p",
        text: "모이삼은 현재 위치를 기반으로 중간 지점을 탐색하여 추천하는 서비스를 제공합니다. 본 서비스는 단말기의 위치정보를 수집하는 위치정보사업자를 통해 정보를 전달받으며, 사용자 동의 하에 무료로 제공됩니다.",
      },
      {
        type: "li",
        text: "14세 미만 사용자는 법정대리인의 동의가 반드시 필요하며, 미동의 시 위치기반서비스 제공이 제한됩니다.",
      },
      {
        type: "li",
        text: "사용자는 위치정보의 이용 및 제공에 대해 전부 또는 일부 철회할 수 있으며, 철회 시 관련 정보는 즉시 파기됩니다.",
      },
      {
        type: "li",
        text: "8세 이하 아동, 금치산자, 중증 정신장애인의 경우 보호의무자의 서면 동의가 있으면 본인의 동의가 있는 것으로 간주합니다.",
      },
      { type: "li", text: "위치정보 분쟁 발생 시, 개인정보분쟁조정위원회에 조정을 신청할 수 있습니다." },
    ],
  },
  {
    title: "5. 유료서비스 안내",
    contents: [
      {
        type: "p",
        text: `추후 모이삼은 사용자의 편의를 위한 일부 기능을 유료로 제공할 수 있으며, 세부 조건은 별도의 [유료서비스 이용약관]에 따릅니다.`,
      },
    ],
  },
  {
    title: "6. 서비스의 중단",
    contents: [
      {
        type: "p",
        text: `정기 또는 임시 점검, 기술적 사유 등으로 인해 서비스 제공이 일시 중단될 수 있습니다. 이 경우 회사는 서비스 화면 또는 별도 통지 수단을 통해 안내합니다.`,
      },
    ],
  },
  {
    title: "6. 서비스의 중단",
    contents: [
      {
        type: "p",
        text: `정기 또는 임시 점검, 기술적 사유 등으로 인해 서비스 제공이 일시 중단될 수 있습니다. 이 경우 회사는 서비스 화면 또는 별도 통지 수단을 통해 안내합니다.`,
      },
    ],
  },
  {
    title: "7. 이용계약 해지",
    contents: [
      {
        type: "p",
        text: `사용자는 언제든지 서비스 내 설정 메뉴를 통해 탈퇴할 수 있으며, 회사는 법령에 따라 즉시 처리합니다. 단, 거래가 진행 중이거나 분쟁이 있는 경우 탈퇴가 일시 제한될 수 있으며, 이용자가 작성한 게시물은 삭제되지 않을 수 있습니다.`,
      },
    ],
  },
  {
    title: "8. 약관의 변경",
    contents: [
      {
        type: "p",
        text: `회사는 법률 개정 또는 서비스 변경 사항을 반영하여 본 약관을 수정할 수 있으며, 변경 내용은 서비스 화면에 사전 공지됩니다.`,
      },
      {
        type: "li",
        text: `통상 변경: 게시 후 7일 경과 시 효력 발생`,
      },
      {
        type: "li",
        text: `사용자 불리 변경: 게시 후 30일 경과 시 효력 발생`,
      },
      {
        type: "p",
        text: `변경된 약관에 동의하지 않을 경우, 사용자는 서비스 이용을 중단할 수 있으며, 계속 사용할 경우 동의한 것으로 간주됩니다.`,
      },
    ],
  },
  {
    title: "9. 사용자 의견",
    contents: [
      {
        type: "p",
        text: `사용자는 언제든지 서비스 내 문의하기 기능 등을 통해 의견을 제출할 수 있으며, 회사는 이를 적극 반영하기 위해 노력합니다.`,
      },
    ],
  },
  {
    title: "10. 기타 사항",
    contents: [
      {
        type: "p",
        text: `본 약관은 대한민국 법률을 따릅니다.`,
      },
      {
        type: "p",
        text: `일부 조항이 무효가 되더라도 다른 조항의 효력에는 영향을 미치지 않습니다.`,
      },
    ],
  },
];

const PolicyPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen-dvh">
      <CloseHeader title="이용약관 및 개인정보처리방침" onClick={handleClick} />
      <div className="flex-1 p-5 text-md text-gray-60 overflow-y-scroll scrollbar-hidden min-h-0">
        <h2 className="text-gray-80 font-semibold">모이삼(MOISAM) 서비스 이용약관</h2>
        <p>
          감사합니다. 본 약관은 모임의 중간장소를 편리하게 찾아주는 위치기반 서비스인 "모이삼"(이하 "회사")의 이용과
          관련된 사용자 권리, 의무 및 책임사항을 규정합니다.
        </p>
        <hr className="my-3" />

        {policySections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-gray-80 font-semibold">{section.title}</h3>

            {/* 순서 유지한 채 p/li 모두 map으로 순회 */}
            <ul className="list-disc pl-5 space-y-1">
              {section.contents.map((c, i) =>
                c.type === "li" ? (
                  <li key={i}>{c.text}</li>
                ) : (
                  <li key={i} className="list-none">
                    <p>{c.text}</p>
                  </li>
                )
              )}
            </ul>

            <hr className="my-3" />
          </div>
        ))}

        <li>공고일자: 2025년 8월 2일</li>
        <li>시행일자: 2025년 8월 2일</li>
      </div>
    </div>
  );
};

export default PolicyPage;
