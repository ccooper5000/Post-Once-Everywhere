export interface ServiceHighlightData {
  date: string;
  title: string;
  description: string;
  images: string[];
  keyPoints: string[];
  engagement: {
    attendance: number;
    online: number;
    comments: number;
    reactions: number;
  };
}