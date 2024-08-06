import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path= "/" element ={<Home />} />
      <Route path= {`/Search/:query/:count`} element ={<Search />} />
    </Routes>

   </BrowserRouter>
  );
}

export default App;
