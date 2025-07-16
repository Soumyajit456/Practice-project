import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const Navbar = () => {
  const {theme,toggleTheme} = useContext(ThemeContext)

  return (
    <nav className="transition-colors duration-300 ease-in-out flex items-center justify-between px-8 py-4 shadow-md bg-white text-slate-800 dark:bg-gray-800 dark:text-slate-100">
      <h1 className="font-extrabold text-lg">Where in the world?</h1>
      <button
      onClick={toggleTheme}
      className="flex items-center gap-2 font-semibold text-sm cursor-pointer">
        {theme === 'light' ? <FaMoon/> : <FaSun/>}
        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </button>
    </nav>
  );
};

export default Navbar;
