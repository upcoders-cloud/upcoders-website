const pl = {
  common: {
    close: 'Zamknij',
  },
  navbar: {
    items: {
      offer: 'Oferta',
      about: 'O nas',
      projects: 'Realizacje',
      contact: 'Kontakt',
    },
    languageSwitcher: {
      ariaLabel: 'Wybierz jezyk',
    },
  },
  hero: {
    title: {
      line1: 'TWORZYMY',
      line2Prefix: 'LEPSZE',
      line2PrefixDone: 'LEPSZĄ',
      words: ['ROZWIĄZANIA', 'PRODUKTY', 'INNOWACJE', 'POMYSŁY', 'PRZYSZŁOŚĆ'],
    },
    description:
      'Projektujemy i rozwijamy nowoczesne aplikacje dopasowane do procesow firm przemyslowych i technicznych.',
    cta: 'ZAPYTAJ O SWOJ PROJEKT',
  },
  offer: {
    eyebrow: 'OFERTA',
    title:
      'Projektujemy i budujemy produkty cyfrowe dopasowane do realnych potrzeb biznesu, codziennych procesow i dlugoterminowego rozwoju.',
    paragraph1:
      'Jestesmy nowoczesnym zespolem nastawionym na startupowe tempo pracy i tworzenie wysokiej jakosci aplikacji webowych i mobilnych dla firm, ktore chca dzialac szybciej i skuteczniej.',
    paragraph2:
      'Rozwijamy takze technologie przyszlosci - w tym sztuczna inteligencje i automatyzacje - aby pomagac klientom odkrywac nowe mozliwosci oraz usprawniac procesy.',
    specializeIn: 'W CZYM SIE SPECJALIZUJEMY?',
    items: {
      tailored: {
        title: 'Dedykowane rozwiazania software',
        content: 'Tworzymy oprogramowanie w pelni dopasowane do procesow Twojej firmy.',
      },
      webMobile: {
        title: 'Tworzenie aplikacji webowych i mobilnych',
        content:
          'Budujemy nowoczesne platformy webowe, aplikacje biznesowe i mobilne - od landing page po zlozone systemy.',
      },
      userCentered: {
        title: 'Projektowanie zorientowane na uzytkownika',
        content: 'Projektujemy intuicyjne, dostepne i angazujace doswiadczenia uzytkownika.',
      },
      hosting: {
        title: 'Hosting i administracja stron',
        content:
          'Zapewniamy niezawodny hosting, utrzymanie, aktualizacje oraz pelne wsparcie techniczne dla Twoich produktow cyfrowych.',
        cta: {
          label: 'Zobacz szczegoly',
          modalTitle: 'Hosting i administracja stron',
        },
        packages: {
          basic: {
            name: 'Basic',
            price: '199 PLN/mies.',
            features: ['Wlasna domena', 'Certyfikat SSL', 'Miesieczne kopie zapasowe', 'Wsparcie e-mail'],
          },
          pro: {
            name: 'Pro',
            price: '499 PLN/mies.',
            features: [
              'Wszystko z Basic',
              'Tygodniowe kopie zapasowe',
              'Monitoring 24/7',
              'Priorytetowe wsparcie',
              'Optymalizacja wydajnosci',
            ],
          },
          enterprise: {
            name: 'Enterprise',
            price: 'Wycena indywidualna',
            features: [
              'Wszystko z Pro',
              'Serwer dedykowany',
              'Gwarancja SLA',
              'Integracje niestandardowe',
            ],
          },
        },
      },
      cloudDevops: {
        title: 'Cloud i DevOps',
        content:
          'Skalowalna infrastruktura i nowoczesne praktyki CI/CD, ktore zapewniaja niezawodnosc, bezpieczenstwo i szybkosc.',
      },
      aiAutomation: {
        title: 'AI i inteligentna automatyzacja',
        content:
          'Wykorzystujemy sztuczna inteligencje i automatyzacje, aby tworzyc madrzejsze produkty oraz usprawniac przeplywy pracy.',
      },
      longTerm: {
        title: 'Dlugoletnie partnerstwo technologiczne',
        content: 'Zostajemy z Toba na dlugo, rozwijajac oprogramowanie wraz ze wzrostem firmy.',
      },
    },
    packageCard: {
      recommended: 'Polecany',
      contactButton: 'Skontaktuj sie',
    },
  },
  team: {
    eyebrow: 'POZNAJ NASZ ZESPOL',
    description:
      'Jestesmy czyms wiecej niz firma technologiczna - to zespol ludzi polaczonych ciekawoscia, kreatywnoscia i checia realnego wplywu. Wspolnie zamieniamy wyzwania w mozliwosci.',
    members: {
      pawel: {
        role: 'Wspolzalozyciel',
        about: 'Zamienia wizje w skalowalne rozwiazania.',
      },
      fabian: {
        role: 'Wspolzalozyciel i Project Manager',
        about: 'Jasne cele, plynna realizacja.',
      },
      michal: {
        role: 'Wspolzalozyciel i Architekt Integracji',
        about: 'Czysty kod, mocne fundamenty.',
      },
      wojciech: {
        role: 'Wspolzalozyciel i Full-Stack Architect',
        about: 'Laczy frontend i backend z pelna klarownoscia.',
      },
    },
  },
  contact: {
    header: {
      line1: 'Porozmawiajmy o',
      line2: 'Twoim projekcie!',
      descriptionLine1: 'Zostaw nam adres e-mail i numer telefonu.',
      descriptionLine2: 'Skontaktujemy sie z Toba w ciagu 48 godzin.',
    },
    form: {
      labels: {
        email: 'E-mail',
        phone: 'Numer telefonu',
        privacy: 'Akceptuje warunki polityki prywatnosci *',
      },
      placeholders: {
        input: 'Wpisz tutaj...',
      },
      errors: {
        emailRequired: 'E-mail jest wymagany.',
        emailInvalid: 'Podaj poprawny adres e-mail.',
        phoneInvalid: 'Podaj poprawny numer telefonu.',
        privacyRequired: 'Zaznacz zgode, aby kontynuowac.',
      },
      buttons: {
        send: 'WYSLIJ WIADOMOSC',
        sent: 'WYSLANO',
      },
      toasts: {
        success: 'Wiadomosc zostala wyslana.',
        failed: 'Wysylka nie powiodla sie.',
        clientError: 'Blad klienta. Sprawdz konsole po wiecej informacji.',
        missingConfig: 'Blad konfiguracji formularza. Skontaktuj sie z administratorem strony.',
      },
      web3: {
        subject: 'Nowa wiadomosc z naszej strony',
        fromName: 'Strona Upcoders',
      },
    },
  },
  footer: {
    followUs: 'Obserwuj nas',
    company: 'Firma',
    contact: 'Kontakt',
    partners: 'Partnerzy',
  },
  projects: {
    title: 'Realizacje',
    description:
      'Ta podstrona jest gotowa pod case studies. W kolejnym kroku mozemy podpiac karty realizacji i widok szczegolow.',
  },
  projectDetails: {
    titlePrefix: 'Realizacja:',
    description: 'Tutaj pojawia sie szczegoly case study.',
  },
  notFound: {
    title: 'Nie znaleziono strony',
    backHome: 'Wroc na strone glowna',
  },
}

export default pl
