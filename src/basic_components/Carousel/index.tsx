import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  children: ReactNode;
  options?: EmblaOptionsType;
  className?: string;
  slideSize?: string;
  slideSpacing?: string;
};

const Carousel: React.FC<PropType> = (props) => {
  const { 
    children, 
    options, 
    className = "",
    slideSize = "100%",
    slideSpacing = "1rem"
  } = props;
  
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
    ...options,
  });

  const containerStyle = {
    '--slide-size': slideSize,
    '--slide-spacing': slideSpacing,
  } as React.CSSProperties;

  return (
      <section className={`max-w-full mx-auto ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div 
          className="flex touch-pan-y touch-pinch-zoom"
          style={{
            marginLeft: `calc(${slideSpacing} * -1)`,
            ...containerStyle
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div 
              key={index}
              className="transform-gpu flex-shrink-0 min-w-0"
              style={{
                flex: `0 0 var(--slide-size, ${slideSize})`,
                paddingLeft: `var(--slide-spacing, ${slideSpacing})`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;