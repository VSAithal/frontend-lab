import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@components/Card'
import { Button } from '@components/Button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="ds-max-w-md">
      <CardHeader>
        <CardTitle>Design system update</CardTitle>
        <CardDescription>
          A short summary of changes and what to review.
        </CardDescription>
      </CardHeader>
      <CardContent className="ds-text-sm ds-text-muted-foreground">
        This release includes new spacing tokens, improved button states, and a
        refreshed typography scale.
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Review</Button>
        <Button>Publish</Button>
      </CardFooter>
    </Card>
  ),
}

export const ProjectCard: Story = {
  render: () => (
    <Card className="ds-max-w-md">
      <CardHeader>
        <CardTitle>Portfolio Revamp</CardTitle>
        <CardDescription>
          A lightweight site focused on performance and clear storytelling.
        </CardDescription>
      </CardHeader>
      <CardContent className="ds-space-y-4">
        <p className="ds-text-sm ds-text-muted-foreground">
          Built with Vite, Tailwind, and a small set of reusable UI primitives.
        </p>
        <div className="ds-flex ds-flex-wrap ds-gap-2">
          {['Vite', 'Tailwind', 'React', 'Storybook'].map((tag) => (
            <span
              key={tag}
              className="ds-rounded-full ds-border ds-border-border ds-bg-background ds-px-3 ds-py-1 ds-text-xs ds-font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="sm:ds-justify-start">
        <Button variant="outline">View Repo</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithMedia: Story = {
  render: () => (
    <Card className="ds-max-w-lg">
      <CardHeader>
        <CardTitle>Product Spotlight</CardTitle>
        <CardDescription>
          Highlight rich media alongside the card content.
        </CardDescription>
      </CardHeader>
      <CardContent className="ds-space-y-4">
        <div className="ds-overflow-hidden ds-rounded-md ds-border ds-border-border ds-bg-muted">
          <div className="ds-h-0 ds-w-full ds-pt-[56%]" />
        </div>
        <p className="ds-text-sm ds-text-muted-foreground">
          Use the media section for product shots, illustrations, or screenshots.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Learn more</Button>
        <Button>Get started</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithLongContent: Story = {
  render: () => (
    <Card className="ds-max-w-xl">
      <CardHeader>
        <CardTitle>
          A very long card title that wraps gracefully across multiple lines
        </CardTitle>
        <CardDescription>
          This description is intentionally verbose to confirm that muted text
          styles remain readable, even when the content spans several lines in a
          narrower container.
        </CardDescription>
      </CardHeader>
      <CardContent className="ds-text-sm ds-text-muted-foreground ds-space-y-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          fringilla, lacus in consequat tincidunt, est odio gravida nibh, vitae
          aliquet turpis neque non ipsum.
        </p>
        <p>
          Suspendisse potenti. Integer posuere, magna sed viverra placerat, diam
          nisl posuere metus, nec molestie ligula nisl a justo.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Dismiss</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
}
