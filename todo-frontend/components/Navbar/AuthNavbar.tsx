import { fetchAPIServer } from "@/app/(auth)/utils/fetchAPI";
import NavBarAuth from "./NavbarAuth";
import NavBar from "./Navbar";
import { cookies } from "next/headers";

const AuthenticatedNavbar = async () => {
    let isAuthenticated = false;
  
    try {
      const cookieStore = cookies();
      const token = cookieStore.get('token')?.value;
      const user = await fetchAPIServer('/users/me/', token);
      if (user) {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  
    return isAuthenticated ? <NavBarAuth /> : <NavBar />;
  };
  
  export default AuthenticatedNavbar;