/**
 * Single source of truth for personal details, links and contact channels.
 * Every component reads from here — change a link once, it updates everywhere.
 */

const WHATSAPP_NUMBER = "2348160499031"; // +234 816 049 9031, international format without "+"

export const site = {
  name: "David Smart",
  role: "Full-Stack Software Developer",
  location: "Lagos, Nigeria",
  email: "bamideledavidsmart40@gmail.com",
  url: "https://davidsmart-portfolio-react.vercel.app/",
  education: {
    school: "Yaba College of Technology (YABATECH)",
    course: "Statistics",
    status: "Currently studying",
  },
  cv: {
    // Place the finalized PDF at /public/<file> — see README.
    file: "David-Smart-Full-Stack-Software-Developer-CV.pdf",
  },
};

export const links = {
  github: "https://github.com/davidgraphix",
  linkedin: "https://www.linkedin.com/in/david-smart-bamidele/",
  email: `mailto:${site.email}`,
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi David, I came across your portfolio and would like to talk about a project."
  )}`,
  whatsappDisplay: "+234 816 049 9031",
  cv: `${process.env.PUBLIC_URL || ""}/${site.cv.file}`,
};

export const navItems = [
  { id: "work", label: "Work" },
  { id: "engineering", label: "Engineering" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
];
