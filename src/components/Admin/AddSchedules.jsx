import { useState } from "react";
import Toast from "../Toast";
import Button from "../Button";
import Input from "../Input";
import axios from "axios";

function AddSchedules() {
    const [departureTime, setDepartureTime] = useState("");
    const [arraivalTime, setArraivalTime] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    const sendData = async () => {
        let result = await axios.post(
            `${import.meta.env.VITE_DEV_API}/api/train_schedule/create`,
            {
                DepartureTime: departureTime,
                ArraivalTime: arraivalTime,
            },
            { withCredentials: true }
        );
        if (result.data == true) {
            setIsAdded(true);
            setDepartureTime("");
            setArraivalTime("");
        }
    };
    return (
        <div className="w-full h-full relative flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col">
                <label>Departure Time</label>
                <Input
                    value={departureTime}
                    type={"time"}
                    onChange={(e) => setDepartureTime(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label>Arraival Time</label>
                <Input
                    value={arraivalTime}
                    type={"time"}
                    onChange={(e) => setArraivalTime(e.target.value)}
                />
            </div>
            <Button type="primary" onClick={sendData}>
                Add
            </Button>
            {isAdded && <Toast>Station Inserted</Toast>}
        </div>
    );
}

export default AddSchedules;
