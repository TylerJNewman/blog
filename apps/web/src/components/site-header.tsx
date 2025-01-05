import { getTranslations } from 'next-intl/server'
import { HeaderContent } from './site-header-client'

export async function SiteHeader() {
  const t = await getTranslations('site')
  const blogT = await getTranslations('blog')

  return (
    <HeaderContent
      messages={{
        blog: t('words.blog'),
        categories: blogT('categories.title'),
        menu: t('words.menu'),
        toggleMenu: t('buttons.toggle_menu'),
        search: t('search.search'),
        noResultsFound: t('search.no_results_found'),
        searchPosts: t('search.search_posts'),
        typeCommandOrSearch: t('search.type_command_or_search'),
        themes: {
          dark: t('themes.dark'),
          theme: t('themes.theme'),
          light: t('themes.light'),
          system: t('themes.system'),
        },
      }}
    />
  )
}
