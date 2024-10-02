import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import './index.css';
import { convertToPlainText } from '../../../utils/Helper';

const handlePhoneClick = () => {
  // Phone icon click handler
};

const HeaderEditor = ({ name, text, onChange, addHeaderVariable, variables, removeHeaderVariable, maxCharacters = 45 }) => {
  const [bodyContent, setBodyContent] = useState(text);
  const [charCount, setCharCount] = useState(text.length); // Initialize with the length of initial text
  const quillRef = useRef(null); // Reference to Quill instance

  const handleBodyChange = (content) => {
    let textVal = convertToPlainText(content);
    setCharCount(textVal.length); // Update character count
    if (textVal.length <= maxCharacters) {
      setBodyContent(content);
      onChange({ target: { name: 'headerText', value: content } });

      // Check for removed variables
      variables.forEach((variable) => {
        const variableText = `{{${variable.label}}}`;
        if (!content.includes(variableText)) {
          removeHeaderVariable(variable.label); // Call removeHeaderVariable if variable no longer exists in the content
        }
      });
    }
  };

  // Function to insert text into the editor
  const addVariable1 = () => {
    const quill = quillRef.current?.getEditor(); // Ensure quill is properly initialized
    if (quill) {
      const cursorPosition = quill.getSelection().index;
      const variableLabel = variables[variables.length - 1].label.toString();
      const variableText = `{{${variableLabel}}}`;

      if (bodyContent.length + variableText.length <= maxCharacters) {
        quill.insertText(cursorPosition, variableText);
        quill.setSelection(cursorPosition + variableText.length); // Move the cursor after the inserted text
        handleBodyChange(quill.root.innerHTML); // Update the state and character count
      } else {
        // alert(`Cannot add variable, it will exceed the maximum character limit of ${maxCharacters}.`);
      }
    }
  };

  const handleKeyDown = (event) => {
    const quill = quillRef.current?.getEditor(); // Ensure quill is properly initialized
    if (event.key === 'Backspace' && quill) {
      const selection = quill.getSelection();
      if (selection) {
        const cursorPosition = selection.index;
        const [leaf] = quill.getLeaf(cursorPosition - 1);
        const leafText = leaf?.text || '';

        if (leafText.endsWith('}}')) {
          const variableStartIndex = leafText.lastIndexOf('{{');
          if (variableStartIndex !== -1) {
            const variableText = leafText.substring(variableStartIndex);
            quill.deleteText(cursorPosition - variableText.length, variableText.length);

            const variableLabel = variableText.replace(/{{|}}/g, '');
            removeHeaderVariable(variableLabel);
            event.preventDefault();
          }
        }
      }
    }
  };

  const handlePaste = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('Text');
    if (/\{\{\d+\}\}/.test(pastedText)) {
      event.preventDefault();
  
      setTimeout(() => {
        const quill = quillRef.current?.getEditor(); // Ensure quill is properly initialized
        if (quill) {
          const currentContent = quill.root.innerHTML;
          let selection = quill.getSelection();
          let cursorPosition = selection ? selection.index : null;
  
          if (cursorPosition === null || cursorPosition === undefined) {
            cursorPosition = quill.getLength();
          }
  
          addHeaderVariable('add');
          quill.insertText(cursorPosition, pastedText);
          handleBodyChange(quill.root.innerHTML);
          quill.setSelection(cursorPosition + pastedText.length);
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor(); // Initialize quill here
      const toolbar = quill.getModule('toolbar');

      toolbar.addHandler('phone', () => {
        handlePhoneClick();
        addHeaderVariable('add');
        addVariable1();
      });

      quill.root.addEventListener('keydown', handleKeyDown);
      quill.root.addEventListener('paste', handlePaste);
    }

    return () => {
      if (quillRef.current) {
        const quill = quillRef.current.getEditor(); // Ensure quill is properly initialized
        quill.root.removeEventListener('keydown', handleKeyDown);
        quill.root.removeEventListener('paste', handlePaste);
      }
    };
  }, [quillRef, addHeaderVariable, removeHeaderVariable, variables]);

  useEffect(() => {
    setBodyContent(text);
    let textVal = convertToPlainText(text);
    setCharCount(textVal.length); // Update character count
  }, [text]);

  return (
    <div className="editor-wrapper" style={{ position: 'relative' }}>
      <ReactQuill
        ref={quillRef}
        value={bodyContent}
        onChange={handleBodyChange}
        style={{ height: '100px', background: 'white' }} // Adjust the height as needed
        modules={{
          toolbar: {
            container: '#toolbar2',
            handlers: {
              phone: handlePhoneClick,
            },
          },
        }}
      />
      <div id="toolbar2" className="toolbar">
        <button className="ql-phone" style={{ width: 'fit-content' }}>
          Add Variable
        </button>
      </div>
      <div className="char-count" style={{ position: 'absolute', bottom: 0, right: 0, padding: '5px', fontSize: '12px', color: '#555' }}>
        {charCount}/{maxCharacters}
      </div>
    </div>
  );
};

export default HeaderEditor;
