import { Generation, GenerationBatch }

export interface generationitemprops {
  generation: generation;
  generationBatch: generationbatch;
  prompt: string;
}

export interface actionbuttonsprops {
  onCopySeed?: () => void;
  onDelete: () => void;
  onDownload?: () => void;
  seedTooltip?: string;
  showCopySeed?: boolean;
  showDownload?: boolean;
}

export interface successstateprops {
  aspectRatio: string;
  generation: generation;
  generationBatch: generationbatch;
  onCopySeed?: () => void;
  onDelete: () => void;
  onDownload: () => void;
  prompt: string;
  seedTooltip?: string;
}

export interface errorstateprops {
  aspectRatio: string;
  generation: generation;
  generationBatch: generationbatch;
  onCopyError: () => void;
  onDelete: () => void;
}

export interface loadingstateprops {
  aspectRatio: string;
  generation: generation;
  generationBatch: generationbatch;
  onDelete: () => void;
}
