import {IconProps} from "./IconProps.ts";

export function IconStar({size = "1rem", color = "currentColor"}: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 0C16 0 18.4014 7.0877 21.6569 10.3431C24.9123 13.5986 32 16 32 16C32 16 24.9123 18.4014 21.6569 21.6569C18.4014 24.9123 16 32 16 32C16 32 13.5986 24.9123 10.3431 21.6569C7.0877 18.4014 0 16 0 16C0 16 7.0877 13.5986 10.3431 10.3431C13.5986 7.0877 16 0 16 0Z"
                fill={color}/>
        </svg>
    );
}