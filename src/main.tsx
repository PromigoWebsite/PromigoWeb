import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router"; // Adjust the path as needed
import { ToastContainer } from "react-toastify";
import Lucide from "./basic_components/Lucide";

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />

    <ToastContainer
      icon={({ type }) => {
        if (type === "success")
          return <Lucide icon="CheckCheck" className="stroke-2 text-black" />;
        if (type === "warning")
          return <Lucide icon="CircleX" className="stroke-2 text-black" />;
        if (type === "error")
          return <Lucide icon="CircleX" className="stroke-2 text-black" />;
        else return "unidentified";
      }}
    />
  </>
);
