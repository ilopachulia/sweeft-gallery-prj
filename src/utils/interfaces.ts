export interface Image {
    id: string;
    urls: {
      full: string;
    };
    alt_description: string;
  }
  
 export interface StatsProps {
    downloads: { total: number };
    views: { total: number };
    likes: { total: number };
  }