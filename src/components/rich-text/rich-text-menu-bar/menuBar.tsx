import { Editor } from "@tiptap/react";
import { FC } from "react";
import "../../../assets/css/index.css";
import S from "../richText.styled";

type TextEditor = {
  editor : Editor | null
}

const MenuBar: FC<TextEditor> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <S.ToolbarBox className="menu-bar">
        <S.ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is-active" : ""}>
          bold
        </S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "is-active" : ""}>
          italic
        </S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "is-active" : ""}>
          strike
        </S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "is-active" : ""}>
          underline
        </S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive("paragraph") ? "is-active" : ""}>
          paragraph
        </S.ToolbarBtn>
        <S.ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        >
          h1
        </S.ToolbarBtn>
        <S.ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        >
          h2
        </S.ToolbarBtn>
        <S.ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        >
          h3
        </S.ToolbarBtn>
        <S.ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        >
          h4
        </S.ToolbarBtn>
        <S.ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
        >
          h5
        </S.ToolbarBtn>
        <S.ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
        >
          h6
        </S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
          bullet list
        </S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""}>
          ordered list
        </S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "is-active" : ""}>
          blockquote
        </S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().undo().run()}>undo</S.ToolbarBtn>
        <S.ToolbarBtn onClick={() => editor.chain().focus().redo().run()}>redo</S.ToolbarBtn>
      </S.ToolbarBox>
    </>
  );
};

export default MenuBar;
