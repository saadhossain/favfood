import SubHeading from '@/app/components/shared/headings/SubHeading';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Support = () => {
  return (
    <div>
      <SubHeading heading={'Support'} />
      {/* //Main Page */}
      <section className="py-6 text-gray-900">
        <div className="flex gap-10 items-center">
          <div className="w-2/4 py-6 md:py-0 md:px-6">
            <h1 className="text-3xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">Start a conversation</p>
            <div className="space-y-4">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt />
                <span>23/A, North Easter State,<br/>New Jersey, USA.</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>(+1) 266 XXXX</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope />
                <span>care@favfood.com</span>
              </p>
            </div>
          </div>
          {/* //Form */}
          <form
            className="w-2/4">
            <div className=' mb-3'>
              <label htmlFor="name" className="block text-sm font-semibold">Full Name</label>
              <input type="text" name="name" id="name" placeholder="John Doe" className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-900 focus:outline-none" />
            </div>
            <div className=' mb-3'>
              <label htmlFor="email" className="block text-sm font-semibold">Email Address</label>
              <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-900 focus:outline-none" />
            </div>
            <div className=' mb-3'>
              <label htmlFor="message" className="block text-sm font-semibold">Your Message</label>
              <textarea name="message" id="message" placeholder="Enter the Message" className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-900 focus:outline-none">

              </textarea>
            </div>
            <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
              {/* {processing ? <Processing title={'Processing'} /> : 'Login'} */}
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Support