import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletMap = () => {
  const position = [18.3354, 76.7580]; // Darashiv coordinates

  // Custom gold wedding marker
  const weddingIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#D4AF37" stroke="#800020" stroke-width="2"/>
        <circle cx="16" cy="16" r="6" fill="#800020"/>
        <path d="M16 8 L18 12 L22 12 L19 15 L20 20 L16 17 L12 20 L13 15 L10 12 L14 12 Z" fill="#FFFFFF"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 bg-maroon text-white">
        <h3 className="text-lg font-semibold text-center">Wedding Location</h3>
      </div>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={weddingIcon}>
          <Popup>
            <div className="text-center">
              <h4 className="font-bold text-maroon">Wedding Venue</h4>
              <p>Darashiv, Maharashtra</p>
              <p className="text-sm text-gray-600">February 14, 2024</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="p-4 bg-cream text-center">
        <p className="text-gray-700">
          <strong>Shri Viththal Temple, Darashiv</strong>
          <br />
          Join us for this special celebration
        </p>
      </div>
    </div>
  );
};

export default LeafletMap;