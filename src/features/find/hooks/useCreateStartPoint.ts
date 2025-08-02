import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addMember, createEvent } from "../service";
import { FormattedData, CreateEventData } from "../model";
import { getCookie, setCookie } from "@/shared/utils";

export const useCreateStartPoint = (eventIdParam: string | null) => {
  const navigate = useNavigate();
  const eventIdExists = !!eventIdParam;

  const { mutate: createEventMutate } = useMutation({
    mutationFn: createEvent,
    onSuccess: response => {
      const { eventId, guestId } = response.data;

      if (!getCookie("guestId")) {
        setCookie("guestId", guestId, { path: "/", maxAge: 86400 });
      }

      // 페이지 이동
      navigate(`/mapview/${eventId}`);
    },
    onError: error => {
      console.error("모임 생성 실패", error);
    },
  });

  const { mutate: addMemberMutate } = useMutation({
    mutationFn: ({ payload, eventId }: { payload: FormattedData; eventId: string }) => addMember(payload, eventId),
    onSuccess: response => {
      // 쿠키가 없을 때만 저장
      if (!getCookie("guestId")) {
        setCookie("guestId", response.data.guestId, { path: "/", maxAge: 86400 });
      }
      navigate(`/mapview/${eventIdParam}`);
    },
    onError: error => {
      console.error("멤버 추가 실패", error);
    },
  });

  const handleSubmit = (data: FormattedData | CreateEventData) => {
    if (eventIdExists && eventIdParam) {
      addMemberMutate({ payload: data as FormattedData, eventId: eventIdParam });
    } else {
      createEventMutate(data as CreateEventData);
    }
  };

  return {
    handleSubmit,
  };
};
