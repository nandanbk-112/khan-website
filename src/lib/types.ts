export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string; // YouTube, Vimeo, or /uploads/video.mp4
  thumbnailUrl?: string; // Optional thumbnail image
  duration?: string; // e.g. "18:45"
}

export interface CareerItem {
  id: string;
  period: string;
  position: string;
  company: string;
  businessType: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ProfileData {
  name: string;
  profession: string;
  tagline: string;
  profilePhoto: string;
  stats: StatItem[];
  about: {
    badge: string;
    sectionTitle: string;
    bio: string;
    profession: string;
    company: string;
    industry: string;
    experience: string;
    location: string;
  };
  career: CareerItem[];
  annualIncome: {
    show: boolean;
    amount: string;
    note: string;
  };
  gallery: GalleryItem[];
  videos: VideoItem[];
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    x: string;
    youtube: string;
    website: string;
  };
  adminPasscode?: string;
}

export const defaultProfileData: ProfileData = {
  name: "Tariq Khan",
  profession: "Entrepreneur & Managing Partner",
  tagline: "Pioneering high-growth enterprise solutions, strategic venture capital, and cross-border tech investments.",
  profilePhoto: "/images/profile.jpg",
  stats: [
    { id: "s1", value: "18+ Yrs", label: "LEADERSHIP" },
    { id: "s2", value: "$120M+", label: "ASSETS MANAGED" },
    { id: "s3", value: "Global", label: "INVESTMENTS" }
  ],
  about: {
    badge: "Executive Summary",
    sectionTitle: "About & Overview",
    bio: "Tariq Khan is a seasoned entrepreneur, investor, and strategic advisor with over 18 years of experience scaling technology and capital operations across global markets. Known for his disciplined leadership and vision, Tariq specializes in building high-performing leadership teams, driving institutional governance, and executing cross-border venture investments.\n\nHe currently directs a diverse portfolio of companies spanning software infrastructure, financial services, and commercial real estate across EMEA and APAC regions. Tariq actively mentors next-generation tech founders and contributes to global economic advisory boards.",
    profession: "Managing Director & Venture Investor",
    company: "Khan Capital & Apex Global Ventures",
    industry: "Enterprise SaaS, Fintech & Private Equity",
    experience: "18+ Years",
    location: "London, UK & Dubai, UAE"
  },
  career: [
    {
      id: "1",
      period: "2021 – Present",
      position: "Founder & General Partner",
      company: "Apex Global Ventures",
      businessType: "Venture Capital & Private Equity",
      description: "Oversees $120M+ in active assets under management focusing on Series A & B enterprise SaaS, infrastructure security, and fintech scale-ups across Europe and the Middle East."
    },
    {
      id: "2",
      period: "2016 – 2021",
      position: "Chief Executive Officer",
      company: "K-Tech Global Platforms",
      businessType: "Enterprise Software & Cloud Systems",
      description: "Led company from early-stage traction to a successful strategic acquisition, achieving 840% ARR growth and expanding team across 6 international hubs."
    },
    {
      id: "3",
      period: "2011 – 2016",
      position: "Senior Director of Strategy",
      company: "Vanguard Financial Group",
      businessType: "Corporate Advisory & Asset Management",
      description: "Advised Fortune 500 leadership teams on digital transformation, cross-border M&A strategies, and capital allocation frameworks."
    },
    {
      id: "4",
      period: "2007 – 2011",
      position: "Lead Architect & Product Director",
      company: "Horizon Innovations",
      businessType: "Technology Consulting",
      description: "Spearheaded distributed system architectures and cloud infrastructure deployment for tier-1 financial and telecommunications institutions."
    }
  ],
  annualIncome: {
    show: true,
    amount: "$4.5M+ USD",
    note: "Information provided by the profile owner."
  },
  gallery: [
    {
      id: "g1",
      url: "/images/keynote.jpg",
      title: "Global Leadership Summit",
      category: "Keynote & Speaking",
      description: "Delivering the opening keynote on emerging technology ventures at the International Executive Forum."
    },
    {
      id: "g2",
      url: "/images/boardroom.jpg",
      title: "Strategic Boardroom Meeting",
      category: "Governance & Strategy",
      description: "Chairing the quarterly portfolio review meeting with institutional investment partners."
    },
    {
      id: "g3",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      title: "Corporate Headquarters",
      category: "Architecture",
      description: "The modern architectural headquarters of Apex Global Ventures in London."
    },
    {
      id: "g4",
      url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      title: "Executive Advisory Session",
      category: "Mentorship",
      description: "Engaging in private strategic advisory with high-growth startup founders."
    },
    {
      id: "g5",
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      title: "Innovation Hub Tour",
      category: "Technology",
      description: "Inspecting the new AI & Cloud Research Lab infrastructure."
    },
    {
      id: "g6",
      url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
      title: "Private Investor Forum",
      category: "Venture Capital",
      description: "Hosting closed-door venture partner discussions on cross-border growth funding."
    }
  ],
  videos: [
    {
      id: "v1",
      title: "Keynote Address: Scaling Enterprise Ventures Globally",
      category: "Keynote Speech",
      description: "Delivered at the World Executive Summit. Discusses market expansion, cross-border investments, and leadership resilience.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample YouTube embed
      thumbnailUrl: "/images/keynote.jpg",
      duration: "24:15"
    },
    {
      id: "v2",
      title: "Executive Panel: Future of AI & Financial Infrastructure",
      category: "Panel Discussion",
      description: "A panel discussion on institutional AI adoption, cloud governance, and capital allocation strategy.",
      videoUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
      thumbnailUrl: "/images/boardroom.jpg",
      duration: "38:40"
    },
    {
      id: "v3",
      title: "Fireside Chat: Venture Capital Insights & Founder Advisory",
      category: "Fireside Chat",
      description: "An intimate conversation sharing key principles for early-stage venture funding and scaling operations.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
      duration: "19:10"
    }
  ],
  contact: {
    phone: "+44 20 7946 0912",
    email: "contact@tariqkhan.com",
    address: "Level 38, The Shard, 32 London Bridge St, London SE1 9SG, UK",
    whatsapp: "+447911123456"
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    youtube: "https://youtube.com",
    website: "https://tariqkhan.com"
  },
  adminPasscode: "admin123"
};
