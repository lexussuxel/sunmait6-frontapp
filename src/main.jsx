import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdatePage from "./pages/UpdatePage.jsx";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "update",
    element: <UpdatePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="main-wrapper">
      <h1 className="font-effect-anaglyph">Контакты</h1>
      <div className="router">
        <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>
);
