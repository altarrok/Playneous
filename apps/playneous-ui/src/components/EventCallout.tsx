import { Callout } from "react-native-maps";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { responsiveFontSize } from "../utils/responsiveFontSize";

export const EventCallout: React.FC = () => {
    return (
        <Callout tooltip>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                        <Text style={styles.text}>We are playing basketball</Text>
                </View>
                <View style={styles.subContainer}>
                        <Text style={styles.text}>604 440 67 63</Text>
                </View>
            </View>
        </Callout>
    );
}

const styles = StyleSheet.create({
    container: {
        width: responsiveFontSize(62),
        height: responsiveFontSize(53),
        borderRadius: responsiveFontSize(2),
        padding: responsiveFontSize(1),
        backgroundColor: 'black',
        marginBottom: responsiveFontSize(1),
        display: "flex",
        flexDirection: 'column',
        gap: responsiveFontSize(1),
    },
    subContainer: {
        padding: responsiveFontSize(2.5),
        borderRadius: responsiveFontSize(2),
        width: responsiveFontSize(60),
        height: responsiveFontSize(25),
        backgroundColor: "#242424"
    },
    text: {
        color: "white",
        fontSize: responsiveFontSize(5)
    },
});