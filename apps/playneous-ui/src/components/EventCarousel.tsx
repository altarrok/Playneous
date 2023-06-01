import { Text, View, StyleSheet, Animated } from "react-native";
import { responsiveFontSize } from "../utils/responsiveFontSize";
import { GestureHandlerRootView, TapGestureHandler } from "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { EventIcon } from "./EventIcon";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Easing, interpolate, useSharedValue, withTiming } from "react-native-reanimated";
import { TEvent } from "./EventMap";

type TEventCarouselProps = {
    events: TEvent[],
    carouselFocused: boolean,
    onSnapToItem?: (index: number) => void,
}


const itemGap = responsiveFontSize(75);
const centerOffset = responsiveFontSize(10);
const carouselBottomOffset = responsiveFontSize(5);

export const EventCarousel = forwardRef<ICarouselInstance, TEventCarouselProps>(({ events, carouselFocused, onSnapToItem }, ref) => {
    // https://github.com/dohooo/react-native-reanimated-carousel/issues/412
    // Currently, there is a bug in react-native-reanimated-carousel 
    //  that blocks us from animating the scaling of the focused item, 
    //  therefore this value is ignored
    const focusedItemScale = useSharedValue(0.8);

    const animatedCarouselBottomOffset = useRef(new Animated.Value(carouselBottomOffset)).current;

    useEffect(() => {
        focusedItemScale.value = withTiming(carouselFocused ? 1 : 0.8, { duration: 1000, easing: Easing.linear });

        Animated.timing(animatedCarouselBottomOffset, {
            toValue: responsiveFontSize(carouselFocused ? 0 : carouselBottomOffset),
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [carouselFocused, animatedCarouselBottomOffset]);

    const customAnimation = useCallback(
        (value: number) => {
            'worklet';

            const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
            const translateX = interpolate(
                value,
                [-1, 0, 1],
                [-itemGap, 0, itemGap],
            ) + centerOffset;

            const scale = interpolate(
                value,
                [-1, 0, 1],
                [0.8, carouselFocused ? 1 : 0.8, 0.8],
            );

            return {
                transform: [{ translateX }, { scale }],
                zIndex,
            };
        },
        [carouselFocused],
    );


    return (
        <Animated.View style={[styles.carouselContainer, { transform: [{ translateY: animatedCarouselBottomOffset }] }]}>
            <GestureHandlerRootView>
                <Carousel
                    loop
                    ref={ref}
                    width={responsiveFontSize(80)}
                    height={responsiveFontSize(50)}
                    style={styles.carousel}
                    data={events}
                    mode="parallax"
                    scrollAnimationDuration={300}
                    snapEnabled={true}
                    onSnapToItem={onSnapToItem}
                    customAnimation={customAnimation}
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
                >
                </Carousel>
            </GestureHandlerRootView>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        position: "absolute",
        bottom: carouselBottomOffset
    },
    carousel: {
        width: responsiveFontSize(100),
        height: responsiveFontSize(50),
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
