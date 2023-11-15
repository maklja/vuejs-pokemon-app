import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

export function getTailwindScreenSize() {
  const { screens } = resolveConfig(tailwindConfig).theme;
  return Object.entries(screens).reduce(
    (screenSizes, [key, value]) => ({
      ...screenSizes,

      [key]: parseInt(value.slice(0, -2)),
    }),
    {}
  );
}

export function currentTailwindScreenSize() {
  const tailwindScreenSizes = getTailwindScreenSize();
  if (window.innerWidth < tailwindScreenSizes.sm) {
    return '';
  } else if (
    window.innerWidth >= tailwindScreenSizes.sm &&
    window.innerWidth < tailwindScreenSizes.md
  ) {
    return 'sm';
  } else if (
    window.innerWidth >= tailwindScreenSizes.md &&
    window.innerWidth < tailwindScreenSizes.lg
  ) {
    return 'md';
  } else if (
    window.innerWidth >= tailwindScreenSizes.lg &&
    window.innerWidth < tailwindScreenSizes.xl
  ) {
    return 'lg';
  } else if (
    window.innerWidth >= tailwindScreenSizes.xl &&
    window.innerWidth < tailwindScreenSizes['2xl']
  ) {
    return 'xl';
  } else {
    return '2xl';
  }
}
