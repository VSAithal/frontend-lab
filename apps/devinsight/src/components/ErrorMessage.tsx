import { Button } from '@vsaithal/core-ui'

export const ErrorMessage = ({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) => {
  return (
    <div className="error-message">
      <p>{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}
