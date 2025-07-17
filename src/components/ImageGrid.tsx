import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageGridProps {
  onImageSelect: (imageId: string) => void;
  selectedImages: string[];
  maxSelections: number;
  mode: "register" | "login";
}

// Sample images for the GPA system - in a real app these would come from your backend
const ORIGINAL_GRID_IMAGES = [
  { id: "img_1", src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop", alt: "Woman with laptop" },
  { id: "img_2", src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop", alt: "Gray laptop" },
  { id: "img_3", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop", alt: "Circuit board" },
  { id: "img_4", src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop", alt: "Java programming" },
  { id: "img_5", src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop", alt: "MacBook Pro" },
  { id: "img_6", src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop", alt: "Woman using laptop" },
  { id: "img_7", src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop", alt: "White robot" },
  { id: "img_8", src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop", alt: "Matrix code" },
  { id: "img_9", src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop", alt: "Laptop on surface" },
  { id: "img_10", src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop", alt: "Code on monitor" },
  { id: "img_11", src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=100&h=100&fit=crop", alt: "Video screens" },
  { id: "img_12", src: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=100&h=100&fit=crop", alt: "Stylus pen" },
  { id: "img_13", src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop", alt: "People with laptops" },
  { id: "img_14", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop", alt: "Glass table laptop" },
  { id: "img_15", src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop", alt: "Blue light bulb" },
  { id: "img_16", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop", alt: "MacBook with code" },
  { id: "img_17", src: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop", alt: "Apple Watch" },
  { id: "img_18", src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop", alt: "Man on chair" },
  { id: "img_19", src: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=100&h=100&fit=crop", alt: "Silver iMac" },
  { id: "img_20", src: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=100&h=100&fit=crop", alt: "White drone" },
  { id: "img_21", src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop", alt: "Two deer" },
  { id: "img_22", src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=100&h=100&fit=crop", alt: "Bridge waterfalls" },
  { id: "img_23", src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop", alt: "Orange flowers" },
  { id: "img_24", src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=100&h=100&fit=crop", alt: "Mountain river" },
  { id: "img_25", src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=100&h=100&fit=crop", alt: "Pine trees" },
];

// Fisher-Yates shuffle algorithm for secure randomization
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function ImageGrid({ onImageSelect, selectedImages, maxSelections, mode }: ImageGridProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [displayImages, setDisplayImages] = useState(ORIGINAL_GRID_IMAGES);

  // Shuffle images on component mount for login mode (anti-shoulder-surfing)
  useEffect(() => {
    if (mode === "login") {
      setDisplayImages(shuffleArray(ORIGINAL_GRID_IMAGES));
    } else {
      setDisplayImages(ORIGINAL_GRID_IMAGES);
    }
  }, [mode]);

  const handleImageClick = (imageId: string) => {
    if (selectedImages.includes(imageId)) {
      // Allow deselection in both register and login modes
      onImageSelect(imageId);
    } else if (selectedImages.length < maxSelections) {
      // If we haven't reached max selections, add the image
      onImageSelect(imageId);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-5 gap-3 p-6 bg-card rounded-xl border shadow-glow">
        {displayImages.map((image) => {
          const isSelected = selectedImages.includes(image.id);
          const isHovered = hoveredImage === image.id;
          const selectionIndex = selectedImages.indexOf(image.id);

          return (
            <div
              key={image.id}
              className="relative aspect-square cursor-pointer group"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => handleImageClick(image.id)}
            >
              <div
                className={cn(
                  "relative w-full h-full rounded-lg overflow-hidden transition-all duration-300 shadow-image",
                  isSelected && "ring-2 ring-primary shadow-glow",
                  isHovered && "scale-[2] z-10 shadow-glow",
                  !isHovered && "hover:scale-105"
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {selectionIndex + 1}
                  </div>
                )}

                {/* Overlay for better contrast when hovered */}
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection status */}
      <div className="mt-4 text-center">
        <p className="text-muted-foreground">
          {mode === "register" 
            ? `Select ${maxSelections} images for your password (${selectedImages.length}/${maxSelections} selected)`
            : `Enter your password by selecting the ${maxSelections} images in order (${selectedImages.length}/${maxSelections} selected)`
          }
        </p>
      </div>
    </div>
  );
}