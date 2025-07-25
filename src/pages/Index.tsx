import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, MessageSquare, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SentimentAI
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced IMDB-trained sentiment analysis powered by deep learning. 
            Analyze movie reviews and text sentiment with state-of-the-art accuracy.
          </p>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-full font-semibold"
            >
              <Link to="/sentiment-analysis">
                <MessageSquare className="mr-2 h-5 w-5" />
                Try Sentiment Analysis
              </Link>
            </Button>
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-primary animate-pulse" />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <Brain className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Deep Learning Model</CardTitle>
              <CardDescription>
                Trained on IMDB dataset with advanced RNN architecture for accurate sentiment classification
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Real-time Analysis</CardTitle>
              <CardDescription>
                Instant sentiment prediction with confidence scores and detailed emotional breakdown
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Movie Review Focus</CardTitle>
              <CardDescription>
                Specifically optimized for movie reviews and entertainment content sentiment analysis
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Examples */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Try These Examples
            </CardTitle>
            <CardDescription>
              Test the sentiment analysis with these sample movie reviews
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-positive/10 border border-positive/20">
                <h4 className="font-semibold text-positive mb-2">Positive Example</h4>
                <p className="text-sm text-muted-foreground italic">
                  "This movie was absolutely fantastic! The acting was superb, 
                  the plot was engaging, and the cinematography was breathtaking. 
                  A masterpiece that I would definitely recommend to everyone."
                </p>
              </div>
              <div className="p-4 rounded-lg bg-negative/10 border border-negative/20">
                <h4 className="font-semibold text-negative mb-2">Negative Example</h4>
                <p className="text-sm text-muted-foreground italic">
                  "What a disappointing film. The story was confusing, 
                  the acting felt forced, and I was bored throughout most of it. 
                  Definitely not worth the time or money."
                </p>
              </div>
            </div>
            <div className="text-center pt-4">
              <Button variant="outline" asChild>
                <Link to="/sentiment-analysis">
                  Analyze Your Own Text →
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground">
            Built with TensorFlow/Keras • Trained on IMDB Dataset • 
            <span className="text-primary font-semibold"> Ready for Production</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;