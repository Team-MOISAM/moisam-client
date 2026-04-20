import { useEventRoutes } from "@/features/mapView/hooks";
import { useRecommendedPlaces } from "@/features/place/hooks";
import {
  AddMemberBottomSheet,
  DetailKakaoMapView,
  KakaoMapView,
  MapDetailBottomSheet,
  SnapMapBottomSheet,
  TooCloseSheet,
} from "@/features/mapView/ui";
import BackButton from "@/features/mapView/ui/common/BackButton";
import { DefaultMap } from "@/features/mapView/ui/map/DefaultMap";
import { useEventStore, useUserStore } from "@/shared/stores";
import { MapHeader } from "@/widgets/headers";
import { AxiosError } from "axios";
import { setCookie } from "@/shared/utils";
import { useEffect, useState } from "react";
import { MeetPointCard, PolicyBottomSheet } from "@/shared/ui";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { gtagEvent } from "@/shared/utils";
import { LoadingModal } from "@/features/mapView/ui/map/LoadingModal";

interface MapViewLocationState {
  showMeetingPointLoadingModal?: boolean;
}

const MapViewPage = () => {
  const { data, isLoading, isError, error } = useEventRoutes();
  const setEventData = useEventStore(state => state.setEventData);
  const setMeetingPointData = useEventStore(state => state.setMeetingPointData);
  const isDetail = useEventStore(state => state.isDetail);

  const errorCode = (error as AxiosError<{ error: { code: string } }>)?.response?.data?.error?.code;
  const isInsufficientStartPoints = errorCode === "INSUFFICIENT_START_POINTS";
  const isNotFound = errorCode === "EVENT_NOT_FOUND";
  const email = useUserStore(state => state.email);
  const personalInfoAgreement = useUserStore(state => state.personalInfoAgreement);
  const setPersonalInfoAgreement = useUserStore(state => state.setPersonalInfoAgreement);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSubwayId = data?.coordinate?.subwayId ?? 0;
  const shouldFetchConfirmedPlace = Boolean(id && data?.placeName && selectedSubwayId);
  const { data: placeListData } = useRecommendedPlaces(id ?? "", selectedSubwayId);
  const confirmedPlace = shouldFetchConfirmedPlace ? placeListData?.data.confirmedPlaceResponse ?? null : null;

  const shouldTriggerMeetingPointLoadingModal = Boolean(
    (location.state as MapViewLocationState | null)?.showMeetingPointLoadingModal
  );

  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(shouldTriggerMeetingPointLoadingModal);
  const [isFindMeetingPointLoading, setIsFindMeetingPointLoading] = useState(false);
  const [isMeetingPointAnimationComplete, setIsMeetingPointAnimationComplete] = useState(false);

  useEffect(() => {
    if (!shouldTriggerMeetingPointLoadingModal) {
      return;
    }

    setIsLoadingModalOpen(true);
    setIsFindMeetingPointLoading(true);
    setIsMeetingPointAnimationComplete(false);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, navigate, shouldTriggerMeetingPointLoadingModal]);

  useEffect(() => {
    if (!isLoadingModalOpen || isLoading) {
      return;
    }

    // 최초 1인 출발지 추가 상황: 출발지 추가 로딩만 보여주고 종료
    if (isInsufficientStartPoints) {
      setIsFindMeetingPointLoading(false);
      setIsLoadingModalOpen(false);
      return;
    }

    // 출발지가 2인 이상이면 중간지점 탐색 로딩 애니메이션으로 전환
    setIsFindMeetingPointLoading(true);
  }, [isInsufficientStartPoints, isLoading, isLoadingModalOpen]);

  // TODO: 카카오톡 유입 로깅 - source 파라미터 추출 후 로깅 API 호출

  const onClose = () => {
    setIsPolicyOpen(false);
    setPersonalInfoAgreement(true);
  };

  // 장소 추천 리스트 페이지로 이동하는 핸들러
  const goToPlace = () => {
    if (data) {
      // 현재 선택된 중간지점 정보 가져오기
      const currentMeetingPoint = data.coordinate;
      const participantCount = currentMeetingPoint?.routeResponse?.length ?? 0;

      gtagEvent("click_meet_here", {
        button_status: data.placeName ? "place_selected" : "no_place_selected",
        meeting_place: data.placeName ?? "none",
        midpoint_station: currentMeetingPoint?.meetingPoint?.endStationName ?? "unknown",
        member_count: participantCount,
        meeting_name: data.eventName ?? "unknown",
        meeting_date: data.eventDate ?? "unknown",
        meeting_time: data.eventTime ?? "unknown",
      });
    }

    navigate(`/place/${id}`);
  };

  // 확정한 장소 상세페이지로 이동하는 핸들러
  const goToPlaceDetail = () => {
    if (!id || !confirmedPlace?.id) {
      return;
    }

    navigate(`/detail/${id}/${confirmedPlace.id}?subwayId=${selectedSubwayId}`);
  };

  useEffect(() => {
    if (isNotFound) {
      navigate("/notFound");
    }

    if (email && personalInfoAgreement === false) {
      setIsPolicyOpen(true);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setEventData(data);
      // 현재 사용자의 routeResponse 찾기 (첫 번째 그룹에서 찾음)
      const firstGroup = data.coordinate;
      setMeetingPointData(firstGroup);
      if (firstGroup?.routeResponse) {
        const myRoute = firstGroup.routeResponse.find(route => route.isMe);
        if (myRoute) {
          // startPointId를 쿠키에 저장
          setCookie("startPointId", myRoute.id, { path: "/", maxAge: 86400 });
        }
      }
    }
  }, [data, setEventData, setMeetingPointData]);

  const shouldShowLoadingModal =
    isLoadingModalOpen && (isLoading || (isFindMeetingPointLoading && !isMeetingPointAnimationComplete));

  return (
    <>
      <Helmet>
        <title>중간장소 | 모이삼</title>
      </Helmet>
      <div className="relative w-full h-screen overflow-hidden">
        {!isDetail && <MapHeader />}
        {shouldShowLoadingModal ? (
          <LoadingModal
            isFindMeetingPointLoading={isFindMeetingPointLoading}
            onMeetingPointAnimationComplete={() => {
              setIsMeetingPointAnimationComplete(true);
              setIsLoadingModalOpen(false);
            }}
          />
        ) : isError ? (
          <>
            {<DefaultMap />}
            {isInsufficientStartPoints ? <AddMemberBottomSheet /> : <TooCloseSheet />}
          </>
        ) : isDetail ? (
          <div className="relative">
            <BackButton />
            <DetailKakaoMapView />
            <MapDetailBottomSheet />
          </div>
        ) : (
          <div className="relative">
            <KakaoMapView gotoPlaceList={goToPlace} />
            {isPolicyOpen ? <PolicyBottomSheet onClose={onClose} /> : <SnapMapBottomSheet />}
            <div className="absolute top-3 left-5 right-5 z-[1000]">
              <MeetPointCard
                placeName={confirmedPlace?.name}
                placeImage={confirmedPlace?.image}
                onClick={confirmedPlace ? goToPlaceDetail : undefined}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MapViewPage;
