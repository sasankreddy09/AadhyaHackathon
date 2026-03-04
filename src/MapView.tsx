import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

export default function MapView({ userLocation, hospital }: any) {

  if (!userLocation || !hospital) return null;

  const route = [
    [userLocation.lat, userLocation.lon],
    [hospital.lat, hospital.lon]
  ];

  return (
    <MapContainer
    //@ts-ignore
      center={[userLocation.lat, userLocation.lon]}
      zoom={13}
      style={{ height: "300px", width: "100%", marginTop: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //@ts-ignore
        attribution="© OpenStreetMap contributors"
      />

      <Marker position={[userLocation.lat, userLocation.lon]} />
      <Marker position={[hospital.lat, hospital.lon]} />

      <Polyline positions={route} />
    </MapContainer>
  );
}