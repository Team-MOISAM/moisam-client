import { useEffect } from "react";
import Polygon from "@/assets/icon/polygon.svg";
import MeetingSpot from "@/assets/icon/meeting-spot.svg";

interface MeetingMarkerProps {
  map: kakao.maps.Map;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  onClick: () => void;
}

export function MeetingMarker({ map, position, title, onClick }: MeetingMarkerProps) {
  useEffect(() => {
    if (!map) return;

    const wrapper = document.createElement("div");
    wrapper.addEventListener("click", onClick);
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "0";

    // 이름 레이블
    const label = document.createElement("div");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "4px";
    label.style.backgroundColor = "#007AFF";
    label.style.color = "white";
    label.style.padding = "6px 8px";
    label.style.borderRadius = "6px";
    label.style.fontSize = "16px";
    label.style.fontWeight = "600";
    label.style.lineHeight = "150%";
    label.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    label.style.whiteSpace = "nowrap";

    const labelText = document.createElement("span");
    labelText.textContent = title;
    label.appendChild(labelText);

    const chevronIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    chevronIcon.setAttribute("width", "12");
    chevronIcon.setAttribute("height", "12");
    chevronIcon.setAttribute("viewBox", "0 0 12 12");
    chevronIcon.setAttribute("fill", "none");

    const chevronPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    chevronPath.setAttribute("d", "M4.5 2.5L8 6l-3.5 3.5");
    chevronPath.setAttribute("stroke", "white");
    chevronPath.setAttribute("stroke-width", "1.5");
    chevronPath.setAttribute("stroke-linecap", "round");
    chevronPath.setAttribute("stroke-linejoin", "round");

    chevronIcon.appendChild(chevronPath);
    label.appendChild(chevronIcon);
    wrapper.appendChild(label);

    // 폴리곤 이미지 (말풍선 뾰족한 부분)
    const polygon = document.createElement("img");
    polygon.src = Polygon;
    polygon.style.width = "12px";
    polygon.style.height = "6px";
    polygon.style.marginTop = "0px";
    wrapper.appendChild(polygon);

    // 마커 이미지 컨테이너
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = "26px";
    container.style.height = "29px";
    container.style.marginTop = "4px"; // 폴리곤과의 간격

    // 마커 이미지
    const markerImg = document.createElement("img");
    markerImg.src = MeetingSpot;
    markerImg.style.width = "100%";
    markerImg.style.height = "100%";
    container.appendChild(markerImg);
    wrapper.appendChild(container);

    const overlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(position.lat, position.lng),
      content: wrapper,
      yAnchor: 1.0,
      zIndex: 2,
    });

    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, position, title, onClick]);

  return null;
}
