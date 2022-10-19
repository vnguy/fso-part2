const Course = ({course}) => 
<div>
  <Header course={course.name} />
  <Content parts={course.parts}/>
  <Total sum={course.parts.reduce((prev, curr)=> prev + curr.exercises, 0)} />
</div>

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part part={part} key={part.id}/>)}    
  </>

export default Course