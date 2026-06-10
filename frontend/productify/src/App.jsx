import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";
import useAuthReq from './hooks/useAuthReq';
import useUserSync from './hooks/useUserSync';

function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if(!isClerkLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar></Navbar>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          {/* <Route path="/profile" element={<ProfilePage />}></Route> */}
          <Route path="/profile" element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />} />
          {/* <Route path="/create" element={<CreatePage />}></Route> */}
          <Route path="/create" element={isSignedIn ? <CreatePage /> : <Navigate to={"/"} />} />
          <Route path="/edit/:id" element={<EditProductPage />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App;
