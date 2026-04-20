import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

interface CodeBlockValue {
  language?: string;
  code: string;
  _highlightedHtml?: string;
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
    <div className="my-4 rounded-lg overflow-hidden">
      {displayLang && displayLang !== 'Plain Text' && (
        <div className="px-3 py-1 text-xs font-extrabold bg-zinc-800 text-zinc-400 rounded-t-lg -mb-px">
          {displayLang}
        </div>
      )}
      <div
        className="overflow-x-auto bg-zinc-100 dark:bg-zinc-800"
        dangerouslySetInnerHTML={{ __html: codeContent }}
      />
    </div>
  );
};

const SanityImage = ({ value }: { value: { url: string; alt?: string } }) => {
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
    </div>
  );
};

export const portableTextComponents: PortableTextComponents = {
  types: {
    code: CodeBlock,
    image: SanityImage,
  },
};
