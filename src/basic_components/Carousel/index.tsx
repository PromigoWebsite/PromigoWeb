import { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type CarouselProps = {
  options?: EmblaOptionsType;
  children: ReactNode;
  className?: string;
  slideSize?: string; // Untuk mengatur ukuran slide secara uniform
  slideGap?: string; // Untuk mengatur gap antar slide
};

const Carousel = ({
  options,
  children,
  className = "",
  slideSize = "auto", // Default auto, atau bisa "50%", "300px", etc.
  slideGap = "1rem",
}: CarouselProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    ...options,
  });

  // Generate CSS custom properties untuk slide sizing
  const containerStyle = {
    "--slide-size": slideSize,
    "--slide-gap": slideGap,
  } as React.CSSProperties;

  return (
    <div className={`overflow-hidden ${className}`} ref={emblaRef}>
      <div className="flex" style={containerStyle}>
        {children}
      </div>
    </div>
  );
};

export default Carousel;
