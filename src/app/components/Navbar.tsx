import { useState } from "react";
import Dropdown from "./Dropdown";

const Navbar = () => {
    const [show, setShow] = useState<boolean>(false); // this will manage the state of the show variable

    return (
        <nav className="bg-white border flex h-24">
            <div className="flex-none w-[18.75rem] border-r-2 flex items-center pl-[2.12rem]">
                <p className="font-bold text-3xl"> Kanban App </p>
            </div>

            <div className="flex justify-between w-full items-center pr-[2.12rem]">
                <p className="text-black text-2xl font-bold pl-6">Board Name</p>

                <div className="flex items-center space-x-3">
                    <button className="bg-blue-500 text-black px-4 py-2 flex rounded-3xl items-center space-x-2">
                        <p>+ Add New Task</p>
                    </button>
                    
                    <div className="relative flex items-center">
                        <button
                            onClick={() => setShow(!show)} // trigger function that shows dropdown here
                            className="text-3xl mb-4"
                        >
                            ...
                        </button>
                        <Dropdown show={show} />{" "}
                        {/* render dropdown here and pass show as prop */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
