import { FC } from "react";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import S from "../richText.styled";
import MenuBar from "../rich-text-menu-bar/menuBar";

type EditorProps = {
  cb: (plainText: string, richText: string) => void;
  defaultValue?: string;
};

const Editor: FC<EditorProps> = ({ cb, defaultValue = "" }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: defaultValue,
    autofocus: true,
    onUpdate: ({ editor }) => {
      cb(editor.getText(), String(editor.getHTML()));
    },
    onCreate: ({ editor }) => {
      if (defaultValue) cb(editor.getText(), String(editor.getHTML()));
    },
  });

  return (
    <S.RichTextBoxWrapper>
      <S.RichTextLabel>தீர்மானம் *</S.RichTextLabel>
      <S.TextBox>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </S.TextBox>
    </S.RichTextBoxWrapper>
  );
};

export default Editor;
