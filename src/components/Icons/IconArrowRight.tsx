import {IconProps} from "./IconProps.ts";

export function IconArrowRight({size = "1rem", color = "currentColor"}: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8.57993 0.585786C9.35318 -0.195262 10.6069 -0.195262 11.3801 0.585786L23.8401 13.1716C25.3866 14.7337 25.3866 17.2663 23.8401 18.8284L11.3801 31.4142C10.6069 32.1953 9.35318 32.1953 8.57993 31.4142C7.80669 30.6332 7.80669 29.3668 8.57993 28.5858L21.04 16L8.57993 3.41421C7.80669 2.63317 7.80669 1.36683 8.57993 0.585786Z"
                  fill={color}/>
        </svg>
    );
}