export interface ProfileConfig {
  name: string;
  nickname: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  primaryTitle: string;
  secondaryIdentity: string;
  roles: string[];
  education: {
    degree: string;
    branch: string;
    college: string;
    shortCollege: string;
    class12Year: string;
    collegeStartYear: string;
  };
  portrait: {
    /**
     * Path to your uploaded photograph. Drop your photo into /public/profile/profile.png
     * or update this path to any image in /public/
     */
    src: string;
    alt: string;
    fallbackInitials: string;
  };
  bio: {
    heroIntro: string;
    heroIntroMobile: string;
    aboutHeadline: string;
    aboutParagraph: string;
    motto: string;
  };
}

export const profileConfig: ProfileConfig = {
  name: "Vishwajeet Kumar Sahu",
  nickname: "Vishwajeet",
  heroHeadingLine1: "HI, I'M",
  heroHeadingLine2: "VISHWAJEET",
  primaryTitle: "Computer Science Engineering Student",
  secondaryIdentity: "Developer • Tech Explorer • AI Enthusiast",
  roles: [
    "CSE Student",
    "Developer",
    "Tech Explorer",
    "AI Enthusiast",
    "Cybersecurity Learner"
  ],
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science Engineering (CSE)",
    college: "Swami Vivekanand Institute of Engineering & Technology (SVIET), Chandigarh",
    shortCollege: "SVIET, Chandigarh",
    class12Year: "2024",
    collegeStartYear: "2026"
  },
  portrait: {
    src: "/profile/profile.png",
    alt: "Vishwajeet Kumar Sahu - Computer Science Engineering Student",
    fallbackInitials: "VS"
  },
  bio: {
    heroIntro: "A CSE student driven by coding, building useful products and exploring modern technology.",
    heroIntroMobile: "CSE student • Developer • Tech Explorer",
    aboutHeadline: "ABOUT ME",
    aboutParagraph: "I'm a Computer Science Engineering student who enjoys coding, exploring modern technologies and turning ideas into practical projects. I'm currently building my programming and development skills while exploring AI tools, web development and cybersecurity. I enjoy learning by building things, solving problems and experimenting with technologies that can be useful in the real world.",
    motto: "Learning. Building. Improving."
  }
};
