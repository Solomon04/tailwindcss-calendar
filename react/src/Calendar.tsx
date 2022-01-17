import { FunctionComponent, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import classNames from "./helper";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar: FunctionComponent = () => {
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [numOfDays, setNumOfDays] = useState<number[]>([]);
    const [emptyDays, setEmptyDays] = useState<number[]>([]);

    const isToday = (date: number) => {
        const today = new Date();
        const d = new Date(year, month, date);

        return today.toDateString() === d.toDateString();
    };

    const getNoOfDays = () => {
        let i;
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        // find where to start calendar day of week
        let dayOfWeek = new Date(year, month).getDay();
        let emptyDaysArray = [];
        for (i = 1; i <= dayOfWeek; i++) {
            emptyDaysArray.push(i);
        }

        let daysArray = [];
        for (i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setEmptyDays(emptyDaysArray);
        setNumOfDays(daysArray);
    };

    useEffect(() => {
        getNoOfDays();
        console.log(month, year);
    }, [month]);

    const events = [
        {
            event_date: new Date(2021, 9, 4),
            event_title: "My Birthday :)",
            event_theme: "red"
        },

        {
            event_date: new Date(2021, 11, 25),
            event_title: "Xmas Day",
            event_theme: "green"
        },
        {
            event_date: new Date(2021, 9, 31),
            event_title: "Halloween",
            event_theme: "yellow"
        },
        {
            event_date: new Date(2021, 11, 31),
            event_title: "New Years Eve",
            event_theme: "yellow"
        }
    ];

    const themes = [
        {
            value: "blue",
            label: "Blue Theme"
        },
        {
            value: "red",
            label: "Red Theme"
        },
        {
            value: "yellow",
            label: "Yellow Theme"
        },
        {
            value: "green",
            label: "Green Theme"
        },
        {
            value: "purple",
            label: "Purple Theme"
        }
    ];
    const btnClass = (limit: number) => {
        return classNames(
            month === limit ? "cursor-not-allowed opacity-25" : "",
            "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none"
        );
    };

    const nextMonth = () => {
        setMonth(month + 1);
        getNoOfDays();
    };

    const prevMonth = () => {
        setMonth(month - 1);
        getNoOfDays();
    };

    const eventClass = (t: string) => {
        switch (t) {
            case "blue":
                return "border-blue-200 text-blue-800 bg-blue-100";
            case "red":
                return "border-red-200 text-red-800 bg-red-100";
            case "yellow":
                return "border-yellow-200 text-yellow-800 bg-yellow-1000";
            case "green":
                return "border-green-200 text-green-800 bg-green-100";
            default:
                return "border-purple-200 text-purple-800 bg-purple-100";
        }
    };

    return (
        <>
            <div className="container mx-auto py-4 px-6">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <div>
              <span className="text-lg font-bold text-gray-800">
                {monthNames[month]}
              </span>
                            <span className="ml-1 text-lg text-gray-600 font-normal">
                {year}
              </span>
                        </div>
                        <div className="border rounded-lg px-1 pt-1">
                            {/* Previous Month Button */}
                            <button
                                type="button"
                                onClick={() => prevMonth()}
                                disabled={month === 0}
                                className={btnClass(0)}
                            >
                                <ArrowLeftIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
                            </button>
                            <div className="border-r inline-flex h-6" />
                            {/* Next Month Button */}
                            <button
                                type="button"
                                onClick={() => nextMonth()}
                                disabled={month === 11}
                                className={btnClass(11)}
                            >
                                <ArrowRightIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
                            </button>
                        </div>
                    </div>
                    <div className="-mx-1 -mb-1">
                        <div
                            className="flex flex-wrap -mb-8"
                            style={{ marginBottom: "-30px" }}
                        >
                            {days.map((day) => (
                                <div key={day} className="px-2 py-2 w-[14.28%]">
                                    <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                                        {day}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap">
                            {emptyDays.map((emptyDay) => (
                                <div
                                    key={emptyDay}
                                    className="text-center border-r border-b px-4 pt-2 h-32 w-[14.28%]"
                                />
                            ))}
                            {numOfDays.map((date, index) => (
                                <div
                                    key={index}
                                    className="px-4 pt-2 border-r border-b relative h-32 w-[14.28%]"
                                >
                                    <div
                                        className={classNames(
                                            isToday(date)
                                                ? "bg-blue-500 text-white"
                                                : "text-gray-700 hover:bg-blue-200",
                                            "inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100"
                                        )}
                                    >
                                        {date}
                                    </div>

                                    <div className="overflow-y-auto mt-1 h-20">
                                        {events
                                            .filter(
                                                (e) =>
                                                    new Date(e.event_date).toDateString() ===
                                                    new Date(year, month, date).toDateString()
                                            )
                                            .map((e) => (
                                                <div
                                                    key={e.event_title}
                                                    className={classNames(
                                                        eventClass(e.event_theme),
                                                        "px-2 py-1 rounded-lg mt-1 overflow-hidden border"
                                                    )}
                                                >
                                                    <p className="text-sm truncate leading-tight">
                                                        {e.event_title}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;
