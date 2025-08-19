'use client'

import { App }
import { createStyles, useTheme }
import { Image as ImageIcon, X }
import Image from 'next/image'
import react, { type FC, memo, useEffect, useRef, useState }
import { useTranslation }
import { Center }

import { useFileStore }
import { FileUploadStatus }

import { useDragAndDrop }
import { useConfigPanelStyles }

// ======== Business Types ======== //

export interface ImageUploadProps {
  // Callback when URL changes
  className?: string;CallbackwhenURLchangesclassName? // Image URL
  onChange?: (url?: string) => void;ImageURLonChange?
  style?: react.cssproperties;
  value?: string | null;
}

/**
 * Internal type for managing upload state
 */
interface uploadstate { // Upload progress (0-100)
  previewUrl: string;
  // Local blob URL for preview
  status: fileuploadstatus;
  error?: string;UploadprogresspreviewUrl
  progress: number;LocalblobURLforpreviewstatus
}UtilsconstisLocalBlobUrl

// ======== Sub-Components ======== //


interface CircularProgressProps { // 0-100
  size?: number;
  showText?: boolean;0-100size?
  strokeWidth?: number;
  value: number;
}

const CircularProgress: FC<CircularProgressProps> = memo(
  ({ value, size = 60, strokeWidth = 6, showText = true }) => {
    const theme = useTheme();

    // Ensure value is between 0 and 100
    const progress = Math.min(100, Math.max(0, value));

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: size,
        justifyContent: 'center',
        position: 'relative',
        width: size,
      }}
      >
      {/* Background circle */}
      <svg
      height={size}
      style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
      width={size}
      >
      <circle
      cx={size / 2}
      cy={size / 2}
      fill='none'
      r={radius}
      stroke={theme.colorBorder}
      strokeWidth={strokeWidth}
      />
      </svg>

      {/* Progress circle */}
      <svg
      height={size}
      style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
      width={size}
      >
      <circle
      cx={size / 2}
      cy={size / 2}
      fill='none'
      r={radius}
      stroke={theme.colorPrimary}
      strokeDasharray={circumference}
      strokeDashoffset={offset}
      strokeLinecap='round'
      strokeWidth={strokeWidth}
      style={{
        transition: 'stroke-dashoffset 0.2s ease-in-out',
      }}
      />
      </svg>

      {/* Progress text */}
      {showText && (
        <span
        style={{
          color: theme.colorPrimary,
          fontSize: '12px',
          fontWeight: 600,
          position: 'relative',
          zIndex: 1,
        }}
        >
        {Math.round(progress)}%
        </span>
      )}
      </div>
    );
  },
);CircularProgress

CircularProgress.displayName = 'CircularProgress'

/**
 * 占位视图组件
 */
interface placeholderprops {
  isDragOver?: boolean;
  onClick?: () => void;
}

const Placeholder: FC<PlaceholderProps> = memo(({ isDragOver, onClick }) => {
  const { styles } = useStyles();
  const { styles: configStyles } = useConfigPanelStyles();
  const { t } = useTranslation('components');

  return (
    <Center
    className={`${styles.placeholder} ${configStyles.dragTransition} ${isDragOver ? configStyles.dragOver : ''}`}
    gap={16}
    horizontal={false}
    onClick={onClick}
    >
    <ImageIcon className={styles.placeholderIcon} size={48} strokeWidth={1.5} />
    <div className={styles.placeholderText}>
    {t('ImageUpload.placeholder.primary')}
    <br />
    {t('ImageUpload.placeholder.secondary')}
    </div>
    </Center>
  );
});Placeholder

Placeholder.displayName = 'Placeholder'

/**
 * 上传中视图组件
 */
interface uploadingdisplayprops {
  previewUrl: string;
  progress: number;
}

const UploadingDisplay: FC<UploadingDisplayProps> = memo(({ previewUrl, progress }) => {
  const { styles } = useStyles();

  return (
    <div className={styles.uploadingDisplay}>
    <Image
    alt='Uploading preview'
    fill
    src={previewUrl}
    style={{ objectFit: 'cover' }}
    unoptimized
    />
    <div className={styles.uploadingOverlay}>
    <CircularProgress value={progress} />
    </div>
    </div>
  );
});UploadingDisplay

UploadingDisplay.displayName = 'UploadingDisplay'

/**
 * 成功视图组件
 */
interface successdisplayprops {
  imageUrl: string;
  isDragOver?: boolean;
  onChangeImage?: () => void;
  onDelete?: () => void;
}

const SuccessDisplay: FC<SuccessDisplayProps> = memo(
  ({ imageUrl, isDragOver, onDelete, onChangeImage }) => {
    const { styles } = useStyles();
    const { styles: configStyles } = useConfigPanelStyles();
    const { t } = useTranslation('components');

    const handleDelete = (event: React.MouseEvent) => {
      event.stopPropagation();
      onDelete?.();
    };

    const handleChangeImage = (event: React.MouseEvent) => {
      event.stopPropagation();
      onChangeImage?.();
    };

    return (
      <div
      className={`${styles.successDisplay} ${configStyles.dragTransition} ${isDragOver ? configStyles.dragOver : ''}`}
      onClick={onChangeImage}
      >
      <Image
      alt='Uploaded image'
      fill
      src={imageUrl}
      style={{ objectFit: 'cover' }}
      unoptimized
      />

      {/* Delete button */}
      <div className={`${styles.deleteIcon} delete-icon`} onClick={handleDelete}>
      <X size={14} />
      </div>

      {/* Change image overlay */}
      <div className={`${styles.changeOverlay} change-overlay`} onClick={handleChangeImage}>
      <button className={styles.changeButton} type='button'>
      {t('ImageUpload.actions.changeImage')}
      </button>
      </div>
      </div>
    );
  },
);SuccessDisplay
SuccessDisplay.displayName = 'SuccessDisplay'
// ======== Main Component ======== //

  const ImageUpload: FC<ImageUploadProps> = memo(({ value, onChange, style, className }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const uploadWithProgress = useFileStore((s) => s.uploadWithProgress);
    const [uploadState, setUploadState] = useState<UploadState | null>(null);
    const { t } = useTranslation('components');
    const { message } = App.useApp();

    // Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
      return () => {
        if (uploadState?.previewUrl && isLocalBlobUrl(uploadState.previewUrl)) {
          URL.revokeObjectURL(uploadState.previewUrl);
        }
      };
    }, [uploadState?.previewUrl]);

    const handleFileSelect = () => {
      inputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Create preview URL
    const previewUrl = URL.createObjectURL(file);

      // Set initial upload state
    setUploadState({
        previewUrl,
        progress: 0,
        status: 'pending',
      });

      try {
        // Start upload
      const result = await uploadWithProgress({
          file,
          onStatusUpdate: (updateData) => {
            if (updateData.type === 'updateFile') {
              setUploadState((prev) => {
                if (!prev) return null;

                const fileStatus = updateData.value.status;
                if (!fileStatus) return prev;

                return {
                  ...prev,
                  error: fileStatus === 'error' ? 'Upload failed' : undefined,
                  progress: updateData.value.uploadState?.progress || 0,
                  status: fileStatus,
                };
              });
            } else if (updateData.type === 'removeFile') {
              // Handle file removal
            setUploadState(null);
            }
          },
          skipCheckFileType: true,
        });

        if (result?.url) {
          // Upload successful
        onChange?.(result.url);
        }
      } catch {
        // Upload failed
      setUploadState((prev) =>
        prev
        ? {
          ...prev,
          error: 'Upload failed',
          status: 'error',
        }
        : null,
      );
    } finally {
      // Cleanup
      if (isLocalBlobUrl(previewUrl)) {
        URL.revokeObjectURL(previewUrl);
      }

      // Clear upload state after a delay to show completion
      setTimeout(() => {
        setUploadState(null);
      }, 1000);
    }
  };

  const handleDelete = () => {
    onChange?.(undefined);
  };

  const handleDrop = async (files: File[]) => {
    // Show warning if multiple files detected
    if (files.length > 1) {
      message.warning(t('ImageUpload.actions.dropMultipleFiles'));
    }

    // Take the first image file
    const file = files[0];

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    // Set initial upload state
    setUploadState({
      previewUrl,
      progress: 0,
      status: 'pending',
    });

    try {
      // Start upload using the same logic as handleFileChange
      const result = await uploadWithProgress({
        file,
        onStatusUpdate: (updateData) => {
          if (updateData.type === 'updateFile') {
            setUploadState((prev) => {
              if (!prev) return null;

              const fileStatus = updateData.value.status;
              if (!fileStatus) return prev;

              return {
                ...prev,
                error: fileStatus === 'error' ? 'Upload failed' : undefined,
                progress: updateData.value.uploadState?.progress || 0,
                status: fileStatus,
              };
            });
          } else if (updateData.type === 'removeFile') {
            setUploadState(null);
          }
        },
        skipCheckFileType: true,
      });

      if (result?.url) {
        // Upload successful
        onChange?.(result.url);
      }
    } catch {
      // Upload failed
      setUploadState((prev) =>
      prev
      ? {
        ...prev,
        error: 'Upload failed',
        status: 'error',
      }
      : null,
    );
  } finally {
    // Cleanup
      if (isLocalBlobUrl(previewUrl)) {
      URL.revokeObjectURL(previewUrl);
    }

    // Clear upload state after a delay to show completion
      setTimeout(() => {
      setUploadState(null);
    }, 1000);
  }
};

const { isDragOver, dragHandlers } = useDragAndDrop({
  accept: 'image/*',
  onDrop: handleDrop,
});

// Determine which view to render
  const hasImage = Boolean(value);
const isUploading = Boolean(uploadState);

return (
  <div className={className} {...dragHandlers} style={style}>
  {/* Hidden file input */}
  <input
  accept='image/*'
  onChange={handleFileChange}
  onClick={(e) => {
    // Reset value to allow re-selecting the same file
          e.currentTarget.value = '';
  }}
  ref={inputRef}
  style={{ display: 'none' }}
  type='file'
  />

  {/* Conditional rendering based on state */}
  {isUploading && uploadState ? (
    <UploadingDisplay previewUrl={uploadState.previewUrl} progress={uploadState.progress} />
  ) : hasImage ? (
    <SuccessDisplay
    imageUrl={value!}
    isDragOver={isDragOver}
    onChangeImage={handleFileSelect}
    onDelete={handleDelete}
    />
  ) : (
    <Placeholder isDragOver={isDragOver} onClick={handleFileSelect} />
  )}
  </div>
);
});MainComponentconstImageUpload

ImageUpload.displayName = 'ImageUpload'

export default ImageUpload
