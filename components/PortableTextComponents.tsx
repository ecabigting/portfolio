import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

// Code block component with language indicator (no JS required)
const CodeBlock = ({ value }: { value: { language?: string; code: string } }) => {
  return (
    <div className="bg-zinc-900 rounded-md overflow-hidden">
      {/* Language label */}
      <div className={`
        flex items-center justify-between px-3 py-1.5 text-xs font-medium
        bg-zinc-800 text-zinc-300 border-b
        ${value.language && value.language !== 'plaintext' ? '' : 'hidden'}
      `}>
        <span>{value.language && value.language !== 'plaintext' ? value.language.toUpperCase() : 'TEXT'}</span>
      </div>
      {/* Code content */}
      <pre className="p-4 overflow-x-auto">
        <code className="block text-zinc-100">{value.code}</code>
      </pre>
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
