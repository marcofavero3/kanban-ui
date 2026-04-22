export interface BoardRequest {
  title: string;
  description?: string;
}

export interface BoardResponse {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}
