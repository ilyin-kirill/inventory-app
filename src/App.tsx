import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  MainPage,
  SingleInventoryPage,
  ProfilePage,
  LoginPage,
  ScannerPage,
} from './pages';
import styles from './App.module.scss';
import { ActionsContext, useActions } from './actions';
import { AuthProvider } from './shared/hooks';
import { ProtectedRoute } from './shared';

function App() {
  const height = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  const actionsContextData = useActions();

  return (
    <ActionsContext.Provider value={actionsContextData}>
      <div className={styles.global} style={{ height: `${height}px` }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scanner"
                element={
                  <ProtectedRoute>
                    <ScannerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory"
                element={
                  <ProtectedRoute>
                    <MainPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory/:id"
                element={
                  <ProtectedRoute>
                    <SingleInventoryPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ActionsContext.Provider>
  );
}

export default App;
