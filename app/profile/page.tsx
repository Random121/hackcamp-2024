"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';  // useSearchParams for accessing query params

const TopLeftIcon = () => {
    return (
        <div className="absolute top-4 left-4 w-10 h-10" >
            <Image src="./toplefticon.svg" alt="Map Icon" className="w-full h-full" width="59" height="59" />
        </div>
    );
};

const Greeting = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username') ?? 'Guest';  // Default to 'Guest' if username is missing
    return (
        <h1 className="text-2xl font-medium mb-8" style={{ color: 'black' }} >Hello {username}!!</h1>
    );
};

const Avatar = () => {
    return (
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-8 flex items-center justify-center">
            <Image src="./ProfilePic.svg" alt="Avatar of Dog" width="100" height="100"></Image>
        </div>
    );
};

interface BioSectionProps {
    bio: string;
    setBio: (value: string) => void;
}

const BioSection: React.FC<BioSectionProps> = ({ bio, setBio }) => {
    return (
        <div className="w-full max-w-md">
            <label className="block text-sm font-medium mb-2" style={{ color: 'black' }}>
                Enter your Bio
            </label>
            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-32 p-3 border text-black focus:outline-none border-red-500 rounded-md focus:border-red-00 resize-none"
                placeholder="Write something about yourself..."
            />
        </div>
    );
};

export default function ProfilePage() {
    const [bio, setBio] = useState<string>('');

    return (
        <div className="flex flex-col items-center p-6 min-h-screen bg-white">
            <Link href="/mainMenu"><TopLeftIcon /> </Link>
            <Greeting />
            <Avatar />
            <BioSection bio={bio} setBio={setBio} />
        </div>
    );
};