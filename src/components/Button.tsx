// import React from "react";

// interface ButtonProps {
//   title: string;
//   onClick?: any;
//   bgColor?: string;
//   icon?: string;
//   mailto?: string;
//   size?: string;
//   color?: string;
//   border?: string;
// }

// function Button({
//   title,
//   onClick,
//   bgColor,
//   icon,
//   size,
//   color,
//   border,
// }: ButtonProps) {
//   return (
//     <button
//       className="flex justify-center items-center space-x-3 font-sora rounded-xl py-4 px-10 text-nowrap text-[12px]"
//       style={{ backgroundColor: bgColor, color, border }}
//     >
//       {icon && <img src={icon} alt="" />}
//       <span>{title}</span>
//     </button>
//   );
// }

// export default Button;
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
  mailto?: string;
  size?: string;
  color?: string;
  border?: string;
  className?: string;
  disabled?: boolean;
}

function Button({
  children,
  disabled,
  onClick,
  bgColor,
  color,
  border,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center space-x-2 font-sora rounded-xl py-2 px-2 text-sm ${className}`}
      style={{ backgroundColor: bgColor, color, border }}
    >
      {children}
    </button>
  );
}

export default Button;
