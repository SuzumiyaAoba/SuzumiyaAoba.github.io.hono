import { format } from "date-fns";
import type { FC } from "hono/jsx";
import { CalendarDaysIcon } from "./icons";

export const CalendarDate: FC<{
  date: Date;
}> = ({ date }) => {
  return (
    <div className="flex items-center">
      <CalendarDaysIcon />
      <div className="text-sm ml-1 no-underline font-sans">
        {format(date, "yyyy/MM/dd")}
      </div>
    </div>
  );
};
