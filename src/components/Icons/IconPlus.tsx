import {IconProps} from "./IconProps.ts";

export function IconPlus({size = "1rem", color = "currentColor"}: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="13" width="32" height="6" fill={color}/>
            <rect x="13" width="6" height="32" fill={color}/>
        </svg>
    );
}