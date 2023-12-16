import { Clipboard, ClipboardCheck } from "lucide-react";
import { useRef, useState } from "react";

export const Copy = () => {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  function copy() {
    if (!ref.current) {
      return;
    }
    const text = ref.current.parentNode?.textContent;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }

  return (
    <button ref={ref} onClick={copy} className="mx-1 ">
      {copied ? <ClipboardCheck size={14} /> : <Clipboard size={14} />}
    </button>
  );
};
