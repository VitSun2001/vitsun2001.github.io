import {IconProps} from "./IconProps.ts";

export function IconArrowLeft({size = "1rem", color = "currentColor"}: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M23.4201 31.4142C22.6468 32.1953 21.3931 32.1953 20.6199 31.4142L8.15986 18.8284C6.61337 17.2663 6.61338 14.7337 8.15987 13.1716L20.6199 0.585786C21.3931 -0.195261 22.6468 -0.195261 23.4201 0.585787C24.1933 1.36683 24.1933 2.63317 23.4201 3.41421L10.96 16L23.4201 28.5858C24.1933 29.3668 24.1933 30.6332 23.4201 31.4142Z"
                  fill={color}/>
        </svg>
    );
}