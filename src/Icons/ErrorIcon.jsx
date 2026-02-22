import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const ErrorIcon = ({ size = 100, color = '#F83336' }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <Circle cx="50" cy="50" r="45" stroke={color} strokeWidth="5" />
        <Path
            d="M35 35L65 65M65 35L35 65"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default ErrorIcon;
