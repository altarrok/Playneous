import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { responsiveFontSize } from "../utils/responsiveFontSize";
import { GestureHandlerRootView, TapGestureHandler } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { EventIcon } from "./EventIcon";
import { forwardRef } from "react";

// placeholder type until prisma schema is ready
export type TEvent = {
    title: string,
    category?: "basketball" | "volleyball"
}

type TEventCarouselProps = {
    events: TEvent[],
    onSnapToItem?: (index: number) => void,
}

export const EventCarousel = forwardRef<ICarouselInstance, TEventCarouselProps>(({ events, onSnapToItem }, ref) => {

    return (
        <View style={styles.carouselContainer}>
            <GestureHandlerRootView>
                <Carousel
                    loop
                    ref={ref}
                    width={responsiveFontSize(100)}
                    height={responsiveFontSize(50)}
                    data={events}
                    mode="parallax"
                    scrollAnimationDuration={300}
                    snapEnabled={true}
                    onSnapToItem={onSnapToItem}
                    renderItem={({ item, index }) => (
                        <TapGestureHandler onActivated={() => onSnapToItem?.(index)}>
                            <View style={styles.card}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                </View>
                                <EventIcon size={responsiveFontSize(15)} style={styles.eventIcon} color="white" category={item.category} />
                            </View>
                        </TapGestureHandler>
                    )}
                />
            </GestureHandlerRootView>
        </View>
    );
});

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
