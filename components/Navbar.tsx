
import { LoginButton } from "./LoginButton"
import NavLinks from "./NavLinks"

const Navbar = () => {

    return (
        <div className="flex justify-between w-full p-5 items-center">
            <div className="font-bold text-xl">
                Site Name Logo
            </div>
            <div className="flex gap-5 items-center">
                <NavLinks />

                <LoginButton />
            </div>
        </div>
    )
}

export default Navbar