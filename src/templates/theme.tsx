import React from 'react';

import { ThemeProvider } from 'styled-components';

import theme from '../styles';

type Props = {
  children: React.ReactNode;
}

export const Theme = ({children}: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
