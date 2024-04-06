import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { deleteEventFromServer, getAllEventFromServer } from "../../features/events/eventService";

function AllEvents() {
  const dispatch = useDispatch();
  const { allEvents } = useSelector((state) => state.event);

  const handleDelete =(id)=>{
    dispatch(deleteEventFromServer(id))
  }
  useEffect(() => {
    // const timeOut = setTimeout(() => {
      dispatch(getAllEventFromServer());
    // });

    // return () => {
      // clearTimeout(timeOut);
    // };
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,

      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <button>
                <AiOutlineEye size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell:(params)=>{
        // console.log(params)
        return(
          <>
           <button onClick={()=>handleDelete(params.id)}>
            <AiOutlineDelete size={20}/>
           </button>
          </>
        )
      }
    },
  ];

  const row = [];

  allEvents &&
    allEvents.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        Stock: item.stock,
        sold: 10,
      });
    });

  return (
    <>
      <div className="W-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
}

export default AllEvents;
