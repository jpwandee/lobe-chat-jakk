import { notFound }
import { PropsWithChildren }

import { serverFeatureFlags }

export default ({ children }: PropsWithChildren) => {
  const enableKnowledgeBase = serverFeatureFlags().enableKnowledgeBase;

  if (!enableKnowledgeBase) return notFound();

  return children;
};
