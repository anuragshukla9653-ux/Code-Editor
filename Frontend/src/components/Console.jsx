function Console({ result, isRunning }) {
  const cases = result?.cases || []
  const passed = result?.passed ?? result?.testCasesPassed ?? result?.submission?.testCasesPassed ?? 0
  const total = result?.total ?? result?.totalTestCases ?? result?.submission?.totalTestCases ?? cases.length

  return (
    <section className="console-panel">
      <div className="panel-heading">
        <h2>Console</h2>
        {isRunning && <span className="status-pill">Running</span>}
      </div>

      {!result && !isRunning && (
        <p className="muted">Run code to see visible test output here.</p>
      )}

      {result && (
        <div className="console-output">
          <div className={`result-banner ${result.status === 'Accepted' ? 'success' : 'error'}`}>
            <strong>{result.status}</strong>
            <span>
              {passed}/{total} visible tests
              {result.hiddenTotal ? `, ${result.hiddenPassed}/${result.hiddenTotal} hidden tests` : ''}
            </span>
          </div>
          <p>{result.message}</p>
          {result.stdout && <pre>{result.stdout}</pre>}
          {cases.length > 0 && (
            <div className="case-list">
              {cases.map((testCase, index) => (
              <div className="case-row" key={`${testCase.input}-${index}`}>
                <span className={testCase.passed ? 'case-pass' : 'case-fail'}>
                  Case {index + 1}
                </span>
                <code>{testCase.input}</code>
                <span>Expected {testCase.output}</span>
                <span>Actual {testCase.actual}</span>
              </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Console
