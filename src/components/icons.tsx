import type { FC, PropsWithChildren } from "hono/jsx";

type Size = 16 | 24;

const DEFAULT_SIZE = 24;
const DEFAULT_CLASS_NAME = "w-6 h-6";

type SvgProps = {
  title: string;
  size?: Size;
  className?: string;
};

type SvgIconProps = Omit<SvgProps, "title">;

const Svg: FC<PropsWithChildren<SvgProps>> = ({
  title,
  size,
  className,
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${size ?? DEFAULT_SIZE} ${size ?? DEFAULT_SIZE}`}
      strokeWidth={1.5}
      stroke="currentColor"
      className={className ?? DEFAULT_CLASS_NAME}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
};

export const CalendarDaysIcon: FC<SvgIconProps> = (props) => {
  return (
    <Svg title="calendar-days" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </Svg>
  );
};

export const TagIcon: FC<SvgIconProps> = (props) => {
  return (
    <Svg title="tag" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6h.008v.008H6V6Z"
      />
    </Svg>
  );
};
