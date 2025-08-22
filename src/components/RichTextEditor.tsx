"use client";
import { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const insertCode = () => {
    const code = prompt('Enter code:');
    if (code) {
      execCommand('insertHTML', `<code>${code}</code>`);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg dark:border-gray-600">
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isBold ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isItalic ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isUnderline ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Underline"
        >
          <u>U</u>
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h1>')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h2>')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h3>')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Heading 3"
        >
          H3
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Numbered List"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Quote"
        >
          &quot;
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button
          type="button"
          onClick={insertLink}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Insert Link"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={insertImage}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Insert Image"
        >
          🖼️
        </button>
        <button
          type="button"
          onClick={insertCode}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Insert Code"
        >
          &lt;/&gt;
        </button>
      </div>
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-4 min-h-[300px] focus:outline-none bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
          suppressContentEditableWarning
        />
        {!value && placeholder && (
          <div className="absolute top-4 left-4 pointer-events-none text-gray-400 dark:text-gray-500">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
