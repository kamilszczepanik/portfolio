import * as React from "react";

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

export function ImagesCarousel({
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
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    api.scrollTo(activeIndex);
  }, [api, activeIndex]);

  React.useEffect(() => {
    if (!api || !setActiveIndex) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setActiveIndex]);

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>
        {videoPath && (
          <CarouselItem>
            <div className="p-1 w-full">
              <Card className="border-0 shadow-none">
                <CardContent className="flex aspect-video rounded-lg">
                  <video
                    src={videoPath}
                    controls
                    className="w-full h-fit mt-6 object-contain rounded-lg"
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
