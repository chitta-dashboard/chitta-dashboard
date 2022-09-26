import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./richtext";
import { Box } from "@mui/material";

type Props = {};

const Editor = (props: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Type Here",
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "2px solid green",
        background: "#fff",
        justifyContent:"flex-start !important",
        borderRadius: "20px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
};

export default Editor;
