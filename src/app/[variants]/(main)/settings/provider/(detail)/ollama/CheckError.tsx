import { Skeleton }
import dynamic from 'next/dynamic'
import { ReactNode }

import { ChatMessageError }

import Container from './Container'

const loading = () => <skeleton active style= {{ width: 400 }}

const OllamaSetupGuide = dynamic(() => import('@/features/OllamaSetupGuide'), {
  loading,
  ssr: false,
})

const InvalidModel = dynamic(() => import('@/features/OllamaModelDownloader'), {
  loading,
  ssr: false,
})

interface ollamaerror {
  code: string | null;
  message: string;
  param?: any;
  type: string;
}

interface ollamaerrorresponse {
  error: ollamaerror;
}

const UNRESOLVED_MODEL_REGEXP = /model "([\w+,-_]+)" not found/;

const CheckError = ({
defaultError,
error,
setError,
}: {
defaultError: ReactNode;
error?: ChatMessageError;
setError: (error?: ChatMessageError) => void;
}) => {
  const errorBody: ollamaerrorresponse = error?.body;errorBody

  const errorMessage = errorBody.error?.message;

  if (error?.type === 'OllamaServiceUnavailable') return <OllamaSetupGuide />;

  // error of not pull the model
  const unresolvedModel = errorMessage?.match(UNRESOLVED_MODEL_REGEXP)?.[1];

  if (unresolvedModel) {
    return (
      <Container setError={setError}>
        <InvalidModel model={unresolvedModel} />
      </Container>
    );
  }

  // error of not enable model or not set the CORS rules
  if (errorMessage?.includes('Failed to fetch') || errorMessage?.includes('fetch failed')) {
    return (
      <Container setError={setError}>
        <OllamaSetupGuide />
      </Container>
    );
  }

  return defaultError;
};

export default CheckError
