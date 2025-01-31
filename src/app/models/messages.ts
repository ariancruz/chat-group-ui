
export type Message = {
  _id: string;
  text: string;
  type: 'req' | 'res'
  user: string
  date: Date
}
