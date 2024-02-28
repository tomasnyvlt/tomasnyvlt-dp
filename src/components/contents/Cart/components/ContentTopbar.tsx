import { x } from '@xstyled/emotion';
import { FC } from 'react';

import TopbarButton from '@src/components/contents/Cart/components/TopbarButton';
import { useTopbar } from '@src/components/contents/Cart/hooks/useTopbar';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import DownloadIcon from '@src/components/other/icons/24/download.svg?react';
import PenIcon from '@src/components/other/icons/24/pen.svg?react';
import SendIcon from '@src/components/other/icons/24/send.svg?react';

const ContentTopbar: FC = () => {
  const useStore = useFormStoreContext();
  const { cart, isInternalUser, isAgent } = useStore((state) => ({
    cart: state.cart,
    isInternalUser: state.isInternalUser,
    isAgent: state.isAgent,
  }));

  const { downloadPdf, openEmailModal } = useTopbar();
  const { suitabilityRecordModal } = cart ?? {};

  const isSuitabilityRecordVisible =
    isInternalUser && suitabilityRecordModal?.id;

  return (
    <x.div bg="primary.white" flex="1">
      <x.div
        bg="tercial.indigo5"
        px={{ _: '1.5rem', sm: '2.5rem' }}
        py={{ _: '2rem', sm: '2.5rem' }}
        borderRadius="0 0 2.75rem 2.75rem"
      >
        <x.div
          display="grid"
          gridTemplateColumns={{
            _: `repeat(${isSuitabilityRecordVisible || isAgent ? '1' : '2'}, 1fr)`,
            sm: `repeat(${isSuitabilityRecordVisible || isAgent ? '3' : '2'}, 1fr)`,
          }}
          alignItems="center"
          maxH="62.5rem"
          overflow="hidden"
        >
          <TopbarButton
            text="Odeslat na&nbsp;e&#8209;mail"
            icon={<SendIcon />}
            onClick={openEmailModal}
          />
          <TopbarButton
            text="Stáhnout v&nbsp;PDF"
            icon={<DownloadIcon />}
            onClick={downloadPdf}
          />

          {isSuitabilityRecordVisible && (
            <TopbarButton
              text="Záznam z&nbsp;jednání"
              icon={<PenIcon />}
              href={`#modal=${suitabilityRecordModal.id}`}
            />
          )}

          {isAgent && (
            <TopbarButton
              text="Záznam z&nbsp;jednání - šablona"
              icon={<DownloadIcon />}
              href="/static/pdf/auto/ZZJ_auto.pdf"
              download="Záznam z jednání - šablona.pdf"
            />
          )}
        </x.div>
      </x.div>
    </x.div>
  );
};

export default ContentTopbar;
