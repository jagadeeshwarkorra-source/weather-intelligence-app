import { ActivityRecommendation, CurrentWeather, DailyForecast } from '../types';
import { getWeatherCondition } from './weatherCodes';

export function generateSmartRecommendations(
  current: CurrentWeather,
  daily?: DailyForecast
): ActivityRecommendation[] {
  const { temperature, windspeed, weathercode } = current;
  const condition = getWeatherCondition(weathercode);
  const isRain = condition.category === 'rain' || condition.category === 'drizzle';
  const isSnow = condition.category === 'snow';
  const isThunder = condition.category === 'thunderstorm';
  const isFog = condition.category === 'fog';
  const isClear = condition.category === 'clear';
  const isFreezing = temperature <= 0;
  const isHot = temperature >= 30;
  const isPleasant = temperature >= 15 && temperature <= 25;
  const isHighWind = windspeed >= 35;
  const isExtremeWind = windspeed >= 50;

  const recommendations: ActivityRecommendation[] = [];

  // 1. Outdoor Recreation Recommendation
  if (isThunder || isExtremeWind || weathercode === 65 || weathercode === 75 || weathercode === 82) {
    recommendations.push({
      id: 'outdoor-alert',
      title: 'Outdoor Activities',
      status: 'warning',
      summary: 'Stay indoors due to high wind or severe weather',
      details: 'Outdoor sports, running, and high-altitude hiking are unsafe right now due to storm activity and gusty conditions.',
      iconName: 'AlertTriangle',
      category: 'outdoor',
    });
  } else if (isRain) {
    recommendations.push({
      id: 'outdoor-rain',
      title: 'Outdoor Sports & Jogging',
      status: 'caution',
      summary: 'Wet track surfaces — indoor workouts advised',
      details: 'Rain showers present slipping hazards. Consider indoor fitness centers, swimming, or strength training today.',
      iconName: 'Dumbbell',
      category: 'outdoor',
    });
  } else if (isSnow) {
    recommendations.push({
      id: 'outdoor-snow',
      title: 'Winter & Snow Recreation',
      status: 'caution',
      summary: 'Dress in thermal gear for snow sports',
      details: 'Suitable for winter walks or ski outings if properly bundled. Beware of hidden black ice on running paths.',
      iconName: 'Footprints',
      category: 'outdoor',
    });
  } else if (isHighWind) {
    recommendations.push({
      id: 'outdoor-wind',
      title: 'Wind Caution for Cycling & Ball Sports',
      status: 'caution',
      summary: 'Strong gusts may disrupt outdoor games',
      details: `Sustained winds of ${Math.round(windspeed)} km/h make tennis, cycling, and ball sports difficult.`,
      iconName: 'Wind',
      category: 'outdoor',
    });
  } else if (isPleasant && (isClear || condition.category === 'cloudy')) {
    recommendations.push({
      id: 'outdoor-ideal',
      title: 'Outdoor Sports & Activities',
      status: 'ideal',
      summary: 'Great day for outdoor sports and recreation',
      details: 'Optimal thermal comfort with gentle breeze. Perfect for distance running, cycling, park picnics, and football.',
      iconName: 'Bike',
      category: 'outdoor',
    });
  } else if (isHot) {
    recommendations.push({
      id: 'outdoor-heat',
      title: 'High Heat Advisory for Workouts',
      status: 'caution',
      summary: 'Schedule athletics in early morning or dusk',
      details: 'High ambient temperature. Hydrate frequently and avoid strenuous midday endurance in direct sunlight.',
      iconName: 'SunMedium',
      category: 'outdoor',
    });
  } else {
    recommendations.push({
      id: 'outdoor-normal',
      title: 'Outdoor Walking & Commuting',
      status: 'ideal',
      summary: 'Moderate conditions suitable for general outdoor plans',
      details: 'Mild weather profile allows for standard outdoor tasks and pleasant leisurely walks.',
      iconName: 'Footprints',
      category: 'outdoor',
    });
  }

  // 2. Attire & Gear
  if (isThunder || isRain) {
    recommendations.push({
      id: 'attire-umbrella',
      title: 'Gear & Attire',
      status: isRain && !isThunder ? 'caution' : 'warning',
      summary: 'Carry an umbrella and waterproof outer shell',
      details: 'High precipitation probability. Pair water-resistant footwear with a windproof umbrella or hooded rain jacket.',
      iconName: 'Umbrella',
      category: 'attire',
    });
  } else if (isSnow || isFreezing) {
    recommendations.push({
      id: 'attire-winter',
      title: 'Winter Wardrobe',
      status: 'caution',
      summary: 'Wear insulated thermal layers, gloves & beanie',
      details: 'Freezing temperatures demand multi-layer insulation and insulated boots to retain core body warmth.',
      iconName: 'Shirt',
      category: 'attire',
    });
  } else if (isClear && isHot) {
    recommendations.push({
      id: 'attire-summer',
      title: 'Sun Protection & Light Wear',
      status: 'ideal',
      summary: 'Wear breathable fabrics, sunglasses & SPF',
      details: 'High UV exposure and warmth. Opt for light-colored linen or moisture-wicking sportswear plus UV-blocking shades.',
      iconName: 'Glasses',
      category: 'attire',
    });
  } else if (temperature < 15) {
    recommendations.push({
      id: 'attire-mild-cool',
      title: 'Layering Recommendation',
      status: 'ideal',
      summary: 'Light jacket or cardigan recommended',
      details: 'Crisp conditions call for a comfortable fleece, windbreaker, or sweater when spending time outdoors.',
      iconName: 'Shirt',
      category: 'attire',
    });
  } else {
    recommendations.push({
      id: 'attire-standard',
      title: 'Everyday Casual Wear',
      status: 'ideal',
      summary: 'Standard comfortable daily attire',
      details: 'Temperature is nicely balanced for standard t-shirts, casual pants, or light dresses.',
      iconName: 'Smile',
      category: 'attire',
    });
  }

  // 3. Travel & Driving Safety
  if (isFog) {
    recommendations.push({
      id: 'travel-fog',
      title: 'Driving & Commute Safety',
      status: 'warning',
      summary: 'Low visibility: use low-beam fog lights and brake early',
      details: 'Ground fog significantly impedes driver line-of-sight. Increase your following distance by 2-3 vehicle lengths.',
      iconName: 'Car',
      category: 'travel',
    });
  } else if (isFreezing && (isRain || isSnow)) {
    recommendations.push({
      id: 'travel-ice',
      title: 'Hazardous Road Conditions',
      status: 'warning',
      summary: 'Watch for black ice on overpasses and bridges',
      details: 'Moisture combined with sub-zero road temperatures produces invisible slick patches. Reduce transit speed.',
      iconName: 'ShieldAlert',
      category: 'travel',
    });
  } else if (isHighWind) {
    recommendations.push({
      id: 'travel-wind',
      title: 'Highway & High-Profile Vehicle Alert',
      status: 'caution',
      summary: 'Strong crosswinds on bridges and open expressways',
      details: 'Keep a firm grip on the steering wheel, particularly around large trucks and exposed highway corridors.',
      iconName: 'Wind',
      category: 'travel',
    });
  } else {
    recommendations.push({
      id: 'travel-clear',
      title: 'Transit & Commute Visibility',
      status: 'ideal',
      summary: 'Clear transit conditions across arterial roads',
      details: 'Dry pavement and good visibility across all local travel routes.',
      iconName: 'Compass',
      category: 'travel',
    });
  }

  // 4. Daily Lifestyle & Indoor Alternatives
  if (isThunder || (isRain && windspeed > 25)) {
    recommendations.push({
      id: 'life-indoor',
      title: 'Smart Indoor Alternative',
      status: 'ideal',
      summary: 'Ideal window for indoor projects, museums & cozy cafés',
      details: 'Inclement outside conditions make it prime time for home study, museum visits, reading, or culinary cooking.',
      iconName: 'Coffee',
      category: 'wellness',
    });
  } else if (isPleasant && isClear) {
    recommendations.push({
      id: 'life-outdoor-leisure',
      title: 'Outdoor Dining & Socializing',
      status: 'ideal',
      summary: 'Prime patio dining & open-air socializing',
      details: 'Comfortable barometric and thermal readings create stellar conditions for outdoor cafes, terraces, or gardening.',
      iconName: 'Sparkles',
      category: 'wellness',
    });
  }

  return recommendations;
}

export function calculateComfortScore(current: CurrentWeather): { score: number; label: string; tone: string } {
  let score = 85;
  const { temperature, windspeed, weathercode } = current;

  // Temperature penalty
  if (temperature < 5) score -= (5 - temperature) * 3;
  else if (temperature > 26) score -= (temperature - 26) * 3.5;

  // Wind penalty
  if (windspeed > 20) score -= (windspeed - 20) * 1.2;

  // Weather condition penalty
  if (weathercode >= 95) score -= 35;
  else if (weathercode >= 61 && weathercode <= 67) score -= 22;
  else if (weathercode >= 51 && weathercode <= 57) score -= 12;
  else if (weathercode >= 71 && weathercode <= 86) score -= 20;
  else if (weathercode >= 45 && weathercode <= 48) score -= 15;

  score = Math.max(10, Math.min(99, Math.round(score)));

  let label = 'Excellent';
  let tone = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

  if (score < 40) {
    label = 'Challenging';
    tone = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  } else if (score < 65) {
    label = 'Moderate';
    tone = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  } else if (score < 80) {
    label = 'Favorable';
    tone = 'text-sky-400 border-sky-500/30 bg-sky-500/10';
  }

  return { score, label, tone };
}
