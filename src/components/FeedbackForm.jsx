import { useState, useEffect } from 'react'
import Card from "./shered/Card"
import RatingSelect from './RatingSelect'
import Button from './shered/Button'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect (() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  },[feedbackEdit])

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChange = (e) => {
    const textValue = e.target.value;
    setText(e.target.value);
    if (textValue === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (textValue !== '' && textValue.trim().length <= 10) {
      setMessage('Text must be at least 10 characteres')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    
  }

  const handleSubmit = (e) => {
    if (text.trim().length > 10) {
      const newFeedback = {
        text, // = text: text
        rating,
      }
      if(feedbackEdit.edit === true){
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback);
      }
      
      setText('');
      e.preventDefault()
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className="input-group">
          <input onChange={handleTextChange} value={text} type="text" placeholder="Write a review"/>
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm