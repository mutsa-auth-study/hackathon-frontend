import ReactShowMoreText from "react-show-more-text"
import "../../styles/showMoreText.css"

function ShowMoreText(props) {
  const { onMoreClick, content, size, expanded } = props
  return (
    <ReactShowMoreText
      lines={3}
      more="더보기"
      less="닫기"
      onClick={onMoreClick}
      expanded={expanded}
      truncatedEndingComponent={"... "}
      anchorClass="show-more-less-clickable"
      width={size}
    >
      {content}
    </ReactShowMoreText>
  )
}

export default ShowMoreText
