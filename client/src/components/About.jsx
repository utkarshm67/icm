export default function About({ now }) {
  const today = new Date(now);

  return <>
    <div className="page-heading"><div><p className="eyebrow">ABOUT</p><h1>GitHub Copilot Demo</h1></div></div>
    <section className="incident-panel" aria-labelledby="about-date">
      <div className="panel-heading"><div><h2 id="about-date">Current date</h2><p className="muted"><time dateTime={today.toISOString()}>{today.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time></p></div></div>
    </section>
  </>;
}
