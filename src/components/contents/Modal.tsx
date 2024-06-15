import { x } from '@xstyled/emotion';
import {
  List,
  ListItem,
  useModal,
  Modal as AnolisModal,
  ModalProps as AnolisModalProps,
} from 'anolis-ui';
import { FC, ReactNode, useEffect } from 'react';

import MeetingRecordForm from '@src/components/contents/Cart/components/ModalContent/MeetingRecordForm';
import BonusModalContent from '@src/components/modals/BonusModalContent';
import config from '@src/config';
import scroll from '@src/utils/scroll';

export interface BasicProps extends Omit<AnolisModalProps, 'content'> {
  content?: ReactNode;
  customContent?: ReactNode;
  onClose?: () => unknown;
  headingText?: string;
}

export const Basic: FC<BasicProps> = ({
  children,
  content,
  customContent,
  onClose,
  headingText,
  ...props
}) => {
  const [closeModal] = useModal(null);
  const close = onClose ?? closeModal;

  return (
    <AnolisModal
      onClose={close}
      header={
        <x.div
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          gap="1rem"
          position="relative"
          minHeight="1.375rem"
        >
          <x.p
            fontSize="1.125rem"
            lineHeight="1.375rem"
            minHeight="1.375rem"
            fontWeight={600}
            textAlign={{ _: 'left', sm: 'center' }}
            w="100%"
            px={{ sm: '4rem' }}
          >
            {headingText ?? ''}
          </x.p>

          <x.div
            onClick={close}
            flex="0 0 auto"
            position={{ _: 'relative', sm: 'absolute' }}
            right={0}
            cursor="pointer"
          >
            <x.img src="/static/icon/24/multiply.svg" alt="" />
          </x.div>
        </x.div>
      }
      _header={{
        borderBottom: '1px solid',
        borderColor: 'grayscale.gray4',
        p: '1.5rem',
        mb: 0,
        top: 0,
        position: 'sticky',
        zIndex: 20,
      }}
      _close={{
        display: 'none',
      }}
      padding={0}
      maxWidth="46.4375rem"
      borderRadius="1.25rem"
      border="1px solid"
      borderColor="grayscale.gray4"
      boxShadow="0 0.25rem 0.25rem rgba(51, 51, 51, 0.04), 0 0.25rem 1rem rgba(51, 51, 51, 0.08)"
      overflow="hidden"
      {...props}
    >
      <x.div maxHeight="calc(100vh - 14.4375rem)" overflow="auto">
        {customContent ?? (
          <x.div
            py={{ _: '2rem', sm: '3rem' }}
            px={{ _: 0, sm: '2rem' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {content ?? children}
          </x.div>
        )}
      </x.div>
    </AnolisModal>
  );
};

interface ModalProps {
  variant?: 'jak-zjistit';
}

interface ModalsProps {
  id: string;
  modalProps: BasicProps;
}

const modals: ModalsProps[] = [
  {
    id: 'jak-zjistit',
    modalProps: {
      headingText: 'Jak zjistit',
    },
  },
  {
    id: 'jak-ji-zjistim',
    modalProps: {
      headingText: 'Jak zjistit hodnotu vozidla?',
      content: (
        <x.div px="2rem">
          <x.img
            src={`${config.domain}/static/img/vehicle-modals-help/hodnotaHav1.jpg`}
            w="auto"
            maxW="100%"
          />
          <x.img
            src={`${config.domain}/static/img/vehicle-modals-help/hodnotaHav2.jpg`}
            w="auto"
            maxW="100%"
          />
        </x.div>
      ),
    },
  },
  {
    id: 'casco-spoluucast',
    modalProps: {
      headingText: 'Co myslíme spoluúčastí?',
      content: (
        <x.div px="2rem">
          <x.p>Je to částka, kterou se podílíte na vyplacení škody.</x.p>
          <x.p fontWeight="600" pt="0.5rem">
            Například pokud je spoluúčast nastavena na 10 000 Kč, tak:
          </x.p>
          {[
            'při škodě 8 000 Kč nevyplatíme nic (8000 - 10 000 = žádné plnění)',
            'při škodě 40 000 Kč bude vyplaceno 30 000 Kč (40 000 - 10 000 = 30 000)',
            'při škodě 250 000 Kč bude vyplaceno 240 000 Kč (250 000 - 10 000 = 240 000)',
          ].map((value) => (
            <x.p key={value} pt="0.5rem">
              {value}
            </x.p>
          ))}
          <x.p pt="0.75rem">
            Výše spoluúčasti má vliv i na cenu vaší pojistky. Čím vyšší
            spoluúčast, tím levnější pojistka. A zároveň platí, že vysoká
            spoluúčast dává smysl, když jsou pravděpodobné velké škody. Pokud
            ale očekáváte jen drobné škody, tak vysoká spoluúčast může způsobit,
            že dostanete jen zlomek částky.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'jak-probiha-prohlidka',
    modalProps: {
      headingText: 'Jak probíhá prohlídka?',
      content: (
        <x.div px="2rem">
          <x.p>Jak vypadá prohlídka vozidla technikem?</x.p>
          <x.p>
            1) Vyberete si, kam má technik dojet (kdekoliv v ČR) a s kým se má
            domluvit na konkrétní čas prohlídky.
          </x.p>
          <x.p>
            2) Prohlídka nesmí proběhnout dříve než 5 dnů před počátkem
            pojištění, a ne později než 10 dnů po jeho počátku. V této době
            technik zavolá kontaktní osobě, domluví se na čase prohlídky a
            upřesní místo. Pokud se rozmyslíte a budete chtít vozidlo prohlédnou
            například v jiném okrese, než jste původně nahlásili, dejte nám to
            prosím co nejdřív vědět.
          </x.p>
          <x.p>
            3) Prohlídka musí proběhnout za dobrých světelných podmínek (v
            zimních měsících je to horší, ale zvládneme to, zároveň platí
            omezení v krytých prostorách garáží apod.). Vozidlo musí být před
            prohlídkou čisté bez případného nánosu sněhu, bahna…
          </x.p>
          <x.p>
            4) Technik před prohlídkou telefonicky nebo SMSkou ještě potvrdí čas
            a místo setkání.{' '}
          </x.p>
          <x.p>
            5) Technik dorazí na místo, prohlédne a vyfotí vozidlo. Celá
            prohlídka trvá cca 20 minut. Potom dostanete protokol o přijetí
            vozidla do pojištění, případně informaci, že vozidlo do pojištění
            přijmout nemůžeme.
          </x.p>
          <x.p>
            6) Po potvrzení přijetí vozidla do pojištění máte platné havarijní
            pojištění s vámi sjednanou spoluúčastí. V době mezi počátkem
            pojištění a akceptací prohlídky máte spoluúčast nastavenou na 95 %.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'balicky-asistence',
    modalProps: {
      headingText: 'Všechny asistence',
      content: (
        <x.div px={{ sm: '2rem' }} w="100%">
          <x.img
            src={`${config.domain}/static/img/asistenceNapoveda.png`}
            width="613"
            height="882"
            alt="Asistence nápověda"
          />
        </x.div>
      ),
    },
  },
  {
    id: 'balicky-asistence-nad-3-5-t',
    modalProps: {
      headingText: 'Všechny asistence',
      content: (
        <x.div px={{ sm: '2rem' }} w="100%">
          <x.img
            src={`${config.domain}/static/img/asistenceNapovedaNad3_5t.webp`}
            width="613"
            height="669"
            alt="Asistence nápověda nad 3,5t"
          />
        </x.div>
      ),
    },
  },
  {
    id: 'jak-nastavit-limit-pojisteni',
    modalProps: {
      headingText: 'Jak si nastavit limit pojištění?',
      content: (
        <x.div px="2rem">
          <List fontFamily="text-sans">
            <x.p position="relative" color="primary.black" fontWeight="700">
              50 milionů
            </x.p>
            <ListItem color={{ marker: 'primary.greenDirect' }} pt="1rem">
              Základní limit, který musíte mít. Ze zákona je minimální povolený
              limit pro povinné ručení stanoven na 35 milionů. My chceme mít
              jistotu, že jste krytí. Proto nabízíme minimální limit o trochu
              vyšší.
            </ListItem>
            <x.p
              position="relative"
              color="primary.black"
              fontWeight="700"
              pt="1rem"
            >
              100 milionů
            </x.p>
            <ListItem color={{ marker: 'primary.greenDirect' }} py="1rem">
              Může se hodit ve chvíli, kdy poškodíte na zdraví někoho v zemích,
              kde jsou např. vyšší platy a kde by limit 50 milionů nemusel
              stačit. Nebo v případech, kdy při nehodě poškodíte majetek vyšší
              hodnoty (např. sloup elektrického vedení, kamion naložený drahým
              zbožím apod.)
            </ListItem>
            <x.p position="relative" color="primary.black" fontWeight="700">
              150 milionů/200 milionů/250 milionů
            </x.p>
            <ListItem color={{ marker: 'primary.greenDirect' }} py="1rem">
              Pro škody na zdraví je dostačující limit 100 milionů korun. Pro
              škody na majetku však nemusí, a proto nabízíme i limity vyšší.
              Škody se mohou šplhat do astronomických částek. Pokud vaše vozidlo
              např. uvízne na železničním přejezdu, narazí do něj vlak, který
              vykolejí a zničí u toho ještě další objekty, mohou se částky
              vyšplhat i přes 200 milionů. Obzvlášť, když ke škodě dojde za
              hranicemi ČR.
            </ListItem>
          </List>
        </x.div>
      ),
    },
  },
  {
    id: 'pojisteni-nezavinene-bouracky',
    modalProps: {
      headingText: 'Co je pojištění nezaviněné bouračky?',
      content: (
        <x.div px="2rem">
          <x.p>
            Pokud vás někdo nabourá, vyřešíme škodu a všechno papírování s
            pojišťovnou viníka za vás. Nejlepší na tomto pojištění je, že platí
            po celé Evropě. Škodu za vás tedy vyřídíme, i když vás nabourá třeba
            Bulhar v Maďarsku. Kromě toho nebudete muset čekat na vyplacení
            peněz od pojišťovny viníka. Dostanete je totiž přímo od nás.
          </x.p>
          <x.p pt="1rem">
            Jedinou podmínkou, abyste pojištění mohli použít, je, že za nehodu
            ani z části nemůžete. Hodí se tedy pro každého, kdo nechce řešit
            škody na svém vozidle s pojišťovnou viníka nehody nebo ji platit ze
            svého havarijního pojištění. Ať už kvůli spoluúčasti nebo kvůli
            následnému zdražení havarijního pojištění.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'pojisteni-sedacek-zavazadel',
    modalProps: {
      headingText: 'Co je pojištění dětských sedaček a zavazadel?',
      content: (
        <x.div px="2rem">
          <x.p>
            Pojištění zaplatí zničená nebo ukradená zavazadla, dětské
            autosedačky, kola, lyže a další sportovní vybavení.
          </x.p>
          <x.p pt="1rem">
            Pro všechny, kteří v autě často něco vozí. Především pro rodiče
            malých dětí, které jezdí v autosedačkách. Důležitou podmínkou je, že
            věci musíte mít zamčené. Tedy musí být v zamčeném autě, v zamčeném
            střešním boxu, nosiči atd. Na věci v autě, kromě autosedaček, také
            nesmí být zvenku vidět. Pojištění se vztahuje jen na věci lidí
            cestujících ve vozidle. Věci nenechávejte v autě přes noc, pojištění
            se nevztahuje na krádeže v době od 22:00 do 6:00 mimo hlídané
            parkoviště. Při každé události platí vaše spoluúčast 500 Kč.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'garance-3roky',
    modalProps: {
      headingText: 'Co je garance ceny pojištění na 3 roky?',
      content: (
        <x.div px="2rem">
          <x.p>
            3 roky vám nezdražíme pojištění u sjednaných rizik. Zároveň nebudeme
            měnit ani bonus stanovený při sjednání smlouvy.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'co-je-spoluucast',
    modalProps: {
      headingText: 'Co myslíme spoluúčastí?',
      content: (
        <x.div px="2rem">
          <x.p>Je to částka, kterou se podílíte na vyplacení škody.</x.p>
          <x.p pt="1rem" fontWeight="600">
            Například pokud je spoluúčast nastavena na 10 %, minimálně však 10
            000 Kč, tak:
          </x.p>
          <List fontFamily="text-sans">
            <ListItem color={{ marker: 'primary.greenDirect' }} pt="1rem">
              při škodě 8 000 Kč nevyplatíme nic (8000 - 10 000 = žádné plnění)
            </ListItem>
            <ListItem color={{ marker: 'primary.greenDirect' }} py="1rem">
              při škodě 40 000 Kč bude vyplaceno 30 000 Kč (40 000 - 10 000 = 30
              000)
            </ListItem>
            <ListItem color={{ marker: 'primary.greenDirect' }}>
              při škodě 250 000 Kč bude vyplaceno 225 000 Kč (250 000 - 25 000 =
              225 000) Výše spoluúčasti má vliv i na cenu vaší pojistky. Čím
              vyšší spoluúčast, tím levnější pojistka. A zároveň platí, že
              vysoká spoluúčast dává smysl, když jsou pravděpodobné velké škody.
              Pokud ale očekáváte jen drobné škody, tak vysoká spoluúčast může
              způsobit, že dostanete jen zlomek částky.
            </ListItem>
          </List>
        </x.div>
      ),
    },
  },
  {
    id: 'co-myslime-pojistenim-skel',
    modalProps: {
      headingText: 'Co myslíme pojištěním skel?',
      content: (
        <x.div px="2rem">
          <x.p>
            Zaplatí opravu nebo výměnu skla, senzorů či vnitřního zrcátka.
          </x.p>
          <x.p pt="1rem">
            Limit, který si určíte, je zároveň maximální částka, kterou vám v
            případě jedné nehody zaplatíme. Pozor, cenu skel zvyšují například
            čidla nebo vyhřívání, které vám v případě škody také vyměníme, pokud
            to bude nutné. Dále je potřeba zohlednit panoramatické či střešní
            okno.
          </x.p>
          <x.p py="1rem" fontWeight="600" color="primary.black">
            Spoluúčast v prvních třech měsících.
          </x.p>
          <x.p>
            Pokud se sklo poničí v prvních třech měsících od sjednání tohoto
            pojištění, bude spoluúčast 50 %, což znamená, že vám zaplatíme jen
            polovinu škody. Toto neplatí v těchto případech: a) Jedná se o nové
            vozidlo (datum první registrace vozidla není starší pěti dnů od data
            počátku pojištění), b) Pokud máte pojištění skel společně s
            havarijním pojištěním.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'co-je-urazove-pojisteni',
    modalProps: {
      headingText: 'Co je úrazové pojištění?',
      content: (
        <x.div px="2rem">
          <x.p pb="1rem">
            Pojištění zaplatí odškodnění za trvalé následky po nehodě.
          </x.p>
          <x.p>
            Pro ty, kdo nemají sjednané samostatné úrazové/životní pojištění.
            Výši vyplacené částky určíme podle limitu, který si sjednáte, a
            podle oceňovací tabulky. Oceňovací tabulku najdete v pojistných
            podmínkách. Jsou v ní vypsané konkrétní trvalé následky. U každého z
            nich je pak procento, které ze sjednaného limitu za daný trvalý
            následek cestujícímu vyplatíme. Toto pojištění se vztahuje i na
            smrt.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'smrt-rodicu-ve-vozidle',
    modalProps: {
      headingText: 'Co myslíme smrtí obou rodičů ve vozidle?',
      content: (
        <x.div px="2rem">
          <x.p>
            Pokud při nehodě ve vozidle zemřou oba rodiče, vyplatíme jejich
            dětem 5 milionů korun. Toto pojištění se vztahuje na vás, platí
            tedy, že jedním ze zemřelých rodičů musíte být vy.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'co-myslime-dopravni-nehodou',
    modalProps: {
      headingText: 'Dopravní nehoda',
      content: (
        <x.div px="2rem">
          <x.p>
            Dopravní nehoda je nahodilá událost, při které se poškodí nebo zničí
            pojištěné vozidlo vlivem působení vnějších sil, např. střetem,
            nárazem nebo pádem vozidla. Přesné znění těchto rizik je součástí
            pojistných podmínek.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'co-myslime-stretem-se-zviraty',
    modalProps: {
      headingText: 'Střet a poškození zvířaty',
      content: (
        <x.div px="2rem">
          <x.p>
            Když vozidlo při jízdě narazí do zvířete nebo vám zvíře poškodí
            stojící vozidlo, například kuna překouše kabely. Střet se zvířaty je
            událost, při které vozidlo při jízdě náhodou narazí do zvířete.
            Poškození zvířaty je událost, při které zvíře poškodí vnější
            karoserii nebo části prostoru motoru na stojícím vozidle, např.
            kabely, brzdovou soustavu nebo odhlučnění. Přesné znění těchto rizik
            je součástí pojistných podmínek.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'co-myslime-odcizenim-a-vandalismem',
    modalProps: {
      headingText: 'Odcizení a vandalismus',
      content: (
        <x.div px="2rem">
          <x.p>
            Odcizení znamená, že vám vozidlo nebo jeho část někdo ukradne po
            překonání zabezpečení vozidla. Vandalismus znamená, že vám vozidlo
            nebo jeho části někdo úmyslně poškodí nebo zničí. Přesné znění
            těchto rizik je součástí pojistných podmínek.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'co-je-prirodni-nebezpeci',
    modalProps: {
      headingText: 'Přírodní nebezpečí',
      content: (
        <x.div px="2rem">
          <x.p>
            Poškození nebo zničení vozidla například kvůli požáru nebo povodni.
            Nahodilá událost, při které škoda vznikla kvůli požáru, výbuchu,
            úderu blesku, pádu předmětu, včetně letadla, povodni, záplavě,
            vichřici, krupobití, sesuvu půdy, zřícení skal, pádu lavin,
            zemětřesení, tíze sněhu nebo námrazy. Přesné znění těchto rizik je
            součástí pojistných podmínek.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'fuelTypeCode',
    modalProps: {
      headingText: 'Jak to myslíme?',
    },
  },
  {
    id: 'vehicleCode',
    modalProps: {
      headingText: 'Kde najdu kód typu vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete na zadní straně tzv. velkého technického průkazu
            (osvědčení o registraci vozidla část II).
          </x.p>
          <x.div mt="1rem" mb="2rem">
            <x.p>
              <strong>Velký technický průkaz - kód typu vozidla</strong>
            </x.p>
            <x.div mt="1rem">
              <x.img
                src={`${config.domain}/static/img/vehicle-modals-help/kategorie_vozidla_help.webp`}
                alt="Velký technický průkaz - kód typu vozidla"
                width={700}
                height={315}
                objectFit="cover"
              />
            </x.div>
          </x.div>

          <x.div display="flex" flexDirection="column" spaceY="1rem">
            <x.div>
              <x.p>
                <strong>Osobní auta</strong> (kód M1, M1G - terénní auta)
              </x.p>
              <x.p>
                Pro auta s maximálně 9 místy k sezení včetně místa řidiče a s
                největší povolenou hmotností do 3,5 tuny včetně. Nepatří sem
                obytná nebo sanitní auta.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Motorky a čtyřkolky</strong> (kód L)
              </x.p>
              <x.p>
                Do této kategorie patří všechny závodní, soutěžní i cestovní
                motorky, mopedy, skútry (včetně sněžných), všechny tříkolky a
                čtyřkolky i kola s pomocným motorem – motokolo, motorové
                koloběžky. Nepatří sem elektrokola s maximálním trvalým výkonem
                0,25 kW.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Užitková auta do 3,5 tuny</strong> (kód N1, N1G)
              </x.p>
              <x.p>
                Auta určená zejména pro dopravu nákladů, mimo multikár a
                speciálních aut.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Nákladní auta</strong> (kód N1, N2, N3 dle maximální
                přípustné hmotnosti)
              </x.p>
              <x.p>
                Auta určená pro přepravu nákladů, multikáry a speciální auta
                (např. automobil cisternový, dílenský, fekální, chladírenský,
                kabelový, kropicí, laboratorní, montážní, na čištění kanálů,
                obojživelný, obytný, požární, pro čištění ulic, pro dopravu
                betonu, pro dopravu živých zvířat, pro odvoz odpadků, pro odvoz
                popela, pro přepravu osobních aut, pro přepravu kmenů,
                propagační, rozhlasový, stěhovací, sypací, s čerpadlem na beton,
                s výsuvným žebříkem, se zvedací plošinou, televizní,
                vyprošťovací s navijákem, zametací, autojeřáb, autobagr,
                soutěžní a závodní nákladní auta, rolba na úpravu lyžařských
                tratí) a tahače návěsů.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Přívěs – návěs</strong>
              </x.p>
              <x.p>
                Je určený k tažení motorovým vozidlem, nemá vlastní motor. Patří
                sem veškeré přívěsy a návěsy za motocykly, osobní a nákladní
                automobily.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Návěs za tahač návěsů</strong>
              </x.p>
              <x.p>Návěsy určené za tahače návěsů ve všech provedeních.</x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Obytný přívěs/ návěs</strong>
              </x.p>
              <x.p>Tzv. karavan, přívěs sloužící k rekreačním účelům.</x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Ostatní</strong>
              </x.p>
              <x.p>
                Patří sem traktor, čtyřkolka zařazená jako traktor, manipulační
                vozík, jednonápravový kultivační traktor, malotraktor,
                dvounápravový, traktor kultivační, nářaďový (nosič nářadí),
                speciální, lesnický kolový traktor a vysokozdvižný vozík.
              </x.p>
            </x.div>
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'vehicleCodeOrv',
    modalProps: {
      headingText: 'Kde najdu kód typu vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete na zadní straně tzv. velkého technického průkazu
            (osvědčení o registraci vozidla část II) nebo na zadní straně
            průkazu o osvědčení registrace vozidla.
          </x.p>
          <x.div mt="1rem" mb="2rem">
            <x.p>
              <strong>Velký technický průkaz - kód typu vozidla</strong>
            </x.p>
            <x.div mt="1rem">
              <x.img
                src={`${config.domain}/static/img/vehicle-modals-help/kategorie_vozidla_help.webp`}
                alt="Velký technický průkaz - kód typu vozidla"
                width={700}
                height={315}
                objectFit="cover"
              />
            </x.div>

            <x.p mt="1rem">
              <strong>Osvědčení o registraci vozidla - kód typu vozidla</strong>
            </x.p>
            <x.div mt="1rem">
              <x.img
                src={`${config.domain}/static/img/vehicle-modals-help/kategorie_vozidla_helpOrv.webp`}
                alt="Osvědčení o registraci vozidla - kód typu vozidla"
                width={750}
                height={534}
                objectFit="cover"
              />
            </x.div>
          </x.div>

          <x.div display="flex" flexDirection="column" spaceY="1rem">
            <x.div>
              <x.p>
                <strong>Osobní auta</strong> (kód M1, M1G - terénní auta)
              </x.p>
              <x.p>
                Pro auta s maximálně 9 místy k sezení včetně místa řidiče a s
                největší povolenou hmotností do 3,5 tuny včetně. Nepatří sem
                obytná nebo sanitní auta.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Motorky a čtyřkolky</strong> (kód L)
              </x.p>
              <x.p>
                Do této kategorie patří všechny závodní, soutěžní i cestovní
                motorky, mopedy, skútry (včetně sněžných), všechny tříkolky a
                čtyřkolky i kola s pomocným motorem – motokolo, motorové
                koloběžky. Nepatří sem elektrokola s maximálním trvalým výkonem
                0,25 kW.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Užitková auta do 3,5 tuny</strong> (kód N1, N1G)
              </x.p>
              <x.p>
                Auta určená zejména pro dopravu nákladů, mimo multikár a
                speciálních aut.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Nákladní auta</strong> (kód N1, N2, N3 dle maximální
                přípustné hmotnosti)
              </x.p>
              <x.p>
                Auta určená pro přepravu nákladů, multikáry a speciální auta
                (např. automobil cisternový, dílenský, fekální, chladírenský,
                kabelový, kropicí, laboratorní, montážní, na čištění kanálů,
                obojživelný, obytný, požární, pro čištění ulic, pro dopravu
                betonu, pro dopravu živých zvířat, pro odvoz odpadků, pro odvoz
                popela, pro přepravu osobních aut, pro přepravu kmenů,
                propagační, rozhlasový, stěhovací, sypací, s čerpadlem na beton,
                s výsuvným žebříkem, se zvedací plošinou, televizní,
                vyprošťovací s navijákem, zametací, autojeřáb, autobagr,
                soutěžní a závodní nákladní auta, rolba na úpravu lyžařských
                tratí) a tahače návěsů.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Přívěs – návěs</strong>
              </x.p>
              <x.p>
                Je určený k tažení motorovým vozidlem, nemá vlastní motor. Patří
                sem veškeré přívěsy a návěsy za motocykly, osobní a nákladní
                automobily.
              </x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Návěs za tahač návěsů</strong>
              </x.p>
              <x.p>Návěsy určené za tahače návěsů ve všech provedeních.</x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Obytný přívěs/ návěs</strong>
              </x.p>
              <x.p>Tzv. karavan, přívěs sloužící k rekreačním účelům.</x.p>
            </x.div>
            <x.div>
              <x.p>
                <strong>Ostatní</strong>
              </x.p>
              <x.p>
                Patří sem traktor, čtyřkolka zařazená jako traktor, manipulační
                vozík, jednonápravový kultivační traktor, malotraktor,
                dvounápravový, traktor kultivační, nářaďový (nosič nářadí),
                speciální, lesnický kolový traktor a vysokozdvižný vozík.
              </x.p>
            </x.div>
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'enginePower',
    modalProps: {
      headingText: 'Kde najdu výkon vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete vpravo na zadní straně malého technického průkazu
            pod označením <strong>Max. výkon.</strong>
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/maxVykon.webp`}
              width={700}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'enginePowerOrv',
    modalProps: {
      headingText: 'Kde najdu výkon vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete vpravo na zadní straně malého technického průkazu
            pod označením <strong>Max. výkon.</strong>
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/maxVykon.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz - Maximální výkon"
            />
          </x.div>

          <x.p mt="1rem">
            Nebo vpravo na zadní straně osvědčení o registraci vozidla pod
            označením <strong>Max. výkon.</strong>
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/maxVykonOrv.webp`}
              width={800}
              height={569}
              objectFit="cover"
              alt="Osvědčení o registraci vozidla - Maximální výkon"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'registrationBookNumber',
    modalProps: {
      headingText: 'Kde najdu číslo dokladu o registraci vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete vpravo na přední straně tzv. velkého technického
            průkazu.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/osvedceni_o_registraci_cislo_II.webp`}
              width={750}
              height={1613}
              objectFit="cover"
              alt="Velký technický průkaz"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'registrationBookNumberOrv',
    modalProps: {
      headingText: 'Kde najdu číslo dokladu o registraci vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete vpravo na přední straně tzv. velkého technického
            průkazu.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/osvedceni_o_registraci_cislo_II.webp`}
              width={750}
              height={1613}
              objectFit="cover"
              alt="Velký technický průkaz"
            />
          </x.div>

          <x.p>Nebo vlevo na přední straně osvědčení o registraci vozidla.</x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/orv_cislo_prukazu.webp`}
              width={800}
              height={554}
              objectFit="cover"
              alt="Osvědčení o registraci vozidla"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'maxWeight',
    modalProps: {
      headingText: 'Kde najdu hmotnost vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete vpravo na zadní straně malého technického průkazu
            pod označením <strong>Hmotnost.</strong>
          </x.p>
          <x.div mt="1rem" />
          <x.img
            src={`${config.domain}/static/img/vehicle-modals-help/pripustnaHmotnost.webp`}
            width={600}
            height={411}
            objectFit="cover"
            alt="Malý technický průkaz - Hmotnost vozidla"
          />
        </x.div>
      ),
    },
  },
  {
    id: 'maxWeightOrv',
    modalProps: {
      headingText: 'Kde najdu hmotnost vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete vlevo na zadní straně malého technického průkazu
            pod označením <strong>Hmotnost.</strong>
          </x.p>
          <x.div mt="1rem" />
          <x.img
            src={`${config.domain}/static/img/vehicle-modals-help/pripustnaHmotnost.webp`}
            width={600}
            height={411}
            objectFit="cover"
            alt="Malý technický průkaz - Hmotnost vozidla"
          />

          <x.p mt="1rem">
            Nebo vlevo na zadní straně osvědčení o registraci vozidla pod
            označením <strong>Hmotnost.</strong>
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/pripustnaHmotnostOrv.webp`}
              width={800}
              height={569}
              objectFit="cover"
              alt="Osvědčení o registraci vozidla - Hmotnost"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'engineVolume',
    modalProps: {
      headingText: 'Kde najdu objem motoru vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Lidově nazývaný obsah motoru. Najdete jej vlevo na zadní straně
            malého technického průkazu pod označením{' '}
            <strong>Zdvihový objem.</strong>
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/zdvihovy-objem.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz - Zdvihový objem"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'engineVolumeOrv',
    modalProps: {
      headingText: 'Kde najdu objem motoru vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Lidově nazývaný obsah motoru. Najdete jej vlevo na zadní straně
            malého technického průkazu pod označením{' '}
            <strong>Zdvihový objem.</strong>
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/zdvihovy-objem.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz - Zdvihový objem"
            />
          </x.div>

          <x.p mt="1rem">
            Nebo vlevo na zadní straně osvědčení o registraci vozidla pod
            označením <strong>Zdvihový objem.</strong>
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/zdvihovy-objemOrv.webp`}
              width={800}
              height={569}
              objectFit="cover"
              alt="Osvědčení vozidla - Zdvihový objem"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'usePurposeCode',
    modalProps: {
      headingText: 'Co myslíme způsobem užití vozidla?',
      content: (
        <x.div px="2rem">
          {' '}
          <x.p>
            <strong>Běžné užití vozidla</strong>
            <br /> – vozidlo využívané pro osobní potřebu. <br />
            <br />
            <strong>Vozidlo s právem přednostní jízdy</strong>
            <br /> – při plnění zvláštních úkolů používá sirénu a modrý maják.
            Například vozidlo policie, vězeňské služby, vojenské policie, obecní
            a městské policie hasičů, důlní záchranné služby a další vozidla
            určená v silničním zákoně a ve vyhlášce č. 110/2001 Sb.
            <br />
            <br />
            <strong>
              Vozidlo taxislužby, Uber, Taxify či jiné formy sdílené jízdy
            </strong>
            <br /> – osobní auto do 3,5 t (kategorie M1) určené k přepravě osob
            za úplatu. Motocykly, tříkolky nebo čtyřkolky a kola s pomocným
            motorem jako vozidla taxislužby nepojišťujeme.
            <br />
            <br />
            <strong>
              Vozidlo určené k půjčování (autopůjčovna, carsharing)
            </strong>
            <br /> – převážně vozidla určená k půjčování, včetně operativního
            leasingu. Vozidla na finanční leasing sem nepatří.
            <br />
            <br />
            <strong>Vozidlo k běžné podnikatelské činnosti</strong>
            <br /> – používané k podnikání, ale nejsou používaná k jinému z
            uvedených účelů.
            <br />
            <br />
            <strong>Vozidlo pro přepravu nebezpečného nákladu</strong>
            <br /> – má v technickém průkazu uvedené, že může převážet
            nebezpečný náklad.
            <br />
            <br />
            <strong>Historické vozidlo</strong>
            <br /> – starší 30 let, které se již nevyrábí, je registrované jako
            historické vozidlo a má zvláštní registrační značku pro historická
            vozidla (ojediněle může mít i původní značku), nebo je registrované
            v klubu historických vozidel.
            <br />
            <br />
            <strong>Vozidlo autoškoly</strong>
            <br /> – vozidlo využívané při výuce řízení motorových vozidel.
            <br />
            <br />
            <strong>Jiné užití vozidla</strong>
            <br /> – ostatní případy neuvedené výše.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'garance-ceny',
    modalProps: {
      headingText: 'Garance ceny pojištění na 3 roky',
      content: (
        <x.div px="2rem">
          <x.p>3 roky nezdražíme pojištění u sjednaných rizik.</x.p>
          <x.p>
            Zároveň nebudeme měnit ani bonus stanovený při sjednání smlouvy.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'havarijko-na-kupni-cenu-ojeteho-vozidla',
    modalProps: {
      headingText: 'Co myslíme havarijkem na kupní cenu ojetého vozidla?',
      content: (
        <x.div px="2rem">
          <x.p>
            Pokud vám do tří let od sjednání smlouvy auto ukradnou nebo ho úplně
            zničíte, dostanete díky této variantě od pojišťovny částku, která
            bude odpovídat hodnotě auta v době, kdy jste ho pojišťovali.
            Pojištění budete proti všem havarijním rizikům.
          </x.p>
          <x.p pt="1rem">
            V případě úplné škody nebo krádeže dostanete od pojišťovny
            standardně jen aktuální hodnotu auta, tedy cenu, kterou mělo v době
            před nehodou. Díky výběru této varianty vám vyplatíme peníze navíc,
            celkem tedy dostanete{' '}
            <strong>
              částku, která bude odpovídat hodnotě auta v době, kdy jste ho
              pojišťovali
            </strong>
            . Tato varianta pojištění vám platí v případě dopravní nehody,
            střetu a poškození zvířaty, krádeže a vandalismu a přírodního
            nebezpečí.
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'leadinDate',
    modalProps: {
      headingText: 'Kde najdu datum první registrace?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete na přední straně malého techničáku pod označením{' '}
            <strong>Datum první registrace vozidla</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/datum-prvni-registrace.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz - Datum první registrace"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'leadinDateOrv',
    modalProps: {
      headingText: 'Kde najdu datum první registrace?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete na přední straně malého techničáku pod označením{' '}
            <strong>Datum první registrace vozidla</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/datum-prvni-registrace.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Osvědčení o registraci vozidla - Datum první registrace"
            />
          </x.div>

          <x.p mt="1rem">
            Nebo na přední straně osvědčení o registraci vozidla pod označením{' '}
            <strong>Datum první registrace vozidla</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/datum_prvni_registraceOrv.webp`}
              width={750}
              height={519}
              objectFit="cover"
              alt="Osvědčení o registraci vozidla - Datum první registrace"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'manufacturer',
    modalProps: {
      headingText: 'Kde najdu tovární značku?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete na zadní straně malého techničáku pod označením{' '}
            <strong>Tovární značka</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/tovarni_znacka.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz - Tovární zvnačka"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'manufacturerOrv',
    modalProps: {
      headingText: 'Kde najdu tovární značku?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete na zadní straně malého techničáku pod označením{' '}
            <strong>Tovární značka</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/tovarni_znacka.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz - Tovární značka"
            />
          </x.div>

          <x.p mt="1rem">
            Nebo na zadní straně osvědčení o registraci vozidla pod označením{' '}
            <strong>Tovární značka</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/tovarni_znackaOrv.webp`}
              width={750}
              height={534}
              objectFit="cover"
              alt="Osvědčení o registraci vozidla - Tovární značka"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'model',
    modalProps: {
      headingText: 'Kde najdu model?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete na zadní straně malého techničáku pod označením{' '}
            <strong>Obchodní označení</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/obchodni_oznaceni.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz - Obchodní označení"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'modelOrv',
    modalProps: {
      headingText: 'Kde najdu model?',
      content: (
        <x.div px="2rem">
          <x.p>
            Tento údaj najdete na zadní straně malého techničáku pod označením{' '}
            <strong>Obchodní označení</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/obchodni_oznaceni.webp`}
              width={600}
              height={411}
              objectFit="cover"
              alt="Malý technický průkaz - Obchodní označení"
            />
          </x.div>

          <x.p mt="1rem">
            Nebo na zadní straně osvědčení o registraci vozidla pod označením{' '}
            <strong>Obchodní označení</strong>.
          </x.p>
          <x.div mt="1rem">
            <x.img
              src={`${config.domain}/static/img/vehicle-modals-help/obchodni_oznaceniOrv.webp`}
              width={800}
              height={569}
              objectFit="cover"
              alt="Osvědčení o registraci vozidla - Obchodní označení"
            />
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'vehicleEcOrv',
    modalProps: {
      headingText: 'Jaký je rozdíl mezi VIN a Evidenčním číslem?',
      content: (
        <x.div px="2rem">
          <x.p>
            VIN kód - (Vehicle Identification Number), neboli identifikační
            číslo vozidla, je mezinárodně uznávaný jedinečný identifikátor
            motorových vozidel (osobních, užitkových, nákladních, obytných,
            motorek, přívěsů a návěsů). Jedná se o kód složený z jedinečné
            kombinace číslic a písmen. VIN je nejdůležitější identifikátor
            každého vozidla, který obsahuje informace o výrobci, modelu, a
            charakteristikách vozidla. Na jeho základě je vozidlo vedeno ve
            všech databázích výrobce, registru vozidel, policie, autoservisů,
            pojišťoven atp. Je tedy potřeba jej znát pro řadu úkonů - třeba
            sepsání kupní smlouvy, přepisu vozu na úřadě nebo uzavření
            pojištění.
          </x.p>
          <x.p pt="1rem">
            EČV neboli Evidenční Číslo Vozidla, kterým může být: č. rámu, č.
            karoserie nebo č. motoru pro vozidla, která nejsou opatřena VIN, nám
            slouží jako identifikátor předmětu pojištění (vozidla).
          </x.p>
        </x.div>
      ),
    },
  },
  {
    id: 'vin',
    modalProps: {
      headingText: 'VIN vozidla na zadní straně malého technického průkazu',
      content: (
        <x.div px={{ sm: '2rem' }} w="100%">
          <x.img
            src={`${config.domain}/static/img/vehicle-modals-help/vin.webp`}
            width={600}
            height={411}
            objectFit="cover"
            alt="Malý technický průkaz - VIN"
          />
        </x.div>
      ),
    },
  },
  {
    id: 'vinOrv',
    modalProps: {
      headingText: 'Kde najdu VIN vozidla?',
      content: (
        <x.div px="2rem" w="100%">
          <x.div>
            <x.p>
              Tento údaj najdete vpravo na zadní straně malého technického
              průkazu pod označením{' '}
              <strong>Identifikační číslo vozidla (VIN)</strong>.
            </x.p>
            <x.div mt="1rem">
              <x.img
                src={`${config.domain}/static/img/vehicle-modals-help/vin.webp`}
                alt="Malý technický průkaz - VIN"
                width={600}
                height={411}
                objectFit="cover"
              />
            </x.div>
          </x.div>
          <x.div mt="2rem">
            <x.p>
              Nebo vpravo na zadní straně osvědčení o registraci vozidla pod
              označením <strong>Identifikační číslo vozidla (VIN)</strong>.
            </x.p>
            <x.div mt="1rem">
              <x.img
                src={`${config.domain}/static/img/vehicle-modals-help/orv_vin.webp`}
                alt="Osvědčení o registraci vozidla - VIN"
                width={900}
                height={640}
                objectFit="cover"
              />
            </x.div>
          </x.div>
        </x.div>
      ),
    },
  },
  {
    id: 'pomoc-pri-poruse',
    modalProps: {
      headingText: 'Co myslíme rozšířenou pomocí při poruše?',
      content: (
        <x.div px="2rem">
          <x.p>
            <x.strong>Porucha</x.strong> – nepojízdnost vozidla způsobená
            jakoukoliv nahodilou mechanickou, elektrickou či elektronickou
            závadou.
          </x.p>
          <br />
          <x.p>
            <x.strong>Drobná závada</x.strong> - defekt pneumatiky, vybití
            startovací baterie, nedostatek nebo záměna paliva, ztráta,
            zabouchnutí nebo zalomení klíčů, zamrznutí paliva nebo ruční brzdy.
            Toto pojištění obsahují již všechny varianty asistence.
          </x.p>
        </x.div>
      ),
    },
  },
  /**
   * Modals accessing DDF context
   */
  {
    id: 'bonus-modal',
    modalProps: {
      headingText: 'Váš bonus',
      content: <BonusModalContent />,
    },
  },
  {
    id: 'zaznam-z-jednani',
    modalProps: {
      headingText: 'Záznam z jednání',
      content: <MeetingRecordForm />,
    },
  },
];

const Modal: FC<ModalProps> = () => {
  const [open] = useModal(Basic);
  const [close] = useModal();

  const checkHash = (hash: string) => {
    if (hash.startsWith('#modal')) {
      const modalId = hash.replace('#modal=', '');

      if (modals.filter((m) => m.id === modalId)[0]) {
        scroll.lock();

        open({
          onClose: () => {
            window.location.hash = 'modal';
            close();
            scroll.unlock();
          },
          headingText: modals.filter((m) => m.id === modalId)[0].modalProps
            .headingText,
          content: modals.filter((m) => m.id === modalId)[0].modalProps.content,
        });
      }
    }

    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    /**
     * To prevent the modal from opening and avoid errors such as accessing a context
     * before it is loaded (undefined error), it is necessary to remove the modal hash
     * from the URL when the modal component loads.
     */
    if (window.location.hash.startsWith('#modal')) {
      window.location.hash = '';
      window.history.replaceState(
        null,
        '',
        window.location.href.replace('#', '')
      );
    }

    const checkHashFunction = () => {
      checkHash(window.location.hash);
    };

    window.addEventListener('hashchange', checkHashFunction);
    return () => window.removeEventListener('hashchange', checkHashFunction);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <x.div />;
};

export default Modal;
