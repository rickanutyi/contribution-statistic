import { useEffect, useMemo, useState } from "react";
import { Statistic } from "../types";
import { getStatistic } from "../api";
import { formatDate } from "shared/libs";

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}

function isStart(date: Date) {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const isStart = weekStart.getDay() === date.getDay();
    return isStart;
}

export const useGetStatistic = () => {
    const [statistic, setStatistic] = useState<Statistic[] | null>(null);
    const [weeksArray, setWeeksArray] = useState<Statistic[][]>([]);

    const graf: Statistic[] = [];

    const getValue = (date: Date, calendarData: Record<string, number>) => {
        const key = formatDate(date, "yyyy-MM-ee");
        if (calendarData && typeof calendarData[key] === "number") {
            return calendarData[key];
        } else return 0;
    };

    const createGraph = (
        calendarData: Record<string, number>,
        days_amount: number,
        date: Date
    ) => {
        if (graf.length === 0) {
            graf.push({
                date: new Date(),
                value: getValue(new Date(), calendarData),
                day: new Date().getDay(),
                isStartWeek: isStart(new Date()),
            });
        }
        if (graf.length >= 357) {
            setStatistic(graf);
            return;
        } else {
            const previousDay = getPreviousDay(date);
            graf.push({
                date: previousDay,
                value: getValue(previousDay, calendarData),
                day: previousDay.getDay(),
                isStartWeek: isStart(previousDay),
            });
            createGraph(calendarData, days_amount - 1, previousDay);
        }
    };

    useEffect(() => {
        getStatistic().then((res) => {
            if (res) {
                createGraph(res, 0, new Date());
            }
        });
    }, []);

    const w = useMemo(() => {
        console.log(statistic)
        const res: Statistic[][] = [];
        let week = [];
        if (statistic) {
            for (let i = 0; i < statistic?.length; i++) {
                const stat = statistic[i];
                if (stat.date.getDay() > 0) {
                    week.push(stat);
                } else {
                    res.push([stat, ...week.reverse()]);
                    week = [];
                }
            }
            return setWeeksArray(res);
        } else return setWeeksArray([]);
    }, [statistic]);

    return {
        weeksArray,
    };
};
