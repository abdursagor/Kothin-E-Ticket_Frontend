import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Login() {
    let navigate = useNavigate();
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "username":
                    return { ...state, username: action.payload };
                case "password":
                    return { ...state, password: action.payload };
                case "error":
                    return { ...state, status: action.payload };
                default:
                    return state;
            }
        },
        { username: "", password: "", status: "" }
    );
    const login = async () => {
        try {
            let result = await axios.post(
                `${import.meta.env.VITE_DEV_API}/api/auth/user`,
                state,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            navigate("/dashboard");
        } catch (e) {
            dispatch({ type: "error", payload: e.response.data });
        }
    };
    return (
        <div className="bg-gr-1 h-[90.9vh] w-screen flex justify-center items-center">
            <div>
                <div className="flex flex-col gap-1">
                    <label>Username</label>
                    <input
                        className="outline-none px-2 py-1 rounded-full"
                        type="text"
                        onChange={(e) =>
                            dispatch({
                                type: "username",
                                payload: e.target.value,
                            })
                        }
                        value={state.username}
                    />
                </div>
                <div className="flex flex-col gap-1 my-4">
                    <label>Password</label>
                    <input
                        className="outline-none px-2 py-1 rounded-full"
                        type="password"
                        onChange={(e) =>
                            dispatch({
                                type: "password",
                                payload: e.target.value,
                            })
                        }
                        value={state.password}
                    />
                    <span className="text-red-700">{state.status}</span>
                </div>
                <div className="flex justify-center">
                    <Button type={"primary"} onClick={login}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
