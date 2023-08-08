import ReactStars from "react-stars"
import React from "react"

// https://github.com/n49/react-stars

function StarRating(props) {
  const ratingChanged = newRating => {
    props.onChange(newRating)
  }
  console.log(props.edit)
  return (
    <ReactStars
      count={5}
      value={props.value}
      edit={props.edit}
      onChange={ratingChanged}
      size={30}
      half={true}
    />
  )
}

export default StarRating
