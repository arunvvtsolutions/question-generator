

export interface IChatAiProps {
  id: number;
  question?: string;
  answer?: string;
  history?: string;
  assetUrl?: string;
  threadId: string;
  title?: string;
  loading?: boolean;
  typing?: boolean;
  likeDislike?: number | null;
}

export interface IPrompts {
  id: number;
  title: string;
  prompt: string;
}

export interface IAiInitialMsgProps {
  input: string;
  assetFile?: any;
}

export interface AiProps {
  error?: string | null;
  aiInitialMessage: IAiInitialMsgProps | null;
  workLibrary: IAiWorkLibraryProps[];
}

export interface IAiTokenProps {
  id: number;
  totalTokens: number;
  remainingTokens: number;
}

export interface IAiWorkLibraryProps {
  id: number;
  title: string;
  threadId: string;
}

export interface IAiResponseTokenProps {
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  total_cost: number;
}

export interface IAiResponseProps {
  success: boolean;
  result: string;
  history: string;
  detail: string;
  title: string;
  tokens: IAiResponseTokenProps;
}

