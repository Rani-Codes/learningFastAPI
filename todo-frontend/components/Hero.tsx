import { fetchAPIServer } from "@/app/(auth)/utils/fetchAPI";
import { cookies } from "next/headers";
import Image from "next/image"
import Link from "next/link"

const Hero = async() => {

  let isAuthenticated = false;
  
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const user = await fetchAPIServer('/users/me/', token);
    if (user) {
      isAuthenticated = true;
    }
  } catch (error) {
    console.error("Authentication failed:", error);
  }

  return (
    <div className="flex flex-col-reverse w-full justify-center items-center gap-6 my-10 md:flex-row lg:m-10 lg:gap-x-10">
        <div className="w-3/4 md:w-1/2">
            <h1 className="text-wrap font-semibold text-2xl md:text-4xl lg:text-5xl xl:text-6xl ">Stay on Top of Your Tasks with Ease</h1>
            <h4 className="text-sm py-1 md:py-6 lg:text-lg lg:py-10">Effortlessly manage your to-do lists and achieve more every day. Sign up for free and start organizing your tasks today!</h4>
            <Link href={"/signup"} className="w-full flex justify-center my-4 md:my-0 md:block md:w-fit">
                <button className={`${isAuthenticated? 'hidden' : 'visible'} bg-orange-600 text-white font-medium p-3 md:p-4 text-sm md:text-lg rounded-xl hover:bg-orange-700`}>Sign up for free</button>
            </Link>
        </div>
        <Image
        src="/hero.jpeg"
        width={1024}
        height={1024}
        className="w-1/2 md:w-4/12 h-auto rounded-2xl max-w-screen-sm"
        alt="Cartoon drawing inspired by Tom in Tom and Jerry writing a todo list"/>
    </div>
  )
}

export default Hero