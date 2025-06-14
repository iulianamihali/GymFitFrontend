import React from 'react';
import { AuthProvider } from './context/ApplicationContext';
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
  );
}

export default App;
