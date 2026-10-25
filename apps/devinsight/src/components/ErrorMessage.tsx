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
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  )
}
