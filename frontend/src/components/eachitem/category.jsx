import CategoryBox from "../util/CategoryBox"

function EachCategory({ category, categoryClick }) {
  const onChange = checked => {
    categoryClick(
      category.name === "" ? "국가전문자격" : category.name,
      checked,
    )
  }
  return (
    <CategoryBox
      id={category.name === "" ? "국가전문자격" : category.name}
      name={category.name === "" ? "국가전문자격" : category.name}
      checked={category.isChecked}
      onChange={onChange}
    >
      #{category.name === "" ? "국가전문자격" : category.name}
    </CategoryBox>
  )
}

export default EachCategory
