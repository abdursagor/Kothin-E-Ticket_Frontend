import { useState } from "react";
import axios from "axios";
import Input from "../Input";
import Button from "../Button";
import Toast from "../Toast";

function AddStation() {
    const [name, setName] = useState("");
    const [isAdded, setIsAdded] = useState(false);

    const sendData = async () => {
        let result = await axios.post(
            `${import.meta.env.VITE_DEV_API}/api/train_station/create`,
            { Name: name},
            { withCredentials: true }
        );
        if (result.data == true) {
            setIsAdded(true);
            setName("");
        }
    }
    return (
        <div className="w-full h-full relative flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col">
                <label>Station Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <Button type="primary" onClick={sendData}>
                Add
            </Button>
            {isAdded && <Toast>Station Inserted</Toast>}
        </div>
    );
}

export default AddStation;
