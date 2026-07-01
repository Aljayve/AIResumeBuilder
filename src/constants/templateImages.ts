export const templateImageMap: Record<string, string> = {
    "ats-classic": "classic.png",
    "modern": "modern.png",
    "professional": "professional.png",
    "accessible": "classic.png",
    "creative": "creative.png",
    "technical": "technical.png",
    "header-band": "headerband.png",
    "inspired": "inspired.png",
    "plain": "plain.png",
    "versatile": "modern.png",
    "straightforward": "straightforward.png",
    "sidebar-right": "sidebarright.png",
    "sidebar-left": "sidebarleft.png",
};

export function getTemplateImageSrc(slug: string): string {
    const filename = templateImageMap[slug];
    return filename ? `/templates/${filename}` : "";
}
