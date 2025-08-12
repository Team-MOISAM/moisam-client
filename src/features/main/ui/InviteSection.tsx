import { Title } from "./Title";
import InviteImg from "@/assets/image/invite.webp";
import { InviteBubble } from "./InviteBubble";

export const InviteSection = () => {
  return (
    <section className="flex flex-col py-12 items-center gap-12 bg-[linear-gradient(180deg,#FFF_0%,#E5F2FF_100%)] w-full">
      <div className="flex flex-col items-center gap-2">
        <Title>약속을 더 쉽게 만들어보세요</Title>
        <p className="text-md font-medium text-gray-40">카카오톡으로 쉽게 모임을 공유해 보세요!</p>
      </div>
      <div className="flex flex-col px-2 min-w-[350px] w-[calc(100%-60px)]">
        <img src={InviteImg} alt="InviteImg" className="w-[220px] h-[200px] self-end" />
        <InviteBubble text="링크에서 출발지 추가해줘!" isBlue={true} className="mt-5" />
        <InviteBubble text="출발지 입력했어 😆" className="mt-8" />
        <InviteBubble text="🙌🏻 와 정말 편하다 ~" className="mt-4" />
      </div>
    </section>
  );
};
