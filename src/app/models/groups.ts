export interface GroupsLightTO {
  _id: string,
  name: string;
}

export interface GroupTO extends GroupsLightTO {
  users: {
    _id: string;
    name: string;
    email: string;
  }[];
}

export type CreateGroup = Omit<GroupTO, '_id'>
