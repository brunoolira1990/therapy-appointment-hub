
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="container-narrow py-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M4.18 4.18C2.8 5.6 2 7.7 2 10c0 5.5 4.5 10 10 10 2.3 0 4.4-.8 6-2.18" />
              <path d="M19.82 19.82C21.2 18.4 22 16.3 22 14c0-5.5-4.5-10-10-10-2.3 0-4.4.8-6 2.18" />
            </svg>
          </div>

          <h1 className="text-5xl font-bold mb-6">404</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button
            variant="primary"
            size="lg"
            icon={<Home size={18} />}
            iconPosition="left"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
