import { MaterialIcons } from '@expo/vector-icons';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native/types';

export const EventIcon: React.FC<{
    size: number,
    category?: "basketball" | "volleyball",
    style?: StyleProp<TextStyle>,
    color?: string | OpaqueColorValue
}> = ({ style, size, color, category }) => {
    switch (category) {
        case "basketball":
            return (
                <MaterialIcons name="sports-basketball" size={size} color={color} style={style} />
            )        
        case "volleyball":
            return (
                <MaterialIcons name="sports-volleyball" size={size} color={color} style={style} />
            )
        default:
            return (
                <MaterialIcons name="event" size={size} color={color} style={style} />
            )
    }
}