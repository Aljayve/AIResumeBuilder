import { create } from "zustand";

interface SidebarState {
    isExpanded: boolean;
    isMobileOpen: boolean;
    isHovered: boolean;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    setIsHovered: (hovered: boolean) => void;
    initMobile: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
    isExpanded: true,
    isMobileOpen: false,
    isHovered: false,

    toggleSidebar: () => set((s) => ({ isExpanded: !s.isExpanded })),

    toggleMobileSidebar: () => set((s) => ({ isMobileOpen: !s.isMobileOpen })),

    setIsHovered: (hovered) => set({ isHovered: hovered }),

    initMobile: () => {
        const mobile = window.innerWidth < 768;
        if (mobile) {
            set({ isExpanded: false, isMobileOpen: false });
        }
    },
}));
