import React from "react"

function Success(props: any) {
  const {success} = props;
  return (
    <div className="mt-5 text-center">
      <div className="alert alert-success" role="alert">
        {success} 
      </div>
    </div>
  )
}
export default Success;
