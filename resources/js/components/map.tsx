'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import React from 'react';
import { Clinic } from '@/types/data';

// 🔹 Fix default marker icons (Leaflet + Vite bug)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/markers/marker_red.png',
  iconUrl: '/images/markers/marker_red.png',
  shadowUrl: '/images/markers/marker_shadow.png',
});

const defaultMarker = new L.Icon({
  iconUrl: '/images/markers/marker_red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const greenMarker = new L.Icon({
  iconUrl: '/images/markers/marker_green.png',
  iconSize: [35, 50],
  iconAnchor: [17, 50],
  popupAnchor: [0, -40],
});

// 🔹 Example static clinics (Delta dataset)
const clinics = [
    {
        name: 'Delta State University Teaching Hospital (DELSUTH)',
        city: 'Oghara',
        lat: 5.70086,
        lng: 5.70086,
        approx: false,
        source: 'https://delsuth.org.ng/ (DELSUTH contact page / listing).',
    },
    {
        name: 'Federal Medical Centre, Asaba',
        city: 'Asaba',
        lat: 6.2349987,
        lng: 6.66857242,
        approx: false,
        source: 'World Bank / project docs referencing FMC Asaba coordinates (project text).',
    },
    {
        name: 'Central Hospital, Warri (Warri Central Hospital)',
        city: 'Warri',
        lat: 5.51822,
        lng: 5.7343,
        approx: false,
        source: 'Mapcarta / mapping references for Central Hospital Warri.',
    },
    {
        name: 'Fairview Hospital',
        city: 'Warri',
        lat: 5.52808,
        lng: 5.7541,
        approx: false,
        source: 'Fairview website / Wikidata listing (address → DMS coordinates converted to decimal).',
    },
    {
        name: 'Lily Hospitals Ltd (Warri branch)',
        city: 'Warri',
        lat: 5.76348,
        lng: 5.76348,
        approx: false,
        source: 'Lily Hospitals locations page (branch address; coordinate references).',
    },
    {
        name: 'Pal Clinics & Maternity',
        city: 'Warri',
        lat: 5.54423,
        lng: 5.76027,
        approx: true,
        source: 'Listed in accreditation lists (NIMASA/DSCHC). Coordinates approximated to Warri city centre.',
    },
    {
        name: 'DELSUTH - (alternate reference)',
        city: 'Oghara',
        lat: 5.7,
        lng: 5.7,
        approx: true,
        source: 'Multiple web listings; approximate to Oghara town centre if precise coordinate absent.',
    },
    {
        name: 'Warri General / Government Hospital (listed in DSCHC)',
        city: 'Warri',
        lat: 5.517934,
        lng: 5.734385,
        approx: false,
        source: 'local listings / findlatitudeandlongitude record for Central/Government hospital Warri.',
    },
    {
        name: "St George's Specialist Clinic & Maternity (Warri)",
        city: 'Warri',
        lat: 5.528,
        lng: 5.755,
        approx: true,
        source: 'Named in Delta accreditation lists; coordinate approximated near Warri address sectors.',
    },
    {
        name: 'Rapha Specialist Children and General Clinic (Effurun)',
        city: 'Effurun / Uvwie',
        lat: 5.5175,
        lng: 5.75,
        approx: true,
        source: 'Provider directories (Reliance / local listing); position approximated to Effurun area.',
    },
    {
        name: 'Delta State Hospital Management Board - (Central facilities)',
        city: 'Warri / state-wide',
        lat: 5.54423,
        lng: 5.76027,
        approx: true,
        source: 'DSCHC / Delta State lists (aggregated).',
    },
    {
        name: 'Unity Clinic (Warri)',
        city: 'Warri',
        lat: 5.529,
        lng: 5.7585,
        approx: true,
        source: 'Listed by local directories and accreditation PDFs.',
    },
    {
        name: 'Twins Clinic (Warri)',
        city: 'Warri',
        lat: 5.5295,
        lng: 5.757,
        approx: true,
        source: 'Local private clinic listing (Warri area).',
    },
    {
        name: 'Vertimon Clinics (Warri)',
        city: 'Warri',
        lat: 5.5286,
        lng: 5.7541,
        approx: true,
        source: 'Provider lists (insurance / local directories).',
    },
    {
        name: 'Capitol Hill Hospitals (Warri area)',
        city: 'Warri',
        lat: 5.52959,
        lng: 5.75857,
        approx: false,
        source: 'Directory listing with coordinate reference.',
    },
    {
        name: 'Delta State Cottage Hospital / Cottage Hospitals (various LGAs)',
        city: 'Multiple',
        lat: 5.4,
        lng: 5.9,
        approx: true,
        source: "DSCHC / Delta State 'coded health facilities' list (names by LGA); coordinates are LGA-centre approximations.",
    },
    {
        name: 'Delta State Specialist/Private Clinics (collection)',
        city: 'Asaba / Warri / Sapele / Ughelli / Agbor',
        lat: 6.2,
        lng: 6.7,
        approx: true,
        source: 'Compiled from NIMASA & DSCHC PDF lists (names present; geocoords approximated to local town centres).',
    },
    {
        name: 'DELSUTH - Oghara (alternate coordinate source)',
        city: 'Oghara',
        lat: 5.5867,
        lng: 5.5867,
        approx: true,
        source: 'Town-level coordinate references (Oghara) used where facility-level coordinates not published.',
    },
    {
        name: 'Delta State University Teaching Hospital - confirmed (Wikipedia)',
        city: 'Oghara',
        lat: 5.70086,
        lng: 5.70086,
        approx: false,
        source: 'Wikipedia / official DELSUTH website.',
    },
];


interface DeltaMapProps {
  regClinics: Clinic[]
}

const DeltaMap = ({regClinics}: DeltaMapProps) => {
  const deltaCenter: [number, number] = [5.532, 5.8987];
  console.info("clinics", regClinics)

  return (
    <MapContainer
      center={deltaCenter}
      zoom={8}
      style={{ height: '400px', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />

      {/* Default Center Marker */}
      {/* <Marker position={deltaCenter} icon={defaultMarker}>
        <Popup>Delta State, Nigeria 🇳🇬</Popup>
      </Marker> */}

      {/* 🔹 Static Clinics (Blue Marker) */}
      {clinics.map((clinic, idx) => (
        <Marker key={`clinic-${idx}`} position={[clinic.lat, clinic.lng]} icon={defaultMarker}>
          <Popup>
            <p className="font-semibold">{clinic.name}</p>
            <p>{clinic.city}</p>
            <p>{clinic.approx ? 'Approximate location' : 'Exact location'}</p>
          </Popup>
        </Marker>
      ))}

      {/* 🟢 Registered Clinics (Green Marker) */}
      {regClinics.map((clinic) => (
        <Marker key={`reg-${clinic.id}`} position={[clinic.lat, clinic.lng]} icon={greenMarker}>
          <Popup>
            <p className="font-semibold">{clinic.name}</p>
            <p>{clinic.address}</p>
            <p>Our Clinic</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DeltaMap;
