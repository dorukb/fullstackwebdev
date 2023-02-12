const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part desc={props.parts[0].name} exerciseCount = {props.parts[0].exercises}/>
      <Part desc={props.parts[1].name} exerciseCount = {props.parts[1].exercises}/>
      <Part desc={props.parts[2].name} exerciseCount = {props.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.desc} {props.exerciseCount}</p>
  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises: {props.parts.map(part => part.exercises).reduce(sumInt, 0)}</p>
  )
}

function sumInt(total, num) {
  return total + num;
}

export default App