import React from 'react';
import Svg, { Path, Circle, Rect, Polyline, Line } from 'react-native-svg';

export const ProfileUserIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <Circle cx="12" cy="7" r="4" />
    </Svg>
);

export const WalletIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />
        <Path d="M21 12H17v-1.5a1.5 1.5 0 0 0-1.5-1.5h0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h0a1.5 1.5 0 0 0 1.5-1.5V12" />
    </Svg>
);

export const BankIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="2" y="5" width="20" height="14" rx="2" />
        <Line x1="2" y1="10" x2="22" y2="10" />
    </Svg>
);

export const ShieldIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Svg>
);

export const ShieldCheckIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <Path d="M9 12l2 2 4-4" />
    </Svg>
);

export const QuestionIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="10" />
        <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <Line x1="12" y1="17" x2="12.01" y2="17" />
    </Svg>
);

export const LockIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Svg>
);

export const ChevronRightIcon = ({ size = 24, color = '#9E9E9E' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Polyline points="9 18 15 12 9 6" />
    </Svg>
);

export const EyeIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <Circle cx="12" cy="12" r="3" />
    </Svg>
);

export const EyeOffIcon = ({ size = 24, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <Line x1="1" y1="1" x2="23" y2="23" />
    </Svg>
);
