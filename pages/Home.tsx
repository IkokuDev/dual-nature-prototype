import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { LightSide } from './LightSide';
import { DarkSide } from './DarkSide';

export const Home: React.FC = () => {
  // Receive isDark from Layout
  const { isDark } = useOutletContext<{ isDark: boolean }>();

  return isDark ? <DarkSide /> : <LightSide />;
};