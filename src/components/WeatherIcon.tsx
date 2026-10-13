import React from 'react';
import {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
  Umbrella,
  Wind,
  Flame,
  ThermometerSnowflake,
  Activity,
  Bike,
  Coffee,
  Footprints,
  Compass,
  LucideProps
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  name: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'SunDim':
      return <SunDim {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudRain':
      return <CloudRain {...props} />;
    case 'CloudSnow':
      return <CloudSnow {...props} />;
    case 'Snowflake':
      return <Snowflake {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    case 'Umbrella':
      return <Umbrella {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'ThermometerSnowflake':
      return <ThermometerSnowflake {...props} />;
    case 'Activity':
      return <Activity {...props} />;
    case 'Bike':
      return <Bike {...props} />;
    case 'Coffee':
      return <Coffee {...props} />;
    case 'Footprints':
      return <Footprints {...props} />;
    case 'Compass':
    default:
      return <Compass {...props} />;
  }
};
