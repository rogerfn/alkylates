import React from 'react'

const Unauthorized = () => {
  return (
    <div>
      <div className="p-5 bg-sphere " style={{ height: '100vh', backgroundSize: 'cover' }}>
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold f-white">Unauthorized</h1>
          <p className="  f-white text-center">You do not have the proper access to the tool</p>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
