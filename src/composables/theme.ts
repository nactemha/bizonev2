import { Cookies, setCssVar } from 'quasar'

export function useTheme() {
    const changeTheme = (theme: String) => {
        let brand_colors = {
            primary: "#35a2ff",
            secondary: "#014a88",
            accent: "#35a2ff",
            dark: "#014a88",
            positive: "#35a2ff",
            negative: "#35a2ff",
            info: "#35a2ff",
            warning: "#35a2ff"
        }
        if (theme == "blue") {
            brand_colors.primary = "#35a2ff";
            brand_colors.secondary = "#014a88";
            brand_colors.accent = "#35a2ff";
            brand_colors.dark = "#014a88";
            brand_colors.positive = "#35a2ff";
            brand_colors.negative = "#35a2ff";
            brand_colors.info = "#35a2ff";
            brand_colors.warning = "#35a2ff";
        } else if (theme == "red") {
            brand_colors.primary = "#ff0000";
            brand_colors.secondary = "#ff0000";
            brand_colors.accent = "#ff0000";
            brand_colors.dark = "#ff0000";
            brand_colors.positive = "#ff0000";
            brand_colors.negative = "#ff0000";
            brand_colors.info = "#ff0000";
            brand_colors.warning = "#ff0000";
        }
        let brand_colors_json = JSON.stringify(brand_colors)
        Cookies.set('brand_colors', brand_colors_json, { expires: 365 })

        setCssVar('primary', brand_colors.primary)
        setCssVar('secondary', brand_colors.secondary)
        setCssVar('accent', brand_colors.accent)
        setCssVar('dark', brand_colors.dark)
        setCssVar('positive', brand_colors.positive)
        setCssVar('negative', brand_colors.negative)
        setCssVar('info', brand_colors.info)
        setCssVar('warning', brand_colors.warning)

    }

    return { changeTheme }
}
