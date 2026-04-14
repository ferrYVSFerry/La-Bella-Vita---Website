/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MenuSelection } from './pages/MenuSelection';
import { Menu } from './pages/Menu';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuSelection />} />
            <Route path="/menu/:lang" element={<Menu />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}
