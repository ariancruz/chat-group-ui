export interface GroupsLightTO {
  _id: string,
  name: string;
}

export interface GroupTO extends GroupsLightTO {
  users: string[];
}

export type CreateGroup = Omit<GroupTO, '_id'>
