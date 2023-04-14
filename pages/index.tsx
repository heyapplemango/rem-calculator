
import Head from 'next/head';
import { useState } from 'react';
type Breakpoint = 'desktop' | 'mobile' | 'tablet';

const containerStyle = `
  min-h-screen
  flex
  items-center
  justify-center
  bg-gray-800
`;

const calculatorStyle = `
  bg-white
  dark:bg-gray-700
  p-8
  rounded-md
  shadow-md
  w-full
  max-w-md
  space-y-4
`;

const infoStyle = `
  text-gray-300
`;

interface Breakpoints {
  [key: string]: {
    baseFontSize: number;
    width: number;
  };
}

const breakpoints: Breakpoints = {
  desktop: { baseFontSize: 0.5, width: 1920 },
  mobile: { baseFontSize: 0.55, width: 480 },
  tablet: { baseFontSize: 0.5, width: 1024 },
};


export default function Home() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');
  const [pxValue, setPxValue] = useState<number | null>(null);
  const [customWidth, setCustomWidth] = useState<number | null>(null);

  const convertToRem = (px: number, breakpoint: Breakpoint): number => {
    const rootFontSizeVw = breakpoints[breakpoint].baseFontSize;
    const viewportWidth = customWidth || breakpoints[breakpoint].width;
    const rootFontSizePx = (rootFontSizeVw / 100) * viewportWidth;
    return px / rootFontSizePx;
  };

  const handleCustomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setCustomWidth(null);
    } else {
      setCustomWidth(value);
    }
  };

  const handlePxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setPxValue(null);
    } else {
      setPxValue(value);
    }
  };

  const findMatchingBreakpoint = (width: number): Breakpoint => {
    if (width <= breakpoints.mobile.width) {
      return 'mobile';
    } else if (width <= breakpoints.tablet.width) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const activeBreakpoint = customWidth ? findMatchingBreakpoint(customWidth) : breakpoint;

  const handleBreakpointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreakpoint(e.target.value as Breakpoint);
  };
  return (
    <div className={`${containerStyle} dark`}>
      <Head>
        <title>haha hoho</title>
      </Head>
      <div className={calculatorStyle}>
        <div className={infoStyle}>
          <p>Current Breakpoint: {activeBreakpoint}</p>
          <p>Base Font Size: {breakpoints[activeBreakpoint].baseFontSize}vw</p>
          <p>Width: {customWidth || breakpoints[breakpoint].width}px</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>
            <label className="block mb-2 text-white font-bold">Select</label>
            <select
              className="border p-2"
              value={breakpoint}
              onChange={handleBreakpointChange}
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-white font-bold">Width (Optinal)</label>
            <input
              className="border p-2"
              type="text"
              onChange={handleCustomWidthChange}
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-white font-bold">Enter px value:</label>
          <div className="flex flex-row justify-between items-center">
            <input
              className="border p-2"
              type="text"
              onChange={handlePxInputChange}
            />
            {pxValue !== null && (
              <div className="font-bold text-lime-500">
                <p>
                  {convertToRem(pxValue, activeBreakpoint).toFixed(2)}rem
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}
