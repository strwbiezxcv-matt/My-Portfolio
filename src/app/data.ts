import prsaImg from "../imports/1.png";
import easecoreImg from "../imports/2.png";
import icpepImg from "../imports/COE__25_.png";
import crestImg from "../imports/3.png";
import bulsuoneImg from "../imports/4.png";
import bulsuEngImg from "../imports/5.png";
import mhcImg from "../imports/6.png";
import dhevcImg from "../imports/7.png";
import cert2Img from "../imports/cert-2.jpg";
import visualProgrammingCertImg from "../imports/Visual Programming and APK Development Certificate.jpg";
import codeToCareerCertImg from "../imports/code to career.png";
import likhAsenyocertImg from "../imports/LIKHASENYO CERT.png";
import pubmat1 from "../imports/mhc_achievers_(1).png";
import pubmat2 from "../imports/cpe_achievers_(27).png";
import pubmat3 from "../imports/medal_(3).png";
import pubmat4 from "../imports/566233249_1232512482016657_5023862266293251196_n.png";
import pubmat5 from "../imports/ANGARA_ATHLETES_(5).png";
import pubmat6 from "../imports/ICEPEP_PUBMATS_(4).png";
import pubmat7 from "../imports/PUBMATS_(38).png";
import pubmat8 from "../imports/PUBMATS_(19).png";
import pubmat9 from "../imports/ayos_lang..._(9).png";
import pubmat10 from "../imports/man_up_speak_up_(2).png";
import learnixImg from "../imports/learnix.png";
import womensMonthImg from "../imports/womens-month.png";
import infographicsImg from "../imports/infographics.png";
import salesTrainingCertImg from "../imports/sales-training-certificate.png";

/* PROJECTS (new stacked-card section)
   To add/edit a project: append an entry below. All fields except liveUrl/githubUrl are required;
   omit liveUrl/githubUrl when there is no link. */
export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    title: "TITLE",
    category: "Embedded Systems",
    description: "description",
    technologies: ["Arduino", "C++", "Proteus", "3D Modeling"],
    year: "2025",
  },
  {
    title: "TITLE",
    category: "QA & Web Testing",
    description: "description",
    technologies: ["Manual QA", "Responsive Testing", "Chrome DevTools"],
    year: "2026",
  },
  {
    title: "TITLE",
    category: "Web Development",
    description: "description",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    year: "2026",
    githubUrl: "https://github.com/strwbiezxcv-matt/My-Portfolio",
  },
  {
    title: "TITLE",
    category: "Brand & Identity",
    description: "description",
    technologies: ["Illustrator", "Brand Design", "Print"],
    year: "2025",
  },
  {
    title: "TITLE",
    category: "Graphic Design",
    description: "description",
    technologies: ["Photoshop", "Canva", "Social Media"],
    year: "2025",
  },
];

export const organizations = [
  { name: "Public Relation and Societal Affairs", image: prsaImg, blend: "multiply" as const },
  { name: "Easecore Software and IT Corp.", image: easecoreImg, blend: "multiply" as const },
  { name: "Institute of Computer Engineers of the Philippines - Student Edition", image: icpepImg, blend: "screen" as const },
  { name: "Office of the Vice President - Volunteers Network", image: crestImg, blend: "multiply" as const },
  { name: "BulSUONE Bustos", image: bulsuoneImg, blend: "multiply" as const },
  { name: "College of Engineering", image: bulsuEngImg, blend: "multiply" as const },
  { name: "Mental Health Coalition", image: mhcImg, blend: "multiply" as const },
  { name: "Double Headed Eagles Volunteers' Community", image: dhevcImg, blend: "screen" as const },
];

export const pubmats = [
  { title: "MHC Achievers", category: "Achievement", image: pubmat1 },
  { title: "All Souls' Day", category: "Faith", image: pubmat3 },
  { title: "CPE Achievers", category: "Academic Excellence", image: pubmat2 },
  { title: "Community Highlights", category: "Social Media", image: pubmat4 },
  { title: "Angara Athletes", category: "Sports", image: pubmat5 },
  { title: "ICEPEP Event", category: "Conference", image: pubmat6 },
  { title: "MHC Pantry", category: "Free Coffee", image: pubmat7 },
  { title: "Midterm Examination", category: "Good Luck Pubmat", image: pubmat8 },
  { title: "Nutrition Month", category: "Social", image: pubmat9 },
  { title: "Independence Day", category: "Holiday", image: pubmat10 },
  { title: "Learnix App Launch", category: "Technology", image: learnixImg },
  { title: "Women's Month Celebration", category: "Awareness", image: womensMonthImg },
  { title: "Infographics Collection", category: "Design", image: infographicsImg },
];

export const experience = [
  {
    company: "Easecore Software and IT Corp",
    role: "OJT Intern",
    period: "2026-2027",
    details: [
      "Hands-on experience in system testing, web development, and digital marketing.",
      "Applied creative design skills in developing marketing materials, social media content, and promotional campaigns.",
      "Combined technical expertise with creativity to deliver user-focused digital solutions and visually engaging content.",
    ],
  },
  {
    company: "Easecore Software and IT Corp",
    role: "Part-time Graphic Artist",
    period: "2026-2027",
    details: [
      "Assisted in designing and developing digital marketing materials.",
      "Managed social media content and platforms.",
      "Assisted in planning, managing, and monitoring advertising campaigns.",
    ],
  },
];

export const affiliations = [
  { role: "Media and Publication Officer", org: "BSCPE 2B – BSCPE 4B", period: "2024-2026" },
  { role: "OIC Chairperson", org: "Bachelor of Science in Computer Engineering", period: "2025-2026" },
  { role: "Public Relations Officer", org: "Double Headed Eagles Volunteers' Community (DHEVC)", period: "2025-2026" },
  { role: "Social Media Content Editor", org: "Institute of Computer Engineers of the Philippines – Student Edition", period: "2025-2026" },
  { role: "Chief of Creatives", org: "Mental Health Coalition – Bustos LSC (MHC)", period: "2025-2026" },
  { role: "Associate", org: "Public Relations and Societal Affairs Committee – Bustos LSC (PRSA)", period: "2025-2026" },
  { role: "COE Creatives", org: "College of Engineering – Bustos Campus", period: "2025-2026" },
  { role: "Social Media Manager", org: "College of Engineering – Bustos Campus", period: "2026-2027" },
  { role: "Vice Chairperson", org: "Sports and Athletic Development Committee", period: "2026-2027" },
  { role: "Media and Publication Head", org: "BULSUONE Bustos", period: "2026-2027" },
  { role: "Editor", org: "Mental Health Coalition – Bustos LSC (MHC)", period: "2026-2027" },
  { role: "Layout Artist", org: "BulSU SG – Office of the Vice President", period: "2026-2027" },
];

export const certificates = [
  {
    title: "Enterprise Resource Planning (ERP) System",
    category: "Enterprise Software",
    type: "Certificate",
    period: "2026-2027",
    description: "Hands-on training in configuring and managing ERP system modules for business operations.",
    image: "",
  },
  {
    title: "BusinessHub.PH System Quality Assurance",
    category: "Quality Assurance",
    type: "Certificate",
    period: "2026-2027",
    description: "End-to-end software testing and QA workflow certification for the BusinessHub.PH platform.",
    image: "",
  },
  {
    title: "Sales Training Conference",
    category: "Sales & Marketing",
    type: "Certificate",
    period: "2026-2027",
    description: "Training completion certificate from the Sales Training Conference, covering sales strategy and client engagement.",
    image: salesTrainingCertImg,
  },
];

export const seminars = [
  {
    title: "Visual Programming and APK Development: Bridging Creativity and Engineering Innovation",
    category: "Training",
    type: "Seminar / Talk",
    period: "Seminar",
    description: "Session bridging creative design with application development and engineering innovation.",
    image: visualProgrammingCertImg,
  },
  {
    title: "Code to Career: Mastering AI Development and Thriving in On-the-Job Training Evaluation",
    category: "Training",
    type: "Seminar / Talk",
    period: "Seminar",
    description: "Guidance on AI development skills and navigating on-the-job training evaluations.",
    image: codeToCareerCertImg,
    },
  {
    title: "Safety Officer 2 (SO2)",
    category: "Seminar",
    type: "Training / Certificate",
    period: "Training",
    description: "Certification as Safety Officer 2, covering workplace safety standards, risk assessment, and compliance.",
    image: cert2Img,
  },
  {
    title: "LikhAsenyo Creative Writing Fellowship",
    category: "Seminar",
    type: "Seminar / Talk",
    period: "Seminar",
    description: "Completion of the LikhAsenyo creative writing and literary arts program organized by the Bicolano Student Writers' Guild.",
    image: likhAsenyocertImg,
  },
];

/* CERTIFICATE IMAGE NOTE
   To add your own certificate thumbnail:
     1. Drop the image file into src/imports/ (e.g. src/imports/erp-cert.jpg).
     2. Import it at the top of this file after the existing imports, e.g.:
        import erpCert from "../imports/erp-cert.jpg";
     3. Set `image: erpCert` on the matching entry above.
   The card automatically shows a styled placeholder while `image` is empty.
*/