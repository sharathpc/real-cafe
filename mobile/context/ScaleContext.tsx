import { createContext, ReactNode, useContext } from "react";
import {
  SharedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: ReactNode;
}
interface Scale {
  scrollY: SharedValue<number>;
  scrollYGlobal: SharedValue<number>;
  scrollToTop: () => void;
}

const ScaleContext = createContext<Scale | undefined>(undefined);

export const ScaleContextProvider = ({ children }: Props) => {
  const scrollY = useSharedValue(0);
  const scrollYGlobal = useSharedValue(0);
  const scrollToTop = () => {
    scrollY.value = withTiming(0, { duration: 300 });
    scrollYGlobal.value = withTiming(0, { duration: 300 });
  };

  return (
    <ScaleContext.Provider value={{ scrollToTop, scrollY, scrollYGlobal }}>
      {children}
    </ScaleContext.Provider>
  );
};

export const useScaleContext = () => {
  const context = useContext(ScaleContext);
  if (context === undefined)
    throw new Error(
      "useScaleContext must be used within a scalContextProvider"
    );

  return context;
};
