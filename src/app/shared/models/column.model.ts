export interface BoardColumnRequest {
  title: string;
  position: number;
}

export interface BoardColumnResponse {
  id: string;
  title: string;
  position: number;
  boardId: string;
  createdAt: string;
}
