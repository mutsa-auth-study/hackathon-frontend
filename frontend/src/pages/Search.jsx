import React, { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import Header from "../components/header/header"
import useFetch from "../hooks/useFetch"
import ExamList from "../components/eachitem/examList"
import useCSPagination from "../hooks/useCSPagination"
import useModalList from "../hooks/useModalList"
import { currentExamIndex, exam } from "../store/atom/exam"
import { examModal } from "../store/selector/examModal"
import ExamDetail from "../components/popup/examDetail"
import Loading from "../components/util/loading"
import theme from "../styles/Theme"
import { useRecoilValue } from "recoil"
import { user } from "../store/atom/user"
import useInput from "./../hooks/useInput"
import useCategory from "../hooks/useCategory"
import CategoryBox from "../components/util/CategoryBox"
import EachCategory from "../components/eachitem/category"
import { PAGESIZE } from "../constants/PageSize"

function Search() {
  const userinfo = useRecoilValue(user)
  const { data, loading, error } = useFetch(
    "/exam",
    { user_id: userinfo.user_id },
    {
      Authorization: `Bearer ${userinfo.accessToken}`,
    },
  )

  const [exams, setExams] = useState([])

  const [searchTerm, setSearchTerm] = useInput("") // 검색어
  const [categoriesData, setCategoriesData] = useState([]) // 카테고리 데이터

  const { curPageItem, renderCSPagination } = useCSPagination(
    categoriesData,
    PAGESIZE,
  )

  useEffect(() => {
    if (data) {
      setExams(data.information)
      setCategoriesData(exams)

      // 카테고리가 아니라 전체 데이터로 해야, 세부 카테고리를 눌렀을 때, 카테고리가 사라지지 않음
      const categories = data.information.reduce((categories, item) => {
        const existingCategory = categories.find(
          category => category.name === item.obligfldnm,
        )

        if (existingCategory) {
          existingCategory.items.push(item)
        } else {
          categories.push({
            name: item.obligfldnm,
            items: [item],
            isChecked: false,
          })
        }

        return categories
      }, [])

      setCategoryList(categories)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, exams])

  const { dataList, currentIndex } = useModalList(
    exam,
    examModal,
    currentExamIndex,
    curPageItem,
  )

  // 카테고리 전체 선택, 개별 선택 관리를 위해
  const {
    categoryList,
    setCategoryList,
    checkAll,
    checkAllHandler,
    checkHandler,
  } = useCategory([])

  // 카테고리를 선택할 때마다 카테고리 별 내용이 달라져야하기 때문
  useEffect(() => {
    // 카테코리 체크한 항목이 있으며, 검색어가 비어있지 않을 때
    if (
      categoryList.find(category => category.isChecked) !== undefined &&
      searchTerm.trim() !== ""
    ) {
      setCategoriesData(filterExam())

      // 카테코리 체크한 항목이 있으며, 검색어가 비어있을 때
    } else if (
      categoryList.find(category => category.isChecked) !== undefined &&
      searchTerm.trim() === ""
    ) {
      setCategoriesData(filterExam())

      // 카테코리 체크한 항목이 없으며, 검색어가 비어있지 않을 때
    } else if (
      categoryList.find(category => category.isChecked) === undefined &&
      searchTerm.trim() !== ""
    ) {
      setCategoriesData(searchResult())
      // 카테코리 체크한 항목이 없으며, 검색어가 비어있을 때
    } else {
      setCategoriesData(exams)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exams, categoryList, searchTerm])

  const detailModalRef = useRef(null)

  if (!categoriesData) {
    return <Loading />
  }

  // 카테코리 체크한 항목이 없으며, 검색어가 비어있지 않을 때 서칭하는 함수
  const searchResult = () => {
    return exams.filter(data => {
      const searchTermMatch = data.jmfldnm.includes(searchTerm.trim())
      return searchTermMatch
    })
  }

  // 카테고리 클릭할 때 해당 카테고리에 맞는 시험을 필터링한다
  const filterExam = () => {
    const selectedCategories = categoryList.filter(
      category => category.isChecked,
    )

    return exams.filter(data => {
      const categoryMatch = selectedCategories.some(
        category => category.name === data.obligfldnm,
      )
      const searchTermMatch = data.jmfldnm.includes(searchTerm.trim())

      return categoryMatch && searchTermMatch
    })
  }

  return (
    <SearchContainer>
      <Header />
      <Title>맞춤 검색</Title>
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <Error>시험이 없습니다</Error>
      ) : (
        <>
          <Serach>
            <Label>시험 과목명</Label>
            <SerachBox
              placeholder="시험명을 입력하세요."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </Serach>
          <Category>
            <CategoryBox
              id="전체"
              name="전체"
              checked={checkAll}
              onChange={checkAllHandler}
            />
            {categoryList.map(category => (
              <EachCategory
                key={category.name}
                category={category}
                categoryClick={checkHandler}
              />
            ))}
          </Category>
          <Exam>
            {dataList.length > 0 &&
              categoryList.length > 0 &&
              dataList.map(exam => (
                <ExamList
                  key={exam.exam_id}
                  eachExam={exam}
                  indexAtom={currentExamIndex}
                />
              ))}
            {renderCSPagination()}
            <ViewModal
              ref={detailModalRef}
              view={typeof currentIndex === "string" ? 1 : 0}
            >
              {dataList.map(
                (item, index) =>
                  item.modalOpen && (
                    <ExamDetail
                      key={`detail_exam${index}`}
                      exam={item}
                      indexAtom={currentExamIndex}
                    />
                  ),
              )}
            </ViewModal>
          </Exam>
        </>
      )}
    </SearchContainer>
  )
}

export default Search

const SearchContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`

const Title = styled.h2`
  margin: 80px 0;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
`
const Serach = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 50px;
  margin-bottom: 0;
`
const Label = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
  border: 1px solid #acb1c6;
  border-radius: 10px;
  padding: 30px;
  margin: 30px;
`
const SerachBox = styled.input`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: ${theme.fontSizes.subtitle};
  border: 1px solid #acb1c6;
  border-radius: 20px;
  width: 60vw;
  padding: 30px;
  margin: 30px;
`

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin-left: 350px;
  margin-bottom: 50px;
`

const Exam = styled.div`
  width: 1287px;
  margin: 0 auto;
`

const Error = styled.div`
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.subtitle};
  font-weight: 600;
  line-height: 150%;

  white-space: pre-line;
  text-align: center;
`

const ViewModal = styled.div`
  display: ${props => (props.view ? "block" : "none")};
  position: fixed;

  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`
