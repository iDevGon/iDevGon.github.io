import { cva } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const containerStyle = cva({
  base: {
    width: '100%',
    marginInline: 'auto',
    maxWidth: {
      base: '100%',
      tablet: '768px',
      desktop: '1200px',
    },
    paddingInline: {
      base: '1.6rem',
      tablet: '2.4rem',
      desktop: '3.2rem',
    },
    paddingBlock: '3.2rem',
  },
});

export const Container = styled('div', containerStyle);
