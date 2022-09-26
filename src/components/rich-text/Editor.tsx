import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./menuBar";

import S from "./richText.styled";

type Props = {};

const Editor = (props: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Type Here",
    autofocus: true,
    // enableInputRules: true,
  });

  return (
    <S.TextBox>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </S.TextBox>
  );
};

export default Editor;
