import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import { GrClose } from "react-icons/gr";
import { MdEventSeat } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";

function TicketForm({ trainId }) {
    const [seats, setSeats] = useState([]);
    const [compartments, setCompartments] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [bookedSeat, setBookedSeat] = useState([]);
    const update = async (e) => {
        const type = e.target.value;
        const { data } = await axios.post(
            `${import.meta.env.VITE_DEV_API}/api/train_compartment/search`,
            {
                type,
                id: trainId,
            },
            { withCredentials: true }
        );
        setCompartments([...data]);
    };

    const bookSeat = async () => {
        for (let i = 0; i < compartments.length; i++) {
            let { data } = await axios.post(
                `${import.meta.env.VITE_DEV_API}/api/train_compartment/update/${compartments[i].id}`,
                compartments[i],
                { withCredentials: true }
            );
            console.log(data);
        }

    };
    const selectSeat = (index) => {
        console.log(compartments);
        setCompartments((pre) => {
            const vals = [...pre];
            //vals[activeIndex].Data
            let parsed = JSON.parse(vals[activeIndex].Data);
            parsed[index] = { ...parsed[index], bookedby: 1 };
            vals[activeIndex].Data = JSON.stringify(parsed);
            return vals;
        });
    };
    return (
        <div className="absolute inset-28 bg-mynavy z-20 rounded-lg drop-shadow-md p-5">
            <div>
                <button className="ml-auto block">
                    <GrClose />
                </button>
            </div>
            <div>
                <div>
                    Seat Type:
                    <select onChange={(e) => update(e)}>
                        <option value="----">Please Select</option>
                        <option value="AC">AC</option>
                        <option value="Sovon">Sovon</option>
                        <option value="F_CHAIR">First Class Chair</option>
                    </select>
                </div>
                <div>
                    <div className="flex justify-center">
                        {compartments.map((c, index) => {
                            return (
                                <button onClick={() => setActiveIndex(index)}>
                                    <GoPrimitiveDot />
                                </button>
                            );
                        })}
                    </div>
                    <div className="bg-mysnow w-3/5 mx-auto p-5 grid grid-cols-5 grid-rows-2 gap-10 justify-center content-center">
                        {Boolean(compartments[activeIndex])
                            ? JSON.parse(compartments[activeIndex].Data).map(
                                  (seat, i) => {
                                      if (seat.bookedby != 0) {
                                          return (
                                              <button
                                                  className="mx-auto"
                                                  disabled
                                              >
                                                  <MdEventSeat
                                                      size={50}
                                                      color={"red"}
                                                  />
                                              </button>
                                          );
                                      }
                                      return (
                                          <button
                                              className="mx-auto hover:text-gray-500"
                                              onClick={() => selectSeat(i)}
                                          >
                                              <MdEventSeat size={50} />
                                          </button>
                                      );
                                  }
                              )
                            : ""}
                    </div>
                    <div>
                        <Button type={"primary"} onClick={bookSeat}>
                            Comfirm Ticket
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketForm;
