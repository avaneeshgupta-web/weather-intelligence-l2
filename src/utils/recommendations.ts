import { CurrentWeather, DailyForecast, PlanningRecommendation, ActivityFeasibility } from '../types/weather';
import { getWeatherCodeInfo } from './weatherCodes';

export function generatePlanningRecommendations(
  current: CurrentWeather,
  daily: DailyForecast
): PlanningRecommendation[] {
  const recommendations: PlanningRecommendation[] = [];

  // Metrics for today (index 0 of daily forecast)
  const todayPrecipitation = daily.precipitation_sum?.[0] ?? 0;
  const todayMaxTemp = daily.temperature_2m_max?.[0] ?? current.temperature;
  const currentTemp = current.temperature;
  const currentWindSpeed = current.windspeed;
  const weatherInfo = getWeatherCodeInfo(current.weathercode);
  const isClearCategory = weatherInfo.category === 'clear' || current.weathercode === 0 || current.weathercode === 1;

  // RULE 1: Rain/Precipitation > 0mm
  // "Bring an umbrella and wear waterproof shoes."
  if (todayPrecipitation > 0 || weatherInfo.category === 'rain' || weatherInfo.category === 'drizzle') {
    recommendations.push({
      id: 'rain-rule',
      ruleKey: 'rain',
      title: 'Precipitation Alert',
      advice: 'Bring an umbrella and wear waterproof shoes.',
      severity: 'warning',
      metricContext: `${todayPrecipitation.toFixed(1)} mm precipitation expected`,
      iconName: 'Umbrella'
    });
  }

  // RULE 2: High Temp > 30°C
  // "Stay hydrated and wear light clothing; hot day ahead."
  if (todayMaxTemp > 30 || currentTemp > 30) {
    recommendations.push({
      id: 'hot-rule',
      ruleKey: 'hot',
      title: 'High Heat Advisory',
      advice: 'Stay hydrated and wear light clothing; hot day ahead.',
      severity: 'alert',
      metricContext: `High of ${Math.round(todayMaxTemp)}°C (current ${Math.round(currentTemp)}°C)`,
      iconName: 'Flame'
    });
  }

  // RULE 3: High Temp < 15°C
  // "Wear warm layers or a jacket."
  if (todayMaxTemp < 15 || currentTemp < 15) {
    recommendations.push({
      id: 'cold-rule',
      ruleKey: 'cold',
      title: 'Chilly Conditions',
      advice: 'Wear warm layers or a jacket.',
      severity: 'caution',
      metricContext: `High of ${Math.round(todayMaxTemp)}°C (current ${Math.round(currentTemp)}°C)`,
      iconName: 'ThermometerSnowflake'
    });
  }

  // RULE 4: Wind speed > 20 km/h
  // "Breezy conditions; secure outdoor items."
  const maxWindSpeedToday = Math.max(currentWindSpeed, daily.windspeed_10m_max?.[0] ?? currentWindSpeed);
  if (currentWindSpeed > 20 || maxWindSpeedToday > 20) {
    recommendations.push({
      id: 'wind-rule',
      ruleKey: 'wind',
      title: 'Elevated Wind Alert',
      advice: 'Breezy conditions; secure outdoor items.',
      severity: 'warning',
      metricContext: `Wind speed reaching ${Math.round(maxWindSpeedToday)} km/h`,
      iconName: 'Wind'
    });
  }

  // RULE 5: Clear weather (18°C–28°C)
  // "Ideal conditions for outdoor sports and travel."
  // Checked against current temperature or comfortable daily high in that window
  const isInComfortWindow = (currentTemp >= 18 && currentTemp <= 28) || (todayMaxTemp >= 18 && todayMaxTemp <= 28);
  if (isClearCategory && isInComfortWindow && todayPrecipitation === 0) {
    recommendations.push({
      id: 'clear-rule',
      ruleKey: 'clear',
      title: 'Optimal Atmosphere',
      advice: 'Ideal conditions for outdoor sports and travel.',
      severity: 'success',
      metricContext: `Clear skies · ${Math.round(currentTemp)}°C · Calm air`,
      iconName: 'Sun'
    });
  }

  // Fallback if no specific rule triggered
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'moderate-rule',
      ruleKey: 'neutral',
      title: 'Temperate Outlook',
      advice: 'Mild atmospheric conditions. Standard daily apparel is suitable.',
      severity: 'info',
      metricContext: `Conditions: ${weatherInfo.label} · ${Math.round(currentTemp)}°C`,
      iconName: 'Compass'
    });
  }

  return recommendations;
}

export function evaluateActivityFeasibility(
  current: CurrentWeather,
  daily: DailyForecast
): ActivityFeasibility[] {
  const precip = daily.precipitation_sum?.[0] ?? 0;
  const temp = current.temperature;
  const maxTemp = daily.temperature_2m_max?.[0] ?? temp;
  const wind = current.windspeed;
  const code = current.weathercode;

  const activities: ActivityFeasibility[] = [];

  // 1. Running & Jogging
  if (precip > 5 || code >= 95 || wind > 35 || maxTemp > 34) {
    activities.push({
      name: 'Outdoor Running',
      category: 'Fitness',
      status: 'Not Advised',
      statusColor: 'rose',
      reason: precip > 5 ? 'Wet surface risk and precipitation' : 'Severe weather or thermal discomfort',
      iconName: 'Activity'
    });
  } else if (precip > 0 || temp < 5 || temp > 29 || wind > 25) {
    activities.push({
      name: 'Outdoor Running',
      category: 'Fitness',
      status: 'Caution',
      statusColor: 'amber',
      reason: precip > 0 ? 'Damp roads, take traction precautions' : 'Keep hydrated and watch heart rate',
      iconName: 'Activity'
    });
  } else {
    activities.push({
      name: 'Outdoor Running',
      category: 'Fitness',
      status: 'Optimal',
      statusColor: 'emerald',
      reason: 'Great air temperature and moderate winds',
      iconName: 'Activity'
    });
  }

  // 2. Cycling & Commuting
  if (wind > 32 || precip > 6 || code >= 95) {
    activities.push({
      name: 'Cycling & Biking',
      category: 'Mobility',
      status: 'Not Advised',
      statusColor: 'rose',
      reason: wind > 32 ? 'High crosswinds hazard' : 'Slick roads and low visibility',
      iconName: 'Bike'
    });
  } else if (wind > 20 || precip > 0.5) {
    activities.push({
      name: 'Cycling & Biking',
      category: 'Mobility',
      status: 'Caution',
      statusColor: 'amber',
      reason: wind > 20 ? 'Gusts up to 20+ km/h' : 'Light road dampness',
      iconName: 'Bike'
    });
  } else {
    activities.push({
      name: 'Cycling & Biking',
      category: 'Mobility',
      status: 'Optimal',
      statusColor: 'emerald',
      reason: 'Low aerodynamic drag and dry tarmac',
      iconName: 'Bike'
    });
  }

  // 3. Outdoor Dining / Patio
  if (precip > 0.2 || temp < 14 || temp > 32 || wind > 24) {
    activities.push({
      name: 'Outdoor Dining & Patio',
      category: 'Lifestyle',
      status: precip > 0.2 || temp < 10 || wind > 28 ? 'Not Advised' : 'Caution',
      statusColor: precip > 0.2 || temp < 10 || wind > 28 ? 'rose' : 'amber',
      reason: precip > 0.2 ? 'Precipitation expected' : temp < 14 ? 'Cold breeze, requires heaters' : 'Windy or hot',
      iconName: 'Coffee'
    });
  } else {
    activities.push({
      name: 'Outdoor Dining & Patio',
      category: 'Lifestyle',
      status: 'Optimal',
      statusColor: 'emerald',
      reason: 'Pleasant ambient temperature and calm breeze',
      iconName: 'Coffee'
    });
  }

  // 4. Sightseeing & Walking
  if (precip > 8 || code >= 95) {
    activities.push({
      name: 'Sightseeing & Walking',
      category: 'Leisure',
      status: 'Not Advised',
      statusColor: 'rose',
      reason: 'Heavy rain or storm hazards',
      iconName: 'Footprints'
    });
  } else if (precip > 0 || temp < 8 || temp > 32) {
    activities.push({
      name: 'Sightseeing & Walking',
      category: 'Leisure',
      status: 'Favorable',
      statusColor: 'sky',
      reason: precip > 0 ? 'Bring rain gear for intermittent showers' : 'Dress appropriately for the temperature',
      iconName: 'Footprints'
    });
  } else {
    activities.push({
      name: 'Sightseeing & Walking',
      category: 'Leisure',
      status: 'Optimal',
      statusColor: 'emerald',
      reason: 'Clear visibility and comfortable climate',
      iconName: 'Footprints'
    });
  }

  return activities;
}
