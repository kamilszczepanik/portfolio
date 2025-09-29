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
import { cn } from "@/lib/utils";

export const ImagesCarousel = memo(function ImagesCarousel({
  images,
  videoPath,
  activeIndex = 0,
  setActiveIndex,
  slug,
  youtubeUrl,
}: {
  images: string[];
  videoPath?: string;
  activeIndex?: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
  slug?: string;
  youtubeUrl?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const isMobileProject = slug === "reflex";

  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeIndex);
  }, [api, activeIndex]);

  useEffect(() => {
    if (!api || !setActiveIndex) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setActiveIndex(selectedIndex);
      if (selectedIndex === images.length && (videoPath || youtubeUrl)) {
        setIsVideoPlaying(false);
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setActiveIndex, images.length, videoPath, youtubeUrl]);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-full">
              <Card className="border-0 shadow-none pt-4">
                <CardContent
                  className={cn(
                    "flex aspect-video relative p-0 overflow-hidden rounded-lg",
                    isMobileProject && "bg-black"
                  )}
                >
                  <Image
                    src={image}
                    alt={`Project image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    className={cn(
                      isMobileProject ? "object-contain" : "object-cover"
                    )}
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
        {(videoPath || youtubeUrl) && (
          <CarouselItem>
            <div className="w-full">
              <Card className="border-0 shadow-none pt-4">
                <CardContent
                  className={cn(
                    "flex aspect-video relative p-0 overflow-hidden rounded-lg",
                    isMobileProject && "bg-black"
                  )}
                >
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
                        className={cn(
                          isMobileProject ? "object-contain" : "object-cover"
                        )}
                        priority
                        quality={75}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="rounded-full bg-black/60 w-12 h-12 flex items-center justify-center">
                          <Play fill="white" size={24} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : youtubeUrl ? (
                    <iframe
                      src={getYouTubeEmbedUrl(youtubeUrl) || ""}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-contain rounded-lg"
                    ></iframe>
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
