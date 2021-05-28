import { I18nGetter } from 'misc'

export const categories = (i18n:I18nGetter)=>[
  {name: 'all', label: i18n('allCategories')},
  {name: 'greenery', label: i18n('greenery')},
  {name: 'public space', label: i18n('publicSpace')},
  {name: 'domestic', label: i18n('domestic')},
  {name: 'recreation', label: i18n('recreation')},
  {name: 'help', label: i18n('help')},
  {name: 'art', label: i18n('art')},
  {name: 'business', label: i18n('business')},
  {name: 'other', label: i18n('other')}
]
