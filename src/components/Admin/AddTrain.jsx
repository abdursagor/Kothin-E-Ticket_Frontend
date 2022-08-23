import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Toast from "../Toast";
import axios from "axios";

function AddTrain() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [category, setCategory] = useState("");
    const [isAdded, setIsAdded] = useState(false);
    const sendData = async () => {
        let result = await axios.post(
            `${import.meta.env.VITE_DEV_API}/api/train/create`,
            { Name: name, Number: number, Category: category },
            { withCredentials: true }
        );
        if (result.data == true) {
            setIsAdded(true);
            setName("");
            setNumber("");
        }
    };
    return (
        <div className="w-full h-full relative flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col">
                <label>Train Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col">
                <label>Train Number</label>
                <Input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label>Train Category</label>
                <select
                    className="px-5 py-2"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="----">Select Category</option>
                    <option value="Intercity">Intercity</option>
                    <option value="Mail">Mail</option>
                </select>
            </div>
            <Button type="primary" onClick={sendData}>
                Add
            </Button>
            {isAdded && <Toast>Train Inserted</Toast>}
        </div>
    );
}

export default AddTrain;
