"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { HTMLAttributes, useState } from "react";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  textToCopy: string;
  displayText?: string;
  className?: string;
}

export function ScriptCopyBtn({
  textToCopy,
  displayText,
  className,
}: ScriptCopyBtnProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "mx-auto flex max-w-md items-center justify-center",
        className
      )}
    >
      <div className="w-full space-y-2">
        <div className="relative flex items-center">
          <div className="min-w-0 grow">
            <code className="block bg-muted px-4 py-2 rounded font-mono text-sm text-center">
              {displayText || textToCopy}
            </code>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="relative ml-2 rounded-md"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Copy
              className={`h-4 w-4 transition-all duration-300 ${
                copied ? "scale-0" : "scale-100"
              }`}
            />
            <Check
              className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
                copied ? "scale-100" : "scale-0"
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
