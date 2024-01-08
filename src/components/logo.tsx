import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <svg
        width="60"
        height="26"
        viewBox="0 0 29 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.0296373 3.04545V0.818182H8.87907V3.04545H5.81657V11H3.09214V3.04545H0.0296373ZM8.37937 11V0.818182H15.7174V3.04545H11.1436V4.79545H15.3396V7.02273H11.1436V8.77273H15.6976V11H8.37937ZM15.5484 11V0.818182H18.3126V8.77273H22.429V11H15.5484ZM22.0064 11V0.818182H24.7706V8.77273H28.8871V11H22.0064Z"
          fill="white"
        />
      </svg>
    </Link>
  );
}
