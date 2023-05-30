import { Text, View, StyleSheet, ScrollView } from "react-native";
import { responsiveFontSize } from "../utils/responsiveFontSize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { EventIcon } from "./EventIcon";

// placeholder type until prisma schema is ready
export type TEvent = {
    title: string,
    category?: "basketball" | "volleyball"
}

export const EventCarousel: React.FC<{ events: TEvent[] }> = ({ events }) => {
    return (
        <View style={styles.carouselContainer}>
            <GestureHandlerRootView>
                <Carousel
                    loop
                    width={responsiveFontSize(100)}
                    height={responsiveFontSize(50)}
                    data={events}
                    mode="parallax"
                    scrollAnimationDuration={1000}
                    snapEnabled={true}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                            </View>
                            <EventIcon size={responsiveFontSize(15)} style={styles.eventIcon} color="white" category={item.category} />
                        </View>
                    )}
                />
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        position: "absolute",
        bottom: responsiveFontSize(17),
    },
    card: {
        flex: 1,
        position: "relative",
        backgroundColor: "black",
        padding: responsiveFontSize(2.5),
        borderRadius: responsiveFontSize(2.5),
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    eventIcon: {
        position: "absolute",
        top: responsiveFontSize(2.5),
        left: responsiveFontSize(2.5),
    },
    title: {
        textAlign: 'center',
        fontSize: responsiveFontSize(10),
        color: "white"
    }
})
