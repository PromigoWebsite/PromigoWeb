export default function Main() {
    return (
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">About Us</h1>
  
        {/* Our Mission */}
        <div className="bg-[#6a8a92] text-white p-6 rounded-lg mb-8 shadow">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            molestie ultricies odio nec molestie. Fusce feugiat velit a velit
            blandit viverra. Praesent nec ante nec nulla accumsan, non dictum
            sapien laoreet.
          </p>
        </div>
  
        {/* Our Vision */}
        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 p-6 rounded-lg mb-8 shadow">
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <div className="flex flex-col space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
              molestie ultricies odio nec molestie. Fusce feugiat velit a velit
              blandit viverra. Praesent nec ante nec nulla accumsan, non dictum
              sapien laoreet.
            </p>
            <img
              src="/images/city.jpg"
              alt="City View"
              className="rounded-md w-full max-h-64 object-cover"
            />
          </div>
        </div>
  
        {/* Our Values */}
        <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8 shadow">
          <h2 className="text-2xl font-semibold mb-2 text-[#6a8a92]">Our Values</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            molestie ultricies odio nec molestie. Fusce feugiat velit a velit
            blandit viverra. Praesent nec ante nec nulla accumsan.
          </p>
        </div>
  
        {/* Team Section */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="text-center">
              <img
                src="/images/person.jpg"
                alt="Team Member"
                className="w-28 h-36 object-cover rounded-md mx-auto mb-2"
              />
              <p className="font-medium">Human {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  