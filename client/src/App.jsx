import { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Website } from "./pages/Website";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Properties } from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import { Property } from "./pages/Property/Property";
import { MantineProvider } from "@mantine/core";
import UserDetailContext from "./context/UserDetailContext";
import { Bookings } from "./pages/Bookings/Bookings";
import { Favourites } from "./pages/Favourites/Favourites";

function App() {
  const queryclient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites : [],
    bookings : [],
    token : null
  });


  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails }} >

      <QueryClientProvider client={queryclient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings/"  element={<Bookings />}></Route>
                <Route path="/favourites/"  element={<Favourites />}></Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

    </UserDetailContext.Provider>
  );
}

export default App;
