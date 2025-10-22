import { Input } from "./input";
import { Paperclip } from "lucide-react";

export function FileInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group hover:bg-accent rounded-md">
      <Input
        id="picture"
        type="file"
        accept="image/*"
        className="bg-transparent z-10 relative"
        {...props}
      />
      <Paperclip className="absolute mr-3 top-2.5 right-0 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity z-0" />
    </div>
  );
}
