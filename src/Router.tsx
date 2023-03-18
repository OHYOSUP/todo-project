import React from "react";
import { Routes, Route } from "react-router-dom";

import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
interface IRouterProps{
  toggleMode: () => void;
}
function Router({toggleMode} : IRouterProps) {
  return (
    <Routes>
      <Route path="/" element={<Coins />} />
      <Route path="/:coinId/*" element={<Coin />}></Route>
    </Routes>
  );
}

export default Router;
