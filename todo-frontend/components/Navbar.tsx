"use client"
import Link from "next/link";
import { useState } from "react";
import { FcTodoList } from "react-icons/fc";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    function getMenuClasses(){
        let menuClasses = []

        if(isOpen) {
            menuClasses = [
                "flex",
                "absolute",
                "top-14",
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
                menuClasses = ["hidden", "md:flex"]
            }

            return menuClasses.join(" ")
        }


  return (
    <nav className="sticky top-0 z-20 bg-white flex w-full justify-between items-center py-4 px-2 shadow-md">
        <Link href={"/"} className="flex gap-x-2 items-center">
            <FcTodoList size={28}/>
            <h1 className="text-xl">Todo List</h1>
        </Link>

        <div className={getMenuClasses()}>
            <Link href={"/tasks"} className="mx-2 hover:text-gray-600 border-b border-gray-200 pb-2 w-full text-center md:border-0 md:pb-0">
                Tasks
            </Link>
            <Link href={"/login"} className="mx-2 hover:text-gray-600 border-b border-gray-200 pb-2 w-full text-center md:border-0 md:pb-0">
                Login
            </Link>
            <Link href={"/signup"} className="mx-2 hover:text-gray-600 border-b border-gray-200 last:border-b-0 w-full text-center md:border-0 md:pb-0">
                Sign Up
            </Link>
        </div>

        <div className="md:hidden flex items-center">
            <button onClick={() => {
                setIsOpen(!isOpen)
            }} className="text-2xl">
                {isOpen ? (
                    <IoMdClose />
                ): (
                    <CiMenuBurger />
                )}
            </button>
        </div>

    </nav>
  )
}

export default NavBar