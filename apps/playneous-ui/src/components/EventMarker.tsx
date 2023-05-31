import { LatLng, MapMarker, Marker } from "react-native-maps";
import { StyleSheet, View } from 'react-native';
import { responsiveFontSize } from "../utils/responsiveFontSize";
import { EventCallout } from "./EventCallout";
import { EventIcon } from "./EventIcon";
import { forwardRef } from "react";

type TEventMarkerProps = {
    coordinate: LatLng,
    category?: "basketball" | "volleyball"
}

export const EventMarker = forwardRef<MapMarker, TEventMarkerProps>(({ coordinate, category }, ref) => {
    return (
        <Marker
            coordinate={coordinate}
            tracksViewChanges={false}
            ref={ref}
        >
            <View style={styles.container}>
                <EventIcon
                    size={responsiveFontSize(5)}
                    style={styles.marker}
                    color="white"
                    category={category}
                />
                <View style={styles.triangle} />
            </View>
            <EventCallout />
        </Marker>
    );
});

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center"
    },
    marker: {
        backgroundColor: "black",
        padding: responsiveFontSize(1),
        borderRadius: responsiveFontSize(1),
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: responsiveFontSize(1),
        borderRightWidth: responsiveFontSize(0.5),
        borderBottomWidth: 0,
        borderLeftWidth: responsiveFontSize(0.5),
        borderTopColor: 'black',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    }
});