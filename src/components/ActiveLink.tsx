import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinksProps extends LinkProps{
  children: ReactElement;
  souldMatchExactHref?: boolean;
}

export function ActiveLink({children, souldMatchExactHref = false, ...rest}: ActiveLinksProps){
  const {asPath} = useRouter();

  let isActive = false;

  if(souldMatchExactHref &&(asPath === rest.href || asPath === rest.as)){
    isActive = true;
  }

  if(!souldMatchExactHref &&
    ( 
      asPath.startsWith(String(rest.href)) || 
      asPath.startsWith(String(rest.as))
    )
  ){
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}