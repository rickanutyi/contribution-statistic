import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (
    date: Date | number,
    date_format: string,
    options?: {
        weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        firstWeekContainsDate?: number;
        useAdditionalWeekYearTokens?: boolean;
        useAdditionalDayOfYearTokens?: boolean;
    }
) => {
    return format(date, date_format, {
        locale: ru,
        ...options,
    });
};
