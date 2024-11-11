import React from 'react';
import Link from 'next/link';

const OptionsButton = ({ text }: { text: string }) => {
  return (
    <button className="w-full bg-red-400 text-white py-4 px-8 rounded-full text-lg font-medium shadow-lg hover:bg-red-500 hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
      {text}
    </button>
  );
};

const OptionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Header with Title and Menu Icon */}
      <div className="flex justify-between items-center w-full mb-12">
        <h1 className="text-4xl font-semibold text-center text-gray-800 flex-grow">Options</h1>
        <Link href="/mainMenu">
          <div className="space-y-1.5 cursor-pointer flex flex-col items-center">
            <div className="w-6 h-0.5 bg-gray-800 transition-transform duration-300 hover:scale-110"></div>
            <div className="w-6 h-0.5 bg-gray-800 transition-transform duration-300 hover:scale-110"></div>
            <div className="w-6 h-0.5 bg-gray-800 transition-transform duration-300 hover:scale-110"></div>
          </div>
        </Link>
      </div>

      {/* Buttons Container with balanced spacing */}
      <div className="max-w-md mx-auto w-full flex flex-col gap-6">
        <OptionsButton text="Filter" />
        <OptionsButton text="Privacy Settings" />
        <OptionsButton text="Controls" />
      </div>
    </div>
  );
};

export default OptionsPage;
