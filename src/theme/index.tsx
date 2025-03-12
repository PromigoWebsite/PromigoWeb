import { Outlet } from "react-router-dom";

export default function Main(){
    return(
        <>
            <div className="text-red-400">
                Hayoo ini tema
            </div>
            <Outlet/>
        </>
    )
}