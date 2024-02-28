import { ActiveUserType } from "@src/types";

export interface UserType {
  isAgent: boolean;
  isInternalUser: boolean;
}

const getActiveUserType = ({ isAgent, isInternalUser }: UserType): ActiveUserType => {
  let activeUserType: ActiveUserType = "customer";
  if (isAgent) activeUserType = "broker";
  if (isInternalUser) activeUserType = "internal";

  return activeUserType;
};

export default getActiveUserType;
