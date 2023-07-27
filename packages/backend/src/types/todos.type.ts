export interface ITodoCreate {
  title: string;
  description: string;
  isPublic: boolean;
  isCompleted: boolean;
}

export interface ITodoUpdate {
  id: string;
  title?: string;
  description?: string;
  isPublic?: boolean;
  isCompleted?: boolean;
}
