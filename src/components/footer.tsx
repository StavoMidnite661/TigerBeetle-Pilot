
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mt-auto p-4 text-center text-xs text-gray-500">
      <div>
        <p>&copy; {new Date().getFullYear()} SOVR Development Holdings LLC. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/terms" className="hover:text-gray-400">Terms and Conditions</a>
          <a href="/disclaimer" className="hover:text-gray-400">Disclaimer</a>
          <button onClick={() => console.log('SOVR Console Information')} className="hover:text-gray-400">Console Information</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
