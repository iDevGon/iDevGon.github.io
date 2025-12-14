import { css } from '../../styled-system/css';
import { Flex } from './Flex';

export const Logo = () => {
  return (
    <Flex
      align="end"
      className={css({
        fontSize: '1.6rem',
        color: 'primary',
      })}
    >
      <span className={css({ fontWeight: 'bold' })}>DevGon</span>
      <span>.io</span>
      <span
        className={css({
          width: '0.8rem',
          height: '0.8rem',
          backgroundColor: 'gray.200',
        })}
      />
    </Flex>
  );
};
