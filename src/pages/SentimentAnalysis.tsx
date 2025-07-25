import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowLeft, Loader2, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { analyzeSentiment } from "@/lib/sentiment-service";

interface SentimentResult {
  label: string;
  score: number;
  confidence: number;
}

const SentimentAnalysis = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    setIsAnalyzing(true);
    try {
      const sentimentResult = await analyzeSentiment(text);
      setResult(sentimentResult);
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Failed to analyze sentiment. Please try again.");
      console.error("Sentiment analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "positive":
        return "text-positive";
      case "negative":
        return "text-negative";
      default:
        return "text-neutral";
    }
  };

  const getSentimentIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "positive":
        return <TrendingUp className="h-5 w-5 text-positive" />;
      case "negative":
        return <TrendingDown className="h-5 w-5 text-negative" />;
      default:
        return <Sparkles className="h-5 w-5 text-neutral" />;
    }
  };

  const exampleTexts = [
    "This movie was absolutely fantastic! The acting was superb and the plot was engaging.",
    "What a disappointing film. The story was confusing and I was bored throughout.",
    "It was an okay movie. Not great, but not terrible either. Worth watching once."
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Sentiment Analysis
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Analyze the emotional tone of movie reviews and text using advanced AI
            </p>
          </div>
        </header>

        {/* Main Analysis Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Enter Text for Analysis
            </CardTitle>
            <CardDescription>
              Paste your movie review or any text to analyze its sentiment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Enter your movie review or text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="resize-none"
            />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {text.length} characters
              </span>
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text.trim()}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Sentiment
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getSentimentIcon(result.label)}
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getSentimentColor(result.label)} mb-2`}>
                  {result.label.toUpperCase()}
                </div>
                <div className="text-lg text-muted-foreground">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sentiment Score</span>
                    <span>{(result.score * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={result.score * 100} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Confidence Level</span>
                    <span>{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={result.confidence * 100} className="h-3" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <h4 className="font-semibold mb-2">Interpretation</h4>
                <p className="text-sm text-muted-foreground">
                  {result.label.toLowerCase() === "positive" 
                    ? "This text expresses positive sentiment, indicating satisfaction, joy, or approval."
                    : result.label.toLowerCase() === "negative"
                    ? "This text expresses negative sentiment, indicating dissatisfaction, sadness, or disapproval."
                    : "This text expresses neutral sentiment, indicating a balanced or indifferent tone."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Examples */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant">
          <CardHeader>
            <CardTitle>Quick Examples</CardTitle>
            <CardDescription>
              Try these sample texts to see the sentiment analysis in action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {exampleTexts.map((example, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-muted/30 border border-border/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setText(example)}
              >
                <p className="text-sm italic">"{example}"</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SentimentAnalysis;