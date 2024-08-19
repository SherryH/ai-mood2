/**
 * By wrapping the [...] in double brackets [[...]], you make the catch-all route optional. This means it will match both /sign-up (with no additional path segments) and any deeper paths like /sign-up/step1, /sign-up/step2/details, etc.
 */

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn />
}
