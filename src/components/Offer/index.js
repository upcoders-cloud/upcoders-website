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
    titleKey: 'offer.items.hosting.title',
    contentKey: 'offer.items.hosting.content',
    cta: {
      labelKey: 'offer.items.hosting.cta.label',
      modalTitleKey: 'offer.items.hosting.cta.modalTitle',
      packages: [
        {
          key: 'basic',
          nameKey: 'offer.items.hosting.packages.basic.name',
          priceKey: 'offer.items.hosting.packages.basic.price',
          featureKeys: [
            'offer.items.hosting.packages.basic.features.0',
            'offer.items.hosting.packages.basic.features.1',
            'offer.items.hosting.packages.basic.features.2',
            'offer.items.hosting.packages.basic.features.3',
          ],
        },
        {
          key: 'pro',
          nameKey: 'offer.items.hosting.packages.pro.name',
          priceKey: 'offer.items.hosting.packages.pro.price',
          recommended: true,
          featureKeys: [
            'offer.items.hosting.packages.pro.features.0',
            'offer.items.hosting.packages.pro.features.1',
            'offer.items.hosting.packages.pro.features.2',
            'offer.items.hosting.packages.pro.features.3',
            'offer.items.hosting.packages.pro.features.4',
          ],
        },
        {
          key: 'enterprise',
          nameKey: 'offer.items.hosting.packages.enterprise.name',
          priceKey: 'offer.items.hosting.packages.enterprise.price',
          featureKeys: [
            'offer.items.hosting.packages.enterprise.features.0',
            'offer.items.hosting.packages.enterprise.features.1',
            'offer.items.hosting.packages.enterprise.features.2',
            'offer.items.hosting.packages.enterprise.features.3',
          ],
        },
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
