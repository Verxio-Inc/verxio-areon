import Image from "next/image";
import { Profile } from "./atoms";
import Logo from '../assets/singlelogo.svg'

const Header = () => {
  return (
    <section className="px-[4%] w-full font-body shadow-dashboard-header h-fit sticky top-0 left-0  py-[19px] gap-4 flex items-center justify-between shadow-header bg-primary_white border-[#D2D2D2] bg-[#FFFFFF] z-10">
      <Image src={Logo} alt="Verxio logo" className="w-10"/>
      <Profile />
    </section>
  );
};

export default Header;
