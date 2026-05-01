const steps = [
  {
    n: '01',
    title: 'Sign up with your phone.',
    body: 'Takes 30 seconds. No password — just a 6-digit code.',
  },
  {
    n: '02',
    title: 'Tell us what you want.',
    body: 'Budget, location, BHK. We filter 900+ floors down to yours.',
  },
  {
    n: '03',
    title: 'Scroll. Shortlist. Visit.',
    body: 'Like Instagram, but for homes you can actually buy. Visit only the ones you love.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-sand-warm py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-16 sm:grid-cols-2 sm:gap-24">
          <div>
            <p className="label">How it works</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-5xl">
              A home<br />in three taps.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink/65">
              An experience built around your time, not a broker&apos;s.
            </p>
          </div>

          <ol className="space-y-10">
            {steps.map(({ n, title, body }) => (
              <li
                key={n}
                className="flex gap-6 border-t border-line pt-7 first:border-t-0 first:pt-0"
              >
                <span className="font-serif text-2xl font-semibold text-accent-deep">
                  {n}
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/65">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
