import { useEffect, useRef, useState } from "react";
import { useEventStore } from "@/shared/stores";
import { MeetingMarker } from "./MeetingMarker";
import { MapMarker } from "./MapMarker";
import { ParkingMarker } from "./ParkingMarker";
import { TransferType } from "../../model";

interface PathPoint {
  latitude: number;
  longitude: number;
}

interface DetailKakaoMapViewProps {
  type: TransferType;
}

export const DetailKakaoMapView = ({ type }: DetailKakaoMapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const eventData = useEventStore(state => state.eventData);
  const detailEventData = useEventStore(state => state.detailEventData);

  if (!eventData || !detailEventData) {
    return <div>Loading...</div>;
  }

  const pathPoints: PathPoint[] = [];

  // 출발지점 추가
  pathPoints.push({
    latitude: detailEventData.startLatitude,
    longitude: detailEventData.startLongitude,
  });

  if (type === "subway") {
    // transitRoute 순회하며 경유지 추가
    detailEventData.transitRoute?.forEach(route => {
      if (route.passStopList?.stations) {
        route.passStopList.stations.forEach(station => {
          pathPoints.push({
            latitude: parseFloat(station.y),
            longitude: parseFloat(station.x),
          });
        });
      }
    });
  } else {
    // drivingRoute 순회하며 경유지 추가
    detailEventData.drivingRoute?.forEach(route => {
      if (route.coordinates) {
        route.coordinates.forEach(station => {
          pathPoints.push({
            latitude: parseFloat(station.y),
            longitude: parseFloat(station.x),
          });
        });
      }
    });
  }

  // 마지막 중간지점 마커 추가
  const firstGroup = eventData.meetingPointRouteGroups?.[0];
  if (firstGroup?.meetingPoint) {
    pathPoints.push({
      latitude: firstGroup.meetingPoint.endLatitude,
      longitude: firstGroup.meetingPoint.endLongitude,
    });
  }

  useEffect(() => {
    const initializeMap = () => {
      if (!window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(() => {
        if (!mapRef.current || pathPoints.length === 0) return;

        const center = pathPoints[Math.floor(pathPoints.length / 2)];
        const centerLatLng = new kakao.maps.LatLng(center.latitude, center.longitude);

        const kakaoMap = new kakao.maps.Map(mapRef.current, {
          center: centerLatLng,
          level: 5,
        });

        setMap(kakaoMap);

        const linePath = pathPoints.map(p => new kakao.maps.LatLng(p.latitude, p.longitude));

        const bounds = new kakao.maps.LatLngBounds();
        linePath.forEach(latlng => bounds.extend(latlng));
        kakaoMap.setBounds(bounds);

        // 경로 선 그리기 - 두 겹
        // 1. 흰색 테두리용 선 (먼저 그림)
        new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 8, // 더 두껍게
          strokeColor: "#FFFFFF", // 테두리 색상
          strokeOpacity: 1,
          strokeStyle: "solid",
          map: kakaoMap,
        });

        // 2. 실제 경로 선 (위에 겹쳐 그림)
        new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 4,
          strokeColor: "#007AFF", // 실제 색상
          strokeOpacity: 0.9,
          strokeStyle: "solid",
          map: kakaoMap,
        });
      });
    };

    if (document.getElementById("kakao-map-script")) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
      }&autoload=false`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }
  }, [type, eventData, detailEventData]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "calc(100vh - 20vh)",
      }}>
      {map && (
        <>
          {/* 중간지점 마커 */}
          {firstGroup?.meetingPoint && (
            <MeetingMarker
              map={map}
              position={{
                lat: firstGroup.meetingPoint.endLatitude,
                lng: firstGroup.meetingPoint.endLongitude,
              }}
              title={firstGroup.meetingPoint.endStationName}
            />
          )}
          {/* 사용자 마커 */}
          <MapMarker
            key={detailEventData.id}
            map={map}
            position={{ lat: detailEventData.startLatitude, lng: detailEventData.startLongitude }}
            profileImg={detailEventData.profileImage}
            name={detailEventData.nickname}
          />
          {type === "car" && firstGroup?.parkingLot && (
            <ParkingMarker
              map={map}
              position={{ lat: firstGroup.parkingLot.latitude, lng: firstGroup.parkingLot.longitude }}
            />
          )}
        </>
      )}
    </div>
  );
};
