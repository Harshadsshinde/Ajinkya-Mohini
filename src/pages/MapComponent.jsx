import React, { useEffect, useState } from "react";

const MapComponent = () => {
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const initMap = () => {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps not loaded yet");
        setMapError(true);
        return;
      }

      try {
        // Darashiv, India coordinates
        const darashivCoords = { lat: 18.3354, lng: 76.7580 };
        
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: darashivCoords,
          zoom: 15,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#ffffff" }],
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#000000" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#D4AF37" }] // Gold color for water
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }]
            }
          ],
        });

        new window.google.maps.Marker({
          position: darashivCoords,
          map: map,
          title: "Wedding Venue - Darashiv",
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path fill="#D4AF37" stroke="#800020" stroke-width="2" d="M20 2C12.268 2 6 8.268 6 16C6 24 20 38 20 38S34 24 34 16C34 8.268 27.732 2 20 2Z"/>
                <circle fill="#800020" cx="20" cy="16" r="6"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
          }
        });

        // Add info window
        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0; color: #800020;">Wedding Venue</h3>
              <p style="margin: 5px 0; color: #333;">Darashiv, Maharashtra, India</p>
              <p style="margin: 0; color: #666;">See you on February 14, 2024!</p>
            </div>
          `,
        });

        infowindow.open(map, new window.google.maps.Marker({
          position: darashivCoords,
          map: map
        }));

      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError(true);
      }
    };

    const loadGoogleMaps = () => {
      // Check if already loaded
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Remove existing script if any
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      // Use a more permissive API key or guide user to get their own
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMapCallback";
      script.async = true;
      script.defer = true;

      // Global callback function
      window.initMapCallback = initMap;

      script.onerror = () => {
        console.error("Failed to load Google Maps");
        setMapError(true);
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      if (window.initMapCallback) {
        delete window.initMapCallback;
      }
    };
  }, []);

  if (mapError) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Location Map</h3>
        <p className="text-gray-600 mb-4">Darashiv, Maharashtra, India</p>
        <a 
          href="https://maps.google.com/?q=Darashiv, Maharashtra, India"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold text-white px-6 py-2 rounded-lg hover:bg-gold/90 transition-colors"
        >
          Open in Google Maps
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 bg-maroon text-white">
        <h3 className="text-lg font-semibold text-center">Wedding Location</h3>
      </div>
      <div
        id="map"
        style={{
          height: "150px",
          width: "100%",
        }}
      />
      <div className="p-4 bg-cream text-center">
        <p className="text-gray-700">
          <strong>Darashiv, Maharashtra</strong>
          <br />
          February 14, 2024
        </p>
      </div>
    </div>
  );
};

export default MapComponent;