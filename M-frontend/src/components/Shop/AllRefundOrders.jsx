import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrderFromServer } from "../../features/order/orderAction";
import { RxCross1 } from "react-icons/rx";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllRefundOrders = () => {
  const [open, setOpen] = useState(false);

  const { orderShop } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopOrderFromServer());
  }, []);

  const refundOrders =
    orderShop &&
    orderShop.filter((item) => item.status === "Processing refund" || item.status ==="Refund Success");
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue("status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <AiOutlineArrowRight size={20} />
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQty: item.cart?.length,
        total: "US$" + item?.totalPrice,
        status: item?.status,
      });
    });
  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={20}
          disableSelectionOnClick
          autoHeight
        />

        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
            <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllRefundOrders;
