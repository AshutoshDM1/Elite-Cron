import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("size-10", className)} >
        <img src="/favicon/favicon.svg" alt="Logo" width={100} height={100} />
    </div> 
  )
}

export default Logo