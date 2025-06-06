import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  id: string | number;
  imageUrl: string;
  title?: string;
  description?: string;
  link?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, autoplayDelay = 4000 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );

  console.log("Rendering Carousel with", slides.length, "slides.");

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={slide.id}>
              <Card className="m-1 shadow-none border-none rounded-lg overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title || `Slide ${slide.id}`}
                    className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                  />
                  {(slide.title || slide.description) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                      {slide.title && <h3 className="text-lg font-semibold">{slide.title}</h3>}
                      {slide.description && <p className="text-sm">{slide.description}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};
export default Carousel;