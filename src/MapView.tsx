import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";

function ChangeMapView({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 14, { animate: true });
    }
  }, [center, map]);

  return null;
}

export default function MapView({ userLocation, hospital }: any) {

  if (!userLocation) return null;

  const userPosition: LatLngExpression = [userLocation.lat, userLocation.lon];

  const hospitalPosition: LatLngExpression | null =
    hospital ? [hospital.lat, hospital.lon] : null;

  const route: LatLngExpression[] =
    hospitalPosition ? [userPosition, hospitalPosition] : [];

  return (
    <MapContainer
      center={userPosition}
      zoom={13}
      style={{ height: "300px", width: "100%", marginTop: "10px" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {hospitalPosition && (
        <ChangeMapView center={hospitalPosition} />
      )}

      <Marker position={userPosition} />

      {hospitalPosition && <Marker position={hospitalPosition} />}

      {hospitalPosition && <Polyline positions={route} />}

    </MapContainer>
  );
}