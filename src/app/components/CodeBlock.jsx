import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";


const CodeBlock = ({ language, value }) => {
  const normalizedLanguage = language === "golang" ? "go" : language;
  return (
    <div>
      <SyntaxHighlighter language={normalizedLanguage} style={vscDarkPlus} className='rounded-lg'>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
