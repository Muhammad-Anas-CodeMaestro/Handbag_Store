import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-earth-200 py-8 text-center text-sm text-earth-500 font-sans">
        <p className="font-serif italic text-earth-400 mb-1">Made with care, by hand.</p>
        © {new Date().getFullYear()} Your Store Name. All rights reserved.
      </footer>
    </div>
  );
}