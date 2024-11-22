"use client"
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {

  const { theme } = useTheme();

  return <>
    {theme === "dark" ? <Image src="/logo-dark.svg" alt="Gamevault" width={40} height={40} /> : <Image src="/logo.svg" alt="Gamevault" width={40} height={40} />}
  </>

}