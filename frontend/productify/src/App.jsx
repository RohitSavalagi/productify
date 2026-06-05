import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar></Navbar>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/edit/:id" element={<EditProductPage />}></Route>
        </Routes>
      </main>
      {/* <h1>Hello World</h1>
      <button className="btn btn-primary">Click me</button>

      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton />
          <SignOutButton />
        </Show>
      </header> */}
    </div>
  )
}

export default App;
