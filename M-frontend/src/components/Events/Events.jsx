
import React, { useEffect } from "react";
import styles from "../../styles/styles";
import EventCard from "./EventsCard"
import { useDispatch, useSelector } from "react-redux";
import { getAllEventFromServer } from "../../features/events/eventService";

const Events =()=>{
    const {event}= useSelector((state)=>state.event)
const dispatch = useDispatch()
 useEffect(()=>{
    dispatch(getAllEventFromServer())
 },[])

    return (
        <>

{/* heading:"text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]", */}

        <div>
            <div className="w-11/12 mx-auto">
            <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
               <h1>Popular Events</h1>
            </div>
            <div className="w-full grid">
             <EventCard/>
            </div>
            </div>
        </div>
        
        </>
    )
}

export default Events