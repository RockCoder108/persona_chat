import Image from "next/image";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* Persona Selector */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Choose Persona</h2>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Hitesh
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Piyush
          </button>
        </div>
      </div>

      {/* Chat Box */}
      <div className="bg-white p-4 rounded-lg shadow min-h-[300px]">
        <p className="text-gray-500">No messages yet.</p>
      </div>
    </div>
  );
}
