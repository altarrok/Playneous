import { MaterialIcons } from '@expo/vector-icons';
import { StyleProp, TextStyle } from 'react-native/types';

export const EventIcon: React.FC<{ style?: StyleProp<TextStyle>, size: number }> = ({ style, size }) => {
    return (
        <MaterialIcons name="event" size={size} color="white" style={style} />
    );
}