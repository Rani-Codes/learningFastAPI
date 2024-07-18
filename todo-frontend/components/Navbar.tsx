import Link from "next/link";
import { FcTodoList } from "react-icons/fc";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-20 bg-white flex w-full shadow-md justify-between items-center py-4 px-2">
        <Link href={"/"} className="flex gap-x-2">
            <FcTodoList size={28}/>
            <h1 className="text-xl">Todo List</h1>
        </Link>
        <div className="flex">
            <Link href={"/tasks"} className="mx-2 hover:text-gray-600">
                Tasks
            </Link>
            <Link href={"/login"} className="mx-2 hover:text-gray-600">
                Login
            </Link>
            <Link href={"/signup"} className="mx-2 hover:text-gray-600">
                Sign Up
            </Link>
        </div>
    </nav>
  )
}

export default NavBar