import React from "react";
import { Search, Briefcase, Users, Star, ArrowRight } from "lucide-react"
export default function Home() {
  return (
    <div >
      {/* Hero Section */}
      <section
        className="hero min-h-screen bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/Freelance Life 4.gif')" }}
      >
        <div className="hero-overlay bg-opacity-50 absolute inset-0"></div>

        <div className="hero-content text-center relative z-10">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Find Your Perfect Freelance Match
            </h1>
            <p className="py-6">
              Connect with top talent or find your next gig on Hustlr. We make
              it easy to collaborate, create, and succeed.
            </p>
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Hustlr?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Search className="w-12 h-12 text-primary" />
                <h3 className="card-title">Easy to Find Work</h3>
                <p>
                  Browse thousands of job listings tailored to your skills and
                  interests.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Users className="w-12 h-12 text-primary" />
                <h3 className="card-title">Top-Tier Talent</h3>
                <p>
                  Access a global pool of skilled professionals for your
                  projects.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Star className="w-12 h-12 text-primary" />
                <h3 className="card-title">Secure Payments</h3>
                <p>
                  Our escrow system ensures fair and timely payments for all
                  parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Freelance Journey?
          </h2>
          <p className="mb-8">
            Join thousands of freelancers and businesses already using
            FreelanceHub.
          </p>
          <Link to="/signup" className="btn btn-secondary">
            Create Your Account
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Create an Account",
              "Post or Find a Job",
              "Collaborate",
              "Get Paid",
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="rounded-full bg-primary text-primary-content w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-center">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p>Copyright © 2023 - All right reserved by Hustlr.pvt.ltd</p>
        </div>
      </footer>
    </div>
  );
}
