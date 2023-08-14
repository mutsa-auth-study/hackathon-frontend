import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import Header from "../components/header/header"
import SearchWindow from "../components/util/searchWindow"
import { useRecoilValue, useResetRecoilState } from "recoil"
import search from "../store/atom/search"
import { request } from "../utils/axios"
import { Map, MapMarker } from "react-kakao-maps-sdk"
import LocationList from "./../components/eachitem/locationList"
import { currentLocationIndex } from "../store/atom/currentLocation"

const { kakao } = window

function Location(props) {
  const [map, setMap] = useState()

  const keyword = useRecoilValue(search)
  const resetKeyword = useResetRecoilState(search)

  const [locationList, setLocationList] = useState([])
  const [points, setPoints] = useState([])
  const setIndex = useRecoilValue(currentLocationIndex)

  // 장소를 검색
  const searchLocation = async () => {
    try {
      const latLng = await getAddress(keyword)

      const response = await request("get", "/location", {
        latitude: latLng.latitude,
        longitude: latLng.longitude,
      })

      setLocationList(response.information)
      calculateCenter(map, response.information)
    } catch (error) {
      alert(error)
      resetKeyword()
    }
  }

  // 모든 마커가 지도 안에 들어오도록 설정
  const calculateCenter = (map, locationList) => {
    if (locationList.length <= 0) return

    const bounds = new kakao.maps.LatLngBounds()
    const newPoint = []

    locationList.forEach(location => {
      const { latitude, longitude, location_id } = location
      const point = new kakao.maps.LatLng(Number(latitude), Number(longitude))
      bounds.extend(point)
      newPoint.push({ latLng: point, location_id })
    })

    setPoints(newPoint)
    map.setBounds(bounds)
  }

  // 키워드에 대한 주소를 알아내는 함수
  const getAddress = async () => {
    const geocoder = new kakao.maps.services.Places()

    return new Promise((resolve, reject) => {
      const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve({ latitude: result[0].y, longitude: result[0].x })
        } else {
          reject(new Error("검색 결과가 없습니다."))
        }
      }
      geocoder.keywordSearch(keyword, callback)
    })
  }

  // 검색어가 없거나, 공백만 있을 때는 검색을 실행하지 않는다.
  useEffect(() => {
    if (keyword.trim() !== "") searchLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return (
    <LocationContainer>
      <Header />
      <Title>고사장 확인하기</Title>
      <Search>
        <SearchWindow />
      </Search>
      <SearchResult>
        <ResultList>
          <ResultTitle>{keyword}와 가까운 고사장</ResultTitle>
          <ResultListContainer>
            {locationList &&
              locationList.map(location => (
                <LocationList
                  key={location.location_id}
                  eachLocation={location}
                />
              ))}
          </ResultListContainer>
        </ResultList>
        <MapContainer>
          <Map
            center={{ lat: 37.550874837441, lng: 126.925554591431 }}
            style={{ width: "100%", height: "100%" }}
            onCreate={map => {
              setMap(map)
            }}
            zoomable={false}
          >
            {points.length > 0 && (
              <>
                {points.map(point => (
                  <MapMarker
                    key={point.location_id}
                    position={{
                      lat: point.latLng.getLat(),
                      lng: point.latLng.getLng(),
                    }}
                    onClick={() => setIndex(point.location_id)}
                  />
                ))}
              </>
            )}
          </Map>
        </MapContainer>
      </SearchResult>
    </LocationContainer>
  )
}

export default Location

const LocationContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`

const Title = styled.div`
  width: 100%;
  margin: 180px auto;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
`

const Search = styled.section`
  display: flex;
  justify-content: center;
  width: 1366px;
  height: 106px;
`

const SearchResult = styled.section`
  display: flex;
  justify-content: space-between;
  width: 1366px;
`

const ResultList = styled.div`
  width: 600px;
  margin: 0 30px;
`

const ResultTitle = styled.h2`
  margin: 80px 0;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
`

const ResultListContainer = styled.div``

const MapContainer = styled.div`
  width: 700px;
  height: 850px;
`
