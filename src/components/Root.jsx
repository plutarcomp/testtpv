import { Outlet } from "@tanstack/react-router";

export const Root = () => {
    return (
        <div>
            <div>
            <Outlet />
            </div>
        </div>
    );
  };