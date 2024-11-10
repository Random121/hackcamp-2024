"use client";

import React from 'react';
import Link from 'next/link'

const OptionsButton = ({ text }: { text: string }) => {
  return (
    <button className="w-full bg-red-400 text-white py-4 px-8 rounded-full text-lg font-medium hover:bg-red-500 transition-colors">
      {text}
    </button>
  );
};

const OptionsPage = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header with Title and Menu Icon */}
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-4xl font-normal text-center flex-grow text-black">Options</h1>
        <Link href= {"/profile"}><div className="space-y-1.5 cursor-pointer">
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </div>
        </Link>
      </div>

      {/* Buttons Container with balanced spacing */}
      <div className="max-w-md mx-auto flex flex-col justify-between h-60 px-4">
        <OptionsButton text="Filter" />
        <OptionsButton text="Privacy Settings" />
        <OptionsButton text="Controls" />
      </div>
    </div>
  );
};

const clickIcon = () => {

}

export default OptionsPage;