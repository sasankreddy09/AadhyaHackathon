export async function fetchHospitals(lat: number, lon: number) {

  const query = `
  [out:json];
  (
    node["amenity"="hospital"](around:20000,${lat},${lon});
    way["amenity"="hospital"](around:20000,${lat},${lon});
    relation["amenity"="hospital"](around:20000,${lat},${lon});
  );
  out center;
  `;

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query
    }
  );

  const data = await response.json();

  return data.elements.map((h: any) => ({
    name: h.tags?.name || "Unnamed Hospital",
    lat: h.lat || h.center?.lat,
    lon: h.lon || h.center?.lon
  }));
}