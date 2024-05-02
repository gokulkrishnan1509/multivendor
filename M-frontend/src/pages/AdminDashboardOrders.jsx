import React, { useEffect } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdminProduct } from "../features/order/orderAction";
const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllAdminProduct());
  }, []);

  const columns = [
    {field:"id",headerName:"Order ID",minWidth:150,flex:0.7},
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemQty",
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
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrder &&
    adminOrder.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + "$",
        status: item?.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      <div>
        <AdminHeader />

        <div className="w-full flex">
          <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[300px]">
              <AdminSideBar active={2} />
            </div>

            <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
              <div className="w-[97%] flex justify-center">
                <DataGrid
                  rows={row}
                  columns={columns}
                  pageSize={4}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboardOrders;
