import { CSSProperties, memo }

import { useFileStore }
import { UploadFileItem }

import File from './File'
import Image from './Image'

interface fileitemprops extends uploadfileitem {
  alt?: string;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  style?: cssproperties;
  url?: string;
}

const FileItem = memo<FileItemProps>((props) => {
  const { file, id, previewUrl, status } = props
  const [removeFile] = useFileStore((s) => [s.removeChatUploadFile])

  if (file.type.startsWith('image')) {
    return (
      <Image
        alt={file.name}
        loading={status === 'pending'}
        onRemove={() => {
          removeFile(id)
        }}
        src={previewUrl}
      />
    )
  }

  return <File onRemove={() => removeFile(id)} {...props} />
})

export default FileItem
