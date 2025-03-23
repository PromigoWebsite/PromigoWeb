import * as lucideIcons from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export const {icons} = lucideIcons;

interface LucideProps extends React.ComponentPropsWithoutRef<"svg">{
    icon: keyof typeof icons;
    title?: string;
}

export default function Lucide(props: LucideProps){
    const {icon, className, ...computedCrops} = props;
    const Component = icons[props.icon];

    if(!Component) return null;

    return(
        <Component
            {...computedCrops}
            className={twMerge(["stroke-1 w-5 h-5",props.className])}
        />
    )
}