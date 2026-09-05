import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Snowflake,
  Wind,
  Umbrella,
  AlertTriangle,
  Dumbbell,
  Bike,
  Footprints,
  Car,
  ShieldAlert,
  Sparkles,
  Coffee,
  Smile,
  Shirt,
  Glasses,
  Compass,
  Thermometer,
  Eye,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6', size }) => {
  const iconProps = { className, size };

  switch (name) {
    case 'Sun':
      return <Sun {...iconProps} />;
    case 'SunMedium':
      return <SunMedium {...iconProps} />;
    case 'CloudSun':
      return <CloudSun {...iconProps} />;
    case 'Cloud':
      return <Cloud {...iconProps} />;
    case 'CloudRain':
      return <CloudRain {...iconProps} />;
    case 'CloudSnow':
      return <CloudSnow {...iconProps} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...iconProps} />;
    case 'CloudLightning':
      return <CloudLightning {...iconProps} />;
    case 'CloudFog':
      return <CloudFog {...iconProps} />;
    case 'Snowflake':
      return <Snowflake {...iconProps} />;
    case 'Wind':
      return <Wind {...iconProps} />;
    case 'Umbrella':
      return <Umbrella {...iconProps} />;
    case 'AlertTriangle':
      return <AlertTriangle {...iconProps} />;
    case 'Dumbbell':
      return <Dumbbell {...iconProps} />;
    case 'Bike':
      return <Bike {...iconProps} />;
    case 'Footprints':
      return <Footprints {...iconProps} />;
    case 'Car':
      return <Car {...iconProps} />;
    case 'ShieldAlert':
      return <ShieldAlert {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Coffee':
      return <Coffee {...iconProps} />;
    case 'Smile':
      return <Smile {...iconProps} />;
    case 'Shirt':
      return <Shirt {...iconProps} />;
    case 'Glasses':
      return <Glasses {...iconProps} />;
    case 'Compass':
      return <Compass {...iconProps} />;
    case 'Thermometer':
      return <Thermometer {...iconProps} />;
    case 'Eye':
      return <Eye {...iconProps} />;
    case 'Droplets':
      return <Droplets {...iconProps} />;
    case 'Gauge':
      return <Gauge {...iconProps} />;
    case 'Sunrise':
      return <Sunrise {...iconProps} />;
    case 'Sunset':
      return <Sunset {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};
