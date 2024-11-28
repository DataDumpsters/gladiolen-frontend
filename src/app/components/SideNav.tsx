import React from 'react';
import Link from 'next/link';

const SideNav: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 flex flex-col items-center bg-gray-800 text-white w-64 h-full p-4">
            <div className="mb-8">
                <img src="/path-to-your-logo.png" alt="Logo" className="w-32 h-auto" />
            </div>
            <ul className="flex flex-col gap-4">
                <li>
                    <Link href="/verenigingen">Verenigingen</Link>
                </li>
                <li>
                    <Link href="/medewerkers">Medewerkers</Link>
                </li>
                <li>
                    <Link href="/statistieken">Statistieken</Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideNav;