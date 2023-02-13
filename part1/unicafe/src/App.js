import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbacks = {
    good: {
      label: 'good',
      count: good,
      score: 1
    },
    neutral: {
      label: 'neutral',
      count: neutral,
      score: 0
    },
    bad: {
      label: 'bad',
      count: bad,
      score: -1
    }
  }
  return (
    <div>
      <Header title = "Give Feedback"></Header>
      <Button onClick={() => {setGood(good+1)}} label={feedbacks.good.label}/>
      <Button onClick={() => {setNeutral(neutral+1)}} label={feedbacks.neutral.label}/>
      <Button onClick={() => {setBad(bad+1)}} label={feedbacks.bad.label}/>
      <Header title = "Statistics"></Header>
      <Statistics feedbacks = {feedbacks}></Statistics>
    </div>
  )
}

const Button = ({onClick, label}) =>{
  return(
    <button onClick = {onClick}> {label} </button>
  )
}
const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

function sumDouble(total, num) {
  return total + num;
}

const Statistics = ({feedbacks}) => {
  const totalFeedbacks = Object.entries(feedbacks)
                                .map(([key, value]) => value.count)
                                .reduce(sumDouble, 0)

  if(totalFeedbacks == 0){
    return(
      <p>No feedback given.</p>
    )
  }

  const positiveFeedbacks = feedbacks.good.count
  const averageEntry = {
    count: Object.entries(feedbacks)
                  .map(([key, value]) => value.count * value.score)
                  .reduce(sumDouble, 0) / totalFeedbacks,
    label: 'average'
  } 

  const totalEntry = {
    count: totalFeedbacks,
    label: 'all: '
  }

  const positiveFeedbackEntry = {
    count: positiveFeedbacks * 100 / totalFeedbacks,
    label: 'positive'
  }

  return(
    <div> 

    <table>
      <tbody>
        <StatisticLine entry = {feedbacks.good}></StatisticLine>
        <StatisticLine entry = {feedbacks.neutral}></StatisticLine>
        <StatisticLine entry = {feedbacks.bad}></StatisticLine>
        <StatisticLine entry = {totalEntry}></StatisticLine>
        <StatisticLineFloat entry = {averageEntry}></StatisticLineFloat>
        <PercentageStatisticLine entry = {positiveFeedbackEntry}></PercentageStatisticLine>
      </tbody>
    </table>


    </div>
  )
}

const StatisticLine = ({entry}) => {
  return(
    <tr>  
      <td>{entry.label}</td>
      <td>{entry.count}</td> 
    </tr>
  )
}
  const StatisticLineFloat = ({entry}) => {
  return(
    <tr>  
      <td>{entry.label}</td>
      <td>{entry.count.toFixed(1)}</td> 
    </tr>
  )
}
const PercentageStatisticLine= ({entry}) => {
  return(
    <tr>  
      <td>{entry.label}</td>
      <td>{entry.count.toFixed(1)}%</td> 
    </tr>
  )
}

export default App