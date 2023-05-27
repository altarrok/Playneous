import { LatLng, Marker } from "react-native-maps";
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { responsiveFontSize } from "../utils/responsiveFontSize";


export const EventMarker: React.FC<{
    coordinate: LatLng
}> = ({ coordinate, }) => {
    return (
        <Marker
            coordinate={coordinate}
            tracksViewChanges={false}
        >
            <View style={styles.container}>
                <MaterialIcons name="event" size={responsiveFontSize(5)} color="white" style={styles.marker} />
                <View style={styles.triangle} />
            </View>
        </Marker>
    );
}

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