import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import Header from "../components/header/header"
import SearchWindow from "../components/util/searchWindow"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import search from "../store/atom/search"
import { request } from "../utils/axios"
import { Map, MapMarker } from "react-kakao-maps-sdk"
import LocationList from "./../components/eachitem/locationList"
import { currentLocationIndex } from "../store/atom/currentLocation"
import { Link } from "react-router-dom"
import { getSVGURL } from "./../utils/getSVGURL"
import { faMarker } from "@fortawesome/free-solid-svg-icons"
import useAlert from "../hooks/useAlert"
import { AlertMessage } from "../constants/AlertMessage"

const { kakao } = window

function Location(props) {
  const [map, setMap] = useState()

  const keyword = useRecoilValue(search)
  const resetKeyword = useResetRecoilState(search)

  const [locationList, setLocationList] = useState([])
  const [points, setPoints] = useState([])
  const [index, setIndex] = useRecoilState(currentLocationIndex)

  const alert = useAlert()

  // 장소를 검색
  const searchLocation = async () => {
    try {
      const latLng = await getAddress(keyword)

      const response = await request("post", "/location/", {
        latitude: latLng.latitude,
        longitude: latLng.longitude,
      })

      setLocationList(response.information)
      calculateCenter(map, response.information)
    } catch (error) {
      alert(AlertMessage.noLocationSearchResult)
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
          reject()
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

  // 페이지 이탈 시 키워드 초기화
  useEffect(() => {
    return () => {
      resetKeyword()
    }
  }, [resetKeyword])

  return (
    <LocationContainer>
      <Header />
      <Title>고사장 확인하기</Title>
      <Search>
        <SearchWindow />
      </Search>
      <SearchResult>
        <ResultList>
          <ResultTitle>
            {keyword !== ""
              ? `${keyword}와 가까운 고사장`
              : `장소를 검색하세요`}
          </ResultTitle>
          <ResultListContainer>
            {locationList &&
              locationList.map(location => (
                <StyledLink
                  to={`/location/${location.location_id}`}
                  key={location.location_id}
                >
                  <LocationList
                    key={location.location_id}
                    eachLocation={location}
                  />
                </StyledLink>
              ))}
          </ResultListContainer>
          <DistanceOrder>거리순</DistanceOrder>
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
                    image={{
                      src: getSVGURL(
                        faMarker,
                        index === point.location_id
                          ? theme.colors.primaryColor
                          : theme.colors.white,
                      ),
                      size: {
                        width: 30,
                        height: 30,
                      },
                    }}
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
  justify-content: flex-start;
  width: 80%;
  height: 106px;
  margin: 0 220px;
`

const SearchResult = styled.section`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
`

const ResultList = styled.div`
  position: relative;
  width: 51%;
  margin: 0 30px;
`
const DistanceOrder = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;

  top: 120px;
  right: 55px;

  width: 130px;
  height: 40px;
  border-radius: 8px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.search};
`

const ResultTitle = styled.h2`
  margin: 80px 0;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
`

const ResultListContainer = styled.div``

const MapContainer = styled.div`
  width: 710px;
  height: 850px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`
