import { styled } from 'styled-system/jsx';

export const Flex = styled('div', {
  base: {
    display: 'flex',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      'space-between': { justifyContent: 'space-between' },
      end: { justifyContent: 'flex-end' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
    },
    wrap: {
      wrap: { flexWrap: 'wrap' },
      nowrap: { flexWrap: 'nowrap' },
    },
  },
});
