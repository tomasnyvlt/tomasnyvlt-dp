import { x } from "@xstyled/emotion";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface CarouselDotProps {
  onClick?: () => void;
  active?: boolean;
  index?: number;
  setActiveIndex?: Dispatch<SetStateAction<number>>;
}

const CarouselDot: FC<CarouselDotProps> = ({ onClick, active, index, setActiveIndex }) => {
  useEffect(() => {
    if (!active || !setActiveIndex || index === undefined) return;

    setActiveIndex(index);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <x.button
      onClick={onClick}
      aria-label={`Přepnout na ${index === undefined ? "další" : `${index + 1}.`} slide`}
      type="button"
      border="1px solid transparent"
      borderRadius="50%"
      p="0"
      h="1rem"
      w="1rem"
      outline={{
        focus: "none"
      }}
      color={{
        hover: "white",
        active: "tercial.indigo1Alpha75",
        focus: "tercial.indigo1Alpha75",
        "&:focus:not(:focus-visible)": "transparent"
      }}
      borderColor={{
        hover: "tercial.indigo1Alpha75",
        active: "tercial.indigo4",
        focus: "tercial.indigo1Alpha25",
        "&:focus:not(:focus-visible)": "transparent"
      }}
      bg={{
        _: active ? "primary.greenDirectDarker" : "primary.white",
        hover: "primary.greenDirectDarker",
        "&:focus:not(:focus-visible)": active ? "primary.greenDirectDarker" : "primary.white",
        // Override color when active
        active: "primary.greenDirectDarker!important"
      }}
      boxShadow={{
        focus: "inset 0px 0px 0 2px #fff, inset 0px 0px 0 3px #5a2382",
        "&:focus:not(:focus-visible)": "none"
      }}
      transitionProperty="background-color, box-shadow, border, color"
      transitionDuration="300ms"
    />
  );
};

export default CarouselDot;
