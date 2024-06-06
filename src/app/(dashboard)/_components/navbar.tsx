import { auth } from "@clerk/nextjs/server";

import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export function Navbar() {
    const { userId } = auth();

    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebar />

            <NavbarRoutes
                userId={userId}
            />
        </div>
    );
}
