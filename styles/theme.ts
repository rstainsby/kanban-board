import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

const MyPreset = definePreset(Aura, {
    primitive: {
        borderRadius: {
            none: "0",
            xs: "2px",
            sm: "4px",
            md: "8px",
            lg: "16px",
            xl: "100px"
        },
        red: {
            50: "#fef7f7",
            100: "#fad6d6",
            200: "#f6b6b6",
            300: "#f29696",
            400: "#ee7575",
            500: "#ea5555",
            600: "#c74848",
            700: "#a43b3b",
            800: "#812f2f",
            900: "#5e2222",
            950: "#3b1515"
        },
        violet: {
            50: "#f7f7fc",
            100: "#dad9f2",
            200: "#bcbbe7",
            300: "#9f9cdc",
            400: "#817ed2",
            500: "#6460c7",
            600: "#5552a9",
            700: "#46438b",
            800: "#37356d",
            900: "#282650",
            950: "#191832"
        },
        purple: {
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#a855f7",
            600: "#9333ea",
            700: "#7e22ce",
            800: "#6b21a8",
            900: "#581c87",
            950: "#3b0764"
        },
        slate: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
            950: "#020617"
        },
        gray: {
            50: "#f4f4f5",
            100: "#cccccf",
            200: "#a4a4a9",
            300: "#7c7c83",
            400: "#53545d",
            500: "#2b2c37",
            600: "#25252f",
            700: "#1e1f27",
            800: "#18181e",
            900: "#111216",
            950: "#0b0b0e"
        }
    },
    semantic: {
        transitionDuration: "0.2s",
        focusRing: {
            width: "1px",
            style: "solid",
            color: "{primary.color}",
            offset: "2px",
            shadow: "none"
        },
        disabledOpacity: "0.6",
        iconSize: "1rem",
        anchorGutter: "2px",
        primary: {
            50: "#f7f7fc",
            100: "#dad9f2",
            200: "#bcbae7",
            300: "#9e9cdc",
            400: "#817dd2",
            500: "#635fc7",
            600: "#5451a9",
            700: "#45438b",
            800: "#36346d",
            900: "#282650",
            950: "#191832"
        },
        formField: {
            paddingX: "0.75rem",
            paddingY: "0.5rem",
            sm: {
                fontSize: "0.875rem",
                paddingX: "0.625rem",
                paddingY: "0.375rem"
            },
            lg: {
                fontSize: "1.125rem",
                paddingX: "0.875rem",
                paddingY: "0.625rem"
            },
            borderRadius: "{border.radius.sm}",
            focusRing: {
                width: "1px",
                style: "none",
                color: "{primary.color}",
                offset: "0",
                shadow: "none"
            },
            transitionDuration: "{transition.duration}"
        },
        list: {
            padding: "0.25rem 0.25rem",
            gap: "2px",
            header: {
                padding: "0.5rem 1rem 0.25rem 1rem"
            },
            option: {
                padding: "0.5rem 0.75rem",
                borderRadius: "{border.radius.sm}"
            },
            optionGroup: {
                padding: "0.5rem 0.75rem",
                fontWeight: "600"
            }
        },
        content: {
            borderRadius: "{border.radius.md}"
        },
        mask: {
            transitionDuration: "0.15s"
        },
        navigation: {
            list: {
                padding: "0.25rem 0.25rem",
                gap: "2px"
            },
            item: {
                padding: "0.5rem 0.75rem",
                borderRadius: "{border.radius.sm}",
                gap: "0.5rem"
            },
            submenuLabel: {
                padding: "0.5rem 0.75rem",
                fontWeight: "600"
            },
            submenuIcon: {
                size: "0.875rem"
            }
        },
        overlay: {
            select: {
                borderRadius: "{border.radius.md}",
                shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
            },
            popover: {
                borderRadius: "{border.radius.md}",
                padding: "0.75rem",
                shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
            },
            modal: {
                borderRadius: "{border.radius.xl}",
                padding: "1.25rem",
                shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
            },
            navigation: {
                shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
            }
        },
        colorScheme: {
            light: {
                surface: {
                    0: "{slate.0}",
                    50: "{slate.50}",
                    100: "{slate.100}",
                    200: "{slate.200}",
                    300: "{slate.300}",
                    400: "{slate.400}",
                    500: "{slate.500}",
                    600: "{slate.600}",
                    700: "{slate.700}",
                    800: "{slate.800}",
                    900: "{slate.900}",
                },
                page: {
                    background: "{surface.200}",
                },
                newColumn: {
                    borderColor: "{surface.300}",
                    hoverBackground: "{surface.50}",
                },
                content: {
                    background: "{surface.50}",
                    hoverBackground: "{surface.100}",
                    borderColor: "{surface.100}",
                    color: "{text.color}",
                    hoverColor: "{text.hover.color}"
                },
                overlay: {
                    select: {
                        background: "{surface.50}",
                        borderColor: "{surface.100}",
                        color: "{text.color}"
                    },
                    popover: {
                        background: "{surface.50}",
                        borderColor: "{surface.100}",
                        color: "{text.color}"
                    },
                    modal: {
                        background: "{surface.50}",
                        borderColor: "{surface.100}",
                        color: "{text.color}"
                    },
                    hightlight: {
                        background: "{surface.200}",
                    }
                },
                mask: {
                    background: "transparent",
                    color: "{surface.200}"
                },
            },
            dark: {
                surface: {
                    0: "#ffffff",
                    50: "#f5f5f6",
                    100: "#d1d1d5",
                    200: "#acacb3",
                    300: "#878891",
                    400: "#636370",
                    500: "#3e3f4e",
                    600: "#353642",
                    700: "#2b2c37",
                    800: "#22232b",
                    900: "#19191f",
                    950: "#101014"
                },
                primary: {
                    color: "{primary.400}",
                    contrastColor: "{surface.900}",
                    hoverColor: "{primary.300}",
                    activeColor: "{primary.200}"
                },
                highlight: {
                    background: "color-mix(in srgb, {primary.400}, transparent 84%)",
                    focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)"
                },
                page: {
                    background: "{surface.800}",
                },
                newColumn: {
                    borderColor: "{surface.300}",
                    hoverBackground: "{surface.700}",  
                },
                mask: {
                    background: "rgba(0,0,0,0.6)",
                    color: "{surface.200}"
                },
                formField: {
                    background: "{surface.950}",
                    disabledBackground: "{surface.700}",
                    filledBackground: "{surface.800}",
                    filledHoverBackground: "{surface.800}",
                    filledFocusBackground: "{surface.800}",
                    borderColor: "{surface.400}",
                    hoverBorderColor: "{surface.300}",
                    focusBorderColor: "{primary.color}",
                    invalidBorderColor: "{red.300}",
                    color: "{surface.600}",
                    disabledColor: "{surface.400}",
                    placeholderColor: "{surface.300}",
                    invalidPlaceholderColor: "{red.400}",
                    floatLabelColor: "{surface.400}",
                    floatLabelFocusColor: "{primary.color}",
                    floatLabelActiveColor: "{surface.400}",
                    floatLabelInvalidColor: "{form.field.invalid.placeholder.color}",
                    iconColor: "{surface.600}",
                    shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"
                },
                text: {
                    color: "{surface.0}",
                    hoverColor: "{surface.0}",
                    mutedColor: "{surface.400}",
                    hoverMutedColor: "{surface.300}"
                },
                content: {
                    background: "{surface.900}",
                    hoverBackground: "{surface.800}",
                    borderColor: "{surface.700}",
                    color: "{text.color}",
                    hoverColor: "{text.hover.color}"
                },
                overlay: {
                    select: {
                        background: "{surface.900}",
                        borderColor: "{surface.700}",
                        color: "{text.color}"
                    },
                    popover: {
                        background: "{surface.900}",
                        borderColor: "{surface.700}",
                        color: "{text.color}"
                    },
                    modal: {
                        background: "{surface.900}",
                        borderColor: "{surface.700}",
                        color: "{text.color}"
                    }
                },
                list: {
                    option: {
                        focusBackground: "{surface.800}",
                        selectedBackground: "{highlight.background}",
                        selectedFocusBackground: "{highlight.focus.background}",
                        color: "{text.color}",
                        focusColor: "{text.hover.color}",
                        selectedColor: "{highlight.color}",
                        selectedFocusColor: "{highlight.focus.color}",
                        icon: {
                            color: "{surface.500}",
                            focusColor: "{surface.400}"
                        }
                    },
                    optionGroup: {
                        background: "transparent",
                        color: "{text.muted.color}"
                    }
                },
                navigation: {
                    item: {
                        focusBackground: "{surface.800}",
                        activeBackground: "{surface.800}",
                        color: "{text.color}",
                        focusColor: "{text.hover.color}",
                        activeColor: "{text.hover.color}",
                        icon: {
                            color: "{surface.500}",
                            focusColor: "{surface.400}",
                            activeColor: "{surface.400}"
                        }
                    },
                    submenuLabel: {
                        background: "transparent",
                        color: "{text.muted.color}"
                    },
                    submenuIcon: {
                        color: "{surface.500}",
                        focusColor: "{surface.400}",
                        activeColor: "{surface.400}"
                    }
                }
            }
        }
    },
    components: {
        card: {
            root: {
                borderRadius: "{border.radius.md}",
            },
            body: {
                padding: "0",
            },
            colorScheme: {
                light: {
                    root: {
                        background: "{surface.50}",
                    }
                },
                dark: {
                    root: {
                        background: "{surface.600}",
                    }
                }
            }
        },
    }
});

export default MyPreset;
