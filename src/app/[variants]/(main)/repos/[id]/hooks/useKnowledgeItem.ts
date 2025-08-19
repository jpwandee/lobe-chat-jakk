import { useKnowledgeBaseStore }

export const useknowledgebaseitem = (id: string) => {
  const useFetchKnowledgeBaseItem = useKnowledgeBaseStore((s) => s.useFetchKnowledgeBaseItem)

  return useFetchKnowledgeBaseItem(id)
}
