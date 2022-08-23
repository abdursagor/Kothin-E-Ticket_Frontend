import { FaTrain, FaBus } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import Button from "../components/Button";

function Home() {
    return (
        <div className="bg-gr-1 h-[90.9vh] w-screen flex justify-center items-center">
            <div>
                <div className="mb-5">
                    <h3 className="text-5xl">Welcome To Kothin Services</h3>
                    <p>We Make Your 'Kothin' Journey Easy</p>
                </div>
                <div className="flex flex-col gap-5 justify-center items-center">
                    <h5 className="text-2xl">Our Services</h5>
                    <div className="flex w-full justify-around">
                        <IconContext.Provider
                            value={{
                                size: "40",
                                className: "mx-auto hover:-translate-y-2 duration-100",
                            }}
                        >
                            <div className="text-center">
                                <FaTrain />
                                Train
                            </div>
                            <div className="text-center">
                                <FaBus />
                                Bus
                            </div>
                            <div className="text-center">
                                <IoMdAirplane />
                                Airplane
                            </div>
                            <div className="text-center">
                                <AiFillCar />
                                Car
                            </div>
                        </IconContext.Provider>
                    </div>
                    <Link to={"/login"}><Button type={"primary"}>Get your Ticket Now Fast!!</Button></Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
