import { useLogout } from "../hooks";
import LogoutIcon from "@/assets/icon/logout.svg";
import { useEventStore } from "@/shared/stores";
import { createGtagHandler } from "@/shared/utils";

export const Logout = () => {
  const { mutate } = useLogout();
  const clearEventData = useEventStore(state => state.clearEventData);
  const clearMeetingPointData = useEventStore(state => state.clearMeetingPointData);
  const clearSelectedPointType = useEventStore(state => state.clearSelectedPointType);

  const handleClick = createGtagHandler(
    "log_out",
    {
      prev_page_url: document.referrer || "direct",
    },
    () => {
      clearEventData();
      clearMeetingPointData();
      clearSelectedPointType();
      mutate();
    }
  );

  return (
    <button
      className="w-full h-[44px] flex gap-2 items-center justify-center bg-gray-5 rounded-xl"
      onClick={handleClick}>
      <img src={LogoutIcon} alt="logout" className="w-4 h-4" />
      <p className="text-md font-medium text-gray-60">로그아웃</p>
    </button>
  );
};
