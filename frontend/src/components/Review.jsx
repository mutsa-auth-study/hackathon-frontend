import React, { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import useFetch from "../hooks/useFetch"
import { useRecoilValue } from "recoil"
import { currentLocation } from "../store/atom/currentLocation"
import Header from "./header/header"
import ReviewList from "./eachitem/reviewList"
import { user } from "../store/atom/user"

function Review() {
  const userinfo = useRecoilValue(user)
  const { data, loading, error } = useFetch(
    "/mypage/comment",
    { user_id: userinfo.user_id },
    {
      Authorization: `Bearer ${userinfo.accessToken}`,
    },
  )

  const [reviewDataList, setReviewDataList] = useState([]) // 전체 정보

  useEffect(() => {
    if (data) {
      setReviewDataList(data.information)
    }
  }, [data])

  return (
    <ReviewContainer>
      <Header />
      <Title>고사장 리뷰 보기</Title>
      <Wrapper>
        <ScrollableContainer>
          <StarRate>
            <AverageRate>평균</AverageRate>
            <DetailRate>상세 별점</DetailRate>
          </StarRate>
          <EachReview>
            {reviewDataList.length > 0 ? (
              reviewDataList.map(write => (
                <ReviewList key={write.location_comment_id} eachWrite={write} />
              ))
            ) : (
              <p>현재 작성된 리뷰가 없습니다</p>
            )}
          </EachReview>
        </ScrollableContainer>
        <FixedContainer>Fixed Content</FixedContainer>
      </Wrapper>
    </ReviewContainer>
  )
}

export default Review

const ReviewContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`

const Title = styled.div`
  margin: 80px 0;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
`

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

const ScrollableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`

const FixedContainer = styled.div`
  width: 50%;
  padding: 20px;
  background-color: #f0f0f0;
  overflow: hidden;
`

const StarRate = styled.div`
  height: 300px;
  border: solid 1px;
`
const AverageRate = styled.div`
  border: solid 1px;
  width: 80%;
  text-align: center;
`
const DetailRate = styled.div`
  border: solid 1px;
  width: 80%;
  text-align: center;
`
const EachReview = styled.div`
  border: none;
`
