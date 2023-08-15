import React, { useEffect, useRef, useState } from "react"
import { styled, css } from "styled-components"
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
  const { curPageItem, renderCSPagination } = useCSPagination(exams, 1)

  const [searchTerm, setSearchTerm] = useState("")
  const [categoriesData, setCategoriesData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    if (data) {
      setExams(data.information)
      setCategoriesData(data)
    }
  }, [data])

  const { dataList, currentIndex } = useModalList(
    exam,
    examModal,
    currentExamIndex,
    curPageItem,
  )

  const detailModalRef = useRef(null)

  if (!categoriesData) {
    return <Loading />
  }
  const handleSearch = () => {
    setSelectedCategory(null)
  }
  const handleCategorySelect = category => {
    const isSelected = selectedCategories.includes(category)
    if (isSelected) {
      // 이미 선택된 카테고리면 선택 해제
      setSelectedCategories(selectedCategories.filter(cat => cat !== category))
    } else {
      // 선택되지 않은 카테고리면 선택
      setSelectedCategories([...selectedCategories, category])
    }
    setSelectedCategory(category)
  }

  const categories = categoriesData.information.reduce((categories, item) => {
    const existingCategory = categories.find(
      category => category.name === item.obligfldnm,
    )

    if (existingCategory) {
      existingCategory.items.push(item)
    } else {
      categories.push({
        name: item.obligfldnm,
        items: [item],
      })
    }

    return categories
  }, [])

  return (
    <RecommendContainer>
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <Error>시험이 없습니다</Error>
      ) : (
        <>
          <Header />
          <Title>맞춤 검색</Title>
          <Serach>
            <Label>시험 과목명</Label>
            <SerachBox
              placeholder="시험명을 입력하세요."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>
              <img
                src="/img/button.png"
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </Button>
          </Serach>
          <Category>
            <CategoryButton
              isSelected={selectedCategory === null}
              onClick={() => handleCategorySelect(null)}
            >
              전체
            </CategoryButton>
            {categories.map(category => (
              <div key={category.name}>
                <CategoryButton
                  isSelected={selectedCategories.includes(category.name)}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  #{category.name}
                </CategoryButton>
              </div>
            ))}
          </Category>
          <Exam>
            {dataList.length > 0 &&
              dataList
                .filter(exam => {
                  return (
                    (!selectedCategory ||
                      selectedCategories.includes(exam.obligfldnm)) &&
                    (searchTerm === "" || exam.jmfldnm.includes(searchTerm))
                  )
                })
                .map(exam => (
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
    </RecommendContainer>
  )
}

export default Search

const RecommendContainer = styled.div`
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
  width: ${theme.componentSize.maxWidth};
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
const Button = styled.button`
  margin: 30px;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`
const Category = styled.div`
  display: flex;
  width: ${theme.componentSize.maxWidth};
  margin-left: 350px;
  margin-bottom: 50px;
`
const CategoryButton = styled.button`
  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: #2090ff;
          color: #e3f1ff;
        `
      : css`
          background-color: #e3f1ff;
          color: #2090ff;
        `};
  font-family: "Pretendard";
  font-weight: 500;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
  border-radius: 10px;
  border: none;
  margin: 5px;
  padding: 20px;
  float: left;
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
