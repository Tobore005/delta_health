'use client';

import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';

interface LocationPickerProps {
  lat?: number | null;
  lng?: number | null;
  onChange: (coords: { lat: number; lng: number }) => void;
}

const markerIcon = new L.Icon({
  iconUrl: '/images/markers/marker_red.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

export default function LocationPicker({ lat, lng, onChange }: LocationPickerProps) {
  const [coords, setCoords] = useState({
    lat: lat || 9.082,
    lng: lng || 8.6753,
  });

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(newCoords);
        onChange(newCoords); // ✅ only call here
      },
      () => alert('Unable to retrieve your location.')
    );
  };

  const handleDragEnd = (e: L.LeafletEvent) => {
    const marker = e.target as L.Marker;
    const position = marker.getLatLng();
    const newCoords = { lat: position.lat, lng: position.lng };
    setCoords(newCoords);
    onChange(newCoords); // ✅ only call here
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-700">Clinic Location</p>
        <Button
          type="button"
          size="sm"
          onClick={detectLocation}
          className="flex items-center gap-2"
          variant="outline"
        >
          <MapPin className="h-4 w-4" />
          Detect My Location
        </Button>
      </div>

      <div className="h-[300px] w-full overflow-hidden rounded-lg border border-gray-300">
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={coords.lat && coords.lng ? 15 : 6}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker
            position={[coords.lat, coords.lng]}
            draggable
            eventHandlers={{ dragend: handleDragEnd }}
            icon={markerIcon}
          />
        </MapContainer>
      </div>

      <p className="text-xs text-gray-500">
        Drag the marker or use “Detect My Location” to update your coordinates.
      </p>
      {coords.lat && coords.lng && (
        <p className="text-sm text-gray-600">
          Selected: {coords.lat}, {coords.lng}
        </p>
      )}
    </div>
  );
}
