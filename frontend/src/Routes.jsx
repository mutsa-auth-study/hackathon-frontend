import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/Main"
import Location from "./pages/Location"
import Mypage from "./pages/Mypage"
import Search from "./pages/Search"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/location" element={<Location />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/exam" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
