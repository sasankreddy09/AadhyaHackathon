export async function fetchHospitals(lat: number, lon: number) {

  const query = `
  [out:json][timeout:25];
  (
    node["amenity"="hospital"](around:20000,${lat},${lon});
    way["amenity"="hospital"](around:20000,${lat},${lon});
    relation["amenity"="hospital"](around:20000,${lat},${lon});
  );
  out center;
  `;

  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://lz4.overpass-api.de/api/interpreter"
  ];

  for (const url of endpoints) {

    try {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: query
      });

      if (!response.ok) continue;

      const text = await response.text();

      if (text.startsWith("<")) continue;

      const data = JSON.parse(text);

      return data.elements.map((h: any) => ({
        name: h.tags?.name || "Unnamed Hospital",
        lat: h.lat || h.center?.lat,
        lon: h.lon || h.center?.lon
      }));

    } catch (error) {

      console.log(`Server failed: ${url}`);

    }

  }

  console.error("All Overpass servers failed");

  return [];
}