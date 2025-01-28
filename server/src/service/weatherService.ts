import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lon: number;
  lat: number;
}
// TODO: Define a class for the Weather object
interface Weather {
  description: string;
  icon: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = "https://api.openweathermap.org/data/2.5";
  private apiKey = process.env.OPENWEATHER_API_KEY || "";
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    const url = `${this.baseURL}/weather?q=${query}&appid=${this.apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.coord) {
      return { lat: data.coord.lat, lon: data.coord.lon };
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(city);
    if (!locationData) {
      return null;
    } else {
      return this.destructureLocationData(locationData);
    }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const url = this.buildWeatherQuery(coordinates);
    try {
      const response = await fetch(url);

      const data = await response.json();

      return this.parseCurrentWeather(data);
  }}
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return {
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      temperature: response.main.temp,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
    };
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return [currentWeather]
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather | null> {
    const weather = await this.fetchWeatherData(coordinates);
    return weather
  }
}

export default new WeatherService();
