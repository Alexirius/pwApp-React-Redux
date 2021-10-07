/*  Just a smile.
    Simple svg-animation. Sorry, I'm not a painter... to my great regret
*/

import React from 'react';
import './Logo.css';

const Logo = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" version="1.0" viewBox="0 0 1309.34 1083.41">
            <g id="parrot">
                <rect id='back' className="back" x="-0" y="-0" width="1315.42" height="1208.04"/>
                <g id="Back_Wing">
                    <path id="Outer1" className="wings2" d="M931.13 705.21c-0.29,-90.48 102.55,-251.65 173.5,-319.74 16.46,-15.78 29.41,-51.33 24.8,-117.16 -2.06,-29.29 -7.94,-59.96 -21.72,-92.57 0,0 -6.07,-29.86 -39.35,-83.53 -57.81,-93.18 -241.39,-163.38 -212.11,35.11 8.76,59.43 40.03,120.19 58.65,145.27 -11.97,-5.84 -71.42,-39.24 -95.09,-9.87 -30.27,37.57 84.51,122.99 84.51,122.99 -30.04,-11.77 -70.63,-19.81 -82.78,4.01 -17.02,33.44 41.59,83.5 41.59,83.5 -17.5,1.5 -48.51,0.51 -54.23,17.44 -5.72,16.92 19.52,52.36 30.87,62.12 -32.63,3.63 -49.03,18.01 -49.21,32.17 -1.59,15.06 20.91,45.08 55.6,67.24 -19.75,37.33 1.55,78.3 18.79,87.02 16.51,8.36 32.52,6.78 48.37,-2.6 7.48,-4.35 17.85,-13.24 17.78,-31.39l0.01 -0z" />
                    <path id="Inner1" className="wings1" d="M931.13 705.21c-0.29,-90.48 102.55,-251.65 173.5,-319.74 16.46,-15.78 29.41,-51.33 24.8,-117.16 -2.06,-29.29 -7.94,-59.96 -21.72,-92.57 -20.12,-48.5 -103.91,-141.4 -159.09,-128.1 -98.23,23.68 36.54,267.24 36.54,267.24 -195.74,-56.7 -21,98.65 -21,98.65 -177.57,-32.87 -46.57,79.86 -46.57,79.86 -122.49,-3.29 -24.08,80.77 -24.08,80.77 -103.85,4.4 -47.34,78.04 -47.34,78.04 -19.75,37.33 1.55,78.3 18.79,87.02 16.51,8.36 32.52,6.78 48.37,-2.6 7.48,-4.36 17.85,-13.25 17.78,-31.4l-0 -0z" />
                    <animateTransform attributeName="transform"
                        type="scale"
                        from="1 1" to="1 -0.4"
                        begin="parrot.mouseenter" dur="0.4s"
                        repeatCount="2" restart="whenNotActive"
                    />
                </g>
                <path id="Back_Foot" className="foot" d="M950.75 874.46c-19.86,-17.34 -55.61,-36.66 -63.55,-34.31 -11.74,3.43 -27.45,13.73 -39.37,16.62 24.2,9.75 83.42,32.5 84.87,37.92 4.01,15.06 -4.69,24.74 -2.89,40.45 1.09,8.85 11.2,14.08 19.51,11.55 7.58,-2.35 9.21,-9.38 13,-16.61 14.8,-28.17 48.94,-16.07 80.17,-11.56 13.72,1.99 33.04,-5.24 30.33,-18.78 -3.61,-17.34 -27.2,-22.42 -71.64,-26.55 41.35,-7.23 54.13,-25.81 44.92,-32.67 -10.11,-7.59 -19.14,-7.95 -31.78,-6.5 -29.44,3.62 -48.76,14.81 -63.56,40.45l-0 0z" data-paper-data="{&quot;index&quot;:null}" />
                <g id="Body">
                    <path id="Body" className="body" d="M1004.89 692.74c1.14,-6.8 3.04,-13.92 5.71,-21.48 15.5,-43.92 47.54,-70.02 91.99,-84.74 6.9,-2.28 14.1,-4.4 21.47,-6.29 32.64,-8.34 68.76,-11.51 98.64,1.34 -4.86,-5.91 -10.67,-11.85 -17.78,-17.79 -95.22,-79.47 -212.4,-39.27 -318.33,26.87 -81.13,50.64 -287.34,190.18 -343.15,179.84 -183.07,-135.02 -248.04,-113.7 -262.51,-84.76 -13.44,27.39 17.57,57.88 42.38,76.48 -44.58,7.62 -70.42,4.52 -73.38,35.15 -2.72,28.08 37.2,32.04 65.11,39.27 -24.81,10.33 -45.88,26.69 -36.31,46.89 9.31,19.64 56.85,23.77 85.79,15.5 -15.5,28.94 -37.2,96.12 30.11,71.97 62.51,-22.43 98.18,-56.84 150.9,-99.22 81.65,84.75 202.57,122.99 261.48,100.25 103.12,-39.79 164.49,-134.33 200.16,-241.85 -3.67,-11.78 -4.54,-23.96 -2.27,-37.45l0 0z" />
                    <path id="Eye_Spot" className="eye-spot" d="M1102.59 586.51c6.9,-2.28 14.1,-4.4 21.47,-6.29 -42.74,-35.2 -100.82,-29.17 -154.32,-5.14 -33.75,15.19 -56.91,51.66 -35.87,79.77 25.36,33.89 57.38,40.58 71.03,37.87 1.14,-6.8 3.04,-13.92 5.71,-21.48 15.5,-43.93 47.53,-70.03 91.98,-84.75l0 0.01z" />
                    <path id="Beak" className="beak" d="M1235.92 588.58c-4.24,-2.75 -8.66,-5.06 -13.23,-7.02 -29.88,-12.85 -66,-9.68 -98.64,-1.34 -7.36,1.88 -14.57,4 -21.47,6.29 -44.44,14.72 -76.48,40.82 -91.99,84.74 -2.66,7.56 -4.56,14.68 -5.71,21.48 -2.27,13.49 -1.4,25.67 2.26,37.44 4.34,13.91 12.65,27.23 25.16,41.34 28.17,31.79 78.41,49.22 112.52,22.09 -28.42,-9.31 -42.76,-37.84 -39.14,-67.56 86.68,-29.59 149.73,105.8 168.47,192.24 97.34,-213.39 -38.25,-329.69 -38.25,-329.69z" />
                </g>
                <path id="Front_Foot" className="foot" d="M910.4 981.46c-24.2,-28.94 -69.43,-65.9 -83.89,-71.07 -13.45,12.41 -40.13,21.61 -57.62,23.02 39.01,20.39 99.98,40.03 111.46,72.59 7.41,21.03 -12.17,33.92 -13.14,56.52 -0.45,12.75 12.67,22.41 24.98,20.7 11.24,-1.62 15.12,-11.2 22.1,-20.57 27.23,-36.49 72.76,-11.76 115.9,1.62 18.95,5.88 47.87,-0.01 47.08,-19.75 -1.22,-25.3 -54.39,-57.64 -111.23,-50.4 15.5,-15.5 92.09,2.07 85.79,-29.97 -3.49,-17.75 -24.34,-24.83 -42.53,-25.61 -42.41,-1.48 -72.22,10.02 -98.89,42.94l-0 0z" data-paper-data="{&quot;index&quot;:null}" />
                <g id="Eye">
                    <path id="White" className="white" d="M1079.01 596.93c-20.34,-22.82 -61.44,-19.39 -79.78,1.48 -11.22,12.76 -14.47,41.34 5.4,56.1 50.9,37.82 108.67,-19.13 74.38,-57.58l0 0z" />
                    <path id="Pupil" className="black" d="M1054.93 622.33c-2.98,2.68 -4.82,6.37 -4.82,10.45 0,4.08 1.84,7.78 4.82,10.45 2.98,2.68 7.09,4.34 11.63,4.34 4.54,0 8.65,-1.66 11.63,-4.34 2.98,-2.68 4.82,-6.37 4.82,-10.45 0,-4.08 -1.84,-7.78 -4.82,-10.45 -2.98,-2.68 -7.09,-4.34 -11.63,-4.34 -4.54,0 -8.65,1.66 -11.63,4.34z" />
                    <animateTransform attributeName="transform"
                        type="scale"
                        from="1 1" to="1 0"
                        begin="parrot.mouseenter+1s" dur="0.4s"
                        restart="whenNotActive"
                    />
                </g>
                <g id="Front_Wing">
                    <path id="Outer2" className="wings2" d="M865.13 665.11c-108.78,-58.96 -235.17,-287.34 -270.62,-416.64 -8.22,-29.97 -42.44,-68.74 -124.45,-106.38 -36.5,-16.76 -77.13,-29.83 -125.25,-34.76 0,0 -39.79,-12.34 -125.9,-7.79 -149.5,7.9 -353.41,180.97 -96.12,276.14 77.03,28.5 170.34,31 212.58,25.23 -14.82,10.46 -93.64,59.52 -73.83,107 25.36,60.77 202.68,-20.23 202.68,-20.23 -33.71,28.13 -69.81,71.31 -49.13,101.42 29.03,42.24 127.31,5.11 127.31,5.11 -9.61,21.86 -31.01,58.22 -14.43,76.14 16.58,17.91 75.56,11.02 94.69,3.88 -16.91,41.32 -10.35,70.31 6.53,79.8 17.04,11.77 67.73,4.6 116.94,-22.26 31.93,48.04 94.98,49.46 116.69,34.61 20.8,-14.21 29.33,-34.37 28.43,-59.43 -0.36,-11.79 -4.29,-29.98 -26.11,-41.82l-0.01 0z" />
                    <path id="Inner2" className="wings1" d="M865.13 665.11c-108.78,-58.96 -235.17,-287.34 -270.62,-416.64 -8.22,-29.97 -42.44,-68.74 -124.45,-106.38 -36.5,-16.76 -77.13,-29.83 -125.25,-34.76 -71.31,-7.79 -237.43,31.31 -257.43,105.88 -35.6,132.75 344.55,131.56 344.55,131.56 -195.64,196.43 104.7,89.72 104.7,89.72 -155.2,190.37 65.48,107.91 65.48,107.91 -83.79,144.03 81.23,81.69 81.23,81.69 -62.4,126.8 62.8,107.65 62.8,107.65 31.93,48.04 94.98,49.46 116.69,34.61 20.8,-14.21 29.33,-34.37 28.43,-59.43 -0.36,-11.78 -4.29,-29.97 -26.11,-41.8l-0 0.01z" />
                    <animateTransform attributeName="transform"
                        type="scale"
                        from="1 1" to="1 -0.7"
                        begin="parrot.mouseenter" dur="0.4s"
                        repeatCount="2"
                        restart="whenNotActive"
                    />
                </g>
            </g>
        </svg>
    )
}
export default Logo;