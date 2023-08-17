import MyProfile from "../components/mypage/myProfile"
import RecentlyInquire from "../components/mypage/recentlyInquire"
import Writing from "../components/mypage/writing"
import Favorites from "./../components/mypage/favorites"

export const TabContent = [
  { name: "내 프로필", title: "내 프로필 관리", content: <MyProfile /> },
  { name: "즐겨찾기 목록", title: "내 즐겨찾기", content: <Favorites /> },
  {
    name: "최근 조회 시험",
    title: "최근 조회한 시험",
    content: <RecentlyInquire />,
  },
  { name: "작성글 관리", title: "작성글 관리", content: <Writing /> },
]
