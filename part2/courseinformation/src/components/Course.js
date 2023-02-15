const Course = ({course}) => {
    return(
      <div>
        <Header course = {course.name} />
        <Content parts = {course.parts}></Content> 
        <Total parts = {course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  const Content = ({parts}) => {
    return (
      <div>
        { 
          parts.map(part => <Part key = {part.name} props = {part}></Part>)
        }
      </div> 
    )
  }
  
  const Part = ({props}) => {
    return (
      <p>{props.name} {props.exercises}</p> 
    )
  }
  
  const Total = (props) => {
    return (
      <h3>Total of {props.parts.map(part => part.exercises)
                                .reduce(sumInt, 0)} exercises</h3>
    )
  }
  
  function sumInt(total, num) {
    return total + num;
  }

  export default Course