"use client"
import Link from "next/link";
import { useState } from "react";
import { FcTodoList } from "react-icons/fc";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { poppins } from "@/ui/fonts";
//Had to npm install js-cookie because I want to remove the auth cookie while keeping this a client component
// idk if there was a better solution. This is good enough.
import Cookies from 'js-cookie';

const NavBarAuth = () => {
    const [isOpen, setIsOpen] = useState(false);

    function getMenuClasses() {
        let menuClasses = [];

        if (isOpen) {
            menuClasses = [
                "flex",
                "absolute",
                "top-11",
                "flex-col",
                "bg-white",
                "w-full",
                "p-4",
                "left-0",
                "gap-4",
                "shadow-md",
                "justify-center",
                "items-center"
            ];
        } else {
            menuClasses = [
                "hidden",
                "md:flex",
                "md:w-6/12",
                "md:justify-center",
                "md:items-center",
                "lg:w-4/12",
                "2xl:w-3/12"
            ];
        }

        return menuClasses.join(" ");
    }

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/';
    };

    return (
        <nav className={`${poppins.className} sticky top-0 z-20 bg-white flex w-full justify-between items-center p-2 shadow-md`}>
            <Link href={"/"} className="flex gap-x-2 items-center">
                <FcTodoList size={28} />
                <h1 className="text-xl">Todo List</h1>
            </Link>

            <div className={getMenuClasses()}>
                <Link href={"/tasks"} className="mx-2 hover:text-gray-600 border-b border-gray-200 pb-2 w-full text-center md:border-0 md:pb-0">
                    Tasks
                </Link>
                <Link href={"/profile"} className="mx-2 hover:text-gray-600 border-b border-gray-200 pb-2 w-full text-center md:border-0 md:pb-0">
                    Profile
                </Link>
                <button onClick={handleLogout} className="mx-2 hover:text-gray-600 border-b border-gray-200 last:border-b-0 w-full text-center md:border-0 md:pb-0">
                    <div className="md:border-2 md:border-transparent md:bg-red-600 md:text-white md:font-medium md:px-4 md:py-2 md:rounded-lg md:hover:bg-red-700">Logout</div>
                </button>
            </div>

            <div className="md:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                    {isOpen ? <IoMdClose /> : <CiMenuBurger />}
                </button>
            </div>
        </nav>
    );
};

export default NavBarAuth;