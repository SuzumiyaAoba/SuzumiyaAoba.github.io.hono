import { format } from "date-fns";
import type { FC } from "hono/jsx";
import { Time } from "./icons/time";

export const CalendarDate: FC<{
  date: Date;
}> = ({ date }) => {
  return (
    <div className="flex items-center text-sm">
      <Time width="1rem" height="1rem" />
      <div className="ml-1 no-underline font-sans">
        {format(date, "yyyy/MM/dd")}
      </div>
    </div>
  );
};
