import Typography from '@tiptap/extension-typography';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { CodeBlockExtension } from './CodeBlockExtension';

function parseFrontmatter(content: string): { frontmatter: string; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: '', body: content };
  return { frontmatter: match[1]!, body: match[2]! };
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim();
}

/**
 * Serialize-compare TipTap's markdown round-trip against the source body
 * (whitespace-normalized). Returns false when the rich editor would rewrite
 * the document — callers must open source view instead and never autosave a
 * lossy serialization.
 */
export function markdownRoundTrips(source: string): boolean {
  const { body } = parseFrontmatter(source);
  let editor: Editor | null = null;
  try {
    editor = new Editor({
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3, 4, 5, 6] },
          bulletList: { keepMarks: true, keepAttributes: false },
          orderedList: { keepMarks: true, keepAttributes: false },
          codeBlock: false,
          hardBreak: { keepMarks: false },
        }),
        CodeBlockExtension,
        Typography,
        Markdown.configure({
          html: false,
          transformPastedText: true,
          transformCopiedText: true,
        }),
      ],
      content: body,
      editable: false,
    });
    const markdownStorage = (editor.storage as { markdown?: { getMarkdown?: () => string } }).markdown;
    const serialized = markdownStorage?.getMarkdown?.() ?? editor.getText();
    return normalizeWhitespace(body) === normalizeWhitespace(serialized);
  } catch {
    return false;
  } finally {
    editor?.destroy();
  }
}
