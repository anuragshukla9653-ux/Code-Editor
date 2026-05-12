import Editor from '@monaco-editor/react'

function CodeEditor({ code, language, onCodeChange }) {
  return (
    <div className="editor-frame">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => onCodeChange(value || '')}
        options={{
          fontSize: 14,
          fontFamily: 'Consolas, ui-monospace, SFMono-Regular, monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16 },
        }}
      />
    </div>
  )
}

export default CodeEditor
