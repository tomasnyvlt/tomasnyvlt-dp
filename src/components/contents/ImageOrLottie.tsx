import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { SystemProps } from '@xstyled/system';
import { ElementType, FC } from 'react';

//import LottiePlayer from "@src/components/components/LottiePlayer";
//import { IPluginUploadFile } from "types/IPluginUploadFile";
//import { isLottie } from "utils/isLottie";

interface IFormat {
  ext?: string;
  url: string;
  hash: string;
  mime: string;
  name?: string;
  path?: string;
  size: number;
  width?: number;
  height?: number;
}

interface IFormats {
  large?: IFormat;
  medium?: IFormat;
  small?: IFormat;
  thumbnail?: IFormat;
}

export interface IPluginUploadFile {
  id: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: IFormats;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: { [key: string]: any };
  createdAt?: string;
  updatedAt?: string;
}

interface ImageOrLottieProps {
  name: string;
  file: IPluginUploadFile;
  css?: SystemProps & { as?: ElementType<HTMLDivElement> };
}

const ImageOrLottie: FC<ImageOrLottieProps> = ({ css, ...props }) => {
  const { file } = useFieldApi(props);

  if (!file?.url) {
    return null;
  }

  return (
    <x.div display="flex" justifyContent="center" {...css}>
      {/*
      {isLottie(file.url) ? (
        <LottiePlayer url={file.url} />
      ) : (
        <x.img src={file.url} loading="lazy" maxWidth="100%" alt={file?.caption} />
      )}
      */}

      <x.img
        src={file.url}
        loading="lazy"
        maxWidth="100%"
        alt={file?.caption}
      />
    </x.div>
  );
};

export default ImageOrLottie;
