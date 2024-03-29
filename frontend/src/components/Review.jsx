import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import useFetch from "../hooks/useFetch"
import { useRecoilValue } from "recoil"
import Header from "./header/header"
import ReviewList from "./eachitem/reviewList"
import { user } from "../store/atom/user"
import WriteReview from "./review/writeReview"
import StarRatingScale from "./starRatingScale"
import StarRatingScaleCount from "./StarRatingScaleCount"
import { useParams } from "react-router-dom"
import { currentLocation } from "../store/atom/currentLocation"

function Review() {
  const userinfo = useRecoilValue(user)
  const locationInfo = useRecoilValue(currentLocation)
  const { location_id } = useParams() //해당 페이지 location id

  const { data } = useFetch(`/location/comment/${location_id}/`, null, {
    Authorization: `Bearer ${userinfo.accessToken}`,
  })

  const [reviewList, setReviewList] = useState([]) //현재 페이지와 location_id가 같은 데이터
  const [averageRatings, setAverageRatings] = useState({
    noise: 0,
    cleanness: 0,
    accessibility: 0,
    facility: 0,
    average: 0,
  })

  useEffect(() => {
    if (data !== null) {
      setReviewList(data.information)
    }
  }, [data])

  useEffect(() => {
    if (reviewList.length > 0) {
      const numReviews = reviewList.length
      const averageFields = [
        "noise",
        "cleanness",
        "accessibility",
        "facility",
        "average",
      ]
      const averages = {}

      averageFields.forEach(field => {
        const total = reviewList.reduce((acc, review) => acc + review[field], 0)
        averages[field] = total / numReviews
      })
      setAverageRatings(averages)
    }
  }, [reviewList])

  return (
    <ReviewContainer>
      <Header />
      <Title>{`${locationInfo.examAreaNm} 고사장 리뷰`}</Title>
      <Wrapper>
        <ScrollableContainer>
          <StarRate>
            <AverageRate>
              <StarRatingScaleCount
                scale="average"
                edit={false}
                value={averageRatings.average}
                reviewCount={reviewList.length}
              />
            </AverageRate>
            <DetailRate>
              <br />
              <StarRatingScale
                scale="noise"
                edit={false}
                value={averageRatings.noise}
              />
              <br />
              <StarRatingScale
                scale="cleanness"
                edit={false}
                value={averageRatings.cleanness}
              />
              <br />
              <StarRatingScale
                scale="accessibility"
                edit={false}
                value={averageRatings.accessibility}
              />
              <br />
              <StarRatingScale
                scale="facility"
                edit={false}
                value={averageRatings.facility}
              />
            </DetailRate>
          </StarRate>
          <EachReview>
            {reviewList.length > 0 ? (
              reviewList.map(write => (
                <ReviewList key={write.location_comment_id} eachWrite={write} />
              ))
            ) : (
              <Error>리뷰가 없습니다.</Error>
            )}
          </EachReview>
        </ScrollableContainer>
        <FixedContainer>
          <WriteReview />
        </FixedContainer>
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
  padding: 60px;
  overflow: hidden;
`

const StarRate = styled.div`
  margin-bottom: 100px;
`
const AverageRate = styled.div`
  position: relative;
  width: 670px;
  height: 90px;
  margin: 0 auto;

  margin-bottom: 30px;
  padding: 30px;
  padding-left: 45px;

  border-radius: 20px;
  border: 1px solid ${theme.colors.black};
`
const DetailRate = styled.div`
  position: relative;
  width: 670px;
  min-height: 275px;
  margin: 0 auto;

  margin-bottom: 30px;
  padding: 30px;

  border-radius: 20px;
  border: 1px solid ${theme.colors.black};
`
const EachReview = styled.div`
  border: none;
`

const Error = styled.div`
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.subtitle};
  font-weight: 600;
  line-height: 150%;

  white-space: pre-line;
  text-align: center;
`
