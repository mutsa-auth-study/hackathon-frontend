import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { useSetRecoilState } from "recoil"
import { reviewModal } from "../../store/selector/reviewModal"
import StarRating from "./../starRating/starRating"
import { request } from "../../utils/axios"
import moment from "moment/moment"

function WriteList({ eachWrite }) {
  const setIndex = useSetRecoilState(reviewModal)

  // 리뷰 삭제
  const deleteReview = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await request("delete", "/location/comment", {
          user_id: eachWrite.user_id,
          location_id: eachWrite.location_id,
        })
        console.log(response)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <WriteListContainer>
      <UserId>{`jinokim98`}</UserId>
      <StarRatingContainer>
        <StarRating edit={false} value={eachWrite.average} />
      </StarRatingContainer>
      <Content>
        <InnerClamp>{eachWrite.content}</InnerClamp>
      </Content>
      <MoreButton>...더보기</MoreButton>
      <CreatedAt>{moment(eachWrite.created_at).format("YYYY-MM-DD")}</CreatedAt>
      <ButtonContainer>
        <UpdateButton onClick={() => setIndex(eachWrite.location_comment_id)}>
          수정
        </UpdateButton>
        {` / `}
        <DeleteButton onClick={deleteReview}>삭제</DeleteButton>
      </ButtonContainer>
    </WriteListContainer>
  )
}

export default WriteList

const WriteListContainer = styled.div`
  position: relative;
  width: 670px;
  height: 250px;
  margin: 0 auto;

  margin-bottom: 30px;
  padding: 30px;

  border-radius: 20px;
  border: 1px solid ${theme.colors.black};
`

const UserId = styled.div`
  margin-bottom: 15px;
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 300;
`

const Content = styled.div`
  width: 430px;
  height: 60px;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
`

const StarRatingContainer = styled.div`
  display: flex;
  position: relative;
  width: 50%;
  margin-bottom: 30px;
`

const InnerClamp = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

const MoreButton = styled.button`
  width: 50px;
  height: 24px;
  margin-top: 15px;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`

const CreatedAt = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;

  color: ${theme.colors.grayDesc};
  font-size: ${theme.fontSizes.writedesc};
  font-family: "Pretendard";
  font-weight: 300;
`

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  right: 30px;

  color: ${theme.colors.grayDesc};
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.writedesc};
`

const UpdateButton = styled.button`
  width: 40px;
  height: 20px;

  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`

const DeleteButton = styled.button`
  width: 40px;
  height: 20px;

  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`
