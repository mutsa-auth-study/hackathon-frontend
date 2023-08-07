import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { useSetRecoilState } from "recoil"
import { reviewModal } from "../../store/selector/reviewModal"

function WriteList({ eachWrite }) {
  const setIndex = useSetRecoilState(reviewModal)
  return (
    <WriteListContainer>
      <UserId>{`jinokim98`}</UserId>
      <StarRating>
        <Star icon={faStar} />
        <Star icon={faStar} />
        <Star icon={faStar} />
        <Star icon={faStar} />
        <Star icon={faStar} />
      </StarRating>
      <Content>
        <InnerClamp>{eachWrite.content}</InnerClamp>
      </Content>
      <MoreButton>...더보기</MoreButton>
      <CreatedAt>{eachWrite.created_at}</CreatedAt>
      <ButtonContainer>
        <UpdateButton onClick={() => setIndex(eachWrite.location_comment_id)}>
          수정
        </UpdateButton>
        {` / `}
        <DeleteButton>삭제</DeleteButton>
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

const StarRating = styled.div`
  display: flex;
  width: 50%;
  margin-bottom: 30px;
`

const Star = styled(FontAwesomeIcon)`
  margin-right: 8px;
  font-size: ${theme.fontSizes.paragraph};
`

const Content = styled.div`
  width: 430px;
  height: 60px;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
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
