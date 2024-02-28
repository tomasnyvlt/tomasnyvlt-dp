import { x } from "@xstyled/emotion";
import { Icon } from "anolis-ui";
import { FC, ReactNode } from "react";

import { useFormStoreContext } from "@src/hooks/useFormStoreContext";

interface TopbarButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
  download?: string;
}

const TopbarButton: FC<TopbarButtonProps> = ({ icon, onClick, text, href, download }) => {
  const useStore = useFormStoreContext();
  const { isInternalUser, isAgent } = useStore((state) => ({
    isInternalUser: state.isInternalUser,
    isAgent: state.isAgent
  }));

  const hasRightSideButton = isInternalUser || isAgent;

  return (
    <x.a
      as={href ? "a" : "button"}
      type={href ? undefined : "button"}
      onClick={href ? undefined : onClick}
      href={href}
      download={download}
      display="flex"
      flexDirection={{
        _: hasRightSideButton ? "row" : "column",
        sm: "column"
      }}
      alignItems={{
        _: hasRightSideButton ? "center" : "",
        sm: "initial"
      }}
      bg="transparent"
      borderLeftWidth={{
        _: {
          _: hasRightSideButton ? 0 : "1px",
          "&:first-child": 0
        },
        sm: {
          _: "1px",
          "&:first-child": hasRightSideButton ? "1px" : 0
        }
      }}
      borderBottomWidth={hasRightSideButton ? { _: "1px", sm: 0, "&:last-child": 0 } : 0}
      borderColor="tercial.indigo1Alpha40"
      p="0"
      px={{
        _: hasRightSideButton ? 0 : "1rem",
        sm: hasRightSideButton ? "1rem" : "1rem"
      }}
      py={{
        _: hasRightSideButton ? "1rem" : 0,
        sm: 0
      }}
      pt={{
        "&:first-child": 0
      }}
      pb={{
        "&:last-child": 0
      }}
      pl={{
        "&:first-child": {
          _: 0,
          sm: hasRightSideButton ? "1rem" : 0
        }
      }}
      pr={{
        "&:last-child": {
          _: 0,
          sm: hasRightSideButton ? "1rem" : 0
        }
      }}
      h="100%"
      textAlign="left"
      w={hasRightSideButton ? "100%" : "auto"}
      appearance="none"
      outline={{
        _: "none",
        "&:focus": "none",
        "&:focus-visible": "1px solid"
      }}
      outlineColor={{
        _: "none",
        "&:focus-visible": "tercial.indigo1"
      }}
      outlineOffset="-0.0625rem"
    >
      <Icon
        as="span"
        display={{ _: "flex", sm: "block" }}
        justifyContent="center"
        alignItems="center"
        mb={{
          _: hasRightSideButton ? "0" : "0.5rem",
          sm: "0.5rem"
        }}
        svg={icon}
        fill="tercial.indigo1Alpha75"
        h="1.5rem"
        pr={hasRightSideButton ? "1rem" : 0}
      />

      <x.span
        display="block"
        fontSize="0.75rem"
        lineHeight="1rem"
        color="tercial.indigo1Alpha75"
        textDecoration="underline"
        fontWeight="500"
        maxW={hasRightSideButton ? { _: "100%", sm: "5.625rem" } : "100%"}
      >
        {text}
      </x.span>
    </x.a>
  );
};

export default TopbarButton;
