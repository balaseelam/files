import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment-timezone';
import { IoMdClose } from "react-icons/io";
import Clock from './Clock';

const containerStyle = {
    width: '100%',
    height: '100vh',
    position: 'relative'
};

const center = {
    lat: 20.5937,
    lng: 78.9629
};

export default function ReactMap() {
    const [clickedLocationInfo, setClickedLocationInfo] = useState(null);
    const [time, setTime] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            if (clickedLocationInfo) {
                fetchAndDisplayTime(clickedLocationInfo.coordinates);
            }
        }, 1); // Update time every second

        return () => clearInterval(interval);
    }, [clickedLocationInfo]);

    const handleMapClick = async (event) => {
        const { latLng } = event;
        const coordinates = {
            lat: latLng.lat(),
            lng: latLng.lng()
        };

        try {
            setClickedLocationInfo({
                coordinates
            });
            fetchAndDisplayTime(coordinates);
            setShowModal(true); // Display the modal when a location is clicked
            setModalPosition({ x: event.pixel.x, y: event.pixel.y });
        } catch (error) {
            console.error('Error handling map click:', error);
        }
    };

    const fetchAndDisplayTime = async (coordinates) => {
        try {
            const { lat, lng } = coordinates;
            const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${moment().unix()}&key=AIzaSyDGQfImT7VOANe2VpLI9TTkQeyeuEQDpkg`);
            const data = await response.json();
            const localTime = moment().tz(data.timeZoneId); // Using Moment Timezone

            console.log('Local time in clicked location:', localTime.format('hh:mm:ss A')); // Format time to 12-hour format with AM/PM
            const time1 = localTime.format('hh:mm:ss.SSS A'); // Format time to 12-hour format with AM/PM
            setTime(time1);
        } catch (error) {
            console.error('Error fetching time zone data:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="map-container" style={{ position: 'relative' }}>
            <LoadScript
                googleMapsApiKey="AIzaSyDGQfImT7VOANe2VpLI9TTkQeyeuEQDpkg"
                loadingElement={<div style={{ height: "100%" }} />}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onClick={handleMapClick}
                >
                    {clickedLocationInfo && (
                        <Marker position={clickedLocationInfo.coordinates} />
                    )}
                </GoogleMap>
            </LoadScript>

            {showModal && clickedLocationInfo && (
                <div className="modal relative bg-slate-100 rounded-xl" style={{ position: 'absolute', top: modalPosition.y, left: modalPosition.x }}>
                    <div className="modal-content ">
                        <span className="absolute m-1 right-0 top-0 close cursor-pointer " onClick={closeModal}><IoMdClose /></span>
                        <p>{time}</p>
                        <div className='container'>
                            <Clock time={time} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



// export default function ReactMap() {
//     const [clickedLocationInfo, setClickedLocationInfo] = useState(null);
//     const [ti, setTi] = useState('');
//     const [showModal, setShowModal] = useState(false);

//     const handleMapClick = async (event) => {
//         const { latLng } = event;
//         const coordinates = {
//             lat: latLng.lat(),
//             lng: latLng.lng()
//         };

//         try {
//             setClickedLocationInfo({
//                 coordinates
//             });
//             fetchAndDisplayTime(coordinates);
//             setShowModal(true); // Display the modal when a location is clicked
//         } catch (error) {
//             console.error('Error handling map click:', error);
//         }
//     };

//     const fetchAndDisplayTime = async (coordinates) => {
//         try {
//             const { lat, lng } = coordinates;
//             const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${moment().unix()}&key=AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4`);
//             const data = await response.json();
//             const localTime = moment().tz(data.timeZoneId); // Using Moment Timezone

//             console.log('Local time in clicked location:', localTime.format('HH:mm:ss'));
//             const time = localTime.format('HH:mm:ss');
//             setTi(time);
//         } catch (error) {
//             console.error('Error fetching time zone data:', error);
//         }
//     };

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <div style={{ containerStyle }} className='m-2 border-1 border-black'>
//             <LoadScript
//                 googleMapsApiKey="AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4"
//                 loadingElement={<div style={{ height: "100%" }} />}
//             >
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={center}
//                     zoom={10}
//                     onClick={handleMapClick}
//                 >
//                     {clickedLocationInfo && (
//                         <>
//                             <Marker position={clickedLocationInfo.coordinates} >
//                                 {showModal && clickedLocationInfo && (
//                                     <div className="modal bg-slate-100" style={{ position: 'absolute', transform: `translate(${clickedLocationInfo.coordinates.lng}px, ${clickedLocationInfo.coordinates.lat}px)` }}>
//                                         <div className="modal-content">
//                                             <span className="close cursor-pointer" onClick={closeModal}><IoMdClose /></span>
//                                             <p>{ti}</p>
//                                             <div className='container'>
//                                                 <Clock time={ti} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                             </Marker>
//                         </>

//                     )}

//                 </GoogleMap>

//             </LoadScript>
//         </div>
//     );
// }


// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import Clock from './Clock';
// import moment from 'moment-timezone';

// const containerStyle = {
//   width: '100%',
//   height: '100vh',
//   position: 'relative'
// };

// const center = {
//   lat: 20.5937,
//   lng: 78.9629
// };

// export default function ReactMap() {
//   const [clickedLocationInfo, setClickedLocationInfo] = useState(null);
//   const [ti, setTi] = useState('');

//   const handleMapClick = async (event) => {
//     const { latLng } = event;
//     const coordinates = {
//       lat: latLng.lat(),
//       lng: latLng.lng()
//     };

//     try {
//       setClickedLocationInfo({
//         coordinates
//       });
//       fetchAndDisplayTime(coordinates);
//     } catch (error) {
//       console.error('Error handling map click:', error);
//     }
//   };

//   const fetchAndDisplayTime = async (coordinates) => {
//     try {
//       const { lat, lng } = coordinates;
//       const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${moment().unix()}&key=AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4`);
//       const data = await response.json();
//     //   const timezoneOffsetSeconds = data.rawOffset + data.dstOffset;
//     //   const timezoneOffsetMilliseconds = timezoneOffsetSeconds * 1000;
//       const localTime = moment().tz(data.timeZoneId); // Using Moment Timezone

//       console.log('Local time in clicked location:', localTime.format('HH:mm:ss'));
//       const time = localTime.format('HH:mm:ss');
//       setTi(time);
//     } catch (error) {
//       console.error('Error fetching time zone data:', error);
//     }
//   };

//   return (
//     <div style={{containerStyle}} className='m-2 border-2 border-black'>
//       <LoadScript
//         googleMapsApiKey="AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4"
//         loadingElement={<div style={{ height: "100%" }} />}
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//           onClick={handleMapClick}
//         >
//           {clickedLocationInfo && (         
//               <Marker position={clickedLocationInfo.coordinates}/>
//           )}
//         </GoogleMap>
//         {clickedLocationInfo && (
//             <div className='container bg-black'>
//                 <div  style={{ position: 'absolute', top: 100, left: 20 }}> {/* Adjust position as needed */}
//                 <Clock time={ti} style={{ height: '100', width: '100' }} />
//                 </div>
//           </div>
//         )}
//       </LoadScript>
      
//     </div>
//   );
// }

{/* {clickedLocationInfo && (
        <div className="mt-2">
          <Clock time={ti} />
        </div>
      )} */}


// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import Clock from './Clock';

// const containerStyle = {
//   width: '100%',
//   height: '100vh'
// };

// const center = {
//   lat: 20.5937,
//   lng: 78.9629
// };

// export default function ReactMap() {
//   const [clickedLocationInfo, setClickedLocationInfo] = useState(null);
//   const [ti,setTi]=useState('')

//   const handleMapClick = async (event) => {
//     const { latLng } = event;
//     const coordinates = {
//       lat: latLng.lat(),
//       lng: latLng.lng()
//     };

//     try {
//       setClickedLocationInfo({
//         coordinates
//       });
//       fetchAndDisplayTime(coordinates);
//     } catch (error) {
//       console.error('Error handling map click:', error);
//     }
//   };

//   const fetchAndDisplayTime = async (coordinates) => {
//     try {
//       const { lat, lng } = coordinates;
//       const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Date.now() / 1000}&key=AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4`);
//       const data = await response.json();
//       const timezoneOffsetSeconds = data.rawOffset + data.dstOffset;
//       const timezoneOffsetMilliseconds = timezoneOffsetSeconds * 1000;
//       const localTime = new Date(Date.now() + timezoneOffsetMilliseconds);

//       console.log('Local time in clicked location:', localTime.toLocaleTimeString());
//       const time=localTime.toLocaleTimeString()
//       setTi(time)
//     } catch (error) {
//       console.error('Error fetching time zone data:', error);
//     }
//   };


//   return (
//     <div className='m-2 border-2 border-black'>
//       <LoadScript
//         googleMapsApiKey="AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4"
//         loadingElement={<div style={{ height: "100%" }} />}
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//           onClick={handleMapClick}
//         >
//           {clickedLocationInfo && (
//             <>
//             <Marker position={clickedLocationInfo.coordinates}>
//                 <Clock time={ti}/>
//             </Marker>

//             </>
//           )}
//         </GoogleMap>
//       </LoadScript>
//       {clickedLocationInfo && (
//         <div className="mt-2">
//           {/* <div>Coordinates: {clickedLocationInfo.coordinates.lat}, {clickedLocationInfo.coordinates.lng}</div> */}
//           <Clock time={ti}/>
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '100vh'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// export default function ReactMap() {
//   const [clickedLocationInfo, setClickedLocationInfo] = useState(null);

// const handleMapClick = async (event) => {
//     const { latLng } = event;
//     const coordinates = {
//       lat: latLng.lat(),
//       lng: latLng.lng()
//     };
  
//     try {
//       setClickedLocationInfo({
//         coordinates
//       });
//       fetchAndDisplayTime(coordinates);
//     } catch (error) {
//       console.error('Error handling map click:', error);
//     }
//   };
  

//   const fetchAndDisplayTime = async (coordinates) => {
//     try {
//       const { lat, lng } = coordinates;
//       const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Date.now() / 1000}&key=AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4`);
//       const data = await response.json();
//       const timezoneOffset = data.rawOffset + data.dstOffset;
//       const localTime = new Date(Date.now() + timezoneOffset * 1000);
  
//       console.log('Local time in clicked location:', localTime.toLocaleTimeString());
//     } catch (error) {
//       console.error('Error fetching time zone data:', error);
//     }
//   };
  
  
  

//   return (
//     <div className='m-2 border-2 border-black'>
//       <LoadScript
//         googleMapsApiKey="AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4"
//         loadingElement={<div style={{ height: "100%" }} />}
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//           onClick={handleMapClick}
//         >
//           {clickedLocationInfo && (
//             <Marker position={clickedLocationInfo.coordinates} />
//           )}
//         </GoogleMap>
//       </LoadScript>
//       {clickedLocationInfo && (
//         <div className="mt-2">
//           <div>Postal Code: {clickedLocationInfo.postalCode}</div>
//           <div>Coordinates: {clickedLocationInfo.coordinates.lat}, {clickedLocationInfo.coordinates.lng}</div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React from 'react'
// import{GoogleMap,useJsApiLoader} from '@react-google-maps/api'
 
// const containerStyle = {
//     width: '400px',
//     height: '400px'
//   };
 
//   const center = {
//     lat: 13.08784000,
//     lng: 80.27847000
//   };
 
// const ReactMap = () => {
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: "AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4"
//       })
   
//       const [map, setMap] = React.useState(null)
   
//       const onLoad = React.useCallback(function callback(map) {
//         // This is just an example of getting and using the map instance!!! don't just blindly copy!
//         const bounds = new window.google.maps.LatLngBounds(center);
//         map.fitBounds(bounds);
   
//         setMap(map)
//       }, [])
   
//       const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//       }, [])
   
//       return isLoaded ? (
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={10}
//             onLoad={onLoad}
//             onUnmount={onUnmount}
//           >
//             { /* Child components, such as markers, info windows, etc. */ }
//             <></>
//           </GoogleMap>
//       ) : <></>
// }
 
// export default React.memo(ReactMap);

// import React from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '100vh'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// export default function ReactMap() {
//   return (
//     <div className='m-2 border-2 border-black'>
//       <LoadScript
//         googleMapsApiKey="AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4" // Replace YOUR_API_KEY_HERE with your actual API key

//         loadingElement={<div style={{ height: "100%" }} />} // Style for loading element
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//         >
//           {/* Child components, such as markers, can be added here */}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// }

//   const handleMapClick = async (event) => {
//     const { latLng } = event;
//     const lat = latLng.lat();
//     const lng = latLng.lng();

//     try {
//       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBkoD8w4fAxBVfloqsTSrpmH2H-0NoLWl4`);
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         const result = data.results[0];
//         const postalCode = result.address_components.find(component => component.types.includes('postal_code'));
//         if (postalCode) {
//           const postalCodeValue = postalCode.short_name;
//           setClickedLocationInfo({
//             postalCode: postalCodeValue,
//             coordinates: { lat, lng }
//           });
//           fetchAndDisplayTime(postalCodeValue);
//         } else {
//           console.error('Postal code not found for the clicked location');
//         }
//       } else {
//         console.error('No results found for the clicked location');
//       }
//     } catch (error) {
//       console.error('Error fetching location data:', error);
//     }
//   };
