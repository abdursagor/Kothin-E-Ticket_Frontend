import React, { useState } from "react";
import AddTrain from "../components/Admin/AddTrain";
import AddStation from "../components/Admin/AddStation";
import Button from "../components/Button";
import AddSchedules from "../components/Admin/AddSchedules";
import ManageTrain from "../components/Admin/ManageTrain";

function Admin() {
    const [view, setView] = useState("train");
    return (
        <div className="bg-myviolet grid grid-cols-12 h-[90.6vh]">
            <div className="col-span-2 flex flex-col">
                <Button
                    type={view == "train" ? "active" : "block"}
                    onClick={() => setView("train")}
                >
                    Add Train
                </Button>
                <Button type={view == "station" ? "active" : "block"} onClick={() => setView("station")}>
                    Add Station
                </Button>
                <Button type={view == "schedule" ? "active" : "block"} onClick={() => setView("schedule")}>
                    Add Schedules
                </Button>
                <Button type={view == "manage" ? "active" : "block"} onClick={() => setView("manage")}>
                    Add Manage Train
                </Button>
            </div>
            <div className="col-span-10 bg-myred">
                {view == "train" && <AddTrain />}{" "}
                {view == "station" && <AddStation />}
                {view == "schedule" && <AddSchedules />}
                {view == "manage" && <ManageTrain />}
            </div>
        </div>
    );
}

export default Admin;
