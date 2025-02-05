const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-screen">
      <h1 className="text-4xl font-bold text-primary mb-6">Home</h1>



      <div >
        <p className="text-center text-9xl text-primary font-bold underline decoration-tertiary"> TellTail</p>
      </div>

      <div className="border-8 border-orange-200 rounded-3xl p-8 mt-4 flex flex-col items-center font-semibold">
        <p className="text-4xl">Identify Your Pets</p>

        <ul className="text-4xl mt-4 text-center">
          <li>Quickly</li>
          <li>Easily</li>
          <li>Anywhere</li>
        </ul>
      </div>

      <div className="flex justify-between mt-12">
        <div className="w-1/2 p-4 border-4 border-tertiary rounded-lg mr-2">
          <h2 className="text-2xl font-bold mb-4">Easily Identify Your Pets</h2>
          <p>Upload a picture and get results</p>
        </div>
        <div className="w-1/2 p-4 border-4 border-tertiary rounded-lg ml-2">
          <h2 className="text-2xl font-bold mb-4">Access Anywhere</h2>
          <p>Find out more about your pet anywhere with our offline access</p>
        </div>
      </div>



    </div>

  )
}

export default Home
