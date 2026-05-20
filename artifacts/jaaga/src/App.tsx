import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { ChatbotPopup } from "@/components/chatbot/chatbot-popup";

import HomePage from "@/pages/home";
import BlogsPage from "@/pages/blogs";
import BlogPostPage from "@/pages/blog-post";
import CategoryPage from "@/pages/category";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import ContactUsPage from "@/pages/contact-us";
import LoginPage from "@/pages/login";
import BlogEditorPage from "@/pages/blog-editor";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/blogs" component={BlogsPage} />
          <Route path="/blogs/editor" component={BlogEditorPage} />
          <Route path="/blogs/:slug" component={BlogPostPage} />
          <Route path="/blog/editor" component={BlogEditorPage} />
          <Route path="/category/:slug" component={CategoryPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/contact-us" component={ContactUsPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ChatbotPopup />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
