import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button";
import Toast from "../Toast";

function ManageTrain() {
    const [trainList, setTrainList] = useState([]);
    const [stationList, setStationList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [train, setTrain] = useState("----");
    const [station, setStation] = useState("----");
    const [schedule, setSchedule] = useState("----");
    const [disabled, setDisabled] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (train == "----" || station == "----" || schedule === "----") {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [train, station, schedule]);

    useEffect(() => {
        const getAll = async () => {
            const { data: trains } = await axios.get(
                `${import.meta.env.VITE_DEV_API}/api/train`
            );
            const { data: station } = await axios.get(
                `${import.meta.env.VITE_DEV_API}/api/train_station`
            );
            const { data: schedule } = await axios.get(
                `${import.meta.env.VITE_DEV_API}/api/train_schedule`
            );
            setTrainList([...trains]);
            setStationList([...station]);
            setScheduleList([...schedule]);
        };
        getAll();
    }, []);

    const saveData = async () => {
        let result = await axios.post(
            `${import.meta.env.VITE_DEV_API}/api/manage_train/create`,
            {
                TrainId: train,
                StationId: station,
                ScheduleId: schedule,
            },
            { withCredentials: true }
        );
        if (result.data == true) {
            setIsAdded(true);
        }
    };

    return (
        <div className="w-full h-full relative flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col">
                <label>Select Train</label>
                <select
                    className="px-5 py-2"
                    onChange={(e) => {
                        setTrain(e.target.value);
                    }}
                >
                    <option value="----">Select Train</option>
                    {trainList.map((train) => {
                        return (
                            <option key={train.Id} value={train.Id}>
                                {train.Name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="flex flex-col">
                <label>Select Station</label>
                <select
                    className="px-5 py-2"
                    onChange={(e) => {
                        setStation(e.target.value);
                    }}
                >
                    <option value="----">Select Station</option>
                    {stationList.map((station) => {
                        return (
                            <option key={station.Id} value={station.Id}>
                                {station.Name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="flex flex-col">
                <label>Select Schedule</label>
                <select
                    className="px-5 py-2"
                    onChange={(e) => {
                        setSchedule(e.target.value);
                    }}
                >
                    <option value="----">Select Schedule</option>
                    {scheduleList.map((schedule) => {
                        return (
                            <option key={schedule.Id} value={schedule.Id}>
                                {schedule.ArraivalTime} -{" "}
                                {schedule.DepartureTime}
                            </option>
                        );
                    })}
                </select>
            </div>
            <Button type="primary" disabled={disabled} onClick={saveData}>
                Add
            </Button>
            {isAdded && <Toast>Data Inserted</Toast>}
        </div>
    );
}

export default ManageTrain;
