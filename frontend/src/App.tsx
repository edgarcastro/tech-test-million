import { Routes, Route } from "react-router-dom";
import { PropertyListPage } from "./pages/PropertyListPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<PropertyListPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
