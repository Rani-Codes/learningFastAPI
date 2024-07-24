"use client"
import { useState, useEffect } from "react";
import NavBar from "@/components/Navbar/Navbar";
import NavBarAuth from "@/components/Navbar/NavbarAuth";
import { getCurrentUser } from "@/app/(auth)/utils/fetchAPI";

const AuthenticatedNavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('Checking authentication...');
                const user = await getCurrentUser();
                console.log('Authenticated user:', user);
                setIsAuthenticated(true);
            } catch (error) {
                console.log('Authentication failed:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <NavBarAuth /> : <NavBar />;
};

export default AuthenticatedNavBar;
