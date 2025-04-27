export interface Review {
  rating: number;
  title: string;
  content: string;
  created_at: string;
  helpful: number;
}

export type ReviewInformationProps = {
  reviews: Review[];
  companySlug: string;
};
