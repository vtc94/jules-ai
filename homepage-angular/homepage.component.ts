import { Component, OnInit, AfterViewInit, HostListener, Renderer2 } from '@angular/core';

interface ElementConfig {
    headline: string;
    sub_headline: string;
    cta_primary: string;
    cta_secondary: string;
    background_color: string;
    surface_color: string;
    text_color: string;
    primary_action_color: string;
    secondary_action_color: string;
    font_family: string;
    font_size: number;
}

declare global {
    interface Window {
        elementSdk?: {
            init: (options: any) => void;
            setConfig: (config: any) => void;
        };
        lucide?: {
            createIcons: () => void;
        };
    }
}

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {
    menuOpen = false;
    openAccordions: Set<string> = new Set();
    isScrolled = false;
    isVideoPlayed = false;

    defaultConfig: ElementConfig = {
        headline: 'Master Your PTE Exam With Confidence',
        sub_headline: 'Practice every question type with instant AI scoring, detailed analytics, and thousands of real exam questions. Your path to PTE success starts here.',
        cta_primary: 'Claim 150 Free Tokens',
        cta_secondary: 'Practice Instantly — No Sign-Up',
        background_color: '#0f172a',
        surface_color: '#1e293b',
        text_color: '#ffffff',
        primary_action_color: '#38bdf8',
        secondary_action_color: '#94a3b8',
        font_family: 'Inter',
        font_size: 16
    };

    config: ElementConfig = { ...this.defaultConfig };

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
        this.initElementSdk();
    }

    ngAfterViewInit(): void {
        this.createLucideIcons();
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        this.isScrolled = window.scrollY > 20;
    }

    toggleAccordion(id: string): void {
        if (this.openAccordions.has(id)) {
            this.openAccordions.delete(id);
        } else {
            this.openAccordions.add(id);
        }
    }

    isAccordionOpen(id: string): boolean {
        return this.openAccordions.has(id);
    }

    playVideo(): void {
        this.isVideoPlayed = true;
    }

    private initElementSdk(): void {
        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig: this.defaultConfig,
                onConfigChange: async (config: Partial<ElementConfig>) => {
                    this.applyConfig(config);
                },
                mapToCapabilities: (config: ElementConfig) => ({
                    recolorables: [
                        { get: () => config.background_color || this.defaultConfig.background_color, set: (v: string) => { config.background_color = v; window.elementSdk?.setConfig({ background_color: v }); } },
                        { get: () => config.surface_color || this.defaultConfig.surface_color, set: (v: string) => { config.surface_color = v; window.elementSdk?.setConfig({ surface_color: v }); } },
                        { get: () => config.text_color || this.defaultConfig.text_color, set: (v: string) => { config.text_color = v; window.elementSdk?.setConfig({ text_color: v }); } },
                        { get: () => config.primary_action_color || this.defaultConfig.primary_action_color, set: (v: string) => { config.primary_action_color = v; window.elementSdk?.setConfig({ primary_action_color: v }); } },
                        { get: () => config.secondary_action_color || this.defaultConfig.secondary_action_color, set: (v: string) => { config.secondary_action_color = v; window.elementSdk?.setConfig({ secondary_action_color: v }); } },
                    ],
                    borderables: [],
                    fontEditable: {
                        get: () => config.font_family || this.defaultConfig.font_family,
                        set: (v: string) => { config.font_family = v; window.elementSdk?.setConfig({ font_family: v }); }
                    },
                    fontSizeable: {
                        get: () => config.font_size || this.defaultConfig.font_size,
                        set: (v: number) => { config.font_size = v; window.elementSdk?.setConfig({ font_size: v }); }
                    }
                }),
                mapToEditPanelValues: (config: ElementConfig) => new Map([
                    ['headline', config.headline || this.defaultConfig.headline],
                    ['sub_headline', config.sub_headline || this.defaultConfig.sub_headline],
                    ['cta_primary', config.cta_primary || this.defaultConfig.cta_primary],
                    ['cta_secondary', config.cta_secondary || this.defaultConfig.cta_secondary],
                ])
            });
        }
    }

    private applyConfig(config: Partial<ElementConfig>): void {
        this.config = {
            ...this.defaultConfig,
            ...config
        };

        const font = this.config.font_family || this.defaultConfig.font_family;
        this.renderer.setStyle(document.body, 'font-family', `${font}, system-ui, sans-serif`);
    }

    private createLucideIcons(): void {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}
