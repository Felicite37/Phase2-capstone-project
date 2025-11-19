"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link,
  ImageIcon,
  Eye,
  Code,
  Trash2,
  Save,
} from "lucide-react";

interface EditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
}

export function Editor({ initialContent = "", onSave }: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  const applyFormatting = (type: string) => {
    const textarea = document.getElementById(
      "editor-textarea"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || "text";

    let formattedText = "";

    switch (type) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `<u>${selectedText}</u>`;
        break;
      case "h1":
        formattedText = `# ${selectedText}`;
        break;
      case "h2":
        formattedText = `## ${selectedText}`;
        break;
      case "quote":
        formattedText = `> ${selectedText}`;
        break;
      case "code":
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
        break;
      case "link":
        formattedText = `[${selectedText}](https://)`;
        break;
      case "ul":
        formattedText = `- ${selectedText}`;
        break;
      case "ol":
        formattedText = `1. ${selectedText}`;
        break;
      case "image":
        formattedText = `![alt text](image-url)`;
        break;
    }

    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  const handleSave = () => {
    onSave?.(content);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Toolbar */}
      <div className="border-b border-border bg-card sticky top-0 z-40 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 flex-wrap">
            <div className="flex items-center gap-1 border-r border-border pr-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("h1")}
                title="Heading 1"
                className="h-8 w-8"
              >
                <Heading1 size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("h2")}
                title="Heading 2"
                className="h-8 w-8"
              >
                <Heading2 size={16} />
              </Button>
            </div>

            <div className="flex items-center gap-1 border-r border-border px-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("bold")}
                title="Bold"
                className="h-8 w-8"
              >
                <Bold size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("italic")}
                title="Italic"
                className="h-8 w-8"
              >
                <Italic size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("underline")}
                title="Underline"
                className="h-8 w-8"
              >
                <Underline size={16} />
              </Button>
            </div>

            <div className="flex items-center gap-1 border-r border-border px-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("ul")}
                title="Bullet List"
                className="h-8 w-8"
              >
                <List size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("ol")}
                title="Numbered List"
                className="h-8 w-8"
              >
                <ListOrdered size={16} />
              </Button>
            </div>

            <div className="flex items-center gap-1 border-r border-border px-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("quote")}
                title="Quote"
                className="h-8 w-8"
              >
                <Quote size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("code")}
                title="Code Block"
                className="h-8 w-8"
              >
                <Code size={16} />
              </Button>
            </div>

            <div className="flex items-center gap-1 px-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("link")}
                title="Link"
                className="h-8 w-8"
              >
                <Link size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyFormatting("image")}
                title="Image"
                className="h-8 w-8"
              >
                <ImageIcon size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isPreview ? "default" : "ghost"}
              onClick={() => setIsPreview(!isPreview)}
              className="gap-2"
            >
              <Eye size={16} />
              <span className="hidden sm:inline">
                {isPreview ? "Editing" : "Preview"}
              </span>
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Save size={16} />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>

        {/* Word Count */}
        <div className="text-xs text-muted-foreground">
          {content.split(/\s+/).filter(Boolean).length} words · {content.length}{" "}
          characters
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="flex-1 overflow-hidden">
        {!isPreview ? (
          <textarea
            id="editor-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your article here... Use Markdown for formatting."
            className="w-full h-full p-8 bg-background text-foreground font-mono text-base resize-none focus:outline-none border-none"
          />
        ) : (
          <div className="p-8 overflow-auto max-h-full prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none">
            <div className="prose-content">
              {content.split("\n\n").map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap break-words"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
