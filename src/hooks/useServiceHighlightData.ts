import { ServiceHighlightData } from '../types/service';

export function useServiceHighlightData(): ServiceHighlightData {
  // In a real application, this would fetch from an API
  return {
    date: "March 17, 2024",
    title: "A Message of Hope and Unity",
    description: "Pastor Johnson delivered a powerful sermon on community strength and the importance of standing together in faith. The service featured uplifting music from our choir and touching testimonials from congregation members.",
    images: [
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=600",
      "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?auto=format&fit=crop&w=600",
    ],
    keyPoints: [
      "The importance of unity in challenging times",
      "Building bridges across communities",
      "Supporting our youth through mentorship",
      "The power of collective prayer and worship"
    ],
    engagement: {
      attendance: 234,
      online: 156,
      comments: 45,
      reactions: 78
    }
  };
}