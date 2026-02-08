import api from "./api";

export type InflowType = "KAKAO";

interface LogInflowRequest {
  inflowType: InflowType;
  eventId: string;
}

export const logInflow = async ({ inflowType, eventId }: LogInflowRequest) => {
  try {
    const response = await api.post("/logs/inflow", {
      inflowType,
      eventId,
    });

    if (response.data.result === "SUCCESS") {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to log inflow:", error);
    return false;
  }
};
