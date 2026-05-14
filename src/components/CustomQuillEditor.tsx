'use client';

import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface CustomQuillEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function CustomQuillEditor({ value, onChange, placeholder }: CustomQuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
          ],
        },
        placeholder: placeholder || 'Mulai menulis...',
      });

      // Set initial content
      if (value) {
        quillInstance.current.root.innerHTML = value;
      }

      // Handle text change
      quillInstance.current.on('text-change', () => {
        onChange(quillInstance.current.root.innerHTML);
      });
    }
  }, []);

  // Update content if value changes externally (optional, but good for controlled components)
  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={editorRef} />;
}
