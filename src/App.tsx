import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, SingleInventoryPage, ProfilePage } from './pages';
import styles from './App.module.scss';

function App() {
  const height = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  return (
    <div className={styles.global} style={{ height: `${height}px` }}>
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/inventory" element={<MainPage />} />
          <Route path="/inventory/:id" element={<SingleInventoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
