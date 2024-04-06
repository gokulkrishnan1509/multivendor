import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  event: null,
  success: false,
  error: null,
};

const eventReducter = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearCreateEventSuccess", (state) => {
      state.error = null;
      state.success=false
    })

    .addCase("allEventGetRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("allEventGetSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload.events;
      state.success = true;
    })
    .addCase("allEventGetFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearGetEventError", (state, action) => {
      state.error = null;
      state.success=false
    })
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.deleteEvent = action.payload;
      state.success = true;
    })
    .addCase("deleteEventGetFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearDeleteEvent", (state) => {
      state.error = null;
    });
});

export default eventReducter;
