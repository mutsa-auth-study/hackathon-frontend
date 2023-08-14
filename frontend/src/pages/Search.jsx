import React, { useEffect, useState } from "react"
import { styled, css } from "styled-components"
import useFetch from "../hooks/useFetch"
import theme from "../styles/Theme"
import Header from "../components/header/header"
import ExamList from "../components/eachitem/examList"
import useCSPagination from "../hooks/useCSPagination"

function Recommend(props) {
  const { data, loading, error } = useFetch("/exam/searchlist")

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

  if (!categoriesData) {
    return <div>Loading...</div>
  }
  const handleSearch = () => {
    // 검색어 입력 후 검색 버튼을 클릭했을 때 실행
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
        {curPageItem.length > 0 &&
          curPageItem
            .filter(exam => {
              return (
                (!selectedCategory ||
                  selectedCategories.includes(exam.obligfldnm)) &&
                (searchTerm === "" || exam.jmfldnm.includes(searchTerm))
              )
            })
            .map(exam => <ExamList key={exam.exam_id} eachExam={exam} />)}
        {renderCSPagination()}
      </Exam>
    </RecommendContainer>
  )
}

export default Recommend

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
