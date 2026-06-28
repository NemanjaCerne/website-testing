import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'

function createIcon(active) {
  return L.divIcon({
    className: '',
    html: `<div class="map-pin ${active ? 'map-pin--active' : ''}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  })
}

function FlyTo({ coords }) {
  const map = useMap()
  useEffect(() => {
    if (coords) map.flyTo(coords, 15, { duration: 0.8 })
  }, [coords, map])
  return null
}

export default function MapView({ locations, activeIndex, onSelect }) {
  const center = [-33.87, 151.20]

  return (
    <MapContainer center={center} zoom={12} className="map-container" zoomControl={true}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      {activeIndex !== null && (
        <FlyTo coords={locations[activeIndex]?.coords} />
      )}
      {locations.map((loc, i) => (
        <Marker
          key={loc.name}
          position={loc.coords}
          icon={createIcon(activeIndex === i)}
          eventHandlers={{ click: () => onSelect(i) }}
        >
          <Popup className="map-popup">
            <strong>{loc.name}</strong>
            <span>{loc.type}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
