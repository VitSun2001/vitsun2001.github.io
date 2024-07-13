import {IconProps} from "./IconProps.ts";

export function IconCircle({size = "1rem", color = "currentColor"}: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill={color}/>
        </svg>
    );
}