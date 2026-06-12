export interface PortfolioData {
  name: string;
  title: string;
  imagePath: string;
  resumeUrl: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    instagram?: string;
  };
  skills: string[];
}

export const portfolioData: PortfolioData = {
  name: "Sudharshan N",
  title: "Full Stack Developer",
  imagePath: "/Images/profile.jpeg",
  resumeUrl: "https://drive.google.com/file/d/1a3p7-eNpxSNbBtOQ5wAD2UhTTkkS3Gsk/view?usp=drive_link",
  email: "its.sudharshan.in@gmail.com",
  socials: {
    github: "https://github.com/its-sudharshan-45",
    linkedin: "https://www.linkedin.com/in/sudharshan45/",
    instagram: "https://www.instagram.com/___.kit__kat.____/?hl=en",
  },
  skills: [
    "HTML",
    "CSS",
    "Javascript",
    "React.js",
    "Bootstrap",
    "Java",
    "Python",
    "Artificial Intelligence"
  ]
};
