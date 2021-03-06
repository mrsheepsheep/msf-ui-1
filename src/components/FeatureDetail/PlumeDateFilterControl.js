import { Arrow } from "react-popper";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import moment from "moment";

import MiscUtil from "_core/utils/MiscUtil";
import styles from "components/LayerMenu/LayerDateControlStyles.scss";

export class PlumeDateFilterControl extends Component {
    updateDatePart(event, period) {
        let value = event.target.value;
        const newDate = moment(this.props.currentDate);
        switch (period) {
            case "year":
                newDate.year(value);
                break;
            case "month":
                newDate.month(value);
                break;
            case "day":
                newDate.date(value);
                break;
        }
        if (this.props.currentDate.isSame(newDate)) return;
        this.props.updateDateFunction(newDate);
    }

    render() {
        const currentDate = this.props.currentDate;
        const duration = moment.duration(this.props.latestDate.diff(this.props.earliestDate));

        const yearList = [];
        for (let i = 0; i <= duration.years(); i++) {
            yearList.push(this.props.earliestDate.year() + i);
        }

        const startMonth = this.props.currentDate.isSame(this.props.earliestDate, "year")
            ? this.props.earliestDate.month()
            : 0;
        const endMonth = this.props.currentDate.isSame(this.props.latestDate, "year")
            ? this.props.latestDate.month()
            : 11;
        const monthList = moment.monthsShort().slice(startMonth, endMonth + 1);

        const startDay = this.props.currentDate.isSame(this.props.earliestDate, "month")
            ? this.props.earliestDate.date()
            : 1;
        const endDay = this.props.currentDate.isSame(this.props.latestDate, "month")
            ? this.props.latestDate.date()
            : this.props.currentDate.daysInMonth();
        const dayList = Array(endDay - startDay + 1)
            .fill()
            .map((_, idx) => startDay + idx);

        const yearClass = MiscUtil.generateStringFromSet({
            [styles.dateSelector]: true,
            [styles.yearSelector]: true
        });

        const monthClass = MiscUtil.generateStringFromSet({
            [styles.dateSelector]: true,
            [styles.monthSelector]: true
        });

        const dayClass = MiscUtil.generateStringFromSet({
            [styles.dateSelector]: true,
            [styles.daySelector]: true
        });

        return (
            <div>
                <Paper elevation={8} className={styles.dateControl}>
                    <FormGroup row>
                        <FormControl className={yearClass}>
                            <InputLabel htmlFor={"year-select-" + this.props.popperId}>
                                Year
                            </InputLabel>
                            <Select
                                value={currentDate.year()}
                                autoWidth={true}
                                input={
                                    <Input name="Year" id={"year-select-" + this.props.popperId} />
                                }
                                onChange={event => this.updateDatePart(event, "year")}
                            >
                                {yearList.map(year => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={monthClass}>
                            <InputLabel htmlFor={"month-select-" + this.props.popperId}>
                                Month
                            </InputLabel>
                            <Select
                                value={currentDate.format("MMM")}
                                autoWidth={true}
                                input={
                                    <Input
                                        name="Month"
                                        id={"month-select-" + this.props.popperId}
                                    />
                                }
                                onChange={event => this.updateDatePart(event, "month")}
                            >
                                {monthList.map(month => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={dayClass}>
                            <InputLabel htmlFor={"day-select-" + this.props.popperId}>
                                Day
                            </InputLabel>
                            <Select
                                value={currentDate.date()}
                                autoWidth={true}
                                input={
                                    <Input name="Day" id={"day-select-" + this.props.popperId} />
                                }
                                onChange={event => this.updateDatePart(event, "day")}
                            >
                                {dayList.map(day => (
                                    <MenuItem key={day} value={day}>
                                        {day}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <Button
                        color="primary"
                        className={styles.doneButton}
                        onClick={this.props.onClose}
                    >
                        Done
                    </Button>
                </Paper>
                <Arrow className={styles.popperArrow} />
            </div>
        );
    }
}

PlumeDateFilterControl.propTypes = {
    currentDate: PropTypes.object,
    earliestDate: PropTypes.object,
    latestDate: PropTypes.object,
    updateDateFunction: PropTypes.func,
    popperId: PropTypes.string, // To label date selector if it is a start or end date, otherwise get dup ids
    onClose: PropTypes.func
};

export default PlumeDateFilterControl;
