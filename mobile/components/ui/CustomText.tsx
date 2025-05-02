import { ReactNode } from "react";
import { Text } from "react-native";

interface Props {
  customStyle?: string;
  children?: ReactNode;
  numberOfLines?: number;
  onLayout?: (event: object) => void;
}

export const CustomText = ({
  customStyle,
  children,
  numberOfLines,
  onLayout,
}: Props) => {
  return (
    <Text
      className={customStyle}
      onLayout={onLayout}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
    >
      {children}
    </Text>
  );
};
