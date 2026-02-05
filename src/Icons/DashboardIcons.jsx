import React from 'react';
import Svg, {
  Path,
  Rect,
  Circle,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

export const PendingOrderIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect width={size} height={size} fill="" />
    <Path
      d="M5 9L5 20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V9M5 9L9 3H15L19 9M5 9H19"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="14" r="2" stroke="#FF5722" strokeWidth="2" />
  </Svg>
);

export const OutOfStockIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 21L21 21"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 21V7L12 3L19 7V21H5Z"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 10C9 10 10 12 12 12C14 12 15 10 15 10"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TotalProductsIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 6H21"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 12H21"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 18H21"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 6H3.01"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 12H3.01"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 18H3.01"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TotalRevenueIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 4H23"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x="1"
      y="8"
      width="22"
      height="12"
      rx="2"
      stroke="#FF5722"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="18" cy="14" r="2" stroke="#FF5722" strokeWidth="2" />
  </Svg>
);

export const NotificationIcon = ({ size = 24, hasBadge = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21A2 2 0 0 1 10.27 21"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {hasBadge && <Circle cx="18" cy="5" r="4" fill="red" />}
  </Svg>
);

export const MessageIcon = ({ size = 24, hasBadge = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {hasBadge && <Circle cx="18" cy="5" r="4" fill="red" />}
  </Svg>
);

export const SearchIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="11"
      cy="11"
      r="8"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L16.65 16.65"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BackArrowIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 19L5 12L12 5"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
