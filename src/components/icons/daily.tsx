import type { FC } from "hono/jsx";

export const Daily: FC<{
  height: string;
  width: string;
}> = ({ width, height }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Daily"
    >
      <path
        fill="#394240"
        d="M60,4H48c0-2.211-1.789-4-4-4s-4,1.789-4,4H24c0-2.211-1.789-4-4-4s-4,1.789-4,4H4C1.789,4,0,5.789,0,8v52 c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M56,56H8V28h48V56z M56,20H8v-8h8c0,2.211,1.789,4,4,4 s4-1.789,4-4h16c0,2.211,1.789,4,4,4s4-1.789,4-4h8V20z"
      />
      <rect x="8" y="28" fill="#F9EBB2" width="48" height="28" />
      <path
        fill="#F76D57"
        d="M56,20H8v-8h8c0,2.211,1.789,4,4,4s4-1.789,4-4h16c0,2.211,1.789,4,4,4s4-1.789,4-4h8V20z"
      />
    </svg>
  );
};
