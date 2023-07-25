import { useRef, useState } from "react";
import classNames from "classnames";
import classes from "./cell.module.scss";

import { ReactComponent as TriangleIcon } from "assets/corner.svg";
import { useOutsideClick } from "shared/hooks";

import { daysOfWeekArray, monthsArray } from "../model";

type Fullness = 0 | 1 | 2 | 3 | 4;
type CellProps = {
    fullness: Fullness;
    date: Date;
    value: number | string;
    view?: boolean;
};

function Cell({ fullness, date, value, view }: CellProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => setShowTooltip(false));

    return (
        <div
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(!showTooltip);
            }}
            className={classNames(classes.cell, classes[`cell_${fullness}`])}
        >
            <div
                className={classNames(classes.cell__tooltip, {
                    [classes.show]: showTooltip,
                })}
            >
                <div className={classes.cell__tooltip_top}>
                    {value} contributions
                </div>
                {!view && (
                    <div className={classes.cell__tooltip_bottom}>
                        {/* {format(date, "eeee, MM MMMM, yyyy")} */}
                        {`${
                            daysOfWeekArray[date.getDay()]
                        }, ${date.getDate()} ${
                            monthsArray[date.getMonth()]
                        }, ${date.getFullYear()}`}
                    </div>
                )}
            </div>
            <div
                className={classNames(classes.cell__triangle, {
                    [classes.show]: showTooltip,
                })}
            >
                <TriangleIcon />
            </div>
        </div>
    );
}

export default Cell;
