import React from "react";

export default function Footer(): React.JSX.Element {
  return (
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1>
          <a href="/privacy-policy" className="text-2xl font-bold">
            privacy policy
          </a>
        </h1>
      </nav>
  );
}