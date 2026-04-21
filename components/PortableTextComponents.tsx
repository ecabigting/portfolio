import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

interface CodeBlockValue {
  language?: string;
  code: string;
  _highlightedHtml?: string;
}

interface ImageValue {
  url: string;
  alt?: string;
  attribution?: {
    description: string;
    link: string;
  };
}

const CodeBlock = ({ value }: { value: CodeBlockValue }) => {
  const codeContent = value._highlightedHtml ?? value.code;
  const langMap: Record<string, string> = {
    javascript: 'JavaScript',
    js: 'JavaScript',
    typescript: 'TypeScript',
    ts: 'TypeScript',
    python: 'Python',
    py: 'Python',
    rust: 'Rust',
    rs: 'Rust',
    bash: 'Bash',
    sh: 'Terminal',
    shell: 'Terminal',
    terminal: 'Terminal',
    batchfile: 'Terminal',
    json: 'JSON',
    css: 'CSS',
    scss: 'SCSS',
    sass: 'SASS',
    html: 'HTML',
    jsx: 'JSX',
    tsx: 'TSX',
    xml: 'XML',
    yaml: 'YAML',
    sql: 'SQL',
    mysql: 'MySQL',
    csharp: 'C#',
    CSHARP: 'C#',
    c: 'C',
    'c++': 'C++',
    cpp: 'C++',
    java: 'Java',
    ruby: 'Ruby',
    php: 'PHP',
    markdown: 'Markdown',
    groq: 'Groq',
    text: 'Plain Text',
    plaintext: 'Plain Text',
    'Plain text': 'Plain Text'
  };
  const displayLang = value.language ? (langMap[value.language] || value.language) : null;
  return (
    <div className="my-4 ">
      {displayLang && displayLang !== 'Plain Text' && (
        <div className="px-3 py-1 text-xs font-extrabold bg-zinc-900 text-zinc-400 rounded-t-lg -mb-px">
          {displayLang}
        </div>
      )}
      <div
        className="overflow-x-auto rounded-b-lg bg-zinc-100 dark:bg-zinc-800"
        dangerouslySetInnerHTML={{ __html: codeContent }}
      />
    </div>
  );
};

const SanityImage = ({ value }: { value: ImageValue }) => {
  if (!value.url || value.url === "") {
    return null;
  }
  
  return (
    <div className="relative w-full">
      <Image
        src={value.url}
        alt={value.alt ?? ""}
        width={300}
        height={300}
        className="w-full h-auto object-cover"
      />
{/* Attribution for block content images */}
{value.attribution && (
  <div className="mt-0 text-xs text-zinc-400 italic text-center">
    <span>{value.attribution.description}</span>
    {value.attribution.link && (
      <>
        {" "}
        <a
          href={value.attribution.link}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          source
        </a>
      </>
    )}
  </div>
)}
    </div>
  );
};

export const portableTextComponents: PortableTextComponents = {
  types: {
    code: CodeBlock,
    image: SanityImage,
  },
};
