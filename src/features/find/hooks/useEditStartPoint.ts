import { useMutation } from "@tanstack/react-query";
import { editStartPoint } from "../service";
import { FormattedData } from "../model";
import { useNavigate } from "react-router-dom";
import { useEventStore } from "@/shared/stores";
import { getEventInfo } from "@/features/mapView/service";

export const useEditStartPoint = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      eventId,
      startPointId,
      payload,
    }: {
      eventId: string;
      startPointId: string;
      payload: FormattedData;
    }) => editStartPoint(eventId, startPointId, payload),

    onSuccess: async data => {
      const eventId = data.data.eventId;

      const eventData = await getEventInfo(eventId);
      useEventStore.getState().setEventData(eventData);

      if (useEventStore.getState().isDetail) {
        useEventStore.getState().toggleDetail();
      }

      navigate(`/mapView/${eventId}`, { replace: true });
    },

    onError: error => {
      console.error("출발지 수정 실패: ", error);
    },
  });
};
