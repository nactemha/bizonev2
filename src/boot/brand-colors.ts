// src/boot/brand-colors.js - or any other name

import { setCssVar } from 'quasar'
import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'

export default boot(() => {
  const brand_colors = Cookies.get('brand_colors')
  console.log("brandcolorjson" + brand_colors);

  if (brand_colors != null) {
    setCssVar('primary', brand_colors.primary)
    setCssVar('secondary', brand_colors.secondary)
    setCssVar('accent', brand_colors.accent)
    setCssVar('dark', brand_colors.dark)
    setCssVar('positive', brand_colors.positive)
    setCssVar('negative', brand_colors.negative)
    setCssVar('info', brand_colors.info)
    setCssVar('warning', brand_colors.warning)
  }

})

