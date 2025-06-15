
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import HowToPlay from "./pages/HowToPlay";
import BackgroundTutorial from "./pages/BackgroundTutorial";
import NotFound from "./pages/NotFound";
import { useGameStore } from "./stores/gameStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Language wrapper component to handle language parameter
const LanguageWrapper = () => {
  const { lang } = useParams();
  const { setLanguage } = useGameStore();
  
  useEffect(() => {
    const supportedLanguages = ['en', 'zh', 'fr', 'es', 'ru'];
    if (lang && supportedLanguages.includes(lang)) {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);

  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route - redirect to English */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* Language-specific routes */}
          <Route path="/:lang" element={<LanguageWrapper />} />
          <Route path="/:lang/privacy" element={<Privacy />} />
          <Route path="/:lang/about" element={<About />} />
          <Route path="/:lang/how-to-play" element={<HowToPlay />} />
          <Route path="/:lang/background-tutorial" element={<BackgroundTutorial />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
