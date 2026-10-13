export interface WeatherCodeInfo {
  code: number;
  label: string;
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  icon: string;
  description: string;
  accentColor: string;
  bgGradient: string;
}

export const WMO_WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: {
    code: 0,
    label: 'Clear Sky',
    category: 'clear',
    icon: 'Sun',
    description: 'Completely clear skies with high solar visibility.',
    accentColor: 'text-amber-400',
    bgGradient: 'from-amber-500/10 via-sky-500/5 to-transparent'
  },
  1: {
    code: 1,
    label: 'Mainly Clear',
    category: 'clear',
    icon: 'SunDim',
    description: 'Scattered high-altitude clouds, predominantly clear.',
    accentColor: 'text-amber-300',
    bgGradient: 'from-amber-500/10 via-slate-800 to-transparent'
  },
  2: {
    code: 2,
    label: 'Partly Cloudy',
    category: 'cloudy',
    icon: 'CloudSun',
    description: 'Intermittent sunshine filtered through broken cloud layers.',
    accentColor: 'text-sky-300',
    bgGradient: 'from-sky-500/10 via-slate-800 to-transparent'
  },
  3: {
    code: 3,
    label: 'Overcast',
    category: 'cloudy',
    icon: 'Cloud',
    description: 'Dense cloud ceiling covering the sky.',
    accentColor: 'text-slate-300',
    bgGradient: 'from-slate-500/15 via-slate-800 to-transparent'
  },
  45: {
    code: 45,
    label: 'Foggy',
    category: 'fog',
    icon: 'CloudFog',
    description: 'Ground-level cloud reducing horizontal visibility.',
    accentColor: 'text-indigo-300',
    bgGradient: 'from-indigo-500/10 via-slate-800 to-transparent'
  },
  48: {
    code: 48,
    label: 'Depositing Rime Fog',
    category: 'fog',
    icon: 'CloudFog',
    description: 'Freezing fog coating surfaces with ice crystals.',
    accentColor: 'text-indigo-200',
    bgGradient: 'from-indigo-600/15 via-slate-800 to-transparent'
  },
  51: {
    code: 51,
    label: 'Light Drizzle',
    category: 'drizzle',
    icon: 'CloudDrizzle',
    description: 'Fine, gentle precipitation droplets.',
    accentColor: 'text-sky-400',
    bgGradient: 'from-sky-500/10 via-slate-800 to-transparent'
  },
  53: {
    code: 53,
    label: 'Moderate Drizzle',
    category: 'drizzle',
    icon: 'CloudDrizzle',
    description: 'Continuous mist-like droplets dampening surfaces.',
    accentColor: 'text-sky-400',
    bgGradient: 'from-sky-600/10 via-slate-800 to-transparent'
  },
  55: {
    code: 55,
    label: 'Dense Drizzle',
    category: 'drizzle',
    icon: 'CloudDrizzle',
    description: 'Heavy drizzle with reduced ambient visibility.',
    accentColor: 'text-sky-500',
    bgGradient: 'from-sky-700/15 via-slate-800 to-transparent'
  },
  56: {
    code: 56,
    label: 'Freezing Drizzle Light',
    category: 'drizzle',
    icon: 'CloudSnow',
    description: 'Sub-zero drizzle causing glazing on road surfaces.',
    accentColor: 'text-cyan-300',
    bgGradient: 'from-cyan-700/15 via-slate-800 to-transparent'
  },
  57: {
    code: 57,
    label: 'Dense Freezing Drizzle',
    category: 'drizzle',
    icon: 'CloudSnow',
    description: 'Sub-zero heavy drizzle forming rapid glaze ice.',
    accentColor: 'text-cyan-400',
    bgGradient: 'from-cyan-800/20 via-slate-800 to-transparent'
  },
  61: {
    code: 61,
    label: 'Slight Rain',
    category: 'rain',
    icon: 'CloudRain',
    description: 'Steady light rain shower.',
    accentColor: 'text-blue-400',
    bgGradient: 'from-blue-600/15 via-slate-800 to-transparent'
  },
  63: {
    code: 63,
    label: 'Moderate Rain',
    category: 'rain',
    icon: 'CloudRain',
    description: 'Steady rainfall with pooling on roadways.',
    accentColor: 'text-blue-400',
    bgGradient: 'from-blue-600/20 via-slate-800 to-transparent'
  },
  65: {
    code: 65,
    label: 'Heavy Rain',
    category: 'rain',
    icon: 'CloudRain',
    description: 'Intense downpour with potential for surface runoff.',
    accentColor: 'text-blue-500',
    bgGradient: 'from-blue-700/25 via-slate-800 to-transparent'
  },
  66: {
    code: 66,
    label: 'Light Freezing Rain',
    category: 'rain',
    icon: 'CloudSnow',
    description: 'Supercooled liquid raindrops freezing on contact.',
    accentColor: 'text-cyan-300',
    bgGradient: 'from-cyan-700/20 via-slate-800 to-transparent'
  },
  67: {
    code: 67,
    label: 'Heavy Freezing Rain',
    category: 'rain',
    icon: 'CloudSnow',
    description: 'Hazardous freezing rain causing ice accumulation.',
    accentColor: 'text-cyan-400',
    bgGradient: 'from-cyan-800/25 via-slate-800 to-transparent'
  },
  71: {
    code: 71,
    label: 'Slight Snowfall',
    category: 'snow',
    icon: 'Snowflake',
    description: 'Light flurries with minimal ground accumulation.',
    accentColor: 'text-indigo-200',
    bgGradient: 'from-indigo-400/15 via-slate-800 to-transparent'
  },
  73: {
    code: 73,
    label: 'Moderate Snowfall',
    category: 'snow',
    icon: 'Snowflake',
    description: 'Consistent snowfall accumulating on pavements.',
    accentColor: 'text-indigo-300',
    bgGradient: 'from-indigo-400/20 via-slate-800 to-transparent'
  },
  75: {
    code: 75,
    label: 'Heavy Snowfall',
    category: 'snow',
    icon: 'Snowflake',
    description: 'Significant snow accumulation with reduced visibility.',
    accentColor: 'text-indigo-400',
    bgGradient: 'from-indigo-500/25 via-slate-800 to-transparent'
  },
  77: {
    code: 77,
    label: 'Snow Grains',
    category: 'snow',
    icon: 'Snowflake',
    description: 'Very small, opaque white grains of ice falling.',
    accentColor: 'text-indigo-200',
    bgGradient: 'from-indigo-400/15 via-slate-800 to-transparent'
  },
  80: {
    code: 80,
    label: 'Slight Showers',
    category: 'rain',
    icon: 'CloudRain',
    description: 'Intermittent scattered rain showers.',
    accentColor: 'text-blue-400',
    bgGradient: 'from-blue-600/15 via-slate-800 to-transparent'
  },
  81: {
    code: 81,
    label: 'Moderate Showers',
    category: 'rain',
    icon: 'CloudRain',
    description: 'Periodic heavy passing showers.',
    accentColor: 'text-blue-400',
    bgGradient: 'from-blue-600/20 via-slate-800 to-transparent'
  },
  82: {
    code: 82,
    label: 'Violent Showers',
    category: 'rain',
    icon: 'CloudRain',
    description: 'Torrential convective showers with sudden gusty winds.',
    accentColor: 'text-blue-500',
    bgGradient: 'from-blue-700/30 via-slate-800 to-transparent'
  },
  85: {
    code: 85,
    label: 'Slight Snow Showers',
    category: 'snow',
    icon: 'Snowflake',
    description: 'Periodic passing snow bursts.',
    accentColor: 'text-indigo-300',
    bgGradient: 'from-indigo-500/15 via-slate-800 to-transparent'
  },
  86: {
    code: 86,
    label: 'Heavy Snow Showers',
    category: 'snow',
    icon: 'Snowflake',
    description: 'Intense snow squalls with sudden whiteout conditions.',
    accentColor: 'text-indigo-400',
    bgGradient: 'from-indigo-600/25 via-slate-800 to-transparent'
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    category: 'thunderstorm',
    icon: 'CloudLightning',
    description: 'Electrical storm with lightning discharges and thunder.',
    accentColor: 'text-amber-400',
    bgGradient: 'from-amber-600/20 via-purple-900/30 to-slate-900'
  },
  96: {
    code: 96,
    label: 'Thunderstorm with Light Hail',
    category: 'thunderstorm',
    icon: 'CloudLightning',
    description: 'Severe electrical storm accompanied by small hail stones.',
    accentColor: 'text-amber-400',
    bgGradient: 'from-amber-600/25 via-purple-900/40 to-slate-900'
  },
  99: {
    code: 99,
    label: 'Severe Thunderstorm with Hail',
    category: 'thunderstorm',
    icon: 'CloudLightning',
    description: 'Violent electrical storm with damaging hail stones.',
    accentColor: 'text-rose-400',
    bgGradient: 'from-rose-600/30 via-purple-900/40 to-slate-900'
  }
};

export function getWeatherCodeInfo(code: number): WeatherCodeInfo {
  return (
    WMO_WEATHER_CODES[code] || {
      code,
      label: 'Variable Conditions',
      category: 'cloudy',
      icon: 'Cloud',
      description: 'Typical atmospheric fluctuations.',
      accentColor: 'text-slate-300',
      bgGradient: 'from-slate-600/10 via-slate-800 to-transparent'
    }
  );
}
