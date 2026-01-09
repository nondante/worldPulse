import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Card } from '../ui/Card';
import { REGION_COLORS, formatNumber } from '../../utils/dataTransformers';
import type { Country } from '../../types/country';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
  countries: Country[];
}

export const WorldMap: React.FC<WorldMapProps> = ({ countries }) => {
  return (
    <Card title="World Map">
      <div className="h-[500px] rounded-lg overflow-hidden relative z-10">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {countries.map((country) => {
            if (!country.latlng || country.latlng.length !== 2) return null;

            const [lat, lng] = country.latlng;
            const radius = Math.sqrt(country.population) / 1000;

            return (
              <CircleMarker
                key={country.cca3}
                center={[lat, lng]}
                radius={Math.max(3, Math.min(radius, 20))}
                fillColor={REGION_COLORS[country.region]}
                color="#fff"
                weight={1}
                opacity={0.8}
                fillOpacity={0.6}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={country.flags.svg}
                        alt={`${country.name.common} flag`}
                        className="w-8 h-6 object-cover rounded"
                      />
                      <strong className="text-base">{country.name.common}</strong>
                    </div>
                    <div className="space-y-1 text-gray-600">
                      <p><strong>Region:</strong> {country.region}</p>
                      <p><strong>Population:</strong> {formatNumber(country.population)}</p>
                      <p><strong>Area:</strong> {formatNumber(country.area)} km²</p>
                      {country.capital && (
                        <p><strong>Capital:</strong> {country.capital[0]}</p>
                      )}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </Card>
  );
};
