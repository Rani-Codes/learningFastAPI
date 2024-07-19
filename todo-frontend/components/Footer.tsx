import { poppins } from "@/ui/fonts";

const Footer = () => {
  return (
    <footer className={`${poppins.className} bg-slate-200 py-6`}>
      <div className="container mx-auto text-center text-sm md:text-base">
        <p>&copy; {new Date().getFullYear()} TodoList App. All rights reserved.</p>
        <p>
          <a href="https://github.com/Rani-Codes/learningFastAPI" target="_blank" rel="noopener noreferrer" className="underline">
            View source code on GitHub
          </a>
        </p>
        <p className="mt-2">Made with ❤️ by Rani Saro</p>
      </div>
    </footer>
  )
}

export default Footer
