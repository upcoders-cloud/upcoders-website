export default function Footer() {
  return (
    <footer className="bg-bg-2 text-gray-400 py-8 px-8 text-sm">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-white font-bold mb-2">
            <span className="text-blue-500">up4</span>coders
          </h2>
          <p>ul.Nazwa ulicy 87c/76<br />61-675 Poznań, Poland</p>
          <p>REGON: 000987654<br />KRS: 098907656</p>
        </div>
        <div>
          <h3 className="text-white mb-2">Follow us</h3>
          <p>Twitter • LinkedIn • Facebook</p>
        </div>
        <div>
          <h3 className="text-white mb-2">Company</h3>
          <p>OFFER<br />ABOUT US</p>
        </div>
        <div>
          <h3 className="text-white mb-2">Contact</h3>
          <p>hello@upcoders.com</p>
        </div>
      </div>
    </footer>
  );
}
