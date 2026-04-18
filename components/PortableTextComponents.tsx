import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

// Code block component with syntax highlighting
interface CodeBlockValue {
  language?: string;
  code: string;
  _highlightedHtml?: string;
}

const CodeBlock = ({ value }: { value: CodeBlockValue }) => {
  const codeContent = value._highlightedHtml ?? value.code;

  // Extract language for display (handle golang -> go mapping)
  const langMap: Record<string, string> = {
    golang: 'go',
    javascript: 'javascript',
    js: 'javascript',
    typescript: 'typescript',
    ts: 'typescript',
    python: 'python',
    py: 'python',
    rust: 'rust',
    rs: 'rust',
    bash: 'bash',
    sh: 'bash',
    shell: 'shell'
  };
  const displayLang = value.language ? (langMap[value.language.toLowerCase()] || value.language) : null;

  return (
    <div className="my-4 rounded-lg overflow-hidden">
      {displayLang && displayLang !== 'plaintext' && displayLang !== 'text' && (
        <div className="px-3 py-1 text-xs font-extrabold bg-zinc-800 text-zinc-400 rounded-t-lg -mb-px ">
          {displayLang.toUpperCase()}
        </div>
      )}
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: codeContent }}
      />
    </div>
  );
};
// Image component (expects pre-resolved URL from Sanity query)
const SanityImage = ({ value }: { value: { url: string; alt?: string } }) => {
  // Handle case where URL is missing or empty
  if (!value.url || value.url === "") {
    return null; // Or render a placeholder
  }

  return (
    <div className="relative w-full">
      <Image
        src={value.url}
        alt={value.alt ?? ""}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};
// Components map
export const portableTextComponents: PortableTextComponents = {
  types: {
    code: CodeBlock,
    image: SanityImage,
    // Add other custom types as needed
  },
};
