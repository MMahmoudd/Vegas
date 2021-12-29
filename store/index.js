export const state = () => ({
  locales: ['en', 'ar'],
  locale: 'ar'
})

export const mutations = {
  SET_LANG(state, locale) {
      if (state.locales.includes(locale)) {
          state.locale = locale
      }
  }
}
