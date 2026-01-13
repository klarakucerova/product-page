import { useState } from 'react';
import Sprite from "./Sprite";
import ProductPage from './pages/ProductPage';
import Header from './components/Header';

function App() {

    return (
        <div className="app">
            <Sprite />
            <Header />

            <ProductPage />
        </div>
    )
}

export default App
