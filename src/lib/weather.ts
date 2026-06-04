// Live weather lookup via Open-Meteo (free, no API key). Runs client-side in the
// browser. Returns null on any failure so callers can fall back to mock data —
// the demo must never surface an error if the network is unavailable.

export interface LiveWeather {
  tempC: number;
  precip: number; // mm
  wind: number;   // km/h
}

export async function fetchRegionWeather(lat: number, lon: number): Promise<LiveWeather | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,precipitation,wind_speed_10m`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    const c = json?.current;
    if (!c) return null;
    return {
      tempC: Math.round(c.temperature_2m),
      precip: typeof c.precipitation === 'number' ? c.precipitation : 0,
      wind: Math.round(c.wind_speed_10m),
    };
  } catch {
    return null;
  }
}

export type WeatherRiskLevel = 'low' | 'medium' | 'high';

// Derive a delivery-risk level from conditions. Extreme heat strains refrigeration
// plant during commissioning; cold/wet/windy hurt groundworks and lifts.
export function deriveWeatherRisk(tempC: number, precip: number, wind: number): WeatherRiskLevel {
  if (tempC >= 32 || tempC <= 3 || wind >= 35 || precip >= 4) return 'high';
  if (tempC >= 27 || tempC <= 7 || wind >= 22 || precip >= 2) return 'medium';
  return 'low';
}
