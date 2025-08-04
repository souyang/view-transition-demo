"use client";

import NavBar from "../components/NavBar";
import { useState } from "react";

interface ListItem {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
}

const initialItems: ListItem[] = [
  {
    id: 1,
    title: "First Priority",
    description: "This is the most important task",
    color: "from-red-500 to-pink-500",
    icon: "🔥"
  },
  {
    id: 2,
    title: "Second Priority",
    description: "This comes after the first",
    color: "from-orange-500 to-red-500",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Third Priority",
    description: "Important but not urgent",
    color: "from-yellow-500 to-orange-500",
    icon: "⭐"
  },
  {
    id: 4,
    title: "Fourth Priority",
    description: "Can be done later",
    color: "from-green-500 to-yellow-500",
    icon: "🌱"
  },
  {
    id: 5,
    title: "Fifth Priority",
    description: "Lowest priority item",
    color: "from-blue-500 to-green-500",
    icon: "💧"
  }
];

export default function ReorderPage() {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [draggedItem, setDraggedItem] = useState<ListItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, item: ListItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", "");
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
    
    if (draggedIndex === dropIndex) return;

    // Use View Transitions API if available
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        const newItems = [...items];
        const [removed] = newItems.splice(draggedIndex, 1);
        newItems.splice(dropIndex, 0, removed);
        setItems(newItems);
      });
    } else {
      // Fallback for browsers without View Transitions
      const newItems = [...items];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(dropIndex, 0, removed);
      setItems(newItems);
    }

    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const resetOrder = () => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
        setItems(initialItems);
      });
    } else {
      setItems(initialItems);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar currentPage="reorder" />

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              List Reordering Demo
            </h1>
            <button
              onClick={resetOrder}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
            >
              Reset Order
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Drag and drop items to reorder them. Watch the smooth View Transitions animations!
          </p>

          {/* List Container */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className={`cursor-move transition-all duration-300 ${
                  dragOverIndex === index ? 'scale-105' : 'scale-100'
                }`}
                style={{
                  viewTransitionName: `item-${item.id}`
                }}
              >
                <div className={`bg-gradient-to-r ${item.color} p-4 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-white/80 text-sm">{item.description}</p>
                    </div>
                    <div className="text-white/60 text-sm">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700 dark:text-indigo-300">
              How it works
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>Drag</strong> any item to reorder the list</li>
              <li>• <strong>View Transitions API</strong> creates smooth animations</li>
              <li>• <strong>Fallback</strong> works in all browsers</li>
              <li>• <strong>Reset</strong> button restores original order</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 