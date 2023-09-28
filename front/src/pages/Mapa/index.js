// import React, { useState, useEffect } from "react";

// const Mapa = () => {
//     const [direcciones, setDirecciones] = useState([
//         {
//             calle: "calle 1 sur",
//             numero: 123,
//             ciudad: "Bogotá",
//         },
//         {
//             calle: "calle 2 sur",
//             numero: 456,
//             ciudad: "Bogotá",
//         },
//     ]);

//     const geocoder = new google.maps.Geocoder();

//     const GoogleMap = ({ center, zoom }) => {
//         const script = document.createElement("script");
//         script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
//         script.async = true;
//         document.body.appendChild(script);

//         function initMap() {
//             const map = new google.maps.Map(
//                 document.getElementById("map"),
//                 {
//                     center,
//                     zoom,
//                 }
//             );

//             direcciones.forEach((direccion) => {
//                 const marker = new google.maps.Marker({
//                     position: [direccion.latitud, direccion.longitud],
//                 });

//                 marker.setMap(map);
//             });
//         }

//         return map;
//     };

//     const handleInputChange = (event) => {
//         const direccion = event.target.value;

//         geocoder.geocode({ address: direccion }, (results, status) => {
//             if (status === google.maps.GeocoderStatus.OK) {
//                 const location = results[0].geometry.location;

//                 setDirecciones([
//                     ...direcciones,
//                     {
//                         calle: direccion,
//                         numero: "",
//                         ciudad: "",
//                         latitud: location.lat(),
//                         longitud: location.lng(),
//                     },
//                 ]);

//                 const map = GoogleMap({
//                     center: [location.lat(), location.lng()],
//                     zoom: 15,
//                 });
//             }
//         });
//     };

//     return (
//         <>
//             <div id="map"></div>
//             <input
//                 type="text"
//                 placeholder="Escribe una dirección"
//                 onChange={handleInputChange}
//             />
//         </>
//     );
// };

// export default Mapa;
