import classNames from "classnames";
import classes from "./cell.module.scss";

import { ReactComponent as TriangleIcon } from "assets/corner.svg";
import { formatDate } from "shared/libs";
import { useRef, useState } from "react";
import { useOutsideClick } from "shared/hooks";

type Fullness = 0 | 1 | 2 | 3 | 4;
type CellProps = {
    fullness: Fullness;
    date: Date;
    value: number;
};
function Cell({ fullness, date, value }: CellProps) {
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
                <div className={classes.cell__tooltip_bottom}>
                    {formatDate(new Date(), "eeee, MM MMMM, yyyy")}
                </div>
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
