import {IconProps} from "./IconProps.ts";

export function IconCross({size = "1rem", color = "currentColor"}: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M31.9999 4L27.9999 0L16 12L4.00001 8.10623e-06L1.28746e-05 4.00001L12 16L0 28L3.99999 32L16 20L27.9999 32L31.9999 28L20 16L31.9999 4Z"
                  fill={color}/>
        </svg>
    );
}