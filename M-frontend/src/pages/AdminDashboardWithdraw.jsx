import AdminSideBar from "../components/Admin/Layout/AdminSideBar"
import AdminHeader from "../components/Layout/AdminHeader"
import AllWithdrawAdmin from  "../components/Admin/AllWithdrawAdmin"
const AdminDashboardWithdraw = function(){
    return(
        <>
        <div>
            <AdminHeader/>

            <div className="w-full flex">
                <div className="flex items-start justify-between w-full">
                    <div className="w-[80px] 800px:w-[330px]">
                        <AdminSideBar active={7}/>

                    </div>

                    <AllWithdrawAdmin/>

                </div>

            </div>
        </div>
        
        </>
    )
}


export default AdminDashboardWithdraw