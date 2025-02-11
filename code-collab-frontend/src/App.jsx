import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomForm from "./components/RoomForm";
import CodeEditor from "./components/CodeEditor";


const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomForm />} />
        <Route path="/editor/:roomId" element={<CodeEditor />} />

        
      </Routes>
    </Router>
  );
};

export default App;
