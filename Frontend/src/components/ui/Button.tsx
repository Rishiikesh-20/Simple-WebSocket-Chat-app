import { ReactElement } from "react";

type VariantType = "primary" | "secondary";
export type SizeType = "sm" | "md" | "lg";
export type ColorType = "white" | "purple-500" | "blue-500" | "red-500" | "green-500" | "black";

interface ButtonProps {
  text: string;
  variant: VariantType;
  color: ColorType;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: SizeType;
  onClick: () => void;
}

const variantMap = new Map<VariantType, string>();
variantMap.set("primary", "bg-purple-700 hover:bg-purple-800");
variantMap.set("secondary", "bg-purple-300 hover:bg-purple-400");

const sizeMap = new Map<SizeType, string>();
sizeMap.set("sm", "px-4 py-2 text-sm rounded-md");
sizeMap.set("md", "px-6 py-3 text-base rounded-md");
sizeMap.set("lg", "px-8 py-4 text-lg rounded-lg");

const colorMap = new Map<ColorType, string>();
colorMap.set("white", "text-white");
colorMap.set("purple-500", "text-purple-500");
colorMap.set("blue-500", "text-blue-500");
colorMap.set("red-500", "text-red-500");
colorMap.set("green-500", "text-green-500");
colorMap.set("black", "text-black");

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`flex items-center justify-center 
        ${variantMap.get(props.variant)} 
        ${sizeMap.get(props.size)} 
        ${colorMap.get(props.color)} 
        focus:outline-none transition duration-200`}
    >
      {props.startIcon ? <div className="mr-2">{props.startIcon}</div> : null}
      <div>{props.text}</div>
      {props.endIcon ? <div className="ml-2">{props.endIcon}</div> : null}
    </button>
  );
}
