import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

const ProcessingIcon = ({ size = 100, color = '#F76627' }) => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotation]);

    const rotateData = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: rotateData }] }}>
            <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
                <Circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    strokeDasharray="200"
                />
                <Path
                    d="M50 10A40 40 0 0 1 90 50"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                />
            </Svg>
        </Animated.View>
    );
};

export default ProcessingIcon;
