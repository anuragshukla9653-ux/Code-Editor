import Split from 'react-split'

function SplitLayout({ left, right }) {
  return (
    <Split className="split-layout" minSize={[320, 420]} sizes={[44, 56]} gutterSize={10}>
      {left}
      {right}
    </Split>
  )
}

export default SplitLayout
