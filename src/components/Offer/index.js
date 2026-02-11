export const OFFER_ITEMS = [
  {
    id: '1',
    titleKey: 'offer.items.tailored.title',
    contentKey: 'offer.items.tailored.content',
  },
  {
    id: '2',
    titleKey: 'offer.items.webMobile.title',
    contentKey: 'offer.items.webMobile.content',
  },
  {
    id: '3',
    titleKey: 'offer.items.userCentered.title',
    contentKey: 'offer.items.userCentered.content',
  },
  {
    id: '4',
    anchor: 'hosting',
    titleKey: 'offer.items.hosting.title',
    contentKey: 'offer.items.hosting.content',
    cta: {
      labelKey: 'offer.items.hosting.cta.label',
      modalTitleKey: 'offer.items.hosting.cta.modalTitle',
      packagesBasePath: 'offer.items.hosting.packages',
      packages: [
        { key: 'basic' },
        { key: 'pro', recommended: true },
        { key: 'enterprise' },
      ],
    },
  },
  {
    id: '5',
    titleKey: 'offer.items.cloudDevops.title',
    contentKey: 'offer.items.cloudDevops.content',
  },
  {
    id: '6',
    titleKey: 'offer.items.aiAutomation.title',
    contentKey: 'offer.items.aiAutomation.content',
  },
  {
    id: '7',
    titleKey: 'offer.items.longTerm.title',
    contentKey: 'offer.items.longTerm.content',
  },
]
