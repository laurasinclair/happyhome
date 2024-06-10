import { useState, useEffect } from 'react';

const breakpoints = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)'
};

function useBreakpoints() {
  const [breakpointState, setBreakpointState] = useState(() => {
    const initialState = {};
    for (const key in breakpoints) {
      initialState[key] = window.matchMedia(breakpoints[key]).matches;
    }
    return initialState;
  });

  useEffect(() => {
    const handleResize = () => {
      const newState = {};
      for (const key in breakpoints) {
        newState[key] = window.matchMedia(breakpoints[key]).matches;
      }
      setBreakpointState(newState);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpointState;
}

export default useBreakpoints;