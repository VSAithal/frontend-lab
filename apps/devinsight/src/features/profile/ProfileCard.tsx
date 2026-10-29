import { useState } from 'react'
import type { GitHubUser } from '../../types/github'
import { Skeleton } from '@vsaithal/core-ui'

export const ProfileCard = ({
  gitHubUserAccount,
}: {
  gitHubUserAccount: GitHubUser
}) => {
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  return (
    <div className="flex flex-col gap-2 items-center py-4">
      {/* Display user profile information */}
      <h1>{gitHubUserAccount.name ?? gitHubUserAccount.login}'s Profile</h1>

      {/* Avatar */}
      <div className="relative h-24 w-24">
        {!avatarLoaded && (
          <Skeleton className="absolute inset-0 rounded-full" />
        )}
        <img
          src={gitHubUserAccount.avatar_url}
          alt={`Avatar for ${gitHubUserAccount.login}`}
          className={`h-24 w-24 rounded-full transition-opacity duration-300 ${avatarLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setAvatarLoaded(true)}
        />
      </div>
      <p>@{gitHubUserAccount.login}</p>

      {/* Bio */}
      {gitHubUserAccount.bio && <p>Bio: {gitHubUserAccount.bio}</p>}

      {/* Location */}
      {gitHubUserAccount.location && (
        <p>Location: {gitHubUserAccount.location}</p>
      )}

      {/* Company */}
      {gitHubUserAccount.company && <p>Company: {gitHubUserAccount.company}</p>}

      {/* External GitHub Profile Link */}

      <a
        href={gitHubUserAccount.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/{gitHubUserAccount.login}
      </a>

      {/* stars */}
      <div className="flex gap-4 mt-4">
        <p> {gitHubUserAccount.public_repos} public repositories</p>
        <p> {gitHubUserAccount.followers} followers</p>
        <p> {gitHubUserAccount.following} following</p>
      </div>
    </div>
  )
}
