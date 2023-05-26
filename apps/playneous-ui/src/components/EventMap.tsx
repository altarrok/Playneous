import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import * as Location from 'expo-location';


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
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }}
        >
            <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }}
                title={"test"}
                description={"test description"}
            />
        </MapView>
    );

}