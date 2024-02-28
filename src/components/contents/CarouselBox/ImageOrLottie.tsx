import { x } from "@xstyled/emotion";
import Image from "next/image";
import { FC } from "react";

import LottiePlayer from "components/components/LottiePlayer";
import { IPluginUploadFile } from "types/IPluginUploadFile";
import { isLottie } from "utils/isLottie";

interface ImageOrLottieProps {
  file?: IPluginUploadFile;
}

const ImageOrLottie: FC<ImageOrLottieProps> = ({ file }) => {
  if (!file?.url) return null;

  // Default sizes by design
  const { width = 203, height = 162 } = file;

  return (
    <x.div
      padding={{
        _: "0 2rem",
        sm: "0 3.125rem"
      }}
      pointerEvents="none"
    >
      <x.div
        flexShrink="0"
        position="relative"
        maxHeight="100%"
        maxWidth={{
          _: "70%",
          sm: "63%"
        }}
        ml="auto"
        style={{
          aspectRatio: `${width} / ${height}`
        }}
      >
        {isLottie(file.url) ? (
          <LottiePlayer url={file.url} />
        ) : (
          <Image src={file.url} alt={file.alternativeText || file.caption} layout="fill" objectFit="contain" />
        )}
      </x.div>
    </x.div>
  );
};

export default ImageOrLottie;
