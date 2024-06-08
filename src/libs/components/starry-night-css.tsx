import type { FC } from "hono/jsx";

const StarryNightCss: FC = () => {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/starry-night/core.css" />
      <link rel="stylesheet" href="/assets/css/starry-night/light.css" />
    </>
  );
};

export default StarryNightCss;
