import { useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

function Dashboard() {
    useEffect(() => {
        const loadData = async () => {
           axios.get(`${import.meta.env.VITE_DEV_API}/api/customer`,{withCredentials:true}).then(res=>console.log(res)).catch(err=>console.log(err))
        } 
        loadData();
    },[])
    return <div className="bg-myviolet h-[90.9vh] w-full flex flex-wrap justify-center gap-5 px-5 pt-5">
        <Card to={"/booktrain"}>Train Ticket</Card>
        <Card to={"/train"}>Bus Ticket</Card>
        <Card to={"/train"}>Airplane Ticket</Card>
        <Card to={"/train"}>Rent A Car</Card>
    </div>;
}

export default Dashboard;
