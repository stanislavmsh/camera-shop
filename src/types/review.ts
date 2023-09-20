export type TReview = {
  id: string;
  createAt: string;
} & TUserReview


export type TUserReview = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}
