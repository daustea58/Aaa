import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing";
import Password from "./pages/Password";
import MusicSelection from "./pages/MusicSelection";
import Timeline from "./pages/Timeline";
import LoveCheck from "./pages/LoveCheck";
import Birthday from "./pages/Birthday";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/password" element={<Password />} />
            <Route path="/music" element={<MusicSelection />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/love-check" element={<LoveCheck />} />
            <Route path="/birthday" element={<Birthday />} />
            <Route path="/thankyou" element={<ThankYou />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
