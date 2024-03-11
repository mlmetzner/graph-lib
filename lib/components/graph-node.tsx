import { cn } from "../utils/cn";

interface GraphNodeProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export default function GraphNodeComponent({
  children,
  className,
  ...props
}: GraphNodeProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex justify-center items-center bg-white h-full w-full text-center border-2 border-black p-2 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
