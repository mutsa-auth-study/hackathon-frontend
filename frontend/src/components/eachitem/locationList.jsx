import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  currentLocation,
  currentLocationIndex,
} from "../../store/atom/currentLocation"

function LocationList({ eachLocation }) {
  const [currentIndex, setCurrentIndex] = useRecoilState(currentLocationIndex)
  const setLocation = useSetRecoilState(currentLocation)

  // detail page로 이동할 때 현재 선택한 location 정보를 리코일에 저장해둬야한다.
  const goDetailPage = location => {
    setCurrentIndex(eachLocation.location_id)
    setLocation(location)
  }

  return (
    <Container
      accent={eachLocation.location_id === currentIndex ? 1 : 0}
      onClick={() => goDetailPage(eachLocation)}
    >
      <LocationName>{eachLocation.examAreaNm}</LocationName>
      <LocationAddress>{eachLocation.address}</LocationAddress>
      <Distance>내 장소로부터 1km 떨어져있습니다.</Distance>
    </Container>
  )
}

export default LocationList

const Container = styled.div`
  width: 300px;
  height: 120px;
  margin-bottom: 10px;
  padding: 20px;

  background-color: ${props =>
    props.accent ? theme.colors.primaryColor : theme.colors.white};
  border-radius: 20px;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);

  color: ${props => (props.accent ? theme.colors.white : theme.colors.black)};

  &:hover {
    cursor: pointer;
  }
`

const LocationName = styled.p`
  margin-bottom: 14px;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.locationName};
`

const LocationAddress = styled.p`
  margin-bottom: 5px;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.locationAddress};
`

const Distance = styled.p`
  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.locationAddress};
`
