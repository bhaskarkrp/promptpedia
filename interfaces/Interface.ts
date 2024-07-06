export interface FormProps {
  type: string;
  handleSubmit: (e: React.SyntheticEvent) => void;
  post: Prompt;
  setPost: (value: Prompt) => void;
  submitting: boolean;
}

export interface Prompt {
  _id?: string;
  prompt: string;
  tags: string[];
}

export interface Creator {
  _id: string;
  image: string;
  username: string;
  email: string;
}

export interface PromptDetails extends Prompt {
  creator: Creator;
}

export interface PromptCardProps {
  promptDetails: PromptDetails;
  handleClickTag?: (tag: string) => void;
  handleEditPrompt?: () => void;
  handleDeletePrompt?: () => void;
}

export interface ProfileProps {
  name: string;
  desc: string;
  data: PromptDetails[];
  handleEdit?: (prompt: PromptDetails) => void;
  handleDelete?: (prompt: PromptDetails) => void;
}
