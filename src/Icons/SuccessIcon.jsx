import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const SuccessIcon = ({ size = 100, color = '#4CAF50' }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <Circle cx="50" cy="50" r="45" stroke={color} strokeWidth="5" />
        <Path
            d="M30 50L45 65L70 35"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default SuccessIcon;
