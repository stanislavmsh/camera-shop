import { TCamera } from '../../types/camera';
import { TReview } from '../../types/review';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';


export const getCurrentInfo = (state: State): TCamera | undefined => state[NameSpace.Current].currentInfo;
export const getSimiralCameras = (state: State): TCamera[] => state[NameSpace.Current].similarCameras;
export const getCurrentReviews = (state: State): TReview[] => state[NameSpace.Current].reviews;
