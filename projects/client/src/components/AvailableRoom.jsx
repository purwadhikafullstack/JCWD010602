// PROP-31 Report - As a tenant, I can see my property and rooms showed in calendars.
//Tenant dapat melihat properti dan juga kamar yang dimiliki berdasarkan status ketersediaannya dalam bentuk kalender

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Badge } from "@chakra-ui/react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Room 101",
    start: moment().add(1, "days").toDate(),
    end: moment().add(2, "days").toDate(),
    isAvailable: true,
  },
  {
    title: "Room 102",
    start: moment().add(3, "days").toDate(),
    end: moment().add(4, "days").toDate(),
    isAvailable: false,
  },
];

const Event = ({ event }) => (
  <Badge colorScheme={event.isAvailable ? "green" : "red"}>{event.title}</Badge>
);

const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      components={{ event: Event }}
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
