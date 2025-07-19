import { Text } from "react-native";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IUser } from "@/models";

interface Props {
  user: IUser;
  className?: string;
  size?: number;
}

export const UserAvatar = ({ user, size = 32, className, ...props }: Props) => {
  return (
    <Avatar
      alt={user.firstname}
      style={{
        width: size,
        height: size,
      }}
      className={className}
      {...props}
    >
      <AvatarFallback>
        <Text
          style={{
            fontSize: size / 2,
          }}
          className="uppercase font-medium"
        >{`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}</Text>
      </AvatarFallback>
    </Avatar>
  );
};
