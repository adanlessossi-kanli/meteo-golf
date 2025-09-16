# Meteo Golf 🌊🌤️

A weather application specifically designed for golfers in the Gulf of Guinea region. Get real-time weather conditions and golf-specific recommendations to plan your perfect round.

## Features

- **Real-time Weather Data**: Current weather conditions using OpenWeatherMap API
- **Golf-Specific Insights**: Tailored recommendations for golf playing conditions
- **5-Day Forecast**: Extended weather forecast with golf condition ratings
- **Location Services**: GPS-based location detection or manual city search
- **Regional Focus**: Pre-configured locations for Gulf of Guinea cities (Lomé, Accra, Lagos, Abidjan)
- **Auto-refresh**: Optional automatic weather updates every 5 minutes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Golf Condition Ratings

- **🟢 Excellent**: Perfect temperature (18-25°C), low wind (<5 m/s), clear skies
- **🟡 Good**: Favorable conditions with minor weather factors
- **🟠 Fair**: Playable but with some challenging weather elements
- **🔴 Poor**: Not ideal for golf (rain, storms, extreme temperatures/wind)

## Tech Stack

- **Framework**: Angular 20.2.0
- **Language**: TypeScript
- **Styling**: CSS3
- **HTTP Client**: Angular HttpClient
- **State Management**: Angular Signals
- **Weather API**: OpenWeatherMap

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meteo-golf
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Start the docker container:
```bash
docker build -t meteo-golf .
docker run -p 8080:80 meteo-golf
```

5. Open your browser and navigate to `http://localhost:4200`

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── current-weather/ # Current weather display
│   │   ├── forecast/        # Weather forecast
│   │   ├── golf-tips/       # Golf-specific recommendations
│   │   ├── search-bar/      # Location search
│   │   └── weather-metrics/ # Weather data visualization
│   ├── services/            # Business logic and API calls
│   │   ├── weather.service.ts
│   │   ├── storage.service.ts
│   │   └── i18n.service.ts
│   └── weather/             # Main weather component
└── environments/            # Environment configurations
```

## Configuration

The application uses OpenWeatherMap API. The API key is currently embedded in the code for development purposes. For production deployment:

1. Get your API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the API key in `src/app/services/weather.service.ts`
3. Consider using environment variables for security

## Usage

1. **Search Location**: Use the search bar to find weather for any city
2. **Quick Locations**: Click on pre-configured Gulf of Guinea cities
3. **Current Location**: Use GPS to get weather for your current position
4. **Golf Insights**: View golf-specific recommendations based on current conditions
5. **Forecast**: Check 5-day forecast with golf condition ratings
6. **Auto-refresh**: Toggle automatic updates for real-time data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Adanlessossi-Missoh Kanli**

---

*Built with ❤️ for golfers in the Gulf of Guinea region*
