import React, { FC } from "react";
import { SVGClassNameProps, SvgProps } from "@/types/interface.types";

export const SearchBasicIcon: FC<SVGClassNameProps> = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
export const CloseIconThin: FC<SvgProps> = ({
  width = 24,
  height = 24,
  size,
  fill = "currentColor",
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      viewBox="0 0 24 24"
      height={iconHeight}
      width={iconWidth}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Menu / Close_MD">
          <path
            id="Vector"
            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const AccountIconBold: FC<SvgProps> = ({
  width = 24,
  height = 24,
  size,
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      height={iconHeight}
      width={iconWidth}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style={{ transformOrigin: "center center" }}>
        <circle cx="12" cy="12" fill="#FC74FE29" r="12"></circle>
        <g transform="translate(4, 4) scale(0.3333333333333333)">
          <path
            clipRule="evenodd"
            d="M13.2 6C9.22355 6 6 9.22355 6 13.2V34.8C6 38.7765 9.22355 42 13.2 42H34.8C38.7765 42 42 38.7765 42 34.8V13.2C42 9.22355 38.7765 6 34.8 6H13.2ZM24 33C28.9706 33 33 28.9706 33 24C33 19.0294 28.9706 15 24 15C19.0294 15 15 19.0294 15 24C15 28.9706 19.0294 33 24 33Z"
            fill="#AE22B0"
            fillRule="evenodd"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const DownIconBold: FC<SvgProps> = ({
  width = 12,
  height = 12,
  fill = "currentColor",
  size,
  ...props
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6979 16.2453L6.31787 9.75247C5.58184 8.66118 6.2058 7 7.35185 7L16.6482 7C17.7942 7 18.4182 8.66243 17.6821 9.75247L13.3021 16.2453C12.623 17.2516 11.377 17.2516 10.6979 16.2453Z"
        fill={fill}
      ></path>
    </svg>
  );
};

export const ChevronDownIconThin: FC<SvgProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  size,
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      fill="none"
      height={iconHeight}
      viewBox="0 0 24 24"
      width={iconWidth}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const ArrowDownIconThin: FC<SvgProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  size,
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
};

export const SettingIconBold: FC<SvgProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  size,
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sc-cDvQBt oYAqb"
    >
      <path
        d="M20.83 14.6C19.9 14.06 19.33 13.07 19.33 12C19.33 10.93 19.9 9.93999 20.83 9.39999C20.99 9.29999 21.05 9.1 20.95 8.94L19.28 6.06C19.22 5.95 19.11 5.89001 19 5.89001C18.94 5.89001 18.88 5.91 18.83 5.94C18.37 6.2 17.85 6.34 17.33 6.34C16.8 6.34 16.28 6.19999 15.81 5.92999C14.88 5.38999 14.31 4.41 14.31 3.34C14.31 3.15 14.16 3 13.98 3H10.02C9.83999 3 9.69 3.15 9.69 3.34C9.69 4.41 9.12 5.38999 8.19 5.92999C7.72 6.19999 7.20001 6.34 6.67001 6.34C6.15001 6.34 5.63001 6.2 5.17001 5.94C5.01001 5.84 4.81 5.9 4.72 6.06L3.04001 8.94C3.01001 8.99 3 9.05001 3 9.10001C3 9.22001 3.06001 9.32999 3.17001 9.39999C4.10001 9.93999 4.67001 10.92 4.67001 11.99C4.67001 13.07 4.09999 14.06 3.17999 14.6H3.17001C3.01001 14.7 2.94999 14.9 3.04999 15.06L4.72 17.94C4.78 18.05 4.89 18.11 5 18.11C5.06 18.11 5.12001 18.09 5.17001 18.06C6.11001 17.53 7.26 17.53 8.19 18.07C9.11 18.61 9.67999 19.59 9.67999 20.66C9.67999 20.85 9.82999 21 10.02 21H13.98C14.16 21 14.31 20.85 14.31 20.66C14.31 19.59 14.88 18.61 15.81 18.07C16.28 17.8 16.8 17.66 17.33 17.66C17.85 17.66 18.37 17.8 18.83 18.06C18.99 18.16 19.19 18.1 19.28 17.94L20.96 15.06C20.99 15.01 21 14.95 21 14.9C21 14.78 20.94 14.67 20.83 14.6ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
        fill={fill}
      ></path>
    </svg>
  );
};

export const CheckIcon: FC<SvgProps> = ({
  size,
  fill,
  width = 24,
  height = 24,
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill={fill}
      />
    </svg>
  );
};

export const CloseIcon: FC<SvgProps> = ({
  size,
  fill,
  width = 24,
  height = 24,
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={iconHeight}
      width={iconWidth}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
};

export const HamburgerMenuIcon = () => {
  return (
    <svg
      viewBox="0 0 18 12"
      fill="none"
      strokeWidth="8"
      style={{
        color: "rgb(155, 155, 155)",
        width: 22,
        height: 22,
        cursor: "pointer",
      }}
    >
      <path
        d="M1.5 6H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M1.5 1H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M1.5 11H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
export const RightArrowColorIcon: React.FC<SvgProps> = ({
  width = 20,
  height = 20,
  size,
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;
  return (
    <svg
      viewBox="0 0 24 24"
      height={iconHeight}
      width={iconWidth}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs>
          <path
            id="right-a"
            d="M2.29289322,0.292893219 C2.68341751,-0.0976310729 3.31658249,-0.0976310729 3.70710678,0.292893219 C4.09763107,0.683417511 4.09763107,1.31658249 3.70710678,1.70710678 L1.70710678,3.70710678 C1.31658249,4.09763107 0.683417511,4.09763107 0.292893219,3.70710678 C-0.0976310729,3.31658249 -0.0976310729,2.68341751 0.292893219,2.29289322 L2.29289322,0.292893219 Z"
          ></path>
          <path
            id="right-c"
            d="M3.41421356,4 L13.0014708,4 C13.5529433,4 14,4.44771525 14,5 C14,5.55228475 13.5529433,6 13.0014708,6 L3.41421356,6 L5.70710678,8.29289322 C6.09763107,8.68341751 6.09763107,9.31658249 5.70710678,9.70710678 C5.31658249,10.0976311 4.68341751,10.0976311 4.29289322,9.70710678 L0.292893219,5.70710678 C-0.0976310729,5.31658249 -0.0976310729,4.68341751 0.292893219,4.29289322 L4.29289322,0.292893219 C4.68341751,-0.0976310729 5.31658249,-0.0976310729 5.70710678,0.292893219 C6.09763107,0.683417511 6.09763107,1.31658249 5.70710678,1.70710678 L3.41421356,4 Z"
          ></path>
        </defs>
        <g fill="none" fill-rule="evenodd" transform="matrix(-1 0 0 1 19 7)">
          <g transform="translate(3 1)">
            <mask id="right-b" fill="#ffffff">
              <use xlinkHref="#right-a"></use>
            </mask>
            <use fill="#D8D8D8" fill-rule="nonzero" xlinkHref="#right-a"></use>
            <g fill="#FFA0A0" mask="url(#right-b)">
              <rect width="24" height="24" transform="translate(-8 -8)"></rect>
            </g>
          </g>
          <mask id="right-d" fill="#ffffff">
            <use xlinkHref="#right-c"></use>
          </mask>
          <use fill="#000000" fill-rule="nonzero" xlinkHref="#right-c"></use>
          <g fill="#7600FF" mask="url(#right-d)">
            <rect width="24" height="24" transform="translate(-5 -7)"></rect>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const XSwapIcon: React.FC<SvgProps> = ({
  width = 20,
  height = 20,
  size,
}) => {
  const iconWidth = size ?? width;
  const iconHeight = size ?? height;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 411.113 413.447"
    >
      <g
        id="letter-logo-design-template-creative-modern-trendy-typography_196200-108"
        transform="translate(-207.5 619.789)"
      >
        <path
          id="Path_32775"
          data-name="Path 32775"
          d="M430.5-619c54.2,5,103.4,30.1,138.3,70.5,25.2,29.3,39.7,59.8,47.9,101,2.5,12.7,2.6,55.8,0,69.1-4.5,23.8-12.6,46.7-23.3,65.9-9.5,16.9-27.6,40.8-29.4,38.8-.5-.4-11-19.7-23.5-42.8S506.2-379.9,492-406c-40.2-74.1-70.3-129.8-74.5-137.8-2.2-3.9-4.2-7.2-4.5-7.2s-8.9,15.6-19.3,34.8C318.6-377.1,262.3-273.8,261.5-273.6c-1.4.2-12.8-13.8-19.9-24.4-15.8-23.6-25.7-47.8-31.8-78.3-2-9.9-2.3-14.1-2.3-36.7,0-27.5.6-32.1,6.5-54.6,11.2-42.2,37.2-81.2,73-109.1C327-607.9,380.4-623.6,430.5-619Zm3,255.7c10.9,20.3,31.4,58.2,45.6,84.3s26,48.2,26.4,49.1c1.3,3.4-29.3,15-51,19.4-35.7,7.3-73.7,4.9-107-6.5-11.7-4.1-27.5-10.8-27.5-11.8,0-.9,92.5-171.2,93-171.2C413.3-400,422.5-383.5,433.5-363.3Z"
          fill="#ae22b0"
        />
      </g>
    </svg>
  );
};
