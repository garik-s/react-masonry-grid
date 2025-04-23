import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const StyledImg = styled.img<{ $loaded: boolean }>`
  width: 100%;
  display: block;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  border-radius: 12px;
  &:hover {
    transform: scale(1.03);
  }
`;

export const LazyImage = ({ src, alt, ...rest }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [inView, setInView] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <StyledImg
      loading="lazy"
      ref={imgRef}
      src={inView ? src : undefined}
      alt={alt}
      $loaded={loaded}
      onLoad={() => setLoaded(true)}
      {...rest}
    />
  );
};
