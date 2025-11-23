"use client";

import { useEffect, useRef, useCallback } from "react";
import Script from "next/script";

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (element: HTMLElement, options: NaverMapOptions) => NaverMap;
        LatLng: new (lat: number, lng: number) => NaverLatLng;
        Marker: new (options: NaverMarkerOptions) => NaverMarker;
      };
    };
  }
}

interface NaverMapOptions {
  center: NaverLatLng;
  zoom: number;
}

interface NaverLatLng {
  lat: number;
  lng: number;
}

interface NaverMarkerOptions {
  position: NaverLatLng;
  map: NaverMap;
}

type NaverMap = object;
type NaverMarker = object;

interface MapPageProps {
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

export const MapPage = ({
  width = "100%",
  height = "100%",
  lat = 37.5665, // 기본: 서울 시청 근처
  lng = 126.978,
  zoom = 14,
}: MapPageProps) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);

  // 스크립트 로드 후 실행할 함수
  const handleLoadMap = useCallback(() => {
    if (!window.naver || !mapElementRef.current) return;

    const map = new window.naver.maps.Map(mapElementRef.current, {
      center: new window.naver.maps.LatLng(lat, lng),
      zoom,
    });

    // 마커 하나 찍어보기
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map,
    });
  }, [lat, lng, zoom]);

  useEffect(() => {
    handleLoadMap();
  }, [handleLoadMap]);

  return (
    <div className="w-full h-[100vh]">
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={handleLoadMap}
      />
      <div
        ref={mapElementRef}
        style={{
          width,
          height,
        }}
      />
    </div>
  );
};

export default MapPage;
