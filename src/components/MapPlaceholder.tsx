import React from 'react';
import { MapPin } from 'lucide-react'; // Example icon

interface MapPlaceholderProps {
  height?: string; // e.g., "300px" or "h-64" Tailwind class
  message?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  height = "h-64", // Default Tailwind height class
  message = "Map will be displayed here",
}) => {
  console.log("Rendering MapPlaceholder");
  return (
    <div
      className={`w-full bg-muted flex flex-col items-center justify-center rounded-lg border border-dashed ${height}`}
    >
      <MapPin className="w-12 h-12 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
      <p className="text-xs text-muted-foreground/70">(Order Tracking Map)</p>
    </div>
  );
};
export default MapPlaceholder;