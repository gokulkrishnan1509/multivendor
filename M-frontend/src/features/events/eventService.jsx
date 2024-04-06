import axios from "axios";
import { base_url } from "../../utilies/base_url";

export const CreateEventOnserver = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const { data } = await axios.post(`${base_url}event/event-post`, newForm, {
      withCredentials: true,
    });

    dispatch({ type: "eventCreateSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllEventFromServer = () => async (dispatch) => {
  try {
    dispatch({ type: "allEventGetRequest" });

    const { data } = await axios.get(`${base_url}event/getshop-event`, {
      withCredentials: true,
    });
    dispatch({ type: "allEventGetSuccess", payload: data });
    dispatch({type:"clearGetEventError"})
  } catch (error) {
    dispatch({
      type: "allEventGetFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteEventFromServer = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });
    const { data } = await axios.delete(
      `${base_url}event/deleteshop-event/${id}`,
      { withCredentials: true }
    );

    dispatch({ type: "deleteEventSuccess", payload: data });
    // dispatch(getAllEventFromServer())
    dispatch({type:"clearDeleteEvent"})
  } catch (error) {
    dispatch({
      type: "deleteEventGetFail",
      payload: error.response.data.message,
    });
  }
};




