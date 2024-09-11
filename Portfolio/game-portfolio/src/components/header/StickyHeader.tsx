import clogo2 from "/images/clogo2.png";

export default function StickyHeader() {
  return (
    <header className="absolute top-0 left-0 w-full bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-md z-10">
      <div className="container mx-auto py-6 px-6 flex justify-between items-center">
        <a href="#hero" className="fade-down-enter">
          <img src={clogo2} alt="c logo" className="w-[30px] h-[30px]" />
        </a>
        <nav className="flex-row gap-[20px] items-center justify-center hidden lg:flex">
          <div className="text-fontWhite hover:text-secondaryColor font-medium fade-down-enter">
            <a href="#work">Work</a>
          </div>
          <div className="text-fontWhite hover:text-secondaryColor font-medium fade-down-enter">
            <a href="#projects">Projects</a>
          </div>
          <div className="text-fontWhite hover:text-secondaryColor font-medium fade-down-enter">
            <a href="#about">About Me</a>
          </div>
          <div className="text-fontWhite hover:text-secondaryColor font-medium fade-down-enter">
            <a href="#contact">Contact</a>
          </div>
          <div className="fade-down-enter">
            <a
              href="/ChrisZhenResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="font-bold px-[20px] py-[10px] border-2 border-secondaryColor text-secondaryColor rounded-md hover:bg-secondaryColor hover:text-black">
                Resume
              </button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
