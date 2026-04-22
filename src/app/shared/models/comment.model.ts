export interface CommentRequest {
  content: string;
}

export interface CommentResponse {
  id: string;
  content: string;
  taskId: string;
  userName: string;
  createdAt: string;
}
