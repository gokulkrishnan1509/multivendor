import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventsCard";

const EventsPage = function () {
  return (
    <>
      <Header activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />

    </>
  );
};

export default EventsPage;
