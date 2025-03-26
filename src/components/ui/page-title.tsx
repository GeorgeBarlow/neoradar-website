"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface PageTitleProps {
  description: string;
}

export function PageTitle({ description }: PageTitleProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-4 md:space-y-6">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2">
          <Image src="/FullLogoDark.svg" alt="Logo" width={500} height={88} className="hidden dark:block" />
          <Image src="/FullLogoLight.svg" alt="Logo" width={500} height={88} className="dark:hidden" />
        </div>
      </div>

      <p className="text-base sm:text-lg md:text-lg text-[#242424] dark:text-[#dbdbdb] font-semibold tracking-tighter max-w-2xl mx-auto ">{description}</p>
    </motion.div>
  );
}
