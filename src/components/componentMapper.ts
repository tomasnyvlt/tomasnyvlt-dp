import { ComponentMapper } from '@data-driven-forms/react-form-renderer';
import { createElement } from 'react';

import Box from '@src/components/contents/Box';
import BoxWithContent from '@src/components/contents/BoxWithContent';
import CardCheckbox from '@src/components/contents/CardCheckbox/CardCheckbox';
import CardCheckboxAdditional from '@src/components/contents/CardCheckbox/CardCheckboxAdditional';
import CardPerson from '@src/components/contents/CardPerson';
import CarouselBox from '@src/components/contents/CarouselBox';
import ConfirmationBox from '@src/components/contents/ConfirmationBox';
import Grid from '@src/components/contents/Grid';
import Heading from '@src/components/contents/Heading';
import Icon from '@src/components/contents/Icon';
import ImageOrLottie from '@src/components/contents/ImageOrLottie';
import InfoBox from '@src/components/contents/InfoBox';
import LinkWithIcon from '@src/components/contents/LinkWithIcon';
import Loader from '@src/components/contents/Loader';
import NumberedSteps from '@src/components/contents/NumberedSteps';
import RadioContainer from '@src/components/contents/RadioFrequency/RadioContainer';
import Section from '@src/components/contents/Section';
import SpzWithBrand from '@src/components/contents/SpzWithBrand';
import Text from '@src/components/contents/Text';
import FieldValuesListener from '@src/components/controls/FieldValuesListener';
import FormWizard from '@src/components/controls/FormWizard';
import RZFetchField from '@src/components/fetchers/RZFetchField';
import SpzFetchField from '@src/components/fetchers/SpzFetchField';
import AssistanceModal from '@src/components/fields/AssistanceModal';
import ButtonField from '@src/components/fields/ButtonField';
import CheckboxButtonField from '@src/components/fields/CheckboxButtonField.tsx';
import CheckboxField from '@src/components/fields/CheckboxField';
import DatePicker from '@src/components/fields/DatePicker';
import EditField from '@src/components/fields/EditField';
import FileUpload from '@src/components/fields/FileUpload';
import MaskedNumberField from '@src/components/fields/MaskedNumberField';
import MaskedPatternField from '@src/components/fields/MaskedPatternField';
import NumberField from '@src/components/fields/NumberField';
import RadioBox from '@src/components/fields/RadioBox';
import RadioImage from '@src/components/fields/RadioImage';
import RadioInfoContainer from '@src/components/fields/RadioInfo/RadioInfoContainer';
import RadioInfoList from '@src/components/fields/RadioInfo/RadioInfoList';
import RadioWithInfoField from '@src/components/fields/RadioInfo/RadioWithInfoField';
import RadioSelectContainer from '@src/components/fields/RadioSelect/RadioSelectContainer';
import RangeField from '@src/components/fields/RangeField';
import Select2Field from '@src/components/fields/Select2Field';
import SelectDecorField from '@src/components/fields/SelectDecorField';
import ShadowCopyField from '@src/components/fields/ShadowCopyField';
import SmartFormField from '@src/components/fields/SmartFormField';
import SwitchField from '@src/components/fields/SwitchField';
import TextField from '@src/components/fields/TextField';
import ToggleField from '@src/components/fields/ToggleField';

const componentMapper: ComponentMapper = {
  // Layout
  box: {
    component: FieldValuesListener,
    children: createElement(Box),
  },
  section: {
    component: FieldValuesListener,
    children: createElement(Section),
  },
  grid: {
    component: FieldValuesListener,
    children: createElement(Grid),
  },
  heading: Heading,
  'info-box': {
    component: FieldValuesListener,
    children: createElement(InfoBox),
  },
  text: {
    component: FieldValuesListener,
    children: createElement(Text),
  },
  image: {
    component: FieldValuesListener,
    children: createElement(ImageOrLottie),
  },
  icon: {
    component: FieldValuesListener,
    children: createElement(Icon),
  },
  'carousel-box': CarouselBox,
  'spz-with-brand': {
    component: FieldValuesListener,
    children: createElement(SpzWithBrand),
  },
  'switch-field': SwitchField,
  'box-with-content': {
    component: FieldValuesListener,
    children: createElement(BoxWithContent),
  },
  'link-with-icon': LinkWithIcon,
  'number-field': NumberField,
  'numbered-steps': NumberedSteps,
  'radio-with-info-field': RadioWithInfoField,
  'radio-info-list': RadioInfoList,
  'radio-container': RadioContainer,
  'card-person': {
    component: FieldValuesListener,
    children: createElement(CardPerson),
  },
  'radio-select-container': {
    component: FieldValuesListener,
    children: createElement(RadioSelectContainer),
  },
  loader: Loader,

  // Fields with spy wrapper
  'button-field': {
    component: FieldValuesListener,
    children: createElement(ButtonField),
  },
  'radio-info-container': {
    component: FieldValuesListener,
    children: createElement(RadioInfoContainer),
  },
  'card-checkbox': {
    component: FieldValuesListener,
    children: createElement(CardCheckbox),
  },
  'text-field': {
    component: FieldValuesListener,
    children: createElement(TextField),
  },
  'select-field': {
    component: FieldValuesListener,
    children: createElement(Select2Field),
  },
  'select-decor-field': {
    component: FieldValuesListener,
    children: createElement(SelectDecorField),
  },
  'checkbox-button': {
    component: FieldValuesListener,
    children: createElement(CheckboxButtonField),
  },
  'checkbox-field': {
    component: FieldValuesListener,
    children: createElement(CheckboxField),
  },
  'date-picker': {
    component: FieldValuesListener,
    children: createElement(DatePicker),
  },
  'radio-image': {
    component: FieldValuesListener,
    children: createElement(RadioImage),
  },
  'card-checkbox-additional': {
    component: FieldValuesListener,
    children: createElement(CardCheckboxAdditional),
  },
  'assistance-modal': {
    component: FieldValuesListener,
    children: createElement(AssistanceModal),
  },
  'edit-field': {
    component: FieldValuesListener,
    children: createElement(EditField),
  },
  'radio-box': {
    component: FieldValuesListener,
    children: createElement(RadioBox),
  },
  'toggle-field': {
    component: FieldValuesListener,
    children: createElement(ToggleField),
  },
  'range-field': {
    component: FieldValuesListener,
    children: createElement(RangeField),
  },
  'confirmation-box': {
    component: FieldValuesListener,
    children: createElement(ConfirmationBox),
  },
  'smartform-field': {
    component: FieldValuesListener,
    children: createElement(SmartFormField),
  },
  'shadow-copy': {
    component: FieldValuesListener,
    children: createElement(ShadowCopyField),
  },
  'file-upload': {
    component: FieldValuesListener,
    children: createElement(FileUpload),
  },
  'masked-number-field': {
    component: FieldValuesListener,
    children: createElement(MaskedNumberField),
  },
  'masked-pattern-field': {
    component: FieldValuesListener,
    children: createElement(MaskedPatternField),
  },

  // Wrapper
  wizard: FormWizard,

  // Fetchers
  'spz-fetch-field': SpzFetchField,
  'rz-fetch-field': RZFetchField,
};

export default componentMapper;
