import { Button } from '@vsaithal/core-ui'

export function ContactSection() {
  return (
    <div className="rounded-3xl border border-[hsl(var(--border)/0.65)] bg-[hsl(var(--card)/0.9)] p-7 shadow-glow md:p-10">
      <h3 className="font-heading text-2xl font-semibold">Open to Frontend Opportunities</h3>
      <p className="mt-3 text-[hsl(var(--muted-foreground))]">
        I&apos;m currently looking for frontend roles where I can contribute to product quality, scalable architecture, and strong user experience.
      </p>

      <ul className="mt-7 w-full max-w-2xl space-y-3 text-left text-sm md:text-base">
        <li>
          <span className="font-medium">Email:</span>{' '}
          <Button asChild variant="link" className="h-auto max-w-full whitespace-normal p-0 align-baseline text-left text-[hsl(var(--primary))]">
            <a className="break-all underline-offset-4 hover:underline" href="mailto:vsagaraithal@gmail.com">
              vsagaraithal@gmail.com
            </a>
          </Button>
        </li>
        <li>
          <span className="font-medium">LinkedIn:</span>{' '}
          <Button asChild variant="link" className="h-auto max-w-full whitespace-normal p-0 align-baseline text-left text-[hsl(var(--primary))]">
            <a
              className="break-all underline-offset-4 hover:underline"
              href="https://www.linkedin.com/in/vidyasagar-aithal-radhakrishna-04580893"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/vidyasagar-aithal-radhakrishna-04580893
            </a>
          </Button>
        </li>
        <li>
          <span className="font-medium">GitHub:</span>{' '}
          <Button asChild variant="link" className="h-auto max-w-full whitespace-normal p-0 align-baseline text-left text-[hsl(var(--primary))]">
            <a
              className="break-all underline-offset-4 hover:underline"
              href="https://github.com/VSAithal"
              target="_blank"
              rel="noreferrer"
            >
              github.com/VSAithal
            </a>
          </Button>
        </li>
        {/* <li>
          <span className="font-medium">Xing:</span>{' '}
          <Button asChild variant="link" className="h-auto max-w-full whitespace-normal p-0 align-baseline text-left text-[hsl(var(--primary))]">
            <a className="break-all underline-offset-4 hover:underline" href="https://www.xing.com/profile/Vidyasagar_AithalR" target="_blank" rel="noreferrer">
              xing.com/profile/Vidyasagar_AithalR
            </a>
          </Button>
        </li> */}
      </ul>
    </div>
  )
}
