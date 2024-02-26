import {useEffect, useState, useRef} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useCurrentLocale } from '@/locales/client';


interface TextInputProps {
    id: string
    label?: string
    sendInput: (input: { name: string; value: string }) => void
    old?:any
}

export const TextEditorInput = ({id, label, sendInput, old}: TextInputProps) => {
  const editorRef = useRef<any>(null);
  const locale: "pt-BR" | "en" | "es" = useCurrentLocale()

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(old)
  }, [old])

  function handleChange(value: string) {
      setInputValue(value)

      sendInput({
        name: id,
        value: value
      })
  }

  const handleEditorChange = () => {
    if (editorRef.current) {
      const value = editorRef.current.getContent();
      handleChange(value);
    }
  };

  const renderInfos = () => {
    const lng = {
      'pt-BR': 'pt_BR',
      'en': 'en',
      'es': 'es'
    }

    return {lng: lng[locale]}
  }


  return (
    <div className="inputContainer">
      {label && <label>{label}</label>}

      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_TOKEN}
        init={{
          language: renderInfos().lng,
          menubar: false,
          branding: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
            'anchor', 'searchreplace', 'code', 'fullscreen', 'visualblocks',
            'insertdatetime', 'media', 'table', 'wordcount'
          ],
          toolbar: 'undo redo | blocks fontsize | ' +
          'bold italic forecolor backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist | table link customImage',
          font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px',
          setup: function (editor) {
            editor.ui.registry.addButton('customImage', {
              icon: 'image',
              tooltip: 'Insert Image',
              onAction: function () {
                // setIsOpen(true)
              }
            });
          }
        }}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          if (old !== null && old !== undefined) {
            editor.setContent(String(old));
          }
        }}
        onEditorChange={handleEditorChange}
        initialValue={old !== null && old !== undefined ? String(old) : ''}
      />
    </div>
  );
};