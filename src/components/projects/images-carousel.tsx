import * as React from "react";
import { memo, useState, useCallback, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

// Use React.memo to prevent unnecessary re-renders
export const ImagesCarousel = memo(function ImagesCarousel({
  images,
  videoPath,
  activeIndex = 0,
  setActiveIndex,
}: {
  images: string[];
  videoPath?: string;
  activeIndex?: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Track when scrollTo behavior
  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeIndex);
  }, [api, activeIndex]);

  // Track select events
  useEffect(() => {
    if (!api || !setActiveIndex) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setActiveIndex(selectedIndex);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setActiveIndex]);

  // Handle image load events
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  }, []);

  // Handle video events
  const handleVideoLoadStart = useCallback(() => {
    // Video load started
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>
        {videoPath && (
          <CarouselItem>
            <div className="w-full">
              <Card className="border-0 shadow-none pt-4">
                <CardContent className="flex aspect-video rounded-lg pt-0">
                  <video
                    src={videoPath}
                    controls
                    className="w-full h-full object-contain rounded-lg"
                    onLoadStart={handleVideoLoadStart}
                    onLoadedData={handleVideoLoaded}
                    preload="metadata"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )}
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-full">
              <Card className="border-0 shadow-none pt-4">
                <CardContent className="flex aspect-video relative p-0 overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`Project image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    className="object-cover"
                    onLoad={() => handleImageLoad(index)}
                    loading={
                      index === 0 || index === activeIndex ? "eager" : "lazy"
                    }
                    priority={index === 0}
                    quality={activeIndex === index ? 75 : 40}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
});
