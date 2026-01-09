# WorldPulse - Global Country Data Dashboard

An interactive React + TypeScript dashboard that visualizes global country data from the REST Countries API, featuring interactive charts, advanced filtering, and geographic visualizations.

## Features

- **Interactive Data Visualization**: 5 different chart types powered by Recharts
- **World Map**: Interactive map with country markers using React Leaflet
- **Advanced Filtering**:
  - Search by country name or capital
  - Filter by region (multi-select)
  - Sort by name, population, area, or region
- **Real-time Statistics**: Dynamic stat cards showing filtered data
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive layout for all screen sizes
- **Performance Optimized**: Debounced search, memoized computations, and efficient data caching

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety (strict mode)
- **Vite** - Build tool and dev server
- **Recharts** - Data visualization
- **React Leaflet** - Interactive maps
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Query** - Data fetching and caching
- **Axios** - HTTP client

## Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── PopulationChart.tsx      # Top 20 countries by population
│   │   ├── AreaChart.tsx            # Population vs Area scatter plot
│   │   ├── RegionDistribution.tsx   # Pie chart by region
│   │   └── LanguageChart.tsx        # Top 15 languages bar chart
│   ├── filters/
│   │   ├── FilterPanel.tsx          # Main filter container
│   │   ├── RegionFilter.tsx         # Region selection
│   │   └── SearchBar.tsx            # Debounced search input
│   ├── map/
│   │   └── WorldMap.tsx             # Interactive world map
│   └── ui/
│       ├── Card.tsx                 # Reusable card component
│       ├── StatCard.tsx             # Statistics display card
│       └── LoadingSpinner.tsx       # Loading indicator
├── hooks/
│   ├── useCountries.ts              # React Query hook for API
│   └── useFilters.ts                # Filter logic hook
├── store/
│   └── filterStore.ts               # Zustand state management
├── types/
│   └── country.ts                   # TypeScript interfaces
├── utils/
│   ├── dataTransformers.ts          # Data aggregation utilities
│   └── formatters.ts                # Number/text formatters
├── services/
│   └── api.ts                       # REST Countries API client
├── App.tsx                          # Main application
└── main.tsx                         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Key Features Explained

### 1. Charts

- **Population Chart**: Bar chart showing top 20 countries by population, color-coded by region
- **Area Chart**: Scatter plot comparing population vs area, with interactive zoom/pan
- **Region Distribution**: Pie chart showing distribution of countries across regions
- **Language Analysis**: Horizontal bar chart of top 15 most spoken languages

### 2. Interactive Map

- Real-time visualization of filtered countries
- Circle markers sized by population
- Color-coded by region
- Popup with country details on click

### 3. Filtering System

- **Search**: Debounced search across country names and capitals (300ms delay)
- **Region Filter**: Multi-select region filtering with visual indicators
- **Sort Options**: Sort by name, population, area, or region
- **Reset**: One-click filter reset

### 4. Performance Optimizations

- React Query caching (1-hour stale time)
- Memoized data transformations
- Debounced search input
- Optimized re-renders with useMemo

## Data Source

This project uses the [REST Countries API](https://restcountries.com/) to fetch comprehensive data about 195 countries worldwide.

## TypeScript Configuration

The project uses TypeScript strict mode for maximum type safety:
- Strict null checks
- No implicit any
- No unused locals/parameters
- No fallthrough cases in switch

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in appropriate directories
2. Define TypeScript types in `src/types/`
3. Add data transformation utilities in `src/utils/`
4. Update state management in `src/store/` if needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Acknowledgments

- [REST Countries API](https://restcountries.com/)
- [Recharts](https://recharts.org/)
- [React Leaflet](https://react-leaflet.js.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)
