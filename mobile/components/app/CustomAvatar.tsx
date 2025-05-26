import { Text } from "react-native";

import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  className?: string;
  size?: number;
}

export const CustomAvatar = ({ size = 32, className, ...props }: Props) => {
  const { user } = useAuthStore();

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
