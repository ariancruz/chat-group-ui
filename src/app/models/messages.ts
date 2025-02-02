export interface CreateCommentDto {
  data: string;
  group: string;
}

export interface CommentDto extends CreateCommentDto {
  _id: string;
  name: string;
  users: string;
  createdAt: string;
}
