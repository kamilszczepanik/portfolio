import * as React from "react";
import { memo, useState, useEffect } from "react";

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
import { Play } from "lucide-react";

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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeIndex);
  }, [api, activeIndex]);

  useEffect(() => {
    if (!api || !setActiveIndex) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setActiveIndex(selectedIndex);
      if (selectedIndex === images.length && videoPath) {
        setIsVideoPlaying(false);
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setActiveIndex, images.length, videoPath]);

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>
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
        {videoPath && (
          <CarouselItem>
            <div className="w-full">
              <Card className="border-0 shadow-none pt-4">
                <CardContent className="flex aspect-video relative p-0 overflow-hidden rounded-lg">
                  {!isVideoPlaying ? (
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Image
                        src={images[0]}
                        alt="Video thumbnail"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                        className="object-cover"
                        priority
                        quality={75}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="rounded-full bg-black/60 w-12 h-12 flex items-center justify-center">
                          <Play fill="white" size={24} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <video
                      src={videoPath}
                      controls
                      className="w-full h-full object-contain rounded-lg"
                      preload="metadata"
                      autoPlay
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
});
