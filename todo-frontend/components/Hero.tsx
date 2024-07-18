import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="flex w-full justify-center items-center m-10 gap-x-10">
        <div className="w-1/2">
            <h1 className="text-6xl text-wrap font-semibold">Stay on Top of Your Tasks with Ease</h1>
            <h4 className="text-lg py-10">Effortlessly manage your to-do lists and achieve more every day. Sign up for free and start organizing your tasks today!</h4>
            <Link href={"/signup"}>
                <button className="border-2 border-transparent bg-orange-600 text-white font-medium p-4 text-lg rounded-xl hover:bg-orange-700">Sign up for free</button>
            </Link>
        </div>
        <Image
        src="/hero.jpeg"
        width={1024}
        height={1024}
        className="w-4/12 h-auto rounded-2xl max-w-screen-sm"
        alt="Cartoon drawing inspired by Tom in Tom and Jerry writing a todo list"/>
    </div>
  )
}

export default Hero