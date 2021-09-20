import React from "react"

function Error(props: any) {
  const {error} = props;
  
  return (

    <div className="mt-5 text-center">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>

  )
}
export default Error;
