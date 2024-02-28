type StepColorKeys = "isActive" | "wasActive" | "default";

export interface StepColorsType {
  readonly bg: string;
  readonly border: string;
  readonly text: string;
}

const COLORS: { readonly [K in StepColorKeys]: StepColorsType } = {
  isActive: {
    bg: "primary.greenDirect",
    border: "primary.greenDirect",
    text: "primary.white"
  },
  wasActive: {
    bg: "primary.greenDirect50",
    border: "primary.greenDirect50",
    text: "primary.white"
  },
  default: {
    bg: "primary.white",
    border: "grayscale.gray4",
    text: "grayscale.gray2"
  }
};

interface Props {
  isActive: boolean;
  wasActive: boolean;
}

const getStepColors = ({ isActive, wasActive }: Props): StepColorsType => {
  if (isActive) {
    return COLORS.isActive;
  }

  if (wasActive) {
    return COLORS.wasActive;
  }

  return COLORS.default;
};

export default getStepColors;
