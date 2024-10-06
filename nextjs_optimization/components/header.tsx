import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header id="main-header">
      <Link href="/">
        {/* Old way of declaring img */}
        {/* <img src={logo.src} alt="Mobile phone with posts feed on it" /> */}

        {/* Next JS way */}
        {/* <Image src={logo.src} alt="Mobile phone with posts feed on it" /> */}

        {/* Giving height and width explicitly */}
        {/* <Image
          src={logo}
          height={100}
          width={100}
          alt="Mobile phone with posts feed on it"
        /> */}

        {/* sizes is the recommended way to declare the size of the image */}
        {/* <Image
          src={logo}
          // We have to change the layout to responsive otherwise the image pixel is going down as by default layout is intrinsic
          // which doesn't change the size of image but rather degrades the pixel. With responsive it will scale image but not the image
          // quality.

          // More info on Notes
          layout="responsive"
          sizes="10vw"
          alt="Mobile phone with posts feed on it"
        /> */}

        {/* Removing Lazy Loading */}
        <Image
          src={logo}
          layout="responsive"
          sizes="7vw"
          alt="Mobile phone with posts feed on it"
          priority
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
