import CategoryBox from "../util/CategoryBox"

function EachCategory({ category, categoryClick }) {
  const onChange = checked => {
    categoryClick(category.name, checked)
  }
  return (
    <CategoryBox
      id={category.name}
      name={category.name}
      checked={category.isChecked}
      onChange={onChange}
    >
      #{category.name}
    </CategoryBox>
  )
}

export default EachCategory
