import { useEffect, useRef, useState } from "react";
import MapView, { LatLng, MapMarker } from "react-native-maps";
import * as Location from 'expo-location';
import { EventMarker } from "./EventMarker";
import { EventCarousel, TEvent } from "./EventCarousel";
import { ICarouselInstance } from "react-native-reanimated-carousel";

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
    {
        title: "hoop",
        category: "basketball",
        location: {
            latitude: 49.2483,
            longitude: -122.870
        }
    },
    {
        title: "hoop",
        category: "basketball",
        location: {
            latitude: 49.2483,
            longitude: -122.866
        }
    },
    {
        title: "hoop",
        category: "basketball",
        location: {
            latitude: 49.2483,
            longitude: -122.865
        }
    },
    {
        title: "hoop",
        category: "basketball",
        location: {
            latitude: 49.2483,
            longitude: -122.864
        }
    },
    {
        title: "hoop",
        category: "basketball",
        location: {
            latitude: 49.2483,
            longitude: -122.871
        }
    },
]

export const EventMap: React.FC = () => {
    const [location, setLocation] = useState<Location.LocationObject>();
    const [events] = useState(mockEvents);
    const [carouselFocused, setCarouselFocused] = useState(false);
    const mapRef = useRef<MapView>(null);
    const carouselRef = useRef<ICarouselInstance>(null);
    const markerRefs = events.map(() => useRef<MapMarker>(null));

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
                onPress={() => setCarouselFocused(false)}
            >
                {
                    events.map((event, i) => (
                        <EventMarker
                            coordinate={event.location}
                            category={event.category}
                            ref={markerRefs[i]}
                            onPress={() => {
                                // Known issue: the scroll to index is not working properly
                                carouselRef.current?.scrollTo({
                                    index: i,
                                    animated: true,
                                });
                                setCarouselFocused(true);
                            }}
                            key={i}
                        />
                    ))
                }
            </MapView>
            <EventCarousel
                ref={carouselRef}
                events={events}
                onSnapToItem={(i) => {
                    mapRef.current?.animateToRegion({
                        ...events[i].location,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    markerRefs[i].current?.showCallout();
                    setCarouselFocused(true);
                }}
                carouselFocused={carouselFocused}
            />
        </>
    );

}