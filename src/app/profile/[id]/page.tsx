import React from 'react'

const page = ({params} : any) => {
  console.log(params)
  return (
    <div>
      <div>{params.id}</div>
    </div>
  )
}

export default page
