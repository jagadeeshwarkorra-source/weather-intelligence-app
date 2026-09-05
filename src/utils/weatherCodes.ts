import { WeatherConditionInfo } from '../types';

export const WMO_WEATHER_MAP: Record<number, WeatherConditionInfo> = {
  0: {
    code: 0,
    label: 'Clear Sky',
    description: 'Cloudless and bright skies',
    iconName: 'Sun',
    category: 'clear',
    gradient: 'from-amber-500/20 via-orange-500/10 to-sky-500/10',
    badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
  },
  1: {
    code: 1,
    label: 'Mainly Clear',
    description: 'Mostly sunny with scattered faint clouds',
    iconName: 'SunMedium',
    category: 'clear',
    gradient: 'from-amber-400/20 via-sky-500/10 to-blue-500/10',
    badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
  },
  2: {
    code: 2,
    label: 'Partly Cloudy',
    description: 'Sun alternating with cloud patches',
    iconName: 'CloudSun',
    category: 'cloudy',
    gradient: 'from-sky-500/20 via-slate-500/10 to-indigo-500/10',
    badgeColor: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  },
  3: {
    code: 3,
    label: 'Overcast',
    description: 'Thick continuous cloud cover',
    iconName: 'Cloud',
    category: 'cloudy',
    gradient: 'from-slate-600/30 via-slate-700/20 to-zinc-800/20',
    badgeColor: 'text-slate-300 border-slate-500/30 bg-slate-500/10',
  },
  45: {
    code: 45,
    label: 'Foggy',
    description: 'Reduced visibility due to dense ground fog',
    iconName: 'CloudFog',
    category: 'fog',
    gradient: 'from-zinc-500/20 via-slate-600/20 to-neutral-800/20',
    badgeColor: 'text-zinc-300 border-zinc-500/30 bg-zinc-500/10',
  },
  48: {
    code: 48,
    label: 'Depositing Rime Fog',
    description: 'Freezing fog forming frost crystals',
    iconName: 'CloudFog',
    category: 'fog',
    gradient: 'from-teal-500/20 via-slate-600/20 to-cyan-900/20',
    badgeColor: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  },
  51: {
    code: 51,
    label: 'Light Drizzle',
    description: 'Fine mist and intermittent droplets',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    gradient: 'from-blue-500/20 via-cyan-600/10 to-slate-800/20',
    badgeColor: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
  },
  53: {
    code: 53,
    label: 'Moderate Drizzle',
    description: 'Steady fine mist with damp conditions',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    gradient: 'from-blue-500/25 via-cyan-700/15 to-slate-800/20',
    badgeColor: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
  },
  55: {
    code: 55,
    label: 'Dense Drizzle',
    description: 'Heavy damp mist reducing visibility',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    gradient: 'from-blue-600/25 via-indigo-700/15 to-slate-800/20',
    badgeColor: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
  },
  56: {
    code: 56,
    label: 'Light Freezing Drizzle',
    description: 'Chilled mist freezing upon contact',
    iconName: 'CloudSnow',
    category: 'drizzle',
    gradient: 'from-cyan-400/25 via-blue-600/20 to-slate-900/30',
    badgeColor: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  },
  57: {
    code: 57,
    label: 'Dense Freezing Drizzle',
    description: 'Heavy freezing drizzle causing icy surfaces',
    iconName: 'CloudSnow',
    category: 'drizzle',
    gradient: 'from-cyan-500/30 via-indigo-600/25 to-slate-900/30',
    badgeColor: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  },
  61: {
    code: 61,
    label: 'Slight Rain',
    description: 'Gentle raindrops with occasional breaks',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-blue-500/25 via-sky-600/15 to-slate-800/30',
    badgeColor: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  },
  63: {
    code: 63,
    label: 'Moderate Rain',
    description: 'Steady, persistent rainfall',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-blue-600/30 via-indigo-700/20 to-slate-900/40',
    badgeColor: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
  },
  65: {
    code: 65,
    label: 'Heavy Rain',
    description: 'Intense precipitation and standing water',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-blue-700/35 via-indigo-900/30 to-slate-950/50',
    badgeColor: 'text-blue-400 border-blue-500/40 bg-blue-500/20',
  },
  66: {
    code: 66,
    label: 'Light Freezing Rain',
    description: 'Raindrops freezing into clear ice coating',
    iconName: 'CloudSnow',
    category: 'rain',
    gradient: 'from-cyan-500/30 via-blue-700/25 to-slate-900/40',
    badgeColor: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  },
  67: {
    code: 67,
    label: 'Heavy Freezing Rain',
    description: 'Severe freezing rain, hazardous glaze ice',
    iconName: 'CloudSnow',
    category: 'rain',
    gradient: 'from-cyan-600/35 via-blue-800/30 to-slate-950/50',
    badgeColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/20',
  },
  71: {
    code: 71,
    label: 'Slight Snow',
    description: 'Scattered light snowflakes falling gently',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-indigo-400/25 via-blue-500/15 to-slate-800/30',
    badgeColor: 'text-indigo-200 border-indigo-400/30 bg-indigo-400/10',
  },
  73: {
    code: 73,
    label: 'Moderate Snow',
    description: 'Steady snowfall building snow pack',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-indigo-400/30 via-sky-500/20 to-slate-900/40',
    badgeColor: 'text-indigo-200 border-indigo-400/30 bg-indigo-400/10',
  },
  75: {
    code: 75,
    label: 'Heavy Snow',
    description: 'Blinding heavy snowfall with rapid accumulation',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-indigo-500/35 via-slate-600/30 to-zinc-950/50',
    badgeColor: 'text-indigo-300 border-indigo-400/40 bg-indigo-400/20',
  },
  77: {
    code: 77,
    label: 'Snow Grains',
    description: 'Tiny opaque ice grains bouncing on impact',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-sky-400/25 via-slate-700/20 to-slate-900/40',
    badgeColor: 'text-sky-200 border-sky-400/30 bg-sky-400/10',
  },
  80: {
    code: 80,
    label: 'Light Showers',
    description: 'Brief passing rainfall showers',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-sky-500/25 via-blue-600/15 to-slate-900/30',
    badgeColor: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  },
  81: {
    code: 81,
    label: 'Moderate Showers',
    description: 'Sudden moderate rain bursts',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-blue-600/30 via-indigo-700/20 to-slate-900/40',
    badgeColor: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
  },
  82: {
    code: 82,
    label: 'Violent Showers',
    description: 'Torrential downpours with gusty winds',
    iconName: 'CloudRain',
    category: 'rain',
    gradient: 'from-blue-700/35 via-violet-900/30 to-slate-950/60',
    badgeColor: 'text-blue-400 border-blue-500/40 bg-blue-500/20',
  },
  85: {
    code: 85,
    label: 'Slight Snow Showers',
    description: 'Intermittent flurries and brief snow bursts',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-indigo-400/25 via-sky-600/15 to-slate-900/30',
    badgeColor: 'text-indigo-200 border-indigo-400/30 bg-indigo-400/10',
  },
  86: {
    code: 86,
    label: 'Heavy Snow Showers',
    description: 'Squall conditions with dense blowing snow',
    iconName: 'Snowflake',
    category: 'snow',
    gradient: 'from-indigo-500/35 via-purple-900/30 to-slate-950/50',
    badgeColor: 'text-indigo-300 border-indigo-400/40 bg-indigo-400/20',
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    description: 'Lightning activity with sudden thunder claps',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    gradient: 'from-amber-500/30 via-purple-700/25 to-slate-950/60',
    badgeColor: 'text-amber-300 border-amber-500/40 bg-amber-500/15',
  },
  96: {
    code: 96,
    label: 'Thunderstorm with Slight Hail',
    description: 'Thunderstorm accompanied by small ice hail',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    gradient: 'from-violet-600/35 via-blue-900/30 to-slate-950/60',
    badgeColor: 'text-violet-300 border-violet-500/40 bg-violet-500/20',
  },
  99: {
    code: 99,
    label: 'Severe Thunderstorm & Hail',
    description: 'Intense storm with destructive hail stones',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    gradient: 'from-purple-700/40 via-red-900/30 to-slate-950/70',
    badgeColor: 'text-rose-300 border-rose-500/40 bg-rose-500/20',
  },
};

export function getWeatherCondition(code: number): WeatherConditionInfo {
  if (WMO_WEATHER_MAP[code]) {
    return WMO_WEATHER_MAP[code];
  }
  // Fallback if unexpected code
  if (code >= 1 && code <= 3) {
    return WMO_WEATHER_MAP[2];
  }
  if (code >= 51 && code <= 67) {
    return WMO_WEATHER_MAP[61];
  }
  if (code >= 71 && code <= 86) {
    return WMO_WEATHER_MAP[71];
  }
  if (code >= 95) {
    return WMO_WEATHER_MAP[95];
  }
  return {
    code,
    label: 'Variable Clouds',
    description: 'Partially cloudy weather pattern',
    iconName: 'Cloud',
    category: 'cloudy',
    gradient: 'from-slate-700/30 via-slate-800/20 to-slate-950/50',
    badgeColor: 'text-slate-300 border-slate-600 bg-slate-800/40',
  };
}

export function formatTemp(celsius: number, unit: 'C' | 'F'): string {
  if (unit === 'F') {
    const f = (celsius * 9) / 5 + 32;
    return `${Math.round(f)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function getRawTempValue(celsius: number, unit: 'C' | 'F'): number {
  if (unit === 'F') {
    return Math.round(((celsius * 9) / 5 + 32) * 10) / 10;
  }
  return Math.round(celsius * 10) / 10;
}

export function formatWindSpeed(kmh: number, unit: 'C' | 'F'): string {
  if (unit === 'F') {
    const mph = kmh * 0.621371;
    return `${Math.round(mph)} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}
