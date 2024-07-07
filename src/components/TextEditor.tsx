import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

interface Props {
    initialValues?: {
        description: string;
    };
    onChange: (htmlContent: string) => void;
}

const TextEditor: React.FC<Props> = ({ initialValues, onChange }) => {
    const [editorState, setEditorState] = useState(() => {
        const html = initialValues?.description || '';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            return EditorState.createWithContent(contentState);
        }
        return EditorState.createEmpty();
    });

    useEffect(() => {
        const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        onChange(htmlContent);
    }, [editorState, onChange]);

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            onEditorStateChange={newEditorState => {
                setEditorState(newEditorState);
            }}
        />
    );
};

export default TextEditor;
