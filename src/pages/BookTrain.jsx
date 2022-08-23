import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import TicketForm from "../components/TicketForm";

function BookTrain() {
    const [stationNames, setStationNames] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [trainList, setTrainList] = useState([]);
    const [selectedTrain, setSelectedTrain] = useState(0);

    useEffect(() => {
        const getNames = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_DEV_API}/api/train_station/`
            );
            setStationNames([...data]);
        };
        getNames();
    }, []);

    const search = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_DEV_API}/api/train/search/${from},${to}`,
            { withCredentials: true }
        );
        setTrainList([...data]);
        console.log(data);
    };
    return (
        <div className="bg-myviolet h-[90.9vh] flex justify-center pt-5 gap-5">
            {Boolean(selectedTrain) && <TicketForm trainId={selectedTrain} />}
            <div>
                <div className="flex gap-5 items-center">
                    <div>
                        <label className="mr-5">From</label>
                        <select onChange={(e) => setFrom(e.target.value)}>
                            <option value="----">Select Station</option>
                            {stationNames.map((station) => {
                                return (
                                    <option key={station.Id} value={station.Id}>
                                        {station.Name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label className="mr-5">To</label>
                        <select onChange={(e) => setTo(e.target.value)}>
                            <option value="----">Select Station</option>
                            {stationNames.map((station) => {
                                return (
                                    <option key={station.Id} value={station.Id}>
                                        {station.Name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <Button type={"primary"} onClick={search}>
                        Search
                    </Button>
                </div>
                <div className="mt-5">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Train Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Arraival Time
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Departure Time
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            {trainList.map((train) => {
                                return (
                                    <tr
                                        key={train.TrainId}
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {train.TrainName}
                                        </th>
                                        <td className="py-4 px-6">
                                            {train.TrainType}
                                        </td>
                                        <td className="py-4 px-6">
                                            {train.ArraivalTime}
                                        </td>
                                        <td className="py-4 px-6">
                                            {train.DepartureTime}
                                        </td>
                                        <td className="py-4 px-6">
                                            <Button
                                                type={"primary"}
                                                onClick={() =>
                                                    setSelectedTrain(train.TrainId)
                                                }
                                            >
                                                Buy Ticket
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookTrain;
