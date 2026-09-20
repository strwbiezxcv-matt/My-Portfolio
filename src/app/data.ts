import prsaImg from "../imports/1.png";
import easecoreImg from "../imports/2.png";
import icpepImg from "../imports/COE__25_.png";
import crestImg from "../imports/3.png";
import bulsuoneImg from "../imports/4.png";
import bulsuEngImg from "../imports/5.png";
import mhcImg from "../imports/6.png";
import dhevcImg from "../imports/7.png";
import cpe4bImg from "../imports/CPE4B.png";
import cert2Img from "../imports/cert-2.jpg";
import visualProgrammingCertImg from "../imports/Visual Programming and APK Development Certificate.jpg";
import codeToCareerCertImg from "../imports/code to career.png";
import likhAsenyocertImg from "../imports/LIKHASENYO CERT.png";
import pubmat1 from "../imports/mhc_achievers_(1).png";
import pubmat5 from "../imports/ANGARA_ATHLETES_(5).png";
import pubmat8 from "../imports/PUBMATS_(19).png";
import pubmat9 from "../imports/ayos_lang..._(9).png";
import pubmat10 from "../imports/man_up_speak_up_(2).png";
import thirdYearImg from "../imports/3RD YEAR.png";
import allSaintsDayImg from "../imports/ALL_SAINTS_DAY.png";
import independenceDayImg from "../imports/INDEPENDENCE DAY.png";
import suicideAwarenessImg from "../imports/SUICIDE_AWARENESS_MONTH.png";
import learnixImg from "../imports/Learnix.png";
import learnixProjectImg from "../imports/learnix_image.png";
import internixCapImg from "../imports/Internix.png";
import womensMonthImg from "../imports/womens-month.png";
import infographicsImg from "../imports/infographics.png";
import salesTrainingCertImg from "../imports/sales-training-certificate.png";
import mhcCertImg from "../imports/MHC CERT.png";
import prsaCertImg from "../imports/PRSA CERT.png";
import buildingWealthCertImg from "../imports/building-your-wealth-certificate.png";
import tinigCertImg from "../imports/tinig.png";

/* PROJECTS (new stacked-card section)
   To add/edit a project: append an entry below. Title, category, description, and technologies are required;
   omit liveUrl/githubUrl when there is no link. Optional labels override the default button text. */

export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  liveLabel?: string;
  githubLabel?: string;
  featured?: boolean;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  // ◼ FEATURED PROJECT — Learnix is shown first and is the active/front card by default.
  {
    title: "Learnix",
    category: "AI-Powered Learning Platform",
    description: "Learnix is an AI-powered learning and reviewer platform designed to help students transform their learning materials into organized reviewers, notes, quizzes, and examinations.",
    technologies: ["React", "TypeScript", "AI", "Supabase"],
    image: learnixImg,
    liveUrl: "https://learnix-29i44ukrq-matt-e31f.vercel.app",
    githubUrl: "https://github.com/strwbiezxcv-matt/Learnix.git",
    liveLabel: "LIVE",
    githubLabel: "GITHUB",
    featured: true,
  },
    // ◻ Internix — now live with Live/GitHub buttons wired up.
  {
    title: "Internix",
    category: "Internship Platform",
    description: "Internix is a platform designed to streamline the internship application and management process, helping students discover curated opportunities while enabling organizations to efficiently track and evaluate candidates.",
    technologies: ["React", "TypeScript", "Supabase"],
    image: internixCapImg,
    liveUrl: "https://internix-nine.vercel.app",
    githubUrl: "https://github.com/strwbiezxcv-matt/Internix.git",
    liveLabel: "LIVE",
    githubLabel: "GITHUB",
  },
];

export type OrgAffiliation = { role: string; period: string };

export const organizations: {
  name: string;
  image: string;
  blend: "multiply" | "screen" | "normal";
  /** Existing affiliations, grouped into the organization they belong to. */
  affiliations?: OrgAffiliation[];
}[] = [
  {
    name: "Public Relation and Societal Affairs Committee – Bustos LSC (PRSA)",
    image: prsaImg,
    blend: "multiply",
    affiliations: [{ role: "Associate", period: "2025-2026" }],
  },
  {
    name: "Easecore Software and IT Corp.",
    image: easecoreImg,
    blend: "multiply",
    affiliations: [{ role: "Part-time Graphic Artist", period: "2026-2027" }],
  },
  {
    name: "Institute of Computer Engineers of the Philippines – Student Edition (ICPEP)",
    image: icpepImg,
    blend: "normal",
    affiliations: [
      { role: "Social Media Content Editor", period: "2025-2026" },
      { role: "OIC Chairperson — BS Computer Engineering", period: "2025-2026" },
    ],
  },
  {
    name: "Office of the Vice President – Volunteers Network (BulSU SG)",
    image: crestImg,
    blend: "multiply",
    affiliations: [{ role: "Layout Artist", period: "2026-2027" }],
  },
  {
    name: "BULSUONE Bustos",
    image: bulsuoneImg,
    blend: "multiply",
    affiliations: [{ role: "Media and Publication Head", period: "2026-2027" }],
  },
  {
    name: "College of Engineering – Bustos Campus (COE)",
    image: bulsuEngImg,
    blend: "multiply",
    affiliations: [
      { role: "COE Creatives", period: "2025-2026" },
      { role: "Social Media Manager", period: "2026-2027" },
    ],
  },  {
    name: "Mental Health Coalition – Bustos LSC (MHC)",
    image: mhcImg,
    blend: "multiply",
    affiliations: [
      { role: "Chief of Creatives", period: "2025-2026" },
      { role: "Editor", period: "2026-2027" },
    ],
  },
  {
    name: "Double Headed Eagles Volunteers' Community (DHEVC)",
    image: dhevcImg,
    blend: "multiply",
    affiliations: [{ role: "Public Relations Officer", period: "2025-2026" }],
  },
  {
    name: "BSCPE 4B – Bachelor of Science in Computer Engineering",
    image: cpe4bImg,
    blend: "multiply",
    affiliations: [
      { role: "Media and Publication Officer — BSCPE 2B–3B", period: "2024-2025" },
      { role: "Media and Publication Officer — BSCPE 4B", period: "2025-2026" },
    ],
  },
];

export const pubmats = [
  { title: "MHC Achievers", category: "Achievement", image: pubmat1 },
  { title: "Angara Athletes", category: "Sports", image: pubmat5 },
  { title: "Midterm Examination", category: "Good Luck Pubmat", image: pubmat8 },
  { title: "Nutrition Month", category: "Social", image: pubmat9 },
  { title: "Independence Day", category: "Holiday", image: pubmat10 },
  { title: "Learnix App Launch", category: "Technology", image: learnixImg },
  { title: "Women's Month Celebration", category: "Awareness", image: womensMonthImg },
  { title: "Infographics Collection", category: "Design", image: infographicsImg },
  { title: "Achievers", category: "Design", image: thirdYearImg },
  { title: "All Saints Day", category: "Holiday", image: allSaintsDayImg },
  { title: "Independence Day", category: "Holiday", image: independenceDayImg },
  { title: "Suicide Awareness Month", category: "Awareness", image: suicideAwarenessImg },
];

export const experience = [
  {
    company: "Easecore Software and IT Corp",
    role: "Internship",
    period: "2026-2027",
    details: [
      "Hands-on experience in system testing, web development, and digital marketing.",
      "Applied creative design skills in developing marketing materials, social media content, and promotional campaigns.",
      "Combined technical expertise with creativity to deliver user-focused digital solutions and visually engaging content.",
    ],
  },
  {
    company: "Easecore Software and IT Corp",
    role: "Part-time - Graphic Artist / Creative Head",
    period: "2026-2027",
    details: [
      "Assisted in designing and developing digital marketing materials.",
      "Managed social media content and platforms.",
      "Assisted in planning, managing, and monitoring advertising campaigns.",
    ],
  },
  {
    company: "Bianzon 3Kings Aircon Repair, Cleaning, and Installation",
    role: "Part-time",
    period: "2020 – Present",
    details: [
      "Helps in assembling and installing equipment for cleaning aircons.",
      "Provides the necessary tools for relocation, recharging freon, and installation.",
      "Gained practical skills in troubleshooting electrical and mechanical systems.",
    ],
  },
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
    title: "Likhasenyo: Pagbuo. Kulay. Ideya. Simula ng pagpapanday.",
    category: "Seminar",
    type: "Seminar / Talk",
    period: "Seminar",
    description: "Completion of the Likhasenyo creative presentation and literary arts program organized by the PRSA Guild.",
    image: likhAsenyocertImg,
  },
  {
    title: "Mental Health Coalition (MHC) Certificate",
    category: "",
    type: "Training / Certificate",
    period: "Certificate",
    description: "Certificate of training and participation with the Mental Health Coalition (MHC).",
    image: mhcCertImg,
  },
   {
    title: "Building Your Wealth: A Wealth Management Webinar",
    category: "Webinar",
    type: "Seminar / Talk",
    period: "2026",
    description: "Certificate of participation in the Atsoca Learning Level-Up Training wealth management webinar \"Building Your Wealth\", held on August 30, 2026 via Zoom Cloud.",
    image: buildingWealthCertImg,
  },
  {
    title: "Public Relation and Societal Affairs (PRSA) Certificate",
    category: "",
    type: "Training / Certificate",
    period: "Certificate",
    description: "Certificate of training and participation with the Public Relation and Societal Affairs (PRSA) Committee.",
    image: prsaCertImg,
  },
  {
    title: "Tinig",
    category: "Certificate",
    type: "Certificate",
    period: "Certificate",
    description: "Certificate awarded for Tinig.",
    image: tinigCertImg,
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