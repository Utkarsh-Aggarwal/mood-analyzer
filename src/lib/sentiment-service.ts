import { pipeline } from '@huggingface/transformers';

// Configure for optimal performance
let sentimentPipeline: any = null;

export interface SentimentResult {
  label: string;
  score: number;
  confidence: number;
}

// Initialize the sentiment analysis pipeline
const initializePipeline = async () => {
  if (!sentimentPipeline) {
    console.log('Initializing sentiment analysis pipeline...');
    try {
      sentimentPipeline = await pipeline(
        'sentiment-analysis',
        'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
        {
          device: 'webgpu',
        }
      );
      console.log('Pipeline initialized successfully');
    } catch (error) {
      console.warn('WebGPU failed, falling back to CPU:', error);
      sentimentPipeline = await pipeline(
        'sentiment-analysis',
        'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
      );
    }
  }
  return sentimentPipeline;
};

export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
  try {
    const pipeline = await initializePipeline();
    const results = await pipeline(text);
    
    // The model returns an array of results
    const result = results[0];
    
    return {
      label: result.label,
      score: result.score,
      confidence: result.score // For most models, score is the confidence
    };
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw new Error('Failed to analyze sentiment');
  }
};

// Warm up the model by running a small prediction
export const warmUpModel = async () => {
  try {
    await analyzeSentiment('This is a test.');
    console.log('Model warmed up successfully');
  } catch (error) {
    console.warn('Model warm-up failed:', error);
  }
};