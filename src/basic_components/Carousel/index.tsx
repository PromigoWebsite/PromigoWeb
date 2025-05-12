import React, { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel"; 

type CarouselProps = {
  options?: EmblaOptionsType;
  children: ReactNode;
  className?: string;
};

const Carousel = ({ options, children, className = "" }: CarouselProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    ...options,
  });

  return (
    <div className={`overflow-hidden ${className}`} ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  );
};

export default Carousel;
