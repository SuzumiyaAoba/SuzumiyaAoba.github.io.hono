import type { FC } from "hono/jsx";

export const Nix: FC<{
  height: string;
  width: string;
}> = ({ width, height }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Nix"
    >
      <path
        d="M13,11.115,6.183,23.76,4.59,20.87l1.839-3.387-3.651-.01L2,16.029l.8-1.477,5.2.018,1.868-3.447Z"
        style="fill:#7ebae4;fill-rule:evenodd"
      />
      <path
        d="M13.527,21.223h13.64l-1.541,2.922-3.658-.011,1.817,3.389-.779,1.449-1.593,0-2.584-4.825-3.722-.008Z"
        style="fill:#7ebae4;fill-rule:evenodd"
      />
      <path
        d="M21.467,15.682,14.647,3.037l3.134-.032L19.6,6.4l1.834-3.379h1.557L23.786,4.5,21.174,9.307l1.854,3.455Z"
        style="fill:#7ebae4;fill-rule:evenodd"
      />
      <path
        d="M10.542,16.324l6.821,12.645L14.229,29l-1.821-3.4-1.834,3.38H9.016l-.8-1.476L10.831,22.7,8.976,19.243Z"
        style="fill:#5277c3;fill-rule:evenodd"
      />
      <path
        d="M18.464,10.751H4.823L6.365,7.829l3.658.011L8.207,4.451,8.986,3l1.592,0,2.584,4.825,3.722.008Z"
        style="fill:#5277c3;fill-rule:evenodd"
      />
      <path
        d="M19,20.888,25.817,8.244l1.593,2.89L25.571,14.52l3.651.01L30,15.979l-.8,1.477-5.2-.018-1.868,3.447Z"
        style="fill:#5277c3;fill-rule:evenodd"
      />
    </svg>
  );
};
