import classes from "./main-page.module.scss";

import { useGetStatistic } from "entities/statistic/model";
import Cell from "entities/statistic/ui/Cell";

function MainPage() {
    const { weeksArray: statistic } = useGetStatistic();
    const getfullness = (value: number) => {
        return value === 0
            ? 0
            : value > 0 && value <= 9
            ? 1
            : value > 9 && value <= 19
            ? 2
            : value > 19 && value <= 29
            ? 3
            : 4;
    };
    return (
        <>
            <div className={classes.graf}>
                {statistic
                    ? statistic.map((week, t) => {
                          return (
                              <div key={"week" + t} className={classes.column}>
                                  {week.map((day, i) => {
                                      const fullness = getfullness(day.value)
                                      return (
                                          <Cell
                                              key={i}
                                              date={day.date}
                                              fullness={fullness}
                                              value={day.value}
                                          />
                                      );
                                  })}
                              </div>
                          );
                      })
                    : null}
            </div>
            <div className={classes.info}>
                <span>Меньше</span>
                <div>
                    <Cell date={new Date()} fullness={0} value={0} view />
                    <Cell date={new Date()} fullness={1} value={0} view />
                    <Cell date={new Date()} fullness={2} value={0} view />
                    <Cell date={new Date()} fullness={3} value={0} view />
                    <Cell date={new Date()} fullness={4} value={0} view />
                </div>
                <span>Больше</span>
            </div>
        </>
    );
}

export default MainPage;
