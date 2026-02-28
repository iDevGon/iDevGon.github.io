import { LogoIcon } from '@idevgon/icons';

interface LogoProps {
  height?: number;
  className?: string;
}

const ASPECT_RATIO = 725 / 166;

export const Logo = ({ height = 24, className }: LogoProps) => {
  const width = Math.round(height * ASPECT_RATIO);

  return (
    <LogoIcon width={width} height={height} className={className} />
  );
};
