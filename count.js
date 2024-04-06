// import { useEffect, useState } from "react";

// function CountDown() {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   function calculateTimeLeft() {
//     const difference = +new Date("2024-03-15") - +new Date();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return timeLeft;
//   }

//   const timerComponents = Object.keys(timeLeft).map((interval) => {
//     if (!timeLeft[interval]) {
//       return null;
//     }
//     return (
//       <span className="text-[25px] text-[#475ad2]">
//         {timeLeft[interval]} {interval}
//       </span>
//     );
//   });

//   return (
//     <div>
//       {timerComponents.length ? (
//         timerComponents
//       ) : (
//         <span className="text-[red] text-[25px]">Time's up</span>
//       )}
//     </div>
//   );
// }

// export default CountDown;

// let difference = +new Date("2024-03-15") - +new Date();
// difference = difference / 1000;

// console.log(difference);

// function createValue (intialValue){
//     let value = intialValue;

//     function setValue (newValue){
//         value = newValue
//     }

//     return {
//         // get value (){
//         //     return value
//         // },
//         set:setValue
//     }
// }

// const state = createValue("d")

// console.log(state.value)

// state.set("new vakue")
// console.log(state.value)

// {[
//     "Processing",
//     "Transferred to delivery partner",
//     "Shipping",
//     "Received",
//     "On the way",
//     "Delivered",
//   ]
//     .slice(
//       [
//         "Processing",
//         "Transferred to delivery partner",
//         "Shipping",
//         "Received",
//         "On the way",
//         "Delivered",
//       ].indexOf(data?.status)
//     )
//     .map((option, index) => (
//       <option value={option} key={index}>
//         {option}
//       </option>
//     ))}

// {[1, 2, 3, 4, 5].map((i) =>
//     rating >= i ? (
//       <AiFillStar
//         key={i}
//         className="mr-1 cursor-pointer"
//         color="rgba(246,186,0)"
//         size={25}
//         onClick={() => setRating(i)}
//       ></AiFillStar>
//     ) : (
//       <>
//         <AiOutlineStar
//           key={i}
//           className="mr-1 cursor-pointer"
//           color="rgb(246,186,0)"
//           size={25}
//           onClick={() => setRating(i)}
//         />
//       </>
//     )
//   )}

// const [rating, setRating] = useState(1);

// const Processing = [
//   "Processing",
//   "Transferred to delivery partner",
//   "Shipping",
//   "on the way",
//   "Delivered",
// ].slice(
//   [
//     "Processing",
//     "Transferred to delivery partner",
//     "Shipping",
//     "Received",
//     "On the way",
//     "Delivered",
//   ].indexOf("Delivered")
// ).map((option,index)=>{

// return option

// })

// console.log(Processing);

// const value = 5;

// const sellerData = (item) => {};

// const aa = [1, 2, 3, 4, 5].map((item, i) => {
//   return value >= item ? "33" && sellerData(item) : "55" && sellerData(item);
// });

// // console.log(aa);

// console.log(1&2)

const difference = +new Date("2024-04-30") - +new Date();

let timeLeft = {};

if (difference > 0) {
  timeLeft = {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

console.log(timeLeft);
