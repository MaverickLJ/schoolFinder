// This file contains the JavaScript code for the landing page. It includes functionality for user interactions, such as handling search queries and managing events for buttons.

const MOCK_SCHOOLS = [
  { id: 10439, name: "Dr Cayetano Coll Y Toste", municipality: "ARECIBO", lat: 18.4732, lng: -66.715 },
  { id: 12005, name: "George Washington", municipality: "LARES", lat: 18.295, lng: -66.877 },
  { id: 12062, name: "Francisco Menendez Balbañe", municipality: "MANATÍ", lat: 18.433, lng: -66.492 },
  { id: 12633, name: "Visitacion Pagan", municipality: "OROCOVIS", lat: 18.225, lng: -66.391 },
  { id: 12724, name: "Su Ana Joaquina Ortiz Ortiz", municipality: "OROCOVIS", lat: 18.231, lng: -66.382 },
];

// Utils
const $ = (s) => document.querySelector(s);
function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180, lat2 = (b.lat * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
function nearestMunicipalityForCoord(coords) {
  if (!coords) return null;
  let nearest = null, best = Infinity;
  for (const s of MOCK_SCHOOLS) {
    const d = haversineKm(coords, { lat: s.lat, lng: s.lng });
    if (d < best) {
      best = d;
      nearest = s.municipality;
    }
  }
  return nearest;
}

// datalist municipios
$('#muni-list').innerHTML = [...new Set(MOCK_SCHOOLS.map(s => s.municipality))].sort()
  .map(m => `<option value="${m}"></option>`).join('');

// geolocalización
let coords = null;

$('#btn-buscar').addEventListener('click', () => {
  const query = $('#q').value.trim();
  const municipio = $('#mun').value.trim() || nearestMunicipalityForCoord(coords) || '';
  alert(`Buscar: ${query} | Municipio: ${municipio}`);
});
$('#btn-ver').addEventListener('click', () => alert('Ver colegios de tu zona'));
$('#btn-familias').addEventListener('click', () => alert('Conoce los preferidos por las familias'));
$('#btn-test').addEventListener('click', () => alert('Haz nuestro test de afinidad'));