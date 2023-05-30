import { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";

import * as Location from 'expo-location';
import { EventMarker } from "./EventMarker";


export const EventMap: React.FC = () => {
    const [location, setLocation] = useState<Location.LocationObject>();


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
        <MapView
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
            <EventMarker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
            />
            {/* 
                - Create a carousel (https://github.com/dohooo/react-native-reanimated-carousel)
                - When carousel item is selected, move the map to that event's location
                - When a marker is used, corresponding carousel item is selected
                - When a marker is used, show details in the callout
            */}
        </MapView>
    );

}