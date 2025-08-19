import ChangelogModal from '@/features/ChangelogModal'
import { ChangelogService }

const changelog = async () => {
  const service = new ChangelogService()
  const id = await service.getLatestChangelogId()

  return <changelogmodal currentid={id} />
}

export default Changelog
