import { useEffect, useRef, useState } from "react";
import MapView, { LatLng, MapMarker } from "react-native-maps";
import * as Location from 'expo-location';
import { EventMarker } from "./EventMarker";
import { EventCarousel, TEvent } from "./EventCarousel";

const mockEvents: (TEvent & { location: LatLng })[] = [
    {
        title: "beach volley",
        category: "volleyball",
        location: {
            latitude: 49.2483,
            longitude: -122.867
        }
    },
    {
        title: "spikeball",
        location: {
            latitude: 49.2483,
            longitude: -122.868
        }
    },
    {
        title: "hoop",
        category: "basketball",
        location: {
            latitude: 49.2483,
            longitude: -122.869
        }
    },
]

export const EventMap: React.FC = () => {
    const [location, setLocation] = useState<Location.LocationObject>();
    const [events] = useState(mockEvents);
    const mapRef = useRef<MapView>(null);
    const markerRefs = events.map(event => useRef<MapMarker>(null));

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync();
            setLocation(location);
        })();
    }, []);

    if (!location) {
        return <></>
    }

    return (
        <>
            <MapView
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation={true}
                minZoomLevel={12}
                maxZoomLevel={18}
            >
                {
                    events.map((event, i) => (
                        <EventMarker
                            coordinate={event.location}
                            category={event.category}
                            ref={markerRefs[i]}
                            key={i}
                        />
                    ))
                }
                {/* 
                - When a marker is used, corresponding carousel item is selected
                - When a marker is used, show details in the callout
            */}
            </MapView>
            <EventCarousel
                events={events}
                onSnapToItem={(i) => {
                    mapRef.current?.animateToRegion({
                        ...events[i].location,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    markerRefs[i].current?.showCallout();
                }}
            />
        </>
    );

}