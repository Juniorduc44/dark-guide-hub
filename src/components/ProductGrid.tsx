import { ProductCard } from "./ProductCard";

const products = [
  {
    title: "CCNA Complete Guide",
    description: "Cisco Certified Network Associate - comprehensive networking fundamentals and certification prep.",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    emoji: "🌐",
  },
  {
    title: "Microsoft Azure Portal – Beginner Guide",
    description: "Complete beginner guide to Microsoft Azure cloud services and portal navigation.",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    emoji: "☁️",
  },
  {
    title: "Ethical Hacking with Python",
    description: "Build your own hacking scripts and tools with Python from scratch. Beginner to practical guide.",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    emoji: "🐍🛡️",
  },
  {
    title: "Linux Interview Questions",
    description: "Beginner to Intermediate Linux interview preparation with real-world scenarios.",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop",
    emoji: "🐧",
  },
  {
    title: "Docker – Introduction",
    description: "Introduction and fundamentals of Docker containerization for modern development.",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=400&fit=crop",
    emoji: "🐳",
  },
  {
    title: "AWS Solutions Architect",
    description: "Quick guide for AWS Certified Solutions Architect exam preparation.",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop",
    emoji: "☁️",
  },
  {
    title: "Password Security Guide",
    description: "Complete and easy guide to password security best practices and implementation.",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    emoji: "🔐",
  },
  {
    title: "Machine Learning Quick Guide",
    description: "Complete quick guide to machine learning concepts, algorithms, and implementation.",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    emoji: "🤖",
  },
  {
    title: "Cyber Security Attacks",
    description: "Clear and interview-focused guide covering common cyber security attack vectors.",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    emoji: "🛡️",
  },
  {
    title: "Data Science Quick Guide",
    description: "Complete quick guide to data science fundamentals and practical applications.",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    emoji: "📊",
  },
  {
    title: "Docker Quick Notes",
    description: "Quick reference notes and guide for Docker commands and best practices.",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
    emoji: "🐳",
  },
  {
    title: "Basic Palo Alto Setup",
    description: "Step-by-step guide to basic Palo Alto firewall configuration and setup.",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&h=400&fit=crop",
    emoji: "🔥",
  },
];

export const ProductGrid = () => {
  return (
    <section id="products" className="py-20 relative">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">Premium PDF Guides</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expertly crafted guides to accelerate your IT career. Instant download after purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
