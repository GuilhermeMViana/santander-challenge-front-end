'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { NavButtonProps } from "./props"

export const NavButton = ({ href, children }: NavButtonProps) => {
    const pathName = usePathname()
    const isActive = pathName === href
    const currentVariant = isActive ? "active" : "default"

    return (
        <Button variant={currentVariant}>
            <Link href={href}>{children}</Link>
        </Button>
    )
}