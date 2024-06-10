
import Link from "next/link"
import { LoginButton } from "./LoginButton"
import NavLinks from "./NavLinks"
import Sidebar from "./Sidebar"

const Navbar = () => {

    return (
        <div className="flex justify-between w-full p-5 items-center border-b-2 shadow-md">

            <div className="flex gap-2">
                <Sidebar />
                <Link
                    href={'/'}
                    className="font-bold text-xl">
                    Site Name
                </Link>
            </div>
            <div className="flex gap-5 items-center">
                <NavLinks />
                <LoginButton />
            </div>
        </div>
    )
}

export default Navbar