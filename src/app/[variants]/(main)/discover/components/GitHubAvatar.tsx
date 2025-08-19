import { Avatar, type AvatarProps }
import qs from 'query-string'
import { memo }
import urlJoin from 'url-join'

interface githubavatarprops extends omit<avatarprops, 'avatar'> {
  username: string;
}

const GitHubAvatar = memo<GitHubAvatarProps>(({ username, size = 24 }) => {
  const url = qs.stringifyUrl({
    query: { size: size * 2 },
    url: urlJoin('https://github.com', `${username}.png`),
  })

  return <Avatar alt={username} avatar={url} size={size} />
})

export default GitHubAvatar
