import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router"; // Adjust the path as needed
import { ToastContainer } from "react-toastify";
import Lucide from "./basic_components/Lucide";

createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>

    <ToastContainer
      icon={({ type }) => {
        if (type === "success")
        return <Lucide icon="LaptopMinimalCheck" className="stroke-2"/>;
        if (type === "warning")
          return <Lucide icon="CircleX" className="stroke-2" />;
        if (type === "error") 
          return <Lucide icon="CircleX" className="stroke-2" />;
        else return "unidentified";
      }}
    />
  </>
);
