interface LayoutToggleProps {
  layoutMode: "grid" | "list";
  onLayoutChange: (mode: "grid" | "list") => void;
}

export default function LayoutToggle({ layoutMode, onLayoutChange }: LayoutToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onLayoutChange("grid")}
        className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
          layoutMode === "grid" 
            ? "bg-green-600 text-white" 
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }`}
      >
        Grid
      </button>
      <button
        onClick={() => onLayoutChange("list")}
        className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
          layoutMode === "list" 
            ? "bg-green-600 text-white" 
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }`}
      >
        List
      </button>
    </div>
  );
} 