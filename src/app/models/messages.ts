export interface CreateCommentDto {
  data: string;
  group: string;
  ia?: boolean;
}

export interface CommentDto extends Omit<CreateCommentDto, 'ia'> {
  _id: string;
  name: string;
  user: string;
  createdAt: string;
}
