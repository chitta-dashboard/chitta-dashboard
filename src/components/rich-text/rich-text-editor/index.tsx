import { FC } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import MenuBar from "../rich-text-menu-bar/menuBar";

import S from "../richText.styled";


type EditorProps = {
  cb: (plainText: string, richText: string) => void;
};

const Editor: FC<EditorProps> = ({ cb }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
    autofocus: true,
    onUpdate: ({ editor }) => {
      cb(editor.getText(), String(editor.getHTML()));
    },
  });
  
  return (
    <S.RichTextBoxWrapper>
      <S.RichTextLabel>தீர்மானம்</S.RichTextLabel>
      <S.TextBox>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </S.TextBox>
    </S.RichTextBoxWrapper>
  );
};

export default Editor;
