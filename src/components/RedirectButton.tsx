import { FC } from "react";
import Link from "next/link";

interface IProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export const RedirectButton: FC<IProps> = ({ text, linkText, linkHref }) => {
  return (
    <div className="flex items-center gap-2 text-center justify-center">
      {text}
      <Link
        href={linkHref}
        className="text-primary hover:underline-none transform transition-transform duration-300 hover:translate-y-[-2px]"
      >
        {linkText}
      </Link>
    </div>
  );
};
