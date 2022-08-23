import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { pick } from 'lodash/object';
import Button from "../components/Button";
import Input from "../components/Input";

function Signup() {
    let navigate = useNavigate();
    const [btn, setBtn] = useState(false);
    const formData = {
        username: "",
        usernameErr: "",
        name: "",
        nameErr: "",
        email: "",
        emailErr: "",
        password: "",
        passwordErr: "",
        phone: "",
        phoneErr: "",
        dob: "",
        dobErr: "",
        Bloodgroup: "",
        BloodgroupErr: "",
        gender: "",
        genderErr: "",
        Address: "",
        AddressErr: "",
        Nid: "",
        NidErr: "",
        Maritalstatus: "",
        MaritalstatusErr: "",
    };
    function reducer(state, action) {
        switch (action.type) {
            case "username":
                let err = "";
                if (action.payload.length < 4) {
                    err = "Username Must Be Greater Then 4";
                    setBtn(true);
                }
                else
                    setBtn(false);
                return {
                    ...state,
                    username: action.payload,
                    usernameErr: err,
                };
            
            case "name":
                return { ...state, name: action.payload };
            
            case "email":
                let matched = action.payload.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
                let emailerr = matched == null ? "Email is not valid" : "";
                matched == null ? setBtn(true) : setBtn(false);
                return { ...state, email: action.payload, emailErr: emailerr };
            case "password":
                return {
                    ...state,
                    password: (state.password = action.payload),
                };
            case "phone":
                let phnErr = "";
                if (isNaN(action.payload)) {
                    phnErr = "Enter A valid number";
                    setBtn(true);
                }
                else
                    setBtn(false)
                return { ...state, phone: action.payload, phoneErr: phnErr };
            
            case "dob":
                return { ...state, dob: (state.dob = action.payload) };
            
            case "Bloodgroup":
                return {
                    ...state,
                    Bloodgroup: (state.Bloodgroup = action.payload),
                };
            
            case "gender":
                return { ...state, gender: (state.gender = action.payload) };
            
            case "Address":
                return { ...state, Address: (state.Address = action.payload) };
            
            case "Nid":
                return { ...state, Nid: (state.Nid = action.payload) };
            
            case "Maritalstatus":
                return {
                    ...state,
                    Maritalstatus: (state.Maritalstatus = action.payload),
                };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, formData);
    const bloodGroups = [
        "----",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
    ];

    const signup = async () => {
        let data = pick(state, ['username', 'name', 'email', 'password', 'phone', 'dob', 'Bloodgroup', 'gender', 'Address', 'Nid', 'Maritalstatus']);
        console.log(data);
        let result = await axios.post(
            `${import.meta.env.VITE_DEV_API}/api/customer/create`,
            data
        );
        if (result.data == true) {
            navigate("/login");
        }
    };
    return (
        <div className="bg-gr-1 h-[90.9vh] w-screen flex justify-center items-center">
            <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col gap-1">
                    <label>Username</label>
                    <Input
                        onChange={(e) =>
                            dispatch({
                                type: "username",
                                payload: e.target.value,
                            })
                        }
                        value={state.usernaem}
                    />
                    <span className="text-red-600">{state.usernameErr}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Name</label>
                    <Input
                        onChange={(e) =>
                            dispatch({ type: "name", payload: e.target.value })
                        }
                        value={state.name}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <Input
                        onChange={(e) => {
                            dispatch({
                                type: "email",
                                payload: e.target.value,
                            });
                        }}
                        value={state.email}
                    />
                    <span className="text-red-600">{state.emailErr}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <Input
                        onChange={(e) => {
                            dispatch({
                                type: "password",
                                payload: e.target.value,
                            });
                        }}
                        value={state.password}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Phone</label>
                    <input
                        className="outline-none px-2 py-1 rounded-full"
                        type="number"
                        onChange={(e) => {
                            dispatch({
                                type: "phone",
                                payload: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Date Of Birth</label>
                    <input
                        className="outline-none px-2 py-1 rounded-full"
                        type="date"
                        onChange={(e) => {
                            dispatch({
                                type: "dob",
                                payload: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Blood Group</label>
                    <select
                        className="outline-none px-2 py-1 rounded-full"
                        onChange={(e) => {
                            dispatch({
                                type: "Bloodgroup",
                                payload: e.target.value,
                            });
                        }}
                    >
                        {bloodGroups.map((b, i) => {
                            return (
                                <option key={i} value={b}>
                                    {b}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Gender</label>
                    <select
                        className="outline-none px-2 py-1 rounded-full"
                        onChange={(e) => {
                            dispatch({
                                type: "gender",
                                payload: e.target.value,
                            });
                        }}
                    >
                        <option value="Male">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Address</label>
                    <input
                        className="outline-none px-2 py-1 rounded-full"
                        type="text"
                        onChange={(e) => {
                            dispatch({
                                type: "Address",
                                payload: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>NID Number</label>
                    <input
                        className="outline-none px-2 py-1 rounded-full"
                        type="number"
                        onChange={(e) => {
                            dispatch({
                                type: "Nid",
                                payload: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Marital Status</label>
                    <select
                        className="outline-none px-2 py-1 rounded-full"
                        onChange={(e) => {
                            dispatch({
                                type: "Maritalstatus",
                                payload: e.target.value,
                            });
                        }}
                    >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Dead">Dead</option>
                    </select>
                </div>
                <div></div>
                <div className="mt-5 col-span-3 flex justify-center">
                    <Button type={"primary"} onClick={signup} disabled={btn}>
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
