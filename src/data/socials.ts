export interface SocialConfig {
  github: string;
  linkedin: string;
  email: string;
}

/**
 * Real social profiles configuration.
 * If empty (""), the portfolio UI gracefully disables or hides the link,
 * preventing broken "#" jumps and preserving honesty.
 */
export const socialConfig: SocialConfig = {
  github: "https://github.com/kushal4747",
  linkedin: "https://www.linkedin.com/in/vishwajeet-kumar-sahu-b6ab892a4",
  email: "kushal040806@gmail.com",
};

export interface SocialItem {
  id: keyof SocialConfig;
  label: string;
  icon: string;
  url: string;
  isActive: boolean;
  hint: string;
}

export const getSocialItems = (): SocialItem[] => [
  {
    id: "github",
    label: "GitHub",
    icon: "Github",
    url: socialConfig.github,
    isActive: Boolean(socialConfig.github.trim()),
    hint: socialConfig.github.trim() ? "Explore Code Repositories" : "Profile Link Coming Soon"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "Linkedin",
    url: socialConfig.linkedin,
    isActive: Boolean(socialConfig.linkedin.trim()),
    hint: socialConfig.linkedin.trim() ? "Connect on LinkedIn" : "Profile Link Coming Soon"
  },
  {
    id: "email",
    label: "Email",
    icon: "Mail",
    url: socialConfig.email ? `mailto:${socialConfig.email}` : "",
    isActive: Boolean(socialConfig.email.trim()),
    hint: socialConfig.email.trim() ? "Direct Communication" : "Email Configurable"
  }
];
