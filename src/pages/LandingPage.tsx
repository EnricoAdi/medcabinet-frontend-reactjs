import React from 'react'
import { Link } from 'react-router-dom';

function MainContent() {
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="flex justify-center items-center mb-8">
        <img
          src="favicon.ico"
          alt="Medcabinet logo"
          className="w-48 h-48 rounded-full object-cover"
        />
      </section>
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Refill Prescriptions & Order Medications Easily</h2>
        <p className="text-gray-700 leading-loose">
          Medcabinet makes managing your prescriptions and ordering medications simple and convenient.  Refill your prescriptions with a few clicks, browse our extensive medication catalog, and get everything delivered straight to your door.
        </p>
        <Link to="/login"
          className="bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-500 font-bold inline-block">
          Get Started Today
        </Link>
      </section>
    </main>
  );
}
const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen h-full">
      
      <div className="bg-sky-400 text-white p-4 flex justify-center">
        <h1 className="text-3xl font-bold">Medcabinet</h1>
        <p className="text-lg ml-2">Your one-stop shop for all your pharmacy needs</p>
      </div>
      <MainContent /> 
    </div>
  )
}

export default LandingPage