import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductShop } from "../../features/products/productService";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";


function AllProducts() {
  const [open, setOpen] = useState(false);
  const { shopProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductShop());
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
  ];

  const row = [];
  shopProduct &&
    shopProduct.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        stock: item.stock,
        sold: 10,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <div className="w-full flex justify-end">
          <div
            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
            onClick={() => setOpen(true)}
          >
            <span className="text-white">Create Coupon Code</span>
          </div>
        </div>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />

        {open && (
          <>
          
                <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                  <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                    <div className="w-full flex justify-end">
                      <RxCross1 size={30} className="cursor-pointer" onClick={()=>setOpen(false)}>


                      </RxCross1>

                    </div>

                    <h5 className="text-[30px] font-Poppins text-center">Create Coupon code</h5>
                    {/* create Coupon code */}

                    {/* <form onSubmit={}></form> */}

                  </div>
                  
                  </div>     

          </>
        )}
      </div>
    </>
  );
}

export default AllProducts;
