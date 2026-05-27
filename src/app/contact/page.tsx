export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl font-serif mb-8 text-center">Contact Us</h1>
      <p className="text-center text-gray-500 font-light mb-16">
        For inquiries regarding collections, press, or personal styling.
      </p>

      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
            <input type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
            <input type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
          <input type="email" className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
          <textarea rows={6} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors resize-none"></textarea>
        </div>
        <button className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );
}
