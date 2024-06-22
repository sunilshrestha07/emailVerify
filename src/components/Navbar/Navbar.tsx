"use client"

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const menu = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "singup", href: "/signup" },
  ];

  return (
    <nav>
      <div className="px-32 py-5 flex justify-between">
        <div>
          <Link href="/">
            <p className="text-3xl font-serif font-semibold">Demo</p>
          </Link>
        </div>
        <div className="flex gap-16 font-serif text-xl">
          {menu.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>
                <div className={`${pathname === item.href ? 'text-white bg-black' : ''} px-6 py-1 rounded-md`}>
                  {item.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
