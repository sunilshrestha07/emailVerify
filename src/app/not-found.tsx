import Link from 'next/link'
import React from 'react'

export default function notfould() {
  return (
    <>
        <div>Sorry! the page you are trying to access doesnt exit</div>
        <Link href="/">Return Home</Link>
    </>
  )
}
