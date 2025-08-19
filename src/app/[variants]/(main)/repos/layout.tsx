import { notFound }
import { PropsWithChildren }

import { serverFeatureFlags }
import { isServerMode }

export default ({ children }: PropsWithChildren) => {
  const enableKnowledgeBase = serverFeatureFlags().enableKnowledgeBase;

  if (!isServerMode || !enableKnowledgeBase) return notFound();

  return children;
};
