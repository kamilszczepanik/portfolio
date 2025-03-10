import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export function ImagesCarousel({
  images,
  videoPath,
}: {
  images: string[];
  videoPath?: string;
}) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {videoPath && (
          <CarouselItem>
            <div className="p-1 w-full">
              <Card className="border-0 shadow-none">
                <CardContent className="flex aspect-video relative p-0 overflow-hidden rounded-lg">
                  <video
                    src={videoPath}
                    controls
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )}
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-full">
              <Card className="border-0 shadow-none">
                <CardContent className="flex aspect-video relative p-0 overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`Project image ${index + 1}`}
                    fill
                    className="object-cover"
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
}
