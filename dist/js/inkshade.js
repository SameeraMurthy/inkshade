window.inkshade = {
    setTheme: (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        inkshade.saveAndUpdate(theme);
        return theme
    },
    smartTheme: (state) => {
        if (state.matches) {
            document.documentElement.setAttribute("data-theme", "dark");
            return "dark"
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            return "light"
        }
    },
    usePreferredTheme: () => {
        let media = window.matchMedia("(prefers-color-scheme: dark)")
        let theme = inkshade.smartTheme(media)
        inkshade.autoOn = true
        if (inkshade.autoOn) {
            media.addListener(inkshade.smartTheme)
        }
        inkshade.setTheme(theme);
        return theme
    },
    toggleTheme: () => {
        if (document.documentElement.getAttribute("data-theme") !== "dark") {
            inkshade.setTheme("dark");
        } else {
            inkshade.setTheme("light");
        }
    },
    saveAndUpdate: (theme) => {
        localStorage.setItem("data-theme", theme);
        let update = document.querySelectorAll("[data-theme-switch]")
        if (localStorage.getItem("data-theme") === "dark") {
            for (let i in update) {
                update[i].checked = true;
            }
        }
    },
    autoOn: true
}

inkshade.setTheme(localStorage.getItem("data-theme"))