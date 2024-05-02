import { useEffect } from "react";
import { getAllEventAdminFromServer } from "../../features/events/eventService";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineEye } from "react-icons/ai";

const AllEventsAdmin = function () {
  const { getAllEvent } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEventAdminFromServer());
  }, []);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "Stock", headerName: "Stock", minWidth: 80, flex: 0.5 },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "",
      type: "number",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  getAllEvent &&
    getAllEvent.forEach((item) => {
      row.push({
        id: items._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        Stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
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
};

export default AllEventsAdmin;
